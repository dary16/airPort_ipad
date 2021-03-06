var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [{
            title: '时间',
            width: '20%'
        },
        {
            title: '车牌号',
            width: '14%'
        },
        {
            title: '油的种类',
            width: '10%'
        },
        {
            title: '油品质量',
            width: '10%'
        },
        {
            title: '铅封是否完整',
            width: '14%'
        },
        {
            title: '机务人员',
            width: '10%'
        },
        {
            title: '状态',
            width: '10%'
        },
        {
            title: '原因',
            width: '10%'
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
        oilType: '',
        userName: ''
    };
    if (serObj != undefined || serObj != 'undefined') {
        $.extend(defObj, serObj);
    }
    var html = '';
    getRequest('airPortService/api/web/busOilCheckList', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.checkTime + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.carCode + '</li >';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.oilType + '</li>';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.oilQuality + '</li >';
                html += '<li style="width:' + setTitleArr[4].width + '">' + item.isStatus + '</li>';
                html += '<li style="width:' + setTitleArr[5].width + '">' + item.userName + '</li >';
                html += '<li style="width:' + setTitleArr[6].width + '">' + item.status + '</li >';
                html += '<li style="width:' + setTitleArr[7].width + '"' + "onClick=commentFn(" + "'" + item.reason + "'" + ')>' + item.reason + '</li>';
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
                getPlanListFn(searchData);
            }
        }
    });
}

function commentFn(value) {
    layer.msg(value);
}