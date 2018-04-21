import React,{Component} from 'react'
import {View,Text,FlatList,Image,StyleSheet,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
import {screenUtils} from "../../tools/ScreenUtils";

const styles=StyleSheet.create({
    container:{
    //    backgroundColor:'#fff',
        marginBottom:screenUtils.autoSize(20)
    },
    whiteBackground:{
        backgroundColor:'#fff'
    },
    commentContainer:{
        flexDirection:'row',
        flex:1,
        marginLeft:screenUtils.autoSize(15),
        borderWidth:0,
        borderBottomWidth:1,
        borderColor:'#eee'
    },
    commentLeft:{
        width:screenUtils.autoSize(50),
        marginRight:screenUtils.autoSize(10)
    },
    headImg:{
        width:screenUtils.autoSize(50),
        height:screenUtils.autoSize(50),
        borderRadius:screenUtils.autoSize(25),
        marginVertical:screenUtils.autoSize(10)
    },
    commentHeader:{
        flexDirection:'row',
    },
    commentName:{
        flex:1,
        fontSize:screenUtils.autoFontSize(16),
        color:'#3F81C1'
    },
    commentContent:{
        marginVertical:screenUtils.autoSize(5),
        marginRight:screenUtils.autoSize(30),
        fontSize:screenUtils.autoFontSize(17),
        lineHeight:screenUtils.autoSize(30),
        color:'#333'
    },
    commentTime:{
        fontSize:screenUtils.autoFontSize(14),
        color:'#777',
        marginBottom:screenUtils.autoSize(15)
    },
    commentRight:{
        marginTop:screenUtils.autoSize(10),
        flex:1
    },
    commentThumb:{
        width:screenUtils.autoSize(60),
        marginLeft:screenUtils.autoSize(10),
        flexDirection:'row'
    },
    commentThumbImg:{
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20)
    },
    commentThumbCount:{
        width:screenUtils.autoSize(40)
    },
    header:{
        flexDirection:'row',
        padding:screenUtils.autoSize(15),
        borderWidth:0,
        borderBottomWidth:1,
        borderColor:'#eee'
    },
    blueRow:{
        backgroundColor:'#3F81C1',
        width:screenUtils.autoSize(5),
        height:screenUtils.autoSize(25),
        borderRadius:screenUtils.autoSize(5)
    },
    headerText:{
        marginLeft:screenUtils.autoSize(8),
        fontSize:screenUtils.autoFontSize(18),
        color:'#444',
    },
    footer:{
        paddingVertical:screenUtils.autoSize(20)
    },
    footerText:{
        fontSize:screenUtils.autoFontSize(16),
        textAlign:'center',
        color:'#4fa1c1'
    }
});
class Comment extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let comment=this.props.comment;
        return(
            <View style={styles.commentContainer}>
                <View style={styles.commentLeft}>
                    <TouchableWithoutFeedback>
                        <View>
                            <Image style={styles.headImg} source={require('../../img/user3.jpg')}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.commentRight}>
                    <View style={styles.commentHeader}>
                        <Text numberOfLines={1} style={styles.commentName}>{comment.name}</Text>
                        <TouchableOpacity>
                            <View style={styles.commentThumb}>
                                { comment.everThumb?
                                    <Image style={styles.commentThumbImg} source={require('../../img/common/thumb-fill.png')}/>
                                    :
                                    <Image style={styles.commentThumbImg} source={require('../../img/common/y_thumb.png')}/>
                                }
                                <Text style={[styles.commentThumbCount,comment.everThumb?{color:'#D4237A'}:{}]}>{comment.thumbCount}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.commentContent}>{comment.content}</Text>
                    <Text style={styles.commentTime}>{comment.time}</Text>
                </View>
            </View>
        );
    }
}
class Comments extends Component{
    constructor(props){
        super(props);
    }
    _renderHeader(len){
        return (
            <View style={styles.header}>
                <View style={styles.blueRow}/>
                <Text style={styles.headerText}>热门评论  ({len})</Text>
            </View>
        );
    }
    _renderFooter(len){
        if(len>0) {
            return (
                <View style={styles.footer}>
                    <TouchableOpacity>
                        <View><Text style={styles.footerText}>查看所有评论></Text></View>
                    </TouchableOpacity>
                </View>
            );
        }else{
            return <View style={styles.footer}>
                <Text style={styles.footerText}>暂无评论</Text>
            </View>
        }
    }
    render(){
        let passage=this.props.passage;
        return(
            <FlatList
                style={[styles.container,!passage.isCoverBlur?styles.whiteBackground:{}]}
                extraData={this.state}
                ListHeaderComponent={this._renderHeader(passage.commentCount)}
                ListFooterComponent={this._renderFooter(passage.commentCount)}
                data={passage.comments}
                renderItem={({item,index})=>{
                    return <Comment comment={item}/>;
                }}
            />
        );
    }
}

let actions={

};
function mapStateToProps(state) {
    return{
        passage:state.passage
    }
}
function mapDispatchToProps(dispatch) {
    return{

    }
}

export default Comments=connect(mapStateToProps,mapDispatchToProps)(Comments);