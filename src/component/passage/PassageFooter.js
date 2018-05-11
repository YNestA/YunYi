import React,{Component} from 'react'
import {View,Text,Image,StyleSheet,TextInput,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import {screenUtils} from '../../tools/MyTools'
import {connect} from 'react-redux'
import myFetch, {encodePostParams} from "../../tools/MyFetch";
import {ip} from "../../settings";
import Toast from "react-native-root-toast";

const styles=StyleSheet.create({
    container:{
        position:'absolute',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        left:0,
        right:0,
        bottom:0,
        zIndex:2000,
        borderWidth:0,
        borderTopWidth:1,
        borderColor:'#eee'
    },
    commentInput:{
        flex:1,
        color:'#333',
        backgroundColor:'#efefef',
        marginVertical:screenUtils.autoSize(8),
        maxHeight:screenUtils.autoSize(100),
        lineHeight:screenUtils.autoSize(32),
        padding:screenUtils.autoSize(8),
        fontSize:screenUtils.autoFontSize(17),
        textAlignVertical:'center',
        marginLeft:screenUtils.autoSize(5),
        borderRadius:screenUtils.autoSize(8),
    },
    infoContainer:{
        width:screenUtils.autoSize(180),
        flexDirection:'row',
        justifyContent:'space-around'
    },
    sendView:{
        padding:screenUtils.autoSize(5),
        marginHorizontal:screenUtils.autoSize(10)
    },
    sendText:{
        fontSize:screenUtils.autoFontSize(18),
        color:'#3f81c1'
    },
    infoBox:{
        width:screenUtils.autoSize(40),
        height:screenUtils.autoSize(50),
   //     backgroundColor:'blue'
    },
    infoImg:{
        width:screenUtils.autoSize(26),
        height:screenUtils.autoSize(26),
        marginVertical:screenUtils.autoSize(2),
        marginHorizontal:screenUtils.autoSize(7)
    },
    infoText:{
        width:screenUtils.autoSize(40),
        height:screenUtils.autoSize(20),
        fontSize:screenUtils.autoSize(15),
        color:'#555',
        lineHeight:screenUtils.autoSize(20),
        textAlign:'center',
    },
    thumbText:{
        color:'#d4237a'
    }
});

function showTip(message,onHidden){
    Toast.show(message,{
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        onHidden:onHidden
    });
}
class PassageFooter extends Component{
    constructor(props){
        super(props);
        this.state={
            inputFocused:false,
            commentText:'',
            committing:false,
        };
        this._changeThumb=this._changeThumb.bind(this);
        this._commitComment=this._commitComment.bind(this);
    }
    _changeThumb(){
        let {navigation,changeThumb,passages,passageID,user}=this.props;
        if(user.isLogin){
            changeThumb(passages[passageID],user);
        }else{
            navigation.navigate('LoginCenter');
        }
    }
    _commitComment(){
        let {user,passages,passageID,navigation}=this.props,
            passage=passages[passageID];
        if(user.isLogin) {
            this.setState({committing: true});
            this.props.commitComment(this.state.commentText, user, passage, (success) => {
                if (success) {
                    showTip('评论成功');
                    this.refs.textInput.blur();
                    this.setState({
                        committing: false,
                        inputFocused: true,
                        commentText: ''
                    });
                } else {
                    showTip('评论失败');
                    this.setState({
                        committing: false
                    });
                }
            });
        }else{
            navigation.navigate('LoginCenter');
        }
    }
    render(){
        let passages=this.props.passages,
            passage=passages[this.props.passageID];
        if (passage) {
            return (
                <View style={styles.container}>
                    <TextInput
                        style={styles.commentInput}
                        placeholder={'写下你的感受...'}
                        ref={'textInput'}
                        multiline={true}
                        maxLength={250}
                        value={this.state.commentText}
                        onChangeText={(text) => {
                            this.setState({commentText: text})
                        }}
                        onBlur={() => {
                            this.setState({inputFocused: false})
                        }}
                        onFocus={() => {
                            this.setState({inputFocused: true})
                        }}
                        underlineColorAndroid={'transparent'}
                    />
                    {this.state.inputFocused ?
                        <TouchableOpacity
                            disabled={this.state.committing}
                            onPress={this._commitComment}
                        >
                            <View style={styles.sendView}><Text style={styles.sendText}>发送</Text></View>
                        </TouchableOpacity>
                        :
                        <View style={styles.infoContainer}>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => {
                                this.refs.textInput.focus();
                            }}>
                                <View style={styles.infoBox}>
                                    <Image style={styles.infoImg} source={require('../../img/common/y_comment.png')}/>
                                    <Text
                                        style={styles.infoText}>{passage.commentCount > 0 ? passage.commentCount : '评论'}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableWithoutFeedback activeOpacity={1} onPress={this._changeThumb}>
                                <View style={styles.infoBox}>
                                    {(passage.ifThumb) ?
                                        <Image style={styles.infoImg}
                                               source={require('../../img/common/thumb-fill.png')}/>
                                        :
                                        <Image style={styles.infoImg} source={require('../../img/common/y_thumb.png')}/>
                                    }
                                    <Text style={[styles.infoText, (passage.ifThumb) ? styles.thumbText : {}]}>{
                                        passage.thumbCount > 0 ? passage.thumbCount : '点赞'
                                    }</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableOpacity>
                                <View style={styles.infoBox}>
                                    <Image style={styles.infoImg} source={require('../../img/common/y_share.png')}/>
                                    <Text
                                        style={styles.infoText}>{passage.shareCount > 0 ? passage.shareCount : '分享'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            );
        }else{
            return <View/>;
        }
    }
}

let actions={
    changeThumb:function (passage,user) {
        let url=passage.ifThumb?`http://${ip}:4441/api/article/like/cancel`:`http://${ip}:4441/api/article/like/add`;
        myFetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'user_token':user.token,
            },
            body:encodePostParams({
                passageUuid:passage.passageID,
                authorUuid:passage.author.authorID
            })
        });
        let payload={};
        payload[passage.passageID]=Object.assign({},passage,{
            ifThumb:!passage.ifThumb,
            thumbCount:passage.ifThumb?passage.thumbCount-1:passage.thumbCount+1
        });
        return {
            type:'CHANGE_PASSAGE_THUMB',
            payload:payload
        }
    },
    commitComment:function (commentText,user,passage,cb) {
        return myFetch(`http://${ip}:4441/api/article/comment/insert/`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'user_token':user.token,
            },
            body:encodePostParams({
                content:commentText,
                passageUuid:passage.passageID,
                authorUuid:passage.author.authorID
            })
        }).then(response=>response.json())
            .then(responseData=>{
                //alert(JSON.stringify(responseData));
                if(responseData.code==10001){
                    cb(true);
                    let payload={};
                    payload[passage.passageID]=Object.assign({},passage,{
                        commentCount:passage.commentCount+1,
                        comments:[
                            {
                                name:user.userInfo.username,
                                content:commentText,
                                time:new Date().getTime(),
                                userId:user.userInfo.userID,
                                commentId:responseData.data.commentId,
                                headImg:user.userInfo.headImg,
                                thumbCount:0,
                            },
                        ].concat(passage.comments)
                    });
                    return {
                        type:'COMMIT_PASSAGE_COMMENT',
                        payload:payload
                    }
                }else{
                    cb(false);
                }
            }).catch(err=>{
                alert(err);
                cb(false);
            })
    }
};

function mapStateToProps(state) {
    return {
        passages:state.passage,
        user:state.user
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeThumb:(passage,user)=>{dispatch(actions.changeThumb(passage,user))},
        commitComment:(commentText,user,passage,cb)=>{dispatch(actions.commitComment(commentText,user,passage,cb))}
    };
}

export default PassageFooter=connect(mapStateToProps,mapDispatchToProps)(PassageFooter);