const routes = [
    {
        path:'/',
        name:'home',
        component:()=>import('../views/home.vue'),
        redirect:'/Chat',
        children:[
            {
                path:'/Chat',
                name:'Chat',
                component:()=>import('../views/Chat.vue'),
                children:[
                    {
                        path:':userID',
                        component:()=>import('../components/chatRoom.vue'),
                    }
                    
                ]
            },
            {
                path:'/Contacts',
                name:'Contacts',
                component:()=>import('../views/Contacts.vue'),
                children:[
                    {
                        path:':userID',
                        component:()=>import('../components/userCard.vue'),
                    },
                ]
            },
            {
                path:'/WechatMoments',
                name:'WechatMoments',
                component:()=>import('../views/WechatMoments.vue'),
                children:[
                    {
                        path:'MomentsShow',
                        name:'MomentsShow',
                        component:()=>import('../components/MomentsShow.vue'),
                    },
                    {
                        path:'MomentsMange',
                        name:'MomentsMange',
                        component:()=>import('../components/MomentsMange.vue'),
                    },
                ]
            },
        ]
    },
    // {
    //     path:'/editHome',
    //     name:'editHome',
    //     component:()=>import('../views/editHome.vue'),
    //     redirect:'/articleEdit',
    //     children:[
    //         {
    //             path:'/articleEdit',
    //             name:'articleEdit',
    //             component:()=>import('../views/articleEdit.vue'),
    //         },
    //     ]
    // },
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/login.vue'),
    },
    {
        path:'/register',
        name:'register',
        component:()=>import('../views/register.vue'),
    },
    {
        path:'*',
        name:'404-NotFound',
        component:()=>import('../views/404.vue'),
    }
]
export default routes