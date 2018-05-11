import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, FlatList,StyleSheet, Image, BackHandler,TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import Loading from "../../tools/loading";
import myFetch, {encodePostParams} from "../../tools/MyFetch"
import MessageList from "./MessageList";
import {screenUtils} from "../../tools/ScreenUtils";

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    concernMessage:{
        marginLeft:screenUtils.autoSize(15),
        borderColor:'#eee',
        borderBottomWidth:1,
        flexDirection:'row',
        paddingVertical:screenUtils.autoSize(10)
    },
    userImg:{
        width:screenUtils.autoSize(60),
        height:screenUtils.autoSize(60),
        borderRadius:screenUtils.autoSize(30)
    },
    messageRight:{
        flex:1,
        marginLeft:screenUtils.autoSize(15)
    },
    concernUsername:{
        color:'#2f51a1',
        fontSize:screenUtils.autoFontSize(17),
        lineHeight:screenUtils.autoSize(23)
    },
    concernContent:{
        color:'#555',
        fontSize:screenUtils.autoFontSize(16),
        lineHeight:screenUtils.autoSize(23)
    },
    concernTime:{
        color:'#777',
        fontSize:screenUtils.autoFontSize(14),
        lineHeight:screenUtils.autoSize(23)
    }
});
class ConcernMessage extends Component{
    constructor(props){
        super(props);
    }
    _getTime(time){
        let date=new Date(time);
        return `${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    }
    render(){
        let {message,navigation}=this.props;
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                navigation.navigate('OtherUser',{otherUserId:message.user.userID});
            }}>
                <View style={styles.concernMessage}>
                    <Image style={styles.userImg} source={{uri:message.user.headImg}}/>
                    <View style={styles.messageRight}>
                        <Text style={styles.concernUsername}>{message.user.username}</Text>
                        <Text style={styles.concernContent}>关注了你</Text>
                        <Text style={styles.concernTime}>{this._getTime(message.time)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
class MessageCenterConcern extends Component{
    static navigationOptions={
        headerTitle:'关注消息',
        headerRight:<View/>
    };
    constructor(props){
        super(props);
        this.state={
            loading:true,
        };
        this._backHandler=this._backHandler.bind(this);
    }
    _backHandler(){
        this.props.navigation.goBack(null);
        return true;
    }
    componentDidMount(){
    }
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    render(){
        let {concern}=this.props.messageCenter;
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <MessageList
                    navigation={this.props.navigation}
                    MessageComponent={ConcernMessage}
                    messages={concern}
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

export default MessageCenterConcern=connect(mapStateToProps,mapDispatchToProps)(MessageCenterConcern);
