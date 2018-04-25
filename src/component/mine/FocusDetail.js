import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableNativeFeedback, StatusBar,FlatList} from 'react-native';
import {screenUtils} from "../../tools/ScreenUtils";

export default class FocusDetail extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = () => {
        return {
            headerTitle: '我的关注',
            headerStyle:{marginTop:StatusBar.currentHeight},
            headerTitleStyle:{},
        };
    };

    _renderItem=({item})=>(
        <TouchableNativeFeedback>
            <View style={styles.itemContainer}>
                <View style={styles.itemLeft}>
                    <Image source={require('../../img/profilePic.jpg')} style={styles.avatar}/>
                    <Text style={styles.userName}>{item.userName}</Text>
                </View>
                <TouchableNativeFeedback>
                    <View style={styles.neverFollow}>
                        <Text style={styles.neverFollowWords}>取消关注</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </TouchableNativeFeedback>
    );

    render(){
        return(
            <FlatList
                data={data}
                renderItem={this._renderItem}
                style={styles.flatList}
            >

            </FlatList>
        );
    }
}

const data = [{
    avatar:'../../img/profilePic/jpg',
    userName:'liutao',
    userId:'2',
},{
    avatar:'../../img/profilePic/jpg',
    userName:'liutao',
    userId:'2',
},{
    avatar:'../../img/profilePic/jpg',
    userName:'liutao',
    userId:'2',
},{
    avatar:'../../img/profilePic/jpg',
    userName:'liutao',
    userId:'2',
}];

const styles= StyleSheet.create({
    flatList:{
        flex:1,
        backgroundColor:'#fff'
    },
    itemContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:screenUtils.autoSize(5),
        paddingBottom:screenUtils.autoSize(5),
        borderBottomWidth:screenUtils.autoSize(0.8),
        borderColor:'rgb(224,255,255)',
        alignItems:'center'
    },
    itemLeft:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginLeft:screenUtils.autoSize(8),
    },
    avatar:{
        width:screenUtils.autoSize(50),
        height:screenUtils.autoSize(50),
        borderRadius:screenUtils.autoSize(50),
    },
    userName:{
        fontSize:screenUtils.autoSize(16),
        paddingLeft:screenUtils.autoSize(4),
        paddingTop:screenUtils.autoSize(5),
    },
    neverFollow:{
        borderColor:'rgb(224,255,255)',
        borderRadius:screenUtils.autoSize(6),
        padding:screenUtils.autoSize(2),
    },
    neverFollowWords:{
        color:'rgb(224,255,255)',
        fontSize:screenUtils.autoSize(14),
    }
});