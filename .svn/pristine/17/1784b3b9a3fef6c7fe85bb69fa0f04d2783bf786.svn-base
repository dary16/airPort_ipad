var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var setTitleArr = [];
var searchData = {};
$(function() {
    setTitleArr = [{
            title: '姓名',
            width: '33%'
        },
        {
            title: '巡更名称',
            width: '33%'
        },
        {
            title: '备注',
            width: '33%'
        }
    ];
    var titleHtml = '';
    setTitleArr.forEach(function(item) {
        titleHtml += '<li style="width:' + item.width + '">' + item.title + '</li>';
    });
    $('#testTitle').html(titleHtml);

    //获取列表
    getPlanListFn();
    $('.searchBtn').on('click', function() {
        var getFormData = $('#form').serializeArray();
        getFormData.forEach(function(item) {
            searchData[item.name] = item.value;
        });
        curPage = 1;
        getPlanListFn(searchData);
    });
});

function getPlanListFn(serObj) {
    var defObj = {
        curPage: curPage,
        pageSize: pageSize,
        type: 2
    };
    if (serObj != undefined || serObj != 'undefined') {
        $.extend(defObj, serObj);
    }
    var html = '';
    getRequest('airPortService/api/mobile/positionAlermList', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.userName + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.positionName + '</li >';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.comment + '</li>';
                // html += '<li style="width:' + setTitleArr[5].width + '"><img class="video" src="./img/videoIcon.png"/></li>';
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
                window.location.href = 'list-edit.html?arrangeId=' + data[i].id;
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