<template>
    <div class="Chat" >
        <div class="chatAside">
            <div class="asideInput ">
                <div class="CardInputContainer">
                    <el-autocomplete
                        v-model="state"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        suffix-icon="el-icon-search"
                    ></el-autocomplete>
                    <i class="GroupChat el-icon-plus"></i>
                </div>
            </div>
            <div class="tofixed"></div>
            <div 
            class="asideCard" 
            ref=indexList  
            v-for="(item,index) in chatList" :key="index" 
            @click="changePeople(item.toUserid,index,item)
            ">
                <div class="CardContainer"  >
                    <div class="CardL">
                        <el-badge :value="chatList[index].unread" type="success" class="item" :hidden="!(chatList[index].unread)">
                            <img :src="item.user.headUrl" alt="头像">
                        </el-badge>
                    </div>
                    <div class="CardM">
                        <div>
                            <h4>{{item.user.nick}}</h4>
                            <p>{{lastMessage[index]}}</p>
                        </div>
                    </div>
                    <div class="CardR">
                        <p>{{lastTime[index]}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="chatMain">
            <router-view   @change-msg="changeP"></router-view>
        </div>
    </div>
</template>

<script>
//删除添加节点的方式，onmessage收到的res如果为数组，0，1,2分别处理不同事物，比如0里面的数据用来接收当前用户消息，1里面的数据用来接收未读消息
//当index为1时对获取未读消息的fromID把对应id节点删除掉，再重新添加置顶一个节点
import {searchRequest  , chatListRequest , clearRead , addRead} from '../api/chat'
import {newFriendsRequest} from '../api/Contacts'
import { mapState , mapMutations} from 'vuex'
export default {
    name: 'Chat',
    data() { 
        return {
            state:'',
            searchResults:[],
            selection:'',
            token:'',
            //当前聊天的信息
            itemIndex:'',
            //最后一次系列
            lastMessage:[],
            lastTime:[],
            //信息列表
            chatList:[],
        }
    },
    computed:{
        ...mapState({
            msgTransfer:'msgTransfer',
            sendMsg:'sendMsg',
            nowItem:'nowItem'
        }),
    },
    watch:{
        msgTransfer:function(){
            if(this.msgTransfer.state == 0){
                if(this.$route.params.userID == undefined){
                    //将消息加入到未读中
                    console.log("未读消息")
                    addRead(parseInt(this.msgTransfer.id))
                    this.chatList.forEach((item,index) =>{
                        if(item.id == this.$route.params.userID){
                            item.unread +=1
                            this.changeP(this.msgTransfer.message,index)
                        }
                    })
                }else if(this.$route.params.userID == this.msgTransfer.toUserId){
                    //如果相等吧消息添加到对话框中
                    this.SET_CHATMSG(this.msgTransfer.message)
                }else{
                    //加入未读中
                    addRead(parseInt(this.msgTransfer.id))
                    console.log("不相等")
                    this.chatList.forEach((item) =>{
                        if(item.id == this.$route.params.userID){
                            item.unread +=1
                            item.message = this.msgTransfer.message
                        }
                    })
                }
            }else if(this.msgTransfer.state == 2){
                newFriendsRequest().then((res)=>{
                    // console.log(res)
                    let friendReq = res.friendReq
                    this.SET_FRIENDREQ(friendReq)
                    this.SET_NEWFMSG(friendReq.length)
                })
            }
        },
    },
    mounted(){
        // this.loadResults()
        this.getChatList()
        this.judgeIfAtRoom()
        
        setTimeout(() => {
            this.fromContacts()
        }, 100);
    },
    methods:{
        ...mapMutations([
            'SET_CHATMSG',
            'SET_NOWITEM',
            'SET_CHATTOTALMSG',
            'SUB_CHATTOTALMSG',
            'CLEAR_CHATTOTALMSG',
        ]),
        //判断是否直接跳转聊天界面
        fromContacts(){
            if(this.$route.params.userID){
                this.chatList.forEach( (item,index) =>{
                    if(item.id == this.sendMsg.id){
                        this.chatList.splice(index,1)
                        this.lastTime.splice(index,1)
                        this.lastMessage.splice(index,1)
                        this.chatList.unshift(this.sendMsg)
                        //剪切时间
                        
                        let arr = this.sendMsg.createtime.split("-")
                        const date = new Date()
                        let nowMonth = date.getMonth()
                        if(parseInt(arr[1])==(nowMonth+1)){
                            let nowday = date.getDate()
                            if((nowday-parseInt(arr[2]))>=1){
                                let splittime = this.sendMsg.createtime.split(" ")
                                splittime = splittime[0].split("-")
                                this.sendMsg.createtime = splittime[1]+"-"+splittime[2]
                            }else{
                                let showtime = this.sendMsg.createtime.split(" ")
                                this.sendMsg.createtime = showtime[1]
                            }
                        }
                        this.lastTime.unshift(this.sendMsg.createtime)
                        this.lastMessage.unshift(this.sendMsg.message)
                        this.SET_NOWITEM(this.sendMsg)
                        this.changePeople(this.sendMsg.id,0,this.sendMsg)
                    }
                })
            }
        },
        //时间的剪切
        timeSplice(){
            this.lastTime = this.lastTime.map((item)=>{
                let arr = item.split("-")
                const date = new Date()
                let nowMonth = date.getMonth()
                if(parseInt(arr[1])==(nowMonth+1)){
                    let nowday = date.getDate()
                    if((nowday-parseInt(arr[2]))>=1){
                        let splittime = item.split(" ")
                        splittime = splittime[0].split("-")
                        let showtime = splittime[1]+"-"+splittime[2]
                        return showtime
                    }else{
                        let showtime2 = item.split(" ")
                        return showtime2[1]
                    }
                }
            })
        },
        //改变最后一次的时间和文本,默认为this.itemIndex
        changeP(msg,index = this.itemIndex){
            let date = new Date()
            this.lastMessage[index] = msg
            this.lastMessage.push(" ")
            this.lastTime[index] = date.getHours() +":"+ date.getMinutes()
            this.lastTime.push(" ")
        },
        //判断当前是否处于chatRoom
        judgeIfAtRoom(){
            console.log(this.$route.params.userID == undefined)
            if(this.$route.path == "/Chat"){
                console.log("sss")
            }
        },
        //获取联系人列表
        getChatList(){
                chatListRequest().then((res)=>{
                    if(res.status == 500){
                        this.$message.error(res.msg)
                    }else{
                        let totalMsg = 0
                        console.log(res.chatLists)
                        this.chatList = res.chatLists
                        res.chatLists.forEach((item)=>{
                            // console.log(item.createtime)
                            this.lastTime.push(item.createtime)
                            this.lastMessage.push(item.message)
                            totalMsg += item.unread
                        })
                        this.timeSplice()
                        this.SET_CHATTOTALMSG(totalMsg)
                    }
                }).catch((err)=>{
                    this.$message.error(err)
                })
        },
        //获取搜索框预搜索列表
        // loadResults() {
        //     loadRequest().then((res)=>{
        //         this.searchResults = res.data
        //     })
        // },
        //将搜索值传给后端，后端返回数据，通过.then中的callback反馈到界面
        querySearchAsync(queryString, cb) {
            var searchResults = this.searchResults;
            //如果有queryString则传给后端返回数据，否则使用初始加载的数据
            var results = queryString ? this.getSearchResults(queryString) : searchResults;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 1000);
        },
        getSearchResults(queryString){
            searchRequest({
                queryString
            }).then((res)=>{
                //cb必须为数组
                return res.data
            })
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //当选择之后触发的事件
        handleSelect(item) {
            console.log(item);
        },
        changePeople(userID,index,item){
            //当点击同一次路由后不执行  此时通过route获取的userid为点击之前的所以当没有重复点击时userid也不同
            if(userID != this.$route.params.userID){
                //indexList为ref数组
                // console.log(item)
                clearRead(parseInt(item.id))
                this.SUB_CHATTOTALMSG(this.chatList[index].unread)
                this.chatList[index].unread = 0
                this.SET_NOWITEM(item) 
                this.itemIndex = index
                this.$refs.indexList.forEach(item => {
                    item.style.backgroundColor = ""
                });
                this.$refs.indexList[index].style.backgroundColor = "#C9C6C6"
                this.$router.push(`/Chat/${userID}`)
            }
        },
        
    },
}
</script>
<style lang="scss">
.Chat{
    display: flex;
    .chatAside{
        overflow-y: scroll;
        width: 300px;
        height: 100vh;
        background-color: #EEEAE8;
        .tofixed{
            width: 283px;
            height: 100px;
        }
        .asideInput{
            position: fixed;
            z-index: 10;
            width: 283px;
            height: 100px;
            background-color: #EEEAE8;
            .CardInputContainer{
                margin: 30px 0;
                display: flex;
                justify-content: space-around;
                .el-input__inner{
                    background-color: #DBD9D8;
                }
                .GroupChat{
                    font-size: 40px;
                    border-radius: 10px;
                    background-color: #DBD9D8;
                }
            }
        }
        .asideCard{
            position: relative;
            width: 100%;
            height: 100px;
            // background-color: #CAC7C6;
            .CardContainer{
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 85%;
                height: 70%;
                .CardL,.CardR,.CardM{
                    float: left;
                    height: 100%;
                }
                .CardM{
                    width: calc(100% - 120px);
                    h4,p{
                        margin-left: 10px;
                    }
                    p{
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        margin-top: 20px;
                    }
                }
                .CardR{
                    width: 50px;
                }
                .CardL{
                    width: 70px;
                    img{
                        display: block;
                        width: 70px;
                        height: 70px;
                    }
                }
                p{
                    font-size: 14px;
                    color: #999999;
                }
            }
        }
        .asideCard:hover{
            background-color: #DEDCDB;
        }
    }
    .chatMain{
        flex: 1;
    }
}
</style>