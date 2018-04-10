const initialState={
    networkError:false,
    passageLists:{
        '热点':{
            pageCount:0,
            passages:[]
        },
        '美文':{
            pageCount:0,
            passages:[]
        },
    }
};
export default function discoverReducer(state=initialState,action) {
    switch (action.type){
        case 'NETWORK_ERROR':
            return Object.assign({}, state, action.payload);
        case 'INITIAL_PASSAGES':
            return Object.assign({}, state, action.payload);
        case 'BOTTOM_REFRESH':
            return Object.assign({}, state, action.payload);
        case 'TOP_REFRESH':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}