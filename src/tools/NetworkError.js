import React,{Component} from 'react'
import {View,Text,StyleSheet,Image,TouchableNativeFeedback} from 'react-native'
import {screenUtils} from "./ScreenUtils";

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
                <Image style={{width:screenUtils.autoSize(250),height:screenUtils.autoSize(150)}} source={require('../img/common/network-error.png')}/>
                <TouchableNativeFeedback onPress={this.props.reload}>
                    <Text style={{
                        fontSize:screenUtils.autoFontSize(20),
                        color:'#777',
                        textAlign:'center'
                    }}>重新加载</Text>
                </TouchableNativeFeedback>
            </View>
        );
    }
}