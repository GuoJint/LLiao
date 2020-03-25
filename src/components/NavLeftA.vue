<template>
    <div class="NavLeftA">
        <img class="HeadPortrait" src="../assets/img1.jpg" alt="头像">
        <i class="iconfont" :class="Chat" @click="toChat">&#xe624;</i>
        <i class="iconfont" :class="Contacts" @click="toContacts">&#xe605;</i>
        <i class="iconfont" :class="WechatMoments" @click="toWechatMoments">&#xe61f;</i>
        <i class="iconfont setting" >&#xe643;</i>
    </div>
</template>

<script>
export default {
    name: 'NavLeftA',
    data() { 
        return {
            nowRouter:'',
            Chat:'active',
            Contacts:'',
            WechatMoments:'',
        }
    },
    mounted(){
    },
    methods:{
        changeColor(){
            if(this.nowRouter == "Chat"){
                this.Chat = 'active'
                this.Contacts = 'none'
                this.WechatMoments = 'none'
            }else if(this.nowRouter == "Contacts"){
                this.Chat = 'none'
                this.Contacts = 'active'
                this.WechatMoments = 'none'
            }else if(this.nowRouter == "WechatMoments"){
                this.Chat = 'none'
                this.Contacts = 'none'
                this.WechatMoments = 'active'
            }
        },
        toChat(){
            if(this.nowRouter !== 'Chat'){
                this.nowRouter = 'Chat'
                this.changeColor()
                this.$router.push('Chat')
            }
        },
        toContacts(){
            if(this.nowRouter !== 'Contacts'){
                this.nowRouter = 'Contacts'
                this.changeColor()
                this.$router.push('Contacts')
            }
        },
        toWechatMoments(){
            if(this.nowRouter !== 'WechatMoments'){
                this.nowRouter = 'WechatMoments'
                this.changeColor()
                this.$router.push('WechatMoments')
            }
        }
    },
    watch:{
    }
}
</script>
<style lang="scss">
.NavLeftA{
    height: 100%;
    background-color: #27282C;
    position: relative;
    i{
        display: block;
        cursor: pointer;
        color: #7F7F80;
        font-size: 40px;
        margin: 0 40px 35px 40px;
    }
    .HeadPortrait{
        width: 70px;
        height: 70px;
        margin: 35px 25px;
    }
    .setting{
        margin: 0;
        position: absolute;
        bottom: 20px;
        left: 40px;
    }
    .active{
        color: #07C160;
    }
}
</style>