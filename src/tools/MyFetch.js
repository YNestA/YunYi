export default function myFetch(url,opts) {
    if(opts&&opts.timeout){
        let timeOutPromise=new Promise((resolve,reject)=>{
            setTimeout(()=>{
                reject(new Error('Network Timeout '+opts.timeout+'ms'));
            },opts.timeout);
        });
        return Promise.race([timeOutPromise,fetch(url,opts)]);
    }else{
        return fetch(url,opts);
    }

}

export function getFormData(data) {
    let formData=new FormData();
    for( let k in data ){
        formData.append(k,data[k]);
    }
    return formData;
}
export function encodePostParams(params) {
    let kv=[];
    for(let k in params){
        kv.push(encodeURIComponent(k)+'='+encodeURIComponent(params[k]));
    }
    return kv.join('&');
}