import React,{Component} from 'react'
import {View, Text,Image,StyleSheet, StatusBar,TouchableNativeFeedback,TouchableWithoutFeedback} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";

const styles=StyleSheet.create({
    container:{
        position:'absolute',
        top:0,
        zIndex:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:StatusBar.currentHeight,
        width:screenUtils.screenWidth,
        height:screenUtils.autoSize(50)+StatusBar.currentHeight,
        backgroundColor:'#fff',
        borderBottomWidth:1/screenUtils.pixelRatio,
    },
    headerImg:{
        margin:screenUtils.autoSize(10),
        width:screenUtils.autoSize(35),
        height:screenUtils.autoSize(35)
    },
    headerUser:{
        flexDirection:'row',
        justifyContent:'center',
        flex:1,
        height:screenUtils.autoSize(35),
        marginHorizontal:screenUtils.autoSize(40)
    },
    userImg:{
        width:screenUtils.autoSize(35),
        height:screenUtils.autoSize(35),
        borderRadius:screenUtils.autoSize(20)
    },
    username:{
        maxWidth:screenUtils.autoSize(100),
        color:'#444',
        marginLeft:screenUtils.autoSize(5),
        lineHeight:screenUtils.autoSize(35),
        fontSize:screenUtils.autoFontSize(18)
    }
});
export default class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {navigation,opacity,user}=this.props,
            leftImg=opacity<0.6?require('../../img/common/left_arrow.png'):require('../../img/common/left_arrow_gray.png'),
            rightImg=opacity<0.6?require('../../img/common/more_white.png'):require('../../img/common/more.png');

        return (
            <View style={[styles.container,{
                backgroundColor:`rgba(255,255,255,${opacity})`,
                borderColor:opacity>0.6?'#ccc':'transparent'
            }]} >
                <TouchableNativeFeedback
                    onPress={()=>{
                        navigation.goBack(null);
                    }}
                    background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.15)',true) }
                >
                    <View><Image style={styles.headerImg} source={leftImg}/></View>
                </TouchableNativeFeedback>
                { opacity>0.6?
                    <TouchableWithoutFeedback
                    >
                        <View style={styles.headerUser}>
                            <Image style={styles.userImg} source={{uri: user.userInfo.headImg}}/>
                            <Text numberOfLines={1} style={styles.username}>{user.userInfo.username}</Text>
                        </View>
                    </TouchableWithoutFeedback>:null
                }
                <TouchableNativeFeedback
                    onPress={()=>{}}
                    background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.15)',true) }
                >
                    <View><Image style={styles.headerImg} source={rightImg}/></View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}