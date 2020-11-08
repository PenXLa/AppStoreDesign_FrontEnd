<template>
<div id="PlanItemFrame">
  <table id="PlanItemTable">
    <tr>
      <td>
        <b>{{title}}</b>
        <p>{{explanation}}</p>
      </td>
      <td id="BuyCol">
        <BuyButton class="BuyButton">
          <b class="freeprice" v-if="price===0">免费订阅</b>
          <span class='price' v-else>￥{{price}}</span> <br/>
          <s class="oriprice" v-if="oriprice > price">￥{{oriprice}}</s>
        </BuyButton>
      </td>
    </tr>
  </table>
</div>
</template>


<script>
import BuyButton from '@/components/public/BuyButton.vue';
export default {
  name: 'PlanItem',
  props: {
    planid: String,
    title: String,
    explanation: String,
    price: Number,
    oriprice: Number,
    duration: Number
  },
  components: {
    BuyButton
  }
}
</script>


<style scoped>
#PlanItemFrame {
  box-shadow: 3px 3px 10px 0px #00000014;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  padding: 10px;
}
.BuyButton {
  min-width: 90px;
  min-height: 36px;
}
#PlanItemTable {
  width: 100%;
}
#BuyCol {
  text-align: right;
}
.freePrice {
  font-size: 14px;
}
.oriprice {
    font-size: 9px;
    color: #acacac;
}
</style>