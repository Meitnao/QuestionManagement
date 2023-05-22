$(function() {
    // 获取url传输的data
    let queryString = location.search;
    let urlParams = new URLSearchParams(queryString);
    // let data = urlParams.get('data');
    let container = document.querySelector('#container');
    let links = container.querySelectorAll('a');
    let test = urlParams.get('test');
    let now_page = document.querySelector('#now-li');
    // console.log(test);
    if(test == 'temp') now_page.innerHTML = "测试";
    else now_page.innerHTML = `电工${test === "D4" ? "四" : "五"}级理论练习题`;
    
    links.forEach(link => {
        link.href = link.href.concat(`&test=${test}`);
    });
});
