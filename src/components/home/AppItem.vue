<template>
  <div class="appFrame">
    <div style="text-align: center">
      <img :src="$Global.APIURL + '/images/icon/' + appid + '.' + iconType" width="150" height="150" />
    </div>
    <p style="margin: 1em">
      <router-link :to="'/app/' + appid" class="appLink">{{name}}</router-link>
    </p>
    <p class="appRating" style="margin: 1em">评价：{{rating}}</p>
    <p style="margin: 10px 0px 10px 0px">
      <b class='freePrice' v-if="price===0">免费</b>
      <span class='price' v-else>￥{{price}}</span> 
      <s class="oriprice" v-if="oriprice > price">￥{{oriprice}}</s>
    </p>
    <TagDisplay :tags="tags"/>
  </div>
</template>

<script>
import TagDisplay from '@/components/public/TagDisplay.vue';
export default {
  name: "AppItem",
  props: {
    name: String,
    rating: Number,
    price: Number,
    oriprice: Number,
    tags: String,
    appid: String,
    iconType: {
      type: String,
      default: 'png'
    }
  },
  components: {
    TagDisplay
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
    max-width: 200px;
    text-align: center;
    border-radius: 5px;
    -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
}
.appFrame:hover {
    transform: scale(1.03);
    box-shadow: 6px 6px 10px 0px #00000014;
}
.appLink {
    color: #303030;
    text-decoration: inherit;
    white-space:pre-wrap;
    white-space:-moz-pre-wrap;
    white-space:-o-pre-wrap;
    word-wrap:break-word;
    font-size: 16px;
}
.appRating {
    color: #909090;
    font-size: 10px;
}
.appFrame td {
    padding: 0px;
}
.oriprice {
    font-size: 9px;
    color: #acacac;
}
.price, .freePrice{
  color: #505050;
}
.freePrice {
  font-size: 14px;
}
</style>
