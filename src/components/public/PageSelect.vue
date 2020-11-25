<template>
<div>
  <button class="mRoundButton" :disabled="current===1" @click="--current">&lt; 上一页</button>
  <label class="mRoundButton" :class="{selectedPage:i===current}" v-for="i in count" :key="i+minPage-1">
    <input type="radio" style="display:none" name="pageRadio" v-model="current" :value="i+minPage-1"/>
    {{i+minPage-1}}
  </label>
  <button class="mRoundButton" :disabled="current===count" @click="++current">下一页 &gt;</button>
</div>
</template>


<script>
  export default {
    name: 'PageSelect',
    props: {
      count: Number,
      initialPage: {
        type: Number,
        default: 1
      },
      displayNum: {
        type: Number,
        default: 9 //最多显示按钮数量
      }
    }, 
    data() {
      return {
        current: this.initialPage
      }
    },
    computed: {
      minPage() {
        return Math.max(1, this.current - parseInt(this.displayNum/2));
      }
    },
    watch: { 
      current() { //监听current的改变
        this.$emit("pageChanged");
      }
    }
  }
</script>


<style scoped>
.mRoundButton {
  padding: 5px 10px 5px 10px;
  color: black;
  margin: 5px;
}
.mRoundButton:active, .selectedPage {
  color:white;
  background: #0067b8;
}
</style>