import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, StyleSheet, Image, ImageBackground, BackHandler
} from 'react-native'
import {connect} from 'react-redux'

export default class MessageCenterThumbComment extends Component{
    static navigationOptions={
        headerTitle:'点赞与评论',
        headerRight:<View/>
    };
    constructor(props){
        super(props);
    }
    render(){
        return <View/>;
    }
}