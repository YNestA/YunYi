import React,{Component} from 'react'
import {connect} from 'react-redux'
import {
    StyleSheet, View, Text, StatusBar, Image, ImageBackground, TouchableOpacity, TouchableNativeFeedback,
    TouchableWithoutFeedback, BackHandler, ScrollView
} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";
import Cover from './cover'
import Header from './header'
import OtherUserPassages from './OtherUserPassages'
import myFetch, {encodePostParams} from "../../tools/MyFetch";
import {initOtherUserData} from '../../redux/OtherUserReducer'
import {ip} from "../../settings";

const styles=StyleSheet.create({
    userImg:{
        marginTop:screenUtils.autoSize(4),
        width:screenUtils.autoSize(80),
        height:screenUtils.autoSize(80),
        borderRadius:screenUtils.autoSize(40),
    },
    motto:{
        textAlign:'center',
        marginHorizontal:screenUtils.autoSize(20),
        fontSize:screenUtils.autoFontSize(14),
        lineHeight:screenUtils.autoSize(20),
        maxHeight:screenUtils.autoSize(40),
        color:'#fff'
    },
    username:{
        textAlign:'center',
        marginHorizontal:screenUtils.autoSize(20),
        marginTop:screenUtils.autoSize(5),
        fontSize:screenUtils.autoFontSize(18),
        lineHeight:screenUtils.autoSize(30),
        height:screenUtils.autoSize(30),
        color:'#fff'
    },
    followFans:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    followFansItem:{
        width:screenUtils.autoSize(120),
        height:screenUtils.autoSize(80),
        justifyContent:'center'
    },
    followFansCount:{
        textAlign:'center',
        color:'#fff',
        fontSize:screenUtils.autoFontSize(20)
    },
    followFansText:{
        textAlign:'center',
        color:'#fff',
        fontSize:screenUtils.autoFontSize(14)
    },
    verLine:{
        height:screenUtils.autoSize(30),
        width:1,
        backgroundColor:'#eee'
    },
    followFooter:{
        position:'absolute',
        bottom:0,
        borderTopWidth:1,
        borderColor:'#eee',
        backgroundColor:'#fff',
        width:'100%',
        height:screenUtils.autoSize(60),
    },
    footerItem:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    followText:{
        textAlign:'center',
        color:'#707070',
        marginLeft:screenUtils.autoSize(10),
        lineHeight:screenUtils.autoSize(60),
        fontSize:screenUtils.autoSize(20)
    },
    followImg:{
        width:screenUtils.autoSize(40),
        height:screenUtils.autoSize(40)
    }
});
class OtherUser extends Component{
    static navigationOptions=({navigation})=>{
       return {header:null};
    };
    constructor(props){
        super(props);
        this.state={
            headerOpacity:0
        };
        this._backHandler=this._backHandler.bind(this);
        this._renderCover=this._renderCover.bind(this);
        this._scroll=this._scroll.bind(this);
    }
    componentDidMount(){

    }
    _backHandler(){
        this.props.navigation.goBack(null);
        return true;
    }
    componentWillMount(){
        let {params}=this.props.navigation.state;
        this.otherUserId=params&&params.otherUserId;
        this.otherUserId&&this.props.registerOtherUser(this.otherUserId);
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    _renderCover(){
        let {otherUsers,navigation}=this.props,
            otherUser=otherUsers[this.otherUserId];
        return(
            <Cover coverImg={otherUser.userInfo.headImg}>
                <Image style={styles.userImg} source={{uri:otherUser.userInfo.headImg}}/>
                <Text numberOfLines={1} style={styles.username}>{otherUser.userInfo.username}</Text>
                <Text numberOfLines={2} style={styles.motto}>{otherUser.userInfo.motto}</Text>
                <View style={styles.followFans}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>{
                        navigation.navigate('Follow',{userID:otherUser.userID});
                    }}>
                        <View style={styles.followFansItem}>
                            <Text style={styles.followFansCount}>{otherUser.userInfo.concernCount}</Text>
                            <Text style={styles.followFansText}>关注</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.verLine}/>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>{
                        navigation.navigate('Fans',{userID:otherUser.userID});
                    }}>
                        <View style={styles.followFansItem}>
                            <Text style={styles.followFansCount}>{otherUser.userInfo.fansCount}</Text>
                            <Text style={styles.followFansText}>粉丝</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Cover>
        );
    }
    _scroll(e){
        let y=e.nativeEvent.contentOffset.y,
            opacity=y/(StatusBar.currentHeight+screenUtils.autoSize(70));
        if(this.state.headerOpacity==1&&opacity>1){
            return;
        }
        this.setState({
            headerOpacity:opacity>1?1:opacity
        });
    }
    render(){
        let {otherUsers,navigation,user}=this.props,
            otherUser=otherUsers[this.otherUserId];
        if(otherUser) {
            return (
                <View style={{flex: 1}}>
                    <StatusBar translucent={true} backgroundColor={'transparent'}
                               barStyle={this.state.headerOpacity < 0.6 ? 'light-content' : 'dark-content'}/>
                    <Header user={otherUser} navigation={navigation} opacity={this.state.headerOpacity}/>
                    <OtherUserPassages onScroll={this._scroll} otherUserId={this.otherUserId} navigation={navigation}
                                       cover={this._renderCover()}/>
                    <View style={styles.followFooter}>
                        <TouchableOpacity onPress={()=>{
                            if(user.isLogin) {
                                this.props.toggleFollow(otherUser, user);
                            }else{
                                navigation.navigate('LoginCenter');
                            }
                        }}>
                            <View style={styles.footerItem}>
                                {otherUser.relation.isFollow?<Image style={styles.followImg} source={require('../../img/common/offline.png')}/>
                                    :<Image style={styles.followImg} source={require('../../img/common/addpeople.png')}/>}
                                <Text style={[styles.followText,otherUser.relation.isFollow?{color:'#d81e06'}:{}]}>{otherUser.relation.isFollow?'取消关注':'关注'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }else{
            return <View/>;
        }
    }
}

let actions={
    registerOtherUser:function (otherUserId) {
        let payload={};
        payload[otherUserId]=Object.assign({},initOtherUserData,{userID:otherUserId});
        return {
            type:'REGISTER_OTHER_USER',
            payload:payload
        }
    },
    toggleFollow:function (otherUser,user) {
        let url=otherUser.relation.isFollow?`http://${ip}:4441/api/user/relation/unfollow/`:`http://${ip}:4441/api/user/relation/follow/`;
        myFetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'user_token':user.token,
            },
            body:encodePostParams({
                toUserUuid:otherUser.userID,
                type:1
            })
        });
        let payload={};
        payload[otherUser.userID]=Object.assign({},otherUser,{
            relation:{isFollow:!otherUser.relation.isFollow}
        });
        return {
            type:'OTHER_USER_TOGGLE_FOLLOW',
            payload:payload
        };
    }
};

function mapStateToProps(state) {
    return {
        user:state.user,
        otherUsers:state.OtherUser,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerOtherUser:(otherUserId)=>{dispatch(actions.registerOtherUser(otherUserId))},
        toggleFollow:(otherUser,user)=>{dispatch(actions.toggleFollow(otherUser,user))}
    }
}

export default OtherUser=connect(mapStateToProps,mapDispatchToProps)(OtherUser);