import React,{Component} from 'react'
import {View,ProgressBarAndroid,Text,StyleSheet} from 'react-native'

export default class Loading extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{
                justifyContent:'center',
                ...this.props.containerStyle
            }}>
                <ProgressBarAndroid style={{
                    alignSelf:'center',
                    ...this.props.loadingStyle
                }} styleAttr={'Inverse'}/>
            </View>
        );
    }
}