const initialState = {
    userId: 0,
    nickName: '',
    sex: 'man',
    avatar: '',
    createTime: '0',
    phone: '',
};
export default function AvatarNameSignReducer(state = initialState, action) {
    switch (action.type) {
        case 'INITIAL_SIGN_NAME_AVATAR':
            console.log('123123');
            return Object.assign({}, state, action.payload.userMessage);
        default:
            return state;
    }
}