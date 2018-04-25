import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, TouchableNativeFeedback} from 'react-native'
import {connect} from "react-redux"
import NetworkError from '../../tools/NetworkError'
import {screenUtils} from '../../tools/ScreenUtils'
import {ip} from "../../settings";

class AvatarNameSignChange extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //console.log(this.props.userMessageLogIn);
        let user = this.props.userMessageLogIn;
        console.log('token',user.token);
        this.props.initialAvasterSign(user);
    }

    render() {
        console.log("render props userMessage", this.props);
        //console.log(this.props.userMessageLogIn);
        console.log(this.props.userMessageLogIn.token);
        let mineViewUserMessage = this.props.mineViewUserMessage;
        let user=this.props.userMessageLogIn;
        console.log('isLogin',user.isLogin);

        if(!user.isLogin){
            mineViewUserMessage.nickname='云忆用户';
            mineViewUserMessage.signDetail='未登录';
        }
        return (
            <TouchableNativeFeedback
                onPress={() => {
                    !user.isLogin?this.props.nav.navigate('LoginCenter'):this.props.nav.navigate('SignNameChangeDetail',{user:mineViewUserMessage});
                    //this.props.nav.navigate('SignNameChangeDetail',{user:mineViewUserMessage});
                }}
            >
                <View style={styles.avatarNameChange}>
                    <View style={styles.avatar}>
                        <Image source={require('../../img/profilePic.jpg')} style={styles.cellFixed}/>
                    </View>
                    <View style={styles.profileNameAndSign}>
                        <Text style={styles.userName}>{this.props.mineViewUserMessage.nickname}</Text>
                        <Text style={styles.Sign}
                              numberOfLines={1}>{this.props.mineViewUserMessage.signDetail}</Text>
                    </View>
                    <View>
                        <Image source={require('../../img/profile-more.png')} style={styles.profileChange}/>
                    </View>
                </View>
            </TouchableNativeFeedback>

        );
    }
}

let actions = {
    // setNetworkError:function (value) {
    //     return {
    //         type:'NETWORK_ERROR',
    //         payload: {
    //             networkError: value,
    //         }
    //     }
    // },
    initialAvasterSign: function (user) {
        return fetch('http://' + ip + ':4441/mine/basic-info', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'user_token': user.token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                //let imageUrl = JSON.parse(responseJson.data[0].image);
                //console.log("this is respoenJson", responseJson);
                console.log('avatarNameSignChange',responseJson.data);
                return {
                    type: 'INITIAL_SIGN_NAME_AVATAR',
                    payload: {
                        mineViewUserMessage: responseJson.data
                    }
                }
            }).catch((error) => {
                console.log('error', error);
            })
    }
}

function mapStateToProps(state) {
    return {
        mineViewUserMessage: state.mineViewUserMessage,
        userMessageLogIn: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initialAvasterSign: (user) => {
            dispatch(actions.initialAvasterSign(user))
        }
    }
}

export default AvatarNameSignChange = connect(mapStateToProps, mapDispatchToProps)(AvatarNameSignChange);

const userMessageExample = {
    avatar: '../../img/profilePic.jpg',
    nickname: '安升强',
    signDetail: '我是签名',
    sex: '男',
    iphoneNum: '15623425252',
    token:'',
}


const styles = StyleSheet.create({
    avatarNameChange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatar: {
        marginLeft: screenUtils.autoSize(8),
    },
    userName: {
        fontSize: screenUtils.autoSize(16),
        marginBottom: screenUtils.autoSize(3),
    },
    Sign: {
        fontSize: screenUtils.autoSize(12),
    },
    cellFixed: {
        height: screenUtils.autoSize(80),
        width: screenUtils.autoSize(80),
        borderRadius: screenUtils.autoSize(80),
    },
    profileNameAndSign: {
        marginLeft: screenUtils.autoSize(8),
        flex: 1,
    },
    profileChange: {
        width: screenUtils.autoSize(20),
        height: screenUtils.autoSize(20),
        marginTop: screenUtils.autoSize(30),
        marginLeft: screenUtils.autoSize(10),
    },
});