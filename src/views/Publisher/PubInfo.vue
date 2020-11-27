<template>
  <div>
    <a-form :model="companyInfo">
      <a-form-item label="公司/团队名">
        <a-input v-model="companyInfo.name" />
      </a-form-item>
      <a-button type="primary" html-type="submit" @click="modifyCompanyInfo">保存修改</a-button>
  </a-form>
  </div>
</template>

     
<script>
import { message } from 'ant-design-vue';
import axios from 'axios';
export default {
  name: "PubInfo",
  data() {
    return {
      companyInfo: {
        name: "",
      },
    };
  },
  created() {
      this.updateCompanyInfo();
  },
  methods: {
    modifyCompanyInfo() {
        axios.get('/publisher/info', {
            params: {
                action: 'update',
                name : this.companyInfo.name
            }
        }).then((res)=>{
            if (res.data.success) {
                message.success('修改信息成功');
            } else {
                message.error('修改信息失败');
                console.error('修改信息失败：', res.data);
            }
        });
    },
    updateCompanyInfo() { //更新页面上的CompanyInfo
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
};
</script>


<style scoped>
</style>