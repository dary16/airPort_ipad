var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var setTitleArr = [];
var searchData = {};
var positionOrTour = [];
$(function() {
    setTitleArr = [
        {
            title: '消防栓名称',
            width: '25%'
        },
        {
            title: '检查时间',
            width: '25%'
        },
        {
            title: '检查人',
            width: '25%'
        },
        {
            title: '状态',
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
    //新建
    $('#createFireplug').on('click', function() {
        window.location.href = 'list-fireplug-edit.html';
    });
});

function getPlanListFn() {
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
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.fireHydrantName + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.checkTime + '</li>';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.checker + '</li >';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.status + '</li>';
                html += '</ul>';
            });
            $('.contentList .list').html(html);
            //分页
            getPaginationFn();
        } else {
            $('.contentList .list').html('<li class="noData">暂无数据！</li>');
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
        limit: '5',
        jump: function(obj, first) {
            if (!first) {
                curPage = obj.curr;
                getPlanListFn();
            }
        }
    });
}
