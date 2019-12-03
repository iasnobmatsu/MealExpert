$('body').on('click','#logout', ()=>{
    document.cookie = "newjwt=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //delete cookie
    // let islogin = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(islogin);
    window.location="index.html"
});