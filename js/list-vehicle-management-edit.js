var addData = {};
var editData = {};
var isEdit = false;
var curId;
$(function() {
    isEdit = getParam('edit');
    curId = getParam('id');
    laydate.render({
        elem: '#deliveryTime',
        type: 'date',
        done: function(value, date, endDate) {}
    });
    laydate.render({
        elem: '#withTime',
        type: 'date',
        done: function(value, date, endDate) {}
    });
    form.render('select');

    if (isEdit || isEdit == 'true') {
        getEditDataFn();
    }

    //完成按钮
    $('.searchBtn').on('click', function() {
        var getFormData = $('#form').serializeArray();
        getFormData.forEach(function(item) {
            addData[item.name] = item.value;
        });
        if (!addData.carType) {
            layer.msg('请选择汽车名称！');
            return false;
        }

        if (isEdit || isEdit == 'true') {
            //编辑
            $.extend(editData, addData);
        }

        if (isEdit || isEdit == 'true') {
            //编辑
            getRequest('airPortService/busCar/add', 'post', editData, function(data) {
                layer.msg('编辑成功！');
                window.location.href = 'list-vehicle-management.html';
            });
        } else {
            //新增
            getRequest('airPortService/busCar/add', 'post', addData, function(data) {
                layer.msg('新增成功！');
                window.location.href = 'list-vehicle-management.html';
            });
        }
    });
});

//获取编辑的数据
function getEditDataFn() {
    getRequest('airPortService/busCar/get', 'post', { id: curId }, function(data) {
        editData = data;
        $('.contentEdit')
            .find('input,select')
            .each(function(i, v) {
                $(v).val(editData[v.name]);
            });
        form.render('select');
    });
}
