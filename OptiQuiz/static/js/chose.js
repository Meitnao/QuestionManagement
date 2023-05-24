$(function() {
    // 获取url传输的data
    let queryString = location.search;
    let urlParams = new URLSearchParams(queryString);
    let container = document.querySelector('#container');
    let links = container.querySelectorAll('a');
    let test = urlParams.get('test');
    let now_page = document.querySelector('#now-li');

    function clickLink(e) {
        e.preventDefault();
        let link = e.target;
        let testName = `电工${test === "D4" ? "四" : "五"}级理论练习题`;
        let pageName = link.innerHTML;
        let res = window.confirm(`请您确定是否选择《${testName}-${pageName}》并开始答题。`);
        if (res) window.location.href = link.href;
    }
    
    // let data = urlParams.get('data');
    // console.log(test);
    if(test == 'temp') now_page.innerHTML = "测试";
    else now_page.innerHTML = `电工${test === "D4" ? "四" : "五"}级理论练习题`;
    
    links.forEach(link => {
        link.href = link.href.concat(`&test=${test}`);
        link.addEventListener('click', clickLink);
    });
});
