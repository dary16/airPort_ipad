var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [
        {
            title: '名称',
            width: '16%'
        },
        {
            title: '类型',
            width: '16%'
        },
        {
            title: '数量',
            width: '16%'
        },
        {
            title: '型号',
            width: '16%'
        },
        {
            title: '质量状况',
            width: '16%'
        },
        // {
        //     title: '备注',
        //     width: '14%'
        // },
        {
            title: '操作',
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
    //新建
    $('#createNet').on('click', function() {
        window.location.href = 'list-equipment-manage-edit.html';
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
    getRequest('airPortService/busBirdEquip/list', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul class="goToView">';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.equipName + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.equipType + '</li>';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.equipNum + '</li>';
                html += '<li style="width:' + setTitleArr[3].width + '">' + item.model + '</li>';
                html += '<li style="width:' + setTitleArr[4].width + '">' + item.status + '</li>';
                // html += '<li style="width:' + setTitleArr[5].width + '">' + item.comment + '</li>';
                html += '<li class="operationBtns" style="width:' + setTitleArr[5].width + '">';
                html += '<a class="editBtn" href="javascript:;">编辑</a>';
                html += '<a class="delBtn" href="javascript:;">删除</a>';
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
                window.location.href = 'list-equipment-manage-edit.html?edit=true&id=' + data[i].equipId;
            });
        });

        //查看详情
        $('.goToView').each(function(i, v) {
            $(v)
                .find('li')
                .not('.operationBtns')
                .on('click', function() {
                    window.location.href = 'list-equipment-manage-edit.html?edit=true&view=true&id=' + data[i].equipId;
                });
        });

        //操作 删除 点击事件
        $('.delBtn').each(function(i, v) {
            $(v).on('click', function() {
                layer.confirm('确定删除吗？', function(index) {
                    layer.close(index);
                    getRequest(
                        'airPortService/busBirdEquip/del',
                        'post',
                        {
                            ids: data[i].equipId
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
