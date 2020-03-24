import vue from 'vue'
import vueRrouter from 'vue-router'
import routes from './routerConifg'

vue.use(vueRrouter);

export default new vueRrouter({
    routes
})