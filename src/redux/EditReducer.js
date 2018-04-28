const initialState = {
    coverImg: {},
    title: '',
    sections: [],
    passageSetting:{
        public:1,
        classify:0,
        allowcomments:1,
//        status:1, //是否删除,1不删除
    }
};
/*img*/
/*
    img = {
        height: 480,
        mime: "image/jpeg",
        modificationDate: "1520768605000",
        path: "file:///storage/emulated/0/DCIM/Camera/IMG_20180311_074324.jpg",
        size: 7420,
        width: 640,
    }
*/
export default function editReducer(state = initialState, action) {
    switch (action.type) {
        case 'COMPLETE_EDIT':
        case 'CLEAN_EDIT':
            return initialState;
        case 'START_IMG':
            return Object.assign({}, state, action.payload);
        case 'CHANGE_TITLE':
            return Object.assign({}, state, action.payload);
        case 'ADD_TEXT_SECTION':
            return Object.assign({},state,action.payload);
        case 'ADD_IMG_SECTION':
            return Object.assign({},state,action.payload);
        case 'DELETE_SECTION':
            return Object.assign({},state,action.payload);
        case 'EDIT_SECTION_TEXT':
            return Object.assign({},state,action.payload);
        case 'UP_SECTION':
            return Object.assign({},state,action.payload);
        case 'DOWN_SECTION':
            return Object.assign({},state,action.payload);
        case 'CHANGE_SETTING':
            return Object.assign({},state,action.payload);
        case 'UPLOAD_IMGS':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}