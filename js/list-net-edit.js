var addData = {};
var editData = {};
var isEdit = false;
var curId;
$(function() {
    isEdit = getParam('edit');
    curId = getParam('id');
    laydate.render({
        elem: '#manufactureDate',
        type: 'date',
        done: function(value, date, endDate) {}
    });
    laydate.render({
        elem: '#useDate',
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
        if (!addData.name) {
            layer.msg('请输入名称！');
            return false;
        }

        if (isEdit || isEdit == 'true') {
            //编辑
            $.extend(editData, addData);
        }

        if (isEdit || isEdit == 'true') {
            //编辑
            getRequest('airPortService/busArresterNet/add', 'post', editData, function(data) {
                layer.msg('编辑成功！');
                window.location.href = 'list-net.html';
            });
        } else {
            //新增
            getRequest('airPortService/busArresterNet/add', 'post', addData, function(data) {
                layer.msg('新增成功！');
                window.location.href = 'list-net.html';
            });
        }
    });
});

//获取编辑的数据
function getEditDataFn() {
    getRequest('airPortService/busArresterNet/detail', 'post', {
        id: curId
    }, function(data) {
        editData = data;
        $('.contentEdit')
            .find('input,select')
            .each(function(i, v) {
                $(v).val(editData[v.name]);
            });
        form.render('select');
    });
}