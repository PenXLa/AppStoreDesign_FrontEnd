<template>
  <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }" v-model="selectedKeys" :openKeys.sync="openKeys">
          <a-sub-menu key="basicInfo">
            <template #title>
              <span>基本信息</span>
            </template>
            <a-menu-item key="overview"><router-link to="/publisher">概览</router-link></a-menu-item>
            <a-menu-item key="pubinfo"><router-link to="/publisher/pubinfo">公司信息</router-link></a-menu-item>
            <a-menu-item key="report"><router-link to="/publisher/report">财务报告</router-link></a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="publishedApps">
            <template #title>
              <span>软件管理</span>
            </template>
            <a-menu-item key="onSellApp"><router-link to="/publisher/apps">已发布软件</router-link></a-menu-item>
            <a-menu-item key="newApp"><router-link to="/publisher/newapp">发布新软件</router-link></a-menu-item>
          </a-sub-menu>
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
      selectedKeys: ['overview'],
      openKeys: ['basicInfo', 'publishedApps']
    };
  },
};
</script>
