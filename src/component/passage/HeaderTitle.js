import React,{Component} from 'react'
import {View,WebView,Text,StyleSheet,Image,TouchableNativeFeedback} from 'react-native'
import {screenUtils} from '../../tools/ScreenUtils'
const styles={
    container:{
        flexDirection:'row',
        alignSelf:'center',
        alignItems:'center'
    },
    authorContainer:{
        flexDirection:'row',
        justifyContent:'center',
        marginRight:screenUtils.autoSize(10)
    },
    authorImg:{
        borderRadius:screenUtils.autoSize(20),
        width:screenUtils.autoSize(40),
        height:screenUtils.autoSize(40),
        marginRight:screenUtils.autoSize(10)
    },
    authorName:{
        color:'#333',
        fontSize:screenUtils.autoFontSize(18),
        lineHeight:screenUtils.autoSize(40),
        maxWidth:screenUtils.autoSize(150),
        height:screenUtils.autoSize(40)
    },
    concernContainer:{
        backgroundColor:'#3f81c1',
        borderRadius:screenUtils.autoSize(5),
        height:screenUtils.autoSize(25)
    },
    concern:{
        color:'#fff',
        paddingHorizontal:screenUtils.autoSize(10),
        lineHeight:screenUtils.autoSize(25),
        fontSize:screenUtils.autoFontSize(14)
    }
}
export default class HeaderTitle extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.container}>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('#ddd',true)}
                    onPress={()=>{console.log('go author')}}
                >
                    <View style={styles.authorContainer}>
                        <Image style={styles.authorImg} source={require('../../img/user1.jpg')}/>
                        <Text style={styles.authorName} numberOfLines={1}>{this.props.author.name}</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={styles.concernContainer}><Text style={styles.concern}>关注</Text></View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}
