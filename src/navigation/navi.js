import React, {Component} from 'react'
import {
    View, Image, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, BackHandler,
    StatusBar
} from 'react-native'
import {StackNavigator,TabNavigator} from 'react-navigation'
import DiscoverView from '../component/discover/DiscoverView'
import ConcernView from '../component/concern/ConcernView'
import EditNewView from '../component/edit-new/EditNewView'
import MineView from '../component/mine/MineView'
import MessageCenterView from '../component/message-center/MessageCenterView'
import DetailView from '../component/DetailView'
import {screenUtils} from '../tools/ScreenUtils'
import Passage from '../component/passage/passage'
import EditMain from '../component/edit-new/EditMain'
import EditTitle from '../component/edit-new/EditTitle'
import EditText from '../component/edit-new/EditText'
import Welcome from '../component/welcome'
import LoginCenter from '../component/login-register/LoginCenter'
import PhoneLoginRegister from '../component/login-register/PhoneLoginRegister'
import CommonRegister from "../component/login-register/CommonRegister"
import UsernameLogin from "../component/login-register/UsernameLogin";
import ForgetPassword from "../component/login-register/ForgetPassword"
import ResetPassword from "../component/login-register/ResetPassword"
import EditPassageSetting from "../component/edit-new/EditPassageSetting";
import MessageCenterConcern from "../component/message-center/MessageCenterConcern";
import MessageCenterLetter from "../component/message-center/MessageCenterLetter";
import MessageCenterNotification from "../component/message-center/MessageCenterNotification";
import MessageCenterComment from "../component/message-center/MessageCenterComment";
import MessageCenterThumb from "../component/message-center/MessageCenterThumb";
import AllSetting from "../component/mine/AllSetting";
import SignNameChangeDetail from '../component/mine/SignNameChangeDetail';
import FocusDetail from '../component/mine/FocusDetail'
import OtherUser from '../component/other-user/OtherUser'
import Search from "../component/search/search";
import AllComments from "../component/passage/AllComments";
import Fans from '../component/follow-fans/fans'
import Follow from '../component/follow-fans/follow'
import YunYi from "./YunYi";

export class TabIcon extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {focused,focusedImg,showRedPoint,notFocusedImg,labelTitle,tintColor}=this.props;
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.15)',true)}>
                <View style={{}}>
                    <Image
                        source={focused?focusedImg:notFocusedImg}
                        style={{
                            width:screenUtils.autoSize(30),
                            height:screenUtils.autoSize(30),
                        }}
                    />
                    {showRedPoint&&<View style={{
                        width:screenUtils.autoSize(10),
                        height:screenUtils.autoSize(10),
                        borderRadius:screenUtils.autoSize(5),
                        position:'absolute',
                        zIndex:5,
                        backgroundColor:'#e8222d',
                        top:0,right:0
                    }}/>}
                    {labelTitle&&<Text style={{
                        fontSize:screenUtils.autoFontSize(13),
                        alignSelf:'center',
                        color:tintColor,
                    }}>{labelTitle}</Text>}
                </View>
            </TouchableNativeFeedback>
        );
    }
}

export class HeaderButton extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={{
                marginLeft:screenUtils.autoSize(15),
                marginRight:screenUtils.autoSize(15)}}
            >
                 <TouchableNativeFeedback
                     onPress={this.props.onPress}
                     background={TouchableNativeFeedback.Ripple('#ddd',true)}
                 >
                     <View style={{padding:screenUtils.autoSize(10)}}>
                         <Text style={{color:'#333',fontSize:screenUtils.autoFontSize(16)}}>{this.props.text}</Text>
                     </View>
                 </TouchableNativeFeedback>
            </View>
        );
    }
}

const MainScreenNavi=TabNavigator({
    Discover:{
        screen:DiscoverView,
    },
    Concern:{
        screen:ConcernView,
        navigationOptions:({navigation,screenProps})=>{
            return {
                tabBarOnPress: ({jumpToIndex,scene})=>{
                    if(store.getState().user.isLogin) {
                        jumpToIndex(scene.index);
                    }else{
                        navigation.navigate('LoginCenter');
                    }
                }
            }
        }
    },
    EditNew:{
        screen:EditNewView,
        navigationOptions:({navigation,screenProps})=>{
            return {
                tabBarOnPress: ({jumpToIndex,scene})=>{
                    if(store.getState().user.isLogin) {
                        let pro = new Promise((resolve, reject) => {
                            screenProps.startEditNew(resolve);
                        }).then((data) => {
                            navigation.navigate('EditMain', {selected: true, imgs: data});
                        });
                    }else{
                        navigation.navigate('LoginCenter');
                    }
                }
            }
        }
    },
    MessageCenter:{
        screen:MessageCenterView,
        navigationOptions:({navigation,screenProps})=>{
            return {
                tabBarOnPress: ({jumpToIndex,scene})=>{
                    if(store.getState().user.isLogin) {
                        jumpToIndex(scene.index);
                    }else{
                        navigation.navigate('LoginCenter');
                    }
                }
            }
        }
    },
    Mine:{
        screen:MineView,
        navigationOptions:({navigation,screenProps})=>{
            return {
                tabBarOnPress: ({jumpToIndex,scene})=>{
                    if(store.getState().user.isLogin) {
                        jumpToIndex(scene.index);
                    }else{
                        navigation.navigate('LoginCenter');
                    }
                }
            }
        }
    }
},{
    initialRouteName:'Discover',
    tabBarPosition: 'bottom',
    backBehavior:'none',
    swipeEnabled: false,
    lazy: true,
    animationEnabled: false,
    scrollEnabled:true,
    tabBarOptions:{
        style: {
            height: screenUtils.autoSize(70),
            backgroundColor:'#fff',
        },
        tabStyle:{
            opacity:1,
            margin:0,
            padding:0,
        },
        labelStyle: {
        },
        showLabel: false,
        showIcon: true,
        inactiveTintColor:'#666',
        activeTintColor: '#3f81c1',
        indicatorStyle: {
            height: 0
        },
        iconStyle:{
            width:screenUtils.autoSize(70),
            height:screenUtils.autoSize(70)
        }
    }
});


export default YunYiNavi=StackNavigator({
    Main:{
        screen:MainScreenNavi,
        navigationOptions:{
 //           header:null,
            headerStyle:{
                paddingTop:StatusBar.currentHeight,
                height:screenUtils.autoSize(55)+StatusBar.currentHeight,
            }
        }
    },
    Welcome:{
        screen:Welcome
    },
    LoginCenter:{
        screen:LoginCenter
    },
    PhoneLoginRegister:{
        screen:PhoneLoginRegister
    },
    CommonRegister:{
        screen:CommonRegister
    },
    UsernameLogin:{
        screen:UsernameLogin,
    },
    EditText:{
        screen:EditText,
    },
    EditPassageSetting:{
        screen:EditPassageSetting
    },
    Passage:{
        screen:Passage,
    },
    EditMain:{
        screen:EditMain
    },
    EditTitle:{
        screen:EditTitle
    },
    MessageCenterConcern:{
        screen:MessageCenterConcern
    },
    MessageCenterLetter:{
        screen:MessageCenterLetter
    },
    MessageCenterNotification:{
        screen:MessageCenterNotification
    },
    MessageCenterComment:{
        screen:MessageCenterComment
    },
    MessageCenterThumb:{
        screen:MessageCenterThumb
    },
    OtherUser:{
        screen:OtherUser,
    },
    Search:{
        screen:Search
    },
    AllComments:{
        screen:AllComments
    },
    Detail:{
        screen:DetailView,
        navigationOptions:{
            headerTitle:'详情页',
            headerRight:<View/>
        }
    },
    AllSetting:{
        screen:AllSetting
    },
    SignNameChangeDetail:{
        screen:SignNameChangeDetail
    },
    FocusDetail:{
        screen:FocusDetail
    },
    Fans:{
        screen:Fans,
    },
    Follow:{
        screen:Follow,
    },
    ForgetPassword:{
        screen:ForgetPassword
    },
    ResetPassword:{
        screen:ResetPassword
    }
},{
    initialRouteName:'Welcome',
    navigationOptions:{
        headerStyle:{
            paddingTop:StatusBar.currentHeight,
            height:screenUtils.autoSize(55)+StatusBar.currentHeight,
            backgroundColor:'#fff',
            justifyContent:'center',
            alignItems:'center'
        },
        headerBackTitle:'返回',
        headerTintColor:'#333',
        headerTitleStyle:{
            fontSize:screenUtils.autoFontSize(19),
            flex:1,
            //backgroundColor:'green',
            textAlign:'center'
        },
    }
});

