<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <a-layout id="mainLayout">
        <a-layout-header class="header">
          <a-menu :selectable="false" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
            <a-menu-item key="1"> <router-link to="/">商店主页</router-link> </a-menu-item>
            <AccountMenu/>
          </a-menu>
        </a-layout-header>

        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </a-layout>
    </div>
  </a-config-provider>
</template>

<script>
import AccountMenu from "@/components/public/AccountMenu.vue";
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';
export default {
  name: "App",
  components: {
    AccountMenu,
  },
  data() {
    return {
      zhCN
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#mainLayout {
  background: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.mRoundTextbox {
  background-color: rgba(255, 255, 255, 0.025);
  font-size: 15px;
  text-align: center;
  border-radius: 1000px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: inherit;
  outline: none;
  padding: 6px;
}
.mRoundButton {
  display: inline-block;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  cursor: pointer;
  border: 1px solid #78afe2;
  -webkit-border-radius: 1000px;
  border-radius: 1000px;
  color: rgba(176, 194, 190, 1);
  text-align: center;
  background: rgba(255, 255, 255, 0.025);
  outline: none;
  -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  text-shadow: rgba(0, 0, 0, 0.2) 1px 1px 2px;
}
.mRoundButton:hover {
  color: rgba(255, 255, 255, 1);
  background: #78afe2;
}
.mRoundButton:active {
  border: 1px solid rgb(101, 125, 173);
  background: rgb(101, 125, 173);
  -webkit-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
  -moz-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
  -o-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
  transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
}
.mRoundComboBox {
  padding: 7px;
  border-radius: 1000px;
  background: rgba(255, 255, 255, 0.95);
  outline: none;
  cursor: pointer;
}
.mStripeBkg {
  background-image: linear-gradient(
    0deg,
    rgba(146, 137, 127, 1) 50%,
    rgb(157, 148, 138) 50%
  );
  background-size: 100% 50px;
}

#mainLayout {
  min-height: 100%;
}
#mainLayout .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
