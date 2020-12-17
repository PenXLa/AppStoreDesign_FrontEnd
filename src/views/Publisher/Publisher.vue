<template>
  <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }" v-model="selectedKeys" :openKeys.sync="openKeys">
          <a-menu-item key="pubinfo"><router-link to="/publisher">公司信息</router-link></a-menu-item>
          <a-menu-item key="report"><router-link to="/publisher/report">财务报告</router-link></a-menu-item>
          <a-menu-item key="onSellApp"><router-link to="/publisher/apps">软件管理</router-link></a-menu-item>
          <a-menu-item key="team" v-if="$Global.userInfo.isManager"><router-link to="/publisher/team">员工账号管理</router-link></a-menu-item>
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
  name: 'Publisher',
  data() {
    return {
      collapsed: false,
      selectedKeys: ['pubinfo'],
      openKeys: ['basicInfo', 'publishedApps']
    };
  },
};
</script>
