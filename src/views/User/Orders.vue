<template>
<div>
    <a-table :columns="orderTableCols" :data-source="orders" :loading="loading" :pagination="tablePagination" @change="pageChanged">
      <template #dateSlot="date"> {{date|moment('YYYY/MM/DD HH:mm:ss')}} </template>
      <template #priceSlot="price"> 
        <span v-if="price>=0" style="font-weight:bold;"> - {{(price/1000).toFixed(2)}} </span>
        <span v-else style="font-weight:bold; color:#de0000"> + {{(-price/1000).toFixed(2)}} </span>
      </template>
      <template #goodSlot="item"> 
          <span v-if="item.appid">{{item.appname}}
            <span v-if="!item.isMainPlan">的订阅项目 : {{item.planname}}</span>
          </span>
          <span v-else>-</span>
      </template>
      <template #actionSlot="item">
        <a-button type="link" style="padding:0px" @click="applyReturn(item.OID)" :disabled="item.status!==0">申请退款</a-button>
      </template>
      <template #statusSlot="status">
        <span v-if="status===0">交易成功</span>
        <b v-else-if="status===1">申请退款中</b>
        <span v-else-if="status===2">已退款</span>
        <span v-else>未知</span>
      </template>
    </a-table>
    
    <a-modal title="退款" :visible="returnData.returnBoxVisible" okText="申请"
          :confirm-loading="returnData.submittingReturn" @ok="submitApplyReturn" @cancel="returnData.returnBoxVisible=false">
    <a-form>
      <a-form-item label="请写出您的退款申请理由">
        <a-textarea v-model="returnData.returnReason"/>
      </a-form-item>
    </a-form>
  </a-modal>
</div>
</template>

     
<script>
import { message } from 'ant-design-vue';
import axios from 'axios'
const orderTableCols = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    scopedSlots: { customRender: 'dateSlot' },
  },
  {
    title: '订单号',
    dataIndex: 'OID',
    key: 'OID'
  },
  {
    title: '购买项目',
    key: 'good',
    scopedSlots: { customRender: 'goodSlot' },
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '金额（元）',
    key: 'price',
    dataIndex: 'price',
    scopedSlots: { customRender: 'priceSlot' },
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    scopedSlots: { customRender: 'statusSlot' },
  },
  {
    title: '操作',
    key: 'actions',
    scopedSlots: { customRender: 'actionSlot' },
  }
];


export default {
  name: 'Orders',
  data() {
    return {
      orders: [],
      loading: false,
      orderTableCols,
      tablePagination: {
        defaultPageSize: 10,
        total: 0,
        current: 1
      },
      returnData: {
        returnBoxVisible: false,
        submittingReturn: false,
        returnReason: undefined,
        oidToReturn: undefined
      }
    }
  }, 
  methods: {
      getOrders() {
          this.loading = true;
          axios.get('/orders', {params: {
              page: this.tablePagination.current,
              size: this.tablePagination.defaultPageSize,
              appid: this.$route.query.appid
          }}).then((res)=>{
              if (res.data.success) {
                  this.orders = res.data.orders;
                  this.tablePagination.total = res.data.total;
                  for (let i=0; i<this.orders.length; ++i) 
                    this.orders[i].key = i; //加上key
              } else {
                  message.error("获取订单列表时出错");
                  console.error('Error occured when requesting /orders', res.data);
              }
              this.loading = false;
          });
      },
      pageChanged(pagination) {
          this.tablePagination.current = pagination.current;
          this.getOrders();
      },
      applyReturn(oid) {
          this.returnData.oidToReturn = oid;
          this.returnData.returnBoxVisible=true;
      },
      submitApplyReturn() {
          this.returnData.submittingReturn = true;
          axios.get("/applyreturn", { params: {
              oid: this.returnData.oidToReturn,
              reason: this.returnData.returnReason
          }}).then((res)=>{
              this.returnData.submittingReturn = false;
              this.returnData.returnBoxVisible = false;
              if (res.data.success) {
                  message.success("已发出退款申请");
                  for (let item of this.orders) { //更新前端项目状态为1（申请中）
                    if (item.OID === this.returnData.oidToReturn) {
                      item.status = 1;
                      break;
                    }
                  }
              } else if (res.data.errorcode==="applied") {
                  message.info("您之前已经申请过了，请耐心等待");
              } else {
                  message.error("申请时发生错误");
                  console.error("error occured when requesting /applyreturn", res.data);
              }
          });
      }
  },
  created() {
      this.getOrders();
  }
}
</script>


<style scoped>

</style>