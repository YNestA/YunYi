import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {View, Image, StatusBar,Platform,Alert,Linking} from 'react-native'
import {isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,} from 'react-native-update'
import {screenUtils} from "../tools/ScreenUtils";
import ScreenTip from "../tools/ScreenTip"

import _updateConfig from '../../update.json';
const {appKey} = _updateConfig[Platform.OS];

class Welcome extends Component{
    static navigationOptions={
        header:null
    };
    constructor(props){
        super(props);
        this._checkLogin=this._checkLogin.bind(this);
        this.checkUpdate=this.checkUpdate.bind(this);
        this.doUpdate=this.doUpdate.bind(this);
    }
    _checkLogin(){
        myStorage.sync={
            user(params){
                params.resolve(null);
            }
        };
        myStorage.load({
            key:'user',
        }).then(ret=>{
            if(ret) {
                this.props.loadUser(ret.userInfo, ret.token);
                setTimeout(() => {
                    let action=NavigationActions.reset({
                        index:0,
                        actions:[
                            NavigationActions.navigate({routeName:'Main'})
                        ]
                    });
                    this.props.navigation.dispatch(action);
                }, 3000);
            }else{
                setTimeout(() => {
                    this.props.navigation.navigate('LoginCenter',{firstEnter:true});
                }, 3000);
            }
        }).catch(err=>{
            console.log(err);
        });
    }
    doUpdate = info => {
        this.refs.screenTip.show();
        downloadUpdate(info).then(hash => {
            this.refs.screenTip.dismiss();
            Alert.alert('提示', '下载完毕,请重启应用', [
                {text: '是', onPress: ()=>{switchVersion(hash);}},
            ]);
        }).catch(err => {
            //alert(err);
            this.refs.screenTip.dismiss();
            Alert.alert('提示', '更新失败.');
            this._checkLogin();
            //
        });
    };
    checkUpdate = () => {
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
                ]);
            } else if (info.upToDate) {
                this._checkLogin();
            } else {
                Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
                    {text: '是', onPress: ()=>{
                        this.doUpdate(info);
                    }},
                    {text: '否',onPress:()=>{this._checkLogin()}},
                ]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
            this._checkLogin();
        });
    };
    componentWillMount(){
        if (isFirstTime) {
            markSuccess();
        } else if (isRolledBack) {
            //Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        }

    }
    componentDidMount(){
        this.checkUpdate();
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <Image style={{
                    //width:screenUtils.screenWidth,
                    //height:screenUtils.screenHeight,
                    flex:1,
                    width:screenUtils.screenWidth
                }} source={require('../img/welcome2.png')}/>
                <ScreenTip ref={'screenTip'} text={'下载新版本中'}/>
            </View>
        );
    }
}

let actions={
    loadUser:function (userInfo,token) {
        return {
            type:'LOAD_USER',
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
        loadUser:(userInfo,token)=>{dispatch(actions.loadUser(userInfo,token))}
    }
}

export default Welcome=connect(mapStateToProps,mapDispatchToProps)(Welcome);
