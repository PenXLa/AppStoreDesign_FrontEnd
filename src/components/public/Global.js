import axios from 'axios'
var userInfo = {
    loggedIn: false,
    email: '',
    name: ''
}
function updateUserInfo() {
  axios.get("/userinfo").then((res)=>{
    if (res.data.loggedIn) {
      userInfo.loggedIn = true;
      userInfo.name = res.data.name;
      userInfo.email = res.data.email;
    } else userInfo.loggedIn = false;
  })
}

export default {
  userInfo,
  updateUserInfo
}