import YunYiNavi from '../navigation/navi';


export default function naviReducer(state , action) {
    let nextState;
    switch (action.type) {
        default:
            nextState = YunYiNavi.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
}