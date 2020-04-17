<template>
    <div class="WechatMoments">
        <Moments-header></Moments-header>
        <router-view></router-view>
    </div>
</template>

<script>
import MomentsHeader from '../components/MomentsHeader.vue'
export default {
    name: 'WechatMoments',
    data() { 
        return {

        }
    },
    components:{
        MomentsHeader,
    }
}
</script>
<style >
.home{
    position: relative;
}
</style>