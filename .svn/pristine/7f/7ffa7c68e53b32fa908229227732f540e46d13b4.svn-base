var addData = {};
var editData = {};
var isEdit = false;
var curId;
$(function() {
    if (getParam('edit')) {
        isEdit = getParam('edit');
        curId = getParam('id');
    }

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
        //console.log(getFormData, 'formData');
        if (!addData.carType) {
            layer.msg('请选择车辆类型！');
            return false;
        }
        if (!addData.carCode) {
            layer.msg('请输入车牌号！');
            return false;
        }
        if (!addData.deliveryCode) {
            layer.msg('请输入出厂编码！');
            return false;
        }
        if (!addData.deliveryTime) {
            layer.msg('请输入出厂日期！');
            return false;
        }
        if (!addData.status) {
            layer.msg('请输入技术状况！');
            return false;
        }
        if (!addData.length) {
            layer.msg('请输入长！');
            return false;
        }
        if (!addData.width) {
            layer.msg('请输入宽！');
            return false;
        }
        if (!addData.height) {
            layer.msg('请输入高！');
            return false;
        }

        if (isEdit || isEdit == 'true') {
            //编辑
            $.extend(editData, addData);
        }

        if (isEdit || isEdit == 'true') {
            //编辑
            getRequest('airPortService/busSzlCar/add', 'post', editData, function(data) {
                layer.msg('编辑成功！');
                window.location.href = 'list-car-manage.html';
            });
        } else {
            //新增
            getRequest('airPortService/busSzlCar/add', 'post', addData, function(data) {
                layer.msg('新增成功！');
                window.location.href = 'list-car-manage.html';
            });
        }
    });
});

//获取编辑的数据
function getEditDataFn() {
    getRequest(
        'airPortService/busSzlCar/get',
        'post', {
            id: curId
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