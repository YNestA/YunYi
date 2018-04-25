import React,{Component} from 'react'
import {View,StyleSheet,Image, Text,FlatList, TextInput,TouchableOpacity} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";

const styles=StyleSheet.create({
    container:{
        paddingHorizontal:screenUtils.autoSize(8)
    },
    title:{
        fontSize:screenUtils.autoFontSize(20),
        marginLeft:screenUtils.autoSize(15),
        color:'#888',
        borderBottomWidth:1/screenUtils.pixelRatio,
        borderColor:'#ccc',
        lineHeight:screenUtils.autoSize(60)
    },
    section:{
        borderBottomWidth:1/screenUtils.pixelRatio,
        borderColor:'#eee',
        flexDirection:'row',
        flex:1
    },
    hotWord:{
        flex:1,
        paddingLeft:screenUtils.autoSize(15),
        fontSize:screenUtils.autoFontSize(17),
        color:'#333',
        marginVertical:screenUtils.autoSize(10),
        lineHeight:screenUtils.autoSize(40)
    },
    leftBorder:{
        borderLeftWidth:1/screenUtils.pixelRatio,
        borderColor:'#ccc'
    }
});
export default class HotWords extends Component{
    constructor(props){
        super(props);
        this._search=this._search.bind(this);
    }
    _search(keyword){
        this.props.onSearch(keyword);
    }
    render(){
        let {hotWords}=this.props,
            wordSection=[];
        for(let i=0,l=hotWords.length;i<l;i=i+2){
            wordSection.push(hotWords.slice(i,i+2));
        }
        return(
            <View style={styles.container}>
                <Text style={styles.title}>云忆热搜榜</Text>
                <FlatList
                    data={wordSection}
                    renderItem={({item,index})=>{
                        return (
                            <View style={styles.section}>
                                <TouchableOpacity onPress={()=>{this._search(item[0])}} style={{flex:1}}>
                                    <Text style={[styles.hotWord,]}>{item[0]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{this._search(item[1])}} style={{flex:1}}>
                                    <Text style={[styles.hotWord,styles.leftBorder]}>{item[1]}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}