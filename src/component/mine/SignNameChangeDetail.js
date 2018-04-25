import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ScrollView, TouchableNativeFeedback, StatusBar, Picker, TextInput, findNodeHandle, UIManager} from 'react-native'
import {connect} from "react-redux"
import NetworkError from '../../tools/NetworkError'
import myFetch from '../../tools/MyFetch'
import {screenUtils} from '../../tools/ScreenUtils'
import PopupDialog, {DialogTitle, SlideAnimation, DialogButton, ScaleAnimation} from 'react-native-popup-dialog'
import ImagePicker from 'react-native-image-crop-picker'

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

let userM = {};

export default class SignNameChangeDetail extends Component {
    constructor(props) {
        super(props);
        this._selectImg = this._selectImg.bind(this);
        this._inputFocus = this._inputFocus.bind(this);
        this._inputLayout = this._inputLayout.bind(this);
        this._layout = this._layout.bind(this);
        this._sendImg = this._sendImg.bind(this);
    }

    componentDidMount() {
        let userM = this.props.navigation.state.params.user;
        console.log('userm',userM);
    }

    static navigationOptions = () => {
        return {
            headerTitle: '账号设置',
            headerStyle: {marginTop: StatusBar.currentHeight},
            headerTitleStyle: {},
        };
    };

    _layout(ref) {
        const handle = findNodeHandle(ref);
        return new Promise((resolve) => {
            UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                resolve({x, y, width, height, pageX, pageY});
            });
        });
    }

    _sendImg(image){
        // 创建form表单
        let body = new FormData();
        let userM = this.props.navigation.state.params.user;
        console.log('image',image);
        // token和key都是通过七牛返回的参数
        body.append('token',userM.token);
        body.append('file',{
            // 设定上传的格式
            type : 'image/jpeg',
            // 通过react-native-image-picker获取的图片地址
            uri : uri,
            name : key,
        });
        // 开启XMLHttpRequest服务
        let xhr = new XMLHttpRequest();
        /** 上传到七牛云的地址 */
        let url = Config.qiniu.upload;
        // 开启post上传
        xhr.open('POST',url);
        // 如果正在上传,返回上传进度
        if (xhr.upload){
            xhr.upload.onprogress = (event)=>{
                if (event.lengthComputable){
                    let perent = event.loaded / event.total.toFixed(2);
                    // 打印上传进度
                    console.log(perent);
                }
            }
        }

        // 上传过成功的返回
        xhr.onload = ()=>{
            // console.log(xhr.status);
            // 状态码如果不等于200就代表错误
            if (xhr.status !== 200){
                alert('请求失败');
                console.log(xhr.responseText);
                return;
            }
            if (!xhr.responseText){
                alert('请求失败');
                console.log(xhr.responseText);
                return;
            }
            // 服务器最后返回的数据
            let response;
            try{
                // 将返回数据还原
                response = JSON.parse(xhr.response);
                console.log(response);
                // ...通过返回数据做接下来的处理
            }catch (e) {
                console.log('error',e);
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

    _inputLayout(input) {
        console.log('this is input ', input);
        console.log(this._layout(this.refs.inputView));
    }

    _inputFocus() {
        // let scroller = this.refs.inputScrollViewContainer;
        // setTimeout(()=>{
        //     let y = this.state.inputPositionY;//Dev_height为屏幕的高度
        //     scroller.scrollTo({x:0, y:y, animated:true});
        // },50);
        console.log(this._layout(this.refs.inputView));
    }

    render() {
        let userM = this.props.navigation.state.params.user;
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
                            <Image source={require('../../img/profilePic.jpg')} style={styles.avatar}/>
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
                    containerStyle={{position: 'relative', top: screenUtils.autoSize(5),}}
                    width={screenUtils.autoSize(300)}
                    height={screenUtils.autoSize(80)}
                    ref='changeUserName'
                    dialogAnimation={new ScaleAnimation()}
                >
                    <ScrollView
                        ref='inputScrollViewContainer'
                        style={{flex: 1}}
                    >
                        <View style={{padding: 10}}
                              onLayout={this._inputLayout.bind(this)}
                              ref='inputView'
                        >
                            <TextInput
                                style={{height: 40}}
                                placeholder="Type here to translate!"
                                onFocus={this._inputFocus.bind(this)}
                            />
                            <Text style={{padding: 10, fontSize: 42}}>

                            </Text>
                        </View>
                    </ScrollView>

                </PopupDialog>
            </View>
        );
    }
}

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
        width: screenUtils.autoSize(80),
        height: screenUtils.autoSize(80),
        borderRadius: screenUtils.autoSize(80),
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