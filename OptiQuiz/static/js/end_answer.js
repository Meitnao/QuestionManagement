let queryString = location.search;
let urlParams = new URLSearchParams(queryString);
let dataString = urlParams.get('data');
let data = JSON.parse(decodeURIComponent(dataString));


$(function() {
    const score = document.querySelector("#score");
    let retry = document.querySelector('#retry');
    const header = document.querySelector('.breadcrumb-item');
    retry.href = retry.href.concat(`?test=${data.test}&page=${data.page}`);
    score.innerHTML = `本次得分：${data.score}`;
    
    if (data.test == 'D5') 
        header.innerHTML = `电工五级理论练习题-试卷${data.page}`;
    else header.innerHTML = `电工四级理论练习题-试卷${data.page}`;

});
