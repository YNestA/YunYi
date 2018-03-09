import React, {Component} from 'react'
import {View,Text,TouchableNativeFeedback} from 'react-native'

export default class ConcernView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <Text>关注！</Text>
            </View>
        );
    }
}
