var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [
        {
            title: '汽车编码',
            width: '12%'
        },
        {
            title: '创建时间',
            width: '14%'
        },
        {
            title: '器材名称',
            width: '12%'
        },
        {
            title: '器材类型',
            width: '12%'
        },
        {
            title: '总数',
            width: '12%'
        },
        {
            title: '使用数量',
            width: '12%'
        },
        {
            title: '使用单位',
            width: '12%'
        },
        {
            title: '备注',
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
        pageSize: pageSize,
        oilType: ''
    };
    if (serObj != undefined || serObj != 'undefined') {
        $.extend(defObj, serObj);
    }
    var html = '';
    getRequest('airPortService/api/web/busOilUseStatistics', 'post', defObj, function(data) {
        console.log(data);
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.carObj + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.createTime + '</li >';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.materialName + '</li>';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.materialType + '</li >';
                html += '<li style="width:' + setTitleArr[4].width + '">' + item.totalNum + '</li>';
                html += '<li style="width:' + setTitleArr[5].width + '">' + item.useNum + '</li >';
                html += '<li style="width:' + setTitleArr[6].width + '">' + item.useUnit + '</li >';
                html += '<li style="width:' + setTitleArr[7].width + '">' + item.comment + '</li>';
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
