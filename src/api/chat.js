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
export const chatListRequest = (userID) => {
    return axios.request({
        url:'/chat/chatListRequest',
        method:'psot',
        data:{
            userID
        }
    })
}