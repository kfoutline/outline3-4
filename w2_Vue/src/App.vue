<template>
    <div>
        <h1>{{username}}</h1>
    </div>
</template>
<script>
export default {
    data(){
        return {
            username:'laoxie'
        }
    },

    async created(){
        let res = await axios.post('xxx')

        this.username = res.data.username
    }
}
</script>
