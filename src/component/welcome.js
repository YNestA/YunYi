import React,{Component} from 'react'
import {View,Text,StatusBar} from 'react-native'

export default class Welcome extends Component{
    static navigationOptions={
        header:null
    };
    constructor(props){
        super(props);
    }
    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.navigate('LoginCenter');
        },3000);
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
                <StatusBar backgroundColor={'#000'} barStyle={'light-content'}/>
                <Text style={{fontSize:50,color:'#fff',textAlign:'center'}}>云忆</Text>
            </View>
        );
    }
}