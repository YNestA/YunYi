const initialState={
    messageTypes:['concern','thumb','comment','notification','letter'],
    concern:{
        type:'concern',
        name:'关注',
        notRead:100,
        content:[]
    },
    thumb:{
        type:'thumb',
        name:'点赞',
        notRead:19,
        content:[]
    },
    comment:{
        type:'comment',
        name:'评论',
        notRead:0,
        content:[]
    },
    notification:{
        type:'notification',
        name:'通知',
        notRead:0,
        content:[]
    },
    letter:{
        type:'letter',
        name:'私信',
        notRead:0,
        content:[]
    }
};
export default function messageCenterReducer(state=initialState,action) {
    switch (action.type){
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