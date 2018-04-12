import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, StyleSheet, Image, ImageBackground, BackHandler
} from 'react-native'
import {connect} from 'react-redux'

export default class MessageCenterLetter extends Component{
    static navigationOptions={
        headerTitle:'私信消息',
        headerRight:<View/>
    };
    constructor(props){
        super(props);
    }
    render(){
        return <View/>;
    }
}