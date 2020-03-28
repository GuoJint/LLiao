<template>
    <div class="chatRoom" @click="test">
        {{userID}}
        
    </div>
</template>

<script>
export default {
    name: 'chatRoom',
    data() { 
        return {
            userID:''
        }
    },
    methods:{
        test(){
            console.log(this.$route.params.userID)
        }
    },
    watch:{
        $route:function(val){
            this.userID = val.params.userID
        }
    }
}
</script>