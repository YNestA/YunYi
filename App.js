import React, {Component} from 'react';
import {createStore} from 'redux'
import reducer from './src/redux/reducer'
import {Provider, connect} from 'react-redux'
import YunYi from './src/navigation/YunYi'

let store=createStore(reducer);
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <YunYi/>
            </Provider>
        );
    }
}
