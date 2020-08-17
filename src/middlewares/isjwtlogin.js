export default function isLogin({next}) {
    var userdetails = sessionStorage.getItem("userdetails");
    if(userdetails !== null) {
        userdetails = JSON.parse(userdetails);
        if(userdetails.islogin === true && userdetails.login_user_token !== null) {
            return next();
        } else {
            sessionStorage.setItem('userdetails',{});
            return next({ name:"Login" });
        }
    } else {
        return next({ name:"Login" });
    }
}