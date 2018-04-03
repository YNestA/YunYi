import React,{Component} from 'react'
import {View,FlatList,Text,Image,ScrollView,TouchableWithoutFeedback} from 'react-native'
import {screenUtils,myFetch,NetworkError,Loading} from '../../tools/MyTools'
import {connect} from 'react-redux'
import ConcernPassage from './ConcernPassage'
import ConcernUsers from './ConcernUsers'

class ConcernPassages extends Component{
    constructor(props){
        super(props);
        this.state={
            topRefreshing:0,
            bottomRefreshing:0
        };
        this._initialData=this._initialData.bind(this);
        this._renderFooter=this._renderFooter.bind(this);
        this._bottomRefresh=this._bottomRefresh.bind(this);
        this._topRefresh=this._topRefresh.bind(this);
    }
    _renderHeader(users){
        return (
            <ConcernUsers users={users}/>
        );
    }
    _topRefresh(){
        let {passages}=this.props.concern;
        console.log(this.state);
        if(this.state.topRefreshing===0&&this.state.bottomRefreshing===0){
            this.setState({topRefreshing:1});
            this.props.topRefresh(passages,(value)=>{
                this.setState({topRefreshing:value});
            })
        }
    }
    _bottomRefresh(){
        let {passages}=this.props.concern;
        if(this.state.bottomRefreshing===0&&this.state.topRefreshing===0) {
            this.setState({bottomRefreshing: 1});
            this.props.bottomRefresh(passages, (value) => {
                this.setState({bottomRefreshing: value});
            });
        }
    }
    _initialData(){
        this.props.initialData();
    }
    _renderFooter(){
        if(this.state.bottomRefreshing===1){
            return <Loading
                loadingStyle={{
                    width:screenUtils.autoSize(30),
                    height:screenUtils.autoSize(30),
                    marginBottom:screenUtils.autoSize(10)
                }}/>;
        }else{
            return <View/>;
        }
    }
    componentDidMount(){
        this._initialData();
    }
    render() {
        let {users,passages,networkError}=this.props.concern;
        if (networkError) {
            return <NetworkError containerStyle={{flex:1}} reload={()=>{
                this.props.setNetworkError(false);
                this._initialData();
            }}/>;
        }else{

            return(
                passages.length?
                    <FlatList
                        refreshing={!!this.state.topRefreshing}
                        onRefresh={this._topRefresh}
                        onEndReachedThreshold={0.05}
                        onEndReached={this._bottomRefresh}
                        extraData={this.state}
                        data={passages}
                        ListHeaderComponent={this._renderHeader(users)}
                        ListFooterComponent={this._renderFooter}
                        renderItem={({item})=>{
                            return <ConcernPassage passage={item} navigation={this.props.navigation}/>
                        }}
                    />:
                    <Loading
                        containerStyle={{flex: 1, justifyContent: 'center'}}
                        loadingStyle={{width: screenUtils.autoSize(50), height: screenUtils.autoSize(50)}}
                    />
            );
        }
    }
}

let tempData={
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
                authorID:'A20180322',
                headImg:'../../img/asuka.jpg',
                name:'周瑜',
                concerned:true,
            },
            title:'hahahhahahha',
            text:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            coverImg:'../../img/hikari.jpg',
            createTime:'2019-9-30 12:30',
            thumbHeadImgs:[],
            passageID:'P20180322',
            thumbCount:250,
            commentCount:250,
            shareCount:250
        },{
            author:{
                authorID:'A20180322',
                headImg:'../../img/asuka.jpg',
                name:'中国古拳法掌门人',
                concerned:false,
            },
            createTime:'2019-9-30 12:30',
            title:'人人有书读，人人有功练',
            text:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            coverImg:'../../img/hikari.jpg',
            thumbHeadImgs:[],
            passageID:'P20180322',
            thumbCount:250,
            commentCount:250,
            shareCount:250
        },{
            author:{
                authorID:'A20180322',
                headImg:'../../img/asuka.jpg',
                name:'中国古拳法掌门人',
                concerned:true
            },
            createTime:'2019-9-30 12:30',
            title:'人人有书读，人人有功练',
            text:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            coverImg:'../../img/hikari.jpg',
            thumbHeadImgs:[],
            passageID:'P20180322',
            thumbCount:250,
            commentCount:250,
            shareCount:250
        }
    ]
};
let actions={
    setNetworkError:function (value) {
        return {
            type:'NETWORK_ERROR',
            payload: {
                networkError: value,
            }
        }
    },
    initialData:function () {
        return myFetch('https://www.baidu.com',{method:'GET',timeout:10000})
            .then((response)=>response.text)
            .then(responseData=>{
                return {
                    type:'INIT_DATA',
                    payload:{
                        users:tempData.users,
                        passages:tempData.passages,
                        pageCount:0
                    },
                }
            }).catch((error)=>{
                console.log(error);
                return {
                    type:'NETWORK_ERROR',
                    payload: {
                        networkError:true,
                    }
                };
            });
    },
    topRefresh:function () {
        return myFetch('https://www.baidu.com',{method:'GET',timeout:10000})
            .then((response)=>response.text)
            .then(responseData=>{

            }).catch((error)=>{
                console.log(error);
                return {
                    type:'NETWORK_ERROR',
                    payload: {
                        networkError:true,
                    }
                };
            });
    },
    bottomRefresh:function (passages) {
        return myFetch('https://www.baidu.com',{method:'GET',timeout:10000})
            .then((response)=>response.text)
            .then(responseData=>{

            }).catch((error)=>{
                console.log(error);
                return {
                    type:'NETWORK_ERROR',
                    payload: {
                        networkError:true,
                    }
                };
            });
    }
};

function mapStateToProps(state) {
    return {
        concern:state.concern
    }
}

function mapDispatchToProps(dispatch) {
    return{
        initialData:()=>{dispatch(actions.initialData())},
        setNetworkError:(value)=>{dispatch(actions.setNetworkError(value))},
        topRefresh:()=>{dispatch(actions.topRefresh())},
        bottomRefresh:(passages)=>{dispatch(actions.bottomRefresh(passages))}
    }
}

export default ConcernPassages=connect(mapStateToProps,mapDispatchToProps)(ConcernPassages);