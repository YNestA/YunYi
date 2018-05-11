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
    messageCenter:state.MessageCenter
});

export const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
    "Welcome",
    state => {
        return {nav:state.nav,messageCenter:state.MessageCenter}}

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
        let {messageCenter}=this.props,
            notReadCount=messageCenter.messageTypes.reduce((sum,item)=>{
                return sum+messageCenter[item].notRead
            },0);
        return (
            <View style={{
                flex:1,
            }}>
                <YunYiNavi
                    screenProps={{
                        startEditNew:this._startEditNew,
                        notReadCount:notReadCount
                    }}
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