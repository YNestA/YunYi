import React, {Component} from 'react'
import {View,Image,Text,StyleSheet,TouchableNativeFeedback,TouchableOpacity} from 'react-native'
import {StackNavigator, TabNavigator} from 'react-navigation'
import DiscoverView from '../component/discover/DiscoverView'
import ConcernView from '../component/concern/ConcernView'
import EditNewView from '../component/edit-new/EditNewView'
import MineView from '../component/mine/MineView'
import MessageCenterView from '../component/message-center/MessageCenterView'
import {DetailView} from '../component/DetailView'
import {screenUtils} from '../tools/ScreenUtils'
import {Passage} from '../component/passage/passage'
import EditMain from '../component/edit-new/EditMain'
import EditTitle from '../component/edit-new/EditTitle'
import EditText from '../component/edit-new/EditText'

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
        navigationOptions:{
            tabBarIcon:({focused, tintColor}) => {
                return <TabIcon
                    tintColor={tintColor}
                    labelTitle={'发现'}
                    focused={focused}
                    focusedImg={require('../img/navi/discover-light.png')}
                    notFocusedImg={require('../img/navi/discover-dark.png')}
                />;
            },
            headerTitle:'发现',
            tabBarLabel:'发现'
        }
    },
    Concern:{
        screen:ConcernView,
        navigationOptions:{
            tabBarIcon:({focused, tintColor}) => {
                return <TabIcon
                    labelTitle={'圈子'}
                    tintColor={tintColor}
                    focused={focused}
                    focusedImg={require('../img/navi/concern-light.png')}
                    notFocusedImg={require('../img/navi/concern-dark.png')}
                />;
            },
            headerTitle:'圈子',
            tabBarLabel:'圈子'
        }
    },
    EditNew:{
        screen:EditNewView,
    },
    MessageCenter:{
        screen:MessageCenterView,
        navigationOptions:{
            tabBarIcon:({focused, tintColor}) => {
                return <TabIcon
                    labelTitle={'消息'}
                    tintColor={tintColor}
                    focused={focused}
                    focusedImg={require('../img/navi/message-light.png')}
                    notFocusedImg={require('../img/navi/message-dark.png')}
                />;
            },
            headerTitle:'消息',
            tabBarLabel:'消息'
        }
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
            headerTitle:'我的',
            tabBarLabel:'我的'
        }
    }
},{
    initialRouteName:'Discover',
    tabBarPosition: 'bottom',
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

export const YunYiNavi=StackNavigator({
    Main:{
        screen:MainScreenNavi,
        navigationOptions:{
            header:null,
        }
    },
    EditText:{
        screen:EditText,
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
    Detail:{
        screen:DetailView,
        navigationOptions:{
            headerTitle:'详情页',
            headerRight:<View/>
        }
    }
},{
    initialRouteName:'Main',
    navigationOptions:{
        headerStyle:{
            height:screenUtils.autoSize(55),
            backgroundColor:'#fff',
        },
        headerRight:<View/>,
        headerBackTitle:'返回',
        headerTintColor:'#333',
        headerTitleStyle:{
            fontSize:screenUtils.autoFontSize(17),
            alignSelf:'center'
        },
    }
});
