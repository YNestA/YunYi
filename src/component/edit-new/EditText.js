import React,{Component} from 'react'
import {View} from 'react-native'
import {RichTextEditor} from'react-native-zss-rich-text-editor'

class EditText extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <RichTextEditor/>
            </View>
        );
    }
}

export default EditText;