import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, FlatList,StyleSheet, Image, ImageBackground, BackHandler
} from 'react-native'
import {connect} from 'react-redux'
import Loading from "../../tools/loading";
import myFetch, {encodePostParams} from "../../tools/MyFetch"
import {screenUtils} from "../../tools/ScreenUtils";

class MessageList extends Component{
    constructor(props){
        super(props);
        this.state={
            topRefreshing:0,
            bottomRefreshing:0,
            firstLoading:true,
        }
        this._topRefresh=this._topRefresh.bind(this);
        this._bottomRefresh=this._bottomRefresh.bind(this);
        this._renderFooter=this._renderFooter.bind(this);
        this._renderHeader=this._renderHeader.bind(this);
    }
    componentDidMount(){
        let {messages,user}=this.props;
        this.props.getLastest(messages,user,()=>{
            this.setState({firstLoading:false})
        })
    }
    _topRefresh(){
        if(this.state.topRefreshing===0&&this.state.bottomRefreshing===0){
            let {messages,user}=this.props;
            this.setState({topRefreshing:1});
            this.props.getLastest(messages,user,()=>{
                this.setState({topRefreshing:0});
            })
        }
    }
    _bottomRefresh(e){
        let {messages,user}=this.props;
        if(messages.content.length<10){
            return;
        }
        if(e.distanceFromEnd>0&&this.state.bottomRefreshing===0&&this.state.topRefreshing===0){
            this.setState({bottomRefreshing:1});
            this.props.getMore(messages,user,()=>{
                this.setState({bottomRefreshing:0});
            });
        }
    }
    _renderFooter(){
        if(this.state.bottomRefreshing===1){
            return <Loading
                loadingStyle={{
                    width:screenUtils.autoSize(30),
                    height:screenUtils.autoSize(30),
                    marginVertical:screenUtils.autoSize(10)
                }}/>;
        }else{
            return <View/>;
        }
    }
    _renderHeader(){
        let {messages}=this.props;
        if(messages.content.length==0){
            return (
                <View style={{
                    height:screenUtils.screenHeight-StatusBar.currentHeight-screenUtils.autoSize(55),
                    justifyContent:'center'
                }}>
                    <Text style={{fontSize:screenUtils.autoFontSize(30),textAlign:'center'}}>空空如也~</Text>
                </View>
            );
        }else{
            return <View/>;
        }
    }
    render(){
        let {messages,MessageComponent,user,navigation}=this.props;
        if(this.state.firstLoading){
            return <Loading containerStyle={{flex: 1}}/>;
        }else{
            return (
                <FlatList
                    refreshing={!!this.state.topRefreshing}
                    onRefresh={this._topRefresh}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._bottomRefresh}
                    ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={this._renderFooter}
                    data={messages.content}
                    extraData={this.state}
                    renderItem={({item}) => {
                        return <MessageComponent navigation={navigation} message={item} user={user}/>;
                    }}
                />
            );
        }
    }
}

let tempData = {
    concern: [{
        user: {
            userID: '',
            headImg: '',
            username: '安生抢'
        },
        time: '04-09'
    }, {
        user: {
            userID: '',
            headImg: '',
            username: '王子田'
        },
        time: '04-09',
    }, {
        user: {
            userID: '',
            headImg: '',
            username: '张艺龄'
        },
        time: '04-09'
    }, {
        user: {
            userID: '',
            headImg: '',
            username: '安生抢'
        },
        time: '04-09'
    }, {
        user: {
            userID: '',
            headImg: '',
            username: '王子田'
        },
        time: '04-09',
    }, {
        user: {
            userID: '',
            headImg: '',
            username: '安生抢'
        },
        time: '04-09'
    }, {
        user: {
            userID: '',
            headImg: '',
            username: '王子田'
        },
        time: '04-09',
    }, {
        user: {
            userID: '',
            headImg: '',
            username: '张艺龄'
        },
        time: '04-09'
    }, {
        user: {
            userID: '',
            headImg: '',
            username: '安生抢'
        },
        time: '04-09'
    }, {
        user: {
            userID: '',
            headImg: '',
            username: '王子田'
        },
        time: '04-09',
    },],
    thumb:[{
        userID:'1221',
        headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-6044_2018-04-26.jpg',
        coverImg:'https://w3.hoopchina.com.cn/f9/11/75/f911758081f2aa164e7e830660dc5a72001.jpg',
        name:'王子田',
        time:new Date().getTime(),
        passageID:'212312312',
    },{
        userID:'1221',
        headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-6044_2018-04-26.jpg',
        coverImg:'https://w3.hoopchina.com.cn/f9/11/75/f911758081f2aa164e7e830660dc5a72001.jpg',
        name:'王子田',
        time:new Date().getTime(),
        passageID:'212312312',
    },{
        userID:'1221',
        headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-6044_2018-04-26.jpg',
        coverImg:'https://w3.hoopchina.com.cn/f9/11/75/f911758081f2aa164e7e830660dc5a72001.jpg',
        name:'王子田',
        time:new Date().getTime(),
        passageID:'212312312',
    },{
        userID:'1221',
        headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-6044_2018-04-26.jpg',
        coverImg:'https://w3.hoopchina.com.cn/f9/11/75/f911758081f2aa164e7e830660dc5a72001.jpg',
        name:'王子田',
        time:new Date().getTime(),
        passageID:'212312312',
    },{
        userID:'1221',
        headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-6044_2018-04-26.jpg',
        coverImg:'https://w3.hoopchina.com.cn/f9/11/75/f911758081f2aa164e7e830660dc5a72001.jpg',
        name:'王子田',
        time:new Date().getTime(),
        passageID:'212312312',
    },{
        userID:'1221',
        headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-6044_2018-04-26.jpg',
        coverImg:'https://w3.hoopchina.com.cn/f9/11/75/f911758081f2aa164e7e830660dc5a72001.jpg',
        name:'王子田',
        time:new Date().getTime(),
        passageID:'212312312',
    },{
        userID:'1221',
        headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-6044_2018-04-26.jpg',
        coverImg:'https://w3.hoopchina.com.cn/f9/11/75/f911758081f2aa164e7e830660dc5a72001.jpg',
        name:'王子田',
        time:new Date().getTime(),
        passageID:'212312312',
    },]
};


let actions={
    getLastest:function (messages,user,cb) {
        let payload={
        };
        payload[messages.type]=Object.assign({},messages);
        return myFetch('http://www.baidu.com',{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'user_token':user.token
            },
            body:encodePostParams({
                type:messages.type
            })
        }).then(response=>response.text())
            .then(responseData=>{
                cb();
                payload[messages.type].content=tempData[messages.type];
                payload[messages.type].notRead=0;
                return {
                    type:'GET_LASTEST',
                    payload:payload
                }
            })
            .catch(err=>{
                alert(err);
                cb();
            });
    },
    getMore:function (messages,user,cb) {
        let payload={
        };
        payload[messages.type]=Object.assign({},messages);
        return myFetch('http://www.baidu.com',{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'user_token':user.token
            },
            body:encodePostParams({
                type:messages.type
            })
        }).then(response=>response.text())
            .then(responseData=>{
                cb();
                payload[messages.type].content=payload[messages.type].content.concat(tempData[messages.type]);
                payload[messages.type].notRead=0;
                return {
                    type:'GET_MORE',
                    payload:payload
                }
            })
            .catch(err=>{
                cb();
                alert(err);
            });
    }
};

function mapStateToProps(state) {
    return {
        user:state.user,
        messageCenter:state.MessageCenter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getLastest:(messages,user,cb)=>{dispatch(actions.getLastest(messages,user,cb))},
        getMore:(messages,user,cb)=>{dispatch(actions.getMore(messages,user,cb))}
    };
}

export default MessageList=connect(mapStateToProps,mapDispatchToProps)(MessageList);
