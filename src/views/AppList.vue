<template>
    <div id='AppListFrame'>
        <div>
            <AppItem v-for="app in searchResult.items" :key="app.id" 
                :appid="app.id" :name="app.name" :price="app.price" :oriprice="app.oriprice"
                :rating="app.rating" :tags="app.tags" :iconType="app.iconType"/>
        </div>
        <PageSelect ref="pageSelector" id="pageSelector" :count="searchResult.pageCount" @pageChanged="pageChanged"/>
    </div>
</template>


<script>
import AppItem from '@/components/home/AppItem.vue';
import PageSelect from '@/components/public/PageSelect.vue';
import axios from 'axios';
export default {
    name: 'AppList',
    data() {
        return {
            appname: '', //搜索时的app名
            countPerPage: 20, //搜索时的每页item数
            searchResult: []
        }
    },
    components: {AppItem, PageSelect},
    methods: {
        search() {
            axios.get('/search', {
                params: {
                    name : this.appname,
                    count: this.countPerPage,
                    page: this.$refs.pageSelector.current 
                }
            }).then((res)=>{
                if (res.data.success) {
                    this.searchResult = res.data.searchResult;
                } else {
                    console.error('查询时遇到错误：', res.data);
                }
            });
        },
        pageChanged() {
            this.search();
        }
    }
}
</script>


<style scoped>
#pageSelector {
    text-align: center;
    margin: 40px;
}
</style>