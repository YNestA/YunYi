const initialState={
    userID:'',
    userInfo:{
        username:'',
        headImg:'',
        motto:'',
        concernCount:0,
        fansCount:0,
    },
    passages:[
    ],
    relation:{
        isFollow:0,
    }
};
export default function otherUserReducer(state=initialState,action) {
    switch(action.type){
        case 'OTHER_USER_LOAD_MORE':
        case 'OTHER_USER_INIT':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}