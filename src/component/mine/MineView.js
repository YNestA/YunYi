import React, {Component} from 'react'
import {View,Text,Image,StyleSheet} from 'react-native'
import {screenUtils} from '../../tools/ScreenUtils'
import {CircleWatchedFans} from './circleWatchedFans'

export default class MineView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <View>
                    <View style={styles.profileImgView}>
                        <Image source={require('../../img/profilePic.jpg')} style={styles.profileImg}/>
                    </View>
                    <View style={styles.profileNameAndSign}>
                        <Text style={styles.profileName}>我的名字</Text>
                        <Text style={styles.profileSign}>你的名字是？你的名字是？</Text>
                    </View>
                    <View style={styles.profileChangeView}>
                        <Image source={require('../../img/profile-more.png')} style={styles.profileChange}></Image>
                    </View>
                </View>
                <View>
                    <CircleWatchedFans/>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    profileImgView:{
        position:'absolute',
    },
    profileImg:{
        width:screenUtils.autoSize(80),
        height:screenUtils.autoSize(80),
        borderRadius:screenUtils.autoSize(80),
        marginLeft:screenUtils.autoSize(10),
    },
    profileNameAndSign:{
        paddingLeft:screenUtils.autoSize(100),
        paddingRight:screenUtils.autoSize(24),
        position:'absolute',
        top:screenUtils.autoSize(23),
    },
    profileName:{
        fontSize:screenUtils.autoSize(18),
        fontWeight:"500",
    },
    profileSign:{
        fontSize:screenUtils.autoSize(12),
        fontWeight:"100",
    },
    profileChangeView:{
        position:'absolute',
        right:screenUtils.autoSize(0),
    },
    profileChange:{
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20),
        marginTop:screenUtils.autoSize(30),
    }
});