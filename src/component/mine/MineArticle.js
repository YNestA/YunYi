import React,{Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import {screenUtils} from "../../tools/ScreenUtils";

export class MineArticle extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{
                flex:1,
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:'#fff'
            }}>
                <View>
                    <View style={styles.textSize}>
                        <Text style={styles.fileSize}>全部文章</Text>
                        <Text style={[styles.fileSize,{marginLeft:screenUtils.autoSize(30)}]}>回收站</Text>
                    </View>
                </View>
                <View>
                    <Image source={require('../../img/file.png')} style={styles.imageIcon}/>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    textSize:{
        flexDirection:'row',
        backgroundColor:'#bbb',
        marginLeft:screenUtils.autoSize(10),
        paddingTop:screenUtils.autoSize(10),
        paddingBottom:screenUtils.autoSize(10),
    },
    fileSize:{
        fontSize:screenUtils.autoSize(18),
    },
    imageIcon:{
        marginBottom:screenUtils.autoSize(10),
        marginTop:screenUtils.autoSize(14),
        width:screenUtils.autoSize(16),
        height:screenUtils.autoSize(16),
        marginRight:screenUtils.autoSize(30),
    }
});