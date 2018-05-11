import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, FlatList,StyleSheet, Image,TouchableOpacity, ImageBackground, BackHandler
} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";

const personStyles=StyleSheet.create({
    person:{
        marginLeft:screenUtils.autoSize(15),
        borderColor:'#eee',
        borderBottomWidth:1,
        flexDirection:'row',
        paddingVertical:screenUtils.autoSize(10),
        paddingRight:screenUtils.autoSize(15)
    },
    personHead:{
        width:screenUtils.autoSize(50),
        height:screenUtils.autoSize(50),
        marginTop:screenUtils.autoSize(10),
        borderRadius:screenUtils.autoSize(25)
    },
    personRight:{
        flex:1,
        paddingLeft:screenUtils.autoSize(10),
    },
    personName:{
        lineHeight:screenUtils.autoSize(40),
        color:'#2f51a1',
        fontSize:screenUtils.autoFontSize(17),
    },
    personMotto:{
        lineHeight:screenUtils.autoSize(20),
        fontSize:screenUtils.autoSize(15),
        color:'#666'
    }
});
class FollowPerson extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {navigation,person}=this.props;
        return(
            <TouchableOpacity onPress={()=>{
                navigation.navigate('OtherUser',{otherUserId:person.userID});
            }}>
                <View style={personStyles.person}>
                    <Image style={personStyles.personHead} source={{uri: person.headImg}}/>
                    <View style={personStyles.personRight}>
                        <Text style={personStyles.personName} numberOfLines={1}>{person.name}</Text>
                        <Text style={personStyles.personMotto} numberOfLines={1}>{person.motto || '这个人很懒，什么也没有写'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
export default class FollowList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {follow,navigation}=this.props;
        if(follow.people.length>0) {
            return (
                <FlatList
                    extraData={this.state}
                    data={follow.people}
                    renderItem={({item, index}) => {
                        return <FollowPerson person={item} navigation={navigation}/>;
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
                    }}>还没有关注~</Text>
                </View>
            );

        }

    }
}