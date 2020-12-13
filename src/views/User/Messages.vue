<template>
<div>
    <a-table :columns="msgTableCols" :data-source="messages" :loading="loading" :pagination="tablePagination" @change="pageChanged" @expand="onExpand">
      <template #dateSlot="date"> {{date|moment('YYYY/MM/DD HH:mm:ss')}} </template>
      <template #statusSlot="unread">
        <b v-if="unread">未读</b>
        <span v-else>已读</span>
      </template>
      <template #titleSlot="title">
        {{title}}
      </template>
      <template #actionSlot="item">
        <a-button type="link" style="padding:0px">删除</a-button><a-divider type="vertical" />
        <a-button type="link" style="padding:0px" @click="setReadStat(item, item.unread)">
            设为{{item.unread?'已':'未'}}读
        </a-button>
      </template>
      
      <template v-slot:expandedRowRender="item">
        <div style="background:white; padding: 15px;box-shadow: 2px 2px 5px 0px #00000014;">
          <h3 style="text-align:center">{{item.title}}</h3>
          <div v-html="item.content" />
        </div>
      </template>
    </a-table>
</div>
</template>

     
<script>
import { message } from 'ant-design-vue';
import axios from 'axios'
const msgTableCols = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    scopedSlots: { customRender: 'dateSlot' },
  },
  {
    title: '标题',
    key: 'title',
    dataIndex: 'title',
    scopedSlots: { customRender: 'titleSlot' },
  },
  {
    title: '状态',
    dataIndex: 'unread',
    key: 'status',
    scopedSlots: { customRender: 'statusSlot' },
  },
  {
    title: '来源',
    dataIndex: 'senderName',
    key: 'senderName'
  },
  {
    title: '操作',
    key: 'actions',
    scopedSlots: { customRender: 'actionSlot' },
  }
];


export default {
  name: 'Messages',
  data() {
    return {
      messages: [],
      loading: false,
      msgTableCols,
      unreadOnly: undefined,
      tablePagination: {
        defaultPageSize: 10,
        total: 0,
        current: 1
      }
    }
  }, 
  methods: {
      getMessages() {
          this.loading = true;
          axios.get('/messages', {params: {
              action: 'get',
              page: this.tablePagination.current,
              size: this.tablePagination.defaultPageSize,
              unreadonly: this.unreadOnly 
          }}).then((res)=>{
              if (res.data.success) {
                  this.messages = res.data.messages;
                  this.tablePagination.total = res.data.total;
                  for (let i=0; i<this.messages.length; ++i) 
                    this.messages[i].key = i; //加上key
              } else {
                  message.error("获取消息列表时出错");
                  console.error('Error occured when requesting /messages', res.data);
              }
              this.loading = false;
          });
      },
      pageChanged(pagination) {
          this.tablePagination.current = pagination.current;
          this.getMessages();
      },
      onExpand(isExpanded, message) {
        if (isExpanded) 
          this.setReadStat(message, 1);
      },
      setReadStat(message, read) {
        axios.get('/messages', {params: {
            action: read?'setRead':'setUnread',
            mid: message.mid
        }})
        message.unread = !read; //不重要的操作，就不等api调用完成再更新前端了
      }
  },
  created() {
      this.getMessages();
  }
}
</script>


<style scoped>

</style>