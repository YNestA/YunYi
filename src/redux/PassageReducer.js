export const initPassageData={
    passageID:null,
    loading:true,
    ifThumb:false,
    sections:[],
    passagesPush:[],
    comments:[],
    allComments:[],
    commentCount:0,
    thumbCount:0,
    shareCount:0,
    isCoverBlur:false,
};
const initialState={

};
export default function passageReducer(state=initialState,action) {
    switch(action.type){
        case 'GET_PASSAGE_ALL_COMMENTS':
        case 'COMMIT_PASSAGE_COMMENT':
        case 'PASSAGE_FOLLOW_USER':
        case 'CHANGE_PASSAGE_THUMB':
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