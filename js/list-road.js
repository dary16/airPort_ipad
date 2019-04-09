var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [{
            title: '标题',
            width: '20%'
        },
        {
            title: '负责人',
            width: '15%'
        },
        {
            title: '开始时间',
            width: '20%'
        },
        {
            title: '结束时间',
            width: '20%'
        },
        {
            title: '状态',
            width: '10%'
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
    //新建
    $('#createRoad').on('click', function() {
        window.location.href = 'list-road-edit.html';
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
    getRequest('airPortService/busRoadPlan/list', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul class="goToView">';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.title + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.headerName + '</li>';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.startTime + '</li>';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.endTime + '</li>';
                if (item.status == '已完成') {
                    html += '<li class="green" style="width:' + setTitleArr[4].width + '">' + item.status + '</li >';
                } else {
                    html += '<li class="red" style="width:' + setTitleArr[4].width + '">' + item.status + '</li >';
                }
                html += '<li class="operationBtns" style="width:' + setTitleArr[5].width + '">';
                if (item.status == '已完成') {
                    html += '<a class="delBtn" href="javascript:;">删除</a>';
                } else {
                    html += '<a class="editBtn" isEdit="' + item.status + '" href="javascript:;">编辑</a>';
                    html += '<a class="delBtn" href="javascript:;">删除</a>';
                }
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
                if ($(v).attr('isEdit') == '完成') {
                    layer.msg('已完成！');
                } else {
                    window.location.href = 'list-road-edit.html?edit=true&id=' + data[i].id;
                }
            });
        });

        //查看详情
        $('.goToView').each(function(i, v) {
            $(v)
                .find('li')
                .not('.operationBtns')
                .on('click', function() {
                    window.location.href = 'list-road-edit.html?edit=true&view=true&id=' + data[i].id;
                });
        });

        //操作 删除 点击事件
        $('.delBtn').each(function(i, v) {
            $(v).on('click', function() {
                layer.confirm('确定删除吗？', function(index) {
                    layer.close(index);
                    getRequest(
                        'airPortService/busRoadPlan/del',
                        'post', {
                            ids: data[i].id
                        },
                        function(data) {
                            layer.msg('删除成功！');
                            window.location.reload();
                        }
                    );
                });
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