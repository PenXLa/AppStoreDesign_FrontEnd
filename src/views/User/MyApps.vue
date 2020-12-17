<template>
<div>
  <a-table :columns="appTableCols" :data-source="myapps" :loading="loading" :pagination="tablePagination" @change="pageChanged">
    <template #iconAndName="name, item">
      <a-avatar shape="square" :src="$Global.APIURL + item.icon"/>
      <span style="margin-left:1em">{{ name }}</span>
    </template>
    <template #lastUpdateSlot="date">
      {{date|moment('YYYY/MM/DD')}}
    </template>
    <template #tagSlot="tags">
      <a-tag v-for="tag in tags" :key="tag"> {{ tag }} </a-tag>
    </template>
    <template #actionSlot="text,item">
      <router-link :to="`/app/${item.appid}`">商店页面</router-link><a-divider type="vertical" />
      <a :href="$Global.APIURL + '/files/' + item.appid + '.exe'">安装</a><a-divider type="vertical" />
      <router-link :to="`/app/${item.appid}`">评价</router-link><a-divider type="vertical" />
      <router-link :to="{path:'/user/orders', query:{appid:item.appid}}">查看订单</router-link>
    </template>

    <template v-slot:expandedRowRender="item">
      <a-table :columns="planTableCols" :data-source="item.subscribeItems" :pagination="false">
        <template #expireSlot="date">
          {{date|moment('YYYY/MM/DD HH:mm:ss')}}
        </template>
      </a-table>
    </template>
  </a-table>
</div>
</template>

     
<script>
import { message } from 'ant-design-vue';
import axios from 'axios';
const appTableCols = [
  {
    title: '软件',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'iconAndName' },
  },
  {
    title: '版本',
    dataIndex: 'version',
    key: 'version'
  },
  {
    title: '上次更新',
    dataIndex: 'lastUpdate',
    key: 'lastUpdate',
    scopedSlots: { customRender: 'lastUpdateSlot' },
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tagSlot' },
  },
  {
    title: '操作',
    key: 'actions',
    scopedSlots: { customRender: 'actionSlot' },
  }
];
const planTableCols = [
  {
    title: '订阅项目',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '订阅项目简介',
    dataIndex: 'explanation',
    key: 'explanation'
  },
  {
    title: '过期时间',
    dataIndex: 'expireDate',
    key: 'expireDate',
    scopedSlots: { customRender: 'expireSlot' },
  }
]

export default {
  name: 'MyApps',
  data() {
    return {
      myapps: [],
      appTableCols, planTableCols,
      loading: false,
      tablePagination: {
        defaultPageSize: 10,
        total: 0,
        current: 1
      }
      
    }
  },
  methods: {
      getMyApps() {
          this.loading = true;
          axios.get('/myapps', {
              params: {
                  page: this.tablePagination.current,
                  size: this.tablePagination.defaultPageSize
              }
          }).then((res)=>{
              if (res.data.success) {
                this.tablePagination.total = res.data.count;
                  this.myapps = res.data.apps;
                  for (let i=0; i<this.myapps.length; ++i) {
                    this.myapps[i].key = i; //加上key
                    if (this.myapps[i].subscribeItems) {
                      for (let j=0; j<this.myapps[i].subscribeItems.length; ++j) {
                        this.myapps[i].subscribeItems[j].key = j; //加上key
                      }
                    }
                  }
                  
              } else {
                  message.error("获取软件列表时出错");
                  console.error('Error occured when requesting /myapps', res.data);
              }
              this.loading = false;
          });
      },
      pageChanged(pagination) {
          this.tablePagination.current = pagination.current;
          this.getMyApps();
      }
  },
  created() {
      this.getMyApps();
  }
}
</script>


<style scoped>

</style>