const initialState={
    messageTypes:['concern','thumb','comment',/*'notification','letter'*/],
    concern:{
        type:'concern',
        name:'关注',
        notRead:0,
        content:[],
        cursor:0,
    },
    thumb:{
        type:'thumb',
        name:'点赞',
        notRead:0,
        content:[],
        cursor:0
    },
    comment:{
        type:'comment',
        name:'评论',
        notRead:0,
        content:[],
        cursor:0
    },
    notification:{
        type:'notification',
        name:'通知',
        notRead:0,
        content:[],
        cursor:0
    },
    letter:{
        type:'letter',
        name:'私信',
        notRead:0,
        content:[],
        cursor:0
    }
};
export default function messageCenterReducer(state=initialState,action) {
    switch (action.type){
        case 'UPDATE_NOT_READ':
        case 'GET_LASTEST':
            return Object.assign({}, state, action.payload);
        case 'GET_MORE':
            return Object.assign({}, state, action.payload);
        case 'CLEAR_NOT_READ':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}