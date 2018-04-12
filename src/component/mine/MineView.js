import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native'
import {CircleWatchedFans} from './circleWatchedFans'
import {MineArticle} from "./MineArticle";
import {AvaterNameSignChange} from "./AvaterNameSignChange";

export default class MineView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor:'#fff',
            }}>
                <AvaterNameSignChange/>
                <CircleWatchedFans/>
                <MineArticle/>
            </View>
        );
    }
}

