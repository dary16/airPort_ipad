var editData = {};
var isEdit = false;
var curId;
$(function() {
    isEdit = getParam('edit');
    curId = getParam('id');

    if (isEdit || isEdit == 'true') {
        getEditDataFn();
    }
});

//获取编辑的数据
function getEditDataFn() {
    getRequest(
        'airPortService/busBirdReport/get',
        'post',
        {
            id: curId
        },
        function(data) {
            editData = data;
            $('.contentEdit')
                .find('input,textarea')
                .each(function(i, v) {
                    $(v).val(editData[v.name]);
                });
        }
    );
}
