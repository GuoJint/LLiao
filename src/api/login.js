import axios from './index'
export const loginReuqest = (username,userPassword)=>{
    return axios.request({
        url:'/login',
        method:'post',
        data:{
            username,
            userPassword
        }
    })
}