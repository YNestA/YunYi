import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, StyleSheet, Image,TouchableOpacity, BackHandler
} from 'react-native'
import {connect} from 'react-redux'
import FansList from "./FansList";
import myFetch from "../../tools/MyFetch";
import {ip} from "../../settings";
import Loading from "../../tools/loading";

class Fans extends Component{
    static navigationOptions={
        headerTitle:'粉丝',
        headerRight:<View/>
    };
    constructor(props){
        super(props);
        this._backHandler=this._backHandler.bind(this);
        this.state={
            firstLoading:true
        };
    }
    componentDidMount(){
        let {navigation,initFans}=this.props,
            params=navigation.state.params;
        params&&params.userID&&initFans(params.userID,()=>{
            this.setState({
                firstLoading:false
            });
        });
    }
    _backHandler(){
        this.props.navigation.goBack(null);
        return true;
    }
    componentWillMount(){
        let {navigation,setFansId}=this.props,
            params=navigation.state.params;
        params&&params.userID&&setFansId(params.userID);
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    render() {
        let {fans,navigation}=this.props,
            params=navigation.state.params;
        if(this.state.firstLoading){
            return <Loading containerStyle={{flex:1}}/>;
        }else {
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}>
                    <StatusBar translucent={true} backgroundColor={'#fff'} barStyle={'dark-content'}/>
                    <FansList fans={fans[params.userID]} navigation={navigation}/>
                </View>
            );
        }
    }
}

let actions={
    setFansId:function (userID) {
        let payload={};
        payload[userID]={
            people:[]
        };
        return {
            type:'SET_FANS_ID',
            payload:payload
        };
    },
    initFans:function (userID,cb) {
        return myFetch(`http://${ip}:4441/mine/get_followers/${userID}`)
            .then(response=>response.json())
            .then(responseData=>{
                if (responseData.code == 10001) {
                    cb();
                    let payload={};
                    payload[userID]={
                        people:responseData.data.map((item) => {
                            return {
                                name: item.nickname,
                                headImg: item.avatar,
                                motto: item.signature,
                                userID: item.userUuid
                            }
                        })
                    };
                    return {
                        type: 'FANS_INIT',
                        payload: payload
                    }
                }
            });
    }
};

function mapStateToProps(state) {
    return {
        user:state.user,
        fans:state.fans
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initFans:(userID,cb)=>{dispatch(actions.initFans(userID,cb))},
        setFansId:(userID)=>{dispatch(actions.setFansId(userID))},
    };
}

export default Fans=connect(mapStateToProps,mapDispatchToProps)(Fans);