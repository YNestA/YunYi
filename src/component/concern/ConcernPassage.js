import React,{Component} from 'react'
import {View,Image,Text,TouchableWithoutFeedback,StyleSheet} from 'react-native'
import {screenUtils} from '../../tools/ScreenUtils'
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        marginBottom:screenUtils.autoSize(15),
    },
    authorContainer:{
        height:screenUtils.autoSize(40),
        marginTop:screenUtils.autoSize(10),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    author:{
        flex:1,
        flexDirection:'row',
    },
    concernText:{
        borderWidth:1,
        borderColor:'#aaa',
        color:'#777',
        borderRadius:screenUtils.autoSize(8),
        fontSize:screenUtils.autoFontSize(14),
        paddingHorizontal:screenUtils.autoSize(5),
        paddingVertical:screenUtils.autoSize(2),
        marginVertical:screenUtils.autoSize(5),
        marginHorizontal:screenUtils.autoSize(10)
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
    },
    passageTitle:{
        paddingLeft:screenUtils.autoSize(10),
        paddingRight:screenUtils.autoSize(10),
        marginTop:screenUtils.autoSize(5),
        marginBottom:screenUtils.autoSize(5),
        height:screenUtils.autoSize(30),
        lineHeight:screenUtils.autoSize(30),
        fontSize:screenUtils.autoFontSize(19),
        color:'#333'
    },
    passageText:{
        paddingHorizontal:screenUtils.autoSize(10),
        fontSize:screenUtils.autoSize(16),
        marginBottom:screenUtils.autoSize(10)
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
        marginTop:screenUtils.autoSize(1),
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
export default class ConcernPassage extends Component{
    constructor(props){
        super(props);
        this._openPassage=this._openPassage.bind(this);
        this._openUser=this._openUser.bind(this);
    }
    _openPassage(){
        let navigation=this.props.navigation;
        navigation.navigate('Passage',{passage:this.props.passage});
    }
    _openUser(){
        let {navigation,passage}=this.props;
        navigation.navigate('OtherUser',{otherUserId:passage.author.authorID});
    }
    _getTime(time){
        let date=new Date(time);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    }
    render() {
        let passage=this.props.passage;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this._openUser}>
                    <View style={styles.authorContainer}>
                        <View style={styles.author}>
                            <Image style={styles.authorHeadImg} source={{uri:passage.author.headImg}}/>
                            <Text numberOfLines={1} style={styles.authorName}>{passage.author&&passage.author.name}</Text>
                        </View>
                        <Text style={styles.concernText}>{passage.author.concerned?'互相关注':'已关注'}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this._openPassage}>
                    <View style={styles.passageContainer}>
                        <Text style={styles.passageTitle}>{passage.title}</Text>
                        <Text style={styles.passageText} numberOfLines={2}>{passage.text}</Text>
                        <Image style={styles.coverImg} source={{uri:passage.coverImg}}/>
                        <View style={styles.otherInfo}>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.thumbContainer}>
                                    {/*passage.thumbHeadImgs&&passage.thumbHeadImgs.map((item,index)=><Image style={styles.thumbUserHeadImg} source={{uri:item}} key={index}/>)*/}
                                    <Text>{this._getTime(passage.createTime)}</Text>
                                </View>
                                <View style={styles.thumbCountContainer}>
                                    <Image style={styles.infoImg} source={require('../../img/common/y_thumb.png')}/>
                                    <Text style={styles.infoText}>{passage.thumbCount}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.commentContainer}>
                                    <Image style={styles.infoImg} source={require('../../img/common/y_comment.png')}/>
                                    <Text style={styles.infoText}>{passage.commentCount}</Text>
                                </View>
                                <View style={styles.shareContainer}>
                                    <Image style={styles.infoImg} source={require('../../img/common/y_share.png')}/>
                                    <Text style={styles.infoText}>{passage.shareCount}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>);
    }

}

