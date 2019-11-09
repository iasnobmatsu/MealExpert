import Meal from "../meal.js";
let newjwt;
$(document).ready(()=>{
    // $('#appcont').append(rendermeals());
    newjwt='';
    renderlogin();
   
});



// signup=====================================================================================

export function rendersignup(){
    $('#root').empty();
    $('#root').append($(`    <div class='signuplogin'>    
    <h2 class='forms-title'>MealExpert Sign Up</h3>

    <div class='forms-body'>
        <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
                <input id='signup-username' class="input" type="text" placeholder="Input Username" value='' required>
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input id='signup-email' class="input" type="email" placeholder="Input Email" value="" required>
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </div>
        </div>


        <div class="field">
            <label class="label">Password</label>
            <p class="control has-icons-left">
                <input id='signup-password' class="input" type="password" placeholder="Password" required>
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>


        <div class="field">
            <label class="label">Confirm Password</label>
            <p class="control has-icons-left">
                <input id='confirm' class="input" type="password" placeholder="Password" required>
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>



        <div class="field is-grouped">
            <div class="control">
                <button id='signup' class="button is-outlined is-link">SignUp</button>
            </div>
            <div class="control">
                <a class="redirect-login button is-text has-text-dark">Already have an account? Login In.</a>
            </div>
        </div>

        <div class='warning-cont'></div>
    </div></div>`));
}

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
            $('.forms-body').empty().append($(`<p class='has-background-success'><a class='redirect-login has-text-white'>You have signed up successfully!. Click to login!.</a></p>`))
        }
    } 
} 


$('input').on('change',()=>{ 
    $('.warning-cont').empty();
})


$('body').on('click','#signup',signUpOnClick);

$('body').on('click','.redirect-login',renderlogin);
$('body').on('click','.redirect-signup',rendersignup);


//login======================================================================================
export function renderlogin(){
    $('#root').empty();
    $('#root').append($(`  <div class='signuplogin'>  
        <h2 class='forms-title'>MealExpert Login</h3>

            <div class='forms-body'>
                <br>
                <br>

                <div class="field">
                    <label class="label">Username</label>
                    <div class="control has-icons-left has-icons-right">
                        <input id='login-username' class="input" type="email" placeholder="Input Email" value="">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <p class="control has-icons-left">
                        <input id='login-password' class="input" type="password" placeholder="Password">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button id='login' class="button is-outlined is-link">Login</button>
                    </div>
                    <div class="control">
                        <a class="button redirect-signup is-text has-text-dark">Don't have an account yet? Sign Up.</a>
                    </div>
                </div>


                <div class='warning-cont'></div>
            </div></div>`));

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
        // console.log(result.data.jwt);
        return result;
    } catch (error) {
        $('.warning-cont').empty().append($(`<p class='has-background-danger has-text-white'>${error} Wrong username/password.</p>`));
        // console.log(error);
        return "error";
    }
}




export async function loginOnClick(){
    let username=$('#login-username').val();
    let password=$('#login-password').val();
    let loginreturn=await loginUser(username, password);

    if (loginreturn!='error'){
        newjwt=loginreturn.data.jwt;
        renderRecord();
        
    }
   
} 


$('body').on('click', '#login', loginOnClick);


//record================================================================================================\
export function renderRecord(){
    $('#root').empty();
    $('#root').append($(`
    <div class="menu">

    <ul class="menu-list">
        <li class='active has-text-weight-bold'><a>Record</a></li>
        <li><a>Planning</a></li>
        <li><a>Analysis</a></li>
    </ul>

</div>

<div class='container' id='appcont'>
    <h3 class='title has-text-centered'>Meal Expert</h3>

    <div id="#selectdate" class="forms-body has-text-centered">
        <div class="field">
            <label class="label"> Select A Date to View Meals</label>
            <p class="control has-text-centered has-icons-left">
                    <i class="fas fa-calendar-day"></i>
                <input id='dateinput' type="date">

            </p>

        </div>
    </div>

    <div class='forms-body editform'>
        <div class="field">
            <label class="label"> Add Consumed Meal:</label>
            <p class="control has-icons-left">
                <input class="input" placeholder="Meal">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <label class="label"> Add Calories:</label>
            <p class="control has-icons-left">
                <input class="input" placeholder="Calories">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
        </div>

        <div class="select field">
            <select>
                <option>breakfast</option>
                <option>lunch</option>
                <option>dinner</option>
                <option>other</option>
            </select>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button id='addmeal' class="button is-outlined is-link">Add</button>
            </div>
        </div>


    </div>

</div>`));
}

export function rendermeals(){

   let content=$(``);

return content;
}

//date--type--foodlist
//in future change into date-indexed objects, note new Date() also has a timestamp
export async function createMealRecord(jwt){
    let m=new Meal(new Date(),'breakfast');
    try{
    const result = await axios({
        method: 'post',
        headers:{
            "Authorization": "Bearer "+jwt
        },
        url: 'http://localhost:3000/user/record',
        data: {
            "data": {
                records:[m]
            }
          }
          
    })
    console.log(result);
    }catch(error){
        console.log(error);
    }
    

}

$('body').on('click','#addmeal', async()=>{
    console.log(newjwt);
    createMealRecord(newjwt);
});
