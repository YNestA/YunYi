const initialState={
    networkError:false,
    users:[],
    passages:[],
    pageCount:0,
};

export default function concernReducer(state=initialState,action) {
    switch (action.type){
        case 'CONCERN_BOTTOM_REFRESH':
        case 'CONCERN_TOP_REFRESH':
        case 'INIT_CONCERN_DATA':
            return Object.assign({},state,action.payload);
        case 'NETWORK_ERROR':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}