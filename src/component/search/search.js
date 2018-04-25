import React,{Component} from 'react'
import {View,StyleSheet, Text, Button,ScrollView,StatusBar,TextInput, BackHandler,Keyboard} from 'react-native'
import SearchInput from './SearchInput'
import HotWords from './HotWords'
import SearchResult from './SearchResult'
import {connect} from 'react-redux'

const styles=StyleSheet.create({
    container:{
        paddingTop:StatusBar.currentHeight,
        backgroundColor:'#fff',
        flex:1
    }
});
class Search extends Component{
    static navigationOptions={
        header:null
    };
    constructor(props){
        super(props);
        this._backHandler=this._backHandler.bind(this);
    }
    _backHandler(){
        this.props.navigation.goBack(null);
        return true;
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
    }

    render() {
        let {search,onSearch}=this.props;
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <SearchInput onSearch={onSearch}/>
                <ScrollView>
                    {search.showHotWords ?
                        <HotWords hotWords={search.hotWords} onSearch={onSearch}/> :
                        <SearchResult result={search.result}/>
                    }
                </ScrollView>
            </View>
        );
    }
}
let actions={
    onSearch:function (keyword) {
        alert(keyword);
        return {
            type:'SEARCH',
            payload:{
                showHotWords:false,
                result:{
                    users:[{
                        name:'刘涛',
                        userID:'666',
                        headImg:''
                    },{
                        name:'安生抢',
                        userID:'777',
                        headImg:''
                    },{
                        name:'王子田',
                        userID:'888',
                        headImg:''
                    },{
                        name:'刘涛',
                        userID:'666',
                        headImg:''
                    },{
                        name:'安生抢',
                        userID:'777',
                        headImg:''
                    },{
                        name:'王子田',
                        userID:'888',
                        headImg:''
                    },{
                        name:'刘涛',
                        userID:'666',
                        headImg:''
                    },{
                        name:'安生抢',
                        userID:'777',
                        headImg:''
                    },{
                        name:'王子田',
                        userID:'888',
                        headImg:''
                    }],
                }
            }
        };
    }
};
function mapStateToProps(state) {
    return {
        search:state.search
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSearch:(keyword)=>{dispatch(actions.onSearch(keyword))}
    }
}

export default Search=connect(mapStateToProps,mapDispatchToProps)(Search);