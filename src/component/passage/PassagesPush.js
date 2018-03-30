import React,{Component} from 'react'
import {View,Text,Image,StyleSheet,FlatList,TouchableWithoutFeedback,TouchableOpacity} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        marginBottom:screenUtils.autoSize(80)
    },
    header:{
        flexDirection:'row',
        padding:screenUtils.autoSize(15),
    },
    blueRow:{
        backgroundColor:'#3F81C1',
        width:screenUtils.autoSize(5),
        height:screenUtils.autoSize(25),
        borderRadius:screenUtils.autoSize(5)
    },
    headerText:{
        marginLeft:screenUtils.autoSize(8),
        fontSize:screenUtils.autoFontSize(18),
        color:'#444',
    },
    passageContainer:{
        paddingHorizontal:screenUtils.autoSize(15),
        flexDirection:'row',
        marginBottom:screenUtils.autoSize(20)
    },
    passageRight:{
        flex:1,
 //       backgroundColor:'red',
        paddingHorizontal:screenUtils.autoSize(10)
    },
    coverImg:{
        width:screenUtils.autoSize(140),
        height:screenUtils.autoSize(80),
    },
    title:{
        color:'#444',
        height:screenUtils.autoSize(60),
        lineHeight:screenUtils.autoSize(30),
        fontSize:screenUtils.autoFontSize(17)
    },
    readCount:{
        flexDirection:'row'
    },
    readCountImg:{
        width:screenUtils.autoSize(20),
        height:screenUtils.autoSize(20)
    },
    readCountText:{
        lineHeight:screenUtils.autoFontSize(20),
        color:'#4f68b0'
    }
});

export default class PassagesPush extends Component{
    constructor(props){
        super(props);
    }
    _renderHeader(len){
        return(
            (len > 0) ?
            <View style={styles.header}>
                <View style={styles.blueRow}/>
                <Text style={styles.headerText}>推荐文章</Text>
            </View>
            :
            <View/>
        )
    }
    render(){
        let passages=this.props.passages;
        return(
            <FlatList
                style={
                    styles.container
                }
                extraData={this.state}
                ListHeaderComponent={this._renderHeader(passages.length)}
                data={passages}
                renderItem={({item})=>{
                    return(
                        <TouchableWithoutFeedback>
                            <View style={styles.passageContainer}>
                                <Image style={styles.coverImg} source={require('../../img/asuka.jpg')}/>
                                <View style={styles.passageRight}>
                                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                                    <View style={styles.readCount}>
                                        <Image style={styles.readCountImg} source={require('../../img/common/read-blue.png')}/>
                                        <Text style={styles.readCountText}>{item.readCount}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                }}
            />
        );
    }
}
