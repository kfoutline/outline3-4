import axios from 'axios';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();console.log('source',source)

const apiserver = axios.create({
    cancelToken: source.token,
    baseURL:'http://localhost:3000'
})

export async function get(url,params,config={}){
    let {data} = await apiserver.get(url,{
        ...config,
        params
    });

    return data;
}

export async function post(url,params){
    let {data} = await apiserver.post(url,params);

    return data;
}

export async function patch(url,params){
    let {data} = await apiserver.patch(url,params);

    return data;
}

export async function remove(url,params){
    let {data} = await apiserver.delete(url,params);

    return data;
}

// 取消请求发送
export function cancel(){
    source.cancel();
}

export default {
    post,
    remove,
    patch,
    get,
    cancel
}