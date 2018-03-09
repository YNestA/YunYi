import {combineReducers} from 'redux'
import counterReducer from './countReducer'
import editReducer from './editReducer'

export default combineReducers({
    counter:counterReducer,
    edit:editReducer,
});