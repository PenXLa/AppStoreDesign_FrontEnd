<template>
<div>
    <a-button @click="addSeller">添加员工</a-button>
    <a-table :columns="sellerTableCols" :data-source="sellers" :loading="loading">
      <template #actionSlot="item">
        <a-button type="link" size="small" @click="removeSeller(item.uid)">删除</a-button>
      </template>
    </a-table>

    <a-modal v-model="codeBox.visible" title="邀请码" @ok="codeBox.visible = false">
      {{codeBox.code}}
    </a-modal>
</div>
</template>

     
<script>
import { message } from 'ant-design-vue';
import axios from 'axios'
const sellerTableCols = [
  {
    title: '员工名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '操作',
    key: 'actions',
    scopedSlots: { customRender: 'actionSlot' },
  }
];


export default {
  name: 'Team',
  data() {
    return {
      sellers: [],
      loading: false,
      sellerTableCols,
      codeBox: {
        visible:false,
        code:undefined
      }
    }
  }, 
  methods: {
      getSellers() {
          this.loading = true;
          axios.get('/publisher/sellers').then((res)=>{
              if (res.data.success) {
                  this.sellers = res.data.sellers;
                  for (let i=0; i<this.sellers.length; ++i) 
                    this.sellers[i].key = i; //加上key
              } else {
                  message.error(res.data.reason);
                  console.error('Error occured when requesting /publisher/sellers', res.data);
              }
              this.loading = false;
          });
      },
      removeSeller(sellerid) {
          this.sellers = this.sellers.filter(item=>item.uid !== sellerid);
          axios.get('/publisher/removeseller', {params:{uid: sellerid}});
      },
      addSeller() {
          axios.get('/publisher/invite').then((res)=>{
              if (res.data.success) {
                  this.codeBox.visible = true;
                  this.codeBox.code = res.data.code;
              } else {
                  message.error("邀请时发生错误");
                  console.error('Error occured when requesting /publisher/invite', res.data);
              }
          });
      }
  },
  created() {
      this.getSellers();
  }
}
</script>


<style scoped>

</style>