const initialState={
    messageTypes:['concern','thumbComment','share','notification','letter'],
    concern:{
        type:'concern',
        name:'关注',
        notRead:100
    },
    thumbComment:{
        type:'thumbComment',
        name:'点赞与评论',
        notRead:19
    },
    share:{
        type:'share',
        name:'分享',
        notRead:0
    },
    notification:{
        type:'notification',
        name:'通知',
        notRead:0
    },
    letter:{
        type:'letter',
        name:'私信',
        notRead:0
    }
};
export default function messageCenterReducer(state=initialState,action) {
    switch (action.type){
        case 'CLEAR_NOT_READ':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}