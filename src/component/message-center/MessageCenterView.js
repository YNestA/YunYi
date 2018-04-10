import React, {Component} from 'react'
import {View,Text} from 'react-native'
import {TabIcon} from '../../navigation/navi'
export default class MessageCenterView extends Component{
    static navigationOptions={
        tabBarIcon:({focused, tintColor}) => {
            return <TabIcon
            labelTitle={'消息'}
            tintColor={tintColor}
            focused={focused}
            focusedImg={require('../../img/navi/message-light.png')}
            notFocusedImg={require('../../img/navi/message-dark.png')}
            />;
        },
        headerLeft:<View/>,
        headerTitle:'消息',
        tabBarLabel:'消息'
    }
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <Text>消息！</Text>
            </View>
        );
    }
}