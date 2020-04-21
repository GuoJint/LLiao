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