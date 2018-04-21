import React, {Component} from 'react'
import {View, Text, Image, StyleSheet,TouchableNativeFeedback} from 'react-native'
import {connect} from "react-redux"
import NetworkError from '../../tools/NetworkError'
import myFetch from '../../tools/MyFetch'
import {screenUtils} from '../../tools/ScreenUtils'

export default class SignNameChangeDetail extends Component{
    constructor(props){
        super(props);
    }
    static navigationOptions=()=>{
        return{
            headerTitle:'账号设置',
        }
    }

    render(){
        return(
            <View>
                <View style={styles.avaterChange}>
                    <View>头像</View>
                    <View>
                        <Image source={require('../../img/profilePic.jpg')}/>
                        <Image source={require('../../img/profile-more.png')}/>
                    </View>
                </View>
                <View>
                    <View>昵称</View>
                    <View>
                        <Text>这是名字</Text>
                        <Image source={require('../../img/profile-more.png')}/>
                    </View>
                </View>
                <View>
                    <View>性别</View>
                    <View>
                        <Text>这是性别</Text>
                        <Image source={require('../../img/profile-more.png')}/>
                    </View>
                </View>
                <View>
                    <View>生日</View>
                    <View>
                        <Text>这是生日</Text>
                        <Image source={require('../../img/profile-more.png')}/>
                    </View>
                </View>
                <TouchableNativeFeedback>
                    <View>
                        <Text>退出账号</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    avaterChange:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
});