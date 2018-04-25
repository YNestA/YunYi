import React,{Component} from 'react'
import {View,StyleSheet,Image, Text, TextInput,TouchableOpacity} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";

const styles=StyleSheet.create({
    container:{
        height:screenUtils.autoSize(60),
        flexDirection:'row',
        alignItems:'center',
        borderColor:'#ccc',
        borderBottomWidth:1/screenUtils.pixelRatio
    },
    textInput:{
        flex:1,
        paddingVertical:0,
        fontSize:screenUtils.autoFontSize(16),
        marginLeft:screenUtils.autoSize(15),
        height:screenUtils.autoSize(40),
        paddingLeft:screenUtils.autoSize(40),
        borderRadius:screenUtils.autoSize(3),
        backgroundColor:'#eee'
    },
    searchText:{
        textAlign:'center',
        width:screenUtils.autoSize(70),
        fontSize:screenUtils.autoFontSize(18),
    },
    searchImg:{
        position:'absolute',
        zIndex:10,
        top:screenUtils.autoSize(15),
        left:screenUtils.autoSize(20),
        width:screenUtils.autoSize(30),
        height:screenUtils.autoSize(30),
    }
});
export default class SearchInput extends Component{
    constructor(props){
        super(props);
        this.state= {
            keyword:''
        };
    }
    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.searchImg} source={require('../../img/common/y_search.png')}/>
                <TextInput
                    underlineColorAndroid="transparent"
                    value={this.state.keyword}
                    onChangeText={(text)=>{this.setState({keyword:text})}}
                    style={styles.textInput}
                    placeholder={'搜索用户和文章'}

                />
                <TouchableOpacity onPress={()=>{this.props.onSearch(this.state.keyword)}}>
                    <Text style={styles.searchText}>提交</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

