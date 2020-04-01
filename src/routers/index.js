import vue from 'vue'
import vueRrouter from 'vue-router'
import routes from './routerConifg'
import { authorizationRequest } from '../api/login'
import { getToken,setToken } from '../lib/utils'

vue.use(vueRrouter);
const router = new vueRrouter({
    routes
})

router.beforeEach((to,form,next)=>{
    const token = getToken()
    if (token) {   //判断token是否为空如果为空则为false，执行else语句,跳转到login页面
        authorizationRequest(token).then( () => {   //当用户通过验证后接收rules
            next()
        }).catch(() => {   //如果验证token失败过期则跳转login
            setToken('')
            next({ name: 'login' })
        })
    } else {
      if (to.name === 'login') next() // 判断如果用户前往页面为login页面则继续
      else next({ name: 'login' })   //否则强制跳转为login页面
    }
})
export default router