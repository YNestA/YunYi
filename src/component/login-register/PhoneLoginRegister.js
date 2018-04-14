import React,{Component} from 'react'
import Toast from 'react-native-root-toast'
import {
    View, Text, TextInput, StyleSheet, StatusBar, TouchableWithoutFeedback, TouchableOpacity,
    BackHandler
} from 'react-native'
import {screenUtils, myFetch, encodePostParams} from "../../tools/MyTools";
import {connect} from "react-redux";

function showTip(message,hiddenCb) {
    Toast.show(message,{
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        onHidden:hiddenCb,
    });
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop:screenUtils.autoSize(20)
    },
    field:{
        flexDirection:'row',
        marginHorizontal:screenUtils.autoSize(25),
        height:screenUtils.autoSize(60),
        borderColor:'#eee',
        borderBottomWidth:1,
    },
    fieldText:{
        width:screenUtils.autoSize(80),
        lineHeight:screenUtils.autoSize(60),
        height:screenUtils.autoSize(60),
        fontSize:screenUtils.autoFontSize(17),
        color:'#444',
    },
    fieldInput:{
        flex:1,
        padding:0,
        color:'#444',
        height:screenUtils.autoSize(60),
        fontSize:screenUtils.autoFontSize(17),
        lineHeight:screenUtils.autoSize(60)
    },
    checkCode:{
        justifyContent:'center'
    },
    checkCodeText:{
        color:'#fff',
        backgroundColor:'#cecece',
        fontSize:screenUtils.autoFontSize(13),
        lineHeight:screenUtils.autoSize(25),
        paddingHorizontal:screenUtils.autoSize(5),
        borderRadius:screenUtils.autoSize(5)
    },
    tip:{
        marginTop:screenUtils.autoSize(40),
        color:'#777',
        fontSize:screenUtils.autoFontSize(13),
        lineHeight:screenUtils.autoSize(20),
        textAlign:'center'
    },
    loginBtn:{
        marginTop:screenUtils.autoSize(10),
        height:screenUtils.autoSize(50),
        backgroundColor:'#5fa1e1',
        marginHorizontal:screenUtils.autoSize(25),
        borderRadius:screenUtils.autoSize(10)
    },
    loginText:{
        color:'#fff',
        fontSize:screenUtils.autoFontSize(20),
        lineHeight:screenUtils.autoSize(50),
        textAlign:'center'
    }
});

class PhoneLoginRegister extends Component{
    static navigationOptions=({navigation})=>{
        return {
            headerTitle:'手机号登录/注册',
            headerRight:<View/>
        };
    };
    _showTip(message){
        Toast.show(message,{
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
        });
    }
    _loginRegister(){
        let {phoneNum,checkCode}=this.state
;        if(!this.state.sending){
            this.setState({sending:true});
            if(phoneNum.length==0){
                showTip('请输入手机号',()=>{
                    this.setState({sending:false});
                });
            }else if(checkCode.length==0){
                showTip('请输入验证码',()=>{
                    this.setState({sending:false});
                });
            }else if(phoneNum.length!=11){
                showTip('请输入正确的手机号',()=>{
                    this.setState({sending:false});
                });
            }else {
                this.props.phoneLoginRegister(phoneNum,checkCode,this.props.navigation,()=>{
                    this.setState({sending:false});
                });
            }
        }
    }
    _getCheckCode(){
        if(!this.state.getCheckCode) {
            myFetch('https://www.baidu.com');
            this.setState({
                getCheckCode: true,
                retryTime: 60,
            }, () => {
                this.intervalId = setInterval(() => {
                    if (this.state.retryTime === 0) {
                        clearInterval(this.intervalId);
                        this.setState({
                            getCheckCode: false,
                            retryTime: 60
                        });
                    } else {
                        this.setState({
                            retryTime: this.state.retryTime - 1
                        });
                    }
                }, 1000);
            });
        }
    }
    constructor(props){
        super(props);
        this.state={
            getCheckCode:false,
            retryTime:60,
            phoneNum:'',
            checkCode:'',
            sending:false,
        };
        this._loginRegister=this._loginRegister.bind(this);
        this._getCheckCode=this._getCheckCode.bind(this);
        this._showTip=this._showTip.bind(this);
        this._backHandler=this._backHandler.bind(this);
    }
    _backHandler(){
        this.props.navigation.goBack(null);
        return true;
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    render(){
        let params=this.props.navigation.state.params,
            fromRegister=params?params.fromRegister:false;
        return(
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={'#fff'} barStyle={'dark-content'}/>
                <View style={styles.field}>
                    <Text style={styles.fieldText}>手机号</Text>
                    <TextInput
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        placeholder={'请输入手机号'}
                        maxLength={11}
                        keyboardType={'numeric'}
                        caretHidden={true}
                        onChangeText={(text)=>{
                            this.setState({phoneNum:text});
                        }}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.fieldText}>验证码</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.fieldInput}
                        placeholder={'请输入验证码'}
                        keyboardType={'numeric'}
                        maxLength={6}
                        caretHidden={true}
                        onChangeText={(text)=>{
                            this.setState({checkCode:text});
                        }}
                    />
                    <TouchableWithoutFeedback
                        disabled={this.state.getCheckCode}
                        onPress={this._getCheckCode}>
                        <View style={styles.checkCode}>
                            <Text style={styles.checkCodeText}>{
                                this.state.getCheckCode?`${this.state.retryTime}s后重试`:'获取验证码'
                            }</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.tip}>新用户验证手机即可完成注册</Text>
                <TouchableOpacity disabled={this.state.sending} activeOpacity={0.8} onPress={this._loginRegister}>
                    <View style={styles.loginBtn}><Text style={styles.loginText}>{fromRegister?'下一步':'登录'}</Text></View>
                </TouchableOpacity>
            </View>
        );
    }
}

let actions={
    phoneLoginRegister:function (phoneNum,checkCode,navigation,cb) {
        return myFetch('http://www.baidu.com',{
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodePostParams({
                phoneNum: phoneNum,
                checkCode: checkCode
            })
        }).then(response=>response.json())
            .then(responseData=>{
                if(responseData.code==10003){
                    let token=responseData.data.token,
                        user={
                            isLogin:true,
                            token:token,
                            userInfo:{
                                username:'',
                                userID:'',
                                phoneNum:phoneNum,
                            }
                        };
                    myStorage.save({
                        key:'user',
                        data:user
                    });
                    navigation.navigate('Main');
                    return {
                        type:'LOGIN',
                        payload:user
                    };
                }else if (responseData.code==10004){
                    navigation.navigate('CommonRegister',{phoneNum:phoneNum});
                }else{
                    showTip('验证失败',cb);
                }
            }).catch(err=>{
                alert(err);
                showTip('验证失败',cb);
            })

    }
};
function mapStateToProps(state) {
    return {user:state.user};
}
function mapDispatchToProps(dispatch) {
    return {
        phoneLoginRegister:(phoneNum,checkCode,navigation,cb)=>{dispatch(actions.phoneLoginRegister(phoneNum,checkCode,navigation,cb))}
    }
}

export default PhoneLoginRegister=connect(mapStateToProps,mapDispatchToProps)(PhoneLoginRegister);