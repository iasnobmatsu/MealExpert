function messageboard() {
    return $(`
    <div class="menu">
    <ul class="menu-list">
        <li><a id='record' data-step='record'>Record</a></li>
        <li><a id='analysis' data-step='analysis'>Analysis</a></li>
        <li><a id='recipe' data-step='recipe'>Recipe</a></li>
        <li class='active has-text-weight-bold'><a id='messageboardtoggle'>FoodBoard</a></li>

    </ul>
</div>

<div id='appcont'>

<h3 class='title has-text-centered'>Meal Expert</h3>

    <div id="messageboard">
        <div class="header"> 
            <div>
            <p>People post what they have just ate in this section. Leave what you just ate anonymously here! You can edit or delete your food within 1 min. Also have cool randomized background colors for your food!</p>
            </div>

            <div id='new-mess'>
                <button class="newmessage_button button is-outlined is-info">New Food</button>
                <div id='new-mess-added'></div>
            </div>
        </div>

    
        <div id="main_content"></div>  

    </div>

</div>



    `);
}

$('body').on('click', '.newmessage_button', ()=>{
    $('#new-mess-added').append($(`
            <p class='label'>Recent food:</p>
            <textarea></textarea>
            <div class='is-grouped'>
            <button id='submit-mess' class='button is-outlined is-info'>submit</button>
            <button id='cancel-mess' class='button is-outlined is-danger'>cancel</button>
            </div>
    `));
});

$('body').on('click', '#submit-mess', async ()=>{
    let content=$('textarea').val();
    // let name=$('input').val();
    let date=new Date();
    await createMessage(content, date);
    $('#new-mess-added').empty();
    await reload();

});

$('body').on('click', '#cancel-mess', ()=>{
    $('#new-mess-added').empty();
});



export async function reload() {
    let main_content = $('#main_content');
    main_content.empty();
    await load();
}


export async function createMessage(message, time) {
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/public/message/recentFood',
        data: {
            "type": "merge",
            "data": {
                message,
                time
            },

        }
    })
    return result;
}

export async function getMessages(){
    const message = await axios({
        method: 'get',
        url: "http://localhost:3000/public/message/recentFood",
    });
    return message;
}

export async function load() {

    const message1 = await axios({
        method: 'get',
        url: "http://localhost:3000/public/message/recentFood",
    });


    for (let i = message1.data.result.length-1; i >=0; i--) {
        let mess = message1.data.result[i];
        $('#main_content').append(widget(mess));
      
    }
}

export function getColorRandLight(){
    let hexset=['8','9','A','B','C','D','E','F'];
    let lcolor='#';
    for (let i = 0; i < 6; i++) {
        lcolor+= hexset[Math.floor(Math.random() * 7)];
    }
    return lcolor;

}

export function widget(mess) {
    let obj=$(`<div class='one-mess' style="background-color:${getColorRandLight()}">
    <p class='content'> ${mess.message}</p>
    </div>`);
    let time=mess.time;

    //only display delete/edit with one min of post time
    let secondDiff=(new Date().getTime()-new Date(time).getTime());
    if (secondDiff<=60000){
        obj.prepend($(`<button data-time=${time} class='deletemess button is-outlined is-small is-danger'>Delete</button>
        <button data-time=${time} class='editmess button is-outlined is-small is-info'>Edit</button>`));
        setTimeout(() => {
            obj.empty().append( $(`<p class='content'}> ${mess.message}</p>`));
        }, 60000);
    }
    // console.log(new Date().getTime()-new Date(time).getTime());
    return obj;
}

$('body').on('click', '.deletemess', async(e)=>{
    let time=e.target.dataset.time;
    await deleteOneMess(time);
    await reload();
});

$('body').on('click', '.editmess', async(e)=>{
    let time=e.target.dataset.time;
    let mess=$(e.target).parents('.one-mess').find('p').text();

    $(e.target).parents('.one-mess').empty().append($(`<input type='text' value=${mess}>
    <button data-time=${time} class='canceleditmess button is-outlined is-danger is-small'>cancel</button>
    <button data-time=${time} class='saveeditmess button is-outlined is-info is-small'>save</button>
    `))
    // console.log(time);
    // await editOneMess(time);
    // await reload();
});

$('body').on('click', '.canceleditmess', async(e)=>{
    await reload();
});

$('body').on('click', '.saveeditmess', async(e)=>{
    let time=e.target.dataset.time;
    let mess=$(e.target).parents('.one-mess').find('input').val();
    // console.log(time,mess);
    await editOneMess(time,mess )
    await reload();
});


export async function deleteOneMess(timestamp){
    let result=await getMessages();
    let all=result.data.result;
    for (let i=0;i<all.length;i++){
        if (all[i].time==timestamp){
            all.splice(i, 1);
        }
    }
    let recentFood=all;
    let result2=await axios({
        method: 'post',
        url: 'http://localhost:3000/public/message/',
        data: {
            "data": {
                recentFood
            },

        }
    });
}

export async function editOneMess(timestamp, mess){
    let result=await getMessages();
    let all=result.data.result;
    for (let i=0;i<all.length;i++){
        if (all[i].time==timestamp){
            all[i].message=mess;
        }
        
    }
    let recentFood=all;
    let result2=await axios({
        method: 'post',
        url: 'http://localhost:3000/public/message/',
        data: {
            "data": {
                recentFood
            },

        }
    });
}

export const deleteMessages = async function () {


    const result1 = await axios({
        method: 'delete',
        url: 'http://localhost:3000/public/message',
    });
}


$(document).ready(async()=>{

    $('body').append(messageboard());
    let islogin = document.cookie.replace(/(?:(?:^|.*;\s*)newjwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    
    if (islogin!=''){
        $('.menu-list').append(
            " <li><a id='logout'>Logout</a></li> "
        )
    }else{
        $('.menu-list').append(
        "<li ><a href='app.html' id='loginnav'>Login</a></li>");
    }
    await load();
});

