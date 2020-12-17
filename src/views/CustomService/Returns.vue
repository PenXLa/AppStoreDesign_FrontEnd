<template>
<div>
    <a-table :columns="returnTableCols" :data-source="applies" :loading="loading" :pagination="tablePagination" @change="pageChanged">
      <template #dateSlot="date"> {{date|moment('YYYY/MM/DD HH:mm:ss')}} </template>
      <template #dateGapSlot="item"> {{Math.round((item.applyDate-item.buyDate)/1000/60/60/24,1)}}天 </template>
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
        <a-button type="link" size="small" @click="handleApply(item.rid, true)">同意</a-button>
        <a-button type="link" size="small" @click="()=>{rejectData.rid=item.rid,rejectData.reason=undefined,rejectData.visible=true}">拒绝</a-button>
        
      </template>
    </a-table>

    <a-modal title="拒绝退款" :visible="rejectData.visible" 
          @ok="()=>{handleApply(rejectData.rid, false); rejectData.visible=false}" 
          @cancel="rejectData.visible=false">
      <a-form>
        <a-form-item label="请写出拒绝退款的理由">
          <a-textarea v-model="rejectData.reason"/>
        </a-form-item>
      </a-form>
  </a-modal>
</div>
</template>

     
<script>
import { message } from 'ant-design-vue';
import axios from 'axios'
const returnTableCols = [
  {
    title: '下单日期',
    dataIndex: 'buyDate',
    key: 'buyDate',
    scopedSlots: { customRender: 'dateSlot' },
  },
  {
    title: '退款申请日期',
    dataIndex: 'applyDate',
    key: 'applyDate',
    scopedSlots: { customRender: 'dateSlot' },
  },
  {
    title: '下单-退款间隔',
    key: 'dateGap',
    scopedSlots: { customRender: 'dateGapSlot' },
  },
  {
    title: '订单号',
    dataIndex: 'oid',
    key: 'oid'
  },
  {
    title: '申请用户',
    key: 'userName',
    dataIndex: 'userName',
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
    title: '退款原因',
    key: 'reason',
    dataIndex: 'reason',
  },
  {
    title: '操作',
    key: 'actions',
    scopedSlots: { customRender: 'actionSlot' },
  }
];


export default {
  name: 'CustomServiceReturns',
  data() {
    return {
      applies: [],
      loading: false,
      returnTableCols,
      tablePagination: {
        defaultPageSize: 20,
        total: 0,
        current: 1
      },
      rejectData: {
        visible: false,
        reason: undefined,
        rid: undefined
      }
    }
  }, 
  methods: {
      getApplies() {
          this.loading = true;
          axios.get('/customservice/returns', {params: {
              page: this.tablePagination.current,
              size: this.tablePagination.defaultPageSize,
          }}).then((res)=>{
              if (res.data.success) {
                  this.applies = res.data.applies;
                  this.tablePagination.total = res.data.total;
                  for (let i=0; i<this.applies.length; ++i) 
                    this.applies[i].key = i; //加上key
              } else {
                  message.error("获取退款申请列表时出错");
                  console.error('Error occured when requesting /customservice/returns', res.data);
              }
              this.loading = false;
          });
      },
      pageChanged(pagination) {
          this.tablePagination.current = pagination.current;
          this.getApplies();
      }, 
      handleApply(returnID, accept) {
          axios.get('/customservice/handlereturn', {params: {
              rid: returnID,
              action: accept?'accept':'reject',
              reason: this.rejectData.reason //拒绝时的理由
          }}).then((res)=>{
              if (res.data.success) {
                  message.success("处理完成");
                  this.applies = this.applies.filter(apply=>apply.rid!==returnID);
              } else {
                  message.error("处理退款时出错");
                  console.error('Error occured when requesting /customservice/handlereturn', res.data);
              }
          });
      }
  },
  created() {
      this.getApplies();
  }
}
</script>


<style scoped>

</style>