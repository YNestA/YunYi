import React, {Component} from 'react'
import {View,Text,ScrollView,TouchableNativeFeedback,BackHandler,StyleSheet,Image,TouchableWithoutFeedback} from 'react-native'
import ScrollableTabView,{ScrollableTabBar,DefaultTabBar} from 'react-native-scrollable-tab-view'
import {connect} from 'react-redux'
import {screenUtils} from '../../tools/ScreenUtils'
import PassageList from './PassageList'
import {HomeSwiper} from './HomeSwiper'

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
        height:screenUtils.autoSize(50),
        backgroundColor:'#3f81c1'
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
    constructor(props){
        super(props);
        this._onBackHandler=this._onBackHandler.bind(this);
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this._onBackHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._onBackHandler);
    }
    _onBackHandler(){
        BackHandler.exitApp();
        return true;
    }
    render(){
        const navigation=this.props.navigation;
        return(
            <View style={styles.container}>
                <View style={styles.search}>
                    <Image style={styles.logo} source={require('../../img/yunyi.png')} />
                    <View style={{flex:1,justifyContent:'center'}}>
                        <TouchableNativeFeedback onPress={()=>{console.log('search')}} >
                            <View style={styles.searchBox}>
                                <Image style={styles.searchIcon} source={require('../../img/discover/search.png')}/>
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
                        <PassageList frontView={<HomeSwiper/>} classify={'热点'}/>
                    </View>
                    <View  style={styles.tabView} tabLabel={'摄影'}>
                        <TouchableNativeFeedback
                            onPress={()=>{
                                navigation.navigate('EditMain');
                            }}
                        >
                            <Text>去编辑页</Text>
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
                    <View  style={styles.tabView} tabLabel={'美文'}>
                        <PassageList classify={'美文'}/>
                    </View>
                    <View tabLabel={'旅行'}>
                        <PassageList classify={'美文'}/>
                    </View>
                    <View tabLabel={'情感'}>
                        <PassageList classify={'美文'}/>
                    </View>
                    <View tabLabel={'诗词'}>
                        <PassageList classify={'美文'}/>
                    </View>
                    <View tabLabel={'生活'}>
                        <PassageList classify={'美文'}/>
                    </View>
                    <View tabLabel={'女神'}>
                        <PassageList classify={'美文'}/>
                    </View>
                    <View tabLabel={'美食'}>
                        <PassageList classify={'美文'}/>
                    </View>
                    <View tabLabel={'影视'}>
                        <PassageList classify={'美文'}/>
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
        count:state.counter.count
    };
}
function mapDispatchToProps(dispatch) {
    return{
        addCount:(n)=>{dispatch(actions.addCount(n))}
    }
}
DiscoverView=connect(mapStateToProps,mapDispatchToProps)(DiscoverView);

export default DiscoverView;