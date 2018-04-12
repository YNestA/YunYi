import React,{Component} from 'react'
import {
    View, Text, TextInput, StyleSheet, StatusBar, TouchableWithoutFeedback, TouchableOpacity,
    BackHandler
} from 'react-native'
import {screenUtils,myFetch,getFormData,encodePostParams} from "../../tools/MyTools";
import {HeaderButton} from '../../navigation/navi'
import {connect} from "react-redux";
import Toast from 'react-native-root-toast'

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
    loginBtn:{
        marginTop:screenUtils.autoSize(30),
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

class UsernameLogin extends Component{
    static navigationOptions=({navigation})=>{
        let params=navigation.state.params;
        return {
            headerTitle:'账号登录',
            headerRight:<HeaderButton onPress={params?params.rightCb:()=>{}} text={'注册'}/>
        };
    };
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            disabled:false
        };
        this._login=this._login.bind(this);
        this._showTip=this._showTip.bind(this);
    }
    _backHandler(){
        this.props.navigation.goBack();
        return true;
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler.bind(this));
    }
    _showTip(message,onHidden){
        Toast.show(message,{
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            onHidden:onHidden
        });
    }
    _login(){
        let {username,password}=this.state,
            activeFunc=()=>{this.setState({disabled:false});};

        this.setState({disabled:true});
        if(username.length==0){
            this._showTip('昵称不能为空',activeFunc);
        }else if(password.length==0){
            this._showTip('密码不能为空',activeFunc);
        }else {

            myFetch('http://10.12.137.198:4441/api/login', {
                timeout: 10000,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: encodePostParams({
                    username: username,
                    password: password
                })
            }).then(response => response.json())
                .then(responseData => {
                    alert(JSON.stringify(responseData));
                    if (responseData.code == 10001) {
                        myStorage.save({
                            key: 'user',
                            data: {
                                userInfo: {
                                    username: username
                                },
                                token: responseData.data.token,
                                isLogin: true,

                            }
                        });
                        this.props.login({username: username}, responseData.data.token);
                        this.props.navigation.navigate('Main');
                    }
                    console.log(responseData);
                    activeFunc();
                })
                .catch((error) => {
                    alert(error);
                    console.log(error);
                    activeFunc();
                });
        };
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this._backHandler.bind(this));
        this.props.navigation.setParams({
            rightCb:()=>{
                this.props.navigation.navigate('PhoneLoginRegister',{fromRegister:true});
            }
        });
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={'#fff'} barStyle={'dark-content'}/>
                <View style={styles.field}>
                    <Text style={styles.fieldText}>昵称</Text>
                    <TextInput
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        placeholder={'请输入昵称，最多15字'}
                        maxLength={15}
                        keyboardType={'numeric'}
                        caretHidden={true}
                        onChangeText={(text)=>{
                            this.setState({username:text});
                        }}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.fieldText}>密码</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.fieldInput}
                        placeholder={'请输入密码'}
                        maxLength={16}
                        caretHidden={true}
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({password:text});
                        }}
                    />
                </View>
                <TouchableOpacity disabled={this.state.disabled} activeOpacity={0.8} onPress={this._login}>
                    <View style={styles.loginBtn}><Text style={styles.loginText}>登录</Text></View>
                </TouchableOpacity>
            </View>
        );
    }
}

let actions={
    login:function (userInfo,token) {
        return {
            type:'LOGIN',
            payload:{
                isLogin:true,
                token:token,
                userInfo:userInfo
            }
        }
    }
};
function mapStateToProps(state) {
    return {user:state.user};
}
function mapDispatchToProps(dispatch) {
    return {
        login:(userInfo,token)=>{dispatch(actions.login(userInfo,token))}
    }
}

export default UsernameLogin=connect(mapStateToProps,mapDispatchToProps)(UsernameLogin);