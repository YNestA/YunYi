import React, {Component} from 'react';
import {connect} from 'react-redux'
import {View, Text, Image, StyleSheet,TouchableNativeFeedback} from 'react-native';
import {screenUtils} from "../../tools/ScreenUtils";

class FollowAndFans extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                paddingTop: screenUtils.autoSize(10),
                backgroundColor:'#fff',
            }}>
                <TouchableNativeFeedback
                    onPress={()=>{this.props.nav.navigate('Follow',{userID:this.props.user.userInfo.userID})}}
                    background={TouchableNativeFeedback.Ripple("#0ff", false) }
                >
                    <View style={[styles.cell, styles.borderShortLine]}>
                        <Text style={styles.textCenter}>{this.props.mineViewUserMessage.followedPeople}</Text>
                        <Text style={styles.textCenter}>关注</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                    onPress={()=>{this.props.nav.navigate('Fans',{userID:this.props.user.userInfo.userID})}}
                    background={TouchableNativeFeedback.Ripple("#0ff", false) }
                >
                    <View style={styles.cell}>
                        <Text style={styles.textCenter}>{this.props.mineViewUserMessage.followers}</Text>
                        <Text style={styles.textCenter}>粉丝</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        height: screenUtils.autoSize(40),
    },
    textCenter: {
        fontSize: screenUtils.autoSize(15),
        textAlign: 'center',
    },
    borderShortLine: {
        borderRightWidth: screenUtils.autoSize(1),
        borderLeftWidth: screenUtils.autoSize(1),
        borderStyle: 'solid',
        borderColor: '#ccc',
    }
});

function mapStateToProps(state) {
    return {
        user:state.user,
        mineViewUserMessage: state.mineViewUserMessage,
    }
}

export default FollowAndFans=connect(mapStateToProps)(FollowAndFans);