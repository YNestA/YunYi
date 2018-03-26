import React,{Component} from 'react'
import {View,Text,FlatList} from 'react-native'
import DiscoverPassage from './DiscoverPassage'
import {connect} from "react-redux";
import Loading from '../../tools/loading'
import {screenUtils} from '../../tools/ScreenUtils'
import NetworkError from '../../tools/NetworkError'
import myFetch from '../../tools/MyFetch'

class PassageList extends Component{
    constructor(props){
        super(props);
        this.state={
            refreshing:0
        }
        this._initialPassages=this._initialPassages.bind(this);
        this._renderFooter=this._renderFooter.bind(this);
        this._bottomRefresh=this._bottomRefresh.bind(this);
    }
    _initialPassages(){
        this.props.initialPassages(this.props.passageLists,this.props.classify);
    }
    componentDidMount(){
        this._initialPassages();
    }
    _renderFooter(){
        if(this.state.refreshing===1){
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
    _bottomRefresh(){
        if(this.state.refreshing===0){
            console.log(this.props.passageLists[this.props.classify].pageCount);
            this.setState({refreshing:1});
            setTimeout(()=>{
                this.props.bottomRefresh(this.props.passageLists,this.props.classify,(value)=>{
                    this.setState({refreshing:value});
                });
            })
            //this.props.bottomRefresh(this.props.passageLists,this.props.classify,(value)=>{
            //    this.setState({refreshing:value});
            //});
        }
    }
    render() {
        let classify = this.props.classify,
            {passages,pageCount}= this.props.passageLists[classify],
            frontView=this.props.frontView || <View/>;

        if (this.props.networkError) {
            return <NetworkError containerStyle={{flex:1}} reload={()=>{
                this.props.setNetworkError(false);
                this._initialPassages();
            }}/>;
        } else {
            return (
                passages.length ?
                    <FlatList
                        extraData={this.state}
                        ListHeaderComponent={frontView}
                        ListFooterComponent={this._renderFooter}
                        data={passages}
                        renderItem={({item, index}) => {
                            return (<DiscoverPassage passage={item}/>);
                        }}
                        onEndReachedThreshold={0.05}
                        onEndReached={this._bottomRefresh}
                    /> : <Loading
                        containerStyle={{flex: 1, justifyContent: 'center'}}
                        loadingStyle={{width: screenUtils.autoSize(50), height: screenUtils.autoSize(50)}}
                    />
            );
        }
    }

}

const tempData=[{
    author:{
        authorID:'A20180322',
        headImg:'../../img/asuka.jpg',
        name:'中国古拳法掌门人'
    },
    title:'人人有书读，人人有功练',
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
        name:'中国古拳法掌门人'
    },
    title:'人人有书读，人人有功练',
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
        name:'中国古拳法掌门人'
    },
    title:'人人有书读，人人有功练',
    coverImg:'../../img/hikari.jpg',
    thumbHeadImgs:[],
    passageID:'P20180322',
    thumbCount:250,
    commentCount:250,
    shareCount:250
}];
//redux
let actions={
    setNetworkError:function (value) {
        return {
            type:'NETWORK_ERROR',
            payload: {
                networkError: value,
            }
        }
    },
    initialPassages:function (passageLists,classify) {
        return myFetch('http://www.baidu.com',{method:'GET',timeout:10000})
            .then((response)=>response.text())
            .then((responseData)=>{
                let newPassageLists=Object.assign({},passageLists);
                newPassageLists[classify]={
                    passages:tempData,
                    pageCount:1
                };
                return{
                    type:'INITIAL_PASSAGES',
                    payload:{
                        networkError:false,
                        passageLists:newPassageLists
                    }
                };
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
    bottomRefresh:function (passageLists,classify,setLoading) {
        return myFetch('http://www.baidu.com',{method:'GET',timeout:10000})
            .then((response)=>response.text())
            .then((responseData)=>{
                let newPassageLists=Object.assign({},/passageLists);
                newPassageLists[classify]={
                    passages:passageLists[classify].passages.concat(tempData),
                    pageCount:passageLists[classify].pageCount+1
                };
                setLoading(0);
                return {
                    type:'BOTTOM_REFRESH',
                    payload:{
                        networkError:false,
                        passageLists:newPassageLists
                    }
                };
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
}
function mapStateToProps(state) {
    return{
        networkError:state.discover.networkError,
        passageLists:state.discover.passageLists
    };
}
function mapDispatchToProps(dispatch) {
    return{
        initialPassages:(passageLists,classify)=>{dispatch(actions.initialPassages(passageLists,classify))},
        setNetworkError:(value)=>{dispatch(actions.setNetworkError(value))},
        bottomRefresh:(passageLists,classify,pageNum)=>{dispatch(actions.bottomRefresh(passageLists,classify,pageNum))}
    }
}
export default PassageList=connect(mapStateToProps,mapDispatchToProps)(PassageList);
