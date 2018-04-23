import React, {Component} from 'react'
import {View,StatusBar,ScrollView,Image,Text,StyleSheet,TouchableWithoutFeedback,TouchableNativeFeedback} from 'react-native'
import {TabIcon} from '../../navigation/navi'
import {connect} from 'react-redux'
import ConcernPassages from './ConcernPassages'
import {myFetch,screenUtils} from '../../tools/MyTools'

class ConcernView extends Component{
    static navigationOptions=({navigation,screenProps})=> {
        let {params}=navigation.state;
        return {
            tabBarIcon:({focused, tintColor}) => {
                return <TabIcon
                    labelTitle={'关注'}
                    tintColor={tintColor}
                    focused={focused}
                    focusedImg={require('../../img/navi/concern-light.png')}
                    notFocusedImg={require('../../img/navi/concern-dark.png')}
                />;
            },
            headerLeft: <View/>,
            headerRight:<TouchableWithoutFeedback>
                            <View>
                                <Image style={{
                                    width:screenUtils.autoSize(30),
                                    height:screenUtils.autoSize(30),
                                    marginHorizontal:screenUtils.autoSize(15),
                                }} source={require('../../img/common/more.png')}/>
                            </View>
                        </TouchableWithoutFeedback>,
            headerTitle:'关注',
            tabBarLabel: '关注',
            tabBarOnPress:params?params.tabBarOnPress:null
        };
    };
    componentDidMount(){
    }
    componentWillMount(){
        this.props.navigation.setParams({
            tabBarOnPress:({jumpToIndex,scene})=>{
                if(this.props.user.isLogin) {
                    jumpToIndex(scene.index);
                }else{
                    this.props.navigation.navigate('LoginCenter');
                }
            }
        });
    }
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex:1}}>
                <ConcernPassages navigation={this.props.navigation}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user:state.user
    };
}
export default ConcernView=connect(mapStateToProps)(ConcernView);