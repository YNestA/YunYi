import React, {Component} from 'react'
import {View} from 'react-native'
import {FollowAndFans} from './FollowAndFans'
import {MineArticle} from "./MineArticle";
import AvatarNameSignChange from "./AvatarNameSignChange";
import {SettingShareSearch} from "./SettingShareSearch"

export default class MineView extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let navigation = this.props.navigation
        return (
            <View style={{flex: 1, backgroundColor: '#fff',}}>
                <SettingShareSearch nav={navigation}/>
                <AvatarNameSignChange nav={navigation}/>
                <FollowAndFans nav={navigation}/>
                <MineArticle nav={navigation}/>
            </View>
        );
    }
}

