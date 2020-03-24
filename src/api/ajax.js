import axios from 'axios'
// import {baseURL} from './baseURL'

class HttpRequest{
    getInsideConfig(){
        const config={
            baseURL:'/api',
            timeout:1000
        }
        return config
    }
    request(options){
        const instance = axios.create()
        options=Object.assign(this.getInsideConfig(),options)
        this.interceptors(instance)
        return instance(options)
    }
    interceptors(instance){
        //可以在请求相应的时候进行验证头的携带，具体看demo
        instance.interceptors.response.use(res=>{
            const data = res.data
            data.status = res.status
            return data
        },err=>{
            return Promise.reject(err.message)
        })
    }
}
export default HttpRequest