import axios from 'axios';

const apiserver = axios.create({
    baseURL:'http://localhost:3000'
})

export async function get(url,params){
    let {data} = await apiserver.get(url,{
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

export default {
    post,
    delete:remove,
    patch,
    get
}