<template>
    <div class="userCard">
            <el-card>
                <div class="CHeader">
                    <div class="CHLeft">
                        <span>{{nowItem.nick}}</span>
                        <p>{{nowItem.Sentence}}</p>
                    </div>
                    <img :src="nowItem.headUrl" alt="">
                </div>
                <div class="CMain">
                    <div>
                        <span>备注</span>
                        <p>{{nowItem.marker}}</p>
                    </div>
                    <div>
                        <span>地区</span>
                        <p>{{nowItem.region}}</p>
                    </div>
                    <div>
                        <span>账号</span>
                        <p>{{nowItem.account}}</p>
                    </div>
                </div>
                <div class="CFooter">
                    <el-button type="success" @click="sendMsg(nowItem.id)">发送消息</el-button>
                </div>
            </el-card>
    </div>
</template>

<script>
import {addChat} from '../api/Contacts'
import { mapMutations } from 'vuex'
export default {
    name: 'userCard',
    props:{
        nowItem:Object
    },
    data() { 
        return {

        }
    },
    methods:{
        //点击发送消息
        ...mapMutations([
            "SET_SENDMSG",
            "SET_CHAT",
            "SET_CONTACTS",
            "SET_NOWROUTER",
            "SET_NOWITEM"
        ]),
        sendMsg(id){
            addChat(id).then((res)=>{
                if(res.status == 500){
                    this.$message.warning(res.msg)
                }else{
                    //在chat中在mounted来判断如果从此页面进入
                    this.SET_CHAT('active') 
                    this.SET_CONTACTS('none') 
                    this.SET_NOWROUTER('Chat')
                    this.SET_NOWITEM(res.chatList)
                    this.$router.push(`/chat/${res.chatList.toUserid}`)
                    
                }
            })
        }
    }
}
</script>
<style lang="scss">
.userCard{
    width: 100%;
    height: 100vh;
    position: relative;
    .el-card{
        position:absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 70%;
        height: 80vh;
        .CHeader{
            display: flex;
            justify-content: space-around;
            .CHLeft{
                span{
                    font-size: 20px;
                }
                p{
                    margin-top: 20px;
                    font-size: 13px;
                    color: #999999;
                }
            }
            img{
                width: 80px;
                height: 80px;
            }
        }
        .CMain{
            width: 100%;
            height: 45vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            div{
                margin-bottom: 20px;
                span{
                    color: #9999B9;
                    margin-right: 140px;
                }
                p{
                    display: inline-block;

                }
            }
        }
        .CFooter{
            display: flex;
            justify-content: center;
        }
    }
}
</style>