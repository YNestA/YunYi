const initialState = {
    content:[]
};


export default function MineViewArticleReducer(state = initialState, action) {
    switch (action.type) {
        case 'MINE_VIEW_ARTICLE':
            console.log('this is passagReducer', action.payload.passageMineViewDetail);
            return Object.assign({}, state, action.payload.passageMineViewDetail);
        default:
            return state;
    }
}