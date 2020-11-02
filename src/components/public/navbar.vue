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
            <tr v-if="$Global.userInfo.loggedIn">
              <td><router-link to="/user">{{$Global.userInfo.name}}</router-link></td>
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
export default {
  name: "NavBar"
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #313132;
  height: 45px;
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
