//1 根据公司名查找，并打开相应的职位
function findByCompany() {
    var url = new URL(window.location.href);
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
        if($('.p_in .bk a').size() > 1) {
            //不想再输入公司名，所以地址加上参数company。用encodeURIComponent编码，否则取出会乱码
            $('.p_in .bk a:last')[0].href += '&company=' + encodeURIComponent(company); 
            $('.p_in .bk a:last')[0].click();
        } else {
            console.warn('当前已经是最后一页了！');
        }
    }
}

//调用
findByCompany();


//2 保存申请信息到localStorage
function saveApplies() {
    const appliesKey = 'appliesKey';
    if (!localStorage.getItem(appliesKey)) {
        var list = [];
    } else {
        var list = JSON.parse(localStorage.getItem(appliesKey));
    }
    
    //循环列表
    $('.apox .e').each(function () {
        let a_com = $(this).find('.li:first a.gs');
        let a_job = $(this).find('.li:first a.zhn');
        list.push({
            companyName: a_com.text(),
            companyUrl: a_com[0].href,
            jobName: a_job.text(),
            jobUrl: a_job[0].href
        });

    });

    localStorage.setItem(appliesKey, JSON.stringify(list));

    var url = new URL(window.location.href);
    console.log('当前页 %s 申请信息保存完毕', url.searchParams.get("page"));
    //翻页
    if($('.p_in .bk a').size() > 1) {
        $('.p_in .bk a:last')[0].click();
    } else {
        console.warn('当前已经是最后一页了！');
    }

}

saveApplies();
