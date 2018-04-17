import React, {Component} from 'react'
import {View, Text, Image, StyleSheet,TouchableNativeFeedback,StatusBar} from 'react-native'
import {screenUtils} from '../../tools/ScreenUtils'

export default class GeneralSetting extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions=()=>{
        return {
            headerTitle:'注册',
            headerRight:<View/>,
            headerStyle:{marginTop:StatusBar.currentHeight},
        };
    };



    render(){
        return(
            <View>
                <TouchableNativeFeedback>
                    <View style={styles.settingItem}>
                        <View style={styles.imgTextContainer}>
                            <Image source={require('../../img/setting.png')} style={styles.settingImgItem}/>
                            <Text style={styles.settingName}>通用设置</Text>
                        </View>
                        <Image source={require('../../img/profile-more.png')} style={styles.settingImgGoDetail}/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={styles.settingItem}>
                        <View style={styles.imgTextContainer}>
                            <Image source={require('../../img/exclamationMark.png')} style={styles.settingImgItem}/>
                            <Text style={styles.settingName}>关于美篇</Text>
                        </View>
                        <Image source={require('../../img/profile-more.png')} style={styles.settingImgGoDetail}/>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    settingItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        paddingTop:screenUtils.autoSize(10),
        paddingBottom:screenUtils.autoSize(10),
        marginBottom:screenUtils.autoSize(1),
        alignItems:'center',
    },
    imgTextContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    settingImgItem:{
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20),
        marginLeft:screenUtils.autoSize(14),
        marginRight:screenUtils.autoSize(14),
    },
    settingName:{
        fontSize:screenUtils.autoSize(16),
    },
    settingImgGoDetail:{
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20),
        marginRight:screenUtils.autoSize(20),
    }
});