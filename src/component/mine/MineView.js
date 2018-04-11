import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native'
import {screenUtils} from '../../tools/ScreenUtils'
import {CircleWatchedFans} from './circleWatchedFans'
import {MineArticle} from "./MineArticle";

export default class MineView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor:'#fff',
            }}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor:'#fff',
                }}>
                    <View>
                        <Image source={require('../../img/profilePic.jpg')} style={styles.cellFixed}/>
                    </View>
                    <View style={styles.profileNameAndSign}>
                        <Text>我的名字</Text>
                        <Text style={{overflow: 'hidden'}}
                              numberOfLines={1}>你的名字是？你的名字是？dsfasdfasdfadsfadfasdfasdfasdfasdfasdfasdfa</Text>
                    </View>
                    <View>
                        <Image source={require('../../img/profile-more.png')} style={styles.profileChange}/>
                    </View>
                </View>
                <CircleWatchedFans/>
                <MineArticle/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cellFixed: {
        height: screenUtils.autoSize(80),
        width: screenUtils.autoSize(80),
        borderRadius: screenUtils.autoSize(80),
    },
    profileNameAndSign: {
        marginTop: screenUtils.autoSize(25),
        marginLeft: screenUtils.autoSize(5),
        flex: 1,
    },
    profileChange: {
        width: screenUtils.autoSize(20),
        height: screenUtils.autoSize(20),
        marginTop: screenUtils.autoSize(30),
        marginLeft: screenUtils.autoSize(10),
    }
});