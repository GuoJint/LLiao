<template>
    <div class="home">
        <nav-left-a></nav-left-a>
        <router-view></router-view>
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