import axios from './index'

export const ContactsListRequest = (userID)=>{
    return axios.request({
        url:'/Contacts/ContactsListRequest',
        method:'post',
        data:{
            userID
        }
    })
}
export const ContactsListRequestElse = (userID)=>{
    return axios.request({
        url:'/Contacts/ContactsListRequestElse',
        method:'post',
        data:{
            userID
        }
    })
}
export const searchRequest = (queryString) => {
    return axios.request({
        url:'/Contacts/search',
        method:'post',
        data:{
            queryString
        }
    })
}
export const loadRequest = () => {
    return axios.request({
        url:'/Contacts/loadRequest',
        method:'get',
    })
}