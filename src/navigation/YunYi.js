import React, {Component} from 'react'
import {View,Image,Text,StyleSheet} from 'react-native'
import YunYiNavi from './navi'
import {connect} from 'react-redux'
import {addNavigationHelpers} from 'react-navigation'
import {SelectDialog} from "../component/edit-new/SelectDialog";
import {screenUtils} from '../tools/ScreenUtils'

class AppWithNavigationState extends Component {
    render() {
        return (
            <YunYiNavi
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
                screenProps={this.props.screenProps}
            />
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});

let YunYiNavi2=connect(mapStateToProps)(AppWithNavigationState);

export default class YunYi extends Component{
    constructor(props){
        super(props);
        this._startEditNew=this._startEditNew.bind(this);
    }
    _startEditNew(resolve){
        this.refs.selectDialog.show(resolve);
    }
    render() {
        return (
            <View style={{
                flex:1,
            }}>
                <YunYiNavi2 screenProps={{startEditNew:this._startEditNew}} />
                <SelectDialog
                    ref='selectDialog'
                />
            </View>
        );
    }
}