import React,{Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StatusBar, BackHandler} from 'react-native'

class Welcome extends Component{
    static navigationOptions={
        header:null
    };
    constructor(props){
        super(props);
    }
    componentDidMount(){
        myStorage.sync={
            user(params){
                params.resolve(null);
            }
        };
        myStorage.load({
            key:'user',
        }).then(ret=>{
            if(ret) {
                this.props.loadUser(ret.userInfo, ret.token);
                setTimeout(() => {
                    this.props.navigation.navigate('Main');
                }, 2000);
            }else{
                setTimeout(() => {
                    this.props.navigation.navigate('LoginCenter',{firstEnter:true});
                }, 2000);
            }
        }).catch(err=>{
            alert(err);
            console.log(err);
        });

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

let actions={
    loadUser:function (userInfo,token) {
        return {
            type:'LOAD_USER',
            payload:{
                isLogin:true,
                token:token,
                userInfo:userInfo
            }
        }
    }
};
function mapStateToProps(state) {
    return {user:state.user};
}
function mapDispatchToProps(dispatch) {
    return {
        loadUser:(userInfo,token)=>{dispatch(actions.loadUser(userInfo,token))}
    }
}

export default Welcome=connect(mapStateToProps,mapDispatchToProps)(Welcome);
