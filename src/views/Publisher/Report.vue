<template>
<div>
    <h3>总收入</h3>
    <p>
      <a-statistic :precision="2" :value="companyInfo.income" suffix="元"/> 
    </p>
</div>
</template>

     
<script>
import axios from 'axios';
import { message } from 'ant-design-vue';
export default {
  name: 'Report',
  data() {
    return {
      companyInfo: {}
    }
  },
  created() {
    axios.get('/publisher/info', {
        params: {
            action: 'read'
        }
    }).then((res)=>{
        if (res.data.success) {
            this.companyInfo = res.data.info;
        } else {
            message.error('获取信息失败');
            console.error('修改信息失败：', res.data);
        }
    });
  }
}
  
</script>


<style scoped>

</style>