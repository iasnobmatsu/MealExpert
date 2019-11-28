import {rendersignup} from "./signup.js";
import {renderRecord} from "./record.js";

export function renderlogin() {

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




export async function loginOnClick() {
    let username = $('#login-username').val();
    let password = $('#login-password').val();
    let loginreturn = await loginUser(username, password);

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let day = today.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    today = '' + year + month + day;
    let defaultdate = "" + year + "-" + month + "-" + day;

    if (loginreturn != 'error') {
        document.cookie = "newjwt=" + loginreturn.data.jwt;
        await renderRecord(defaultdate, today);

    }

}


$('body').on('click', '#login', loginOnClick);
$('body').on('click', '.redirect-signup', rendersignup);