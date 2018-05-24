import React, {Component} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {screenUtils,Loading} from "./MyTools"
import PopupDialog,{DialogTitle,SlideAnimation,FadeAnimation,DialogButton,ScaleAnimation} from 'react-native-popup-dialog'

export default class ScreenTip extends Component{
    constructor(props){
        super(props);
        this.show=this.show.bind(this);
        this.hide=this.dismiss.bind(this);
    }
    show(){
        this.refs._this.show();
    }
    dismiss(){
        this.refs._this.dismiss();
    }
    render(){
        return <PopupDialog
            dialogStyle={{
                justifyContent:'space-around'
            }}
            width={screenUtils.autoSize(250)}
            height={screenUtils.autoSize(130)}
            ref='_this'
            dismissOnTouchOutside={false}
        >
            <Loading/>
            <Text style={{
                fontSize:screenUtils.autoFontSize(18),
                textAlign:'center'
            }}>{this.props.text}</Text>
        </PopupDialog>
    }
}