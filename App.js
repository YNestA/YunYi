import React, {Component} from 'react';
import {AsyncStorage} from 'react-native'
import {createStore,applyMiddleware} from 'redux'
import reducer from './src/redux/reducer'
import reduxPromise from 'redux-promise'
import {Provider, connect} from 'react-redux'
import YunYi from './src/navigation/YunYi'
import Stroage from 'react-native-storage'

console.disableYellowBox=true;

global.myStorage=new Stroage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:null,
    enableCache:true,
});

let store=createStore(reducer,applyMiddleware(reduxPromise));
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <YunYi/>
            </Provider>
        );
    }
}
