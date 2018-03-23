import {combineReducers} from 'redux'
import counterReducer from './countReducer'
import editReducer from './editReducer'
import discoverReducer from './discoverReducer'

export default combineReducers({
    counter:counterReducer,
    edit:editReducer,
    discover:discoverReducer
});