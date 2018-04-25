import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, StyleSheet, Image, ImageBackground, findNodeHandle,
    BackHandler
} from 'react-native'
import {connect} from 'react-redux'
import HeaderTitle from './HeaderTitle'
import {Loading, screenUtils, myFetch, getRoutekey} from '../../tools/MyTools'
import PassageWebView from './PassageWebView'
import PassageFooter from './PassageFooter'
import Comments from './comments'
import PassagesPush from './PassagesPush'
import {encodePostParams} from "../../tools/MyFetch";
import {ip} from '../../settings'

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    whiteBackground:{
        backgroundColor:'#fff'
    },
    passageContainer:{
 //       backgroundColor:'#fff',
        marginBottom:screenUtils.autoSize(20),
    },
    title:{
        color:'#333',
        fontSize:screenUtils.autoFontSize(24),
        marginHorizontal:screenUtils.autoSize(20),
        marginVertical:screenUtils.autoSize(20)
    },
    passageInfo:{
        marginHorizontal:screenUtils.autoSize(20),
        flexDirection:'row',
    },
    passageTime:{
        fontSize:screenUtils.autoFontSize(16)
    },
    passageAuthor:{
        marginHorizontal:screenUtils.autoSize(10),
        color:'#38b',
        fontSize:screenUtils.autoFontSize(16),
        maxWidth:screenUtils.autoSize(200)
    },
    passageRead:{
        fontSize:screenUtils.autoFontSize(16)
    }
});

class Passage extends Component{
    static navigationOptions= ({navigation,screenProps})=>{
        let {params}=navigation.state;
        return {
            headerRight:<View/>,
            headerTitle: <HeaderTitle navigation={navigation} author={params.passage.author}/>
        }
    };
    constructor(props){
        super(props);
        this.state = {
            viewRef: null,
            webviewLoading:true
        };
        this._buildPassageHtml=this._buildPassageHtml.bind(this);
        this._onBackHandler=this._onBackHandler.bind(this);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress',this._onBackHandler);
        this.props.setLoading(true);
    }
    _onBackHandler(){
        this.props.navigation.goBack();
        return true;
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',this._onBackHandler);
        let {params}=this.props.navigation.state;
        this.props.initPassage(params.passage.passageID,this.props.user,params.passage.author.authorID,this.props.navigation);
        //this.props.getPassagesPush();
    }
    _buildPassageHtml(sections){
        return sections.map((item)=>{
            let content=`<div class="section_text">${item.content}</div>`;
            if(item.type==='img'){
                return `<img style="display:block;width:100%;" src="${item.img.url}">`+content;
            }else{
                return content;
            }
        }).join('<br>');
    }
    _getTime(time){
        let date=new Date(time);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`;
    }
    render(){
        let passage=this.props.passage;
            return (
                <View style={styles.container}>
                    <StatusBar translucent={false} backgroundColor={'#fff'} barStyle={'dark-content'}/>
                    {(passage.loading||this.state.webviewLoading)&&<Loading
                        containerStyle={{
                            backgroundColor:'#fff',
                            position:'absolute',
                            top:0,bottom:0,left:0,right:0,
                            zIndex:1000
                        }}
                    />}
                    { passage.isCoverBlur&&
                        <Image
                            blurRadius={5}
                            style={{position: 'absolute', width: '100%', height: '100%'}}
                            source={{uri:passage.coverImg}}
                        />
                    }
                    <ScrollView>
                        { passage.passageID&&
                            <View style={{paddingBottom:screenUtils.autoSize(70)}}>
                                <View style={[styles.passageContainer,!passage.isCoverBlur? styles.whiteBackground:{}]}>
                                    <Text style={styles.title}>
                                        {passage.title}
                                    </Text>
                                    <View style={styles.passageInfo}>
                                        <Text style={styles.passageTime}>{
                                            this._getTime(passage.createTime)
                                        }</Text>
                                        <Text style={styles.passageAuthor} numberOfLines={1}>{passage.author.name}</Text>
                                        <Text style={styles.passageRead}>阅读 {passage.readCount}</Text>
                                    </View>
                                    <PassageWebView
                                        onLoadEnd={()=>{this.setState({webviewLoading:false})}}
                                        html={this._buildPassageHtml(passage.sections)}
                                    />
                                </View>
                                <Comments navigation={this.props.navigation}/>
                                { passage.passagesPush.length>0?
                                    <PassagesPush passage={passage}/>:
                                    <View/>
                                }
                            </View>
                        }
                    </ScrollView>
                    <PassageFooter navigation={this.props.navigation}/>
                </View>
            );
    }
}

let actions={
    initPassage:function (passageID,user,authorID,navigation) {
        return myFetch(`http://${ip}:4441/api/article/${authorID}/${passageID}/`,{
                method:'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'user_token':user.token
            },
            timeout:10000
        })
            .then((response)=>response.json())
            .then((responseData)=>{
                //alert(JSON.stringify(responseData));
                if(responseData.code==10001) {
                    let data = responseData.data;
                    navigation.setParams({passage:{
                        author:{
                            authorID:data.article.userUuid,
                            headImg: data.article.avatar,
                            name:data.article.nickname,
                            notFollow:!data.isFollowed
                        }}
                    });
                    return {
                        type: 'INIT_PASSAGE',
                        payload: {
                            loading:false,
                            passageID: passageID,
                            author: {
                                authorID: data.article.userUuid,
                                headImg: data.article.avatar,
                                name: data.article.nickname,
                                notFollow:!data.isFollowed,
                            },
                            isCoverBlur: false,
                            title: data.article.title,
                            readCount: data.article.readnumber,
                            coverImg: data.article.image,
                            createTime: data.article.createTime.time,
                            thumbCount:data.article.likeNum,
                            commentCount:data.article.commentNum,
                            shareCount:data.article.shareNum,
                            ifThumb:!!data.articleIsLiked,
                            comments: data.article.comments.map((item)=>{
                                return {
                                    name:item.nickname,
                                    content:item.content,
                                    time:item.createTime.time,
                                    userId:item.userUuid,
                                    commentId:item.commentUuid,
                                    headImg:item.avatar,
                                    thumbCount:item.likeNum,
                                    everThumb:false
                                };
                            }) ,
                            sections: data.article.content
                        }
                    };
                }
            }).catch((error)=> {
                alert(error);
                console.log(error);
            });
    },
    getPassagesPush:function () {
        return myFetch('https://www.baidu.com',{method:'GET',timeout:10000})
            .then((response)=>response.text())
            .then((responseData)=>{
                return {
                    type:'GET_PASSAGES_PUSH',
                    payload:{
                        passagesPush:[
                            {
                                coverImg:'',
                                passageID:'1123165',
                                title:'人人有书读，人人有功练',
                                readCount:1234567
                            },
                            {
                                coverImg:'',
                                passageID:'1123165',
                                title:'人人有书读，人人有功练啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                                readCount:1234567
                            },
                            {
                                coverImg:'',
                                passageID:'1123165',
                                title:'人人有书读，人人有功练',
                                readCount:1234567
                            },
                            {
                                coverImg:'',
                                passageID:'1123165',
                                title:'人人有书读，人人有功练',
                                readCount:1234567
                            },
                        ]
                    }
                };
            }).catch((error)=>{
                console.log(error);
            })
    },
    setLoading:function (value) {
        return {
            type:'PASSAGE_SET_LOADING',
            payload:{
                loading:value
            }
        }
    }
};

function mapStateToProps(state) {
    return {
        passage:state.passage,
        user:state.user
    }
}
function mapDispatchToProps(dispatch) {
    return{
        initPassage:(passageID,user,authorID,navigation)=>{dispatch(actions.initPassage(passageID,user,authorID,navigation))},
        getPassagesPush:()=>{dispatch(actions.getPassagesPush())},
        setLoading:(value)=>{dispatch(actions.setLoading(value))}
    };
}
export default Passage=connect(mapStateToProps,mapDispatchToProps)(Passage);
