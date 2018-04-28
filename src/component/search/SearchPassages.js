import React,{Component} from 'react'
import {View,StyleSheet,Image,FlatList,Text, TextInput,TouchableOpacity} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";

const styles=StyleSheet.create({
    container:{
        paddingVertical:screenUtils.autoSize(12),
        borderBottomWidth:1/screenUtils.pixelRatio,
        borderColor:'#ccc',
    },
    passageHeader:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    passageAuthor:{
        flexDirection:'row',
        alignItems:'center'
    },
    authorImg:{
        width:screenUtils.autoSize(40),
        height:screenUtils.autoSize(40),
        borderRadius:screenUtils.autoSize(20)
    },
    authorName:{
        marginLeft:screenUtils.autoSize(8),
        fontSize:screenUtils.autoSize(15),
        color:'#666'
    },
    passageTime:{
        fontSize:screenUtils.autoSize(14),
        color:'#666'
    },
    passageBody:{
        flexDirection:'row',
        marginVertical:screenUtils.autoSize(10)
    },
    passageCover:{
        width:screenUtils.autoSize(150),
        height:screenUtils.autoSize(90),
    },
    passageInfo:{
        flex:1,
        paddingLeft:screenUtils.autoSize(8)
    },
    title:{
        height:screenUtils.autoSize(30),
        color:'#333',
        fontSize:screenUtils.autoFontSize(17),
        lineHeight:screenUtils.autoSize(30)
    },
    content:{
        fontSize:screenUtils.autoFontSize(14),
        height:screenUtils.autoSize(40),
        lineHeight:screenUtils.autoSize(20),
        color:'#707070'
    },
    readCount:{
        height:screenUtils.autoSize(20),
        flexDirection:'row'
    },
    readCountImg:{
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20)
    },
    readCountText:{
        fontSize:screenUtils.autoFontSize(13),
        color:'#707070'
    }
});

class SearchPassage extends Component{
    constructor(props){
        super(props);
    }
    _getTime(time){
        let date=new Date(time);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }
    render(){
        let {passage,navigation}=this.props;
        return (
            <TouchableOpacity activeOpacity={0.9}>
                <View style={styles.container}>
                    <View style={styles.passageHeader}>
                        <View style={styles.passageAuthor}>
                            <Image style={styles.authorImg} source={{uri:passage.author.headImg}}/>
                            <Text style={styles.authorName}>{passage.author.name}</Text>
                        </View>
                        <Text style={styles.passageTime}>{this._getTime(passage.time)}</Text>
                    </View>
                    <View style={styles.passageBody}>
                        <Image style={styles.passageCover} source={{uri:passage.coverImg}}/>
                        <View style={styles.passageInfo}>
                            <Text style={styles.title} numberOfLines={1}>{passage.title}</Text>
                            <Text style={styles.content} numberOfLines={2}>{
                                passage.sections.map((item)=>{
                                    return item.text;
                                }).join(' ')
                            }</Text>
                            <View style={styles.readCount}>
                                <Image style={styles.readCountImg} source={require('../../img/common/eye.png')}/>
                                <Text style={styles.readCountText}>{passage.readCount}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default class SearchPassages extends Component{
    constructor(props){
        super(props);
    }
    _renderHeader(){
        return (
            <Text style={{
                fontSize:screenUtils.autoFontSize(16),
                color:'#444',
                marginVertical:screenUtils.autoSize(10)
            }}>相关文章</Text>
        );
    }
    render(){
        let {passages,navigation}=this.props;
        return (
            <FlatList
                style={{
                    paddingTop:screenUtils.autoSize(10),
                    backgroundColor:'#fff',
                    paddingHorizontal:screenUtils.autoSize(15)
                }}
                data={passages}
                ListHeaderComponent={this._renderHeader}
                renderItem={({item,index})=>{
                    return <SearchPassage passage={item} navigation={navigation}/>
                }}
            />
        );
    }
}