const initialState={
    passageID:null,
    loading:true,
    sections:[],
    passagesPush:[],
    commentCount:0,
    thumbCount:0,
    shareCount:0,
    isCoverBlur:false,
};
export default function passageReducer(state=initialState,action) {
    switch(action.type){
        case 'PASSAGE_SET_LOADING':
            return Object.assign({},state,action.payload);
        case 'INIT_PASSAGE':
            return Object.assign({},state,action.payload);
        case 'GET_PASSAGES_PUSH':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}