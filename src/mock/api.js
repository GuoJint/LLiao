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

//文章详情

Mock.mock('/api/searchAry',{
    data:
        [
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        ]
    
})


Mock.mock('/api/articleListShow',{
    pageSize:7,
    total:70,
    Page:1,
    data:{
        articleList:[
            {
                username:"gjt",
                articleID:1001,
                userID:12,
                title:'Vue原理',
                article:'Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。',
                time:Random.date('yyyy-M-d'),
                good:Random.integer(1,100),
                watched:Random.integer(100,10000),
                comment:Random.integer(1,100),
            },
            {
                username:"gjt2",
                articleID:1015,
                userID:31,
                title:'v-bind9',
                article:"这里我们遇到了一点新东西。点新东西点新东西点新东西点新东西点新东西点新东西点新东西你看到的 v-bind attribute 被称为指令。指令带有前缀 bind attribute 被称为指令。指令带有前缀 bind attribute 被称为指令。指令带有前缀 bind attribute 被称为指令。指令带有前缀 bind attribute 被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊 attribute。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。在这里，该指令的意思是：“将这个元素节点的 title attribute 和 Vue 实例的 message 属性保持一致”。如果你再次打开浏览器的 JavaScript 控制台，输入 app2.message = '新消息'，就会再一次看到这个绑定了 title attribute 的 HTML 已经进行了更新。",
                time:Random.date('yyyy-M-d'),
                good:Random.integer(1,100),
                watched:Random.integer(100,10000),
                comment:Random.integer(1,100),
            },
            {
                username:"gjt3",
                articleID:1015,
                userID:31,
                title:'v-bind7',
                article:"这里我们遇到了一点新东西。你看到的 v-bind attribute 被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊 attribute。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。在这里，该指令的意思是：“将这个元素节点的 title attribute 和 Vue 实例的 message 属性保持一致”。如果你再次打开浏览器的 JavaScript 控制台，输入 app2.message = '新消息'，就会再一次看到这个绑定了 title attribute 的 HTML 已经进行了更新。",
                time:Random.date('yyyy-M-d'),
                good:Random.integer(1,100),
                watched:Random.integer(100,10000),
                comment:Random.integer(1,100),
            }
            ,
            {
                username:"gjt",
                articleID:1015,
                userID:31,
                title:'v-bind5',
                article:"这里我们遇到了一点新东西。你看到的 v-bind attribute 被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊 attribute。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。在这里，该指令的意思是：“将这个元素节点的 title attribute 和 Vue 实例的 message 属性保持一致”。如果你再次打开浏览器的 JavaScript 控制台，输入 app2.message = '新消息'，就会再一次看到这个绑定了 title attribute 的 HTML 已经进行了更新。",
                time:Random.date('yyyy-M-d'),
                good:Random.integer(1,100),
                watched:Random.integer(100,10000),
                comment:Random.integer(1,100),
            }
            ,
            {
                username:"gjt",
                articleID:1015,
                userID:31,
                title:'v-bind4',
                article:"这里我们遇到了一点新东西。你看到的 v-bind attribute 被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊 attribute。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。在这里，该指令的意思是：“将这个元素节点的 title attribute 和 Vue 实例的 message 属性保持一致”。如果你再次打开浏览器的 JavaScript 控制台，输入 app2.message = '新消息'，就会再一次看到这个绑定了 title attribute 的 HTML 已经进行了更新。",
                time:Random.date('yyyy-M-d'),
                good:Random.integer(1,100),
                watched:Random.integer(100,10000),
                comment:Random.integer(1,100),
            }
            ,
            {
                username:"gjt",
                articleID:1015,
                userID:31,
                title:'v-bind2',
                article:"这里我们遇到了一点新东西。你看到的 v-bind attribute 被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊 attribute。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。在这里，该指令的意思是：“将这个元素节点的 title attribute 和 Vue 实例的 message 属性保持一致”。如果你再次打开浏览器的 JavaScript 控制台，输入 app2.message = '新消息'，就会再一次看到这个绑定了 title attribute 的 HTML 已经进行了更新。",
                time:Random.date('yyyy-M-d'),
                good:Random.integer(1,100),
                watched:Random.integer(100,10000),
                comment:Random.integer(1,100),
            }
            ,
            {
                username:"gjt",
                articleID:1015,
                userID:31,
                title:'v-bind3',
                article:"这里我们遇到了一点新东西。你看到的 v-bind attribute 被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊 attribute。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。在这里，该指令的意思是：“将这个元素节点的 title attribute 和 Vue 实例的 message 属性保持一致”。如果你再次打开浏览器的 JavaScript 控制台，输入 app2.message = '新消息'，就会再一次看到这个绑定了 title attribute 的 HTML 已经进行了更新。",
                time:Random.date('yyyy-M-d'),
                good:Random.integer(1,100),
                watched:Random.integer(100,10000),
                comment:Random.integer(1,100),
            }
        ]
    }
})

//文章编辑
Mock.mock('/api/editHome/articleEdit',{
    data:{
        message:'已经保存至草稿箱'
    }
})
