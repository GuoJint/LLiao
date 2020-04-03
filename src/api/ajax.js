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
                console.log(data)
                for (let it in data) {
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
        // instance.interceptors.request.use(
        //     config => {
        //       // POST传参序列化
        //       console.log(config)
        //       if (config.method === "post") {
        //         config.data = JSON.stringify(config.data);
        //         console.log(config.data)
        //       }
        //       return config;
        //     },
        //     error => {
        //       return Promise.reject(error);
        //     }
        //   );
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