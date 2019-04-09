var nameArr = [];
var userIdArr = [];
var addData = {};
var editData = {};
var isEdit = false;
var curId;
$(function() {
    isEdit = getParam('edit');
    curId = getParam('id');
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

        if (!addData.num) {
            layer.msg('请输入编号！');
            return false;
        }
        if (!addData.calibre) {
            layer.msg('请输入口径！');
            return false;
        }
        if (!addData.pressure) {
            layer.msg('请输入压力！');
            return false;
        }
        if (!addData.lon) {
            layer.msg('请输入经度！');
            return false;
        }
        if (!addData.lng) {
            layer.msg('请输入纬度！');
            return false;
        }
        if (!addData.interfaceType) {
            layer.msg('请选择接口类型！');
            return false;
        }
        if (!addData.status) {
            layer.msg('请选择状态！');
            return false;
        }

        if (isEdit || isEdit == 'true') {
            //编辑
            $.extend(editData, addData);
        }
        if (isEdit || isEdit == 'true') {
            //编辑
            getRequest('airPortService/busFireHydrant/add', 'post', editData, function(data) {
                layer.msg('编辑成功！');
                window.location.href = 'list-fireplug.html';
            });
        } else {
            //新增
            getRequest('airPortService/busFireHydrant/add', 'post', addData, function(data) {
                if (data == 1) {
                    layer.msg('编号已存在，请重新输入！');
                    return false;
                } else {
                    layer.msg('新增成功！');
                    window.location.href = 'list-fireplug.html';
                }
            });
        }
    });
});

//获取编辑的数据
function getEditDataFn() {
    getRequest(
        'airPortService/busFireHydrant/detail',
        'post',
        {
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
        }
    );
}
