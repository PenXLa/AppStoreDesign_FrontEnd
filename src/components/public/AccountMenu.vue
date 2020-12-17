<template>
    <span>
        <table align="right" cellspacing="5px">
            <tr v-if="userInfo.loggedIn">
                <td>
                  <router-link :to="userLink" id="userLink">{{userInfo.name}}</router-link>
                </td>
                <td><a href="" @click="logout">退出</a></td>
            </tr>
            <tr v-else>
                <a-button type="link" size="small" @click="registerInfo.visible=true">注册</a-button>
                <td><a-button type="link" size="small" @click="loginInfo.visible=true">登录</a-button></td>
            </tr>
        </table>



        <a-modal title="注册" :visible="registerInfo.visible" :confirm-loading="registerInfo.loading" 
              okText="注册" cancelText="取消" @cancel="registerInfo.visible=false" @ok="register">
            <a-radio-group v-model="registerInfo.regType">
              <a-radio-button value="user">用户注册</a-radio-button>
              <a-radio-button value="employee">员工注册</a-radio-button>
              <a-radio-button value="publisher">软件开发商注册</a-radio-button>
            </a-radio-group>
            <br/><br/>
            <a-form>
              <a-form-item>
                <a-input v-model="registerInfo.email"
                  v-decorator="[
                    '登录邮箱',
                    { rules: [{ required: true, message: '请输入登录邮箱' }] },
                  ]"
                  placeholder="邮箱"
                >
                  <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input v-model="registerInfo.name"
                  v-decorator="[
                    '用户名',
                    { rules: [{ required: true, message: '请输入用户名' }] },
                  ]"
                  placeholder="用户名"
                >
                  <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input v-model="registerInfo.passwd"
                  v-decorator="[
                    '密码',
                    { rules: [{ required: true, message: '请输入密码' }] },
                  ]"
                  type="password"
                  placeholder="密码"
                >
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input v-model="registerInfo.chkpasswd"
                  v-decorator="[
                    '确认密码',
                    { rules: [{ required: true, message: '请再次输入密码' }] },
                  ]"
                  type="password"
                  placeholder="确认密码"
                >
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item v-if="registerInfo.regType==='employee'">
                <a-input v-model="registerInfo.invitation" placeholder="邀请码">
                  <a-icon slot="prefix" type="idcard" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item v-if="registerInfo.regType==='publisher'">
                <a-input v-model="registerInfo.pubName" placeholder="公司/团队名">
                  <a-icon slot="prefix" type="bank" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
            </a-form>
        </a-modal>

        <a-modal title="登录" :visible="loginInfo.visible"
              okText="登录" cancelText="取消" @cancel="loginInfo.visible=false" @ok="login">
            <a-form>
              <a-form-item>
                <a-input v-model="loginInfo.email"
                  v-decorator="[
                    '登录邮箱',
                    { rules: [{ required: true, message: '请输入登录邮箱' }] },
                  ]"
                  placeholder="邮箱"
                >
                  <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input v-model="loginInfo.passwd"
                  v-decorator="[
                    '密码',
                    { rules: [{ required: true, message: '请输入密码' }] },
                  ]"
                  type="password"
                  placeholder="密码"
                >
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-checkbox v-model="loginInfo.remember"> 记住我 </a-checkbox>
              <a-button type="link" @click="()=>{loginInfo.visible=false; forgetInfo.visible=true;}"> 忘记密码 </a-button>
            </a-form>
        </a-modal>

        <a-modal title="找回密码" :visible="forgetInfo.visible" @cancel="forgetInfo.visible=false" @ok="changePasswd">
            <a-form>
              <a-form-item>
                <a-input v-model="forgetInfo.email"
                  v-decorator="[
                    '登录邮箱',
                    { rules: [{ required: true, message: '请输入登录邮箱' }] },
                  ]"
                  placeholder="邮箱"
                >
                  <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input v-model="forgetInfo.passwd"
                  type="password"
                  placeholder="密码"
                >
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input v-model="forgetInfo.chkpasswd"
                  type="password"
                  placeholder="确认密码"
                >
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input v-model="forgetInfo.chkcode"
                  placeholder="邮箱验证码"
                >
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
            </a-form>
        </a-modal>
    </span>
</template>

<script>
import axios from 'axios';
import { message } from 'ant-design-vue';
import qs from 'qs'
export default {
  name: "AccountMenu",
  data() {
    return {
      userInfo: this.$Global.userInfo,
      registerInfo: {
        visible: false,
        email: undefined,
        passwd: undefined,
        chkpasswd: undefined,
        name: undefined,
        loading: false,
        invitation: undefined,
        regType: 'user',
        pubName: undefined,
      },
      loginInfo: {
        visible: false,
        email: undefined,
        passwd: undefined,
        remember: false
      },
      forgetInfo: {
        visible: false,
        email: undefined,
        chkcode: undefined,
        passwd: undefined,
        loading: false,
        chkpasswd: undefined,
      }
    }
  },
  created() { //生命周期钩子函数不能定义为箭头函数
    this.$Global.refreshUserInfo();
  },
  methods: {
    logout() {
      axios.get("/logout").then(()=>{
        return this.$Global.refreshUserInfo();
      }).then(()=>{
        this.$router.go(0);
      })
    },
    register() {
        this.registerInfo.loading = true;
        let par = {
            email: this.registerInfo.email,
            passwd: this.registerInfo.passwd,
            name: this.registerInfo.name
        };
        if (this.registerInfo.regType === 'employee') 
          par.invitation = this.registerInfo.invitation;
        else if (this.registerInfo.regType === 'publisher')
          par.pubName = this.registerInfo.pubName;

        axios.get("/register",{params: par}).then((res)=>{
            if (res.data.success) {
                message.success("注册成功");
                this.registerInfo.visible = false;
                this.loginInfo.visible = true;
            } else if (res.data.errcode === 'email_used') {
                message.error("邮箱已被占用");
            } else if (res.data.errcode === 'wrong_invitation') {
                message.error("邀请码错误");
            } else {
                message.error("注册时发生错误");
                console.log("error occured when register", res.data)
            }
            this.registerInfo.loading = false;
        });
    },
    login() {
        axios.post("/login", qs.stringify({
            email: this.loginInfo.email,
            pwd: this.loginInfo.passwd,
            remember: this.loginInfo.remember
        })).then((res)=>{
            if (res.data.result == 1) {
                this.$router.push('/');
                this.$Global.refreshUserInfo();
            } else if (res.data.result == 2) {
                message.error("验证码错误");
            } else if (res.data.result == 3) {
                message.error("用户名或密码错误");
            } else if (res.data.result == 4) {
                message.error("登录时遇到服务器错误");
            } else if (res.data.result == 5) {
                message.error("输入格式错误");
            }
            this.loginInfo.visible = false;
        });
    },
    changePasswd() {
        this.forgetInfo.loading = true;
        axios.post("/changeuserinfo", qs.stringify({
            action: "changepasswd",
            value: this.forgetInfo.passwd,
            email: this.forgetInfo.email,
            validatingCode: this.forgetInfo.chkcode,
        })).then((res)=>{
            if (res.data.success) {
                message.success("修改成功");
                this.forgetInfo.passwd = undefined;
                this.forgetInfo.chkpasswd = undefined;
                this.forgetInfo.chkcode = undefined;
                this.forgetInfo.email = undefined;
                this.forgetInfo.loading = false;
            } else {
                message.error("修改失败：" + res.data.reason);
                console.error("Error occured when requesting /changeuserinfo ", res.data);
                this.forgetInfo.loading = false;
            }
        });
    }
  },
  computed: {
    userLink() {
      if (this.userInfo.role==='seller') return '/publisher';
      else if (this.userInfo.role==='cs') return 'custom-service';
      else if (this.userInfo.role==='user') return '/user';
      return '';
    }
  }
};

</script>

<style>
table td {
    padding: 0px 5px 0px 5px;
}
</style>
