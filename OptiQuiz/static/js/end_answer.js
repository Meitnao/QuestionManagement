let queryString = location.search;
let urlParams = new URLSearchParams(queryString);
let dataString = urlParams.get('data');
let data = JSON.parse(decodeURIComponent(dataString));


$(function() {
    const score = document.querySelector("#score");
    score.innerHTML = `本次得分：${data.score} / ${data.total}`;    
});
