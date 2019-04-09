var arrangeId = '';
$(function() {
    arrangeId = getParam('arrangeId');
    getDetailFn();
});

function getDetailFn() {
    getRequest('airPortService/api/mobile/exchangExceptReportedDetail', 'post', {
        exceptionId: arrangeId
    }, function(data) {
        $('.contentEdit input').each(function(i, v) {
            //console.log(i, v, data[v.name]);
            $(v).val(data[v.name]);
        });
    });
}