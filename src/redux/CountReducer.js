export default function counterReducer(state={count:0},action) {
    switch (action.type){
        case 'ADD_COUNT':
            return Object.assign({},state,{
                count:state.count+action.payload
            })
        default:
            return state;
    }
}