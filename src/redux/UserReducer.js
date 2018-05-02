const initialState={
    isLogin:false,
    token:'',
    userInfo:{
        userID:'',
        username:'',
        phoneNum:'',
        headImg:''
    }
};
export default function passageReducer(state=initialState,action) {
    switch(action.type){
        case 'LOAD_USER':
        case 'LOGOUT':
        case 'LOGIN':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}