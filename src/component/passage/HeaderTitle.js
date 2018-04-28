import React,{Component} from 'react'
import {View,WebView,Text,StyleSheet,Image,TouchableNativeFeedback} from 'react-native'
import {screenUtils} from '../../tools/ScreenUtils'
import {connect} from 'react-redux'
import myFetch, {encodePostParams} from "../../tools/MyFetch";
import {ip} from "../../settings";
const styles={
    container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    authorContainer:{
        flexDirection:'row',
        justifyContent:'center',
        marginRight:screenUtils.autoSize(10)
    },
    authorImg:{
        borderRadius:screenUtils.autoSize(20),
        width:screenUtils.autoSize(40),
        height:screenUtils.autoSize(40),
        marginRight:screenUtils.autoSize(10)
    },
    authorName:{
        color:'#333',
        fontSize:screenUtils.autoFontSize(18),
        lineHeight:screenUtils.autoSize(40),
        maxWidth:screenUtils.autoSize(150),
        height:screenUtils.autoSize(40)
    },
    concernContainer:{
        backgroundColor:'#3f81c1',
        borderRadius:screenUtils.autoSize(5),
        height:screenUtils.autoSize(25)
    },
    concern:{
        color:'#fff',
        paddingHorizontal:screenUtils.autoSize(10),
        lineHeight:screenUtils.autoSize(25),
        fontSize:screenUtils.autoFontSize(14)
    }
};
class HeaderTitle extends Component{
    constructor(props){
        super(props);
        this._follow=this._follow.bind(this);
    }
    _follow(){
        let {user,follow,author,navigation}=this.props;
        if(user.isLogin){
            follow(author,user,navigation);
        }else{
            navigation.navigate('LoginCenter');
        }
    }
    render(){
        let {author}=this.props;
        return(
            <View style={styles.container}>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('#ddd',true)}
                    onPress={()=>{
                        this.props.navigation.navigate('OtherUser');
                    }}
                >
                    <View style={styles.authorContainer}>
                        <Image style={styles.authorImg} source={{uri:author.headImg}}/>
                        <Text style={styles.authorName} numberOfLines={1}>{author.name}</Text>
                    </View>
                </TouchableNativeFeedback>
                {   author.notFollow?
                    <TouchableNativeFeedback onPress={this._follow}>
                        <View style={styles.concernContainer}>
                            <Text style={styles.concern}>关注</Text>
                        </View>
                    </TouchableNativeFeedback>:null
                }
            </View>
        );
    }
}
let actions={
    follow:function (author,user,navigation) {
        myFetch(`http://${ip}:4441/api/user/relation/follow/`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'user_token':user.token,
            },
            body:encodePostParams({
                toUserUuid:author.authorID,
                type:1
            })
        });
        navigation.setParams({passage:{author:Object.assign({},author,{notFollow:false})}});
        return {
            type:'PASSAGE_FOLLOW_USER',
            payload:{
                author:Object.assign({},author,{notFollow:false})
            }

        }
    }
};
function mapStateToProps(state) {
    return{
        user:state.user
    }
}
function mapDispatchToProps(dispatch) {
    return {
        follow:(author,user,navigation)=>{dispatch(actions.follow(author,user,navigation))}
    }
}
export default HeaderTitle=connect(mapStateToProps,mapDispatchToProps)(HeaderTitle);
