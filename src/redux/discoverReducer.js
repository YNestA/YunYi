const initialState={
    networkError:false,
    passageLists:{
        hotPoint:[]
    }
};
export default function discoverReducer(state=initialState,action) {
    switch (action.type){
        case 'NETWORK_ERROR':
            return Object.assign({}, state, action.payload);
        case 'INITIAL_PASSAGES':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}