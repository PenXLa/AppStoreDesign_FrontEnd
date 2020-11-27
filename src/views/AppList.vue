<template>
    <div id='AppListFrame'>
        <div v-if="searchResult.items">
            <AppItem v-for="app in searchResult.items" :key="app.id" 
                :appid="app.id" :name="app.name" :price="app.price" :oriprice="app.oriprice"
                :rating="app.rating" :tags="app.tags" :iconType="app.iconType"/>
        </div>
        <div v-else>
            无结果
        </div>
        <a-pagination ref="pagination" id="pagination" 
                v-model="currentPage" show-size-changer :default-current="1" 
                :total="searchResult.total" @change="pageChanged" @showSizeChange="sizeChanged"
                :pageSizeOptions="['2', '10', '20', '30']"
                :pageSize.sync="pageSize"/>
    </div>
</template>


<script>
import AppItem from '@/components/home/AppItem.vue';
import axios from 'axios';
export default {
    name: 'AppList',
    data() {
        return {
            appname: '', //搜索时的app名
            currentPage: 1,
            pageSize: 20,
            searchResult: []
        }
    },
    components: {AppItem},
    methods: {
        search() {
            axios.get('/search', {
                params: {
                    name : this.appname,
                    count: this.pageSize,
                    page: this.currentPage
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
        },
        sizeChanged() {
            console.log( this.$refs.pagination.pageSize);
            this.search();
        }
    }
}
</script>


<style scoped>
#pagination {
    text-align: center;
    margin: 40px;
}
</style>