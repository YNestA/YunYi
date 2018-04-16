import React,{Component} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,BackHandler,Switch,StatusBar} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {screenUtils, myFetch, encodePostParams} from '../../tools/MyTools'
import PassageClassify from '../../redux/PassageClassify'

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    settingsContainer:{
        flex:1,
        paddingBottom:screenUtils.autoSize(60)
    },
    setting:{
        flexDirection:'row',
        marginTop:screenUtils.autoSize(20),
        backgroundColor:'#fff',
        justifyContent:'space-between',
        height:screenUtils.autoSize(60),
        paddingHorizontal:screenUtils.autoSize(15)
    },
    settingText:{
        color:'#444',
        fontSize:screenUtils.autoFontSize(18),
        lineHeight:screenUtils.autoSize(60)
    },
    settingEnter:{
        color:'#777',
        fontSize:screenUtils.autoFontSize(16),
        lineHeight:screenUtils.autoSize(60)
    },
    tip:{
        fontSize:screenUtils.autoFontSize(15),
        color:'#777',
        marginTop:screenUtils.autoSize(10),
        marginLeft:screenUtils.autoSize(15)
    },
    completeContainer:{
        position:'absolute',
        bottom:-1,
        left:0,right:0,
        height:screenUtils.autoSize(60)
    },
    completeText:{
        backgroundColor:'#3f81c1',
        color:'#fff',
        textAlign:'center',
        fontSize:screenUtils.autoFontSize(22),
        lineHeight:screenUtils.autoSize(60),
    }
});
class EditPassageSetting extends Component{
    static navigationOptions={
        headerTitle:'文章设置',
        headerRight:<View/>
    };
    constructor(props){
        super(props);
        this.state={
            complete:false
        };
        this._changeSetting=this._changeSetting.bind(this);
        this._complete=this._complete.bind(this);
        this._backHandler=this._backHandler.bind(this);
    }
    _changeSetting(setting){
        this.props.changeSetting(this.props.passage,Object.assign(this.props.passage.passageSetting,setting));
    }
    _complete(){
        let {passage,navigation,user}=this.props;
        this.setState({complete:true});
        this.props.complete(passage,navigation,user,()=>{this.setState({complete:false})});
    }
    _backHandler(){
        this.props.navigation.goBack(null);
        return true;
    }
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    render(){
        let {passage}=this.props;
        console.log(passage);
        return(
            <View style={styles.container}>
                <StatusBar translucent={false} backgroundColor={'#fff'} barStyle={'dark-content'}/>
                <View style={styles.settingContainer}>
                    <View style={styles.setting}>
                        <Text style={styles.settingText}>是否公开</Text>
                        <Switch
                            value={!!passage.passageSetting.public}
                            onValueChange={(value)=>{this._changeSetting({public:!!value})}}
                        />
                    </View>
                    <Text style={styles.tip}>可自行控制文章展示范围</Text>
                    <TouchableOpacity activeOpacity={0.5}>
                        <View style={styles.setting}><Text style={styles.settingText}>文章分类</Text><Text style={styles.settingEnter}>{PassageClassify[passage.passageSetting.classify]+'  >'}</Text></View>
                    </TouchableOpacity>
                    <Text style={styles.tip}>正确设置分类的文章将展示在首页</Text>
                    <View style={styles.setting}>
                        <Text style={styles.settingText}>允许评论</Text>
                        <Switch
                            value={!!passage.passageSetting.allowcomments}
                            onValueChange={(value)=>{this._changeSetting({allowcomments:!!value})}}
                        />
                    </View>
                    <Text style={styles.tip}>开启后读者可以在美篇或微信对文章进行评论</Text>
                </View>
                <View style={styles.completeContainer}>
                    <TouchableOpacity onPress={this._complete} activeOpacity={0.8} disabled={this.state.complete}>
                        <View><Text style={styles.completeText}>完成</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

let actions={
    changeSetting:function (passgae,setting) {
        return {
            type: 'CHANGE_SETTING',
            payload: Object.assign({}, passgae, {passageSetting: setting})
        }
    },
    complete:function (passage,navigation,user,cb) {
        //alert(JSON.stringify(passage));
        return myFetch('http://10.12.137.198:4441/api/article/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'user_token':user.token
            },
            body: encodePostParams({
                passage:JSON.stringify(passage)
            })
        }).then(response => response.json())
            .then(responseData => {
            //    alert(JSON.stringify(responseData));
                cb();
                if(responseData.code==10001) {
                    navigation.navigate('Main', {}, NavigationActions.navigate({routeName: 'Mine'}));
                    return {
                        type: 'COMPLETE',
                        payload: {
                            passageID: responseData.data.passageID,
                        }
                    }
                }else{
                    alert('网络繁忙');
                }
            })
            .catch(err=>{
                alert(err);
                cb();
                console.log(err);
            });
    }

};

function mapStateToProps(state) {
    return {
        passage:state.edit,
        user:state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeSetting:(passage,setting)=>{dispatch(actions.changeSetting(passage,setting))},
        complete:(passage,navigation,user,cb)=>{dispatch(actions.complete(passage,navigation,user,cb))}
    }
}

export default EditPassageSetting=connect(mapStateToProps,mapDispatchToProps)(EditPassageSetting);
