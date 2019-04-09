var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [
        {
            title: '上报岗位',
            width: '12%'
        },
        {
            title: '类型',
            width: '11%'
        },
        {
            title: '开始时间',
            width: '24%'
        },
        {
            title: '结束时间',
            width: '24%'
        },
        {
            title: '用户名',
            width: '14%'
        },
        {
            title: '操作',
            width: '15%'
        }
    ];
    var titleHtml = '';
    setTitleArr.forEach(function(item) {
        titleHtml += '<li style="width:' + item.width + '">' + item.title + '</li>';
    });
    $('#topTitle').html(titleHtml);
    //获取岗位
    getStationFn();
    //获取列表
    getPlanListFn();

    laydate.render({
        elem: '#startTime',
        type: 'datetime',
        done: function(value, date, endDate) {}
    });
    laydate.render({
        elem: '#endTime',
        type: 'datetime',
        done: function(value, date, endDate) {}
    });
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
    getRequest('airPortService/api/mobile/selectPositionStatistics', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.position_name + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.position_type + '</li >';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.start_time + '</li>';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.end_time + '</li>';
                html += '<li style="width:' + setTitleArr[4].width + '">' + item.user_name + '</li>';
                // html += '<li style="width:' + setTitleArr[5].width + '"><img class="video" src="./img/videoIcon.png"/></li>';
                html += '<li class="operationBtns" style="width:' + setTitleArr[5].width + '">';
                html += '<a class="editBtn" href="javascript:;">查看</a>';
                // html += '<a class="delBtn" href="javascript:;">删除</a>';
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
                window.location.href = 'list-edit.html?arrangeId=' + data[i].id;
            });
        });
    });
}

function getStationFn() {
    var html = '';
    getRequest('airPortService/api/mobile/selectPositionOrTour', 'post', {}, function(data) {
        data.positionList.forEach(function(item) {
            html += '<option value="' + item.positionId + '">' + item.positionName + '</option>';
        });
        data.tourList.forEach(function(item) {
            html += '<option value="' + item.tourId + '">' + item.tourName + '</option>';
        });
        $('#stationList').append(html);
        form.render('select');
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
