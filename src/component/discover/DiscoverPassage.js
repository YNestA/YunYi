import React,{Component} from 'react'
import {View,Image,Text,TouchableWithoutFeedback,StyleSheet} from 'react-native'
import {screenUtils} from '../../tools/ScreenUtils'
const styles=StyleSheet.create({
    container:{
        height:screenUtils.autoSize(340),
        backgroundColor:'#fff',
        marginBottom:screenUtils.autoSize(15),
    },
    authorContainer:{
        height:screenUtils.autoSize(40),
        marginTop:screenUtils.autoSize(10),
        flexDirection:'row',
    },
    authorHeadImg:{
        width:screenUtils.autoSize(40),
        height:screenUtils.autoSize(40),
        borderRadius:screenUtils.autoSize(20),
        marginLeft:screenUtils.autoSize(10),
        marginRight:screenUtils.autoSize(10)
    },
    authorName:{
        color:'#777',
        lineHeight:screenUtils.autoFontSize(40),
        flex:1,
        fontSize:screenUtils.autoFontSize(15),
        marginRight:screenUtils.autoSize(10),
    },
    passageContainer:{
        height:screenUtils.autoSize(290)
    },
    passageTitle:{
        paddingLeft:screenUtils.autoSize(10),
        paddingRight:screenUtils.autoSize(10),
        marginTop:screenUtils.autoSize(5),
        marginBottom:screenUtils.autoSize(10),
        height:screenUtils.autoSize(30),
        lineHeight:screenUtils.autoSize(30),
        fontSize:screenUtils.autoFontSize(19),
        color:'#333'
    },
    coverImg:{
        width:screenUtils.screenWidth,
        height:screenUtils.autoSize(200),
    },
    otherInfo:{
        flexDirection:'row',
        paddingTop:screenUtils.autoSize(10),
        paddingBottom:screenUtils.autoSize(10),
        height:screenUtils.autoSize(45),
        justifyContent:'space-between'
    },
    thumbContainer:{
        flexDirection:'row',
        height:screenUtils.autoSize(25),
        marginLeft:screenUtils.autoSize(10),
        marginRight:screenUtils.autoSize(5)
    },
    thumbUserHeadImg:{
        width:screenUtils.autoSize(25),
        height:screenUtils.autoSize(25),
        borderRadius:screenUtils.autoSize(13),
        marginLeft:screenUtils.autoSize(5),
        marginRight:screenUtils.autoSize(5)
    },
    thumbCountContainer:{
        borderWidth:screenUtils.autoSize(1),
        borderColor:'#b0b0b0',
        borderRadius:screenUtils.autoSize(10),
        flexDirection:'row',
        height:screenUtils.autoSize(25),
        paddingLeft:screenUtils.autoSize(5),
        paddingRight:screenUtils.autoSize(5)
    },
    infoImg:{
        marginTop:screenUtils.autoSize(2),
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20)
    },
    infoText:{
        fontSize:screenUtils.autoSize(13),
        lineHeight:screenUtils.autoSize(23),
        height:screenUtils.autoSize(23)
    },
    commentContainer:{
        marginRight:screenUtils.autoSize(10),
        flexDirection:'row',
        height:screenUtils.autoSize(25),
    },
    shareContainer:{
        marginRight:screenUtils.autoSize(10),
        flexDirection:'row',
        height:screenUtils.autoSize(25)
    },
});
class DiscoverPassage extends Component{
    constructor(props){
        super(props);
    }
    render() {
        let passage=this.props.passage;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={()=>{console.log(2)}}>
                    <View style={styles.authorContainer}>
                        <Image style={styles.authorHeadImg} source={require('../../img/asuka.jpg')}/>
                        <Text numberOfLines={1} style={styles.authorName}>{passage.author&&passage.author.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{console.log(3)}}>
                    <View style={styles.passageContainer}>
                        <Text style={styles.passageTitle}>{passage.title}</Text>
                        <Image style={styles.coverImg} source={require('../../img/hikari.jpg')}/>
                        <View style={styles.otherInfo}>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.thumbContainer}>
                                    {passage.thumbHeadImgs&&[
                                        require('../../img/user1.jpg'),
                                        require('../../img/user2.jpg'),
                                        require('../../img/user3.jpg'),
                                        require('../../img/user1.jpg')
                                    ].map((item,index)=><Image style={styles.thumbUserHeadImg} source={item} key={index}/>)}
                                 </View>
                                <View style={styles.thumbCountContainer}>
                                    <Image style={styles.infoImg} source={require('../../img/discover/thumb.png')}/>
                                    <Text style={styles.infoText}>{passage.thumbCount}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.commentContainer}>
                                    <Image style={styles.infoImg} source={require('../../img/discover/comment.png')}/>
                                    <Text style={styles.infoText}>{passage.commentCount}</Text>
                                </View>
                                <View style={styles.shareContainer}>
                                    <Image style={styles.infoImg} source={require('../../img/discover/share.png')}/>
                                    <Text style={styles.infoText}>{passage.shareCount}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>);
    }

}

export default DiscoverPassage;