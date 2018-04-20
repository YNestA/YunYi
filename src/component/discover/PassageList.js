import React,{Component} from 'react'
import {View,Text,FlatList,InteractionManager} from 'react-native'
import DiscoverPassage from './DiscoverPassage'
import {connect} from "react-redux";
import Loading from '../../tools/loading'
import {screenUtils} from '../../tools/ScreenUtils'
import NetworkError from '../../tools/NetworkError'
import myFetch from '../../tools/MyFetch'
import {ip} from "../../settings";

class PassageList extends Component{
    constructor(props){
        super(props);
        this.state={
            topRefreshing:0,
            bottomRefreshing:0
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
            this.props.topRefresh(this.props.passageLists,this.props.classify,(value)=>{
                this.setState({topRefreshing:value});
            })
        }
    }
    _bottomRefresh(e){
        if(e.distanceFromEnd!=0&&this.state.bottomRefreshing===0&&this.state.topRefreshing===0){
            this.setState({bottomRefreshing:1});
            this.props.bottomRefresh(this.props.passageLists,this.props.classify,(value)=>{
                this.setState({bottomRefreshing:value});
            });
            //this.props.bottomRefresh(this.props.passageLists,this.props.classify,(value)=>{
            //    this.setState({refreshing:value});
            //});
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
                        onEndReachedThreshold={0.1}
                        onEndReached={this._bottomRefresh}
                    /> : <Loading
                        containerStyle={{flex: 1, justifyContent: 'center'}}
                        loadingStyle={{width: screenUtils.autoSize(50), height: screenUtils.autoSize(50)}}
                    />
            );
        }
    }

}

const tempData1=[{
    author:{
        authorID:'A20180322',
        headImg:'http://pic1.178.com/avatars/02/18/cc/120_35179683.jpg?t=1518919628',
        name:'周瑜'
    },
    title:'人人有书读，人人有功练',
    coverImg:'../../img/hikari.jpg',
    createTime:'2019-9-30 12:30',
    thumbHeadImgs:[],
    passageID:'47d801dbd39f476a8635bfa355633c4e',
    thumbCount:250,
    commentCount:250,
    shareCount:250
},{
    author:{
        authorID:'A20180322',
        headImg:'../../img/asuka.jpg',
        name:'中国古拳法掌门人'
    },
    createTime:'2019-9-30 12:30',
    title:'人人有书读，人人有功练',
    coverImg:'../../img/hikari.jpg',
    thumbHeadImgs:[],
    passageID:'47d801dbd39f476a8635bfa355633c4e',
    thumbCount:250,
    commentCount:250,
    shareCount:250
},{
    author:{
        authorID:'A20180322',
        headImg:'../../img/asuka.jpg',
        name:'中国古拳法掌门人'
    },
    createTime:'2019-9-30 12:30',
    title:'人人有书读，人人有功练',
    coverImg:'../../img/hikari.jpg',
    thumbHeadImgs:[],
    passageID:'47d801dbd39f476a8635bfa355633c4e',
    thumbCount:250,
    commentCount:250,
    shareCount:250
}];

const tempData2=[{
    author:{
        authorID:'A20180322',
        headImg:'../../img/asuka.jpg',
        name:'周瑜'
    },
    title:'hahahhahahha',
    coverImg:'../../img/hikari.jpg',
    createTime:'2019-9-30 12:30',
    thumbHeadImgs:[],
    passageID:'47d801dbd39f476a8635bfa355633c4e',
    thumbCount:250,
    commentCount:250,
    shareCount:250
},{
    author:{
        authorID:'A20180322',
        headImg:'../../img/asuka.jpg',
        name:'中国古拳法掌门人'
    },
    createTime:'2019-9-30 12:30',
    title:'人人有书读，人人有功练',
    coverImg:'../../img/hikari.jpg',
    thumbHeadImgs:[],
    passageID:'47d801dbd39f476a8635bfa355633c4e',
    thumbCount:250,
    commentCount:250,
    shareCount:250
},{
    author:{
        authorID:'A20180322',
        headImg:'../../img/asuka.jpg',
        name:'中国古拳法掌门人'
    },
    createTime:'2019-9-30 12:30',
    title:'人人有书读，人人有功练',
    coverImg:'../../img/hikari.jpg',
    thumbHeadImgs:[],
    passageID:'47d801dbd39f476a8635bfa355633c4e',
    thumbCount:250,
    commentCount:250,
    shareCount:250
}];
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
        return myFetch(`http://${ip}:4441/api/articles/refresh/`,{method:'GET',timeout:10000})
            .then((response)=>response.json())
            .then((responseData)=>{
                //alert(JSON.stringify(responseData));
                let data=responseData.data,
                    newPassageLists=Object.assign({},passageLists);
                newPassageLists[classify]={
                    passages:data.map((item)=>{
                        return {
                            author:{
                                authorID:item.userUuid,
                                headImg:item.avatar,
                                name:item.nickname
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
                    pageCount:0
                };
                return{
                    type:'INITIAL_PASSAGES',
                    payload:{
                        networkError:false,
                        passageLists:newPassageLists
                    }
                };
            }).catch((error)=>{
                alert(error);
                return {
                    type:'NETWORK_ERROR',
                    payload: {
                        networkError:true,
                    }
                };
            });
    },
    bottomRefresh:function (passageLists,classify,setLoading) {
        return myFetch(`http://${ip}:4441/api/load/${passageLists.pageCount}/`,{method:'GET',timeout:10000})
            .then((response)=>response.json())
            .then((responseData)=>{
                let data=responseData.data,
                    newPassageLists=Object.assign({},passageLists);
                newPassageLists[classify]={
                    passages:passageLists.passages.concat(data.map((item)=>{
                        return {
                            author:{
                                authorID:item.userUuid,
                                headImg:item.avatar,
                                name:item.nickname
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
                    })),
                    pageCount:0
                };
                setLoading(0);
                return {
                    type:'BOTTOM_REFRESH',
                    payload:{
                        networkError:false,
                        passageLists:newPassageLists
                    }
                };
            }).catch((error)=>{
                console.log(error);
                setLoading(0);
                return {
                    type:'NETWORK_ERROR',
                    payload: {
                        networkError:true,
                    }
                };
            });
    },
    topRefresh:function (passageLists,classify,setLoading) {
        return myFetch(`http://${ip}:4441/api/articles/refresh/`,{method:'GET',timeout:10000})
            .then((response)=>response.json())
            .then((responseData)=>{
                let data=responseData.data,
                    newPassageLists=Object.assign({},passageLists);
                newPassageLists[classify]={
                    passages:data.map((item)=>{
                        return {
                            author:{
                                authorID:item.userUuid,
                                headImg:item.avatar,
                                name:item.nickname
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
                    pageCount:0
                };
                setLoading(0);
                return {
                    type:'TOP_REFRESH',
                    payload:{
                        networkError:false,
                        passageLists:newPassageLists
                    }
                };
            }).catch((error)=>{
                console.log(error);
                setLoading(0);
                return {
                    type:'NETWORK_ERROR',
                    payload: {
                        networkError:true,
                    }
                };
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
