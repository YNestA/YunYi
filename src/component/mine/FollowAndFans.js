import React, {Component} from 'react';
import {View, Text, Image, StyleSheet,TouchableNativeFeedback} from 'react-native';
import {screenUtils} from "../../tools/ScreenUtils";

export class FollowAndFans extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                paddingTop: screenUtils.autoSize(20),
                backgroundColor:'#fff',
            }}>
                <TouchableNativeFeedback
                    onPress={()=>{this.props.nav.navigate('FocusDetail')}}
                    background={TouchableNativeFeedback.Ripple("#0ff", false) }
                >
                    <View style={[styles.cell, styles.borderShortLine]}>
                        <Text style={styles.textCenter}>0</Text>
                        <Text style={styles.textCenter}>关注</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple("#0ff", false) }
                >
                    <View style={styles.cell}>
                        <Text style={styles.textCenter}>0</Text>
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
        fontSize: screenUtils.autoSize(12),
        textAlign: 'center',
    },
    borderShortLine: {
        borderRightWidth: screenUtils.autoSize(1),
        borderLeftWidth: screenUtils.autoSize(1),
        borderStyle: 'solid',
        borderColor: '#ccc',
    }
});