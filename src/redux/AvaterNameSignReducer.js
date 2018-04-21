const initialState = {
    userId: 0,
    nickName: '',
    sex: 'man',
    avater: '',
    createTime: '0',
    phone: '',
};
export default function AvaterNameSignReducer(state = initialState, action) {
    switch (action.type) {
        case 'INITIAL_SIGN_NAME_AVATER':
            console.log('123123');
            return Object.assign({}, state, action.payload.userMessage);
        default:
            return state;
    }
}