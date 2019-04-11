
var url = new URL(window.location.href);
//这里中文好像乱码 todo ??
var company = url.searchParams.get("company");
if (!company) {
    company = prompt("请输入公司名（可模糊查询）");
}
var flag = false;
//循环列表
$('.apox .e').each(function () {
    let a_com = $(this).find('.li:first a.gs');
    if (a_com.text().indexOf(company) != -1) {
        flag = true;
        let a_job = $(this).find('.li:first a.zhn');
        //鼠标中键点击事件
        var middleClick = new MouseEvent( "click", {"button": 1});
        a_job[0].dispatchEvent(middleClick);
        console.log('找到' + a_com.text() + '公司的' + a_job.text() + '职位');

        //定位到该职位
        let id = 'id_a_job';
        a_job.attr('id', id);
        window.location.href = window.location.href + '#' + id;
    }
});

//当页没匹配就翻页
if (!flag) {
    console.log('该页没有找到"' + company + '" (' + window.location.search.substr(window.location.search.indexOf('page=')) + ')，将翻页');
    //不想再输入公司名，所以地址加上参数company
    $('.p_in .bk a:last')[0].href += '&company=' + company; 
    $('.p_in .bk a:last')[0].click();
}
