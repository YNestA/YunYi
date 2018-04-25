import React,{Component} from 'react'
import {View,Text,FlatList,Image,StyleSheet,StatusBar,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
import {screenUtils} from "../../tools/ScreenUtils";
import myFetch, {encodePostParams} from "../../tools/MyFetch";
import {ip} from "../../settings";
import Loading from "../../tools/loading";

const styles=StyleSheet.create({
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
    }
});
class Comment extends Component{
    constructor(props){
        super(props);
    }
    _getTime(time){
        let date=new Date(time);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
    }
    render(){
        let comment=this.props.comment;
        return(
            <View style={styles.commentContainer}>
                <View style={styles.commentLeft}>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.navigation.navigate('OtherUser',{otherUserId:comment.userId})
                    }}>
                        <View>
                            <Image style={styles.headImg} source={{uri:comment.headImg}}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.commentRight}>
                    <View style={styles.commentHeader}>
                        <Text numberOfLines={1} style={styles.commentName}>{comment.name}</Text>
                        {/*
                            <TouchableOpacity>
                                <View style={styles.commentThumb}>
                                    {comment.everThumb ?
                                        <Image style={styles.commentThumbImg}
                                               source={require('../../img/common/thumb-fill.png')}/>
                                        :
                                        <Image style={styles.commentThumbImg}
                                               source={require('../../img/common/y_thumb.png')}/>
                                    }
                                    <Text
                                        style={[styles.commentThumbCount, comment.everThumb ? {color: '#D4237A'} : {}]}>{comment.thumbCount}</Text>
                                </View>
                            </TouchableOpacity>
                        */}
                    </View>
                    <Text style={styles.commentContent}>{comment.content}</Text>
                    <Text style={styles.commentTime}>{this._getTime(comment.time)}</Text>
                </View>
            </View>
        );
    }
}
class AllComments extends Component{
    static navigationOptions=({navigation})=>{
        let {params}=navigation.state;
        return {
            headerTitle:params?`评论${params.commentCount}条`:'',
            headerRight:<View/>
        }
    };
    constructor(props){
        super(props);
        this.state={
            loading:true
        }
    }
    componentDidMount(){
        let {passage,user,navigation}=this.props;
        navigation.setParams({commentCount:passage.commentCount});
        this.props.getAllComments(passage,user,()=>{
            this.setState({loading:false});
        });
    }

    render(){
        let {passage}=this.props;
        if(this.state.loading){
            return <Loading containerStyle={{flex:1}}/>;
        }else {
            return (
                <View style={{flex: 1}}>
                    <StatusBar translucent={false} backgroundColor={'#fff'} barStyle={'dark-content'}/>
                    {passage.allComments.length ?
                        <FlatList
                            style={{backgroundColor: '#fff'}}
                            extraData={this.state}
                            data={passage.allComments}
                            renderItem={({item, index}) => {
                                return <Comment comment={item} navigation={this.props.navigation}/>;
                            }}
                        />
                        :
                        <View style={{flex: 1, justifyContent: 'center'}}><Text style={{
                            fontSize: screenUtils.autoFontSize(30),
                            textAlign: 'center'
                        }}>暂无评论</Text></View>
                    }
                </View>
            );
        }
    }
}

let action={
    getAllComments:function (passage,user,cb) {
        return myFetch(`http://${ip}:4441/api/article/${passage.passageID}/comments/show/`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'user_token':user.token,
            },
        }).then(response=>response.json())
            .then(responseData=>{
                //alert(JSON.stringify(responseData));
                if(responseData.code==10001) {
                    cb();
                    return {
                        type: 'GET_PASSAGE_ALL_COMMENTS',
                        payload: {
                            allComments: responseData.data.map((item)=>{
                               return {
                                   name:item.nickname,
                                   content:item.content,
                                   time:item.createTime,
                                   userId:item.userUuid,
                                   commentId:item.commentUuid,
                                   headImg:item.avatar,
                                   thumbCount:item.likeNum,
                                   everThumb:false
                               } ;
                            }),
                        }
                    };
                }
            }).catch(err=>{
                //alert(err);
            })
    }
};
function mapStateToProps(state) {
    return {
        user:state.user,
        passage:state.passage
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getAllComments:(passage,user,cb)=>{dispatch(action.getAllComments(passage,user,cb))}
    }
}

export default AllComments=connect(mapStateToProps,mapDispatchToProps)(AllComments);