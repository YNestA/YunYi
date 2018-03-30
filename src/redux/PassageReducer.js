const initialState={
    passageID:null,
    passagesPush:[]
};
export default function passageReducer(state=initialState,action) {
    switch(action.type){
        case 'INIT_PASSAGE':
            return Object.assign({},state,action.payload);
        case 'GET_PASSAGES_PUSH':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}