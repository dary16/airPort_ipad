var curPage = 1;
var pageSize = 11;
var pageCount = 0;
var setTitleArr = [];
var searchData = {};
var positionOrTour = [];
$(function() {
    setTitleArr = [{
            title: '检查人',
            width: '20%'
        },
        {
            title: '时间',
            width: '35%'
        },
        {
            title: '状态',
            width: '20%'
        },
        {
            title: '备注',
            width: '25%'
        }
    ];

    var titleHtml = '';
    setTitleArr.forEach(function(item) {
        titleHtml += '<li style="width:' + item.width + '">' + item.title + '</li>';
    });
    $('#testTitle').html(titleHtml);

    //获取列表
    getPlanListFn();
    getPlanListFn2();

    form.render('select');
    $('.searchBtn').on('click', function() {
        var getFormData = $('#form').serializeArray();
        getFormData.forEach(function(item) {
            searchData[item.name] = item.value;
        });
        getPlanListFn(searchData);
    });
    //新建
    $('#createFireplug').on('click', function() {
        window.location.href = 'list-fireplug-edit.html';
    });
});

function getPlanListFn(serObj) {
    var defObj = {
        curPage: curPage,
        pageSize: pageSize
    };
    if (serObj != undefined || serObj != 'undefined') {
        $.extend(defObj, serObj);
    }

    getRequest('airPortService/busFireHydrant/list', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows[0];
        if (data.length != 0) {
            $('.contentEdit input').each(function(i, v) {
                $(v).val(data[v.name]);
            });
            $('.contentEdit select').each(function(i, v) {
                $(v).val(data[v.name]);
            });
            form.render('select');
        } else {
            $('.contentEdit').html('<li class="noData">暂无数据！</li>');
        }
    });
}

function getPlanListFn2() {
    var defObj = {
        curPage: curPage,
        pageSize: pageSize
    };

    var html = '';
    getRequest('airPortService/busFireHydrantLog/list', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.checker + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.checkTime + '</li >';
                // html += '<li style="width:' + setTitleArr[2].width + '">' + item.status + '</li>';
                if (item.status == '正常') {
                    html += '<li class="green" style="width:' + setTitleArr[2].width + '">' + item.status + '</li >';
                } else if (item.status == '故障') {
                    html += '<li class="red" style="width:' + setTitleArr[2].width + '">' + item.status + '</li >';
                } else {
                    html += '<li class="yellow" style="width:' + setTitleArr[2].width + '">' + item.status + '</li >';
                }
                html += '<li style="width:' + setTitleArr[3].width + '"' + "onClick=commentFn(" + "'" + item.comment + "'" + ')>' + item.comment + '</li>';
                html += '</ul>';
            });
            $('.contentHalfList .list').html(html);
            //分页
            getPaginationFn();
        } else {
            $('.contentHalfList .list').html('<li class="noData">暂无数据！</li>');
            $('#pagination').css('display', 'none');
        }
    });
}

/**分页方法**/
function getPaginationFn() {
    $('#pagination').css('display', 'block');
    laypage.render({
        elem: 'pagination',
        count: pageCount,
        layout: ['prev', 'page', 'next'],
        theme: '#0383c4',
        curr: curPage,
        limit: '11',
        jump: function(obj, first) {
            if (!first) {
                curPage = obj.curr;
                getPlanListFn2();
            }
        }
    });
}

function commentFn(value) {
    layer.msg(value);
}