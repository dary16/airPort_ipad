var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var setTitleArr = [];
var searchData = {};
var positionOrTour = [];
$(function() {
    setTitleArr = [{
            title: '上报人',
            width: '10%'
        },
        {
            title: '上报岗位',
            width: '10%'
        },
        {
            title: '类型',
            width: '10%'
        },
        {
            title: '时间',
            width: '10%'
        },
        {
            title: '描述',
            width: '10%'
        },
        {
            title: '视频',
            width: '10%'
        },
        {
            title: '接班人',
            width: '10%'
        },
        {
            title: '异常结果',
            width: '10%'
        },
        {
            title: '操作',
            width: '16%'
        }
    ];
    var titleHtml = '';
    setTitleArr.forEach(function(item) {
        titleHtml += '<li style="width:' + item.width + '">' + item.title + '</li>';
    });
    $('#testTitle').html(titleHtml);

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
    getRequest('airPortService/api/mobile/exchangExceptReported', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                if (item.exceptionResult) {
                    html += '<ul>';
                    html += '<li style="width:' + setTitleArr[0].width + '">' + item.userName + '</li>';
                    html += '<li style="width:' + setTitleArr[1].width + '">' + item.positionName + '</li>';
                    html += '<li style="width:' + setTitleArr[2].width + '">' + item.positionType + '</li >';
                    html += '<li style="width:' + setTitleArr[3].width + '">' + item.exceptionTime + '</li>';
                    html += '<li style="width:' + setTitleArr[4].width + '">' + item.comment + '</li>';
                    html += '<li style="width:' + setTitleArr[5].width + '"><img class="video" src="./img/videoIcon.png"/></li>';
                    html += '<li style="width:' + setTitleArr[6].width + '">' + item.followerName + '</li >';
                    html += '<li style="width:' + setTitleArr[7].width + '">' + item.exceptionResult + '</li>';
                    html += '<li class="operationBtns" style="width:' + setTitleArr[8].width + '">';
                    html += '<a class="editBtn" href="javascript:;">查看</a>';
                    html += '<a class="doBtn" style="display:none;" href="javascript:;">处理</a>';
                    html += '</li>';
                    html += '</ul>';
                } else {
                    html += '<ul>';
                    html += '<li style="width:' + setTitleArr[0].width + '">' + item.userName + '</li>';
                    html += '<li style="width:' + setTitleArr[1].width + '">' + item.positionName + '</li>';
                    html += '<li style="width:' + setTitleArr[2].width + '">' + item.positionType + '</li >';
                    html += '<li style="width:' + setTitleArr[3].width + '">' + item.exceptionTime + '</li>';
                    html += '<li style="width:' + setTitleArr[4].width + '">' + item.comment + '</li>';
                    html += '<li style="width:' + setTitleArr[5].width + '"><img class="video" src="./img/videoIcon.png"/></li>';
                    html += '<li style="width:' + setTitleArr[6].width + '">' + item.followerName + '</li >';
                    html += '<li style="width:' + setTitleArr[7].width + '">' + item.exceptionResult + '</li>';
                    html += '<li class="operationBtns" style="width:' + setTitleArr[8].width + '">';
                    html += '<a class="editBtn" href="javascript:;">查看</a>';
                    html += '<a class="doBtn" href="javascript:;">处理</a>';
                    html += '</li>';
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
        //操作 编辑 点击事件
        $('.editBtn').each(function(i, v) {
            $(v).on('click', function() {
                window.location.href = 'list-error-info.html?arrangeId=' + data[i].exceptionId;
            });
        });
        $('.doBtn').each(function(i, v) {
            $(v).on('click', function() {
                getRequest(
                    'airPortService/busGuardException/updateStatus',
                    'post', {
                        exceptionId: data[i].exceptionId
                    },
                    function(data) {
                        getPlanListFn();
                    }
                );
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