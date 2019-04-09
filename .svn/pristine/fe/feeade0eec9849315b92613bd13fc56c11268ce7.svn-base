var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [
        {
            title: '鸟的位置',
            width: '20%'
        },
        {
            title: '鸟的种类',
            width: '20%'
        },
        {
            title: '高度',
            width: '20%'
        },
        {
            title: '上报人名称',
            width: '20%'
        },
        {
            title: '上报时间',
            width: '20%'
        }
    ];
    var titleHtml = '';
    setTitleArr.forEach(function(item) {
        titleHtml += '<li style="width:' + item.width + '">' + item.title + '</li>';
    });
    $('#topTitle').html(titleHtml);
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
        pageSize: pageSize
    };
    if (serObj != undefined || serObj != 'undefined') {
        $.extend(defObj, serObj);
    }
    var html = '';
    getRequest('airPortService/busBirdReport/list', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul class="goToView">';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.birdPosition + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.birdType + '</li >';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.height + '</li>';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.userName + '</li >';
                html += '<li style="width:' + setTitleArr[4].width + '">' + item.nowTime + '</li >';
                html += '</ul>';
            });
            $('.contentList .list').html(html);
            //分页
            getPaginationFn();
        } else {
            $('.contentList .list').html('<li class="noData">暂无数据！</li>');
            $('#pagination').css('display', 'none');
        }
        //查看详情
        $('.goToView').each(function(i, v) {
            $(v)
                .find('li')
                .on('click', function() {
                    window.location.href = 'list-count-bird-view.html?edit=true&view=true&id=' + data[i].reportId;
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
        limit: pageSize,
        layout: ['prev', 'page', 'next'],
        theme: '#0383c4',
        curr: curPage,
        jump: function(obj, first) {
            if (!first) {
                curPage = obj.curr;
                getPlanListFn(searchData);
            }
        }
    });
}
