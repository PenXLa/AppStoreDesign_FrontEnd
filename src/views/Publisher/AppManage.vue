<template>
<a-layout>
    <a-tabs default-active-key="statisics">
      <a-tab-pane key="statisics" tab="统计信息">
        <a-skeleton :loading="loading" active>
            <a-statistic title="销量" :value="AppInfo.volume" />
        </a-skeleton>
      </a-tab-pane>



      <a-tab-pane key="data" tab="软件信息">
        <a-skeleton :loading="loading" active>
            <a-form :model="AppInfo">
                <a-form-item label="软件名字">
                    <a-input v-model="AppInfo.name" />
                </a-form-item>
                <a-form-item label="简介">
                    <a-textarea v-model="AppInfo.introduction" />
                </a-form-item>
                <a-form-item label="官方网站">
                    <a-input v-model="AppInfo.site" />
                </a-form-item>
                <a-form-item label="软件标签">
                    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="AppInfo.tags">
                        <a-list-item slot="renderItem" slot-scope="item, index" :key="item">
                            <a-card>
                                <a-space size="middle">
                                    <a-button type="danger" size="small" shape="circle" icon="delete" @click="AppInfo.tags.splice(index,1)"/>
                                    {{item}}
                                </a-space>
                            </a-card>
                        </a-list-item>
                    </a-list>
                    添加一个新Tag：
                    <a-input v-model="newTag"/>
                    <a-button @click="addTag" :disabled="newTag===''">添加Tag</a-button>
                </a-form-item>
                <a-form-item label="配置要求">
                    <a-row :gutter="0">
                        <a-col :span="4">
                            <a-card :title="'硬盘（' + $Global.utils.byte2str(AppInfo.hardDisk) + '）'" :bordered="false">
                                <a-input-number style="width:100%" v-model="AppInfo.hardDisk" :min="0" :max="1125899906842624"/> 
                            </a-card>
                        </a-col>
                        <a-col :span="4">
                            <a-card :title="'RAM（'+ $Global.utils.byte2str(AppInfo.RAM) + '）'" :bordered="false">
                                <a-input-number style="width:100%" v-model="AppInfo.RAM" :min="0" :max="1125899906842624"/> 
                            </a-card>
                        </a-col>
                        <a-col :span="4">
                            <a-card title="CPU" :bordered="false">
                                <a-input style="width:100%" v-model="AppInfo.CPU" placeholder="CPU" />
                            </a-card>
                        </a-col>
                        <a-col :span="4">
                            <a-card title="GPU" :bordered="false">
                                <a-input style="width:100%" v-model="AppInfo.GPU" placeholder="GPU" />
                            </a-card>
                        </a-col>
                        <a-col :span="4">
                            <a-card title="操作系统" :bordered="false">
                                <a-input style="width:100%" v-model="AppInfo.OS" placeholder="操作系统" />
                            </a-card>
                        </a-col>
                        <a-col :span="4">
                            <a-card title="其它" :bordered="false">
                                <a-textarea style="width:100%" v-model="AppInfo.req_other" placeholder="其它要求" />
                            </a-card>
                        </a-col>
                    </a-row>
                </a-form-item>
                <a-button type="primary" html-type="submit" @click="setBasicInfo">保存修改</a-button>
            </a-form>
        </a-skeleton>
      </a-tab-pane>



      <a-tab-pane key="icon" tab="图标">
        <a-skeleton :loading="loading" active>
            <img id="AppIcon" :src="$Global.APIURL + '/images/icon/' + AppInfo.id + '.' + AppInfo.iconType"/>
        </a-skeleton>
      </a-tab-pane>



      <a-tab-pane key="plans" tab="付费方案">
        <a-skeleton :loading="loading" active>
            <a-form :model="AppInfo.mainPlan">
                <a-form-item label="软件价格">
                    <a-input v-model="AppInfo.mainPlan.price" />
                </a-form-item>
            </a-form>
            <!-- <a-table :columns="planTableCols" :data-source="AppInfo.subscribePlans" bordered>
                <template v-for="col in ['name', 'age', 'address']" v-slot:[col]="text, record">
                    <div :key="col">
                        <a-input v-if="record.editable" style="margin: -5px 0" :value="text"
                            @change="e => handleChange(e.target.value, record.key, col)"
                        />
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <div class="editable-row-operations">
                        <span v-if="record.editable">
                        <a @click="() => save(record.key)">Save</a>
                        <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                            <a>Cancel</a>
                        </a-popconfirm>
                        </span>
                        <span v-else>
                        <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
                        </span>
                    </div>
                </template>
            </a-table> -->

        </a-skeleton>
      </a-tab-pane>



      <a-tab-pane key="operations" tab="执行操作">
        <a-space>
            <a-popconfirm placement="bottomLeft" ok-text="确定" ok-type="danger" cancel-text="取消" @confirm="setAppEnabled(!AppInfo.active)">
                <template slot="title">
                    <p>确认要{{(AppInfo.active?'下':'上') + '架' + AppInfo.name}}吗</p>
                </template>
                <a-button type="danger" :loading="loading">
                    {{AppInfo.active?'下':'上'}}架软件
                </a-button>
            </a-popconfirm>
            <a-button type="danger">删除软件</a-button>
        </a-space>
      </a-tab-pane>
    </a-tabs>
</a-layout>

    

</template>

     
<script>
import axios from 'axios';
import { message } from 'ant-design-vue';

//Plan表格的列
const planTableCols = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '说明',
    dataIndex: 'explanation',
    key: 'explanation',
  },
  {
    title: '价格',
    key: 'price',
    dataIndex: 'price',
  },
  {
    title: '原价',
    key: 'oriprice',
    dataIndex: 'oriprice',
  },
  {
    title: '原价',
    key: 'oriprice',
    dataIndex: 'oriprice',
  },
  {
    title: '时间',
    key: 'duration',
    dataIndex: 'duration',
  },
  {
    title: '生效',
    key: 'active',
    dataIndex: 'active',
  },
];


export default {
    name: 'AppManage',
    data() {
        return {
            currentTab: ['statisics'],
            AppInfo: undefined,
            loading: true,
            newTag: undefined,
            planTableCols
        }
    },
    methods: {
        setAppEnabled(enabled) {
            this.loading = true;
            axios.get("/publisher/updateappinfo", {
                params: {
                    appid: this.$route.params.id,
                    action: enabled?'enable':'disable'
                }
            }).then(res => {
                if (res.data.success) this.reload();
                else {
                    message.error('操作执行失败');
                    console.error('执行setAppEnabled时遇到错误：', res.data);
                    this.loading = false;
                }
            });
        },
        setBasicInfo() {
            this.loading = true;
            axios.get("/publisher/updateappinfo", {
                params: {
                    appid: this.$route.params.id,
                    action: 'setbasicinfo',
                    data: encodeURIComponent(JSON.stringify(this.AppInfo))
                }
            }).then(res => {
                if (res.data.success) {
                    this.reload();
                    message.success('修改成功');
                } else {
                    message.error('操作执行失败');
                    console.error('执行setAppEnabled时遇到错误：', res.data);
                    this.loading = false;
                }
            });
        },
        reload() {
            this.loading = true;
            axios.get("/appdetail", {
                params: {
                    appid: this.$route.params.id
                }
            }).then(res=>{
                if (res.data.success) {
                    this.AppInfo = res.data.detail;
                    this.loading = false;
                } else {
                    message.error('获取信息失败');
                    console.error('PublisherAppDetail获取信息失败', res);
                }
            });
        },
        addTag() {
            if (this.AppInfo.tags.filter(tag=>tag===this.newTag).length !== 0) 
                message.error(this.newTag + "已存在");
            else {
                this.AppInfo.tags.push(this.newTag);
                this.newTag = '';
            }
        }
    },
    created() {
        this.reload();
    }
}
</script>


<style scoped>
.ant-tabs {
    background-color: white;
}
#AppIcon {
    width: 200px;
    height: 200px;
}
</style>