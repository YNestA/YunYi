import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'

export default class NetworkError extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{
                justifyContent:'center',
                alignSelf:'center',
                ...this.props.containerStyle
            }}>
                <Text>好像没有网络</Text>
                <TouchableNativeFeedback onPress={this.props.reload}>
                    <Text>重新加载</Text>
                </TouchableNativeFeedback>
            </View>
        );
    }
}