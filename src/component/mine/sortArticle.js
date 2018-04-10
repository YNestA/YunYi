import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {screenUtils} from "../../tools/ScreenUtils";

const styles = StyleSheet.create({
    articleItem:{
        paddingBottom:screenUtils.autoSize(20),
        borderColor:'#fff',
        borderWidth:screenUtils.autoSize(0.4),
    },
    imageFirst: {
        width:screenUtils.screenWidth,
        height:screenUtils.autoSize(250),
        marginTop:screenUtils.autoSize(15),
        marginBottom:screenUtils.autoSize(15),
    },
    articleName:{
        marginTop:screenUtils.autoSize(15),
        marginLeft:screenUtils.autoSize(8),
        marginRight:screenUtils.autoSize(8),
        fontSize:screenUtils.autoSize(15),
    },
    bottomData:{
        width:screenUtils.screenWidth,
        justifyContent:'space-between',
        flexDirection:'row',
    },
    pushDate:{
        flex:1,
        fontSize:screenUtils.autoSize(12),
        marginLeft:screenUtils.autoSize(8),
    },
    bottomIcon:{
        flex:1,
        justifyContent:'flex-end',
        flexDirection:'row',
    },
    imgCommon:{
        width:screenUtils.autoSize(16),
        height:screenUtils.autoSize(16),
    },
    textCommon:{
        fontSize:screenUtils.autoSize(12),
        marginRight:screenUtils.autoSize(4),
    }
})

export class ShortArticle extends Component {
    constructor(props) {
        super(props);
    }
    _renderItem=({item})=>(
        <View style={styles.articleItem}>
            <Text style={styles.articleName}>{item.articleName}</Text>
            <Image
                style={styles.imageFirst}
                source={require('../../img/common/slide11.jpg')}/>
            <View style={styles.bottomData}>
                <Text style={styles.pushDate}>2018-03-04</Text>
                <View style={styles.bottomIcon}>
                    <Image style={[styles.imgCommon]} source={require('../../img/eye.png')}/>
                    <Text style={[styles.textCommon]}>{item.watchedNum}</Text>
                    <Image style={[styles.imgCommon]} source={require('../../img/common/y_thumb.png')}/>
                    <Text style={[styles.textCommon]}>{item.thumbUpNum}</Text>
                    <Image style={[styles.imgCommon]} source={require('../../img/common/y_comment.png')}/>
                    <Text style={[styles.textCommon]}>{item.commentNum}</Text>
                    <Image style={[styles.imgCommon]} source={require('../../img/common/y_share.png')}/>
                    <Text style={[styles.textCommon]}>{item.shareNum}</Text>
                </View>
            </View>
        </View>
    );
    render() {
        return(
            <FlatList
                data={templateItemData}
                renderItem={this._renderItem}
            />
        );
    }
}
const templateItemData=[{
    articleName:'这是文章标题',
    articleImg:'../../img/common/slide11.jpg',
    watchedNum:'234',
    thumbUpNum:'235',
    commentNum:'236',
    shareNum:'237',
},{
    articleName:'这是文章标题',
    articleImg:'../../img/common/slide11.jpg',
    watchedNum:'234',
    thumbUpNum:'235',
    commentNum:'236',
    shareNum:'237',
},{
    articleName:'这是文章标题',
    articleImg:'../../img/common/slide11.jpg',
    watchedNum:'234',
    thumbUpNum:'235',
    commentNum:'236',
    shareNum:'237',
},{
    articleName:'这是文章标题',
    articleImg:'../../img/common/slide11.jpg',
    watchedNum:'234',
    thumbUpNum:'235',
    commentNum:'236',
    shareNum:'237',
}];

//redux
// let action = {
//     setNetworkError:function (value) {
//         return{
//             type:'NETWORK_ERROR',
//             payload:{
//
//             }
//         }
//     }
// }
