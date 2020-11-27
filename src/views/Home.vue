<template>
  <div>
    <p id="searchArea" style="margin: 1em">
      <input class="mRoundTextbox" id="searchInputBox" v-model="searchText"/>
      <button class="mRoundButton" id="searchButton" @click='doSearch'>搜索</button>
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
      searchText: ""
    }
  },
  methods: {
    doSearch() {
      this.$refs.appList.appname = this.searchText;
      this.$refs.appList.currentPage = 1;
      this.$refs.appList.search();
    }
  }
}
</script>

<style scoped>
#searchInputBox {
  background-color: rgba(0,0,0,0.025);
  border-color:  rgba(0,0,0,0.5);
  width: 240px;
  margin: 0px 10px 0px 10px;
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