$('body').on('click', '#record', (e)=>{
    let step=e.target.dataset.step;
    window.location = 'app.html?step='+step;    
});

$('body').on('click', '#analysis', (e)=>{
    let step=e.target.dataset.step;
    window.location = 'app.html?step='+step;    
});

$('body').on('click', '#recipe', (e)=>{
    let step=e.target.dataset.step;
    window.location = 'app.html?step='+step;    
});