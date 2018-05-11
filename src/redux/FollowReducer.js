const initialState={
    people:[]
};
export default function fansReducer(state=initialState,action) {
    switch(action.type){
        case 'SET_FOLLOW_ID':
        case 'FOLLOW_INIT':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}