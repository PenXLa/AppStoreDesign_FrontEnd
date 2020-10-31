<template>
  <div class="appFrame">
    <div style="text-align: center">
      <img src="http://localhost:8080/BackEnd_war_exploded/images/icon/word.png" width="150" height="150" />
    </div>
    <p>
      <a href="app.html" class="appLink">{{name}}</a>
    </p>
    <p class="appRating">评价：{{rating}}</p>
    <p style="margin: 10px 0px 10px 0px">
      <span>￥{{price}}</span> <s class="oriprice" v-if="false">￥30.00</s>
    </p>
    <div class="tagDiv">
      <span class="apptag" v-for="tag in tagList" :key="tag">{{tag}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppItem",
  props: {
    name: String,
    rating: Number,
    price: Number,
    tags: String,
  },
  computed: {
    tagList: function () {
      return this.tags.split("|");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.appFrame {
    display: inline-block;
    box-shadow: 3px 3px 10px 0px #00000014;
    border: 1px solid #dfdfdf;
    padding: 10px;
    margin: 10px 0px 0px 10px;
    max-width: 180px;
    text-align: center;
    border-radius: 5px;
}
.appLink {
    color: #505050;
    text-decoration: inherit;
    white-space:pre-wrap;
    white-space:-moz-pre-wrap;
    white-space:-o-pre-wrap;
    word-wrap:break-word;
}
.appRating {
    color: #909090;
    font-size: 10px;
}
.apptag {
    font-size: 10px;
    background-color: #dfdfdf;
    color: #6c6c6c;
    padding: 1px 2px 1px 2px;
    margin-right: 3px;
    border-radius: 3px;
}
.appFrame td {
    padding: 0px;
}
.oriprice {
    font-size: 9px;
    color: #acacac;
}
</style>
