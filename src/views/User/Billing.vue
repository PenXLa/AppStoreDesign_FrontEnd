<template>
<div>
  <h3>余额</h3>
  <p>
    <a-statistic :precision="2" :value="userInfo.balance/1000" suffix="元"/> 
  </p>
  <h3>充值</h3>
  <p>
    <a-form>
      <a-form-item label="充值金额">
        <a-input-number v-model="payAmount" :precision="2" :min="0" :max="99999999" style="min-width:150px" placeholder="请输入金额"/> 元
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="pay" :loading="loading">充值</a-button>
      </a-form-item>
    </a-form>
    
  </p>
</div>
</template>

     
<script>
import { message } from 'ant-design-vue';
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Billing',
  data() {
    return {
      userInfo: this.$Global.userInfo,
      payAmount: undefined,
      loading: false
    }
  },
  methods: {
    pay() {
        if (!this.payAmount) {
            message.error("请输入大于0的金额");
            return;
        } 

        this.loading = true;
        axios.post("/pay", qs.stringify({
            amount: this.payAmount
        })).then((res)=>{
            if (res.data.success) {
                this.$Global.refreshUserInfo().then(()=>{
                    message.success("支付成功");
                    this.payAmount = undefined;
                    this.loading = false;
                });
            } else {
                message.error("支付失败" + res.data.reason);
                console.error("Error occured when requesting /pay ", res.data);
                this.loading = false;
            }
        });
    }
  },
  created() {
    this.$Global.refreshUserInfo();
  }
}
</script>


<style scoped>

</style>