import React,{Component} from 'react'
import {View,Text,FlatList,StyleSheet,Image,TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
import {screenUtils} from "../../tools/ScreenUtils";
import myFetch from "../../tools/MyFetch";
import PassageClassify from '../../redux/PassageClassify'
import Loading from '../../tools/loading'

const passageStyle=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        marginTop:screenUtils.autoSize(10),
    },
    title:{
        marginHorizontal:screenUtils.autoSize(20),
        lineHeight:screenUtils.autoSize(50),
        fontSize:screenUtils.autoFontSize(19),
        color:'#444'
    },
    passageCover:{
        width:'100%',
        height:screenUtils.autoSize(300),
        backgroundColor:'#fff'
    },
    passageCoverImg:{
        width:'100%',
        height:'100%',
    },
    classifyText:{
        position:'absolute',
        color:'#fff',
        fontSize:screenUtils.autoFontSize(15),
        right:screenUtils.autoSize(15),
        bottom:screenUtils.autoSize(15)
    },
    passageFooter:{
        height:screenUtils.autoSize(40),
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:screenUtils.autoSize(10)
    },
    createTime:{
        lineHeight:screenUtils.autoSize(40),
        fontSize:screenUtils.autoSize(15)
    },
    passageCounts:{
        flexDirection:'row'
    },
    countBox:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:screenUtils.autoSize(3),
        height:screenUtils.autoSize(40)
    },
    countImg:{
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20)
    },
    countText:{
        fontSize:screenUtils.autoSize(14),
    }
});
class OtherUserPassage extends Component{
    constructor(props){
        super(props);

    }

    _getTime(time){
        let date=new Date(time);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
    }
    render(){
        let {passage}=this.props;
        return (
            <TouchableWithoutFeedback>
                <View style={passageStyle.container}>
                    <Text numberOfLines={1} style={passageStyle.title}>{passage.title}</Text>
                    <View style={passageStyle.passageCover}>
                        <Image style={passageStyle.passageCoverImg} source={{uri:passage.coverImg}}/>
                        <Text style={passageStyle.classifyText}>{passage.classify}</Text>
                    </View>
                    <View style={passageStyle.passageFooter}>
                        <Text style={passageStyle.createTime}>{
                            this._getTime(passage.time)
                        }</Text>
                        <View style={passageStyle.passageCounts}>
                            <View style={passageStyle.countBox}>
                                <Image style={passageStyle.countImg} source={require('../../img/common/eye.png')}/>
                                <Text style={passageStyle.countText}>{passage.readCount}</Text>
                            </View>
                            <View style={passageStyle.countBox}>
                                <Image style={passageStyle.countImg} source={require('../../img/common/y_thumb.png')}/>
                                <Text style={passageStyle.countText}>{passage.thumbCount}</Text>
                            </View>
                            <View style={passageStyle.countBox}>
                                <Image style={passageStyle.countImg} source={require('../../img/common/y_comment.png')}/>
                                <Text style={passageStyle.countText}>{passage.commentCount}</Text>
                            </View>
                            <View style={passageStyle.countBox}>
                                <Image style={passageStyle.countImg} source={require('../../img/common/y_share.png')}/>
                                <Text style={passageStyle.countText}>{passage.shareCount}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
const styles=StyleSheet.create({
    passagesTitle:{
        paddingHorizontal:screenUtils.autoSize(15),
        backgroundColor:'#fff',
        height:screenUtils.autoSize(50),
        flexDirection:'row',
        alignItems:'center'
    },
    verLine:{
        borderRadius:screenUtils.autoSize(2.5),
        width:screenUtils.autoSize(5),
        height:screenUtils.autoSize(30),
        backgroundColor:'#3f81c1'
    },
    titleText:{
        marginLeft:screenUtils.autoSize(10),
        fontSize:screenUtils.autoFontSize(17),
        color:'#444'
    },
    emptyText:{
        fontSize:screenUtils.autoFontSize(25),
        textAlign:'center',
        lineHeight:screenUtils.autoSize(200)
    }
});
class OtherUserPassages extends Component{
    constructor(props){
        super(props);
        this.state={
            bottomRefreshing:0
        };
        this._renderHeader=this._renderHeader.bind(this);
        this._renderFooter=this._renderFooter.bind(this);
        this._bottomRefresh=this._bottomRefresh.bind(this);
    }
    _renderHeader(len){
        return(
            <View>
                {this.props.cover}
                <View style={styles.passagesTitle}>
                    <View style={styles.verLine}/>
                    <Text style={styles.titleText}>全部文章</Text>
                </View>
                {len==0?<Text style={styles.emptyText}>空空如也~</Text>:null}
            </View>
        );
    }
    componentDidMount(){
        let {navigation}=this.props;
        this.props.initOtherUser(navigation.state.params?navigation.state.params.otherUserId:'');
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
    _bottomRefresh(e){
        let {otherUser}=this.props,
            {passages}=this.props.otherUser;
        if(passages.length<5){
            return;
        }
        if(e.distanceFromEnd!=0&&this.state.bottomRefreshing==0){
            this.setState({bottomRefreshing:1});
            this.props.loadMore(otherUser.userID,passages,()=>{
                this.setState({bottomRefreshing:0});
            });
        }
    }
    render(){
        let {passages}=this.props.otherUser;
        return (
            <FlatList
                onScroll={this.props.onScroll}
                style={{
                    marginBottom:screenUtils.autoSize(60)
                }}
                ListHeaderComponent={this._renderHeader(passages.length)}
                ListFooterComponent={this._renderFooter}
                onEndReachedThreshold={0.1}
                onEndReached={this._bottomRefresh}
                extraData={this.state}
                data={passages}
                renderItem={({index,item})=>{
                    return <OtherUserPassage passage={item}/>
                }}
            />
        );
    }
}

let actions={
    initOtherUser:function (otherUserId) {
        return myFetch('http://www.baidu.com',{
            method:'GET',
        }).then(response=>response.text())
            .then(responseData=>{
                return {
                   type:'OTHER_USER_INIT',
                   payload:{
                       userId:'aaa',
                       userInfo:{
                           username:'令狐冲',
                           headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-7141_2018-04-18.jpg',
                           motto:'公无渡河，公竟渡河',
                           concernCount:32,
                           fansCount:125,
                       },
                       passages:[
                           {
                               title:'中国古拳法心经',
                               coverImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-3290_2018-04-18.jpg',
                               classify:PassageClassify[0],
                               time:new Date().getTime(),
                               readCount:12356,
                               thumbCount:256,
                               shareCount:555,
                               commentCount:88
                           },
                           {
                               title:'中国古拳法心经',
                               coverImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-3290_2018-04-18.jpg',
                               classify:PassageClassify[0],
                               time:new Date().getTime(),
                               readCount:12356,
                               thumbCount:256,
                               shareCount:555,
                               commentCount:88
                           },
                           {
                               title:'中国古拳法心经',
                               coverImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-3290_2018-04-18.jpg',
                               classify:PassageClassify[0],
                               time:new Date().getTime(),
                               readCount:12356,
                               thumbCount:256,
                               shareCount:555,
                               commentCount:88
                           },
                           {
                               title:'中国古拳法心经',
                               coverImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-3290_2018-04-18.jpg',
                               classify:PassageClassify[0],
                               time:new Date().getTime(),
                               readCount:12356,
                               thumbCount:256,
                               shareCount:555,
                               commentCount:88
                           },
                           {
                               title:'中国古拳法心经',
                               coverImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-3290_2018-04-18.jpg',
                               classify:PassageClassify[0],
                               time:new Date().getTime(),
                               readCount:12356,
                               thumbCount:256,
                               shareCount:555,
                               commentCount:88
                           },

                       ],
                       relation:{
                           isFollow:0
                       }
                   }
                };
            }).catch(err=>{
                alert(err)
            });
    },
    loadMore:function (otherUserId,passages,cb) {
        return myFetch('http://www.baidu.com',{
            method:'GET',
        }).then(response=>response.text())
            .then(responseData=>{
                cb();
                return {
                    type:'OTHER_USER_LOAD_MORE',
                    payload:{
                        passages:passages.concat([
                            {
                                title:'中国古拳法心经',
                                coverImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-3290_2018-04-18.jpg',
                                classify:PassageClassify[0],
                                time:new Date().getTime(),
                                readCount:12356,
                                thumbCount:256,
                                shareCount:555,
                                commentCount:88
                            },
                        ])
                    }
                };
            }).catch(err=>{
                cb();
                alert(err)
            });
    }
};
function mapStateToProps(state) {
    return {
        otherUser:state.OtherUser,
        user:state.user
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initOtherUser:(otherUserId)=>{dispatch(actions.initOtherUser(otherUserId))},
        loadMore:(otherUserId,passages,cb)=>{dispatch(actions.loadMore(otherUserId,passages,cb))}
    }
}

export default OtherUserPassages=connect(mapStateToProps,mapDispatchToProps)(OtherUserPassages);