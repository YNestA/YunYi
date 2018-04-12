import React,{Component} from 'react'
import {StyleSheet,View,Image,Text,TouchableOpacity} from 'react-native'
import {screenUtils,myFetch} from '../../tools/MyTools'
import {connect} from "react-redux";
import {encodePostParams} from "../../tools/MyFetch";

const styles=StyleSheet.create({
    container:{
        height:screenUtils.autoSize(80),
        marginHorizontal:screenUtils.autoSize(15),
        paddingVertical:screenUtils.autoSize(15),
        backgroundColor:'#fff',
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:'#eee'
    },
    iconContainer:{
        width:screenUtils.autoSize(60),
        height:screenUtils.autoSize(60)
    },
    icon:{
        width:screenUtils.autoSize(50),
        height:screenUtils.autoSize(50),
        borderRadius:screenUtils.autoSize(30)
    },
    nameContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:screenUtils.autoSize(10)
    },
    name:{
        lineHeight:screenUtils.autoSize(50),
        color:'#444',
        fontSize:screenUtils.autoFontSize(19)
    },
    rightArrow:{
        width:screenUtils.autoSize(15),
        height:screenUtils.autoSize(15)
    },
    notRead:{
        width:screenUtils.autoSize(18),
        height:screenUtils.autoSize(18),
        color:'#fff',
        textAlign:'center',
        fontSize:screenUtils.autoFontSize(11),
        lineHeight:screenUtils.autoSize(16),
        borderRadius:screenUtils.autoSize(8),
        backgroundColor:'#e8222d',
        position:'absolute',
        right:screenUtils.autoSize(3),
        top:0
    }
});

class MessageEntry extends Component{
    constructor(props){
        super(props);
        this._enterEntry=this._enterEntry.bind(this);
    }
    messageIcons={
        concern:require('../../img/message-center/mesage_concern.png'),
        thumbComment:require('../../img/message-center/message_thumb.png'),
        share:require('../../img/message-center/message_share.png'),
        notification:require('../../img/message-center/message_notification.png'),
        letter:require('../../img/message-center/message_letter.png')
    };
    _enterEntry(){
        let {messageCenter,user,navigation,entry}=this.props;
        this.props.clearNotRead(entry.type,messageCenter,user,navigation);
    }
    render(){
        let {entry}=this.props;
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={this._enterEntry}>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={this.messageIcons[entry.type]}/>
                        {(entry.notRead)?<Text numberOfLines={1} style={styles.notRead}>{entry.notRead>99?'...':entry.notRead}</Text>:null}
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{entry.name}</Text>
                        <Image style={styles.rightArrow} source={require('../../img/common/right_arrow.png')}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

let actions={
    clearNotRead:function (type,messageCenter,user,navigation) {
        let payload={};
        payload[type]=Object.assign({},messageCenter[type],{notRead:0});
        //navigation.navigate('MessageCenter'+type);
        navigation.navigate('CommonRegister');
        return myFetch('https://www.baidu.com',{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'user_token':user.token
            },
            body:encodePostParams({
                type:type,
            })
        }).then(response=>response.text())
            .then(responseData=>{

                return {
                    type:'CLEAR_NOT_READ',
                    payload:payload
                }
            })
            .catch(err=>{
                alert(err);
                console.log(err);
            });
    }
};

function mapStateToProps(state) {
    return {
        user:state.user,
        messageCenter:state.MessageCenter
    }
}
function mapDispatchToProps(dispatch) {
    return {
        clearNotRead:(type,messageCenter,user,navigation)=>{dispatch(actions.clearNotRead(type,messageCenter,user,navigation))}
    };
}

export default MessageEntry=connect(mapStateToProps,mapDispatchToProps)(MessageEntry);