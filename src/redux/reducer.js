import {combineReducers} from 'redux'
import counterReducer from './CountReducer'
import editReducer from './EditReducer'
import discoverReducer from './DiscoverReducer'
import passageReducer from './PassageReducer'
import concernReducer from './ConcernReducer'
import naviReducer from './NaviReducer'

export default combineReducers({
    counter:counterReducer,
    edit:editReducer,
    discover:discoverReducer,
    passage:passageReducer,
    concern:concernReducer,
    nav:naviReducer
});