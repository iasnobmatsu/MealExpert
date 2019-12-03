export async function renderRecord(defaultdate, today) {

    $('#root').empty();
    $('#root').append($(`
    <div class="menu">

    <ul class="menu-list">
        <li class='active has-text-weight-bold'><a id='record'>Record</a></li>
        <li><a id='analysis'>Analysis</a></li>
        <li><a id='recipe'>Recipe</a></li>
        <li><a id='messageboardtoggle' href='messageboard.html'>Foodboard</a></li>
        <li><a id='logout'>Logout</a></li>
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
        return result.data.result;
    } catch (error) {
        // console.log(error);
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
        // console.log(error);
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
        // console.log(error);
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
        // console.log(error);
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
    // console.log(result.data.result);
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
    // console.log(result.data.result);
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
    // console.log(a);
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
            // console.log(ene);
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
            // console.log(ene);
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
    // console.log(items);
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
    // console.log(result.data.parsed);
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
    // console.log(result);
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

    // console.log(fid, nutr);

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
    $('#food').val("");
    $('#cal').val("");
    $('#amount').val("");
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


$('body').on('click', '#record', () => {
    window.location = 'app.html?step=record';    
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
        <li><a id='messageboardtoggle' href='messageboard.html'>Foodboard</a></li>
        <li><a id='logout'>Logout</a></li>
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
    // console.log(nu);
    let newjwt = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    createAddMealRecordExt(newjwt, date, type, food, am, cal, nu, id);
    // let meals = await getMeals(newjwt, 20191109);
    // await rendermeals(newjwt, date);
    $('#food2').val("");
    $('#cal2').val("");
    $('#amount2').val("");
    $('#carb2').val("");
    fat = $('#fat2').val("");
    $('#protein2').val("");
    $('#fiber2').val("");
});

