var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var setTitleArr = [];
var searchData = {};
var positionOrTour = [];
$(function() {
    setTitleArr = [{
            title: '名称',
            width: '25%'
        },
        {
            title: '创建时间',
            width: '25%'
        },
        {
            title: '检查人',
            width: '25%'
        },
        {
            title: '操作',
            width: '25%'
        }
    ];
    var titleHtml = '';
    setTitleArr.forEach(function(item) {
        titleHtml += '<li style="width:' + item.width + '">' + item.title + '</li>';
    });
    $('#testTitle').html(titleHtml);

    //获取列表
    getPlanListFn();

    form.render('select');
    $('.searchBtn').on('click', function() {
        var getFormData = $('#form').serializeArray();
        getFormData.forEach(function(item) {
            searchData[item.name] = item.value;
        });
        getPlanListFn(searchData);
    });
    //新建
    $('#createFireplug').on('click', function() {
        window.location.href = 'list-carplace-edit.html';
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
    getRequest('airPortService/busCarPlace/list', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul class="goToView">';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.name + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.creatTime + '</li>';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.createrName + '</li >';
                html += '<li class="operationBtns" style="width:' + setTitleArr[3].width + '">';
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
                window.location.href = 'list-carplace-edit.html?edit=true&id=' + data[i].id;
            });
        });

        //查看详情
        $('.goToView').each(function(i, v) {
            $(v)
                .find('li')
                .not('.operationBtns')
                .on('click', function() {
                    window.location.href = 'list-carplace-edit.html?edit=true&view=true&id=' + data[i].id;
                });
        });
        //操作 删除 点击事件
        $('.delBtn').each(function(i, v) {
            $(v).on('click', function() {
                layer.confirm('确定删除吗？', function(index) {
                    layer.close(index);
                    getRequest(
                        'airPortService/busCarPlace/del',
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