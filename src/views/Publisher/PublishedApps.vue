<template>
<div>
  <a-skeleton :loading="loading" active>
    <a-list item-layout="horizontal" :data-source="apps">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta>
          <router-link slot="title" :to="'/publisher/app/' + item.id">{{ item.name }}</router-link>
          <a-avatar slot="avatar" shape="square"
            :src="$Global.APIURL + item.icon"
          />
          <div slot="description">
            <tag-display :tags="[item.price>0? item.price + '￥' : '免费', item.active?'已上架':'未上架']"/>
          </div>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-skeleton>
</div>
</template>

     
<script>
import { message } from 'ant-design-vue';
import axios from 'axios';
import TagDisplay from '@/components/public/TagDisplay.vue';
export default {
  name: 'PublishedApps',
  data() {
    return{
      apps: [],
      loading: true
    }
  },
  methods: {
    refreshApps() {
        axios.get('/publisher/apps').then((res)=>{
            if (res.data.success) {
                this.apps = res.data.searchResult.items;
                this.loading = false;
            } else {
                message.error('获取信息失败');
                console.error('PublishedApps获取信息失败', res.data);
            }
        });
    }
  },
  created() {
    this.refreshApps();
  },
  components: {
    TagDisplay
  }
}
</script>


<style scoped>

</style>