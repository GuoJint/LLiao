import axios from './index'

export const sendCodeRequest = (phone)=>{
    return axios.request({
        url:'/register/code',
        method:'post',
        data:{
            phone
        }
    })
}
export const registerRequest = (acount,userPassword,phone,code)=>{
    return axios.request({
        url:'/register',
        method:'post',
        data:{
            acount,
            userPassword,
            phone,
            code
        }
    })
} 