var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [
        {
            title: '操作类型',
            width: '15%'
        },
        {
            title: '姓名',
            width: '15%'
        },
        {
            title: '机号',
            width: '15%'
        },
        {
            title: '操作时间',
            width: '20%'
        },
        {
            title: '汽车编码',
            width: '15%'
        },
        {
            title: '视频',
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
        pageSize: pageSize,
        userName: ''
    };
    if (serObj != undefined || serObj != 'undefined') {
        $.extend(defObj, serObj);
    }
    var html = '';
    getRequest('airPortService/busSzlOperation/statistics', 'post', defObj, function(data) {
        //console.log(data);
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                if (item.vedioUrl) {
                    html += '<ul>';
                    html += '<li style="width:' + setTitleArr[0].width + '">' + item.operatorType + '</li >';
                    html += '<li style="width:' + setTitleArr[1].width + '">' + item.userName + '</li>';
                    html += '<li style="width:' + setTitleArr[2].width + '">' + item.flightCode + '</li>';
                    html += '<li style="width:' + setTitleArr[3].width + '">' + item.operatorTime + '</li>';
                    html += '<li style="width:' + setTitleArr[4].width + '">' + item.carCode + '</li>';
                    html += '<li style="width:' + setTitleArr[5].width + '"><a class="thumbnail" urlSrc="' + item.vedioUrl + '" src="' + item.vedioUrl + '">附件</a></li >';
                    html += '</ul>';
                } else {
                    html += '<ul>';
                    html += '<li style="width:' + setTitleArr[0].width + '">' + item.operatorType + '</li >';
                    html += '<li style="width:' + setTitleArr[1].width + '">' + item.userName + '</li>';
                    html += '<li style="width:' + setTitleArr[2].width + '">' + item.flightCode + '</li>';
                    html += '<li style="width:' + setTitleArr[3].width + '">' + item.operatorTime + '</li>';
                    html += '<li style="width:' + setTitleArr[4].width + '">' + item.carCode + '</li>';
                    html += '<li style="width:' + setTitleArr[5].width + '">无</li >';
                    html += '</ul>';
                }
            });
            $('.contentList .list').html(html);
            //分页
            getPaginationFn();
        } else {
            $('.contentList .list').html('<li class="noData">暂无数据！</li>');
            $('#pagination').css('display', 'none');
        }
        $('.thumbnail').each(function(i, v) {
            $(v).on('click', function() {
                playVideoFn($(this).attr('urlSrc'));
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
