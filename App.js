import React, {Component} from 'react';
import {createStore,applyMiddleware} from 'redux'
import reducer from './src/redux/reducer'
import reduxPromise from 'redux-promise'
import {Provider, connect} from 'react-redux'
import YunYi from './src/navigation/YunYi'

console.disableYellowBox=true;

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
