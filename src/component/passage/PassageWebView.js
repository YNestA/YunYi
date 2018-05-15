import React,{Component} from 'react'
import {WebView,View,Text} from 'react-native'
import {screenUtils} from '../../tools/MyTools'
import AutoHeightWebView from 'react-native-autoheight-webview';

export default class PassageWebView extends Component{
    constructor(props){
        super(props);
        this.state={
            height:0,
            history:[]
        };
    }
    render(){
        let html=`<!DOCTYPE html><html><head>
            <meta charset="utf-8">
            <title></title>
            <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
            <style>
                *{margin: 0;padding: 0}
                html,body{margin:0;padding:0;overflow: hidden;}
                #passage{padding: 20px 0;}
                .section_text{
                    padding:5px 15px;
                }
            </style>
            <script>
                function _autoHeight(){
                    window.location.hash = Date.now();
                    document.title = document.getElementById('passage').clientHeight;
                }
                window.addEventListener('load', _autoHeight)
              </script>
              </head>
            <body><div id="passage">${this.props.html}</div>
            </body></html>`;
        return(
            <View>
                <AutoHeightWebView
                    onLoadEnd={this.props.onLoadEnd}
                    source={{html:html,baseUrl: ''}}
                />
            </View>
        );
    }
}