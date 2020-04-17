<template>
    <div class="chatRoom" @click="test">
        <el-container>
            <el-header>
                <p>{{nowItem.user.nick}}</p>

            </el-header>
            <el-main>
                <div class="Left" v-for="(item,index) in fromMessage" :key="index">
                    <div class="LContainer">
                        <img :src="nowItem.user.headUrl" alt="">
                        <p>{{item}}</p>
                    </div>
                </div>
                <div class="Right" v-for="(item,index) in tomessage" :key="'Right-'+index">
                    <div class="RContainer">
                        <p>{{item}}</p>
                        <img :src="myHeadImg" alt="">
                    </div>
                </div>
                
            </el-main>
            <el-footer>
                <div class="tools">
                    <div class="toolLeft">
                        <i class="iconfont">&#xe613;</i>
                        <i class="el-icon-folder-opened"></i>
                        <i class="el-icon-scissors"></i>
                        <i class="el-icon-chat-dot-round"></i>
                    </div>
                    <div class="toolRight">
                        <i class="iconfont">&#xe659;</i>
                        <i class="iconfont">&#xe617;</i>
                    </div>
                </div>
                <el-input
                id="sendmsgBykey"
                type="textarea"
                resize="none"
                v-model="textarea"
                >
                </el-input>
                <button class="sendButton" @click="sendByClick">发送消息</button>
            </el-footer>
        </el-container>
        
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'chatRoom',
    props:{
        nowItem:Object,
        
    },
    data() { 
        return {
            userID:'',
            textarea:'',
            fromMessage:["sss","aaa"],
            tomessage:["wowo"]

        }
    },
    computed:{
        ...mapState({
            WS:"WS",
            myHeadImg:"myHeadImg"
        })
    },
    mounted(){
        this.submit()
    },
    methods:{
        test(){
            console.log(this.$route.params.userID)
        },
        //在mounted阶段调用一次，在路由更新时调用一次
        initMessage(){
            //调用接口初始化更新fromtoMssage
        },
        submit(){
            document.getElementById('sendmsgBykey').addEventListener('keydown',(event)=>{
                if(event.ctrlKey &&event.keyCode ==13){
                    console.log(this.WS)
                    this.WS.send(`{chatListId: ${this.nowItem.id}, message: "${this.textarea}", state: 0, toUserId: ${this.nowItem.toUserid}, userId: ${this.nowItem.fromUserid}}`)
                    this.tomessage.push(this.textarea)
                    this.textarea = ""
                }
            })
        },
        sendByClick(){
            this.WS.send(this.textarea)
            this.tomessage.push(this.textarea)
            this.textarea = ""
        }
    },
    watch:{
        $route:function(to){
            this.fromMessage = []
            this.tomessage = []
            this.userID = to.params.userID
        }
    },
    beforeRouteUpdate (next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
        this.initMessage()
        next()
    },
}
</script>
<style lang="scss">
.chatRoom{
    height: 100vh;
    display: flex;
    .el-header{
        background-color: #F5F5F5;
        height:100px !important;
        border-bottom: 1px solid #E7E7E7;
        p{
            line-height: 100px;
            font-size: 20px;
        }
    }
    .el-main{
        flex: 1;
        background-color: #F5F5F5;
        .Left{
            margin-top:10px;
            width: 100%;
            height: 40px;
            .LContainer{
                float: left;
                display: flex;
                img{
                    width: 40px;
                    height: 40px;
                }
                p{
                    background-color: #FFFFFF;
                    font-size: 18px;
                    height: 20px;
                    padding: 10px;
                    margin-left: 15px;
                    border-radius: 5px;
                }
            }
        }
        .Right{
            margin-top:10px;
            width: 100%;
            height: 60px;
            .RContainer{
                float: right;
                display: flex;
                img{
                    width: 40px;
                    height: 40px;
                }
                p{
                    background-color: #98E165;
                    font-size: 18px;
                    height: 20px;
                    padding: 10px;
                    margin-right: 15px;
                    border-radius: 5px;
                }
            }
        }
    }
    .el-footer{
        height: 200px !important;
        position: relative;
        .tools{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            i{
                font-size: 20px;
                margin: 0 10px;
                color: #767676;
                cursor: pointer;
            }
        }
        .el-textarea{
            .el-textarea__inner{
                height: 150px;
                padding: 5px 10px;
                border: none;
                color: #000000;
                font-size: 18px;
            }
        }
        .sendButton{
            position: fixed;
            right: 20px;
            bottom: 20px;
            width: 80px;
            height: 30px;
            background-color: #F5F5F5;
            border: 1px solid #E5E5E5;
        }
        .sendButton:hover{
            background-color: #98E165;
        }
    }
}
</style>