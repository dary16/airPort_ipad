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
        //addData.createrId = getUserId;

        // if (!addData.createrId) {
        //     layer.msg('请输入创建id！');
        //     return false;
        // }
        // if (!addData.createrName) {
        //     layer.msg('请输入创建人！');
        //     return false;
        // }
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
            getRequest('airPortService/busCarPlace/add', 'post', editData, function(data) {
                layer.msg('编辑成功！');
                window.location.href = 'list-carplace.html?';
            });
        } else {
            //新增
            getRequest('airPortService/busCarPlace/add', 'post', addData, function(data) {
                layer.msg('新增成功！');
                window.location.href = 'list-carplace.html';
            });
        }
    });
});

//获取编辑的数据
function getEditDataFn() {
    getRequest(
        'airPortService/busCarPlace/get',
        'post', {
            id: curId
        },
        function(data) {
            //console.log(data);
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