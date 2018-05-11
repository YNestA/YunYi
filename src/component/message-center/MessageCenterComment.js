import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, StyleSheet, Image,TouchableOpacity, BackHandler
} from 'react-native'
import {connect} from 'react-redux'
import MessageList from './MessageList'
import {screenUtils} from "../../tools/ScreenUtils";

const styles=StyleSheet.create({
    commentMessage:{
        marginLeft:screenUtils.autoSize(15),
        borderColor:'#eee',
        borderBottomWidth:1,
        flexDirection:'row',
        paddingVertical:screenUtils.autoSize(10),
        paddingRight:screenUtils.autoSize(15)
    },
    headImg:{
        width:screenUtils.autoSize(60),
        height:screenUtils.autoSize(60),
        marginTop:screenUtils.autoSize(10),
        borderRadius:screenUtils.autoSize(30)
    },
    commentCenter:{
        flex:1,
        paddingLeft:screenUtils.autoSize(10),
        height:screenUtils.autoSize(80),
    },
    name:{
        lineHeight:screenUtils.autoSize(30),
        color:'#2f51a1',
        fontSize:screenUtils.autoFontSize(17),
    },
    content:{
        fontSize:screenUtils.autoFontSize(16),
        color:'#666',
        lineHeight:screenUtils.autoSize(20)
    },
    time:{
        lineHeight:screenUtils.autoSize(30),
        fontSize:screenUtils.autoSize(14),
        color:'#707070'
    },
    coverImg:{
        width:screenUtils.autoSize(80),
        height:screenUtils.autoSize(80),
    }
});
class CommentMessage extends Component{
    constructor(props){
        super(props);
    }
    _getTime(time){
        let date=new Date(time);
        return `${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    }
    render(){
        let {message,navigation,user}=this.props,
            comment=message;
        return(
            <View style={styles.commentMessage}>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                    navigation.navigate('OtherUser',{otherUserId:comment.userID});
                }}>
                    <Image style={styles.headImg} source={{uri:comment.headImg}}/>
                </TouchableOpacity>
                <View style={styles.commentCenter}>
                    <Text style={styles.name}>{comment.name}</Text>
                    <Text numberOfLines={1} style={styles.content}>{comment.content}</Text>
                    <Text style={styles.time}>{this._getTime(comment.time)}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                    navigation.navigate('Passage',{
                        passage:{
                            passageID:comment.passageID,
                            author:{
                                authorID:user.userInfo.userID,
                                headImg:user.userInfo.headImg,
                                name:user.userInfo.username
                            }
                        },
                    })
                }}>
                    <Image style={styles.coverImg} source={{uri:comment.coverImg}}/>
                </TouchableOpacity>
            </View>
        );
    }
}
class MessageCenterComment extends Component{
    static navigationOptions={
        headerTitle:'评论',
        headerRight:<View/>
    };
    constructor(props){
        super(props);
        this._backHandler=this._backHandler.bind(this);
    }
    _backHandler(){
        this.props.navigation.goBack(null);
        return true;
    }
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }

    render(){
        let {navigation}=this.props,
            {comment}=this.props.messageCenter;
        return(
            <View style={{
                flex:1,
                backgroundColor:'#fff'
            }}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <MessageList
                    MessageComponent={CommentMessage}
                    navigation={navigation}
                    messages={comment}
                />
            </View>
        );
    }
}

let actions={

};

function mapStateToProps(state) {
    return {
        user:state.user,
        messageCenter:state.MessageCenter
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default MessageCenterComment=connect(mapStateToProps,mapDispatchToProps)(MessageCenterComment);