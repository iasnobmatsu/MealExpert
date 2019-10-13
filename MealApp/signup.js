


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
        // result = JSON.stringify(result);
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

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
        // result = JSON.stringify(result);
        console.log(result.data);
    } catch (error) {
        console.log(error);
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
        // result = JSON.stringify(result);
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
    createUser(username, password,email);
    // console.log([username, email,password]);
} 



$('#signup').click(signUpOnClick);

$(document).ready(()=>{
     
});