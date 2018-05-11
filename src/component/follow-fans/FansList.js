import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, FlatList,StyleSheet, Image,TouchableOpacity, ImageBackground, BackHandler
} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";

const fanStyles=StyleSheet.create({
    fan:{
        marginLeft:screenUtils.autoSize(15),
        borderColor:'#eee',
        borderBottomWidth:1,
        flexDirection:'row',
        paddingVertical:screenUtils.autoSize(10),
        paddingRight:screenUtils.autoSize(15)
    },
    fanHead:{
        width:screenUtils.autoSize(50),
        height:screenUtils.autoSize(50),
        marginTop:screenUtils.autoSize(10),
        borderRadius:screenUtils.autoSize(25)
    },
    fanRight:{
        flex:1,
        paddingLeft:screenUtils.autoSize(10),
    },
    fanName:{
        lineHeight:screenUtils.autoSize(40),
        color:'#2f51a1',
        fontSize:screenUtils.autoFontSize(17),
    },
    fanMotto:{
        lineHeight:screenUtils.autoSize(20),
        fontSize:screenUtils.autoSize(15),
        color:'#666'
    }
});
class Fan extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {navigation,fan}=this.props;
        return(
            <TouchableOpacity onPress={()=>{
                navigation.navigate('OtherUser',{otherUserId:fan.userID});
            }}>
                <View style={fanStyles.fan}>
                    <Image style={fanStyles.fanHead} source={{uri: fan.headImg}}/>
                    <View style={fanStyles.fanRight}>
                        <Text style={fanStyles.fanName} numberOfLines={1}>{fan.name}</Text>
                        <Text style={fanStyles.fanMotto} numberOfLines={1}>{fan.motto || '这个人很懒，什么也没有写'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
export default class FansList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {fans,navigation}=this.props;
        if(fans.people.length>0) {
            return (
                <FlatList
                    extraData={this.state}
                    data={fans.people}
                    renderItem={({item, index}) => {
                        return <Fan fan={item} navigation={navigation}/>;
                    }}
                />
            );
        }else{
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: screenUtils.autoSize(25),
                    }}>还没有粉丝~</Text>
                </View>
            );
        }
    }
}