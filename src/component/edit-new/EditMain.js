import React,{Component} from 'react'
import {
    ScrollView, ImageBackground, View,StatusBar, Text, FlatList, Image, TouchableNativeFeedback, TouchableOpacity,
    TouchableWithoutFeedback, StyleSheet, Button, BackHandler
} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {HeaderButton} from "../../navigation/navi";
import {screenUtils} from "../../tools/ScreenUtils";
import AddSectionBtn from './AddSectionBtn'
import Section from './EditSection'
import {getRoutekey,getFormData,myFetch} from '../../tools/MyTools'
import UploadTip from './UploadTip'
import Toast from 'react-native-root-toast'
import {ip} from "../../settings";

const styles=StyleSheet.create({
    coverBackground: {
        width:screenUtils.screenWidth,
        height:screenUtils.autoSize(200)
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
        this._backHandler=this._backHandler.bind(this);
    }
    _upload() {
        let {passage, user, navigation} = this.props;
        if(!this.uploading) {
            if (passage.title) {
                this.uploading=true;
                this.refs.uploadTip.show();
                this.props.upload(passage, user, () => {
                    this.refs.uploadTip.dismiss();
                    this.uploading = false;
                }, navigation);
            } else {
                this.uploading=true;
                Toast.show('标题不能为空', {
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    onHidden:()=>{
                        this.uploading=false;
                    }
                });
            }
        }
    }
    _returnPre(){
        let routes=this.props.routes;
        this.props.navigation.goBack(null);
        //this.props.navigation.goBack(getRoutekey(routes,'Main'));
        //let action=NavigationActions.navigate({routeName:'Mine'});
        //this.props.navigation.navigate('Main',{},action);
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
            rightPress:this._upload.bind(this)
        });
    }
    _backHandler(){
        this.props.navigation.goBack(null);
        return true;
    }
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        this.props.cleanEdit();
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    render(){
        let {passage,navigation}=this.props;
        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <StatusBar translucent={true} backgroundColor={'#fff'} barStyle={'dark-content'}/>
                    <ImageBackground
                        style={styles.coverBackground}
                        source={{uri:passage.coverImg.path}}
                    >
                        <View style={styles.coverView}>
                            <View style={{}}>
                                <TouchableNativeFeedback  onPress={()=>{navigation.navigate('EditTitle');}}>
                                    <Text style={styles.addTitleText}>{passage.title?passage.title:'点击编辑标题'}</Text>
                                </TouchableNativeFeedback>
                            </View>
                            {/*
                                <View style={styles.editCoverBtn}>
                                    <TouchableNativeFeedback onPress={() => {
                                        console.log(2)
                                    }}>
                                        <Text style={styles.editCoverText}>编辑封面</Text>
                                    </TouchableNativeFeedback>
                                </View>
                            */}
                        </View>
                    </ImageBackground>
                    <Sections navigation={navigation} sections={passage.sections}/>

                </ScrollView>
                <UploadTip ref={'uploadTip'}/>
            </View>
        );
    }
}

let actions={
    cleanEdit:function () {
        return {
            type:'CLEAN_EDIT',
            payload:{
            }
        };
    },
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
    },
    upload:function (passage,user,cb,navigation) {
        let coverImg=passage.coverImg;
        let formData=getFormData({
            //passages:JSON.stringify(passage),
            coverImg: {
                uri: coverImg.path,
                type: coverImg.mime,
                name: coverImg.path.slice(coverImg.path.lastIndexOf('\/')+1, coverImg.path.length)
            }
        });
        passage.sections.forEach((section,index)=>{
            if(section.type=='img'){
                let img=section.img;
                formData.append('imgs',{
                    uri:img.path,
                    type: img.mime,
                    name: img.path.slice(img.path.lastIndexOf('\/'), img.path.length)
                });
            }
        });
        return myFetch(`http://${ip}:4441/api/img/upload`,{
            timeout:120000,
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
                'user_token':user.token
            },
            body:formData
        }).then(response=>response.json())
            .then(responseData=>{
                //alert(JSON.stringify(responseData));
                cb();
                if(responseData.code==10001) {
                    navigation.navigate('EditPassageSetting');
                    return {
                        type: 'UPLOAD_IMGS',
                        payload: {
                            coverImg:Object.assign({},passage.coverImg, {
                                url: responseData.data.coverImg
                            }),
                            sections: passage.sections.map((item) => {
                                if (item.type == 'img') {
                                    item.img.url = responseData.data.imgs.shift();
                                }
                                return item;
                            })
                        }
                    };
                }else{
                    Toast.show('上传失败',{
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                }
            })
            .catch(err=>{
                cb();
                Toast.show('上传失败',{
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                console.log(err);
            })

    }
};

function mapStateToProps(state) {
    return {
        passage:state.edit,
        routes:state.nav.routes,
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return{
        startImg:(imgs)=>{dispatch(actions.startImg(imgs))},
//        addTextSection:(index)=>{dispatch(actions.addTextSection(index))},
        upload:(passage,user,cb,navigation)=>{dispatch(actions.upload(passage,user,cb,navigation))},
        cleanEdit:()=>{dispatch(actions.cleanEdit())}
    }
}

export default Edit=connect(mapStateToProps,mapDispatchToProps)(Edit);
