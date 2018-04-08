import React,{Component} from 'react'
import {View,Text,TextInput,StyleSheet,StatusBar,TouchableWithoutFeedback,TouchableOpacity} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";
import {HeaderButton} from '../../navigation/navi'

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

export default class UsernameLogin extends Component{
    static navigationOptions=({navigation})=>{
        let params=navigation.state.params;
        return {
            headerTitle:'账号登录',
            headerRight:<HeaderButton onPress={params?params.rightCb:()=>{}} text={'注册'}/>
        };
    };
    constructor(props){
        super(props);
        this._login=this._login.bind(this);
    }
    _login(){
        this.props.navigation.navigate('Main');
    }
    componentDidMount(){
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
                    />
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={this._commonRegister}>
                    <View style={styles.loginBtn}><Text style={styles.loginText}>登录</Text></View>
                </TouchableOpacity>
            </View>
        );
    }
}
