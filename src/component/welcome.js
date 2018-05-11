import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {View, Image, StatusBar,} from 'react-native'
import {screenUtils} from "../tools/ScreenUtils";

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
                    let action=NavigationActions.reset({
                        index:0,
                        actions:[
                            NavigationActions.navigate({routeName:'Main'})
                        ]
                    });
                    this.props.navigation.dispatch(action);
                }, 3000);
            }else{
                setTimeout(() => {
                    this.props.navigation.navigate('LoginCenter',{firstEnter:true});
                }, 3000);
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#000',justifyContent:'center'}}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <Image style={{
                    //width:screenUtils.screenWidth,
                    //height:screenUtils.screenHeight,
                    flex:1,
                    width:screenUtils.screenWidth
                }} source={require('../img/welcome2.png')}/>
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
