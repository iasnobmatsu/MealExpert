

// signup=====================================================================================
export async function createUser(username, password, email) {
    try {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/account/create',
            data: {
                "name": username,
                "pass": password,
                "data": {
                  "email":email
                }
              }
        })
        
       return result;
    } catch (error) {
       $('.warning-cont').empty().append($(`<p class='has-background-danger has-text-white'>${error}. Use other usernames.</p>`)); 
       return 'error';
    }
}



export async function getUserStatus(jwt) {
    try {
        const result = await axios({
            method: 'get',
            url: 'http://localhost:3000/account/status',
            headers:{
                "Authorization": "Bearer "+jwt
            },
        })
        
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

// createUser("namex","passx","xxx@x.com")
// loginUser("namex","passx")
// getUserStatus('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZXgiLCJkYXRhIjp7ImVtYWlsIjoieHh4QHguY29tIn0sImlhdCI6MTU3MTAwMzA0NiwiZXhwIjoxNTczNTk1MDQ2fQ._GVOTuIYfiOqWqQhu9J9CoC-k_moVKa4_HbuLx4wTVI');


export async function signUpOnClick(){
    let username=$('#signup-username').val();
    let email=$('#signup-email').val();
    let password=$('#signup-password').val();
    let password2=$('#confirm').val();
    if (username==''||email==''||password==''||password2==''){
        console.log('empty field')
        $('.warning-cont').empty().append('<p class="has-background-danger has-text-white">All fields must be filled</p>')
    }else if (password!==password2){
        console.log('no match')
        $('.warning-cont').empty().append('<p class="has-background-danger has-text-white">Your password does not match.</p>')
    }else{
        document.getElementById('confirm').setCustomValidity('');
        let createduser=await createUser(username, password,email);
        console.log(createduser);
        if (createduser!='error' && createduser.data.status=="Successfully made account"){
            $('.forms-body').empty().append($(`<p class='has-background-success'><a class='has-text-white' href='login.html'>You have signed up successfully!. Click to login!.</a></p>`))
        }
    } 
} 


$('input').on('change',()=>{ 
    $('.warning-cont').empty();
})


$('body').on('click','#signup',signUpOnClick);



//login======================================================================================

export async function loginUser(username, password) {
    try {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/account/login',
            data: {
                "name": username,
                "pass": password
              }
        })
        // console.log(result.data.jwt);
        return result;
    } catch (error) {
        $('.warning-cont').empty().append($(`<p class='has-background-danger has-text-white'>${error} Wrong username/password.</p>`));
        // console.log(error);
        return "error";
    }
}



let jwt='';
export async function loginOnClick(){
    let username=$('#login-username').val();
    let password=$('#login-password').val();
    let loginreturn=await loginUser(username, password);

    if (loginreturn!='error'){
        jwt=loginreturn.data.jwt;
        $(location).attr('href', 'index.html');
    }
   
} 


$('#login').click(loginOnClick);

$(document).ready(()=>{
     
});


//