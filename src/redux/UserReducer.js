const initialState={
    isLogin:false,
    token:'',
    userInfo:{
        username:''
    }
};
export default function passageReducer(state=initialState,action) {
    switch(action.type){
        case 'LOAD_USER':
        case 'LOGIN':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}