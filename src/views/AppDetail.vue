<template>
    <div id="DetailFrame" v-if="appdetail !== null"> <!--这里加个v-if是防止appdetail还没加载出来时进行无用的渲染-->
      <div id="AppPresenter">
        <table>
          <tr>
            <td>
              <img id="AppIcon" :src="$Global.APIURL + '/images/icon/' + appdetail.id + '.' + appdetail.iconType"/>
            </td>
            <td id="AppDescription">
                <h1>{{appdetail.name}}</h1>
                <p id="DevName">
                  由 {{appdetail.dev}} 开发
                  <a :href="appdetail.site" target="_blank" id="officalSite">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M762.24 506.88a32 32 0 0 1-46.08-44.16l55.68-58.24a125.76 125.76 0 0 0-12.16-171.2c-48.32-50.24-119.68-54.72-160-12.48L444.16 384a125.76 125.76 0 0 0 12.16 171.2 32 32 0 0 1 0 45.12 32 32 0 0 1-45.44 0 189.44 189.44 0 0 1-12.16-259.52l155.52-162.24c66.88-69.76 180.48-64 252.8 12.8A189.44 189.44 0 0 1 818.24 448z" p-id="2917"></path><path d="M229.76 517.12a32 32 0 0 1 46.08 44.16l-55.68 58.24a125.76 125.76 0 0 0 12.16 171.2c48.32 50.24 119.68 54.72 160 12.48L547.84 640a125.76 125.76 0 0 0-12.16-171.2 32 32 0 0 1 0-45.12 32 32 0 0 1 45.44 0 189.44 189.44 0 0 1 12.16 259.52L437.76 845.44c-66.88 69.76-180.48 64-252.8-12.8A189.44 189.44 0 0 1 173.76 576z" p-id="2918"></path></svg>
                    官网链接
                  </a>
                </p>
                <p id="AppRating">评分：{{appdetail.rating}}</p>
                <TagDisplay :tags="appdetail.tags"/>
            </td>
            <td>
              <BuyButton class="BuyButton">
                <b v-if="appdetail.mainPlan.price===0" class="freeprice">免费获取</b>
                <span class='price' v-else>￥{{appdetail.mainPlan.price}}</span>&nbsp;
                <s class="oriprice" v-if="appdetail.mainPlan.oriprice > appdetail.mainPlan.price">￥{{appdetail.mainPlan.oriprice}}</s>
              </BuyButton>
            </td>
          </tr>
        </table>
      </div>
      <h1 v-if="appdetail.subscribePlans.length>0">应用内订阅</h1>
      <div id="AppPlanContainer">
        <PlanItem class="AppPlanItem" v-for="plan in appdetail.subscribePlans" 
              :key="plan.id" :title="plan.name" :planid="plan.id" :duration="plan.duration"
              :explanation="plan.explanation" :price="plan.price" :oriprice="plan.oriprice"/>
      </div>
      <h1>详细信息</h1>
      <p v-html="appdetail.introduction" />
      <h1>系统需求</h1>
      <table id="ReqTable">
        <tr v-if="appdetail.CPU">
          <td>CPU</td>
          <td>{{appdetail.CPU}}</td>
        </tr>
        <tr v-if="appdetail.GPU">
          <td>显卡</td>
          <td>{{appdetail.GPU}}</td>
        </tr>
        <tr v-if="appdetail.RAM && appdetail.RAM>=0">
          <td>RAM</td>
          <td>{{$Global.utils.byte2str(appdetail.RAM)}}</td>
        </tr>
        <tr v-if="appdetail.hardDisk && appdetail.hardDisk>=0">
          <td>存储空间</td>
          <td>{{$Global.utils.byte2str(appdetail.hardDisk)}}</td>
        </tr>
        <tr v-if="appdetail.OS">
          <td>操作系统</td>
          <td>{{appdetail.OS}}</td>
        </tr>
        <tr v-if="appdetail.reqOther">
          <td>其它</td>
          <td>{{appdetail.reqOther}}</td>
        </tr>
      </table>
      <h1>用户评论</h1>
      
    </div>
</template>

     
<script>
import axios from 'axios'
import TagDisplay from '@/components/public/TagDisplay.vue';
import PlanItem from '@/components/public/PlanItem.vue';
import BuyButton from '@/components/public/BuyButton.vue';
  export default {
    name: 'AppDetail',
    data() {
      return {
        appdetail: null
      }
    },
    beforeCreate() {
      axios.get("/appdetail", {
          params: {
            id: this.$route.params.id
          }
      }).then((res)=>{
        if (res.data.success) {
          this.appdetail = res.data.detail;
        } else {
          console.err("Error occured when request /appdetail：", res.data.reason, res);
        }
      });
    },
    components: {TagDisplay, PlanItem, BuyButton}
  }
</script>


<style scoped>
#DetailFrame {
  margin: 40px;
}
#AppIcon {
  width: 200px;
  height: 200px;
}
#AppPresenter {
  padding: 20px;
  box-shadow: 3px 3px 10px 0px #00000014;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
}
#AppDescription {
  vertical-align: top;
  padding: 0px 50px 0px 25px;
}
#DevName, #AppRating {
  color:#2d2d2d;
  font-size: 14px;
}
.AppPlanItem {
  margin: 5px 10px 5px 0px;
  min-width: 200px;
  max-width: 400px;
}
.BuyButton {
  padding: 15px 70px 15px 70px;
  min-width: 230px;
  min-height: 56px;
}
.oriprice {
    font-size: 14px;
    color: #acacac;
}
.price, .freePrice{
  font-size: 20px;
}
#AppPlanContainer {
  display: flex;
}
#officalSite {
  text-decoration: none;
}
#ReqTable td {
  padding-right: 20px;
}
</style>