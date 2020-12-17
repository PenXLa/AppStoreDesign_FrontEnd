<template>
<div>
    <a-button type="danger" @click="backup">备份数据库</a-button>
    <!-- <a-button type="danger" @click="restore">恢复数据库</a-button> -->
</div>
</template>

     
<script>
import axios from 'axios'
import { message } from 'ant-design-vue';
export default {
name: 'Admin',
methods: {
    backup() {
        axios.get('/admin/backup').then(res=>{
            console.log(res);
            message.success("已于" + new Date() +"创建新的备份")
        });
    },
    restore() {
        axios.get('/admin/restore').then(res=>{
            console.log(res);
            message.success("恢复成功")
        });
    }
}
}
</script>


<style scoped>

</style>