import React,{Component} from 'react'
import {
    View, StatusBar, ScrollView, WebView, Text, StyleSheet, Image,TouchableOpacity, BackHandler
} from 'react-native'
import {connect} from 'react-redux'
import FollowList from './FollowList'
import myFetch from "../../tools/MyFetch";
import {ip} from "../../settings";
import Loading from "../../tools/loading";

class Follow extends Component{
    static navigationOptions={
        headerTitle:'关注',
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
        let {navigation,initFollow}=this.props,
            params=navigation.state.params;
        params&&params.userID&&initFollow(params.userID,()=>{
            this.setState({
                firstLoading:false
            });
        });
    }
    componentWillMount(){
        let {navigation,setFollowId}=this.props,
            params=navigation.state.params;
        params&&params.userID&&setFollowId(params.userID);
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    _backHandler(){
        this.props.navigation.goBack(null);
        return true;
    }
    render(){
        let {follow,navigation}=this.props,
            params=navigation.state.params;
        if(this.state.firstLoading){
            return <Loading containerStyle={{flex:1}}/>;
        }else{
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}>
                    <StatusBar translucent={true} backgroundColor={'#fff'} barStyle={'dark-content'}/>
                    <FollowList follow={follow[params.userID]} navigation={navigation}/>
                </View>
            );
        }

    }
}

let actions={
    setFollowId:function (userID) {
        let payload={};
        payload[userID]={
            people:[]
        };
        return {
            type:'SET_FOLLOW_ID',
            payload:payload
        };
    },
    initFollow:function (userID,cb) {
        return myFetch(`http://${ip}:4441/mine/get_watcheds/${userID}`)
            .then(response=>response.json())
            .then(responseData=>{
                //alert(JSON.stringify(responseData));
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
                        type: 'FOLLOW_INIT',
                        payload: payload
                    }
                }
            });
    }
};

function mapStateToProps(state) {
    return {
        user:state.user,
        follow:state.follow
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setFollowId:(userID)=>{dispatch(actions.setFollowId(userID))},
        initFollow:(userID,cb)=>{dispatch(actions.initFollow(userID,cb))}
    };
}

export default Follow=connect(mapStateToProps,mapDispatchToProps)(Follow);