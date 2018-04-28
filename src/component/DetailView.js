import React, { Component } from 'react';
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import { View, Image, Text, findNodeHandle, StyleSheet ,TouchableOpacity} from 'react-native';

class Menu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.routes);
        return (
            <View>
                <TouchableOpacity onPress={()=>{
                }}>
                    <Text>open</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
});
function mapStateToProps(state) {
    return {
        routes:state.nav.routes
    }
}

export default Detail=connect(mapStateToProps)(Menu);
