import React, {Component} from 'react'
import {View,Text,Image} from 'react-native'
import {connect} from 'react-redux'
import {screenUtils} from "../../tools/ScreenUtils";

class EditNewView extends Component{
    static navigationOptions= ({navigation,screenProps})=>{
        return {
            tabBarIcon:({focused, tintColor}) => {
                return <Image
                    source={require('../../img/navi/edit-new.png')}
                    style={{width:screenUtils.autoSize(70),height:screenUtils.autoSize(70)}}/>;
            },
            headerTitle:'创作',
            tabBarLabel:'创作',
        };
    }

    SelectDialog=null;
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    render(){
        return(
            <View/>
        );
    }
}
function mapStateToProps(state) {
    return {
        user:state.user,
    }
}
export default EditNewView=connect(mapStateToProps)(EditNewView);