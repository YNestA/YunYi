import React,{Component} from 'react'
import {ScrollView,View,Text,StyleSheet,Image,TouchableWithoutFeedback} from 'react-native'
import {myFetch,screenUtils} from '../../tools/MyTools'

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        paddingLeft:screenUtils.autoSize(20),
        paddingVertical:screenUtils.autoSize(20),
        marginBottom:screenUtils.autoSize(20),
        borderBottomWidth:1/screenUtils.pixelRatio,
        borderColor:'#ccc'
    },
    header:{
        fontSize:screenUtils.autoFontSize(16),
        color:'#444'
    },
    userImg:{
        width:screenUtils.autoSize(50),
        height:screenUtils.autoSize(50),
        borderRadius:screenUtils.autoSize(25),
        marginHorizontal:screenUtils.autoSize(15)
    },
    users:{
        marginTop:screenUtils.autoSize(15),
        height:screenUtils.autoSize(80)
    },
    user:{
        width:screenUtils.autoSize(80),
    },
    userName:{
        color:'#444',
        fontSize:screenUtils.autoSize(16),
        width:screenUtils.autoSize(80),
        lineHeight:screenUtils.autoSize(30),
        textAlign:'center'
    }
});
export default class ConcernUsers extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {users,title,navigation}=this.props;
        if(users.length) {
            return (
                <View style={styles.container}>
                    <Text style={styles.header}>{title?title:'推荐用户'}</Text>
                    <ScrollView
                        style={styles.users}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            users.map((item, index) => {
                                return <TouchableWithoutFeedback onPress={()=>{
                                    navigation.navigate('OtherUser',{otherUserId:item.userID});
                                }} key={index}>
                                    <View style={styles.user}>
                                        <Image style={styles.userImg} source={require('../../img/user2.jpg')}/>
                                        <Text numberOfLines={1} style={styles.userName}>{item.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            })
                        }
                    </ScrollView>
                </View>
            );
        }else{
            return <View/>;
        }
    }
}
