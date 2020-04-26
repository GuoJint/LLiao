import axios from './index'

export const searchRequest = (queryString) => {
    return axios.request({
        url:'/chat/search',
        method:'post',
        data:{
            queryString
        }
    })
}
export const loadRequest = () => {
    return axios.request({
        url:'/chat/loadRequest',
        method:'get',
    })
}
export const chatListRequest = () => {
    return axios.request({
        url:'/chat/chatListRequest',
        method:'get',
    })
}
export const getToken = ()=>{
    return axios.request({
        url:'/getToken',
        method:'post',
    })
}
//获取更多消息记录
export const getMoreRequest = (toId,page)=>{
    return axios.request({
        url:'/chat/record',
        method:'post',
        data:{
            toId,
            page
        }
    })
}
//消除未读
export const clearRead = (id)=>{
    return axios.request({
        url:'/chat/readMessage',
        method:'post',
        data:{
            id
        }
    })
}
//增加未读
export const addRead = (id)=>{
    return axios.request({
        url:'/chat/unReadMessage',
        method:'post',
        data:{
            id
        }
    })
}