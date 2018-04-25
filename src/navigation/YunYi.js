import React, {Component} from 'react'
import {View,Image,Text,StyleSheet,BackHandler} from 'react-native'
import YunYiNavi from './navi'
import {connect} from 'react-redux'
import {addNavigationHelpers} from 'react-navigation'
import {SelectDialog} from "../component/edit-new/SelectDialog";
import {screenUtils} from '../tools/ScreenUtils'
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const mapStateToProps = state => ({
    nav: state.nav,
});

export const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
    "Welcome",
    state => state.nav,
);
const addListener = createReduxBoundAddListener("Welcome");


class YunYi extends Component{
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
                <YunYiNavi screenProps={{startEditNew:this._startEditNew}}
                           navigation={addNavigationHelpers({
                               dispatch: this.props.dispatch,
                               state: this.props.nav,
                               addListener,
                           })}
                />
                <SelectDialog
                    ref='selectDialog'
                />
            </View>
        );
    }
}
export default YunYi=connect(mapStateToProps)(YunYi);