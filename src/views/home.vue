<template>
    <div class="home">
        <el-container>
            <el-aside>
                <nav-left-a></nav-left-a>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>

    </div>
</template>

<script>
import NavLeftA from '../components/NavLeftA'
import {getToken} from '../api/chat'
import { mapMutations ,mapState} from 'vuex'
export default {
    name: 'home',
    data() { 
        return {
            loadLoop:''
        }
    },
    mounted(){
        // this.loadNewFriends()
        this.getWSToken()
    },
    computed:{
        ...mapState({
            WS:"WS"
        })
    },
    components:{
        NavLeftA
    },
    methods:{
        ...mapMutations([
            "SET_FRIENDREQ",
            "SET_NEWFMSG",
            "SET_WS",
            "SET_MSGTRANSFER"
        ]),
        //加载新的朋友数据
        // loadNewFriends(){
        //     this.loadLoop =  setInterval(() => {
        //         newFriendsRequest().then((res)=>{
        //             // console.log(res)
        //             let friendReq = res.friendReq
        //             this.SET_FRIENDREQ(friendReq)
        //             this.SET_NEWFMSG(friendReq.length)
        //         })
        //     }, 3000);
        // },
        getWSToken(){
            getToken().then((res)=>{
                this.webscoket(res.token)
            })
        },
        webscoket(token){
            var ws = new WebSocket("ws://www.zzxblog.top:8081/LLiao/socket/websocket/"+token)
            const that = this
            this.SET_WS(ws)

            //接受消息[{state(判断是否已读),unread(未读数),nick,id,message:[{nu:1(1,2来区分1是对方发的,2是我发的),stence:"sss"}]},{},{}]
            this.WS.onmessage = function (evt) 
            {   
                let data = JSON.parse(evt.data)
                console.log(data)
                that.SET_MSGTRANSFER(data)
            };
        }
    },
    destroyed(){
        clearInterval(this.loadLoop)
        this.ws.onclose = function()
            { 
                  // 关闭 websocket
                alert("连接已关闭..."); 
            };
    }
}
</script>
<style lang="scss">
.home{
    .el-container{
        .el-aside{
            height: 100vh;
            width: 120px !important;
        }
        .el-main{
            
            padding: 0;
        }
    }
}
</style>