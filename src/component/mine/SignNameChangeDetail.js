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
            headerStyle: {marginTop: StatusBar.currentHeight},
            headerTitleStyle: {},
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

    _sendImg(image) {
        // 创建form表单
        let body = new FormData();
        console.log('image', image);
        console.log(this);
        // token和key都是通过七牛返回的参数
        console.log(this.props.changeAvatar(image.path));
        body.append('file', {
            // 设定上传的格式
            type: 'image/jpeg',
            // 通过react-native-image-picker获取的图片地址
            uri: image.path,
            name: 'avatar',
        });
        // 开启XMLHttpRequest服务
        let xhr = new XMLHttpRequest();
        /** 上传到七牛云的地址 */
        let url = 'http://' + ip + ":4441/avatarchange";
        // 开启post上传
        xhr.open('POST', url);
        // 如果正在上传,返回上传进度
        if (xhr.upload) {
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    let perent = event.loaded / event.total.toFixed(2);
                    // 打印上传进度
                    console.log(perent);
                }
            }
        }

        // 上传过成功的返回
        xhr.onload = () => {
            // console.log(xhr.status);
            // 状态码如果不等于200就代表错误
            if (xhr.status !== 200) {
                alert('请求失败');
                console.log(xhr.responseText);
                return;
            }
            if (!xhr.responseText) {
                alert('请求失败');
                console.log(xhr.responseText);
                return;
            }
            // 服务器最后返回的数据
            let response;
            try {
                // 将返回数据还原
                response = JSON.parse(xhr.response);
                console.log(response);
                // ...通过返回数据做接下来的处理
            } catch (e) {
                console.log('error', e);
            }
            // 发送请求
            xhr.send(body);
        }
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
        let userM = this.props.mineViewUserMessage;
        console.log(userM);
        return (
            <View>
                <TouchableNativeFeedback
                    onPress={() => {
                        this._selectImg()
                    }}
                >
                    <View style={[styles.avatarChange, {marginTop: screenUtils.autoSize(40)}]}>
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
                        this.refs.changeUserName.show()
                    }}
                >
                    <View style={styles.avatarChange}>
                        <View>
                            <Text style={styles.itemText}>昵称</Text>
                        </View>
                        <View style={styles.detailChangeContainer}>
                            <Text style={styles.detailContent}>{userM.nickname}</Text>
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
                <TouchableNativeFeedback>
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
                                this._changeNickName(this.state.text)
                            }}
                        >
                            <View>
                                <Text>确定</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </PopupDialog>
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
        fontSize: screenUtils.autoSize(14),
    },
    signOutBotton: {
        flexDirection: 'row',
        paddingBottom: screenUtils.autoSize(5),
        paddingTop: screenUtils.autoSize(5),
        backgroundColor: '#fff',
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