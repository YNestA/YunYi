const initialState={
    coverImg:null,
    title:'',
    sections:[],
};
export default function editReducer(state=initialState,action) {
    switch (action.type){
        case 'START_IMG':
            return Object.assign({},state,action.payload);
        case 'CHANGE_TITLE':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}