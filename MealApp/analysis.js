import {getMeals} from "./record.js";

export function drawChart(dataArr) {    

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
    window.location = 'app.html?step=analysis';    
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
    // console.log(meal);

    let nudic = {};
    //   let nkarr=;
    let mealkeys = Object.keys(meal);
    let calorie_t=0;
    for (let i = 0; i < mealkeys.length; i++) {
        for (let j = 0; j < meal[mealkeys[i]].items.length; j++) {
            calorie_t+=parseInt(meal[mealkeys[i]].items[j].calorie);
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
    dataArr.push(['calories', calorie_t]);
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