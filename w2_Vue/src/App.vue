<template>
    <div>
        <h1>{{username}}</h1>
        <Swiper/>
    </div>
</template>
<script>
import Swiper from './components/Swiper.vue';
export default {
    data(){
        return {
            username:'laoxie'
        }
    },

    async created(){
        
    },
    components:{
        Swiper
    }
}
</script>
