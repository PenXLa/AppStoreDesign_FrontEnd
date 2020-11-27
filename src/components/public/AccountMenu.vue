<template>
    <table align="right" cellspacing="5px">
        <tr v-if="userInfo.loggedIn">
            <td>
              <router-link :to="userInfo.role==='seller'?'/publisher':'/user'" id="userLink">{{userInfo.name}}</router-link>
            </td>
            <td><a href="" @click="logout">退出</a></td>
        </tr>
        <tr v-else>
            <td>注册</td>
            <td><router-link to="/login">登录</router-link></td>
        </tr>
    </table>
</template>

<script>
import axios from 'axios';
export default {
  name: "AccountMenu",
  data() {
    return {
      userInfo: this.$Global.userInfo
    }
  },
  beforeCreate() { //生命周期钩子函数不能定义为箭头函数
    this.$Global.updateUserInfo();
  },
  methods: {
    logout() {
      axios.get("/logout").then(()=>{
        return this.$Global.updateUserInfo();
      }).then(()=>{
        this.$router.go(0);
      })
    }
  }
};

</script>

<style>
table td {
    padding: 0px 5px 0px 5px;
}
</style>
