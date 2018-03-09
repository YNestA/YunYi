import React,{Component} from 'react'
import {View,WebView,Text,StyleSheet} from 'react-native'
import {screenUtils} from "./ScreenUtils";

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    webView:{
        width:screenUtils.screenWidth,
        height:screenUtils.screenHeight,
    }
});

export default class MyWebView extends Component{
    webview=null;
    title='';
    constructor(props){
        super(props);
    }
    _updateTitle(){
        this.webview.postMessage('window.postMessage(JSON.stringify({from:"YunYi",action:"title",message:document.title}));')
    }
    render(){
        return(<View style={styles.container}>
                <WebView
                    ref={(webview)=>{this.webview=webview;}}
                    source={{uri:this.props.uri,method:'GET'}}
                    style={styles.webView}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    renderLoading={(e)=>{

                    }}
                    onLoadStart={()=>{
                    }}
                    injectedJavaScript=';document.addEventListener("message", function(e) {eval(e.data);});'
                    onMessage={(e)=>{
                        console.log(e.nativeEvent.data);

                    }}
                    onNavigationStateChange={(navState)=>{

                    }}
                />
            </View>
        )
    }
}