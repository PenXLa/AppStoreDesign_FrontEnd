import axios from 'axios'
var userInfo = {
    loggedIn: false,
    email: '',
    name: '',
    role: ''
}
function refreshUserInfo() {
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
  return (year>0?year+'年':'') + (mon>0?mon+'月':'') + (d>0?d+'日':'');
}

function byte2str(len) {
  if (len >= 1n<<60n) {
    return Math.round(Number(BigInt(len)/(1n<<60n)), 2) + 'EB';
  } else if (len >= 1n<<50n) {
    return Math.round(Number(BigInt(len)/(1n<<50n)), 2) + 'PB';
  } else if (len >= 1n<<40n) {
    return Math.round(Number(BigInt(len)/(1n<<40n)), 2) + 'TB';
  } else if (len >= 1n<<30n) {
    return Math.round(Number(BigInt(len)/(1n<<30n)), 2) + 'GB';
  } else if (len >= 1n<<20n) {
    return Math.round(Number(BigInt(len)/(1n<<20n)), 2) + 'MB';
  } else {
    return Math.round(Number(BigInt(len)/(1n<<10n)), 2) + 'KB';
  }
}

const APIURL = process.env.NODE_ENV === 'production' ? 
                              'https://impxl.cn/AppStoreAPI' :
                              'http://localhost:8080/AppStoreAPI';  
export default {
  userInfo,
  refreshUserInfo,
  APIURL,
  utils: {
    day2ymd,
    byte2str
  }
}