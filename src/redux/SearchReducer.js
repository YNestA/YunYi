const initialState={
    keyword:'',
    showHotWords:true,
    hotWords:['围棋','eva','笑傲江湖','异度之刃','拜仁慕尼黑','dota2','支持热更新','川端康成','浪客剑心'],
    result:{
        users:[],
        passages:[]
    }
};
export default function searchReducer(state=initialState,action) {
    switch(action.type){
        case 'SEARCH':
            return Object.assign({},state,action.payload);
        default:
            return state;
    }
}