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