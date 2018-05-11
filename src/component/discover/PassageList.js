import React,{Component} from 'react'
import {View,Text,FlatList,InteractionManager} from 'react-native'
import DiscoverPassage from './DiscoverPassage'
import {connect} from "react-redux";
import Loading from '../../tools/loading'
import {screenUtils} from '../../tools/ScreenUtils'
import NetworkError from '../../tools/NetworkError'
import myFetch from '../../tools/MyFetch'
import {ip} from "../../settings";
import Toast from "react-native-root-toast";

function showTip(message,onHidden){
    Toast.show(message,{
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        onHidden:onHidden
    });
}
class PassageList extends Component{
    constructor(props){
        super(props);
        this.state={
            topRefreshing:0,
            bottomRefreshing:0,
            noMore:false
        };
        this._initialPassages=this._initialPassages.bind(this);
        this._renderFooter=this._renderFooter.bind(this);
        this._bottomRefresh=this._bottomRefresh.bind(this);
        this._topRefresh=this._topRefresh.bind(this);
    }
    _initialPassages(){
        this.props.initialPassages(this.props.passageLists,this.props.classify);
    }
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this._initialPassages();
        });
    }
    _renderFooter(){
        if(this.state.bottomRefreshing===1){
            return <Loading
                loadingStyle={{
                    width:screenUtils.autoSize(30),
                    height:screenUtils.autoSize(30),
                    marginBottom:screenUtils.autoSize(10)
                }}/>;
        }else{
            return <View/>;
        }
    }
    _topRefresh(){
        if(this.state.topRefreshing===0&&this.state.bottomRefreshing===0){
            this.setState({topRefreshing:1});
            this.props.topRefresh(this.props.passageLists,this.props.classify,(state)=>{
                this.setState(state);
            })
        }
    }
    _bottomRefresh(e){
        if(e.distanceFromEnd!=0&&!this.state.noMore&&this.state.bottomRefreshing===0&&this.state.topRefreshing===0){
            this.setState({bottomRefreshing:1});
            this.props.bottomRefresh(this.props.passageLists,this.props.classify,(state)=>{
                this.setState(state);
            });
        }
    }
    render() {
        let classify = this.props.classify,
            {passages,pageCount}= this.props.passageLists[classify]||{passages:[],pageCount:0},
            frontView=this.props.frontView || <View/>;

        if (this.props.networkError) {
            return <NetworkError containerStyle={{flex:1}} reload={()=>{
                this.props.setNetworkError(false);
                this._initialPassages();
            }}/>;
        } else {
            return (
                passages.length ?
                    <FlatList
                        refreshing={!!this.state.topRefreshing}
                        onRefresh={this._topRefresh}
                        extraData={this.state}
                        ListHeaderComponent={frontView}
                        ListFooterComponent={this._renderFooter}
                        data={passages}
                        renderItem={({item, index}) => {
                            return (<DiscoverPassage navigation={this.props.navigation} passage={item}/>);
                        }}
                        onEndReachedThreshold={0.2}
                        onEndReached={this._bottomRefresh}
                    /> : <Loading
                        containerStyle={{flex: 1, justifyContent: 'center'}}
                        loadingStyle={{width: screenUtils.autoSize(50), height: screenUtils.autoSize(50)}}
                    />
            );
        }
    }

}

//redux
let actions={
    setNetworkError:function (value) {
        return {
            type:'NETWORK_ERROR',
            payload: {
                networkError: value,
            }
        }
    },
    initialPassages:function (passageLists,classify) {
        return myFetch(`http://${ip}:4441/api/articles/${classify}/refresh/`,{method:'GET',timeout:10000})
            .then((response)=>response.json())
            .then((responseData)=>{
                //alert(JSON.stringify(responseData));
                let data=responseData.data,
                    newPassageLists=Object.assign({},passageLists);
                newPassageLists[classify]={
                    passages:data.articles.map((item)=>{
                        return {
                            author:{
                                authorID:item.userUuid,
                                headImg:item.avatar,
                                name:item.nickname
                            },
                            createTime:item.createTime,
                            title:item.title,
                            coverImg:item.image,
                            thumbHeadImgs: item.likeUsers.map((item)=>{
                                return item.avatar;
                            }),
                            passageID:item.passageUuid,
                            thumbCount:item.likeNum,
                            commentCount:item.commentNum,
                            shareCount:item.shareNum
                        };
                    }),
                    pageCount:data.cursor
                };
                return{
                    type:'INITIAL_PASSAGES',
                    payload:{
                        networkError:false,
                        passageLists:newPassageLists
                    }
                };
            }).catch((error)=>{
                return {
                    type:'NETWORK_ERROR',
                    payload: {
                        networkError:true,
                    }
                };
            });
    },
    bottomRefresh:function (passageLists,classify,cb) {
        return myFetch(`http://${ip}:4441/api/articles/${classify}/load/${passageLists[classify].pageCount}/`,{method:'GET',timeout:10000})
            .then((response)=>response.json())
            .then((responseData)=>{
                //alert(JSON.stringify(responseData));
                if(responseData.code==10001) {
                    let data = responseData.data,
                        newPassageLists = Object.assign({}, passageLists);
                    newPassageLists[classify] = {
                        passages: passageLists[classify].passages.concat(data.cmsArticleList.map((item) => {
                            return {
                                author: {
                                    authorID: item.userUuid,
                                    headImg: item.avatar,
                                    name: item.nickname
                                },
                                createTime: item.createTime,
                                title: item.title,
                                coverImg: item.image,
                                thumbHeadImgs: item.likeUsers.map((item)=>{
                                    return item.avatar;
                                }),
                                passageID: item.passageUuid,
                                thumbCount: item.likeNum,
                                commentCount: item.commentNum,
                                shareCount: item.shareNum
                            };
                        })),
                        pageCount: data.cursor
                    };
                    cb({bottomRefreshing: 0});
                    return {
                        type: 'BOTTOM_REFRESH',
                        payload: {
                            networkError: false,
                            passageLists: newPassageLists
                        }
                    };
                }else if(responseData.code=='10111'){
                    cb({bottomRefreshing: 0,noMore:true});
                    showTip('没有更多文章');
                }
            }).catch((error)=>{0
                alert(error);
                cb({bottomRefreshing: 0});
                showTip('网络好像有点问题~');
            });
    },
    topRefresh:function (passageLists,classify,cb) {
        return myFetch(`http://${ip}:4441/api/articles/${classify}/refresh/`,{method:'GET',timeout:10000})
            .then((response)=>response.json())
            .then((responseData)=>{
                if(responseData.code=='10001') {
                    let data = responseData.data,
                        newPassageLists = Object.assign({}, passageLists);
                    newPassageLists[classify] = {
                        passages: data.articles.map((item) => {
                            return {
                                author: {
                                    authorID: item.userUuid,
                                    headImg: item.avatar,
                                    name: item.nickname
                                },
                                createTime: item.createTime,
                                title: item.title,
                                coverImg: item.image,
                                thumbHeadImgs: item.likeUsers.map((item)=>{
                                    return item.avatar;
                                }),
                                passageID: item.passageUuid,
                                thumbCount: item.likeNum,
                                commentCount: item.commentNum,
                                shareCount: item.shareNum
                            };
                        }),
                        pageCount: data.cursor
                    };
                    cb({topRefreshing:0,noMore:false});
                    return {
                        type: 'TOP_REFRESH',
                        payload: {
                            networkError: false,
                            passageLists: newPassageLists
                        }
                    };
                }else{
                    showTip('网络好像有点问题~');
                    cb({topRefreshing:0,noMore:false});
                }
            }).catch((error)=>{
                cb({topRefreshing:0,noMore:false});
                showTip('网络好像有点问题~');
            });
    }
}
function mapStateToProps(state) {
    return{
        networkError:state.discover.networkError,
        passageLists:state.discover.passageLists
    };
}
function mapDispatchToProps(dispatch) {
    return{
        initialPassages:(passageLists,classify)=>{dispatch(actions.initialPassages(passageLists,classify))},
        setNetworkError:(value)=>{dispatch(actions.setNetworkError(value))},
        bottomRefresh:(passageLists,classify,pageNum)=>{dispatch(actions.bottomRefresh(passageLists,classify,pageNum))},
        topRefresh:(passageLists,classify,pageNum)=>{dispatch(actions.topRefresh(passageLists,classify,pageNum))}
    }
}
export default PassageList=connect(mapStateToProps,mapDispatchToProps)(PassageList);
