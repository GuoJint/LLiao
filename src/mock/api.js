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
Mock.mock('/api/chat/chatListRequest',{
    data:[
        {
            
            name:Random.csentence( 1, 3 ),
            lastChat:Random.csentence( 1, 13 ),
            time:Random.date("H:mm"),
            img:Random.dataImage(),
            userID:Random.natural(60, 100)
        },
        {
            name:Random.csentence( 1, 3 ),
            lastChat:Random.csentence( 1, 13 ),
            time:Random.date("H:mm"),
            img:Random.dataImage(),
            userID:Random.natural(60, 100)
        },
        {
            name:Random.csentence( 1, 3 ),
            lastChat:Random.csentence( 1, 13 ),
            time:Random.date("H:mm"),
            img:Random.dataImage(),
            userID:Random.natural(60, 100)
        },
        {
            name:Random.csentence( 1, 3 ),
            lastChat:Random.csentence( 1, 13 ),
            time:Random.date("H:mm"),
            img:Random.dataImage(),
            userID:Random.natural(60, 100)
        },
        {
            name:Random.csentence( 1, 3 ),
            lastChat:Random.csentence( 1, 13 ),
            time:Random.date("H:mm"),
            img:Random.dataImage(),
            userID:Random.natural(60, 100)
        },
        {
            name:Random.csentence( 1, 3 ),
            lastChat:Random.csentence( 1, 13 ),
            time:Random.date("H:mm"),
            img:Random.dataImage(),
            userID:Random.natural(60, 100)
        },
        {
            name:Random.csentence( 1, 3 ),
            lastChat:Random.csentence( 1, 13 ),
            time:Random.date("H:mm"),
            img:Random.dataImage(),
            userID:Random.natural(60, 100)
        },
        {
            name:Random.csentence( 1, 3 ),
            lastChat:Random.csentence( 1, 13 ),
            time:Random.date("H:mm"),
            img:Random.dataImage(),
            userID:Random.natural(60, 100)
        },
    ]
})
Mock.mock('/api/Contacts/ContactsListRequestElse',{
    data:[
        {
            
            name:Random.csentence( 1, 3 ),
            lastChat:Random.csentence( 1, 13 ),
            time:Random.date("H:mm"),
            img:Random.dataImage(),
            userID:Random.natural(60, 100)
        },
        {
            name:Random.csentence( 1, 3 ),
            lastChat:Random.csentence( 1, 13 ),
            time:Random.date("H:mm"),
            img:Random.dataImage(),
            userID:Random.natural(60, 100)
        },
    ]
})
Mock.mock('/api/Contacts/ContactsListRequest',{
    data:[
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100),
                region:'ss',
                marker:'aa',
                account:'dd'
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
            {
                chageColor:Random.natural(60, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100),
                region:'ss',
                marker:'aa',
                account:'dd'
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
                chageColor:Random.natural(10, 100),
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
            
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
            
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
            
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
            
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
            
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
            
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
            
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
            
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
            
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
            {
            
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
        [
            {
            
                name:Random.csentence( 1, 3 ),
                lastChat:Random.csentence( 1, 13 ),
                time:Random.date("H:mm"),
                img:Random.dataImage(),
                userID:Random.natural(60, 100)
            },
        ],
    ]
})
Mock.mock('/api/Contacts/search',{
    data:[
        {
            value:'Noble'
        },
        {
            value:'Noble2'
        }
    ]
})
Mock.mock('/api/Contacts/loadRequest',{
    data:[
        {
            value:'Noble4'
        },
        {
            value:'Noble5'
        }
    ]
})

