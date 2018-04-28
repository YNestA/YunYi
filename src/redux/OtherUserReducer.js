export const initOtherUserData={
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
const initialState={

};
export default function otherUserReducer(state=initialState,action) {
    switch(action.type){
        case 'OTHER_USER_LOAD_MORE':
        case 'OTHER_USER_TOGGLE_FOLLOW':
        case 'REGISTER_OTHER_USER':
        case 'GET_OTHER_USER_DATA':
        case 'OTHER_USER_INIT':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}