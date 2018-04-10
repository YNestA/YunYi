import React, {Component} from 'react'
import {View,StatusBar,ScrollView,Image,Text,StyleSheet,TouchableWithoutFeedback,TouchableNativeFeedback} from 'react-native'
import {TabIcon} from '../../navigation/navi'
import ConcernPassages from './ConcernPassages'
import {myFetch,screenUtils} from '../../tools/MyTools'

export default class ConcernView extends Component{
    static navigationOptions=({navigation,screenProps})=> {
        return {
            tabBarIcon:({focused, tintColor}) => {
                return <TabIcon
                    labelTitle={'关注'}
                    tintColor={tintColor}
                    focused={focused}
                    focusedImg={require('../../img/navi/concern-light.png')}
                    notFocusedImg={require('../../img/navi/concern-dark.png')}
                />;
            },
            headerLeft: <View/>,
            headerRight:<TouchableWithoutFeedback>
                            <View>
                                <Image style={{
                                    width:screenUtils.autoSize(30),
                                    height:screenUtils.autoSize(30),
                                    marginHorizontal:screenUtils.autoSize(15),
                                }} source={require('../../img/common/more.png')}/>
                            </View>
                        </TouchableWithoutFeedback>,
            headerTitle:'关注',
            tabBarLabel: '关注',
            tabBarOnPress:({jumpToIndex,scene})=>{
                jumpToIndex(scene.index);
                StatusBar.setBackgroundColor('#fff');
                StatusBar.setBarStyle('dark-content');

            }
        };
    };
    componentDidMount(){
    }
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex:1}}>
                <StatusBar />
                <ConcernPassages navigation={this.props.navigation}/>
            </View>
        );
    }
}
