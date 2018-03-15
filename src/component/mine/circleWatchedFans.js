import React,{Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import {screenUtils} from "../../tools/ScreenUtils";

export class CircleWatchedFans extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{
                flexDirection:'row',
            }}>
                <View style={styles.cell}>
                    <Text>0</Text>
                    <Text>圈子</Text>
                </View>
                <View style={styles.cell}>
                    <Text>0</Text>
                    <Text>关注</Text>
                </View>
                <View style={styles.cell}>
                    <Text>0</Text>
                    <Text>粉丝</Text>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    cell:{
        flex:1,
        height:screenUtils.autoSize(40),
        textAlign:'center',
    }
});