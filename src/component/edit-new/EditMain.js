import React,{Component} from 'react'
import {
    ScrollView, ImageBackground, View, Text, FlatList, Image, TouchableNativeFeedback, TouchableOpacity,
    TouchableWithoutFeedback, StyleSheet, Button, BackHandler
} from 'react-native'
import {connect} from 'react-redux'
import {HeaderButton} from "../../navigation/navi";
import {screenUtils} from "../../tools/ScreenUtils";
import AddSectionBtn from './AddSectionBtn'
import Section from './EditSection'

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
    }
});




class Sections extends Component{
    constructor(props) {
        super(props);
        this.state={
            addBtnShow:[]
        }
        this._openComplexBtnCb=this._openComplexBtnCb.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this._setAddBtnShow(nextProps.sections);
    }
    _setAddBtnShow(sections){
        let addBtnShow=sections.map(()=>false);
        addBtnShow.push(false);
        this.setState({
            addBtnShow:addBtnShow
        });
    }
    _openComplexBtnCb(index){
        this.setState({
            addBtnShow:this.state.addBtnShow.map((item,index2)=>{
                return (index===index2);
            })
        });
    }
    render(){
        let {sections}=this.props;
        return(
            <View>
                <FlatList
                    extraData={this.state}
                    data={sections}
                    renderItem={({item,index})=>{
                        return (
                            <View>
                                <AddSectionBtn index={index} showComplex={this.state.addBtnShow} openComplexCb={()=>{this._openComplexBtnCb(index)}}/>
                                <Section navigation={this.props.navigation} index={index} section={item}/>
                            </View>
                        );
                    }}
                />
                <AddSectionBtn
                    index={this.state.addBtnShow.length-1}
                    showComplex={this.state.addBtnShow}
                    openComplexCb={()=>{this._openComplexBtnCb(this.state.addBtnShow.length-1)}}

                />
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
        this._onBackHandler=this._onBackHandler.bind(this);
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
        //安卓返回键监听
        BackHandler.addEventListener('hardwareBackPress', this._onBackHandler);
    }
    componentWillUnmount(){
        BackHandler.addEventListener('hardwareBackPress',this._onBackHandler);
    }
    _onBackHandler(){
        this.props.navigation.navigate('Main');
        return true;
    }
    render(){
        let {passage,navigation}=this.props;
        return(
            <ScrollView>
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
                <Sections navigation={navigation} sections={passage.sections}/>
            </ScrollView>
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
                    return {img:item,content:'',text:'',type:'img'};
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
        startImg:(imgs)=>{dispatch(actions.startImg(imgs))},
        addTextSection:(index)=>{dispatch(actions.addTextSection(index))}
    }
}

export default Edit=connect(mapStateToProps,mapDispatchToProps)(Edit);
