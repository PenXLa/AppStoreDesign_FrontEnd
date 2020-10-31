function getQueryStringByName(name){
    let result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
}

function login() {
    $.ajax({
        url: 'login',
        type: 'POST',
        dataType: 'JSON',
        cache: false,
        data: $('#loginForm').serialize(),
        success: function( res ) {
            if (res.result == 1) {
                let url = getQueryStringByName("url");
                if (url != "") window.location.href=url;
                else window.location.href='index.jsp';
            } else if (res.result == 2) {
                alert("验证码错误");
            } else if (res.result == 3) {
                alert("用户名或密码错误");
            } else if (res.result == 4) {
                alert("登录时遇到服务器错误");
            } else if (res.result == 5) {
                alert("输入格式错误");
            }
        },
        error: function() {
            alert("AJAX执行错误");
        }
    });
}

function register() {

}

function logout() {
    let xhr=new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState==4 && xhr.status==200) {
            location.reload();
        }
    }

    xhr.open('get', 'logout', true);
    xhr.send();
}