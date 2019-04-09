var addData = {};
var editData = {};
var isEdit = false;
var carId;
$(function() {
    isEdit = getParam('edit');
    carId = getParam('id');
    laydate.render({
        elem: '#sendTime',
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

        if (!addData.materialName) {
            layer.msg('请输入名称！');
            return false;
        }
        if (!addData.materialType) {
            layer.msg('请输入类型！');
            return false;
        }
        if (!addData.totalNum) {
            layer.msg('请输入数量！');
            return false;
        }
        if (!addData.model) {
            layer.msg('请输入型号！');
            return false;
        }
        if (!addData.status) {
            layer.msg('请输入质量状况！');
            return false;
        }
        if (isEdit || isEdit == 'true') {
            //编辑
            $.extend(editData, addData);
        }

        if (isEdit || isEdit == 'true') {
            //编辑
            getRequest('airPortService/busBirdMaterial/add', 'post', editData, function(data) {
                layer.msg('编辑成功！');
                window.location.href = 'list-material-manage.html';
            });
        } else {
            //新增
            getRequest('airPortService/busBirdMaterial/add', 'post', addData, function(data) {
                layer.msg('新增成功！');
                window.location.href = 'list-material-manage.html';
            });
        }
    });
});

//获取编辑的数据
function getEditDataFn() {
    getRequest(
        'airPortService/busBirdMaterial/get',
        'post', {
            id: carId
        },
        function(data) {
            editData = data;
            $('.contentEdit input').each(function(i, v) {
                $(v).val(editData[v.name]);
            });
            $('.contentEdit select').each(function(i, v) {
                $(v).val(editData[v.name]);
            });
            $('.contentEdit textarea').each(function(i, v) {
                $(v).val(editData[v.name]);
            });
            form.render('select');
        }
    );
}