import React, {Component} from 'react'
import {
    View, Image, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, BackHandler,
    StatusBar
} from 'react-native'
import {addNavigationHelpers, StackNavigator, TabBarBottom ,TabNavigator} from 'react-navigation'
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
import EditPassageSetting from "../component/edit-new/EditPassageSetting";
import MessageCenterConcern from "../component/message-center/MessageCenterConcern";
import MessageCenterLetter from "../component/message-center/MessageCenterLetter";
import MessageCenterNotification from "../component/message-center/MessageCenterNotification";
import MessageCenterShare from "../component/message-center/MessageCenterShare";
import MessageCenterThumbComment from "../component/message-center/MessageCenterThumbComment";
import AllSetting from "../component/mine/AllSetting";
import OtherUser from '../component/other-user/OtherUser';
import SignNameChangeDetail from '../component/mine/SignNameChangeDetail'

export class TabIcon extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {focused,focusedImg,notFocusedImg,labelTitle,tintColor}=this.props;
        return (
            <View style={{
            }}>
                <Image
                    source={focused?focusedImg:notFocusedImg}
                    style={{
                        width:screenUtils.autoSize(30),
                        height:screenUtils.autoSize(30),
                    }}
                />
                {labelTitle&&<Text style={{
                    fontSize:screenUtils.autoFontSize(13),
                    alignSelf:'center',
                    color:tintColor,
                }}>{labelTitle}</Text>}
            </View>
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
    },
    EditNew:{
        screen:EditNewView,
    },
    MessageCenter:{
        screen:MessageCenterView,
    },
    Mine:{
        screen:MineView,
        navigationOptions:{
            tabBarIcon:({focused, tintColor}) => {
                return <TabIcon
                    labelTitle={'我的'}
                    tintColor={tintColor}
                    focused={focused}
                    focusedImg={require('../img/navi/mine-light.png')}
                    notFocusedImg={require('../img/navi/mine-dark.png')}
                />;
            },
            header:null,
            headerTitle:'我的',
            tabBarLabel:'我的'
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
    MessageCenterShare:{
        screen:MessageCenterShare
    },
    MessageCenterThumbComment:{
        screen:MessageCenterThumbComment
    },
    OtherUser:{
        screen:OtherUser,
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
    }
},{
    initialRouteName:'Welcome',
    navigationOptions:{
        headerStyle:{
            height:screenUtils.autoSize(55),
            backgroundColor:'#fff',
        },
        headerBackTitle:'返回',
        headerTintColor:'#333',
        headerTitleStyle:{
            fontSize:screenUtils.autoFontSize(19),
            alignSelf:'center'
        },
    }
});

