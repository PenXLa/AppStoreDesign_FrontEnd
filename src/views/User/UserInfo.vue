<template>
<div>
  <a-tabs default-active-key="basic">
    <a-tab-pane key="basic" tab="基本信息">
      <a-form>
        <a-form-item label="用户名">
          <a-input v-model="newUserInfo.name" placeholder="输入新用户名"/>
        </a-form-item>
        <a-button type="primary" html-type="submit" @click="changeUserName" :loading="changeUserName_Loading" :disabled="!newUserInfo.name">保存修改</a-button>
      </a-form>
    </a-tab-pane>

    <a-tab-pane key="security" tab="账号安全">
      <a-collapse>
        <a-collapse-panel key="email" header="查看/更改邮箱" style="display:none">
          <p>当前邮箱：{{userInfo.email}}</p>
          <p>
            <a-form>
              <a-form-item>
                <a-input v-model="newUserInfo.email" placeholder="输入新邮箱"/>
                <span style="font-size:9px; color=#afafaf">*改变邮箱会同时改变您的登录邮箱</span><br/>
                <a-button type="primary">修改</a-button>
              </a-form-item>
            </a-form>
          </p>
        </a-collapse-panel>
        <a-collapse-panel key="passwd" header="更改密码" :disabled="false">
          <a-form>
            <a-form-item>
              <a-input-password v-model="newUserInfo.passwd" placeholder="输入新密码" />
              <a-input-password v-model="newUserInfo.passwd2" placeholder="确认新密码" />
              <a-input v-model="newUserInfo.validatingCode" placeholder="邮箱验证码"/>
              <a-button type="primary" @click="changePasswd" :loading="changePasswd_Loading">修改</a-button>
            </a-form-item>
          </a-form>
        </a-collapse-panel>
      </a-collapse>
      
      
    </a-tab-pane>

  </a-tabs>
</div>
</template>

     
<script>
import { message } from 'ant-design-vue';
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'UserInfo',
  data() {
    return {
      userInfo: this.$Global.userInfo,
      newUserInfo: {
        name: undefined,
        passwd: undefined,
        passwd2: undefined,
        validatingCode: undefined,
        email: undefined
      },
      changeUserName_Loading: false,
      changePasswd_Loading: false
    }
  },
  methods: {
    changeUserName() {
      this.changeUserName_Loading = true;
      axios.post("/changeuserinfo", qs.stringify({
          action: "changeusername",
          value: this.newUserInfo.name
      })).then((res)=>{
          if (res.data.success) {
              this.$Global.refreshUserInfo().then(()=>{
                message.success("修改成功");
                this.newUserInfo.name = undefined;
                this.changeUserName_Loading = false;
              });
          } else {
              message.error("修改失败");
              console.error("Error occured when requesting /changeuserinfo ", res.data);
              this.changeUserName_Loading = false;
          }
          
      });
    },
    changePasswd() {
        this.changePasswd_Loading = true;
        axios.post("/changeuserinfo", qs.stringify({
            action: "changepasswd",
            value: this.newUserInfo.passwd,
            validatingCode: this.newUserInfo.validatingCode,
        })).then((res)=>{
            if (res.data.success) {
                message.success("修改成功");
                this.newUserInfo.passwd = undefined;
                this.newUserInfo.passwd2 = undefined;
                this.newUserInfo.validatingCode = undefined;
                this.changePasswd_Loading = false;
            } else {
                message.error("修改失败：" + res.data.reason);
                console.error("Error occured when requesting /changeuserinfo ", res.data);
                this.changePasswd_Loading = false;
            }
        });
    }
  }
  
}
</script>


<style scoped>

</style>