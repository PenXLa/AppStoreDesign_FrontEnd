<template>
  <nav class="topNav">
    <table id="navTable">
      <tr>
        <td id="app_col">
          <ul>
            <li><router-link to="/">商店主页</router-link></li>
          </ul>
        </td>
        <td id="account_col">
          <table align="right" cellspacing="5px">
            <tr v-if="userInfo.loggedIn">
              <td><router-link to="/user" id="userLink">{{userInfo.name}}</router-link></td>
              <td><a href="" @click="logout">退出</a></td>
            </tr>
            <tr v-else>
              <td>注册</td>
              <td><router-link to="/login">登录</router-link></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </nav>
</template>

<script>
import axios from 'axios';
export default {
  name: "NavBar",
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/scss/public.scss';
nav {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #313132;
  height: $nav_height;
}
#navTable {
  width: 100%;
}
#app_col {
  text-align: left;
}
#account_col {
  text-align: right;
}
nav ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

nav td {
  color: #f5f5f7;
  text-shadow: black 0.1em 0.1em 0.3em;
  text-decoration: none;
}

nav ul li {
  margin-right: 10px;
  margin-left: 10px;
}
nav a {
  color: inherit;
  text-shadow: inherit;
  text-decoration: inherit;
}
</style>
