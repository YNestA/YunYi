import React,{Component} from 'react'
import {StyleSheet,View,Text,StatusBar,Image,ImageBackground,TouchableOpacity,TouchableNativeFeedback,TouchableWithoutFeedback} from 'react-native'
import {screenUtils} from '../../tools/MyTools'

const styles=StyleSheet.create({
    closeContainer:{
        position:'absolute',
        top:screenUtils.autoSize(40),
        left:screenUtils.autoSize(10)
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
        marginBottom:screenUtils.autoSize(50),
        bottom:0,
        width:screenUtils.screenWidth,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    login:{
    },
    loginImg:{
        width:screenUtils.autoSize(80),
        height:screenUtils.autoSize(80)
    },
    loginText:{
        fontSize:screenUtils.autoFontSize(17),
        color:'#333',
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
    }
    _enterMain(){
        this.props.navigation.navigate('Main');
    }
    render(){
        return (
            <ImageBackground style={{flex:1}} source={require('../../img/darling.jpg')}>
                <View style={{flex:1}}>
                    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                    <View style={styles.closeContainer}>
                         <TouchableOpacity onPress={this._enterMain}>
                             <View style={styles.close}>
                                 <Image style={styles.closeImg} source={require('../../img/edit/delete-section.png')}/>
                             </View>
                         </TouchableOpacity>
                    </View>
                    <View style={styles.loginList}>
                        <TouchableWithoutFeedback  onPress={()=> {
                            this.props.navigation.navigate('UsernameLogin');
                        }}>
                            <View style={styles.login}>
                                <Image style={styles.loginImg} source={require('../../img/navi/mine-light.png')}/>
                                <Text style={styles.loginText}>账号登录</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{
                            this.props.navigation.navigate('PhoneLoginRegister');
                        }}>
                            <View style={styles.login}>
                                <Image style={styles.loginImg} source={require('../../img/common/mobilephone_fill.png')}/>
                                <Text style={styles.loginText}>手机登录</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback   onPress={this._enterMain}>
                            <View style={styles.login}>
                                <Image style={styles.loginImg} source={require('../../img/common/eye_fill.png')}/>
                                <Text style={styles.loginText}>随便看看</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}