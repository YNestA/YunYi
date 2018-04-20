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
        this.state = { viewRef: null };
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
        this.props.initPassage(params.passage.passageID,this.props.navigation);
        this.props.getPassagesPush();
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
                    {(passage.loading)&&<Loading
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
                            <View>
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
                                        html={this._buildPassageHtml(passage.sections)}
                                    />
                                </View>
                                <Comments/>
                                { passage.passagesPush.length>0?
                                    <PassagesPush passage={passage}/>:
                                    <View/>
                                }
                            </View>
                        }
                    </ScrollView>
                    <PassageFooter/>
                </View>
            );
    }
}

let actions={
    initPassage:function (passageID,navigation) {
        return myFetch(`http://${ip}:4441/api/article/${passageID}`,{
                method:'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            timeout:10000
        })
            .then((response)=>response.json())
            .then((responseData)=>{
                //alert(JSON.stringify(responseData));
                if(responseData.code==10001) {
                    let data = responseData.data[0];
                    navigation.setParams({passage:{
                        author:{
                            authorID:'',
                            headImg: data.avatar,
                            name:data.nickname
                        }}
                    });
                    return {
                        type: 'INIT_PASSAGE',
                        payload: {
                            loading:false,
                            passageID: passageID,
                            author: {
                                authorID: data.userUuid,
                                headImg: data.avatar,
                                name: data.nickname,
                                isFollow:false,
                            },
                            isCoverBlur: false,
                            title: data.title,
                            readCount: data.readnumber,
                            coverImg: data.image,
                            createTime: data.createTime,
                            thumbCount:data.likeNum,
                            commentCount:data.commentNum,
                            shareCount:data.shareNum,
                            comments: [
                                /*
                                {
                                    name:'刘涛',
                                    content:'我顶啊，楼主说的好啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                                    time:'2018-5-30',
                                    headImg:'',
                                    thumbCount:43
                                },
                                */
                            ],
                            sections: JSON.parse(data.content)
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
        passage:state.passage
    }
}
function mapDispatchToProps(dispatch) {
    return{
        initPassage:(passageID,navigation)=>{dispatch(actions.initPassage(passageID,navigation))},
        getPassagesPush:()=>{dispatch(actions.getPassagesPush())},
        setLoading:(value)=>{dispatch(actions.setLoading(value))}
    };
}
export default Passage=connect(mapStateToProps,mapDispatchToProps)(Passage);
