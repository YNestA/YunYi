import React,{Component} from 'react'
import Toast from 'react-native-root-toast'
import {
    View, Text, TextInput, StyleSheet, StatusBar, TouchableWithoutFeedback, TouchableOpacity,
    BackHandler
} from 'react-native'
import {screenUtils,myFetch} from "../../tools/MyTools";

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

export default class PhoneLoginRegister extends Component{
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
        let toast=Toast.show('验证码错误',{
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
        });
        this.props.navigation.navigate('CommonRegister');
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
                <TouchableOpacity activeOpacity={0.8} onPress={this._loginRegister}>
                    <View style={styles.loginBtn}><Text style={styles.loginText}>{fromRegister?'下一步':'登录'}</Text></View>
                </TouchableOpacity>
            </View>
        );
    }
}