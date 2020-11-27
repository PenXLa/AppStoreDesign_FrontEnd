import axios from 'axios'
var userInfo = {
    loggedIn: false,
    email: '',
    name: '',
    role: ''
}
function updateUserInfo() {
  axios.get("/userinfo").then((res)=>{
    return new Promise(resolve => {
      if (res.data.loggedIn) {
        userInfo.loggedIn = true;
        userInfo.name = res.data.name;
        userInfo.email = res.data.email;
        userInfo.role = res.data.role;
      } else userInfo.loggedIn = false;
      resolve();
    });
  });
}

function day2ymd(day) {
  let year = parseInt(day/365);
  let mon = parseInt(day%365/30);
  let d = day%365%30;
  return (year>0?year+'年':'') + (mon>0?mon+'月':'') + (d>0?d+'天':'');
}

function byte2str(len) {
  if (len >= 1<<30) {
    return Math.round(len/(1<<30), 2) + 'GB';
  } else if (len >= 1<<20) {
    return Math.round(len/(1<<20), 2) + 'MB';
  } else {
    return Math.round(len/(1<<10), 2) + 'KB';
  }
}

const APIURL = process.env.NODE_ENV === 'production' ? 
                              'https://impxl.cn/AppStoreAPI' : //生产环境API
                              'http://localhost:8080/AppStoreAPI';  //开发环境APi
export default {
  userInfo,
  updateUserInfo,
  APIURL,
  utils: {
    day2ymd,
    byte2str
  }
}