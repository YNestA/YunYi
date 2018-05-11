import React,{Component} from 'react'
import {View, FlatList, Text, Image, ScrollView, TouchableWithoutFeedback, InteractionManager} from 'react-native'
import {screenUtils,myFetch,NetworkError,Loading} from '../../tools/MyTools'
import {connect} from 'react-redux'
import ConcernPassage from './ConcernPassage'
import ConcernUsers from './ConcernUsers'
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
class ConcernPassages extends Component{
    constructor(props){
        super(props);
        this.state={
            firstLoading:true,
            topRefreshing:0,
            bottomRefreshing:0,
            noMore:false
        };
        this._initialData=this._initialData.bind(this);
        this._renderFooter=this._renderFooter.bind(this);
        this._bottomRefresh=this._bottomRefresh.bind(this);
        this._topRefresh=this._topRefresh.bind(this);
        this._renderHeader=this._renderHeader.bind(this);
    }
    _renderHeader(users){
        return (
            <ConcernUsers users={users} navigation={this.props.navigation}/>
        );
    }
    _topRefresh(){
        let {users}=this.props;
        if(this.state.topRefreshing===0&&this.state.bottomRefreshing===0){
            this.setState({topRefreshing:1});
            this.props.topRefresh(this.props.user,(state) => {
                this.setState(state);
            })
        }
    }
    _bottomRefresh(e){
        let {user,concern}=this.props;

        if(e.distanceFromEnd>0&&!this.state.noMore&&this.state.bottomRefreshing===0&&this.state.topRefreshing===0) {
            //alert(e.distanceFromEnd);
            this.setState({bottomRefreshing: 1});
            this.props.bottomRefresh(concern,user,(state) => {
                this.setState(state);
            });
        }
    }
    _initialData(user){
        this.props.initialData(user,()=>{
            this.setState({firstLoading:false});
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
    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            this._initialData(this.props.user);
        });
    }
    render() {
        let {users,passages,networkError}=this.props.concern;
        if (networkError) {
            return <NetworkError containerStyle={{flex:1}} reload={()=>{
                this.props.setNetworkError(false);
                this._initialData(this.props.user);
            }}/>;
        }else{

            return(
                !this.state.firstLoading?
                    <FlatList
                        refreshing={!!this.state.topRefreshing}
                        onRefresh={this._topRefresh}
                        onEndReachedThreshold={0.1}
                        onEndReached={this._bottomRefresh}
                        extraData={this.state}
                        data={passages}
                        ListHeaderComponent={this._renderHeader(users)}
                        ListFooterComponent={this._renderFooter}
                        renderItem={({item})=>{
                            return <ConcernPassage passage={item} navigation={this.props.navigation}/>
                        }}
                    />:
                    <Loading
                        containerStyle={{flex: 1, justifyContent: 'center'}}
                        loadingStyle={{width: screenUtils.autoSize(50), height: screenUtils.autoSize(50)}}
                    />
            );
        }
    }
}

let actions={
    setNetworkError:function (value) {
        return {
            type:'NETWORK_ERROR',
            payload: {
                networkError: value,
            }
        }
    },
    initialData:function (user,cb) {
        return myFetch(`http://${ip}:4441/api/articles/user/followed/`,{
            method:'GET',
            timeout:10000,
            headers:{
                'user_token':user.token
            }
        })
            .then((response)=>response.json())
            .then(responseData=>{
                //alert(JSON.stringify(responseData));
                let data=responseData.data;
                if(responseData.code==10001){
                    cb();
                    return {
                        type:'INIT_CONCERN_DATA',
                        payload:{
                            users:data.recommendedUser.map((item)=>{
                                return {
                                    name:item.nickname,
                                    userID:item.userUuid,
                                    headImg:item.avatar,
                                }
                            }),
                            passages:data.articles.map((item)=>{
                                return {
                                    author:{
                                        authorID:item.userUuid,
                                        headImg:item.avatar,
                                        name:item.nickname,
                                        concerned:item.relationType==2
                                    },
                                    createTime:item.createTime,
                                    title:item.title,
                                    coverImg:item.image,
                                    thumbHeadImgs:[item.image,item.image,item.image,item.image],
                                    passageID:item.passageUuid,
                                    thumbCount:item.likeNum,
                                    commentCount:item.commentNum,
                                    shareCount:item.shareNum
                                };
                            }),
                            pageCount:data.cursor
                        },
                    }
                }else{
                    showTip('网络好像有点问题');
                }
            }).catch((error)=>{
                showTip('网络好像有点问题');
            });
    },
    topRefresh:function (user,cb) {

        return myFetch(`http://${ip}:4441/api/articles/user/followed/`,{
            method:'GET',
            timeout:10000,
            headers:{
                'user_token':user.token
            }
        })
            .then((response)=>response.json())
            .then(responseData=>{
                let data=responseData.data;

                cb({topRefreshing:0,noMore:false});
                if(responseData.code==10001){
                    return {
                        type:'CONCERN_TOP_REFRESH',
                        payload:{

                            passages:data.articles.map((item)=>{
                                return {
                                    author:{
                                        authorID:item.userUuid,
                                        headImg:item.avatar,
                                        name:item.nickname,
                                        concerned:item.relationType==2
                                    },
                                    createTime:item.createTime,
                                    title:item.title,
                                    coverImg:item.image,
                                    passageID:item.passageUuid,
                                    thumbCount:item.likeNum,
                                    commentCount:item.commentNum,
                                    shareCount:item.shareNum
                                };
                            }),
                            users:data.recommendedUser.map((item)=>{
                                return {
                                    name:item.nickname,
                                    userID:item.userUuid,
                                    headImg:item.avatar
                                }
                            }),
                            pageCount:data.cursor
                        },
                    }
                }else{
                    showTip('网络好像有点问题');
                }
            }).catch((error)=>{
                cb({topRefreshing:0});
                showTip('网络好像有点问题');
            });
    },
    bottomRefresh:function (concern,user,cb) {
        return myFetch(`http://${ip}:4441/api/articles/user/followed/load/${concern.pageCount}/`,{
            method:'GET',
            headers:{
                'user_token':user.token
            },
            timeout:10000
        })
            .then((response)=>response.json())
            .then(responseData=>{
                //alert(JSON.stringify(responseData));
                if(responseData.code==10001){
                    let data=responseData.data;
                    cb({bottomRefreshing: 0});
                    return {
                        type:'CONCERN_BOTTOM_REFRESH',
                        payload:{
                            passages:concern.passages.concat(data.articles.map((item)=>{
                                return {
                                    author:{
                                        authorID:item.userUuid,
                                        headImg:item.avatar,
                                        name:item.nickname,
                                        concerned:item.relationType==2
                                    },
                                    createTime:item.createTime,
                                    title:item.title,
                                    coverImg:item.image,
                                    passageID:item.passageUuid,
                                    thumbCount:item.likeNum,
                                    commentCount:item.commentNum,
                                    shareCount:item.shareNum
                                };
                            })),
                            pageCount:data.cursor
                        }
                    };
                }else if(responseData.code==10111){cb({bottomRefreshing: 0,noMore:true});
                    showTip('没有更多文章');

                }else{
                    showTip('网络好像有点问题');
                }
            }).catch((error)=>{
                cb({bottomRefreshing: 0});
                showTip('网络好像有点问题');
            });
    }
};

function mapStateToProps(state) {
    return {
        concern:state.concern,
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return{
        initialData:(user,cb)=>{dispatch(actions.initialData(user,cb))},
        setNetworkError:(value)=>{dispatch(actions.setNetworkError(value))},
        topRefresh:(user,cb)=>{dispatch(actions.topRefresh(user,cb))},
        bottomRefresh:(concern,user,cb)=>{dispatch(actions.bottomRefresh(concern,user,cb))}
    }
}

export default ConcernPassages=connect(mapStateToProps,mapDispatchToProps)(ConcernPassages);