import {ip} from "../settings";

global.ws={};
export function initMWS(){
    let user=store.getState().user;
    if(user.isLogin) {
        try {
            let mWs = new WebSocket(`ws://${ip}:4441/websocket/${user.token}`);
            mWs.onopen = () => {
                //mWs.send('GetAll');
            };
            mWs.onmessage = (e) => {
                //alert(e.data);
                let messageCenter=store.getState().MessageCenter,
                    data = JSON.parse(e.data);
                switch(data.type){
                    case 'AllMessage':
                        store.dispatch({
                            type:'UPDATE_NOT_READ',
                            payload:{
                                concern:Object.assign({},messageCenter.concern,{
                                    notRead:messageCenter.concern.notRead+data.payload.followNum
                                }),
                                thumb:Object.assign({},messageCenter.thumb,{
                                    notRead:messageCenter.thumb.notRead+data.payload.likeNum
                                }),
                                comment:Object.assign({},messageCenter.comment,{
                                    notRead:messageCenter.comment.notRead+data.payload.commentNum
                                })
                            }
                        });
                        break;
                    case 'FollowMessage':
                        store.dispatch({
                            type:'UPDATE_NOT_READ',
                            payload:{
                                concern:Object.assign({},messageCenter.concern,{
                                    notRead:messageCenter.concern.notRead+data.payload
                                }),
                            }
                        });
                        break;
                    case 'LikeMessage':
                        store.dispatch({
                            type:'UPDATE_NOT_READ',
                            payload:{
                                thumb:Object.assign({},messageCenter.thumb,{
                                    notRead:messageCenter.thumb.notRead+data.payload
                                }),
                            }
                        });
                        break;
                    case 'CommentMessage':
                        store.dispatch({
                            type:'UPDATE_NOT_READ',
                            payload:{
                                comment:Object.assign({},messageCenter.comment,{
                                    notRead:messageCenter.comment.notRead+data.payload
                                }),
                            }
                        });
                        break;
                }
            };
            mWs.onclose = () => {
                console.log('连接断开');
            };
            mWs.onerror = () => {
                console.log('发生错误');
            };
            ws.mWs=mWs;
        }
        catch (err){
            console.log(err);
        }
    }
}