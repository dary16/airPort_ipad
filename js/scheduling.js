$(function() {
    //获取排班列表
    getPlanListFn();
    //创建排班
    $('#createPlan').on('click', function() {
        window.location.href = 'scheduling-add.html';
    });
});

function getPlanListFn() {
    var html = '';
    getRequest('airPortService/api/mobile/queryBusPositionArrangeList', 'post', { postionId: '' }, function(data) {
        data.forEach(function(item) {
            html += '<ul><li>' + item.positionName + '</li><li>' + item.comment + '</li><li>' + item.positionType + '</li><li>' + item.positionCycle + '</li><li>' + item.endTime + '</li><li><a class="checkPlan" href="javascript:;">查看</a></li></ul>';
        });
        $('.contentList .list').append(html);
        //操作 查看 点击事件
        $('.checkPlan').each(function(i, v) {
            $(v).on('click', function() {
                window.location.href = 'scheduling-edit.html?postionId=' + data[i].positionId;
            });
        });
    });
}
