<template>
  <div id="loginFrame" class="mStripeBkg">
    <Card>
        <form name="loginForm" id="loginForm">
            <table id="loginTable">
                <tr><td><p id="loginTitle">登 录</p></td></tr>
                <tr><td><input class="mRoundTextbox loginTextbox" type="text" name="email" placeholder="邮箱" v-model="email"/></td></tr>
                <tr><td><input class="mRoundTextbox loginTextbox" type="password" name="pwd" placeholder="密码" v-model="pwd"/></td></tr>
                <tr><td>
                    <input class="checkbox" id="remember" type="checkbox" name="remember" v-model="remember"/>
                    <label class="checkbox_label" for="remember">记住我<span class="hint_text">&nbsp;&nbsp;&nbsp;不要在公共设备上勾选</span></label>
                </td></tr>
                <tr><td><input class="mRoundButton loginButton" type="button" value="登录" @click="login"></td></tr>
            </table>
        </form>
    </Card>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/public/Card.vue'
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'Login',
  components: {
    Card
  },
  data: function () {
    return {
      email: '',
      pwd: '',
      remember: false
    }
  },
  methods: {
    login: function () {
        axios.post("/login", qs.stringify({
            email: this.email,
            pwd: this.pwd,
            remember: this.remember
        })).then((res)=>{
            if (res.data.result == 1) {
                this.$router.push('');
                this.$Global.updateUserInfo();
            } else if (res.data.result == 2) {
                alert("验证码错误");
            } else if (res.data.result == 3) {
                alert("用户名或密码错误");
            } else if (res.data.result == 4) {
                alert("登录时遇到服务器错误");
            } else if (res.data.result == 5) {
                alert("输入格式错误");
            }
        });
    },
    logout: function () {
        let xhr=new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState==4 && xhr.status==200) {
                location.reload();
            }
        }

        xhr.open('get', 'logout', true);
        xhr.send();
    }
  }
}



</script>


<style scoped>
#loginFrame {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
}

#captcha {
    cursor: pointer;
}

#loginTable {
    width: 100%;
    text-align: center;
    border-spacing: 20px;
}

#loginFrame {
    width: 400px;
    height: 490px;
}

#loginTitle {
    font-size: 35px;
    text-shadow: rgba(0,0,0,0.1) 5px 5px 5px;
}


.loginTextbox {
    height: 32px;
    width: 76.7%;
    padding: 0;
}

#captcha_txt_box {
    margin-right: 10px;
    width: calc(76.7% - 140px); /*这是试出来的能对齐的值*/
    padding: 0;
}


#loginFrame img {
    vertical-align: middle;
    border-radius: 6px;
}


.loginButton {
    width: 100px;
    height: 35px;
    padding: 0;
}

/*checkbox的图标*/
@font-face {
    font-family: 'iconfont';  /* project id 1752725 */
    src: url('//at.alicdn.com/t/font_1752725_mfy2105qlm.eot');
    src: url('//at.alicdn.com/t/font_1752725_mfy2105qlm.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1752725_mfy2105qlm.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1752725_mfy2105qlm.woff') format('woff'),
    url('//at.alicdn.com/t/font_1752725_mfy2105qlm.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1752725_mfy2105qlm.svg#iconfont') format('svg');
}

.checkbox_label:before {
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    content:'\ec58';
    margin-right: 7px;
}
.checkbox:checked + .checkbox_label:before{ content:'\e637'; }
.checkbox { display: none; }
.checkbox_label { cursor: pointer; }

.hint_text {
    color: #67707e;
    font-size: 12px;
} /*提醒文字，相比普通文字明度较低，大小较小*/
</style>
