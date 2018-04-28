const initialState = {
    userId: 0,
    nickname: '',
    sex: '',
    avatar: '',
    createTime: '0',
    phone: '',
    motto:'',
};
export default function AvatarNameSignReducer(state = initialState, action) {
    switch (action.type) {
        case 'INITIAL_SIGN_NAME_AVATAR':
            return Object.assign({}, state, action.payload.mineViewUserMessage);
        case 'CHANGE_AVATAR':
            return Object.assign({}, state, action.payload);
        case 'CHANGE_NICK_NAME':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}