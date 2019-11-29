import {
    renderlogin
} from "./login.js"
import {
    renderRecord
} from "./record.js"
import {
    renderRecipe,
    getRecipeKeys
} from "./recipe.js"
import {renderOneDayAnalysis, renderSimpMeals} from "./analysis.js"

$(document).ready(async () => {
    let step;
    if (window.location.href.match(/\=[a-z]*/) == null) {
        step = 'none';
    } else {
        step = window.location.href.match(/\=[a-z]*/)[0].match(/[a-z]+/)[0];
        console.log(step)
    }


    switch (step) {
        case "none":
            document.cookie = "newjwt=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //delete cookie
            renderlogin();
            break;
        case "recipe":
            if (document.cookie.length > 6) {


                    $('#root').append($(`<div class="menu">

                    <ul class="menu-list">
                        <li class='active has-text-weight-bold'><a id='record'>Record</a></li>
                        <li><a id='analysis'>Analysis</a></li>
                        <li><a id='recipe'>Recipe</a></li>
                        <li><a id='messageboardtoggle' href='messageboard.html'>Messageboard</a></li>
                        <li><a id='logout'>Logout</a></li>
                    </ul>
                
                </div>
                
                
                
                <div class='container' id='appcont'>`));
                
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
                // await renderRecord(defaultdate, today);

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
            } else {
                renderlogin();

            }
            break;
        case "record":
            if (document.cookie.length > 6) {
                
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
                await renderRecord(defaultdate, today);
            } else {
                renderlogin();
            }
            break;
        case "analysis":
                if (document.cookie.length > 6) {

                    $('#root').append($(`<div class="menu">

                    <ul class="menu-list">
                        <li class='active has-text-weight-bold'><a id='record'>Record</a></li>
                        <li><a id='analysis'>Analysis</a></li>
                        <li><a id='recipe'>Recipe</a></li>
                        <li><a id='messageboardtoggle' href='messageboard.html'>Messageboard</a></li>
                        <li><a id='logout'>Logout</a></li>
                    </ul>
                
                </div>
                
                
                
                <div class='container' id='appcont'>`));


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
                    // await renderRecord(defaultdate, today);
    
                    $('#analysis').parents('li').addClass('active');
                    $('#analysis').parents('li').addClass('has-text-weight-bold');
                    $('#record').parents('li').removeClass('active');
                    $('#record').parents('li').removeClass('has-text-weight-bold');
                    $('#recipe').parents('li').removeClass('active');
                    $('#recipe').parents('li').removeClass('has-text-weight-bold');
                    
            
                    $('#appcont').empty();
                
            
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
                } else {
                    renderlogin();
                }
            break;

    }



 

});