import vue from 'vue'
import vueRrouter from 'vue-router'
import routes from './routerConifg'
// import { authorizationRequest } from '../api/login'
// import { getToken,setToken } from '../lib/utils'

vue.use(vueRrouter);
const router = new vueRrouter({
    routes
})

// router.beforeEach((to,form,next)=>{ 
//         authorizationRequest(token).then( () => {   //当用户通过验证后接收rules
//             next()
//         }).catch(() => {   //如果验证token失败过期则跳转login
//             setToken('')
//             next({ name: 'login' })
//         })
// })
export default router