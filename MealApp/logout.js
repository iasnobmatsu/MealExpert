$('body').on('click','#logout', ()=>{
    document.cookie = "newjwt=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //delete cookie
    window.location="index.html"
});