import React, {Component} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {screenUtils} from '../../tools/ScreenUtils'

export class AvaterNameSignChange extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.avaterNameChange}>
                <View style={styles.avater}>
                    <Image source={require('../../img/profilePic.jpg')} style={styles.cellFixed}/>
                </View>
                <View style={styles.profileNameAndSign}>
                    <Text style={styles.userName}>我的名字</Text>
                    <Text style={styles.Sign}
                          numberOfLines={1}>你的名字是？你的名字是？dsfasdfasdfadsfadfasdfasdfasdfasdfasdfasdfa</Text>
                </View>
                <View>
                    <Image source={require('../../img/profile-more.png')} style={styles.profileChange}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    avaterNameChange:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    avater:{
        marginLeft:screenUtils.autoSize(8),
    },
    userName:{
        fontSize:screenUtils.autoSize(16),
        marginBottom:screenUtils.autoSize(3),
    },
    Sign: {
        fontSize:screenUtils.autoSize(12),
    },
    cellFixed: {
        height: screenUtils.autoSize(80),
        width: screenUtils.autoSize(80),
        borderRadius: screenUtils.autoSize(80),
    },
    profileNameAndSign: {
        marginLeft:screenUtils.autoSize(8),
        flex: 1,
    },
    profileChange: {
        width: screenUtils.autoSize(20),
        height: screenUtils.autoSize(20),
        marginTop: screenUtils.autoSize(30),
        marginLeft: screenUtils.autoSize(10),
    }
});