import React, {Component} from 'react'
import {View,Text} from 'react-native'

export class DetailView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props);
        return(
            <View>
                <Text>详情！</Text>
            </View>
        );
    }
}