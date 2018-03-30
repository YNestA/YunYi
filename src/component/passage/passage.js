import React,{Component} from 'react'
import {View,ScrollView,WebView,Text,StyleSheet,Image,ImageBackground,findNodeHandle} from 'react-native'
import {connect} from 'react-redux'
import HeaderTitle from './HeaderTitle'
import {Loading,screenUtils,myFetch} from '../../tools/MyTools'
import PassageWebView from './PassageWebView'
import {BlurView} from 'react-native-blur'
import PassageFooter from './PassageFooter'
import Comments from './comments'
import PassagesPush from './PassagesPush'

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    passageContainer:{
        backgroundColor:'#fff',
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
            headerTitle: <HeaderTitle author={params.passage.author}/>
        }
    };
    constructor(props){
        super(props);
        this.state = { viewRef: null };
        this._buildPassageHtml=this._buildPassageHtml.bind(this);
    }
    componentDidMount(){
        let {params}=this.props.navigation.state;
        this.props.initPassage(params.passage.passageID);
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
    imageLoaded(){
        this.setState({ viewRef: findNodeHandle(this.a) });
    }
    render(){
        let passage=this.props.passage;
            return (
                <View style={styles.container}>
                    {(!passage.passageID||(passage.isCoverBlur&&!this.state.viewRef))&&<Loading
                        containerStyle={{
                            backgroundColor:'#fff',
                            position:'absolute',
                            top:0,bottom:0,left:0,right:0,
                            zIndex:1000
                        }}
                    />}
                    { passage.isCoverBlur&&
                        <Image
                            ref={(a) => {
                                this.a = a;
                            }}
                            onLoadEnd={this.imageLoaded.bind(this)}
                            style={{position: 'absolute', width: '100%', height: '100%'}}
                            source={require('../../img/user4.jpg')}
                        />
                    }
                    {(this.state.viewRef)&&
                        <BlurView
                            style={{position:'absolute',left:0,right:0,top:0,bottom:0}}
                            viewRef={this.state.viewRef}
                            blurType="light"
                            blurAmount={15}
                        />
                    }
                    <ScrollView>
                        { passage.passageID&&
                            <View>
                                <View style={styles.passageContainer}>
                                    <Text style={styles.title}>
                                        {passage.title}
                                    </Text>
                                    <View style={styles.passageInfo}>
                                        <Text style={styles.passageTime}>{passage.createTime.split(' ')[0]}</Text>
                                        <Text style={styles.passageAuthor} numberOfLines={1}>{passage.author.name}</Text>
                                        <Text style={styles.passageRead}>阅读 {passage.readCount}</Text>
                                    </View>
                                    <PassageWebView
                                        html={this._buildPassageHtml(passage.sections)}
                                    />
                                </View>
                                <Comments/>
                                { passage.passagesPush.length>0?
                                    <PassagesPush passages={passage.passagesPush}/>:
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
    initPassage:function (passageID) {
        return myFetch('https://www.baidu.com',{method:'GET',timeout:10000})
            .then((response)=>response.text())
            .then((responseData)=>{
                return {
                    type:'INIT_PASSAGE',
                    payload:{
                        passageID:passageID,
                        author:{
                            authorID:'A20180322',
                            headImg:'../../img/asuka.jpg',
                            name:'周瑜'
                        },
                        isCoverBlur:false,
                        title:'人人有书读，人人有功练',
                        readCount:1500,
                        coverImg:'../../img/hikari.jpg',
                        createTime:'2019-9-30 12:30',
                        commentCount:89,
                        comments:[
                            {
                                name:'刘涛',
                                content:'我顶啊，楼主说的好啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                                time:'2018-5-30',
                                headImg:'',
                                thumbCount:43
                            },
                            {
                                name:'刘涛',
                                content:'我顶啊，楼主说的好啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                                time:'2018-5-30',
                                headImg:'',
                                thumbCount:133,
                                everThumb:true
                            },
                            {
                                name:'刘涛',
                                content:'我顶啊，楼主说的好啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                                time:'2018-5-30',
                                headImg:'',
                                thumbCount:43
                            },
                            {
                                name:'刘涛',
                                content:'我顶啊，楼主说的好啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                                time:'2018-5-30',
                                headImg:'',
                                thumbCount:43
                            },
                            {
                                name:'刘涛',
                                content:'我顶啊，楼主说的好啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                                time:'2018-5-30',
                                headImg:'',
                                thumbCount:43
                            },
                        ],
                        sections:[
                            {
                                content: `<div style="text-align: left;">改变，其方向不管是善也好，恶也罢，都是无情的。  无论你是否希望这样，人总是这样改变着，而且一旦改变，就再也变不回原来的样子了  那种变化会将幸福捉住，还是会把不幸吸引，就看人们各自的选择了。  更进一步就像“祸兮福之所倚，福兮祸之所伏※”说的那样，什么是幸福，什么是不幸，单靠那一瞬间做出的判断是无法说明的。今天认为不幸的事情，或许明天就会因为那不幸而遇到什么好事。  【※原文：禍福は糾える縄の如し。<font size="5"><br></font></div>`,
                                img: null,
                                text: " 我是中国古拳法掌门人 改变，其方向不管是善也好，恶也罢，都是无情的。 无论你是否希望这样，人总是这样改变着，而且一旦改变，就再也变不回原来的样子了 那种变化会将幸福捉住，还是会把不幸吸引，就看人们各自的选择了。 更进一步就像“祸兮福之所倚，福兮祸之所伏※”说的那样，什么是幸福，什么是不幸，单靠那一瞬间做出的判断是无法说明的。今天认为不幸的事情，或许明天就会因为那不幸而遇到什么好事。 【※原文：禍福は糾える縄の如し。（福祸就像结在一起的绳子）】 就算输给了沉痛的创伤，以那创伤为垫脚石会造就出一个新的自己也说不定。相反，如果那个伤口过于沉痛的话，也可能会让人再也振作不起来。 但是那个分界线到底在哪谁也说不清楚。 我明白的事情只有一件。 ",
                                type: "text"
                            },
                            {
                                content: `<div style="text-align: center;"><span style="font-size: 1em;">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊我要说点什么</span></div>`,
                                img:{
                                    url:'https://c2.hoopchina.com.cn/uploads/star/event/images/180326/a2b2780779b0673e50ca24c8bff71cc6dd57eed8.png'
                                },
                                text: " 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊我要说点什么 ",
                                type: "img"
                            },
                            {
                                content:`<div style="text-align: center;"><span style="font-size: 1em;">中国古拳法</span></div><div style="text-align: center;"><span style="font-size: 1em;">中国古拳法</span></div><div style="text-align: center;"><span style="font-size: 1em;">中国古拳法</span></div>`,
                                img: null,
                                text: " 中国古拳法 中国古拳法 中国古拳法 ",
                                type: "text",
                            }
                        ],
                    }
                };
            }).catch((error)=> {
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
    }
};

function mapStateToProps(state) {
    return {
        passage:state.passage
    }
}
function mapDispatchToProps(dispatch) {
    return{
        initPassage:(passageID)=>{dispatch(actions.initPassage(passageID))},
        getPassagesPush:()=>{dispatch(actions.getPassagesPush())}
    };
}
export default Passage=connect(mapStateToProps,mapDispatchToProps)(Passage);