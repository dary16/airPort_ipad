var arrangeId = '';
$(function() {
    arrangeId = getParam('arrangeId');
    getDetailFn();
});
function getDetailFn() {
    getRequest('airPortService/api/mobile/selectUserStatisticsDetail', 'post', { arrangeId: arrangeId }, function(data) {
        $('.contentEdit input').each(function(i, v) {
            $(v).val(data[v.name]);
        });
    });
}
