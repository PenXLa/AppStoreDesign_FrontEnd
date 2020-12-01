<template>
<a-layout>
    <a-layout-header>
        <a-menu v-model="currentTab" mode="horizontal">
        <a-menu-item key="statisics"> 统计信息 </a-menu-item>
        <a-menu-item key="data"> 软件信息 </a-menu-item>
        <a-menu-item key="plans"> 付费方案 </a-menu-item>
        <a-menu-item key="operations"> 执行操作 </a-menu-item>
    </a-menu>
    </a-layout-header>
    <a-layout-content>
        <div v-if="currentTab[0]==='statisics'">
            <a-skeleton :loading="loading" active>
                statisics
            </a-skeleton>
        </div>
        <div v-if="currentTab[0]==='data'">
            <a-skeleton :loading="loading" active>
                <a-form :model="AppInfo">
                    <a-form-item label="软件ID">
                        <a-input v-model="AppInfo.id" />
                    </a-form-item>
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
                            <a-col :span="6">
                                <a-card :title="'硬盘（' + $Global.utils.byte2str(AppInfo.hardDisk) + '）'" :bordered="false">
                                    <a-input-number style="width:100%" :min="0" v-model="AppInfo.hardDisk"/> 
                                </a-card>
                            </a-col>
                            <a-col :span="6">
                                <a-card title="RAM（字节）" :bordered="false">
                                    <p>card content</p>
                                </a-card>
                            </a-col>
                            <a-col :span="6">
                                <a-card title="Card title" :bordered="false">
                                    <p>card content</p>
                                </a-card>
                            </a-col>
                            <a-col :span="6">
                                <a-card title="Card title" :bordered="false">
                                    <p>card content</p>
                                </a-card>
                            </a-col>
                        </a-row>
                    </a-form-item>
                    <a-button type="primary" html-type="submit" >保存修改</a-button>
                </a-form>
            </a-skeleton>
        </div>
        <div v-if="currentTab[0]==='plans'">
            <a-skeleton :loading="loading" active>
                plans
            </a-skeleton>
        </div>
        <div v-if="currentTab[0]==='operations'">
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
        </div>
    </a-layout-content>
</a-layout>

    

</template>

     
<script>
import axios from 'axios';
import { message } from 'ant-design-vue';
export default {
    name: 'AppManage',
    data() {
        return {
            currentTab: ['statisics'],
            AppInfo: undefined,
            loading: true,
            newTag: undefined
        }
    },
    methods: {
        getBasicInfo() {
            return axios.get("/appdetail", {
                params: {
                    id: this.$route.params.id
                }
            });
        },
        getExInfo() {
            return axios.get("/publisher/appdetail", {
                params: {
                    id: this.$route.params.id
                }
            });
        },
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
        reload() {
            this.loading = true;
            axios.all([this.getBasicInfo(), this.getExInfo()]).then(axios.spread((basic, ex)=>{
                if (basic.data.success && ex.data.success) {
                    this.AppInfo = basic.data.detail;
                    this.AppInfo = Object.assign(this.AppInfo, ex.data.detail);
                    this.loading = false;
                } else {
                    message.error('获取信息失败');
                    console.error('PublisherAppDetail获取信息失败', basic, ex);
                }
            }));
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
.ant-layout-header {
    background: white;
}
.ant-layout-content {
    background: white;
}
</style>