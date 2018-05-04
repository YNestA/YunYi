import React, {Component} from 'react'
import {View,Text,ScrollView,FlatList,StyleSheet} from 'react-native'
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
    static navigationOptions = {
        tabBarIcon: ({focused, tintColor}) => {
            return <TabIcon
                labelTitle={'消息'}
                tintColor={tintColor}
                focused={focused}
                focusedImg={require('../../img/navi/message-fill2.png')}
                notFocusedImg={require('../../img/navi/message2.png')}
            />;
        },
        headerLeft: <View/>,
        headerRight: <View/>,
        headerTitle: '消息',
        tabBarLabel: '消息',

    };
    componentWillMount(){
    }
    constructor(props){
        super(props);
    }
    render(){
        let {messageCenter}=this.props;
        let entrys=messageCenter.messageTypes.map((item)=>{
            return messageCenter[item];
        });
        return(
            <View style={styles.container}>
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