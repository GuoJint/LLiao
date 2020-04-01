import axios from './index'
export const loginReuqest = (acount,userPassword)=>{
    return axios.request({
        url:'/login',
        method:'post',
        data:{
            acount,
            userPassword
        }
    })
}
export const authorizationRequest = (token)=>{
    return axios.request({
        url:'/authorization',
        method:'post',
        data:{
            token
        }
    })
}