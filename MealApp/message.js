function messageboard() {
    return $(`
    <div class="menu">
    <ul class="menu-list">
        <li><a id='record'>Record</a></li>
        <li><a id='analysis'>Analysis</a></li>
        <li><a id='recipe'>Recipe</a></li>
        <li class='active has-text-weight-bold'><a id='messageboard'>Messageboard</a></li>
    </ul>
</div>

    <div id="messageboard">
        <div class="header"> 
            <div>
            <h2>Message Board</h2>
            <p>leave your meal receipt below!</p>
            </div>

            <div class ="header_button">
                <button class="newmessage_button">New Post</button>
            </div>
        </div>

    
        <div id="main_content"></div>  

    </div>


    `);
}

function reload() {
    let main_content = $('#main_content');

    main_content.empty();
    load();
}


export async function createAuthor(name, message) {
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/public/message',
        data: {
            "type": "merge",
            "data": {
                // "name": name,
                // "message": message,
                name,
                message,
            },

        }
    })
    return result;
}

async function load() {

    const message1 = await axios({
        method: 'get',
        url: "http://localhost:3000/public/message",
    });
    // console.log(message1.data);
    // console.log(message1.data.result[0]);
    // console.log(message1);

    // console.log(message1.data.result[0].name);


    for (let i = 0; i < message1.data.result.length; i++) {
        let mess = message1.data.result[i];
        console.log(mess);
        $('#main_content').append(widget(mess));
        // console.log(mess.data.result);
    }
}


export const widget = function (mess) {
    // console.log(mess.name);
    const name = $(`
        <div class="name" id="${mess.name}"></div>
    `);
    // console.log(message1.name);
    name.append(content_inter(mess));
    return name;
}





export const newmessagebutton = function (event) {
    event.preventDefault();
    const main_content = $('#main_content');
    main_content.empty();
    main_content.append(post_widget());
}

export const content_inter = function (mess) {

    const work = $(`
    <div id="post" username="${mess.name}">
        <div class="name">${mess.name}</div>
        <hr class="under_name">
        <div class="body_content">${mess.message}</div>
        
    </div>`
    );
    // if (mess.contentsubmit == true) {
    //     work.append($(`<button class="delete_button">Delete</button>`));
    // }

    return work;
}

$(function () {
    timer = setTimeout(function () {
        $(".delete_button").css('display', 'none');
    }, 2000);
})

function stop() {
    clearTimeout(timer);
}

export const post_widget = function () {
    return $(`
        <div class="post">
            <div class="post_form">
                <form>
                    <textarea class="post_name" placeholder="Type your name Here"></textarea>
                    <br>
                    <textarea class="post_content" placeholder="Share your receipt Here" rows="4" cols="50"></textarea>              
                    <div>
                            <button class="content_submit" type="submit">Send</button>
                            <button class="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `);
}

export const contentsubmit = async function (event) {
    event.preventDefault();
    const updatename = $('.post_name').val();
    const updatemessage = $('.post_content').val();

    // const result = await axios({
    //     method: 'post',
    //     url: 'http://localhost:3000/public/message',
    //     data: {
    //         "data": {
    //             name: "" + updatename,
    //             message: "" + updatemessage,
    //         }
    //     }
    // });
    await createAuthor(updatename, updatemessage);
    reload();
}

export const deleteMessage = async function (event) {
    event.preventDefault();
    const name1 = event.target.parentNode.getAttribute('username');

    const result1 = await axios({
        method: 'delete',
        url: 'http://localhost:3000/public/message',
    });
}

function view() {
    let body = $('body');

    body.empty();
    body.append(messageboard());

    load();
    body.on('click', '.newmessage_button', newmessagebutton);
    body.on('click', '.content_submit', contentsubmit);


}


$(function () {
    view();
});