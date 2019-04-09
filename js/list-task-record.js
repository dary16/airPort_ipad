var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [{
            title: '车/人员',
            width: '24%'
        },
        {
            title: '类型',
            width: '10%'
        },
        {
            title: '地点',
            width: '20%'
        },
        {
            title: '到达时间',
            width: '24%'
        },
        {
            title: '状态',
            width: '10%'
        },
        {
            title: '图片',
            width: '12%'
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
    getRequest('airPortService/busSendCarTask/list', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                var carUser = '';
                item.sendCarUser.forEach(function(subItem) {
                    carUser += '<span>' + subItem.carType + '(' + subItem.carCode + ')' + '/' + subItem.label + '</span>';
                });
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + carUser + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.sendType + '</li>';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.carPlace + '</li>';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.sendTime + '</li >';
                if (item.status == '已完成') {
                    html += '<li class="green" style="width:' + setTitleArr[4].width + '">' + item.status + '</li >';
                } else {
                    html += '<li class="red" style="width:' + setTitleArr[4].width + '">' + item.status + '</li >';
                }
                if (item.pic) {
                    html += '<li style="width:' + setTitleArr[5].width + '"><a class="thumbnail" urlSrc="' + item.pic + '">查看</a></li>';
                } else {
                    html += '<li style="width:' + setTitleArr[5].width + '"></li>';
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
        //点击查看大图
        $('.thumbnail').each(function(i, v) {
            $(v).on('click', function() {
                showPicsFn($(this).attr('urlSrc'));
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