import React, {Component} from 'react'
import {View,Text} from 'react-native'

export default class MessageCenterView extends Component{
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