import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, StyleSheet, Image,TouchableOpacity, BackHandler
} from 'react-native'
import {connect} from 'react-redux'
import MessageList from './MessageList'
import {screenUtils} from "../../tools/ScreenUtils";

const styles=StyleSheet.create({
    thumbMessage:{
        marginLeft:screenUtils.autoSize(15),
        borderColor:'#eee',
        borderBottomWidth:1,
        flexDirection:'row',
        paddingVertical:screenUtils.autoSize(10),
        paddingRight:screenUtils.autoSize(15)
    },
    headImg:{
        width:screenUtils.autoSize(50),
        height:screenUtils.autoSize(50),
        marginTop:screenUtils.autoSize(10),
        borderRadius:screenUtils.autoSize(25)
    },
    thumbCenter:{
        flex:1,
        paddingLeft:screenUtils.autoSize(10),
        height:screenUtils.autoSize(80),
    },
    name:{
        lineHeight:screenUtils.autoSize(40),
        color:'#2f51a1',
        fontSize:screenUtils.autoFontSize(17),
    },
    thumbImg:{
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20)
    },
    time:{
        lineHeight:screenUtils.autoSize(20),
        fontSize:screenUtils.autoSize(14),
        color:'#707070'
    },
    coverImg:{
        width:screenUtils.autoSize(80),
        height:screenUtils.autoSize(80),
    }
});
class ThumbMessage extends Component{
    constructor(props){
        super(props);
    }
    _getTime(time){
        let date=new Date(time);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }
    render(){
        let {message,navigation,user}=this.props,
            thumb=message;
        return(
            <View style={styles.thumbMessage}>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                    navigation.navigate('OtherUser',{otherUserId:thumb.userID});
                }}>
                    <Image style={styles.headImg} source={{uri:thumb.headImg}}/>
                </TouchableOpacity>
                <View style={styles.thumbCenter}>
                    <Text style={styles.name}>{thumb.name}</Text>
                    <Image style={styles.thumbImg} source={require('../../img/common/y_thumb.png')}/>
                    <Text style={styles.time}>{this._getTime(thumb.time)}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                    navigation.navigate('Passage',{
                        passage:{
                            passageID:thumb.passageID,
                            author:{
                                authorID:user.userInfo.userID,
                                headImg:user.userInfo.headImg,
                                name:user.userInfo.username
                            }
                        },
                    })
                }}>
                    <Image style={styles.coverImg} source={{uri:thumb.coverImg}}/>
                </TouchableOpacity>
            </View>
        );
    }
}
class MessageCenterThumb extends Component{
    static navigationOptions={
        headerTitle:'点赞',
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
            {thumb}=this.props.messageCenter;
        return(
            <View style={{
                flex:1,
                backgroundColor:'#fff'
            }}>
                <StatusBar translucent={true} backgroundColor={'#fff'} barStyle={'dark-content'}/>
                <MessageList
                    MessageComponent={ThumbMessage}
                    navigation={navigation}
                    messages={thumb}
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

export default MessageCenterThumb=connect(mapStateToProps,mapDispatchToProps)(MessageCenterThumb);