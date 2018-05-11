import React, {Component} from 'react'
import {StatusBar,View,Text,ScrollView,TouchableNativeFeedback,BackHandler,StyleSheet,Image,TouchableWithoutFeedback} from 'react-native'
import ScrollableTabView,{ScrollableTabBar,DefaultTabBar} from 'react-native-scrollable-tab-view'
import {connect} from 'react-redux'
import {screenUtils} from '../../tools/ScreenUtils'
import PassageList from './PassageList'
import HomeSwiper from './HomeSwiper'
import {TabIcon} from '../../navigation/navi'
import {initMWS} from "../../ws/ws";

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    logo:{
        width:screenUtils.autoSize(80),
        height:screenUtils.autoSize(40),
        marginVertical:screenUtils.autoSize(10),
        marginLeft:screenUtils.autoSize(10),
        marginRight:screenUtils.autoSize(10)
    },
    search:{
        flexDirection:'row',
        backgroundColor:'#39f',
        paddingTop:StatusBar.currentHeight
    },
    searchBox:{
        backgroundColor:'#fff',
        height:screenUtils.autoSize(35),
        marginRight:screenUtils.autoSize(8),
        borderRadius:screenUtils.autoSize(8),
        flexDirection:'row',
        alignItems:'center'
    },
    searchIcon:{
        width:screenUtils.autoSize(25),
        height:screenUtils.autoSize(25),
        marginLeft:screenUtils.autoSize(5),
        marginRight:screenUtils.autoSize(5)
    },
    searchText:{
        fontSize:screenUtils.autoFontSize(16),
        color:'#888'
    },
    tabView:{
        flex:1
    }
});

class DiscoverView extends Component{
    static navigationOptions={
        tabBarIcon:({focused, tintColor}) => {
            return <TabIcon
            tintColor={tintColor}
            labelTitle={'发现'}
            focused={focused}
            focusedImg={require('../../img/navi/discover-fill2.png')}
            notFocusedImg={require('../../img/navi/discover2.png')}
            />;
        },
        header:null,
        headerTitle:'发现',
        tabBarLabel:'发现',
        tabBarOnPress:({jumpToIndex,scene})=>{
            jumpToIndex(scene.index);
        }
    }
    constructor(props){
        super(props);
        this._backHandler=this._backHandler.bind(this);
    }
    _backHandler(){
        //this.props.navigation.goBack(null);
        BackHandler.exitApp();
        return true;
    }
    componentWillMount(){
        initMWS();
        console.log(ws);
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }
    render(){
        const navigation=this.props.navigation;
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <View style={styles.search}>
                    <Image style={styles.logo} source={require('../../img/云忆文字logo.png')} />
                    <View style={{flex:1,justifyContent:'center'}}>
                        <TouchableNativeFeedback onPress={()=>{
                            this.props.navigation.navigate('Search');
                        }} >
                            <View style={styles.searchBox}>
                                <Image style={styles.searchIcon} source={require('../../img/common/y_search.png')}/>
                                <Text style={styles.searchText}>搜索文章和用户</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <ScrollableTabView
                    initialPage={0}
                    tabBarTextStyle={{
                        fontSize:screenUtils.autoSize(16),
                    }}
                    tabBarUnderlineStyle={{backgroundColor:'#39f'}}
                    tabBarBackgroundColor={'#fefefe'}
                    tabBarInactiveTextColor={'#666'}
                    tabBarActiveTextColor={'#39f'}
                    renderTabBar={()=><ScrollableTabBar
                        style={{
                            height:screenUtils.autoSize(45),
                            borderWidth:0
                        }}
                        tabStyle={{
                            paddingLeft:screenUtils.autoSize(20),
                            paddingRight:screenUtils.autoSize(20),
                            height:screenUtils.autoSize(45)
                        }}
                        />
                    }
                >
                    <View style={styles.tabView} tabLabel={'热点'}>
                        <PassageList navigation={navigation} frontView={<HomeSwiper navigation={navigation}/>} classify={-1}/>
                    </View>
                    <View  style={styles.tabView} tabLabel={'摄影'}>
                        <PassageList navigation={navigation} classify={1}/>
                    </View>
                    <View  style={styles.tabView} tabLabel={'美文'}>
                        <PassageList navigation={navigation} classify={2}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'旅行'}>
                        <PassageList navigation={navigation} classify={3}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'情感'}>
                        <PassageList navigation={navigation} classify={4}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'诗词'}>
                        <PassageList navigation={navigation} classify={5}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'生活'}>
                        <PassageList navigation={navigation} classify={6}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'女神'}>
                        <PassageList navigation={navigation} classify={7}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'美食'}>
                        <PassageList navigation={navigation} classify={8}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'影视'}>
                        {/*
                        <Text>{JSON.stringify(this.props.user.userInfo)}</Text>
                        <Text>{this.props.user.token}</Text>
                        <TouchableNativeFeedback
                            onPress={()=>{
                                navigation.navigate('OtherUser',{otherUserId:'111'});
                            }}
                        >
                            <Text>用户</Text>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={()=>{
                                navigation.navigate('Follow',{userID:this.props.user.userInfo.userID});
                            }}
                        >
                            <Text>关注</Text>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={()=>{
                                navigation.navigate('LoginCenter');
                            }}
                        >
                            <Text>登录中心!</Text>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={()=>{
                                navigation.navigate('Fans',{userID:this.props.user.userInfo.userID});
                            }}
                        >
                            <Text>粉丝</Text>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback
                            onPress={()=>{
                                //navigation.navigate('Passage');
                                this.props.addCount(1);
                            }}
                        >
                            <Text>+1</Text>
                        </TouchableNativeFeedback>
                        <Text>{this.props.count}</Text>
                        */}
                        <PassageList navigation={navigation} classify={9}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'其他'}>
                        <PassageList navigation={navigation} classify={0}/>
                    </View>
                </ScrollableTabView>

            </View>
        );
    }
}

//redux
let actions={
    addCount:function (n) {
        return {
            type:'ADD_COUNT',
            payload:n
        };
    }
}
function mapStateToProps(state) {
    return{
        count:state.counter.count,
        user:state.user,
        routes:state.nav.routes
    };
}
function mapDispatchToProps(dispatch) {
    return{
        addCount:(n)=>{dispatch(actions.addCount(n))}
    }
}
DiscoverView=connect(mapStateToProps,mapDispatchToProps)(DiscoverView);

export default DiscoverView;
