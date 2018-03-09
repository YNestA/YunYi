import React,{Component} from 'react'
import {View,WebView,Text,StyleSheet} from 'react-native'
import {screenUtils} from '../../tools/ScreenUtils'
import MyWebView from '../../tools/MyWebView'

export class Passage extends Component{
    static navigationOptions= ({navigation,screenProps})=>{
        let {params}=navigation.state;
        return {
            headerTitle:(params&&params.title)?params.title:''
        }
    }
    constructor(props){
        super(props);
    }
    render(){
        return (<MyWebView
            uri={'http://www.baidu.com'}
            onUpdateTitle={(title)=>{
                console.log(title);
                this.props.navigation.setParams({
                    title:title
                });
            }}
        />);
    }
}