import React, {Component} from 'react'
import {View,Text,TouchableNativeFeedback,BackHandler} from 'react-native'
import {connect} from 'react-redux'

class DiscoverView extends Component{
    constructor(props){
        super(props);
        this._onBackHandler=this._onBackHandler.bind(this);
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this._onBackHandler);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this._onBackHandler);
    }
    _onBackHandler(){
        BackHandler.exitApp();
        return true;
    }
    render(){
        const navigation=this.props.navigation;
        return(
            <View>
                <Text>发现！</Text>
                <TouchableNativeFeedback
                    onPress={()=>{
                        navigation.navigate('EditMain');
                    }}
                >
                    <Text>去编辑页</Text>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={()=>{
                        //navigation.navigate('Passage');
                        this.props.addCount(1);
                    }}
                >
                    <Text>+1</Text>
                </TouchableNativeFeedback>
                <Text>{this.props.count}</Text>
            </View>
        );
    }
}

//redux
let actions={
    addCount:function (n) {
        return {
            type:'ADD_COUNT',
            payload:n
        };
    }
}
function mapStateToProps(state) {
    return{
        count:state.counter.count
    };
}
function mapDispatchToProps(dispatch) {
    return{
        addCount:(n)=>{dispatch(actions.addCount(n))}
    }
}
DiscoverView=connect(mapStateToProps,mapDispatchToProps)(DiscoverView);

export default DiscoverView;