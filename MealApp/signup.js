import {renderlogin} from "./login.js";

export function rendersignup() {
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
                    "email": email
                }
            }
        })

        return result;
    } catch (error) {
        $('.warning-cont').empty().append($(`<p class='has-background-danger has-text-white'>${error}. Use other usernames.</p>`));
        return 'error';
    }
}





export async function signUpOnClick() {
    let username = $('#signup-username').val();
    let email = $('#signup-email').val();
    let password = $('#signup-password').val();
    let password2 = $('#confirm').val();
    if (username == '' || email == '' || password == '' || password2 == '') {
        $('.warning-cont').empty().append('<p class="has-background-danger has-text-white">All fields must be filled</p>')
    } else if (password !== password2) {
        $('.warning-cont').empty().append('<p class="has-background-danger has-text-white">Your password does not match.</p>')
    } else {
        document.getElementById('confirm').setCustomValidity('');
        let createduser = await createUser(username, password, email);
        if (createduser != 'error' && createduser.data.status == "Successfully made account") {
            $('.forms-body').empty().append($(`<p class='has-background-success'><a class='redirect-login has-text-white'>You have signed up successfully!. Click to login!.</a></p>`))
        }
    }
}


$('input').on('change', () => {
    $('.warning-cont').empty();
})


$('body').on('click', '#signup', signUpOnClick);
$('body').on('click', '.redirect-login', renderlogin);


