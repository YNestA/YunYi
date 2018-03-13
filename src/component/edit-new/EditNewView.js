import React, {Component} from 'react'
import {View,Text,Image} from 'react-native'
import {screenUtils} from "../../tools/ScreenUtils";
import {connect} from 'react-redux'

export default class EditNewView extends Component{
    static navigationOptions= ({navigation,screenProps})=>{
        let {params}=navigation.state;
        return {
            tabBarIcon:({focused, tintColor}) => {
                return <Image
                    source={require('../../img/edit-new.png')}
                    style={{width:screenUtils.autoSize(70),height:screenUtils.autoSize(70)}}/>;
            },
            headerTitle:'创作',
            tabBarLabel:'创作',
            tabBarOnPress:params?params.tabBarOnPress:null,
        };
    }

    SelectDialog=null;
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.navigation.setParams({
            tabBarOnPress:({jumpToIndex,scene})=>{
                let pro=new Promise((resolve,reject)=>{
                    this.props.screenProps.startEditNew(resolve);
                }).then((data)=>{
                    this.props.navigation.navigate('EditMain',{selected:true,imgs:data});
                });


            }
        });
    }
    render(){
        return(
            <View/>
        );
    }
}
