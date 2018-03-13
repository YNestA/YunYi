import React, {Component} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils"
import PopupDialog,{DialogTitle,SlideAnimation,DialogButton,ScaleAnimation} from 'react-native-popup-dialog'
import ImagePicker from 'react-native-image-crop-picker'

export class SelectDialog extends Component{
    constructor(props){
        super(props);
        this.show=this.show.bind(this);
    }
    show(resolve){
        this._sendImg=resolve;
        this.refs._this.show();
    }
    _selectImg(type){
        if(type==='album'){
            ImagePicker.openPicker({
                mediaType:'photo',
                multiple:true
            }).then( (images)=>{
                this.refs._this.dismiss();
                this._sendImg(images);
            });

        }else if(type==='camera'){
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true
            }).then((image)=>{
                console.log(image);
                this.refs._this.dismiss();
                this._sendImg([image]);
            });
        }
    }
    render() {
        return (
            <PopupDialog
                dialogStyle={styles.selectDialog}
                width={screenUtils.autoSize(300)}
                height={screenUtils.autoSize(160)}
                ref='_this'
                dialogAnimation={new ScaleAnimation()}
            >
                <DialogButton text='相册中选择'
                              buttonStyle={styles.selectButton}
                              textStyle={styles.selectText}
                              onPress={() => {
                                  this._selectImg('album');
                              }}/>
                <DialogButton text='用相机拍照'
                              buttonStyle={styles.selectButton}
                              textStyle={styles.selectText}
                              onPress={() => {
                                  this._selectImg('camera');
                              }}/>
            </PopupDialog>
        );
    }
}

const styles=StyleSheet.create({
    selectDialog:{
    },
    selectButton:{
        width:screenUtils.autoSize(300),
        height:screenUtils.autoSize(80),
        flex:1,
        justifyContent:'center'
    },
    selectText:{
        fontSize:screenUtils.autoFontSize(20),
        lineHeight:screenUtils.autoSize(80)
    }
});
