<template>
    <div class="Chat">
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
                <div class="CardContainer">
                    <div class="CardL">
                        <img :src="item.user.headUrl" alt="头像">
                    </div>
                    <div class="CardM">
                        <div>
                            <h4>{{item.user.nick}}</h4>
                            <p>{{lastmessage}}</p>
                        </div>
                    </div>
                    <div class="CardR">
                        <p>{{lastTime[index]}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="chatMain">
            <router-view :nowItem="nowItem" :message="message"></router-view>
        </div>
    </div>
</template>

<script>
//删除添加节点的方式，onmessage收到的res如果为数组，0，1,2分别处理不同事物，比如0里面的数据用来接收当前用户消息，1里面的数据用来接收未读消息
//当index为1时对获取未读消息的fromID把对应id节点删除掉，再重新添加置顶一个节点
import {searchRequest  , chatListRequest } from '../api/chat'
import { mapState } from 'vuex'
export default {
    name: 'Chat',
    data() { 
        return {
            state:'',
            searchResults:[],
            chatList:[],
            selection:'',
            nowItem:'',
            token:'',
            //聊天消息
            message:'',
            //最后一次系列
            lastmessage:'',
            lastTime:[]
        }
    },
    computed:{
        ...mapState({
            msgTransfer:'msgTransfer'
        })
    },
    watch:{
        msgTransfer:function(){
            console.log(this.msgTransfer)
            console.log("后端传过来的消息的ID："+this.msgTransfer.toUserId)
            console.log("我所在的当前页面的ID："+this.$route.params.userID)
            if(this.$route.params.userID == undefined){
                //将消息加入到未读中
                console.log("未读消息")
            }else if(this.$route.params.userID == this.msgTransfer.toUserId){
                //如果相等吧消息添加到对话框中
                this.message = this.msgTransfer.message
            }else{
                //加入未读中
                console.log("不相等")
            }
        }
    },
    mounted(){
        // this.loadResults()
        this.getChatList()
        this.judgeIfAtRoom()
    },
    methods:{
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
                        this.chatList = res.chatLists
                        // setInterval(() => {
                        //     this.chatList.push({"id":10,"fromUserid":2,"toUserid":1,"createtime":"2020-04-14 20:50:56","message":null,"unread":0,"user":{"id":1,"acount":"a1227ee","headUrl":"http://images.nowcoder.com/head/132t.png","nick":"张大爷","autograph":null,"region":null,"comments":null}})
                        // }, 2000);
                        res.chatLists.forEach((item)=>{
                            // console.log(item.createtime)
                            this.lastTime.push(item.createtime)
                        })
                        this.lastTime = this.lastTime.map((item)=>{
                            // console.log(item)
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
                                    // console.log(showtime2)
                                }
                            }
                        })
                    }
                    
                    // console.log(this.lastTime)
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
                console.log(item)
                this.nowItem = item
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