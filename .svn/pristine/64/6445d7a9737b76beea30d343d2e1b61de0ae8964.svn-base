var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [{
            title: '名称',
            width: '25%'
        },
        {
            title: '检查时间',
            width: '25%'
        },
        {
            title: '检查人',
            width: '20%'
        },
        {
            title: '高度',
            width: '15%'
        },
        {
            title: '状态',
            width: '15%'
        }
    ];
    var titleHtml = '';
    setTitleArr.forEach(function(item) {
        titleHtml += '<li style="width:' + item.width + '">' + item.title + '</li>';
    });
    $('#topTitle').html(titleHtml);
    //获取列表
    getPlanListFn();
});

function getPlanListFn() {
    var defObj = {
        curPage: curPage,
        pageSize: pageSize,
        arresterNetId: '6f28a251ca93438b9a2aae0b889fb9bd'
    };
    var html = '';
    getRequest('airPortService/busArresterNetLog/list ', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.arresterNetName + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.checkTime + '</li>';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.checker + '</li>';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.highly + '</li>';
                if (item.status == '合格') {
                    html += '<li class="green" style="width:' + setTitleArr[4].width + '">' + item.status + '</li >';
                } else {
                    html += '<li class="red" style="width:' + setTitleArr[4].width + '">' + item.status + '</li >';
                }
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
        limit: pageSize,
        layout: ['prev', 'page', 'next'],
        theme: '#0383c4',
        curr: curPage,
        jump: function(obj, first) {
            if (!first) {
                curPage = obj.curr;
                getPlanListFn();
            }
        }
    });
}