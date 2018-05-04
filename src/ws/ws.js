import {ip} from "../settings";

global.ws={};
export function initMWS(){
    let user=store.getState().user;
    if(user.isLogin) {
        ws.mWs = new WebSocket(`ws://${ip}:4441/?user_token=${user.token}`);
        ws.onopen=()=>{
            console.log('已连接');
        };
        ws.onmessage=(e)=>{
            console.log(e.data);
            let data=JSON.parse(e.data);

        };
        ws.onclose=()=>{
            console.log('连接断开');
        };
        ws.onerror=()=>{
            console.log('发生错误');
        }
    }
}