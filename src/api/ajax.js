import axios from 'axios'
// import {baseURL} from './baseURL'

class HttpRequest{
    getInsideConfig(){
        const config={
            baseURL:'http://www.zzxblog.top:8081/LLiao',
            withCredentials: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
            },
            transformRequest : [function (data) {
                let ret = ''
                for (let it in data) {
                    // console.log(it+"  "+data[it])
                    // console.log(encodeURIComponent(it)+"  "+encodeURIComponent(data[it]))
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
            // headers: {'X-Requested-With': 'XMLHttpRequest'},
            // timeout:1000
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
            let data = res.data.extend
            data.status = res.data.code
            data.msg = res.data.mag
            return data
        },err=>{
            console.log(err)
            return Promise.reject(err)
        })
    }
}
export default HttpRequest