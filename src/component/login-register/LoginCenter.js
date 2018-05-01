import React,{Component} from 'react'
import {
    StyleSheet, View, Text, StatusBar, Image, ImageBackground, TouchableOpacity, TouchableNativeFeedback,
    TouchableWithoutFeedback, BackHandler
} from 'react-native'
import Swiper from 'react-native-swiper'
import {screenUtils} from '../../tools/MyTools'

const styles=StyleSheet.create({
    closeContainer:{
        position:'absolute',
        top:screenUtils.autoSize(40),
        left:screenUtils.autoSize(10)
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop:screenUtils.autoSize(100),
        paddingBottom:screenUtils.autoSize(150)
    },
    close:{

    },
    closeImg:{
        margin:screenUtils.autoSize(10),
        width:screenUtils.autoSize(40),
        height:screenUtils.autoSize(40)
    },
    loginList:{
        position:'absolute',
        height:screenUtils.autoSize(100),
        marginBottom:screenUtils.autoSize(30),
        bottom:0,
        width:screenUtils.screenWidth,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    login:{
        width:screenUtils.autoSize(80),
        alignItems:'center'
    },
    loginImg:{
        width:screenUtils.autoSize(60),
        height:screenUtils.autoSize(60)
    },
    swiperImg:{
        width:'100%',
        height:'100%'
    },
    loginText:{
        width:screenUtils.autoSize(80),
        fontSize:screenUtils.autoFontSize(16),
        color:'#444',
        textAlign:'center'
    }
});

export default class LoginCenter extends Component{
    static navigationOptions={
        header:null
    };
    constructor(props){
        super(props);
        this._enterMain=this._enterMain.bind(this);
        this._backHandler=this._backHandler.bind(this);
    }
    _backHandler(){
        let {params}=this.props.navigation.state;
        if(params&&params.firstEnter) {
            BackHandler.exitApp();
        }else{
            this.props.navigation.goBack(null);
        }
        return true;
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    _enterMain(){
        let {params}=this.props.navigation.state;
        if(params&&params.firstEnter) {
            this.props.navigation.navigate('Main');
        }else{
            this.props.navigation.goBack(null);
        }
    }
    render(){
        return (
                <View style={styles.container}>
                    <StatusBar translucent={true} barStyle={'dark-content'}/>
                    <View style={styles.closeContainer}>
                         <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#ddd',true)} onPress={this._enterMain}>
                             <View style={styles.close}>
                                 <Image style={styles.closeImg} source={require('../../img/edit/delete-section.png')}/>
                             </View>
                         </TouchableNativeFeedback>
                    </View>
                    <Swiper
                        style={{

                        }}
                    >
                        <Image style={styles.swiperImg} source={require('../../img/login-center/01.png')}/>
                        <Image style={styles.swiperImg} source={require('../../img/login-center/02.png')}/>
                        <Image style={styles.swiperImg} source={require('../../img/login-center/03.png')}/>
                        <Image style={styles.swiperImg} source={require('../../img/login-center/04.png')}/>
                    </Swiper>
                    <View style={styles.loginList}>
                        <TouchableWithoutFeedback  onPress={()=> {
                            this.props.navigation.navigate('UsernameLogin');
                        }}>
                            <View style={styles.login}>
                                <Image style={styles.loginImg} source={require('../../img/login-center/password-login.png')}/>
                                <Text style={styles.loginText}>账号登录</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{
                            this.props.navigation.navigate('PhoneLoginRegister');
                        }}>
                            <View style={styles.login}>
                                <Image style={styles.loginImg} source={require('../../img/login-center/phone-login.png')}/>
                                <Text style={styles.loginText}>手机登录</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#ddd',true)}  onPress={this._enterMain}>
                            <View style={styles.login}>
                                <Image style={styles.loginImg} source={require('../../img/login-center/direct-enter.png')}/>
                                <Text style={styles.loginText}>随便看看</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
        );
    }
}