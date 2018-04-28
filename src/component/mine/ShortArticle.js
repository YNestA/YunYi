import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, FlatList, TouchableWithoutFeedback} from 'react-native';
import {screenUtils} from "../../tools/ScreenUtils";
import {ip} from "../../settings";
import {connect} from "react-redux";
import myFetch from '../../tools/MyFetch'

class ShortArticle extends Component {
    constructor(props) {
        super(props);
    }

    _onPressArticleItem() {
        let navigation = this.props.navigation;
        console.log(navigation);
    }

    componentDidMount() {
        console.log("shortArticle", this.props);
        let user = this.props.userMessageLogIn;
        this.props.initialMineViewArticle(user);
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback
            onPress={this._onPressArticleItem}
        >
            <View style={styles.articleItem}>
                <View style={styles.articleTagAndName}>
                    <Text style={styles.articleTag}>{item.articleTag}</Text>
                    <Text style={styles.articleName}>{item.title}</Text>
                </View>
                <Image
                    style={styles.imageFirst}
                    source={item.image?{uri:item.image}:require('../../img/common/slide11.jpg')}/>
                <Text style={styles.chooseCircle}>其他</Text>
                <View style={styles.bottomData}>
                    <Text style={styles.pushDate}>{item.createTime}</Text>
                    <View style={styles.bottomIcon}>
                        <Image style={styles.imgCommon} source={require('../../img/common/eye_fill.png')}/>
                        <Text style={styles.textCommon}>{item.readnumber}</Text>
                        <Image style={styles.imgCommon} source={require('../../img/common/y_thumb.png')}/>
                        <Text style={styles.textCommon}>{item.likeNum}</Text>
                        <Image style={styles.imgCommon} source={require('../../img/common/y_comment.png')}/>
                        <Text style={styles.textCommon}>{item.commentNum}</Text>
                        <Image style={styles.imgCommon} source={require('../../img/common/y_share.png')}/>
                        <Text style={styles.textCommon}>{item.shareNum}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        let data = this.props.mineViewPassgeDetail.content;
        console.log('data', typeof(data));
        let user = this.props.userMessageLogIn;
        let nav = this.props.nav;
        return (
            user.isLogin?
            <FlatList
                data={data}
                renderItem={this._renderItem}
            />
                :
                <View style={styles.notLoginView}>
                    <TouchableWithoutFeedback
                        onPress={()=>{
                            nav.navigate('LoginCenter');
                        }}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.notLoginText}>登陆</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
        );
    }
}

const templateItemData = {
    content: [{
        articleName: '这是文章标题',
        articleTag: '私密',
        articleImg: '../../img/common/slide11.jpg',
        watchedNum: '234',
        thumbUpNum: '235',
        commentNum: '236',
        shareNum: '237',
    }, {
        articleName: '这是文章标题',
        articleTag: '私密',
        articleImg: '../../img/common/slide11.jpg',
        watchedNum: '234',
        thumbUpNum: '235',
        commentNum: '236',
        shareNum: '237',
    }, {
        articleName: '这是文章标题',
        articleTag: '私密',
        articleImg: '../../img/common/slide11.jpg',
        watchedNum: '234',
        thumbUpNum: '235',
        commentNum: '236',
        shareNum: '237',
    }, {
        articleName: '这是文章标题',
        articleTag: '公开',
        articleImg: '../../img/common/slide11.jpg',
        watchedNum: '234',
        thumbUpNum: '235',
        commentNum: '236',
        shareNum: '237',
    }]
};

//redux


let actions = {
    initialMineViewArticle: function (user) {
        return fetch('http://'+ip+':4441/mine/refresh-article/5', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'user_token': user.token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("this is respoenJson", responseJson);
                let data={content:[]};
                responseJson.data.map((item)=>{
                    let date=new Date(item.createTime);
                    let y=date.getFullYear();
                    let m=date.getMonth();
                    let d=date.getDay();
                    item.createTime=y+'-'+m+'-'+d;
                    let imageJson = JSON.parse(item.image);
                    item.image = imageJson.url;
                    data.content.push(item);
                });
                return {
                    type: 'MINE_VIEW_ARTICLE',
                    payload: {
                        passageMineViewDetail: data
                    }
                }
            }).catch((error) => {
                console.log('error', error);
            })
    }
}

function mapStateToProps(state) {
    return {
        userMessageLogIn: state.user,
        mineViewPassgeDetail: state.mineViewPassgeDetail,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initialMineViewArticle: (user) => {
            dispatch(actions.initialMineViewArticle(user))
        }
    }
}

export default ShortArticle = connect(mapStateToProps, mapDispatchToProps)(ShortArticle);

const styles = StyleSheet.create({
    articleItem: {
        paddingBottom: screenUtils.autoSize(10),
        borderColor: '#f1f1f3',
        borderBottomWidth: screenUtils.autoSize(16),
    },
    imageFirst: {
        width: screenUtils.screenWidth,
        height: screenUtils.autoSize(200),
        marginTop: screenUtils.autoSize(15),
        marginBottom: screenUtils.autoSize(15),
    },
    articleTagAndName: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    articleTag: {
        fontSize: screenUtils.autoSize(10),
        marginLeft: screenUtils.autoSize(8),
        borderWidth: screenUtils.autoSize(0.6),
        borderRadius: screenUtils.autoSize(5),
        borderColor: "#A9A9A9",
        color: "#A9A9A9",
        paddingLeft: screenUtils.autoSize(6),
        paddingRight: screenUtils.autoSize(4),
        paddingBottom: screenUtils.autoSize(1),
        paddingTop: screenUtils.autoSize(2),
        marginTop: screenUtils.autoSize(15),
    },
    articleName: {
        marginTop: screenUtils.autoSize(15),
        marginLeft: screenUtils.autoSize(4),
        fontSize: screenUtils.autoSize(18),
    },
    chooseCircle: {
        position: 'absolute',
        bottom: screenUtils.autoSize(60),
        right: screenUtils.autoSize(20),
        borderRadius: screenUtils.autoSize(8),
        color: "#fff",
        fontSize: screenUtils.autoSize(12),
        backgroundColor: "rgba(0,0,0,0.1)",
    },
    bottomData: {
        width: screenUtils.screenWidth,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    pushDate: {
        flex: 1,
        fontSize: screenUtils.autoSize(12),
        marginLeft: screenUtils.autoSize(10),
    },
    bottomIcon: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    imgCommon: {
        width: screenUtils.autoSize(12),
        height: screenUtils.autoSize(12),
        marginRight: screenUtils.autoSize(1),
    },
    textCommon: {
        top: screenUtils.autoSize(-3),
        fontSize: screenUtils.autoSize(12),
        marginRight: screenUtils.autoSize(8),
    },
    notLoginView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:screenUtils.autoSize(100),
    },
    textContainer:{
        backgroundColor:"#104E8B",
        borderRadius:screenUtils.autoSize(4),
        paddingLeft:screenUtils.autoSize(15),
        paddingRight:screenUtils.autoSize(15),
        paddingTop:screenUtils.autoSize(3),
        paddingBottom:screenUtils.autoSize(3),
    },
    notLoginText:{
        fontSize:screenUtils.autoSize(18),
        color:'#fff',
    }
})
