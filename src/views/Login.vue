<template>
  <div id="loginFrame">
    <form name="loginForm" id="loginForm">
        <table id="loginTable">
            <tr><td><p id="loginTitle">登 录</p></td></tr>
            <tr><td><input class="mRoundTextbox loginTextbox" type="text" name="email" placeholder="邮箱"/></td></tr>
            <tr><td><input class="mRoundTextbox loginTextbox" type="password" name="pwd" placeholder="密码"/></td></tr>
            <tr><td>
                <input class="checkbox" id="remember" type="checkbox" name="remember" />
                <label class="checkbox_label" for="remember">记住我<span class="hint_text">&nbsp;&nbsp;&nbsp;不要在公共设备上勾选</span></label>
            </td></tr>
            <tr><td><input class="mRoundButton loginButton" type="button" value="登录" onclick="login()"></td></tr>
        </table>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/public/navbar.vue'

export default {
  name: 'Home',
  components: {
    NavBar
  }
}
</script>

