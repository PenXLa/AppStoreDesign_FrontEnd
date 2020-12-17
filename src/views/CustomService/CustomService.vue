<template>
  <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }" v-model="selectedKeys" >
          <a-menu-item key="returns"><router-link to="/custom-service">退款申请处理</router-link></a-menu-item>
          <a-menu-item key="admin"><router-link to="/custom-service/admin">管理</router-link></a-menu-item>
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
  name: 'CustomService',
  data() {
    return {
      selectedKeys: ['returns']
    }
  },
};
</script>
