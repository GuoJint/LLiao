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
export default {
    name: 'home',
    data() { 
        return {

        }
    },
    components:{
        NavLeftA
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
    }
}
</style>