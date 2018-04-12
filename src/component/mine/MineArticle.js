import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {screenUtils} from "../../tools/ScreenUtils";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'
import {ShortArticle} from './sortArticle'

export class MineArticle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollableTabView
                tabBarActiveTextColor='#9B30FF'
                tabBarUnderlineStyle='#9B30FF'
                renderTabBar={() => <ScrollableTabBar/>}>
                <View tabLabel={'全部文章'}>
                    <ShortArticle/>
                </View>
                <View tabLabel={'回收站'}>
                    <ShortArticle/>
                </View>
            </ScrollableTabView>
        );
    }
}