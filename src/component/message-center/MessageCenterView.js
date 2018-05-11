import React, {Component} from 'react'
import {View,Text,ScrollView,FlatList,StyleSheet,StatusBar} from 'react-native'
import {TabIcon} from '../../navigation/navi'
import MessageEntry from './MessageEntry'
import {connect} from 'react-redux'

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
});
class MessageCenterView extends Component{
    static navigationOptions = ({navigation,screenProps})=>{
        return {
            tabBarIcon: ({focused, tintColor}) => {
                return <TabIcon
                    labelTitle={'消息'}
                    tintColor={tintColor}
                    focused={focused}
                    focusedImg={require('../../img/navi/message-fill2.png')}
                    notFocusedImg={require('../../img/navi/message2.png')}
                    showRedPoint={!!screenProps.notReadCount}
                />;
            },
            headerLeft: <View/>,
            headerRight: <View/>,
            headerTitle: '消息',
            tabBarLabel: '消息',
        }
    };
    componentWillMount(){

    }
    constructor(props){
        super(props);
    }
    render(){
        let {messageCenter,navigation}=this.props;
        let entrys=messageCenter.messageTypes.map((item)=>{
            return messageCenter[item];
        });
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <ScrollView>
                    <FlatList
                        data={entrys}
                        extraData={this.state}
                        renderItem={({item})=>{
                            return <MessageEntry navigation={this.props.navigation} entry={item}/>;
                        }}
                    />
                </ScrollView>
            </View>
        );
    }
}

let actions={

};
function mapStateToProps(state) {
    return {
        user:state.user,
        routes:state.nav.routes,
        messageCenter:state.MessageCenter
    }
}
function mapDispatchToProps(dispatch) {
    return {

    };
}

export default MessageCenterView=connect(mapStateToProps,mapDispatchToProps)(MessageCenterView);