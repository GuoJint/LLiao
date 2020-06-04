<template>
    <div class="chatRoom" >
        <el-container>
            <el-header>
                <p>{{nowItem.user.nick}}</p>
            </el-header>
            <el-main id="chat">
                <div class="loadMore">
                    <i class="el-icon-loading" v-show="loading"></i>
                    <p class="more" @click="loadMore" v-if="noMore" v-show="!loading">加载更多</p>
                </div>
                <div :class="item.style1" v-for="(item,index) in messageAry" :key="index">
                    <div :class="item.style2" >
                        <img :src="nowItem.user.headUrl" v-if="item.style3" alt="">
                        <p>{{item.message}}</p>
                        <img :src="myHeadImg" v-if="!item.style3" alt="">
                    </div>
                </div>
                
            </el-main>
            <el-footer>
                <div class="tools">
                    <div class="toolLeft">
                        <!-- <el-popover
                        placement="top-start"
                        width="400"
                        trigger="click">
                        <img src="../assets/img1.jpg" style="width:100px;height:100px;" alt="">
                        <el-button slot="reference"><i class="iconfont">&#xe613;</i></el-button>
                        </el-popover> -->
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
                <textarea ref="sendInput" class="userTextarea" v-model="textarea" cols="64" rows="7.5"></textarea>
                <button class="sendButton" @click="sendByClick">发送消息</button>
            </el-footer>
        </el-container>
        
    </div>
</template>

<script>
import {mapState , mapMutations} from 'vuex'
import { getMoreRequest } from '../api/chat'
export default {
    name: 'chatRoom',
    data() { 
        return {
            loading:false,
            noMore:true,
            loadMorePage:0,
            textarea:'',
            //timeOut设置loadmore延迟时间，timeflag判断是否是初次加载
            tiemOut:0,
            timeFlag:true,
            //消息数组
            messageAry:[]
        }
    },
    computed:{
        ...mapState({
            WS:"WS",
            myHeadImg:"myHeadImg",
            chatMsg:"chatMsg",
            nowItem:'nowItem',
        })
    },
    mounted(){
        this.submit()
        this.loadMore()
    },
    // beforeRouteEnter(to,from,next){
    //     console.log(to)
    //     console.log(from)
    //     if(from.matched[1].path != "/Contacts"){
    //         next()
    //     }
    // },
    methods:{
        ...mapMutations([
            'CLEAR_CHATMSG'
        ]),
        //
        //加载消息记录
        loadMore(){
            if(this.timeFlag){
                this.tiemOut=600
                this.timeFlag = false
            }
            //调用接口往mssageAry中使用unshift添加数据
            getMoreRequest(parseInt(this.nowItem.toUserid),this.loadMorePage).then((res)=>{
                
                if(res.status == 200){
                    this.loading = true
                    setTimeout(() => {
                        res.record.forEach(item => {
                            // console.log(item)
                            if(this.nowItem.toUserid !== item.userId){
                                this.messageAry.unshift({style1:"Right",style2:"RContainer",style3:false,message:`${item.message}`})
                            }else{
                                this.messageAry.unshift({style1:"Left",style2:"LContainer",style3:true,message:`${item.message}`})
                            }
                        });
                        this.loadMorePage += 1
                        this.loading = false
                    }, this.tiemOut);
                }else{
                    this.$message({
                        message: '暂时任何没有聊天记录.',
                        type: 'warning'
                    });
                    this.noMore = false
                }
                
            })
        },
        //在mounted阶段调用一次，在路由更新时调用一次
        initMessage(){
            this.messageAry = []
            this.loadMorePage = 0
            //调用接口初始化更新fromtoMssage
        },
        submit(){
            // let that = this
            this.$refs.sendInput.addEventListener('keydown',(event)=>{
                if(event.ctrlKey &&event.keyCode ==13){
                    this.textarea += '\n\r'
                }else if(event.keyCode ==13){
                                        console.log("fasong")
                    if(this.textarea == ""){
                        this.$message.warning("发送消息不能为空")
                    }else{
                        this.WS.send(`{"chatListId":${this.nowItem.id},"message":"${this.textarea}","state":0,"toUserId":${this.nowItem.toUserid},"userId":${this.nowItem.fromUserid}}`)
                        this.messageAry.push({style1:"Right",style2:"RContainer",style3:false,message:`${this.textarea}`})
                        this.$emit('change-msg',this.textarea)
                        this.textarea = ""
                        setTimeout(() => {
                            const chat = document.getElementById('chat')
                            chat.scrollTop = chat.scrollHeight
                        }, 100);
                    }
                }
            })
        },
        sendByClick(){
            this.WS.send(`{"chatListId":${this.nowItem.id},"message":"${this.textarea}","state":0,"toUserId":${this.nowItem.toUserid},"userId":${this.nowItem.fromUserid}}`)
            this.messageAry.push({style1:"Right",style2:"RContainer",style3:false,message:`${this.textarea}`})
            this.$emit('change-msg',this.textarea)
            this.textarea = ""
            const chat = document.getElementById('chat')
            chat.scrollTop = chat.scrollHeight
        }
    },
    watch:{
        $route:function(to){
            this.userID = to.params.userID
        },
        chatMsg:function(){
            
            if(this.chatMsg !== ""){
                this.messageAry.push({style1:"Left",style2:"LContainer",style3:true,message:`${this.chatMsg}`})
                setTimeout(() => {
                    const chat = document.getElementById('chat')
                    chat.scrollTop = chat.scrollHeight
                }, 100);
            }
            this.CLEAR_CHATMSG()
        }
    },
    beforeRouteUpdate (to,from,next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        this.initMessage(to,from)
        this.loadMore()
        this.tiemOut = 0
        this.timeFlag = true
        this.noMore = true
        next()
    },
    beforeDestroy(){
        this.initMessage()
        console.log(`${this.messageAry}离开`)
    }
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
        .loadMore{
            width: 100%;
            .more,.el-icon-loading{
                text-align: center;
                color: #98E165;
                cursor: pointer;
            }
            .el-icon-loading{
                width: 100%;
            }
        }
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
        .userTextarea{
                resize:none;
                border: none;
                color: #000000;
                font-size: 18px;
        }
        .userTextarea:focus {
            outline: none;
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