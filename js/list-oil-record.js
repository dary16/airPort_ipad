var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [
        {
            title: '机号',
            width: '20%'
        },
        {
            title: '加油车',
            width: '17%'
        },
        {
            title: '油品类型',
            width: '17%'
        },
        {
            title: '油量',
            width: '17%'
        },
        {
            title: '加油员',
            width: '17%'
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
    getRequest('airPortService/busRefueller/list', 'post', defObj, function(data) {
        console.log(data);
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.flightNum + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.carCode + '</li>';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.oilType + '</li >';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.oilLoad + '</li>';
                html += '<li style="width:' + setTitleArr[4].width + '">' + item.userName + '</li>';
                if (item.oilLoadPic) {
                    html += '<li style="width:' + setTitleArr[5].width + '"><a class="thumbnail" urlSrc="' + item.oilLoadPic + '">查看</a></li>';
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
