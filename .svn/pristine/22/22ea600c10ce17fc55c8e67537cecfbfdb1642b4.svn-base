var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var setTitleArr = [];
var searchData = {};
var positionOrTour = [];
$(function() {
    setTitleArr = [{
            title: '标题',
            width: '16%'
        },
        {
            title: '指挥员',
            width: '16%'
        },
        {
            title: '值班参谋',
            width: '16%'
        },
        {
            title: '状态',
            width: '16%'
        },
        {
            title: '备注',
            width: '16%'
        },
        {
            title: '操作',
            width: '16%'
        }
    ];
    var titleHtml = '';
    setTitleArr.forEach(function(item) {
        titleHtml += '<li style="width:' + item.width + '">' + item.title + '</li>';
    });
    $('#testTitle').html(titleHtml);

    //获取列表
    getPlanListFn();

    form.render('select');
    $('.searchBtn').on('click', function() {
        var getFormData = $('#form').serializeArray();
        getFormData.forEach(function(item) {
            searchData[item.name] = item.value;
        });
        getPlanListFn(searchData);
    });
});

function getPlanListFn(serObj) {
    var defObj = {
        curPage: curPage,
        pageSize: pageSize
        // userId: "5000"
    };
    if (serObj != undefined || serObj != 'undefined') {
        $.extend(defObj, serObj);
    }

    var html = '';
    getRequest('airPortService/busSecurityPlan/list', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.title + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.commanderName + '</li>';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.dutyStaffName + '</li >';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.status + '</li>';
                html += '<li style="width:' + setTitleArr[4].width + '">' + item.comment + '</li >';
                html += '<li class="operationBtns" style="width:' + setTitleArr[5].width + '">';
                html += '<a class="editBtn" href="javascript:;">详情</a>';
                html += '</li>';
                html += '</ul>';
            });
            $('.contentList .list').html(html);
            //分页
            getPaginationFn();
        } else {
            $('.contentList .list').html('<li class="noData">暂无数据！</li>');
            $('#pagination').css('display', 'none');
        }
        //操作 编辑 点击事件
        $('.editBtn').each(function(i, v) {
            $(v).on('click', function() {
                window.location.href = 'list-flight-support-info.html?id=' + data[i].id;
            });
        });
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
        limit: '5',
        jump: function(obj, first) {
            if (!first) {
                curPage = obj.curr;
                getPlanListFn(searchData);
            }
        }
    });
}