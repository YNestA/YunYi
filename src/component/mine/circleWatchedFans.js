import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {screenUtils} from "../../tools/ScreenUtils";

export class CircleWatchedFans extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: screenUtils.autoSize(20),
            }}>
                <View style={styles.cell}>
                    <Text style={styles.textCenter}>0</Text>
                    <Text style={styles.textCenter}>圈子</Text>
                </View>
                <View style={[styles.cell, styles.borderShortLine]}>
                    <Text style={styles.textCenter}>0</Text>
                    <Text style={styles.textCenter}>关注</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.textCenter}>0</Text>
                    <Text style={styles.textCenter}>粉丝</Text>
                </View>
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