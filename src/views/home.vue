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
// import {newFriendsRequest} from '../api/Contacts'
import { mapMutations} from 'vuex'
export default {
    name: 'home',
    data() { 
        return {
            loadLoop:''
        }
    },
    mounted(){
        // this.loadNewFriends()
    },
    components:{
        NavLeftA
    },
    methods:{
        ...mapMutations([
            "SET_FRIENDREQ",
            "SET_NEWFMSG"
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
    },
    destroyed(){
        clearInterval(this.loadLoop)
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