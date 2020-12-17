<template>
<a-layout>
    <a-tabs default-active-key="statisics">
      <a-tab-pane key="statisics" tab="统计信息">
        <a-skeleton :loading="loading.contentLoading" active>
            <a-statistic :value="AppInfo.name" />
            <a-statistic title="销量" :value="AppInfo.mainPlan.volume" />
        </a-skeleton>
      </a-tab-pane>



      <a-tab-pane key="data" tab="软件信息">
        <a-skeleton :loading="loading.contentLoading" active>
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
        <a-skeleton :loading="loading.contentLoading" active>
            <p>
                <img ref="icon" id="AppIcon" :src="$Global.APIURL + AppInfo.icon"/>
            </p>
            <p>
                <a-upload name="file" accept=".png,.jpg,.svg" :showUploadList="false"
                        @change="iconUploadStatusChange" :withCredentials="true"
                        :data="{appid:AppInfo.id}"
                        :action="`${$Global.APIURL}/publisher/changeappicon`" ref="uploader">
                    <a-button> <a-icon type="upload" /> 上传新图标 </a-button>
                </a-upload>
            </p>
        </a-skeleton>
      </a-tab-pane>

      <a-tab-pane key="files" tab="软件安装包">

        <a-upload name="file" :showUploadList="false"
                @change="installUploadStatusChange" :withCredentials="true"
                :data="{appid:AppInfo.id}"
                :action="`${$Global.APIURL}/publisher/appupload`" ref="fileuploader">
            <a-button> <a-icon type="upload" /> 上传软件安装包 </a-button>
        </a-upload>

      </a-tab-pane>



      <a-tab-pane key="plans" tab="付费方案">
        <a-skeleton :loading="loading.contentLoading" active>
            <a-form :model="AppInfo.mainPlan">
                <a-form-item label="软件价格">
                    <a-input v-model="AppInfo.mainPlan.price" />
                    <a-button type="primary" html-type="submit" @click="updatePlanInfo(AppInfo.mainPlan)">保存修改</a-button>
                </a-form-item>
            
                <a-form-item label="订阅项目">
                    <a-table :columns="planTableCols" :data-source="AppInfo.subscribePlans" :loading="loading.contentLoading" :pagination="false">
                        <template #codeSlot="code, item"> 
                            <a-input v-if="item.editing" v-model="planEditInfo.newInfo.code" /> <!--编辑模式-->
                            <span v-else> {{code}} </span> <!--正常显示-->
                        </template>

                        <template #nameSlot="name, item"> 
                            <a-input v-if="item.editing" v-model="planEditInfo.newInfo.name" /> <!--编辑模式-->
                            <span v-else> {{name}} </span> <!--正常显示-->
                        </template>

                        <template #explanationSlot="explanation, item"> 
                            <a-textarea v-if="item.editing" v-model="planEditInfo.newInfo.explanation" /> <!--编辑模式-->
                            <span v-else> {{explanation}} </span> <!--正常显示-->
                        </template>

                        <template #priceSlot="price, item"> 
                            <a-input-number v-if="item.editing" v-model="planEditInfo.newInfo.price" /> <!--编辑模式-->
                            <span v-else> {{price}} </span> <!--正常显示-->
                        </template>

                        <template #oripriceSlot="oriprice, item"> 
                            <a-input-number v-if="item.editing" v-model="planEditInfo.newInfo.oriprice" /> <!--编辑模式-->
                            <span v-else> {{oriprice}} </span> <!--正常显示-->
                        </template>

                        <template #durationSlot="duration, item"> 
                            <a-input-number v-if="item.editing" v-model="planEditInfo.newInfo.duration" /> <!--编辑模式-->
                            <span v-else> {{duration}} </span> <!--正常显示-->
                        </template>

                        <template #activeSlot="active, item"> 
                            <a-switch v-if="item.editing" v-model="planEditInfo.newInfo.active" /> <!--编辑模式-->
                            <span v-else> <!--正常显示-->
                                <span v-if="active">可用</span>
                                <span v-else>禁用</span> 
                            </span> 
                        </template>
                        <template #actionSlot="item">
                            <template v-if="item.editing"><!--编辑模式-->
                                <a-button type="link" size="small" @click="planEditSaveClicked(item.key)">保存</a-button>
                                <a-button type="link" size="small" @click="planEditCancelClicked(item.key)">取消</a-button>
                            </template>
                            <template v-else><!--正常显示-->
                                <a-button :disabled="planEditInfo.editing" type="link" style="padding:0px" @click="planEditClicked(item.key)">编辑</a-button><a-divider type="vertical" />
                                <a-button :disabled="planEditInfo.editing" type="link" style="padding:0px" @click="removePlan(item.id)">删除</a-button>
                            </template>
                        </template>
                    </a-table>
                    <a-button icon="plus" @click="newPlanClicked">新订阅项目</a-button>
                </a-form-item>
            </a-form>
        </a-skeleton>
      </a-tab-pane>



      <a-tab-pane key="operations" tab="执行操作">
        <a-space>
            <a-popconfirm placement="bottomLeft" ok-text="确定" ok-type="danger" cancel-text="取消" @confirm="setAppEnabled(!AppInfo.active)">
                <template slot="title">
                    <p>确认要{{(AppInfo.active?'下':'上') + '架' + AppInfo.name}}吗</p>
                </template>
                <a-button type="danger" :loading="loading.setEnabledLoading">
                    {{AppInfo.active?'下':'上'}}架软件
                </a-button>
            </a-popconfirm>
            <a-popconfirm placement="bottomLeft" ok-text="确定" ok-type="danger" cancel-text="取消" @confirm="removeApp">
                <template slot="title">
                    <p>确认要删除{{AppInfo.name}}吗</p>
                </template>
                <a-button type="danger" :loading="loading.deleteAppLoading">
                    删除软件
                </a-button>
            </a-popconfirm>
        </a-space>
      </a-tab-pane>
    </a-tabs>
</a-layout>

    

</template>

     
<script>
import axios from 'axios';
import { message } from 'ant-design-vue';
import qs from 'qs'

//Plan表格的列
const planTableCols = [
  {
    title: '标识符',
    dataIndex: 'code',
    key: 'code',
    scopedSlots: { customRender: 'codeSlot' },
  },
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'nameSlot' },
  },
  {
    title: '说明',
    dataIndex: 'explanation',
    key: 'explanation',
    scopedSlots: { customRender: 'explanationSlot' },
  },
  {
    title: '价格',
    key: 'price',
    dataIndex: 'price',
    scopedSlots: { customRender: 'priceSlot' },
  },
  {
    title: '原价',
    key: 'oriprice',
    dataIndex: 'oriprice',
    scopedSlots: { customRender: 'oripriceSlot' },
  },
  {
    title: '时长(天)',
    key: 'duration',
    dataIndex: 'duration',
    scopedSlots: { customRender: 'durationSlot' },
  },
  {
    title: '生效',
    key: 'active',
    dataIndex: 'active',
    scopedSlots: { customRender: 'activeSlot' },
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'actionSlot' },
  },
];


export default {
    name: 'AppManage',
    data() {
        return {
            currentTab: ['statisics'],
            AppInfo: undefined,
            loading: {
                setEnabledLoading: false,
                contentLoading: true,
                deleteAppLoading: false
            },
            newTag: undefined,
            planTableCols,
            planEditInfo: {
                editing: false, //有行正在编辑。此次其它的行禁用
                newInfo: {}
            }
        }
    },
    methods: {
        setAppEnabled(enabled) {
            this.loading.setEnabledLoading = true;
            axios.get("/publisher/updateappinfo", {
                params: {
                    appid: this.$route.params.id,
                    action: enabled?'enable':'disable'
                }
            }).then(res => {
                if (res.data.success) this.reload().then(()=>{this.loading.setEnabledLoading = false;});
                else {
                    message.error('操作执行失败');
                    console.error('执行setAppEnabled时遇到错误：', res.data);
                    this.loading.setEnabledLoading = false;
                }
            });
        },
        removeApp() {
            this.loading.deleteAppLoading = true;
            axios.get('/publisher/removeapp', {
                params: {
                    appid: this.$route.params.id,
                }
            }).then((res)=>{
                if (res.data.success) {
                    this.$router.push('/publisher/apps');
                } else {
                    if (res.data.errcode==='still_using') {
                        message.error('不能删除软件，仍然有用户在使用它。您可以尝试下架软件。');
                    } else {
                        message.error('删除软件失败');
                        console.error('删除软件失败', res.data);
                    }
                    this.loading.deleteAppLoading = false;
                }
            });
        },
        removePlan(plan_id) {
            axios.get('/publisher/removeplan', {
                params: {
                    planid: plan_id,
                }
            }).then((res)=>{
                if (res.data.success) {
                    this.reload();
                } else {
                    if (res.data.errcode==='still_using') {
                        message.error('不能删除付费方案，仍然有用户在使用它。您可以尝试禁用它。');
                    } else {
                        message.error('删除付费方案失败');
                        console.error('删除付费方案失败', res.data);
                    }
                }
            });
        },
        setBasicInfo() {
            this.loading.contentLoading = true;
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
                    this.loading.contentLoading = false;
                }
            });
        },
        reload() {
            this.loading.contentLoading = true;
            return axios.get("/appdetail", {
                params: {
                    appid: this.$route.params.id
                }
            }).then(res=>{
                if (res.data.success) {
                    this.AppInfo = res.data.detail;
                    for (let i=0; i<this.AppInfo.subscribePlans.length; ++i) {
                        this.AppInfo.subscribePlans[i].key = i; //设置key
                        this.AppInfo.subscribePlans[i].editing = false; //是否处在编辑模式
                    }
                    this.loading.contentLoading = false;
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
        },
        planEditClicked(plankey) {
            const newData = [...this.AppInfo.subscribePlans];
            const target = newData.filter(item => plankey === item.key)[0];
            if (target) {
                this.planEditInfo.newInfo = {...target}; //把行值复制到newInfo
                target.editing = true;//开启行编辑
                this.AppInfo.subscribePlans = newData; //
                this.planEditInfo.editing = true; //action列的其他行禁用
            }
        },
        planEditCancelClicked(plankey) {
            const newData = [...this.AppInfo.subscribePlans];
            const target = newData.filter(item => plankey === item.key)[0];
            if (target) {
                target.editing = false; //关闭行编辑
                this.AppInfo.subscribePlans = newData; //触发更新
                this.planEditInfo.editing = false;//恢复action列其他行的disable状态
            }
        },
        planEditSaveClicked(plankey) {
            const newData = [...this.AppInfo.subscribePlans];
            for (let i=0; i<newData.length; ++i) {
                if (newData[i].key === plankey) {
                    this.updatePlanInfo(this.planEditInfo.newInfo).then(()=>{ //请求服务器更新
                        newData[i] = {...this.planEditInfo.newInfo}; //复制新值
                        newData[i].editing = false; //关闭行编辑
                        this.AppInfo.subscribePlans = newData; //触发更新
                        this.planEditInfo.editing = false; //恢复action列其他行的disable状态
                    }); 
                    break;
                }
            }
        },
        updatePlanInfo(info) {
            return axios.post("/publisher/changeplaninfo", qs.stringify({
                data: encodeURIComponent(JSON.stringify(info))
            })).then(res => {
                return new Promise((resolve, reject)=>{
                    if (res.data.success) {
                        message.success('修改已保存');
                        resolve();
                    } else {
                        message.error('操作执行失败');
                        console.error('执行updatePlanInfo时遇到错误：', res.data);
                        reject();
                    }
                })
            });
        },
        iconUploadStatusChange(info) {
            if (info.file.status === 'done') {
                message.success("图标上传成功");
            } else if (info.file.status === 'error') {
                message.error("图标上传失败");
            }
        },
        newPlanClicked() {
            axios.get('/publisher/newplan', {params:{
                appid: this.$route.params.id
            }}).then((res)=>{
                if (res.data.success) {
                    this.reload();
                } else {
                    message.error('创建订阅项目失败');
                    console.error('创建订阅项目失败', res.data);
                }
            });
        },
        installUploadStatusChange(info) {
            if (info.file.status === 'done') {
                message.success("上传成功");
            } else if (info.file.status === 'error') {
                message.error("上传失败");
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