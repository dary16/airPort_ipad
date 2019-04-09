var addData = {};
var editData = {};
var isEdit = false;
var carId;
$(function() {
    isEdit = getParam('edit');
    carId = getParam('id');
    laydate.render({
        elem: '#sendTime',
        type: 'datetime',
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
        if (!addData.nowTime) {
            layer.msg('请选择时间！');
            return false;
        }
        if (!addData.title) {
            layer.msg('请输入标题！');
            return false;
        }
        if (!addData.content) {
            layer.msg('请输入内容！');
            return false;
        }
        if (isEdit || isEdit == 'true') {
            //编辑
            $.extend(editData, addData);
        }

        if (isEdit || isEdit == 'true') {
            //编辑
            getRequest('airPortService/busBirdNotice/add', 'post', editData, function(data) {
                layer.msg('编辑成功！');
                window.location.href = 'list-bird-notice.html';
            });
        } else {
            //新增
            getRequest('airPortService/busBirdNotice/add', 'post', addData, function(data) {
                layer.msg('新增成功！');
                window.location.href = 'list-bird-notice.html';
            });
        }
    });
});

//获取编辑的数据
function getEditDataFn() {
    getRequest(
        'airPortService/busBirdNotice/get',
        'post', {
            id: carId
        },
        function(data) {
            editData = data;
            $('.contentEdit input').each(function(i, v) {
                $(v).val(editData[v.name]);
            });
            $('.contentEdit textarea').each(function(i, v) {
                $(v).val(editData[v.name]);
            });
            form.render('select');
        }
    );
}