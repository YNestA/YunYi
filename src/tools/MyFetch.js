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