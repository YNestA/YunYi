import {Dimensions,PixelRatio} from 'react-native'

const UI_WIDTH=375,
    UI_HEIGHT=667;
export let screenUtils={
    uiWidth:UI_WIDTH,   //设计稿宽度
    uiHeight:UI_HEIGHT,  //设计稿高度
    screenWidth:Dimensions.get('window').width,   //屏幕宽度
    screenHeight:Dimensions.get('window').height, //屏幕高度
    pixelRatio:PixelRatio.get(), //像素密度
    fontScale:PixelRatio.getFontScale(),
    scale:Math.min(Dimensions.get('window').width/UI_WIDTH,Dimensions.get('window').height/UI_HEIGHT),
    autoSize:function(size){
        return Math.ceil(this.scale * size);
    },
    autoFontSize:function(fontSize){
        return Math.round((fontSize*this.scale+0.5)/this.fontScale);
    }
};