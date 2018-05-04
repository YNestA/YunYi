import React, {Component} from 'react'
import {View} from 'react-native'
import {TabIcon} from '../../navigation/navi'
import {FollowAndFans} from './FollowAndFans'
import {MineArticle} from "./MineArticle";
import AvatarNameSignChange from "./AvatarNameSignChange";
import {SettingShareSearch} from "./SettingShareSearch"

export default class MineView extends Component {
    static navigationOptions={
        tabBarIcon:({focused, tintColor}) => {
            return <TabIcon
                labelTitle={'我的'}
                tintColor={tintColor}
                focused={focused}
                focusedImg={require('../../img/navi/mine-fill2.png')}
                notFocusedImg={require('../../img/navi/mine2.png')}
            />;
        },
        header:null,
        headerTitle:'我的',
        tabBarLabel:'我的'
    };
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

