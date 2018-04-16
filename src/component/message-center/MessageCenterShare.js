import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, StyleSheet, Image, ImageBackground, BackHandler
} from 'react-native'
import {connect} from 'react-redux'

export default class MessageCenterShare extends Component{
    static navigationOptions={
        headerTitle:'分享消息',
        headerRight:<View/>
    };
    constructor(props){
        super(props);
        this._backHandler=this._backHandler.bind(this);
    }
    _backHandler(){
        this.props.navigation.goBack(null);
        return true;
    }
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    render(){
        return <View/>;
    }
}