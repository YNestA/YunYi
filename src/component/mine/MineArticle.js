import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {screenUtils} from "../../tools/ScreenUtils";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'
import ShortArticle from './ShortArticle'

export class MineArticle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let nav=this.props.nav;
        return (
            <ScrollableTabView
                tabBarActiveTextColor='#9B30FF'
                renderTabBar={() => <ScrollableTabBar/>}>
                <View tabLabel={'全部文章'}>
                    <ShortArticle nav={nav}/>
                </View>
                <View tabLabel={'回收站'}>
                    <ShortArticle nav={nav}/>
                </View>
            </ScrollableTabView>
        );
    }
}