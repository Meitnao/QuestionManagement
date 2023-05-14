$(function() {
    // 获取url传输的data
    let queryString = location.search;
    let urlParams = new URLSearchParams(queryString);
    let data = urlParams.get('data');

    let links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.href = link.href.concat(`&test=${data}`);
        console.log(link);
    });
});
