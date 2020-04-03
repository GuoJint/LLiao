import axios from './index'

export const sendCodeRequest = ()=>{
    return axios.request({
        url:'/register/code',
        method:'post',
        data:{
            "phone":13720904717
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