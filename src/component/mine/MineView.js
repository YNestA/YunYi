import React, {Component} from 'react'
import {View, ImageBackground} from 'react-native'
import {CircleWatchedFans} from './circleWatchedFans'
import {MineArticle} from "./MineArticle";
import {AvaterNameSignChange} from "./AvaterNameSignChange";
import {SettingShareSearch} from "./SettingShareSearch"

export default class MineView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let navigation = this.props.navigation
        return (
            <View style={{flex: 1, backgroundColor:'#fff',}}>
                <SettingShareSearch nav={navigation}/>
                <AvaterNameSignChange/>
                <CircleWatchedFans/>
                <MineArticle/>
            </View>
        );
    }
}

