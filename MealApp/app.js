$(document).ready(()=>{
     $('#appcont').append(rendermeals());
     $('#appcont').append(rendermeals());
     $('#appcont').append(rendermeals());
     $('#appcont').append(rendermeals());
     $('#appcont').append(rendermeals());
});


export function rendermeals(){

    let content=$(`<div>
    <table>
        <tr class="heading-table">
            <th>Breakfast</th>
            <td>600 cal</td>
        </tr>
        <tr>
            <th>Bagel</th>
            <td>400 cal</td>
        </tr>
        <tr>
            <th>Ice Coffee</th>
            <td>200 cal</td>
        </tr>
        <tr>
            <th>Apple</th>
            <td>40 cal</td>
        </tr>
    </table>
</div>`);

return content;
}