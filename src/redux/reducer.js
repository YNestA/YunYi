import {combineReducers} from 'redux'
import counterReducer from './CountReducer'
import editReducer from './EditReducer'
import discoverReducer from './DiscoverReducer'
import passageReducer from './PassageReducer'
import concernReducer from './ConcernReducer'
import naviReducer from './NaviReducer'
import userReducer from './UserReducer'
import messageCenterReducer from "./MessageCenterReducer";

export default combineReducers({
    counter:counterReducer,
    edit:editReducer,
    discover:discoverReducer,
    passage:passageReducer,
    concern:concernReducer,
    MessageCenter:messageCenterReducer,
    nav:naviReducer,
    user:userReducer
});