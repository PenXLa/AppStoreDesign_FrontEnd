import axios from 'axios'
var userInfo = {
    loggedIn: false,
    email: '',
    name: ''
}
function updateUserInfo() {
  axios.get("/userinfo").then((res)=>{
    if (res.loggedIn) {
      userInfo.loggedIn = true;
      userInfo.name = res.name;
      userInfo.email = res.email;
    } else userInfo.loggedIn = false;
    console.log(res);
  })
}

export default {
  userInfo,
  updateUserInfo
}