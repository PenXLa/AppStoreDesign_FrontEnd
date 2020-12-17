<template>
    <div id="DetailFrame">
      <a-skeleton :loading="!(appdetail && comments)" active>
        <div id="AppPresenter">
          <table>
            <tr>
              <td>
                <img id="AppIcon" :src="$Global.APIURL+appdetail.icon"/>
              </td>
              <td id="AppDescription">
                  <h1>{{appdetail.name}}</h1>
                  <p id="Publisher">
                    由 {{appdetail.publisher}} 开发
                    <a :href="appdetail.site" target="_blank" id="officalSite">
                      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M762.24 506.88a32 32 0 0 1-46.08-44.16l55.68-58.24a125.76 125.76 0 0 0-12.16-171.2c-48.32-50.24-119.68-54.72-160-12.48L444.16 384a125.76 125.76 0 0 0 12.16 171.2 32 32 0 0 1 0 45.12 32 32 0 0 1-45.44 0 189.44 189.44 0 0 1-12.16-259.52l155.52-162.24c66.88-69.76 180.48-64 252.8 12.8A189.44 189.44 0 0 1 818.24 448z" p-id="2917"></path><path d="M229.76 517.12a32 32 0 0 1 46.08 44.16l-55.68 58.24a125.76 125.76 0 0 0 12.16 171.2c48.32 50.24 119.68 54.72 160 12.48L547.84 640a125.76 125.76 0 0 0-12.16-171.2 32 32 0 0 1 0-45.12 32 32 0 0 1 45.44 0 189.44 189.44 0 0 1 12.16 259.52L437.76 845.44c-66.88 69.76-180.48 64-252.8-12.8A189.44 189.44 0 0 1 173.76 576z" p-id="2918"></path></svg>
                      官网链接
                    </a>
                  </p>
                  <p>
                    <span id="AppRating">{{appdetail.rating.toFixed(1)}}</span>
                    <br/>
                    <span style="font-size:9px;color:#999">共 {{comments.count}} 人评分</span>
                  </p>
                  <TagDisplay :tags="appdetail.tags"/>
              </td>
              <td>
                <a-button type="primary" class="BuyButton" v-if="!appdetail.mainPlan.bought" @click="prepareToBuyMain">
                  <b v-if="appdetail.mainPlan.price===0" class="freeprice">免费获取</b>
                  <span class='price' v-else>￥{{appdetail.mainPlan.price}}</span>&nbsp;
                  <s class="oriprice" v-if="appdetail.mainPlan.oriprice > appdetail.mainPlan.price">￥{{appdetail.mainPlan.oriprice}}</s>
                </a-button>
                <a-button type="primary" class="BuyButton" disabled v-else>
                  <b style="font-size:16px">已拥有</b>
                </a-button>
              </td>
            </tr>
          </table>
        </div>
        <h1 v-if="appdetail.subscribePlans.length>0">应用内订阅</h1>
        <div id="AppPlanContainer">
          <PlanItem class="AppPlanItem" v-for="plan in appdetail.subscribePlans" 
                :key="plan.id" :title="plan.name" :planid="plan.id" :duration="plan.duration"
                :explanation="plan.explanation" :price="plan.price" :oriprice="plan.oriprice"
                @click="prepareToSubscribe(plan.id)"/>
        </div>
        <div style="padding-top:20px">
          <h1>详细信息</h1>
          <p v-html="appdetail.introduction" />
          <h1>系统需求</h1>
          <p>
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
              <tr v-if="appdetail.req_other">
                <td>其它</td>
                <td>{{appdetail.req_other}}</td>
              </tr>
            </table>
          </p>
          <h1>用户评论</h1>
          <p>
            评论排序方式：
            <a-select v-model="commentsOrder" @change="fetchComments">
              <a-select-option value="rating-highest">评分最高</a-select-option>
              <a-select-option value="rating-lowest">评分最低</a-select-option>
              <a-select-option value="date-latest">最新评论</a-select-option>
              <a-select-option value="date-oldest">最早评论</a-select-option>
            </a-select>
            <a-list :header="`共 ${comments.count} 条评论`" item-layout="horizontal" :data-source="comments.comments">
              <template v-slot:renderItem="item">
                <a-list-item>
                  <a-comment :author="item.authorName">
                    <template v-slot:content>
                      <a-rate :value="item.rating/2" allow-half disabled />
                      <p>{{ item.content }}</p>
                    </template>
                    <template v-slot:datetime>
                      <a-tooltip :title="item.date|moment('YYYY/MM/DD HH:mm:ss')">
                        <span>{{ item.date|moment("from") }}</span>
                      </a-tooltip>
                    </template>
                  </a-comment>
                </a-list-item>
              </template>
            </a-list>
          </p>
          
          <h3>发表评论</h3>
          <p>
            <a-form>
              <a-form-item>
                <a-textarea v-model="newComment.content" :maxLength="200"/>
              </a-form-item>
              <a-form-item>
                <a-rate allow-half v-model="newComment.rating"/>
              </a-form-item>
              <span style="font-size:9px; color=#afafaf">*如果您以前评论过该软件，则新发的评论会替代旧评论</span>
              <a-form-item>
                <a-tooltip>
                  <template v-slot:title v-if="!appdetail.mainPlan.bought">
                    需要先购买软件才能评论
                  </template>
                  <a-button html-type="submit" :loading="newComment.submitting" :disabled="!appdetail.mainPlan.bought" type="primary" @click="submitComment">
                    发表评论
                  </a-button>
                </a-tooltip>
              </a-form-item>
            </a-form>
          </p>
        </div>
      </a-skeleton>


      <!-- 购买时显示的对话框 -->
      <a-modal title="请确认购买信息" :visible="checkBoxVisible" okText="支付" :confirm-loading="buying" 
                @ok="buy" @cancel="checkBoxVisible=false">
        <table id="buyInfoTable">
          <tr>
            <td>产品：</td>
            <td>
              <a-avatar shape="square" :src="$Global.APIURL + appdetail.icon"/>
              <b style="margin-left:1em">{{appdetail.name}}</b>
            </td>
          </tr>
          <tr v-if="!selectedPlan.isMain">
            <td>订阅项目：</td>
            <td><b>{{selectedPlan.name}}</b></td>
          </tr>
          <tr>
            <td>时长：</td>
            <td>
              <b v-if="selectedPlan.duration>0">{{selectedPlan.duration}} 天</b>
              <b v-else>永久</b>
            </td>
          </tr>
          <tr>
            <td>支付金额：</td>
            <td><b>{{(~~selectedPlan.price).toFixed(2)}} 元</b></td> <!-- ~~可以把undefined转换成0 -->
          </tr>
        </table>
      </a-modal>
      <a-modal title="支付结果" :visible="payResultBoxVisible" footer="" @cancel="payResultBoxVisible=false">
        <a-result v-if="buyResult.success" status="success" title="购买成功" 
                            :sub-title="`订单号：${buyResult.orderid}`">
          <template #extra>
            <router-link to="/user/myapps"><a-button type="primary">查看</a-button></router-link>
            <router-link to="/user/orders"><a-button>订单</a-button></router-link>
          </template>
        </a-result>
        <div v-else>
          <a-result v-if="buyResult.errorcode==='no_money'" status="error" title="购买失败" sub-title="余额不足">
            <template #extra>
              <router-link to="/user/billing"><a-button type="primary">充值</a-button></router-link>
            </template>
          </a-result>
          <a-result v-else-if="buyResult.errorcode==='rebuy'" status="error" title="购买失败" sub-title="你之前已经拥有此产品，不能重复购买"/>
          <a-result v-else-if="buyResult.errorcode==='invalid_product'" status="error" title="购买失败" sub-title="购买的产品不存在或尚未上架"/>
          <a-result v-else status="error" title="购买失败" sub-title="请检查是否登录"/>
        </div>
        
      </a-modal>
    </div>
</template>

     
<script>
import axios from 'axios'
import qs from 'qs'
import TagDisplay from '@/components/public/TagDisplay.vue';
import PlanItem from '@/components/public/PlanItem.vue';
import { message } from 'ant-design-vue';
export default {
  name: 'AppDetail',
  data() {
    return {
      appdetail: undefined, //app信息
      comments: undefined,  //评论
      newComment: {         //新发评论
        content: '',  
        rating: 0,
        submitting: false
      },
      checkBoxVisible: false,//购买时的信息确认框Visible
      payResultBoxVisible: false,//购买结果框visible
      buying: false,        //是否在请求购买api
      selectedPlan: {},      //选中的购买plan
      buyResult: {},
      commentsOrder: 'rating-highest',
    }
  },
  methods: {
    fecthPageData() {
        this.fetchAppInfo();
        this.fetchComments();
    },
    fetchAppInfo() {
      axios.get("/appdetail", {
          params: {
            appid: this.$route.params.id,
          }
      }).then(res=>{
          if (res.data.success) {
            this.appdetail = res.data.detail;
          } else {
            console.error("Error occured when request /appdetail：", res.data.reason, res);
          }
      });
    },
    fetchComments() {
        axios.get("/appcomments", {
            params: {
              appid: this.$route.params.id,
              orderby: this.commentsOrder
            }
        }).then(res=>{
            if (res.data.success) {
              this.comments = res.data;
            } else {
              console.error("Error occured when request /appcomments", res.data.reason, res);
            }
        });
    },
    submitComment() {
      if (this.newComment.rating === 0) {
          message.error("请先评分");
      } else {
          this.newComment.submitting = true;
          axios.get("/newcomment", {
              params: {
                  appid: this.$route.params.id,
                  rating: this.newComment.rating*2,
                  content: this.newComment.content
              }
          }).then((res)=>{
              if (res.data.success) {
                  message.success("评论完成");
                  this.tempUpdateComments(this.newComment.content, this.newComment.rating*2);
                  this.newComment.content = '';
              } else {
                  message.error("评论失败");
                  console.error("Error occured when request /newcomment", res.data);
              }
              this.newComment.submitting = false;
          });
      }
    },
    tempUpdateComments(cont, rat) { //用户发表新评论后，不再从后台加载评论，而是直接把内容加到前台。这个是加载到前台的函数。这个函数不会改变comments.count，不过问题不大
      console.log(this.comments);
      this.comments.comments = this.comments.comments.filter(comment=>comment.authorID!==this.$Global.userInfo.uid).concat({
          authorID: this.$Global.userInfo.uid,
          authorName: this.$Global.userInfo.name,
          content: cont,
          rating: rat,
          date: new Date().getTime()
      });
    },
    prepareToBuyMain() {
      this.selectedPlan = this.appdetail.mainPlan;
      this.checkBoxVisible = true;
    },
    prepareToSubscribe(planid) {
      if (this.appdetail.mainPlan.bought) {
        this.selectedPlan = this.appdetail.subscribePlans.filter(x=>x.id===planid)[0];
        this.checkBoxVisible = true;
      } else {
        message.info("必须先购买软件本身，才能订阅它的内容");
      }
    },
    buy() {
        this.buying = true;
        axios.post("/buy", qs.stringify({
            appid: this.$route.params.id,
            planid: this.selectedPlan.id
        })).then((res)=>{
            this.buying = false;
            this.checkBoxVisible = false;
            this.payResultBoxVisible = true;
            this.buyResult = res.data;
            if (res.data.success) {
              this.fecthPageData();//更新页面信息
              this.$Global.refreshUserInfo(); //更新余额信息
            } else {
              console.error("failed to buy:", res.data);
            }
        });
    },
  },
  created() {
    this.fecthPageData();
  },
  components: {TagDisplay, PlanItem}
}
</script>


<style scoped>
#DetailFrame {
  margin: 40px;
  background: white;
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
#Publisher {
  color:#2d2d2d;
  font-size: 14px;
}
#AppRating {
  color: #40a9ff;
  font-size: 24px;
  font-weight: bold;
}
#AppRating:after {
  content: '分';
  font-size: 12px;
  font-weight: normal;
  margin-left: 2px;
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
    color: #ffffff94;
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

#buyInfoTable tr {
  line-height: 50px;
}
</style>