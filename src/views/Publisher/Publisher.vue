<template>
  <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }" :defaultSelectedKeys="['overview']" :defaultOpenKeys="['basicInfo', 'appManage']">
          <a-sub-menu key="basicInfo">
            <template #title>
              <span>基本信息</span>
            </template>
            <a-menu-item key="overview"><router-link to="/publisher">概览</router-link></a-menu-item>
            <a-menu-item key="pubinfo"><router-link to="/publisher/pubinfo">公司信息</router-link></a-menu-item>
            <a-menu-item key="report"><router-link to="/publisher/report">财务报告</router-link></a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="appManage">
            <template #title>
              <span>上架软件管理</span>
            </template>
            <a-menu-item key="onSellApp"><router-link to="/publisher/apps">已上架软件</router-link></a-menu-item>
            <a-menu-item key="newApp"><router-link to="/publisher/newapp">上架新软件</router-link></a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          
        </a-breadcrumb>
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
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
    };
  },
};
</script>
