import React, {Component} from 'react'
import {View,Image,Text,StyleSheet} from 'react-native'
import {YunYiNavi} from './navi'
import {SelectDialog} from "../component/edit-new/SelectDialog";
import {screenUtils} from '../tools/ScreenUtils'

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
                <YunYiNavi screenProps={{
                    startEditNew: this._startEditNew,
                }}/>
                <SelectDialog
                    ref='selectDialog'
                />
            </View>
        );
    }
}