<template>
  <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }" v-model="selectedKeys" >
          <a-menu-item key="userinfo"><router-link to="/user">个人信息</router-link></a-menu-item>
          <a-menu-item key="messages"><router-link to="/user/messages">我的消息</router-link></a-menu-item>
          <a-menu-item key="billing"><router-link to="/user/billing">我的钱包</router-link></a-menu-item>
          <a-menu-item key="myapps"><router-link to="/user/myapps">我的软件</router-link></a-menu-item>
          <a-menu-item key="orders"><router-link to="/user/orders">历史订单</router-link></a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>
<script>

export default {
  name: 'User',
  data() {
    return {
      selectedKeys: ['userinfo']
    }
  },
};
</script>
