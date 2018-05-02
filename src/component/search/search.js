import React,{Component} from 'react'
import {View,StyleSheet, Text, Button,ScrollView,StatusBar,TextInput, BackHandler,Keyboard} from 'react-native'
import SearchInput from './SearchInput'
import HotWords from './HotWords'
import SearchResult from './SearchResult'
import {connect} from 'react-redux'
import myFetch from "../../tools/MyFetch";
import {ip} from "../../settings";

const styles=StyleSheet.create({
    container:{
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
        let {navigation,search,onSearch}=this.props;
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <SearchInput onSearch={onSearch}/>
                <ScrollView>
                    {search.showHotWords ?
                        <HotWords hotWords={search.hotWords} onSearch={onSearch}/> :
                        <SearchResult result={search.result} navigation={navigation}/>
                    }
                </ScrollView>
            </View>
        );
    }
}
let actions={
    onSearch:function (keyword) {
        return myFetch(`http://${ip}:4441/api/search/all/${keyword}`,{
            method:'GET'
        }).then((response)=>response.json())
            .then((responseData)=>{
                //alert(JSON.stringify(responseData));
                if(responseData.code==10001){
                    let data=responseData.data;
                    return {
                        type:'SEARCH',
                        payload:{
                            showHotWords:false,
                            result:{
                                users:data.users.map((item)=>{
                                    return {
                                        name:item.nickname,
                                        userID:item.userUuid,
                                        headImg:item.avatar
                                    }
                                }),
                                passages:data.articles.map((item)=>{
                                    return  {
                                        author:{
                                            name:item.nickname,
                                            authorID:item.userUuid,
                                            headImg: item.avatar
                                        },
                                        passageID:item.passageUuid,
                                        time:item.createTime,
                                        coverImg:item.image,
                                        title:item.title,
                                        sections:JSON.parse(item.content).map((item)=>{
                                            return {
                                                text:item.text
                                            }
                                        }),
                                        readCount:item.readnumber
                                    };
                                })
                            }
                        }
                    }
                }
            });
        /*
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
                    passages:[
                        {
                            author:{
                                name:'克林',
                                headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-9127_2018-04-26.jpg',
                            },
                            passageID:'12212',
                            time:new Date().getTime(),
                            coverImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-9127_2018-04-26.jpg',
                            title:'王子田刘涛',
                            sections:[{text:'让晚风轻轻吹送了落霞'},{text:'我已习惯每个傍晚去想她'}],
                            readCount:6584
                        },
                        {
                            author:{
                                name:'克林',
                                headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-9127_2018-04-26.jpg',
                            },
                            passageID:'12212',
                            time:new Date().getTime(),
                            coverImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-9127_2018-04-26.jpg',
                            title:'王子田刘涛王子田刘涛王子田刘涛王子田刘涛',
                            sections:[{text:'让晚风轻轻吹送了落霞'},{text:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊我已习惯每个傍晚去想她'}],
                            readCount:6584
                        },
                        {
                            author:{
                                name:'克林',
                                headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-9127_2018-04-26.jpg',
                            },
                            passageID:'12212',
                            time:new Date().getTime(),
                            coverImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-9127_2018-04-26.jpg',
                            title:'王子田刘涛',
                            sections:[{text:'让晚风轻轻吹送了落霞'},{text:'我已习惯每个傍晚去想她'}],
                            readCount:6584
                        },{
                            author:{
                                name:'克林',
                                headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-9127_2018-04-26.jpg',
                            },
                            passageID:'12212',
                            time:new Date().getTime(),
                            coverImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-9127_2018-04-26.jpg',
                            title:'王子田刘涛',
                            sections:[{text:'让晚风轻轻吹送了落霞'},{text:'我已习惯每个傍晚去想她'}],
                            readCount:6584
                        },{
                            author:{
                                name:'克林',
                                headImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-9127_2018-04-26.jpg',
                            },
                            passageID:'12212',
                            time:new Date().getTime(),
                            coverImg:'https://www.hupucdn.com/uploads/hupu/focus/focus-large-9127_2018-04-26.jpg',
                            title:'王子田刘涛',
                            sections:[{text:'让晚风轻轻吹送了落霞'},{text:'我已习惯每个傍晚去想她'}],
                            readCount:6584
                        },
                    ]
                }
            }
        };
        */
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