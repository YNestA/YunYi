import React,{Component} from 'react'
import {View,StyleSheet,Image, Text, TextInput,TouchableOpacity} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";
import SearchUsers from './SearchUsers'
import SearchPassages from './SearchPassages'

export default class SearchResult extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {result,navigation}=this.props;
        return (
            <View style={{paddingTop:screenUtils.autoSize(10)}}>
                <SearchUsers users={result.users} navigation={navigation} title={'相关用户'}/>
                <SearchPassages passages={result.passages} navigation={navigation}/>
            </View>
        );
    }
}