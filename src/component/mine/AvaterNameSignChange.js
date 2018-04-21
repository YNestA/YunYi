import React, {Component} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {connect} from "react-redux"
import NetworkError from '../../tools/NetworkError'
import myFetch from '../../tools/MyFetch'
import {screenUtils} from '../../tools/ScreenUtils'

class AvaterNameSignChange extends Component {
    constructor(props) {
        super(props);
        console.log("this.props.userMessage", this.props.userMessage);
        // console.log('this is props',this.props);
    }

    componentDidMount() {
        this.props.initialAvasterSign();
    }

    render() {
        console.log("render props userMessage", this.props.userMessage);
        return (
            <View style={styles.avaterNameChange}>
                <View style={styles.avater}>
                    <Image source={require('../../img/profilePic.jpg')} style={styles.cellFixed}/>
                </View>
                <View style={styles.profileNameAndSign}>
                    <Text style={styles.userName}>{this.props.userMessage.userName}</Text>
                    <Text style={styles.Sign}
                          numberOfLines={1}>{this.props.userMessage.signDetail}</Text>
                </View>
                <View>
                    <Image source={require('../../img/profile-more.png')} style={styles.profileChange}/>
                </View>
            </View>
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
    initialAvasterSign: function () {
        return myFetch('http://www.baidu.com', {method: 'GET', timeout: 10000})
            .then((response) => response.text())
            .then((responseJson) => {
                return {
                    type: 'INITIAL_SIGN_NAME_AVATER',
                    payload: {
                        userMessage: userMessageExample
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
    }
}

function mapStateToProps(state) {
    return {
        userMessage: state.userMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initialAvasterSign: () => {
            dispatch(actions.initialAvasterSign())
        }
    }
}

export default AvaterNameSignChange = connect(mapStateToProps, mapDispatchToProps)(AvaterNameSignChange);

const userMessageExample = {
    avater: '../../img/profilePic.jpg',
    userName: '安升强',
    signDetail: '我是签名',
    sex: '男',
    iphoneNum: '15623425252',
}


const styles = StyleSheet.create({
    avaterNameChange: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avater: {
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
    }
});