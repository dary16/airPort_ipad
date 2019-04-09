var setTitleArr = [];
var searchData = {};
var curPage = 1;
var pageSize = 5;
var pageCount = 0;
var data = [];
$(function() {
    setTitleArr = [{
            title: '异物种类',
            width: '15%'
        },
        {
            title: '发现人',
            width: '13%'
        },
        {
            title: '发现时间',
            width: '25%'
        },
        {
            title: '备注',
            width: '20%'
        },
        {
            title: '图片',
            width: '13%'
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

    $('.fixedBtn').on('click', function() {
        window.location.href = 'list-damage-history.html';
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
    getRequest('airPortService/api/mobile/roadDamageCount', 'post', defObj, function(data) {
        pageCount = data.records;
        data = data.rows;
        if (data.length != 0) {
            data.forEach(function(item) {
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.foreignType + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.finderName + '</li >';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.finderTime + '</li>';
                html += '<li style="width:' + setTitleArr[3].width + '"' + "onClick=commentFn(" + "'" + item.comment + "'" + ')>' + item.comment + '</li>';
                if (item.roadPic) {
                    html += '<li style="width:' + setTitleArr[4].width + '"><a class="thumbnail" urlSrc="' + item.roadPic + '" href="javascript:;">查看</a></li>';
                } else {
                    html += '<li style="width:' + setTitleArr[4].width + '"></li>';
                }
                html += '<li class="operationBtns" style="width:' + setTitleArr[5].width + '">';
                if (item.state == '正常') {
                    html += '';
                } else {
                    html += '<a class="fixBtn" href="javascript:;" onClick=fixedFn(' + '"' + item.id + '"' + ',' + '"' + item.roadId + '"' + ')>维修</a>';
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
        //点击查看大图
        $('.thumbnail').each(function(i, v) {
            $(v).on('click', function() {
                console.log(i, v);
                showPicsFn($(this).attr('urlSrc'));
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

function commentFn(value) {
    layer.msg(value);
}
//维修
function fixedFn(id1, id2) {
    layer.open({
        title: '维修',
        content: '是否确认维修？',
        btn: ['确认', '取消'],
        yes: function(index) {
            layer.close(index);
            getRequest(
                'airPortService/busRoad/roadMaintenance',
                'post', {
                    logId: id1,
                    roadId: id2
                },
                function(data) {
                    getPlanListFn();
                }
            );
        },
        btn2: function(index) {
            console.log(i, index, '取消');
            layer.close(index);
        }
    })
}