import React, {Component} from 'react'
import {StatusBar,View,Text,ScrollView,TouchableNativeFeedback,BackHandler,StyleSheet,Image,TouchableWithoutFeedback} from 'react-native'
import ScrollableTabView,{ScrollableTabBar,DefaultTabBar} from 'react-native-scrollable-tab-view'
import {connect} from 'react-redux'
import {screenUtils} from '../../tools/ScreenUtils'
import PassageList from './PassageList'
import {HomeSwiper} from './HomeSwiper'
import {TabIcon} from '../../navigation/navi'

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    logo:{
        width:screenUtils.autoSize(70),
        height:screenUtils.autoSize(60),
        marginLeft:screenUtils.autoSize(10),
        marginRight:screenUtils.autoSize(10)
    },
    search:{
        flexDirection:'row',
        backgroundColor:'#3f81c1',
        paddingTop:StatusBar.currentHeight
    },
    searchBox:{
        backgroundColor:'#fff',
        height:screenUtils.autoSize(30),
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
        fontSize:screenUtils.autoFontSize(15),
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
            focusedImg={require('../../img/navi/discover-light.png')}
            notFocusedImg={require('../../img/navi/discover-dark.png')}
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
                    <Image style={styles.logo} source={require('../../img/yunyi.png')} />
                    <View style={{flex:1,justifyContent:'center'}}>
                        <TouchableNativeFeedback onPresas={()=>{console.log('search')}} >
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
                    tabBarUnderlineStyle={{backgroundColor:'#3f81c1'}}
                    tabBarBackgroundColor={'#fefefe'}
                    tabBarInactiveTextColor={'#666'}
                    tabBarActiveTextColor={'#3f81c1'}
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
                        <PassageList navigation={navigation} frontView={<HomeSwiper/>} classify={'热点'}/>
                    </View>
                    <View  style={styles.tabView} tabLabel={'摄影'}>
                        <PassageList navigation={navigation} classify={'摄影'}/>
                    </View>
                    <View  style={styles.tabView} tabLabel={'美文'}>
                        <PassageList navigation={navigation} classify={'美文'}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'旅行'}>
                        <PassageList navigation={navigation} classify={'旅行'}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'情感'}>
                        <PassageList navigation={navigation} classify={'情感'}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'诗词'}>
                        <PassageList navigation={navigation} classify={'诗词'}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'生活'}>
                        <PassageList navigation={navigation} classify={'生活'}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'女神'}>
                        <PassageList navigation={navigation} classify={'女神'}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'美食'}>
                        <PassageList navigation={navigation} classify={'美食'}/>
                    </View>
                    <View style={styles.tabView} tabLabel={'影视'}>
                        <Text>{this.props.user.userInfo.username+':'+this.props.user.token}</Text>
                        <TouchableNativeFeedback
                            onPress={()=>{
                                navigation.navigate('OtherUser');
                            }}
                        >
                            <Text>退出</Text>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={()=>{
                                navigation.navigate('LoginCenter');
                            }}
                        >
                            <Text>Go!</Text>
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
