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
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    _renderCover(){
        let {otherUser,navigation}=this.props;
        return(
            <Cover coverImg={otherUser.userInfo.headImg}>
                <Image style={styles.userImg} source={{uri:otherUser.userInfo.headImg}}/>
                <Text numberOfLines={1} style={styles.username}>{otherUser.userInfo.username}</Text>
                <Text numberOfLines={2} style={styles.motto}>{otherUser.userInfo.motto}</Text>
                <View style={styles.followFans}>
                    <TouchableOpacity activeOpacity={0.6}>
                        <View style={styles.followFansItem}>
                            <Text style={styles.followFansCount}>{otherUser.userInfo.concernCount}</Text>
                            <Text style={styles.followFansText}>关注</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.verLine}/>
                    <TouchableOpacity activeOpacity={0.6}>
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
        let {otherUser,navigation}=this.props;
        return (
            <View style={{flex:1}}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={this.state.headerOpacity<0.6?'light-content':'dark-content'}/>
                <Header user={otherUser} navigation={navigation} opacity={this.state.headerOpacity}/>
                <OtherUserPassages onScroll={this._scroll} navigation={navigation} cover={this._renderCover()}/>
                <View style={styles.followFooter}>
                    <TouchableOpacity>
                        <View style={styles.footerItem}>
                            <Image style={styles.followImg} source={require('../../img/common/addpeople.png')}/>
                            <Text style={styles.followText}>关注</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

let actions={

};

function mapStateToProps(state) {
    return {
        user:state.user,
        otherUser:state.OtherUser
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default OtherUser=connect(mapStateToProps,mapDispatchToProps)(OtherUser);