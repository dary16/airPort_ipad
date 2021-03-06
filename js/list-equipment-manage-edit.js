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
    getEquipTypeFn();
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
        if (!addData.equipName) {
            layer.msg('请输入名称！');
            return false;
        }
        if (!addData.equipType) {
            layer.msg('请选择类型！');
            return false;
        }
        if (!addData.equipNum) {
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
            getRequest('airPortService/busBirdEquip/add', 'post', editData, function(data) {
                layer.msg('编辑成功！');
                window.location.href = 'list-equipment-manage.html';
            });
        } else {
            //新增
            getRequest('airPortService/busBirdEquip/add', 'post', addData, function(data) {
                layer.msg('新增成功！');
                window.location.href = 'list-equipment-manage.html';
            });
        }
    });
});

//获取车辆下拉列表
function getEquipTypeFn() {
    getRequest('airPortService/busDictory/list', 'post', {
        type: 'Equ'
    }, function(data) {
        selectData = data.rows;
        var html = '';
        data.rows.forEach(function(item) {
            html += '<option value="' + item.dicValue + '">' + item.dicValue + '</option>';
        });
        $('#equipList').append(html);
        form.render('select');
        //获得编辑数据
        if (isEdit || isEdit == 'true') {
            getEditDataFn();
        }
    });
}

//获取编辑的数据
function getEditDataFn() {
    getRequest(
        'airPortService/busBirdEquip/get',
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