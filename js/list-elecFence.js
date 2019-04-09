var curPage = 1;
var pageSize = 4;
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
            title: '类型',
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
});

function getPlanListFn(serObj) {
    var defObj = {
        curPage: curPage,
        pageSize: pageSize,
        fence_type: ''
    };
    if (serObj != undefined || serObj != 'undefined') {
        // Object.assign(defObj, serObj);
        $.extend(defObj, serObj);
    }

    var html = '';
    getRequest('airPortService/busElectronicFence/listFence', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.fence_name + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.create_time + '</li>';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.fence_type + '</li >';
                html += '<li class="operationBtns" style="width:' + setTitleArr[3].width + '">';
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

        //操作 删除 点击事件
        $('.delBtn').each(function(i, v) {
            $(v).on('click', function() {
                layer.confirm('确定删除吗？', function(index) {
                    layer.close(index);
                    getRequest('airPortService/busElectronicFence/delete', 'post', {
                        id: data[i].id
                    }, function(data) {
                        layer.msg('删除成功！');
                        window.location.reload();
                    });
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
        limit: '4',
        jump: function(obj, first) {
            if (!first) {
                curPage = obj.curr;
                getPlanListFn(searchData);
            }
        }
    });
}