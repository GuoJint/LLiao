import axios from './index'

//用户列表
export const ContactsListRequest = ()=>{
    return axios.request({
        url:'/friends',
        method:'post',
    })
}
//添加好友的请求
export const searchUserRequest = (name,queryString) => {
    return axios.request({
        url:`/friends/${name}`,
        method:'get',
        params:{
            queryString
        }
    })
}
//添加确认的请求
export const searchUserConfirm = (id,nick,message) => {
    return axios.request({
        url:`/friends/${id}`,
        method:'post',
        data:{
            nick,
            message
        }
    })
}
//新的朋友列表请求
export const newFriendsRequest = () => {
    return axios.request({
        url:'/friends/reqed',
        method:'get',
    })
}
//新的朋友是否接受请求
export const ifAcceptRequest = (id,status) => {
    return axios.request({
        url:`/friends/add/${id}`,
        method:'post',
        data:{
            status
        }
    })
}
//查询好友请求
export const searchListRequest = (queryString) => {
    return axios.request({
        url:'/Contacts/search',
        method:'post',
        data:{
            queryString
        }
    })
}
//初始查询
export const loadRequest = () => {
    return axios.request({
        url:'/Contacts/loadRequest',
        method:'get',
    })
}
//发起聊天请求
export const addChat = (toid) => {
    return axios.request({
        url:'/chat/add/list',
        method:'post',
        data:{
            toid
        }
    })
}