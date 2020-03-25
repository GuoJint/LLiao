var Mock = require('mockjs')

var Random =  Mock.Random

Mock.setup({
    timeout: '400-800'
})

//登录注册
Mock.mock('/api/login',{
    data:{
        token:Random.string('number',6),
    }
})
Mock.mock('/api/register/code',{
    data:{
        message:'验证码已发送'
    }
})
Mock.mock('/api/register',{
    data:{
        message:'注册成功'
    }
})

//chat
Mock.mock('/api/chat/search',{
    data:[
        {
            value:'Noble'
        },
        {
            value:'Noble2'
        }
    ]
})
Mock.mock('/api/chat/loadRequest',{
    data:[
        {
            value:'Noble4'
        },
        {
            value:'Noble5'
        }
    ]
})

