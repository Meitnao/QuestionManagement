let queryString = location.search;
let urlParams = new URLSearchParams(queryString);
let dataString = urlParams.get('data');
let data = JSON.parse(decodeURIComponent(dataString));


$(function() {
    const score = document.querySelector("#score");
    let retry = document.querySelector('#retry');
    retry.href = retry.href.concat(`?test=${data.test}&page=${data.page}`);
    score.innerHTML = `本次得分：${data.score} / ${data.total}`;

});
