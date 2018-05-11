import React,{Component} from 'react'
import {
    View, Text, TextInput, StyleSheet, StatusBar,Keyboard, TouchableWithoutFeedback, TouchableOpacity,
    BackHandler
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

class CommonRegister extends Component{
    static navigationOptions=({navigation})=>{
        return {
            headerTitle:'注册',
            headerRight:<View/>
        };
    };
    constructor(props){
        super(props);
        this._commonRegister=this._commonRegister.bind(this);
        this._backHandler=this._backHandler.bind(this);
        this.state={
            sending:false,
            username:'',
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
        Keyboard.dismiss();
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    _commonRegister(){
        let phoneNum=this.props.navigation.state.params&&this.props.navigation.state.params.phoneNum,
            {sending,username,password,password2}=this.state;
        if(!sending){
            this.setState({sending:true});
            if(username.length==0){
                showTip('请输入昵称',()=>{
                    this.setState({sending:false});
                });
            }else if(/^\d+$/.test(username)){
                showTip('昵称不能为纯数字',()=>{
                    this.setState({sending:false});
                });
            }else if(password.length==0||password2.length==0){
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
                this.props.commonRegister(phoneNum,username,password,this.props.navigation,()=>{
                    this.setState({sending:false});
                });
            }
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <View style={styles.field}>
                    <Text style={styles.fieldText}>昵称</Text>
                    <TextInput
                        style={styles.fieldInput}
                        underlineColorAndroid="transparent"
                        placeholder={'请输入昵称，最多12字'}
                        maxLength={12}
                        //keyboardType={'numeric'}
                        caretHidden={false}
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
                        placeholder={'请输入6-16位密码'}
                        maxLength={16}
                        caretHidden={false}
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({password:text});
                        }}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.fieldText}>密码</Text>
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
                <TouchableOpacity disabled={this.state.sending} activeOpacity={0.8} onPress={this._commonRegister}>
                    <View style={styles.registerBtn}><Text style={styles.registerText}>注册</Text></View>
                </TouchableOpacity>
            </View>
        );
    }
}

let actions={
    commonRegister:function (phoneNum,username,password,navigation,cb) {
        return myFetch(`http://${ip}:4441/api/register`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodePostParams({
                phone: phoneNum||15927168840,
                nickname:username,
                password:password
            })
        }).then(response=>response.json())
            .then(responseData=>{
                if(responseData.code==10001){
                    let data=responseData.data,
                        token=data.token,
                        user={
                            isLogin:true,
                            token:token,
                            userInfo:{
                                username:data.nickname,
                                userID:data.userUuid,
                                phoneNum:data.phone,
                                headImg:data.avatar
                            }
                        };
                    myStorage.save({
                        key:'user',
                        data:user
                    });
                    showTip('注册成功',cb);
                    Keyboard.dismiss();
                    let action=NavigationActions.reset({
                        index:0,
                        actions:[
                            NavigationActions.navigate({routeName:'Main'})
                        ]
                    });
                    navigation.dispatch(action);
                    return {
                        type:'LOGIN',
                        payload:user
                    };
                }else if (responseData.code==10105){
                    showTip('请先验证手机号',cb);
                }else if(responseData.code==10110){
                    showTip('昵称已存在',cb);
                } else{
                    showTip('验证失败',cb);
                }
            }).catch(err=>{
                alert(err);
                showTip('注册失败',cb);
            })

    }
};
function mapStateToProps(state) {
    return {user:state.user};
}
function mapDispatchToProps(dispatch) {
    return {
        commonRegister:(phoneNum,username,password,navigation,cb)=>{dispatch(actions.commonRegister(phoneNum,username,password,navigation,cb))}
    }
}

export default CommonRegister=connect(mapStateToProps,mapDispatchToProps)(CommonRegister);

