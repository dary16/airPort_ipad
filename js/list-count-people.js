var setTitleArr = [];
var searchData = {};
var data = [];
$(function() {
    setTitleArr = [
        {
            title: '人员',
            width: '30%'
        },
        {
            title: '工作次数',
            width: '30%'
        },
        {
            title: '工作时长',
            width: '40%'
        }
    ];
    var titleHtml = '';
    setTitleArr.forEach(function(item) {
        titleHtml += '<li style="width:' + item.width + '">' + item.title + '</li>';
    });
    $('#topTitle').html(titleHtml);
    //获取列表
    getPlanListFn();
});

function getPlanListFn() {
    var html = '';
    getRequest('airPortService/api/mobile/personnelCount', 'post', {}, function(data) {
        if (data.length != 0) {
            data.forEach(function(item) {
                if (item.work_count_time == null || item.work_count_time == 'null') {
                    item.work_count_time = 0;
                }
                html += '<ul>';
                html += '<li style="width:' + setTitleArr[0].width + '">' + item.user_name + '</li>';
                html += '<li style="width:' + setTitleArr[1].width + '">' + item.num + '</li >';
                html += '<li style="width:' + setTitleArr[2].width + '">' + item.work_count_time + '小时' + '</li >';
                html += '</ul>';
            });
            $('.contentList .list').html(html);
        } else {
            $('.contentList .list').html('<li class="noData">暂无数据！</li>');
        }
    });
}
