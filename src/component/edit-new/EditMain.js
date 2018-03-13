import React,{Component} from 'react'
import {ImageBackground,View,Text,FlatList,Image,TouchableNativeFeedback,TouchableWithoutFeedback,StyleSheet,Button} from 'react-native'
import {connect} from 'react-redux'
import {HeaderButton} from "../../navigation/navi";
import {screenUtils} from "../../tools/ScreenUtils";


const styles=StyleSheet.create({
    coverBackground: {
        width:screenUtils.screenWidth,
        height:screenUtils.autoSize(180)
    },
    coverView:{
        flex:1,
        justifyContent:'center'
    },
    editCoverBtn:{
        position:'absolute',
        right:4,
        bottom:4,
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:5,
        padding:4
    },
    editCoverText:{
        color:'#fff',
        fontSize:screenUtils.autoFontSize(13)
    },
    addTitleText:{
        color:'#fff',
        textAlign:'center',
        fontSize:screenUtils.autoFontSize(24)
    },
    sectionDelete:{
        position:'absolute',
        left:screenUtils.autoSize(3),
        top:screenUtils.autoSize(3),
        width:screenUtils.autoSize(15),
        height:screenUtils.autoSize(15),
    },
    sectionDeleteImg:{
        width:screenUtils.autoSize(15),
        height:screenUtils.autoSize(15)
    },
    sectionContainer:{
        height:screenUtils.autoSize(100),
        backgroundColor:'#fff',
        marginTop:screenUtils.autoSize(10),
        marginLeft:screenUtils.autoSize(15),
        marginRight:screenUtils.autoSize(15),
        borderRadius:screenUtils.autoSize(10)
    },
    sectionImg:{
        position:'absolute',
        top:screenUtils.autoSize(15),
        left:screenUtils.autoSize(20),
        width:screenUtils.autoSize(70),
        height:screenUtils.autoSize(70)
    },
    contentContainer:{
        height:screenUtils.autoSize(70),
        marginLeft:screenUtils.autoSize(100),
        marginRight:screenUtils.autoSize(15),
        marginTop:screenUtils.autoSize(15),
        marginBottom:screenUtils.autoSize(15),
        paddingLeft:screenUtils.autoFontSize(5),
        paddingRight:screenUtils.autoFontSize(5)
    },
    contentText:{
        color:'#666',
        fontSize:screenUtils.autoFontSize(17)
    }
});

class AddSectionBtn extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View/>
        );
    }
}

class Section extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.sectionContainer}>
                <Image style={styles.sectionImg} source={require('../../img/hikari.jpg')}/>
                <View style={styles.sectionDelete}>
                    <TouchableWithoutFeedback onPress={()=>{console.log(3)}}>
                        <Image style={styles.sectionDeleteImg} source={require('../../img/delete-section.png')}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.contentContainer}>
                    <TouchableWithoutFeedback>
                        <View><Text numberOfLines={3} style={[styles.contentText,true?{color:'#444'}:{}]}>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</Text></View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

class Edit extends Component{
    static navigationOptions=({navigation,screenProps})=>{
        let {params}=navigation.state;
        return{
            headerTitle:'编辑',
            headerLeft:<HeaderButton text='返回' onPress={params?params.leftPress:()=>{}}/>,
            headerRight:<HeaderButton text='完成' onPress={params?params.rightPress:()=>{}}/>
        }
    }

    constructor(props){
        super(props);
    }
    _complete(){
        console.log(this.props);
    }
    _returnPre(){
        //this.props.navigation.goBack();
        this.props.navigation.navigate('Main');
    }
    componentDidMount(){
        let {params}=this.props.navigation.state;
        //新编辑文章处理
        if(params&&params.selected){
            this.props.navigation.setParams({selected:false});
            this.props.startImg(params.imgs);
        }
        //header事件处理
        this.props.navigation.setParams({
            leftPress:this._returnPre.bind(this),
            rightPress:this._complete.bind(this)
        });
    }
    render(){
        console.log(this.props);
        let {passage,navigation}=this.props;
        return(
            <View>
                <ImageBackground
                    style={styles.coverBackground}
                    source={require('../../img/hikari.jpg')}
                >
                    <View style={styles.coverView}>
                        <View style={{}}>
                            <TouchableNativeFeedback  onPress={()=>{navigation.navigate('EditTitle');}}>
                                <Text style={styles.addTitleText}>{passage.title?passage.title:'点击编辑标题'}</Text>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={styles.editCoverBtn}>
                            <TouchableNativeFeedback onPress={()=>{console.log(2)}}>
                                <Text style={styles.editCoverText}>编辑封面</Text>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </ImageBackground>
                <FlatList
                    data={this.props.passage.sections}
                    renderItem={({item})=>{
                        return <Image style={{width:screenUtils.screenWidth,height:150}} source={{uri:item.img.path}}/>
                    }}
                />
                <Section/>
            </View>
        );
    }
}

let actions={
    startImg:function (imgs) {
        return {
            type:'START_IMG',
            payload:{
                coverImg:imgs[0],
                sections:imgs.map((item)=>{
                    return {img:item,content:''};
                })
            }
        };
    }
};

function mapStateToProps(state) {
    return {
        passage:state.edit
    }
}
function mapDispatchToProps(dispatch) {
    return{
        startImg:(imgs)=>{dispatch(actions.startImg(imgs))}
    }
}

export default Edit=connect(mapStateToProps,mapDispatchToProps)(Edit);
