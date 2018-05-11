import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableNativeFeedback,
    StatusBar,
    Picker,
    TextInput,
    findNodeHandle,
    UIManager
} from 'react-native'
import {connect} from "react-redux"
import NetworkError from '../../tools/NetworkError'
import myFetch from '../../tools/MyFetch'
import {screenUtils} from '../../tools/ScreenUtils'
import PopupDialog, {DialogTitle, SlideAnimation, DialogButton, ScaleAnimation} from 'react-native-popup-dialog'
import ImagePicker from 'react-native-image-crop-picker'
import {ip} from "../../settings";
import Toast from 'react-native-root-toast';
import {getFormData} from "../../tools/MyTools";
import UploadTip from "../edit-new/UploadTip"


class SignNameChangeDetail extends Component {
    constructor(props) {
        super(props);
        this._selectImg = this._selectImg.bind(this);
        this._sendImg = this._sendImg.bind(this);
        this._changeNickName = this._changeNickName.bind(this);
        this._Toast = this._Toast.bind(this);
        this.state = {text: ''}
    }

    static navigationOptions = () => {
        return {
            headerTitle: '账号设置',
            headerRight:<View/>
        };
    };

    _changeNickName(nickName) {
        let userBasic = this.props.userMessageLogIn;
        let r = /^\d+$/;
        nickName=nickName.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        if(nickName==''){
            this._Toast('不可以全空格或空');
            return false;
        }
        if (!r.test(nickName)) {
            this._Toast('修改成功');
            fetch('http://' + ip + '', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'user_token': userBasic.token,
                },
                body: JSON.stringify({
                    nickNameChange:nickName,
                })
            })
        } else {
            this._Toast('修改失败：不能是纯数字');
        }
    }

    _Toast(message) {
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
        });
        setTimeout(function () {
            Toast.hide(toast);
        }, 2000);
    }

    _sendImg(image){
        let user=this.props.userMessageLogIn;
        this.refs.uploadTip.show();
        myFetch(`http://${ip}:4441/mine/img/upload-avatar`,{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
                'user_token':user.token
            },
            body:getFormData({
                avatar: {
                    uri: image.path,
                    type: 'multipart/form-data',
                    name: image.path.slice(image.path.lastIndexOf('\/')+1, image.path.length)
                }
            })
        }).then(response=>response.json())
            .then(responseData=>{
                this.refs.uploadTip.dismiss();
                if(responseData.code==10001){
                    this._Toast('上传成功');
                    this.props.changeAvatar(responseData.data);
                }else{
                    this._Toast('上传失败');
                }
            }).catch((err)=>{
                this.refs.uploadTip.dismiss();
                this._Toast('上传失败');
            });
    }

    _selectImg() {
        ImagePicker.openPicker({
            mediaType: 'photo'
        }).then((image) => {
            console.log(image);
            this._sendImg(image);
        });
    };

    render() {
        let userM = this.props.mineViewUserMessage,
            user=this.props.userMessageLogIn;
        return (
            <View>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <TouchableNativeFeedback
                    onPress={() => {
                        this._selectImg()
                    }}
                >
                    <View style={[styles.avatarChange]}>
                        <View>
                            <Text style={styles.itemText}>头像</Text>
                        </View>
                        <View style={styles.detailChangeContainer}>
                            <Image source={userM.avatar ? {uri: userM.avatar} : require('../../img/profilePic.jpg')}
                                   style={styles.avatar}/>
                            <Image source={require('../../img/profile-more.png')} style={styles.itemChangeDetail}/>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={() => {
                        //this.refs.changeUserName.show()
                    }}
                >
                    <View style={styles.avatarChange}>
                        <View>
                            <Text style={styles.itemText}>昵称</Text>
                        </View>
                        <View style={styles.detailChangeContainer}>
                            <Text style={styles.detailContent}>{user.userInfo.username}</Text>
                            <Image source={require('../../img/profile-more.png')} style={styles.itemChangeDetail}/>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={styles.avatarChange}>
                        <View>
                            <Text style={styles.itemText}>性别</Text>
                        </View>
                        <View style={styles.detailChangeContainer}>
                            <Text style={styles.detailContent}>这是性别</Text>
                            <Image source={require('../../img/profile-more.png')} style={styles.itemChangeDetail}/>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={styles.avatarChange}>
                        <View>
                            <Text style={styles.itemText}>生日</Text>
                        </View>
                        <View style={styles.detailChangeContainer}>
                            <Text style={styles.detailContent}>这是生日</Text>
                            <Image source={require('../../img/profile-more.png')} style={styles.itemChangeDetail}/>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>{
                    this.props.logout(this.props.userMessageLogIn,this.props.navigation);
                }}>
                    <View style={styles.signOutBotton}>
                        <Text style={styles.LogOut}>退出账号</Text>
                    </View>
                </TouchableNativeFeedback>

                <PopupDialog
                    containerStyle={{justifyContent: 'flex-start'}}
                    width={screenUtils.autoSize(300)}
                    height={screenUtils.autoSize(80)}
                    ref='changeUserName'
                >
                    <View style={{padding: 10}}
                    >
                        <TextInput
                            style={{height: 40}}
                            onChangeText={(textname) => this.state.text = textname}
                            placeholder="不可以是纯数字哟～"/>
                        <TouchableNativeFeedback
                            onPress={() => {
                                //this._changeNickName(this.state.text)
                            }}
                        >
                            <View>
                                <Text>确定</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </PopupDialog>
                <UploadTip ref={'uploadTip'}/>
            </View>
        );
    }
}

let actions = {
    // setNetworkError:function (value) {
    //     return {
    //         type:'NETWORK_ERROR',
    //         payload: {
    //             networkError: value,
    //         }
    //     }
    // },
    changeAvatar: function (imagePath) {
        return {
            type: 'CHANGE_AVATAR',
            payload: {
                avatar: imagePath
            }
        }
    },
    logout:function (user,navigation) {
        myFetch(`http://${ip}:4441/api/signout/`,{
            method:'POST',
            headers:{
                'user_token':user.token,
            }
        });
        myStorage.remove({
            key:'user'
        });
        navigation.navigate('LoginCenter',{firstEnter:true});
        return {
            type: 'LOGOUT',
            payload: {
                isLogin:false,
                token:'',
                userInfo:{
                    userID:'',
                    username:'',
                    phoneNum:'',
                    headImg:''
                }
            }
        }
    },
    changeNickName: function (nickname) {
        return {
            type: 'CHANGE_NICK_NAME',
            payload: {
                nickname: nickname,
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        mineViewUserMessage: state.mineViewUserMessage,
        userMessageLogIn: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeAvatar: (imagePath) => {
            dispatch(actions.changeAvatar(imagePath))
        },
        changeNickName: (nickNameInput) => {
            dispatch(actions.changeNickName(nickNameInput))
        },
        logout:(user,navigation)=>{dispatch(actions.logout(user,navigation))}
    }
}

export default SignNameChangeDetail = connect(mapStateToProps, mapDispatchToProps)(SignNameChangeDetail);

const styles = StyleSheet.create({
    avatarChange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: screenUtils.autoSize(0.5),
        backgroundColor: 'white',
        alignItems: 'center',
    },
    itemText: {
        fontSize: screenUtils.autoSize(14),
        marginLeft: screenUtils.autoSize(15),
    },
    avatar: {
        width: screenUtils.autoSize(70),
        height: screenUtils.autoSize(70),
        borderRadius: screenUtils.autoSize(70),
    },
    itemChangeDetail: {
        marginLeft: screenUtils.autoSize(5),
        marginRight: screenUtils.autoSize(5),
        width: screenUtils.autoSize(20),
        height: screenUtils.autoSize(20),
    },
    detailChangeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: screenUtils.autoSize(10),
        paddingTop: screenUtils.autoSize(10),
    },
    detailContent: {
        fontSize: screenUtils.autoSize(15),
    },
    signOutBotton: {
        flexDirection: 'row',
        paddingVertical:screenUtils.autoSize(15),
        backgroundColor: '#fff',
        fontSize:screenUtils.autoFontSize(25),
        marginTop: screenUtils.autoSize(50),
    },
    LogOut: {
        width: '100%',
        textAlign: 'center',
        fontSize: screenUtils.autoSize(18),
        color: '#f00',
        fontWeight: '100',
    },
});