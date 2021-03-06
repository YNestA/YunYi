import {screenUtils} from './ScreenUtils'
import myFetch,{getFormData,encodePostParams} from './MyFetch'
import NetworkError from "./NetworkError"
import Loading from './loading'
import getRouteKey from './GetRouteKey'

module.exports= {
    screenUtils:screenUtils,
    myFetch:myFetch,
    NetworkError:NetworkError,
    Loading:Loading,
    getRoutekey:getRouteKey,
    getFormData:getFormData,
    encodePostParams:encodePostParams,
};