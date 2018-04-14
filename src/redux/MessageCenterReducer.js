const initialState={
    messageTypes:['concern','thumbComment','share','notification','letter'],
    concern:{
        type:'concern',
        name:'关注',
        notRead:100,
        content:[]
    },
    thumbComment:{
        type:'thumbComment',
        name:'点赞与评论',
        notRead:19,
        content:[]
    },
    share:{
        type:'share',
        name:'分享',
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