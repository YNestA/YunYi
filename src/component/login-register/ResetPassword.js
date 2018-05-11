import React,{Component} from 'react'
import {
    View, Text, TextInput, StyleSheet, StatusBar, TouchableWithoutFeedback, TouchableOpacity,
    BackHandler, Keyboard
} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";
import Toast from "react-native-root-toast";
import {encodePostParams, myFetch} from "../../tools/MyTools";
import {connect} from "react-redux";
import {ip} from "../../settings";
import {NavigationActions} from "react-navigation";

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
        paddingVertical:screenUtils.autoSize(15),
        color:'#444',
        height:screenUtils.autoSize(60),
        fontSize:screenUtils.autoFontSize(17),
        lineHeight:screenUtils.autoSize(30)
    },
    registerBtn:{
        marginTop:screenUtils.autoSize(30),
        height:screenUtils.autoSize(50),
        backgroundColor:'#5fa1e1',
        marginHorizontal:screenUtils.autoSize(25),
        borderRadius:screenUtils.autoSize(10)
    },
    registerText:{
        color:'#fff',
        fontSize:screenUtils.autoFontSize(20),
        lineHeight:screenUtils.autoSize(50),
        textAlign:'center'
    }
});

export default class ResetPassword extends Component{
    static navigationOptions=({navigation})=>{
        return {
            headerTitle:'重置密码',
            headerRight:<View/>
        };
    };
    constructor(props){
        super(props);
        this._resetPassword=this._resetPassword.bind(this);
        this._backHandler=this._backHandler.bind(this);
        this.state={
            sending:false,
            password:'',
            password2:''
        };
    }
    _backHandler(){
        this.props.navigation.goBack(null);
        return true;
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    _resetPassword(){
        let phoneNum=this.props.navigation.state.params&&this.props.navigation.state.params.phoneNum,
            {sending,password,password2}=this.state;
        if(!sending){
            this.setState({sending:true});
            if(password.length==0||password2.length==0){
                showTip('密码不能为空',()=>{
                    this.setState({sending:false});
                });
            }else if(password.length<6){
                showTip('密码太短',()=>{
                    this.setState({sending:false});
                });
            }else if(password!=password2){
                showTip('两次密码不一致',()=>{
                    this.setState({sending:false});
                });
            }else {
                myFetch(`http://${ip}:4441/api/password/change`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: encodePostParams({
                        phone: phoneNum,
                        newPassword:password
                    })
                }).then(response => response.json())
                    .then(responseData => {
                        if (responseData.code = 10001) {
                            showTip('重置成功，请登录');
                            Keyboard.dismiss();
                            this.props.navigation.navigate('LoginCenter');
                        } else {
                            showTip('验证失败');
                            this.setState({sending:false});
                        }
                    }).catch(err => {
                        this.setState({sending:false});
                        showTip('验证失败');
                    });
            }
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <View style={styles.field}>
                    <Text style={styles.fieldText}>新密码</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.fieldInput}
                        placeholder={'请输入6-16位新密码'}
                        maxLength={16}
                        caretHidden={false}
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({password:text});
                        }}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.fieldText}>新密码</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.fieldInput}
                        placeholder={'请再输一次'}
                        secureTextEntry={true}
                        maxLength={16}
                        caretHidden={false}
                        onChangeText={(text)=>{
                            this.setState({password2:text});
                        }}
                    />
                </View>
                <TouchableOpacity disabled={this.state.sending} activeOpacity={0.8} onPress={this._resetPassword}>
                    <View style={styles.registerBtn}><Text style={styles.registerText}>提交</Text></View>
                </TouchableOpacity>
            </View>
        );
    }
}

