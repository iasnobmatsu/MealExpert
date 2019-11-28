$('body').on('click', '#recipe', async () => {
    window.location = 'app.html?step=recipe';    
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
    // console.log(name);
    
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

$('body').on('click','.cancel-rbutton2', async(e)=>{

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
        // console.log('recipes', recipes);
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
    // console.log(result.data);
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
        // console.log(result.data.result);
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
    // console.log(result);

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
        // console.log(error);
    }
}

