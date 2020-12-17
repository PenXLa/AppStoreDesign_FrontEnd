<template>
  <div id="HomeFrame">
    <p id="searchArea" style="margin: 1em">
      <a-input-search style="width: 320px;margin: 0px 10px 0px 10px;" enter-button v-model="searchInfo.searchText" @search="doSearch" />
      <a-select style="margin: 0px 10px 0px 10px; width: 120px" v-model="searchInfo.orderby" @change="doSearch">
        <a-select-option value="def">综合</a-select-option>
        <a-select-option value="name">名字</a-select-option>
        <a-select-option value="price">价格</a-select-option>
        <a-select-option value="rating">评分</a-select-option>
        <a-select-option value="sell">销量</a-select-option>
      </a-select>
      <a-select v-model="searchInfo.order" style="margin: 0px 10px 0px 10px" @change="doSearch">
        <a-select-option value="asc">升序</a-select-option>
        <a-select-option value="desc">降序</a-select-option>
      </a-select>
      <a-checkbox style="margin: 0px 10px 0px 10px" v-model="searchInfo.priceRangeEnabled" @change="doSearch">
        启用价格筛选
      </a-checkbox>
      <a-slider v-if="searchInfo.priceRangeEnabled" range :step="10" v-model="searchInfo.priceRange" @afterChange="priceRangeChange" :max="searchInfo.priceRangeMax"/>
    </p>
    <AppList ref='appList'/>
  </div>
</template>

<script>
import AppList from '@/views/AppList.vue'
export default {
  name: 'Home',
  components: {
    AppList
  },
  data() {
    return {
      searchInfo: {
        searchText: "",
        orderby: 'def',
        order: 'asc',
        priceRange: [0, 1000],
        priceRangeMax: 1000,
        priceRangeEnabled: false
      },
      
    }
  },
  methods: {
    doSearch() {
      this.$refs.appList.appname = this.searchInfo.searchText;
      this.$refs.appList.currentPage = 1;
      this.$refs.appList.order = this.searchInfo.order;
      this.$refs.appList.orderby = this.searchInfo.orderby;
      if (this.searchInfo.priceRangeEnabled) {
          this.$refs.appList.lowprice = this.searchInfo.priceRange[0];
          this.$refs.appList.highprice = this.searchInfo.priceRange[1];
      } else {
          this.$refs.appList.lowprice = undefined;
          this.$refs.appList.highprice = undefined;
      }
      this.$refs.appList.search();
    },
    priceRangeChange() {
      this.searchInfo.priceRangeMax = this.searchInfo.priceRange[1] * 1.2 + 10;
      this.doSearch();
    }
  },
  mounted() {
    this.doSearch();
  }
}
</script>

<style scoped>
#HomeFrame {
  background-color: white;
}
#searchButton {
  color: black;
  padding: 5px 10px 5px 10px;
  border: 1px solid #78afe2;
  margin: 0px 10px 0px 10px;
}
#searchArea {
  text-align: center;
}
</style>