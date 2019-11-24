import Meal from "../meal.js";


$(document).ready(() => {
    renderlogin();
    google.charts.load('current', {
        'packages': ['corechart']
    });

});



// signup=====================================================================================

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



export async function getUserStatus(jwt) {
    try {
        const result = await axios({
            method: 'get',
            url: 'http://localhost:3000/account/status',
            headers: {
                "Authorization": "Bearer " + jwt
            },
        })

        // console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

// createUser("namex","passx","xxx@x.com")
// loginUser("namex","passx")
// getUserStatus('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZXgiLCJkYXRhIjp7ImVtYWlsIjoieHh4QHguY29tIn0sImlhdCI6MTU3MTAwMzA0NiwiZXhwIjoxNTczNTk1MDQ2fQ._GVOTuIYfiOqWqQhu9J9CoC-k_moVKa4_HbuLx4wTVI');


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
$('body').on('click', '.redirect-signup', rendersignup);


//login======================================================================================
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


//record================================================================================================\
export async function renderRecord(defaultdate, today) {



    $('#root').empty();
    $('#root').append($(`
    <div class="menu">

    <ul class="menu-list">
        <li class='active has-text-weight-bold'><a id='record'>Record</a></li>
        <li><a id='analysis'>Analysis</a></li>
        <li><a id='recipe'>Recipe</a></li>
        <li><a id='messageboard'>Messageboard</a></li>
    </ul>

</div>



<div class='container' id='appcont'>

<h3 class='title has-text-centered'>Meal Expert</h3>

<div id="selectdate" class="forms-body has-text-centered">
    <div class="field">
        <label class="label"> Select A Date to View Meals</label>
        <p class="control has-text-centered has-icons-left">
                <i class="fas fa-calendar-day"></i>
            <input id='dateinput' type="date" value=${defaultdate}>

        </p>

    </div>
</div>
   

    <div class='forms-body editform'>
    <div class="tabs is-centered">
  <ul>
    <li class='has-text-small is-active'><a id='database'>Use Database</a></li>
    <li class="has-text-small"><a id='own'>Create Your Own</a></li>
   

  </ul>
</div>

        <div class="field">
            <label class="label"> Add Consumed Food Item:</label>
            <p class="control has-icons-left">
                <input id='food' class="input" placeholder="Meal">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
            <div class='auto-cont'></div>
        </div>

        <div class="field">
            <label class="label"> Add Amount:</label>
            <p class="control has-icons-left">
                <input id='amount' class="input" placeholder="Amount in grams">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <label class="label"> Add Calories:</label>
            <p class="control has-icons-left">
                <input id='cal' class="input" placeholder="Calories">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
        </div>

        <div class="select field">
            <select id='type'>
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

    <div id='rendercont'></div>
   
</div>`));



    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(newjwt)
    await rendermeals(newjwt, today);
}


export async function rendermeals(jwt, date) {
    $('#rendercont').empty();
    let meals = await getMeals(jwt, date);
    let mealkeys = Object.keys(meals);
    let cont = $(`<div id='meal-table'></div>`)

    for (let i = 0; i < mealkeys.length; i++) {
        let onemeal = $(`<table class='${mealkeys[i]}'>
            <tr class="heading-table"><th>${mealkeys[i]}</th><td>calories</td><td>amount</td><td></td></tr></table>`);
        for (let j = 0; j < meals[mealkeys[i]].items.length; j++) {
            onemeal.append($(`<tr>
            <th>${meals[mealkeys[i]].items[j].food}</th>
            <td>${meals[mealkeys[i]].items[j].calorie} cal</td>
            <td>${meals[mealkeys[i]].items[j].amount} grams</td>
            <td><a data-date=${date} data-meal=${mealkeys[i]} class='is-link editmeal'>Edit</a></td>
            </tr>`))
        }

        let adddelete = $(`<div class='${mealkeys[i]}-cont meals-cont'><button data-date=${date} data-meal=${mealkeys[i]} class=" deletemeal is-outlined button is-small is-danger">Delete</button></div>`);
        adddelete.append(onemeal);
        cont.append(adddelete);
    }



    $('#rendercont').empty().append(cont)
}

export async function getMeals(jwt, date) {
    try {
        const result = await axios({
            method: 'get',
            headers: {
                "Authorization": "Bearer " + jwt
            },
            url: 'http://localhost:3000/user/record/' + date,
        })
        // console.log(result.data.result);
        return result.data.result;
    } catch (error) {
        console.log(error);
    }
}


//new food object for a date type
export async function createMealRecord(jwt, date, type, food, amount, calorie) {
    let datekey = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    try {
        const result = await axios({
            method: 'post',
            headers: {
                "Authorization": "Bearer " + jwt
            },
            url: 'http://localhost:3000/user/record/' + datekey + '/' + type,
            data: {
                "data": {
                    items: [{
                        food,
                        calorie,
                        amount
                    }]
                }
            }

        })
        // console.log(result);
    } catch (error) {
        console.log(error);
    }


}

//use this one, does not override all
//add food object for a date type
export async function createAddMealRecord(jwt, date, type, food, amount, calorie) {
    try {
        const result = await axios({
            method: 'post',
            headers: {
                "Authorization": "Bearer " + jwt
            },
            url: 'http://localhost:3000/user/record/' + date + '/' + type + '/items',
            data: {
                "type": "merge",
                "data": [{
                    food,
                    calorie,
                    amount
                }],

            }

        })
        // console.log(result);
    } catch (error) {
        console.log(error);
    }

    rendermeals(jwt, date);
}


//use this one, does not override all
//add food object for a date type
export async function createAddMealRecordExt(jwt, date, type, food, amount, calorie, nutrients, foodid) {
    try {
        const result = await axios({
            method: 'post',
            headers: {
                "Authorization": "Bearer " + jwt
            },
            url: 'http://localhost:3000/user/record/' + date + '/' + type + '/items',
            data: {
                "type": "merge",
                "data": {
                    food,
                    calorie,
                    amount,
                    foodid,
                    nutrients
                },

            }

        })
        // console.log(result);
    } catch (error) {
        console.log(error);
    }

    rendermeals(jwt, date);
}




// $('body').on('click', '#addmeal', async () => {
//     createAddMealRecordExt(jwt, date, type, food, amount, calorie, nutrients, foodid)
//     let datearray = $('#dateinput').val().match(/[0-9]*/g);
//     let date = datearray.reduce(function reducer(acc, cur) {
//         return acc + cur;
//     }, "");
//     let food = $('#food').val();
//     let cal = $('#cal').val();
//     let am = $('#amount').val();
//     let type = $('#type option:selected').text();
//     createAddMealRecord(newjwt, date, type, food, am, cal);
//     // let meals = await getMeals(newjwt, 20191109);
//     // await rendermeals(newjwt, date);
// });

$('body').on('change', '#dateinput', async () => {
    let datearray = $('#dateinput').val().match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    await rendermeals(newjwt, date);
});


export async function deleteWholeRecord(jwt) {
    let result = await axios({
        url: 'http://localhost:3000/user/record',
        headers: {
            "Authorization": "Bearer " + jwt
        },
        method: "delete",

    });
}
export async function deleteOneMeal(jwt, date, meal) {
    let result = await axios({
        url: 'http://localhost:3000/user/record/' + date + "/" + meal,
        headers: {
            "Authorization": "Bearer " + jwt
        },
        method: "delete",

    });
}

export async function getOneMeal(date, meal, jwt){
    let result=await axios({
        url: 'http://localhost:3000/user/record/' + date + "/" + meal,
        headers: {
            "Authorization": "Bearer " + jwt
        },
        method: "get",

    });
    console.log(result.data.result);
    return (result.data.result);
}

export async function saveOneMeal(date, meal, items, jwt){
    let result=await axios({
        url: 'http://localhost:3000/user/record/' + date + "/" + meal,
        headers: {
            "Authorization": "Bearer " + jwt
        },
        method: "post",
        data:{
            "data": {items}
        }

    });
    console.log(result.data.result);
    return (result.data.result);
}


$('body').on('click', '.deletemeal', async (e) => {
    let date = e.target.dataset.date;
    let meal = e.target.dataset.meal;
    // console.log(date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8));
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    await deleteOneMeal(newjwt, date, meal);
    await rendermeals(newjwt, date);

});


$('body').on('click', '.editmeal', async (e) => {
   
    let date = e.target.dataset.date;
    let meal = e.target.dataset.meal;
    // console.log(date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8));
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let tabler=$(e.target).parents('tr');
    // console.log(tabler[0]);
    let head=tabler.find('th').text();
    let c=tabler.children('td')[0].innerHTML.split(' ')[0];
    let a=tabler.children('td')[1].innerHTML.split(' ')[0];
    console.log(a);
    tabler.empty().append($(`
    <th>${head}</th>
    <td><input data-date=${date} data-meal=${meal} id='changec' value=${c} type='text'></td>
    <td><input data-date=${date} data-meal=${meal} id='changea' value=${a} type='text'></td>
    <td><a data-date=${date} data-meal=${meal} class='is-link saveeditedmeal'>save</a></td>
    `));
});

$('body').on('keyup', '#changea', async(e)=>{
    let date = e.target.dataset.date;
    let meal = e.target.dataset.meal;
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let meals=await getOneMeal(date,meal,newjwt);
    let tabler=$(e.target).parents('tr');
    let head=tabler.find('th').text();
    let items=meals.items;
    for (let i=0;i<items.length;i++){
        if (items[i].food==head){
            // console.log(head);
            let ene=parseFloat(items[i].calorie)/parseFloat(items[i].amount);
            console.log(ene);
            $('#changec').val(Math.floor(ene*parseInt($('#changea').val())));
        }
    }

});

$('body').on('keyup', '#changec', async(e)=>{
    let date = e.target.dataset.date;
    let meal = e.target.dataset.meal;
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let meals=await getOneMeal(date,meal,newjwt);
    let tabler=$(e.target).parents('tr');
    let head=tabler.find('th').text();
    let items=meals.items;
    for (let i=0;i<items.length;i++){
        if (items[i].food==head){
            // console.log(head);
            let ene=parseFloat(items[i].calorie)/parseFloat(items[i].amount);
            console.log(ene);
            $('#changea').val(Math.floor(parseFloat($('#changec').val())/(ene)));
        }
    }

});

$('body').on('click', '.saveeditedmeal', async (e) => {
    let date = e.target.dataset.date;
    let meal = e.target.dataset.meal;
    let tabler=$(e.target).parents('tr');
  
    let head=tabler.find('th').text();
    // console.log(head);

    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let meals=await getOneMeal(date,meal,newjwt);
    let items=meals.items;
    for (let i=0;i<items.length;i++){
        if (items[i].food==head){
            // console.log(head);
            
            items[i].calorie=$('#changec').val();
            items[i].amount=$('#changea').val();
        }
    }
    console.log(items);
    saveOneMeal(date, meal, items,newjwt);
    rendermeals(newjwt, date);

    


});




//=======================================================================================
//third party api   10 request per min
//edamam
//it has custom auto-complete function

export async function getAppid() {
    let result = await axios({
        method: 'get',
        url: "http://localhost:3000/public/appid",
    });
    return result.data.result;
}

export async function getKey() {
    let result = await axios({
        method: 'get',
        url: "http://localhost:3000/public/key",
    });
    return result.data.result;
}

//get food autocomplete
export async function getFoodAuto(food_item) {
    let key = await getKey();
    let appid = await getAppid();

    let result = await axios({
        method: 'get',
        url: "http://api.edamam.com/auto-complete",
        params: {
            app_id: appid,
            app_key: key,
            q: food_item,
        }
    });
    // console.log(result.data);
    return result.data;
}


//get food w/ nu
export async function getFoodExternal(food_item) {
    let key = await getKey();
    let appid = await getAppid();

    let result = await axios({
        method: 'get',
        url: "https://api.edamam.com/api/food-database/parser",
        params: {
            app_id: appid,
            app_key: key,
            ingr: food_item,
        }
    });
    console.log(result.data.parsed);
    return result.data.parsed;
}

//use this method for get nutrients--not finished yet
export async function getNutExternal(food_item) {
    let key = await getKey();
    let appid = await getAppid();

    let result = await axios({
        method: 'get',
        url: "https://api.edamam.com/api/food-database/nutrients",
        params: {
            app_id: appid,
            app_key: key,
            ingr: food_item,
        }
    });
    console.log(result);
    return result;
}

//debounce
//ref
//https://stackoverflow.com/questions/24004791/can-someone-explain-the-debounce-function-in-javascript
export function debounce(callback, delay) {

    let timeout;
    return function () {

        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            callback.apply(context, args);
        }, delay);
    }
}


//autocomplete call back
export async function autocomplete() {
    // console.log($('#food').val());
    let fillarray = await getFoodAuto($('#food').val());

    let fill = $(`<div></div>`);
    if (fillarray.length != 0) {
        for (let i = 0; i < fillarray.length; i++) {
            fill.append($(`<p class='auto-item'> ${fillarray[i]}</p>`));
        }
    }
    console.log(fillarray);
    $('#food').parents('.field').find('.auto-cont').empty().append(fill);

}



//autocomplete w debouncing
$('body').on('keyup', '#food', debounce(autocomplete, 200));



let nutr;
let fid;
let fname;
$('body').on('click', '.auto-item', async (e) => {
    fname = e.currentTarget.innerHTML;
    $('#food').val(e.currentTarget.innerHTML);
    $('.auto-cont').empty();
    let result = await getFoodExternal(fname);
    fid = result[0].food.foodId;
    nutr = result[0].food.nutrients;

    console.log(fid, nutr);

});

$('body').on('keyup', '#amount', async (e) => {
    let am = parseInt($('#amount').val());
    let cper100g = parseInt(nutr.ENERC_KCAL);
    $('#cal').val(Math.floor(am * cper100g / 100));
});

$('body').on('click', '#addmeal', async () => {

    let datearray = $('#dateinput').val().match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    let food = $('#food').val();
    let cal = $('#cal').val();
    let am = $('#amount').val();
    let type = $('#type option:selected').text();
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    // createAddMealRecord(newjwt, date, type, food, am, cal);
    // await deleteWholeRecord(newjwt)
    createAddMealRecordExt(newjwt, date, type, food, am, cal, nutr, fid)
    // let meals = await getMeals(newjwt, 20191109);
    // await rendermeals(newjwt, date);
});


// testing

$('body').on('click', '#exte', async () => {
    // await getFoodExternal('california rolls');
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    await deleteWholeRecord(newjwt);
    // await getAppid();
    // await getKey();

    // await getFoodAuto('ap');
});


//chars-----------------------------------------------------------------------
export function drawChart(dataArr) {

    //   let data = google.visualization.arrayToDataTable([
    //     ['Task', 'Hours per Day'],
    //     ['Work',     11],
    //     ['Eat',      2],
    //     ['Commute',  2],
    //     ['Watch TV', 2],
    //     ['Sleep',    7]
    //   ]);

    let data = google.visualization.arrayToDataTable(dataArr);


    let options = {
        title: 'Your Daily Nutritions/grams'
    };

    let chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);


}

export async function renderSimpMeals(jwt, date) {
    $('#rendercont').empty();
    let meals = await getMeals(jwt, date);
    let mealkeys = Object.keys(meals);
    let cont = $(`<div id='meal-table'></div>`)

    for (let i = 0; i < mealkeys.length; i++) {
        let onemeal = $(`<table class='${mealkeys[i]}'>
            <tr class="heading-table"><th>${mealkeys[i]}</th><td>calories</td><td>amount</td></tr></table>`);
        for (let j = 0; j < meals[mealkeys[i]].items.length; j++) {
            onemeal.append($(`<tr>
            <th>${meals[mealkeys[i]].items[j].food}</th>
            <td>${meals[mealkeys[i]].items[j].calorie} cal</td>
            <td>${meals[mealkeys[i]].items[j].amount} grams</td>
            </tr>`))
        }
        cont.append(onemeal);

    }
    $('#rendercont').append(cont);





}
//switch tabs--------------
$('body').on('click', '#analysis', async () => {

    $('#analysis').parents('li').addClass('active');
    $('#analysis').parents('li').addClass('has-text-weight-bold');
    $('#record').parents('li').removeClass('active');
    $('#record').parents('li').removeClass('has-text-weight-bold');
    $('#recipe').parents('li').removeClass('active');
    $('#recipe').parents('li').removeClass('has-text-weight-bold');
    let defaultdate;
    if ($('#dateinput').length > 0) {
        defaultdate = $('#dateinput').val();
    } else {
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
        defaultdate = "" + year + "-" + month + "-" + day;
    }
 
    $('#appcont').empty();

    // let today = new Date();
    // let year = today.getFullYear();
    // let month = today.getMonth() + 1;
    // if (month < 10) {
    //     month = '0' + month;
    // }
    // let day = today.getDate();
    // if (day < 10) {
    //     day = '0' + day;
    // }
    // today = '' + year + month + day;
    // ldefaultdate = "" + year + "-" + month + "-" + day;

    $('#appcont').append($(`
    <h3 class='title has-text-centered'>Meal Expert</h3>

    <div id="selectdate" class="forms-body has-text-centered">
        <div class="field">
            <label class="label"> Select A Date to View Meals</label>
            <p class="control has-text-centered has-icons-left">
                    <i class="fas fa-calendar-day"></i>
                <input id='dateinputAnal' type="date" value=${defaultdate}>

            </p>

        </div>
    </div>
    
    <div id='nutrtablecont'></div>
    <div id="piechart"></div>
    <div id='rendercont'></div>
    `));
    let datearray = defaultdate.match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");


    renderOneDayAnalysis(date);
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    await renderSimpMeals(newjwt, date);


});

$('body').on('click', '#record', () => {

    $('#analysis').parents('li').removeClass('active');
    $('#analysis').parents('li').removeClass('has-text-weight-bold');
    $('#recipe').parents('li').removeClass('active');
    $('#recipe').parents('li').removeClass('has-text-weight-bold');
    $('#record').parents('li').addClass('active');
    $('#record').parents('li').addClass('has-text-weight-bold');
    let defaultdate;
    if ($('#dateinputAnal').length > 0) {
        defaultdate = $('#dateinputAnal').val();
    } else {
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
        defaultdate = "" + year + "-" + month + "-" + day;
    }

    let datearray = defaultdate.match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    $('#appcont').empty();
    $('#piechart').html("");
    renderRecord(defaultdate, date);


});

let conv = {
    "CA": 1000,
    "CHOCDF": 1000000,
    "CHOLE": 1000,
    "FAMS": 1000000,
    "FAPU": 1000000,
    "FASAT": 1000000,
    "FAT": 1000000,
    "FATRN": 1000000,
    "FE": 1000,
    "FIBTG": 1000000,
    "FOLDFE": 1,
    "K": 1000,
    "MG": 1000,
    "NA": 1000,
    "NIA": 1000,
    "P": 1000,
    "PROCNT": 1000000,
    "RIBF": 1000,
    "SUGAR": 1000000,
    "THIA": 1000,
    "TOCPHA": 1000,
    "VITA_RAE": 1,
    "VITB12": 1,
    "VITB6A": 1000,
    "VITC": 1000,
    "VITD": 1,
    "VITK1": 1,
    "ENERC_KCAL": 1
}

let convN = {
    "CA": "Calcium",
    "CHOCDF": "Carbs",
    "CHOLE": "Cholesterol",
    "FAMS": "Monounsaturated",
    "FAPU": "Polyunsaturated",
    "FASAT": "Saturated",
    "FAT": "Fat",
    "FATRN": "Trans",
    "FE": "Iron",
    "FIBTG": "Fiber",
    "FOLDFE": "Folate ",
    "K": "Potassium	",
    "MG": "Magnesium",
    "NA": "Sodium",
    "NIA": "Niacin/B3",
    "P": "Phosphorus",
    "PROCNT": "Protein",
    "RIBF": "Riboflavin/B2",
    "SUGAR": "Sugars",
    "THIA": "Thiamin/B1",
    "TOCPHA": "Vitamin E",
    "VITA_RAE": "Vitamin A",
    "VITB12": "Vitamin B12",
    "VITB6A": "Vitamin B6",
    "VITC": "Vitamin C",
    "VITD": "Vitamin D",
    "VITK1": "Vitamin K",
}

export async function renderOneDayAnalysis(date) {
    $('#nutrtablecont').empty();
    $('#piechart').html("");
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    let meal = await getMeals(newjwt, date);
    console.log(meal);

    let nudic = {};
    //   let nkarr=;
    let mealkeys = Object.keys(meal);
    for (let i = 0; i < mealkeys.length; i++) {
        for (let j = 0; j < meal[mealkeys[i]].items.length; j++) {
            let item = meal[mealkeys[i]].items[j];
            let amt = item.amount;
            let nutrs = item.nutrients;
            // console.log(nutrs);
            let nutkeys = Object.keys(nutrs);

            for (let a = 0; a < nutkeys.length; a++) {
                if (Object.keys(nudic).includes(nutkeys[a])) {
                    nudic[nutkeys[a]] = nudic[nutkeys[a]] + parseFloat(nutrs[nutkeys[a]]) * amt * conv[nutkeys[a]] / 100;
                } else {
                    nudic[nutkeys[a]] = parseFloat(nutrs[nutkeys[a]]) * amt * conv[nutkeys[a]] / 100;
                }
            }


        }
    }

    let dataArr = [];
    dataArr.push(['nutrient', 'cnt']);
    for (let i = 0; i < Object.keys(nudic).length; i++) {
        if (Object.keys(nudic)[i] != "ENERC_KCAL") {
            dataArr.push([convN[Object.keys(nudic)[i]], nudic[Object.keys(nudic)[i]] / 1000000]);
        }
    }

    //  console.log(dataArr);

    drawChart(dataArr);
    drawtable(dataArr);

}

export function drawtable(dataArr) {

    let table = $(`<table class='nutrtable'>
    <tr class="heading-table"><th>Nutrients</th><td>Total Amount</td></tr></table>`);
    for (let j = 1; j < dataArr.length; j++) {
        table.append($(`<tr>
    <th>${dataArr[j][0]}</th>
    <td>${dataArr[j][1]}</td>
    </tr>`))
    }
    $('#nutrtablecont').empty().append(table);
}


$('body').on('change', '#dateinputAnal', async () => {

    let datearray = $('#dateinputAnal').val().match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    await renderOneDayAnalysis(date);
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    await renderSimpMeals(newjwt, date);
});



$('body').on('click', '#own', () => {
    // console.log( $('#own').parents('li'));
    $('#own').parents('li').addClass('is-active');
    $('#database').parents('li').removeClass('is-active');
    let defaultdate = $('#dateinput').val();
    let datearray = defaultdate.match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    renderRecordOwn(defaultdate, date);
    $('#own').parents('li').addClass('is-active');
    $('#database').parents('li').removeClass('is-active');
});

$('body').on('click', '#database', () => {
    // console.log( $('#own').parents('li'));
    $('#own').parents('li').removeClass('is-active');
    $('#database').parents('li').addClass('is-active');
    let defaultdate = $('#dateinput').val();
    let datearray = defaultdate.match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    renderRecord(defaultdate, date);
    $('#own').parents('li').removeClass('is-active');
    $('#database').parents('li').addClass('is-active');

});


export async function renderRecordOwn(defaultdate, today) {



    $('#root').empty();
    $('#root').append($(`
    <div class="menu">

    <ul class="menu-list">
        <li class='active has-text-weight-bold'><a id='record'>Record</a></li>
        <li><a id='analysis'>Analysis</a></li>
        <li><a id='recipe'>Recipe</a></li>
        <li><a id='messageboard'>Messageboard</a></li>
    </ul>

</div>



<div class='container' id='appcont'>

<h3 class='title has-text-centered'>Meal Expert</h3>

<div id="selectdate" class="forms-body has-text-centered">
    <div class="field">
        <label class="label"> Select A Date to View Meals</label>
        <p class="control has-text-centered has-icons-left">
                <i class="fas fa-calendar-day"></i>
            <input id='dateinput' type="date" value=${defaultdate}>

        </p>

    </div>
</div>
   

    <div class='forms-body editform'>
    <div class="tabs is-centered">
  <ul>
    <li class='has-text-small is-active'><a id='database'>Use Database</a></li>
    <li class="has-text-small"><a id='own'>Create Your Own</a></li>
   

  </ul>
</div>

        <div class="field">
            <label class="label"> Add Consumed Food Item:</label>
            <p class="control has-icons-left">
                <input id='food2' class="input" placeholder="Meal">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
            <div class='auto-cont'></div>
        </div>

        <div class="field">
            <label class="label"> Add Amount:</label>
            <p class="control has-icons-left">
                <input id='amount2' class="input" placeholder="Amount in grams">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <label class="label"> Add Calories:</label>
            <p class="control has-icons-left">
                <input id='cal2' class="input" placeholder="Calories">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
        </div>

        <div class="field">
        <label class="label"> Add Carbs:</label>
        <p class="control has-icons-left">
            <input id='carb2' class="input" placeholder="Carb">
            <span class="icon is-small is-left">
                <i class="fas fa-utensils"></i>
            </span>
        </p>
        </div>

        <div class="field">
        <label class="label"> Add Fiber:</label>
        <p class="control has-icons-left">
            <input id='fiber2' class="input" placeholder="Fiber">
            <span class="icon is-small is-left">
                <i class="fas fa-utensils"></i>
            </span>
        </p>
        </div>

        <div class="field">
        <label class="label"> Add Protein:</label>
        <p class="control has-icons-left">
            <input id='protein2' class="input" placeholder="Protein">
            <span class="icon is-small is-left">
                <i class="fas fa-utensils"></i>
            </span>
        </p>
        </div>

        <div class="field">
        <label class="label"> Add Fat:</label>
        <p class="control has-icons-left">
            <input id='fat2' class="input" placeholder="Fat">
            <span class="icon is-small is-left">
                <i class="fas fa-utensils"></i>
            </span>
        </p>
        </div>

        <div class="select field">
            <select id='type'>
                <option>breakfast</option>
                <option>lunch</option>
                <option>dinner</option>
                <option>other</option>
            </select>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button id='addmeal2' class="button is-outlined is-link">Add</button>
            </div>
        </div>


    </div>

    <div id='rendercont'></div>
    
</div>`));



    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    await rendermeals(newjwt, today);
}

$('body').on('click', '#addmeal2', async () => {
    let datearray = $('#dateinput').val().match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    let food = $('#food2').val();
    let cal = $('#cal2').val();
    let am = $('#amount2').val();
    let carb = $('#carb2').val();
    let fat = $('#fat2').val();
    let protein = $('#protein2').val();
    let fiber = $('#fiber2').val();
    let nu = {
        'FAT': parseInt(fat),
        'FIBTG': parseInt(fiber),
        'PROCNT': parseInt(protein),
        'CHOCDF': parseInt(carb)
    };
    let id = 'none';
    let type = $('#type option:selected').text();
    console.log(nu);
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    createAddMealRecordExt(newjwt, date, type, food, am, cal, nu, id);
    // let meals = await getMeals(newjwt, 20191109);
    // await rendermeals(newjwt, date);
});


$('body').on('click', '#recipe', async () => {

    $('#recipe').parents('li').addClass('active');
    $('#recipe').parents('li').addClass('has-text-weight-bold');
    $('#record').parents('li').removeClass('active');
    $('#record').parents('li').removeClass('has-text-weight-bold');
    $('#analysis').parents('li').removeClass('active');
    $('#analysis').parents('li').removeClass('has-text-weight-bold');
    $('#messageboard').parents('li').removeClass('active');
    $('#messageboard').parents('li').removeClass('has-text-weight-bold');

    $('#appcont').empty().append($(`<h3 class='title has-text-centered'>Meal Expert</h3>`));
    $('#appcont').append($(`<button class="button is-outlined is-info" id="instb">Write Recipe</button>`))
    $('#appcont').append("<div id='rformcont'></div>");
    $('#appcont').append("<div id='rcont'></div>");
    
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // await deleteWholeRecord(jwt);
    // let recs=await getRecipe(newjwt);
    await getRecipeKeys(newjwt);
    renderRecipe(newjwt);



});

$('body').on('click', '#ingrb', renderRecipesIngrForm);
$('body').on('click', '#instb', renderRecipesInstForm);
$('body').on('click', '.cancel-rbutton', ()=>{
    $('#rformcont').empty();
});

$('body').on('click', '#addrecipe', async()=>{
   
    let name=$('#rname').val();
    let rec=new Recipe(name);
    $('.ingform').each(function(){
        rec.addIngredient($(this).find('.ingred').val(), $(this).find('.amount').val());
    });
    let ins=$('.recIns').val();
    rec.addInstruction(ins);
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let userinfo=await getUserStatus(newjwt);
    let uname=userinfo.user.name;
    await storeRecipe(rec, newjwt,uname);
    $('#rformcont').empty();

    $('#appcont').empty().append($(`<h3 class='title has-text-centered'>Meal Expert</h3>`));
    $('#appcont').append($(`<button class="button is-outlined is-info" id="instb">Write Recipe</button>`))
    $('#appcont').append("<div id='rformcont'></div>");
    $('#appcont').append("<div id='rcont'></div>");
    
    
    // await deleteWholeRecord(jwt);
    // let recs=await getRecipe(newjwt);
    await getRecipeKeys(newjwt);
    renderRecipe(newjwt);


});

export async function deleteRecipe(jwt, id){

    const result = await axios({
        method: 'delete',
        headers: {
            "Authorization": "Bearer " + jwt
        },
        url: 'http://localhost:3000/private/recipes/'+id,
    
    });

}


$('body').on('click', '.delete-recipe', async(e)=>{
    let rid=e.target.dataset.id;
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    await deleteRecipe(newjwt, rid);

    $('#appcont').empty().append($(`<h3 class='title has-text-centered'>Meal Expert</h3>`));
    $('#appcont').append($(`<button class="button is-outlined is-info" id="instb">Write Recipe</button>`))
    $('#appcont').append("<div id='rformcont'></div>");
    $('#appcont').append("<div id='rcont'></div>");
    
    
    // await deleteWholeRecord(jwt);
    // let recs=await getRecipe(newjwt);
    await getRecipeKeys(newjwt);
    renderRecipe(newjwt);


});

$('body').on('click', '.edit-recipe', (e)=>{
    let rid=e.target.dataset.id;
    let parent=$(e.target).parents('.one-recipe');
    let name=parent.find('.rec-name').text().split(':')[1];
    let ins=parent.find('.rec-ins').text().split(':')[1];
    console.log(name);
    
    $(e.target).parents('.one-recipe').replaceWith($(`
    
    <div class='forms-body recipeform'>

    <div class="field">
    <label class="label"> Recipe Name:</label>
    <p class="control has-icons-left">
        <input id='rname' class="input" value=${name} placeholder="name">
        <span class="icon is-small is-left">
            <i class="fas fa-utensils"></i>
        </span>
    </p>
    <div class='auto-cont'></div>
</div>
    
    <div class='recipebuttons'> <button class="button is-outlined is-info" id="ingrb">Add Ingredient</button></div>
    <div class='recingcont'></div>



    <div class="field is-grouped">
    <div class="control">
        <label class="label" > Recipe Instructions:</label>
        <textarea class='recIns' value=${ins} placeholder='enter instructions'></textarea>
    </div>
    </div>

        <div class="field is-grouped">
            <div class="control">
                <button data-id=${rid} id='addrecipe2' class="button is-outlined is-link">Add Recipe</button>
                <button class=" cancel-rbutton2 button is-outlined is-link">Cancel</button>
            </div>
        </div>
    </div>`));

    $('#rname').val(name);
    $('.recIns').val(ins);

});

$('body').on('click', '#addrecipe2',async (e)=>{
    let name=$('#rname').val();
    let rec=new Recipe(name);
    $('.ingform').each(function(){
        rec.addIngredient($(this).find('.ingred').val(), $(this).find('.amount').val());
    });
    let ins=$('.recIns').val();
    rec.addInstruction(ins);
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let userinfo=await getUserStatus(newjwt);
    let uname=userinfo.user.name;
    let id=e.target.dataset.id;
    await changeRecipe(newjwt,id, rec,uname);
    $('#appcont').empty().append($(`<h3 class='title has-text-centered'>Meal Expert</h3>`));
    $('#appcont').append($(`<button class="button is-outlined is-info" id="instb">Write Recipe</button>`))
    $('#appcont').append("<div id='rformcont'></div>");
    $('#appcont').append("<div id='rcont'></div>");
    
    
    // await deleteWholeRecord(jwt);
    // let recs=await getRecipe(newjwt);
    await getRecipeKeys(newjwt);
    renderRecipe(newjwt);





});


export async function renderRecipesInstForm(){
    $('#rformcont').empty().append($(`


    <div class='forms-body recipeform'>

    <div class="field">
    <label class="label"> Recipe Name:</label>
    <p class="control has-icons-left">
        <input id='rname' class="input" placeholder="name">
        <span class="icon is-small is-left">
            <i class="fas fa-utensils"></i>
        </span>
    </p>
    <div class='auto-cont'></div>
</div>
    
    <div class='recipebuttons'> <button class="button is-outlined is-info" id="ingrb">Add Ingredient</button></div>
    <div class='recingcont'></div>



    <div class="field is-grouped">
    <div class="control">
        <label class="label"> Recipe Instructions:</label>
        <textarea class='recIns' placeholder='enter instructions'></textarea>
    </div>
    </div>

        <div class="field is-grouped">
            <div class="control">
                <button id='addrecipe' class="button is-outlined is-link">Add Recipe</button>
                <button class=" cancel-rbutton button is-outlined is-link">Cancel</button>
            </div>
        </div>
    </div>`));

}

export function renderRecipesIngrForm() {


    $('.recingcont').append($(`
    <div class='forms-body ingform'>

        <div class="field">
            <label class="label"> Add Ingredient:</label>
            <p class="control has-icons-left">
                <input class="ingred input" placeholder="Ingredient">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
            <div class='auto-cont'></div>
        </div>

        <div class="field">
            <label class="label"> Add Amount:</label>
            <p class="control has-icons-left">
                <input class="amount input" placeholder="Amount in grams">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
        </div>


    </div>`));

}

export async function changeRecipe(jwt, id, recipe, user){
    const result = await axios({
        method: 'post',
        headers: {
            "Authorization": "Bearer " + jwt
        },
        url: 'http://localhost:3000/private/recipes/'+id,
        data: {
            "data": [{user,recipe}],   
        },
       

    });
}

export async function renderRecipe(jwt){
    
    let recipekeys=await getRecipeKeys(jwt);
    let obj=$(`<div class='show-recipe'></div>`);
    for (let i=recipekeys.length-1;i>=0;i--){
        let recipes=await getRecipe(jwt,recipekeys[i]);
        console.log('recipes', recipes);
        let user=recipes[0].user;
        let name=recipes[0].recipe.name;

        let ingrs=recipes[0].recipe.ingredients;
        let ingrss=$(`<div class='all-ingrs'><div class='oneing'><p class='ing-name'><b>Ingredient</b></p>
        <p class='ing-amount'><b>Amount</b></p></div></div>`);
        for (let j=0;j<ingrs.length;j++){
            ingrss.append($(`<div class='oneing'><p class='ing-name'>${ingrs[j].ingredient}</p>
            <p class='ing-amount'>${ingrs[j].amount}</p></div>`))
        }
        let ins=recipes[0].recipe.instruction;

       
        let userinfo=await getUserStatus(jwt);
        let uname=userinfo.user.name;
        let bs='';
        if (uname==user){
            bs=$(` <button data-id=${recipekeys[i]} class='button is-info is-outlined edit-recipe'>edit</button>
            <button data-id=${recipekeys[i]} class='button is-danger is-outlined delete-recipe'>delete</button>`);
        }
        let oner=$(`
        <div class='one-recipe'>
            
            <p class='rec-name'><b>Recipe Name:</b> ${name}</p>
            <p class='rec-author'><b>Recipe Author:</b> ${user}</p>
            <p class='rec-ins'><b>Recipe Instruction:</b> ${ins}</p>
            
        </div>
        `);
        oner.append(ingrss);
        oner.append(bs);
        obj.append(oner);
    }

    $('#rcont').append(obj);
}

export async function getRecipe(jwt, id){

    const result = await axios({
        method: 'get',
        headers: {
            "Authorization": "Bearer " + jwt
        },
        url: 'http://localhost:3000/private/recipes/'+id,
    });
    console.log(result.data);
    return result.data.result;

}

export async function getRecipeKeys(jwt){
    try{
        const result = await axios({
            method: 'get',
            headers: {
                "Authorization": "Bearer " + jwt
            },
            url: 'http://localhost:3000/private/recipes/',
        });
        console.log(result.data.result);
        return result.data.result;

    }catch(error){
        return "error";
    }
    

}



export async function storeRecipe(recipe, jwt, user){
 
    let res=await getRecipeKeys(jwt);
    let id=1;
    if (res!='error'){
        id=res[res.length-1];
        id++;
        
    }
    
    


    const result = await axios({
        method: 'post',
        headers: {
            "Authorization": "Bearer " + jwt
        },
        url: 'http://localhost:3000/private/recipes/'+id,
        data: {
            "data": [{user,recipe}],
            "type":'merge',
               
        },
       

    });
    console.log(result);

}

class Recipe{
    constructor(name){
        this.name=name;
        this.ingredients=[];
        this.labels=[];
        this.instruction='';
    }
    addIngredient(ingredient, amount){
        this.ingredients.push({"ingredient": ingredient,"amount":amount});
    }
    addLabel(l){
        this.labels.push(l);
    }
    addInstruction(ins){
        this.instruction=ins;
    }
}



