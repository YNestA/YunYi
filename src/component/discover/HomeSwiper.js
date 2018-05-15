import React,{Component} from 'react'
import {connect} from 'react-redux'
import {View,Text,Image,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import Swiper from 'react-native-swiper'
import {screenUtils} from '../../tools/ScreenUtils'
import myFetch from "../../tools/MyFetch";
import {ip} from "../../settings";

const styles=StyleSheet.create({
    warp:{
        width:screenUtils.screenWidth,
        height:screenUtils.autoSize(150),
    },
    slide:{
        flex:1,
    },
    slideImg:{
        width:'100%',
        height:'100%'
    }
});
class HomeSwiper extends Component{
    constructor(props){
        super(props);
        this._openPassage=this._openPassage.bind(this);
        this.state={
            visiableSwiper: false
        }
    }
    componentDidMount(){
        let {navigation,getSwiper}=this.props;
        getSwiper();
        setTimeout(() => {
            this.setState({ visiableSwiper: true })
        }, 0);
    }
    _openPassage(passage){
        this.props.navigation.navigate('Passage',{passage:passage});
    }

    render(){
        let {swiper}=this.props;
        if(this.state.visiableSwiper) {
            return (
                <Swiper
                    style={styles.warp}
                    paginationStyle={{
                        bottom: screenUtils.autoSize(5)
                    }}
                    activeDotColor={'#209aaa'}
                >
                    {swiper.map((item) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => {
                                this._openPassage(item)
                            }}>
                                <View style={[styles.slide]}>
                                    <Image style={styles.slideImg} source={{uri: item.coverImg}}/>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })}
                </Swiper>
            );
        }else{
            return <View style={styles.warp}/>;
        }
    }
}

let actions={
    getSwiper:function () {
        return myFetch(`http://${ip}:4441/api/swiper/articles/recommend`)
            .then(response=>response.json())
            .then(responseData=>{
                if(responseData.code==10001){
                    return {
                        type:'DISCOVER_GET_SWIPER',
                        payload:{
                            swiper:responseData.data.map((item)=>{
                                return {
                                    author: {
                                        authorID: item.userUuid,
                                        headImg: item.avatar,
                                        name: item.nickname
                                    },
                                    createTime: item.createTime,
                                    title: item.title,
                                    coverImg: item.image,
                                    passageID: item.passageUuid,
                                    thumbCount: item.likeNum,
                                    commentCount: item.commentNum,
                                    shareCount: item.shareNum
                                };
                            }),
                        }
                    }
                }
            }).catch((err)=>{
            });
    }
};
function mapStateToProps(state) {
    return {
        swiper:state.discover.swiper
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getSwiper:()=>{return dispatch(actions.getSwiper())}
    }
}

export default HomeSwiper=connect(mapStateToProps,mapDispatchToProps)(HomeSwiper);