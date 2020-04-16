import vue from 'vue'
import vueRrouter from 'vue-router'
import routes from './routerConifg'
import { authorizationRequest } from '../api/login'
// import { getToken,setToken } from '../lib/utils'

vue.use(vueRrouter);
const router = new vueRrouter({
    routes
})

router.beforeEach((to,form,next)=>{ 
        if(to.name == "login"){
            next()
        }else{
            authorizationRequest().then( (res) => {   //当用户通过验证
                if( res.status == 500){
                    next({ name: 'login' })
                }else{
                    next()
                }
                // console.log(res)
                
            }).catch(() => {   //如果验证token失败则跳转login
                next({ name: 'login' })
            })
        }
})
export default router