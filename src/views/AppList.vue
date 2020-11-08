<template>
    <div id='AppListFrame'>
        <AppItem v-for="app in apps" :key="app.id" 
            :appid="app.id" :name="app.name" :price="app.price" :oriprice="app.oriprice"
            :rating="app.rating" :tags="app.tags" :iconType="app.iconType"/>
    </div>
</template>


<script>
import AppItem from '@/components/home/AppItem.vue';
import axios from 'axios';
export default {
    name: 'AppList',
    data() {
        return {
            apps: []
        }
    },
    components: {AppItem},
    methods: {
        search(appname) {
            axios.get('/search', {
                params: {
                    name : appname
                }
            }).then((res)=>{
                if (res.data.success) {
                    this.apps = res.data.apps;
                } else {
                    console.error('查询时遇到错误：', res.data);
                }
            });
        }
    }
}
</script>


<style scoped>
</style>