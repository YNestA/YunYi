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
        let user = this.props.userMessageLogIn;
        this.props.initialAvasterSign(user);
    }

    render() {
        let mineViewUserMessage = this.props.mineViewUserMessage;
        let user=this.props.userMessageLogIn;

        if(!user.isLogin){
            mineViewUserMessage.nickname='点我登陆';
        }
        return (
            <TouchableNativeFeedback
                onPress={() => {
                    //!user.isLogin?this.props.nav.navigate('LoginCenter'):this.props.nav.navigate('SignNameChangeDetail',{user:mineViewUserMessage});
                    this.props.nav.navigate('SignNameChangeDetail');
                }}
            >
                <View style={styles.avatarNameChange}>
                    <View style={styles.avatar}>
                        <Image source={mineViewUserMessage.avatar?{uri:mineViewUserMessage.avatar}:require('../../img/profilePic.jpg')} style={styles.avatarImage}/>
                    </View>
                    <View style={styles.profileNameAndSign}>
                        <Text style={styles.userName}>{mineViewUserMessage.nickname}</Text>
                        <Text style={styles.Sign}
                              numberOfLines={1}>{mineViewUserMessage.signature}</Text>
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
                //alert(JSON.stringify(responseJson.data));
                return {
                    type: 'INITIAL_SIGN_NAME_AVATAR',
                    payload: {
                        mineViewUserMessage: responseJson.data
                    }
                }
            }).catch((error) => {
                alert(error);
                console.log('error', error);
            })
    }
};

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


const styles = StyleSheet.create({
    avatarNameChange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatar: {
        marginLeft: screenUtils.autoSize(13),
    },
    userName: {
        fontSize: screenUtils.autoSize(16),
        marginBottom: screenUtils.autoSize(3),
    },
    Sign: {
        fontSize: screenUtils.autoSize(12),
    },
    avatarImage: {
        height: screenUtils.autoSize(66),
        width: screenUtils.autoSize(66),
        borderRadius: screenUtils.autoSize(66),
    },
    profileNameAndSign: {
        marginLeft: screenUtils.autoSize(8),
        flex: 1,
    },
    profileChange: {
        width: screenUtils.autoSize(30),
        height: screenUtils.autoSize(30),
        marginRight: screenUtils.autoSize(10),
    },
});