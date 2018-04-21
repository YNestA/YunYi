import React,{Component} from 'react'
import {View, Image,StyleSheet, StatusBar} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";

const styles=StyleSheet.create({
    container:{
        flex:1,
        height:StatusBar.currentHeight+screenUtils.autoSize(280),
    },
    coverImg:{
        position:'absolute',
        width:'100%',
        height:StatusBar.currentHeight+screenUtils.autoSize(280)
    },
    content:{
        paddingTop:StatusBar.currentHeight+screenUtils.autoSize(50),
        height:StatusBar.currentHeight+screenUtils.autoSize(280),
        backgroundColor:'rgba(0,0,0,0.15)',
        alignItems:'center'
    }
});

export default class Cover extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={styles.container}>
                <Image source={{uri:this.props.coverImg}} blurRadius={10} style={styles.coverImg} />
                <View style={styles.content}>{this.props.children}</View>
            </View>
        );
    }
}

