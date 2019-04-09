var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [{
            title: '地点',
            width: '16%'
        },
        {
            title: '类型',
            width: '12%'
        },
        {
            title: '车辆/司机',
            width: '20%'
        },
        {
            title: '时间',
            width: '20%'
        },
        {
            title: '状态',
            width: '10%'
        },
        {
            title: '来源',
            width: '8%'
        },
        {
            title: '操作',
            width: '14%'
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
    //新建
    $('#createNet').on('click', function() {
        window.location.href = 'list-car-task-edit.html';
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
                html += '<ul class="goToView">';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.carPlace + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.sendType + '</li>';
                html += '<li style="width:' + setTitleArr[2].width + '">' + carUser + '</li>';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.sendTime + '</li>';
                if (item.status == '已完成') {
                    html += '<li class="green" style="width:' + setTitleArr[4].width + '">' + item.status + '</li>';
                } else {
                    html += '<li class="red" style="width:' + setTitleArr[4].width + '">' + item.status + '</li>';
                }
                html += '<li style="width:' + setTitleArr[5].width + '">' + item.createType + '</li>';
                html += '<li class="operationBtns" style="width:' + setTitleArr[6].width + '">';
                if (item.status == '已完成') {
                    html += '<a class="delBtn" href="javascript:;">删除</a>';
                } else {
                    html += '<a class="editBtn" href="javascript:;">编辑</a>';
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
                window.location.href = 'list-car-task-edit.html?edit=true&id=' + data[i].id;
            });
        });

        //查看详情
        $('.goToView').each(function(i, v) {
            $(v)
                .find('li')
                .not('.operationBtns')
                .on('click', function() {
                    window.location.href = 'list-car-task-edit.html?edit=true&view=true&id=' + data[i].id;
                });
        });

        //操作 删除 点击事件
        $('.delBtn').each(function(i, v) {
            $(v).on('click', function() {
                layer.confirm('确定删除吗？', function(index) {
                    layer.close(index);
                    getRequest(
                        'airPortService/busSendCarTask/del',
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