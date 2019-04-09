var nameArr = [];
var userIdArr = [];
var addData = {};
var editData = {};
var isEdit = false;
var curId;
$(function() {
    isEdit = getParam('edit');
    curId = getParam('id');
    laydate.render({
        elem: '#startTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm',
        done: function(value, date, endDate) {}
    });
    laydate.render({
        elem: '#endTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm',
        done: function(value, date, endDate) {}
    });

    if (isEdit || isEdit == 'true') {
        getEditDataFn();
    }
    //获取人员
    $('#getUser').on('click', function() {
        editData.userIds = editData.headerId;
        editData.userNames = editData.headerName;
        //弹出选择人员的弹框
        var obj = {};
        if (isEdit) {
            getUsersFn('airPortService/api/web/selectTopUserTree', 'get', obj, submitBtnFn, editData);
        } else {
            getUsersFn('airPortService/api/web/selectTopUserTree', 'get', obj, submitBtnFn, null);
        }
    });

    //完成按钮
    $('.searchBtn').on('click', function() {
        var getFormData = $('#form').serializeArray();
        getFormData.forEach(function(item) {
            addData[item.name] = item.value;
        });
        if (!addData.startTime) {
            layer.msg('请输入开始时间！');
            return false;
        }
        if (!addData.endTime) {
            layer.msg('请输入结束时间！');
            return false;
        }
        if (new Date(addData.startTime).getTime() > new Date(addData.endTime).getTime()) {
            layer.msg('开始时间不能大于结束时间！');
            return false;
        }
        if (isEdit || isEdit == 'true') {
            // 编辑
        } else {
            if (userIdArr.length == 0) {
                layer.msg('请选择人员！');
                return false;
            }
        }

        addData.headerId = userIdArr.join(',');
        addData.headerName = nameArr.join(',');
        if (isEdit || isEdit == 'true') {
            //编辑
            if (userIdArr.length != 0) {
                $.extend(editData, addData);
            } else {
                editData.startTime = addData.startTime;
                editData.endTime = addData.endTime;
            }
        }
        if (isEdit || isEdit == 'true') {
            //编辑
            getRequest('airPortService/busLightPlan/add', 'post', editData, function(data) {
                layer.msg('编辑成功！');
                window.location.href = 'list-light.html';
            });
        } else {
            //新增
            getRequest('airPortService/busLightPlan/add', 'post', addData, function(data) {
                layer.msg('新增成功！');
                window.location.href = 'list-light.html';
            });
        }
    });
});

//选人弹框关闭并赋值已选中的人员
function submitBtnFn(obj, arr) {
    nameArr = [];
    userIdArr = [];
    //传值
    arr.forEach(function(item) {
        nameArr.push(item.label);
        userIdArr.push(item.id);
        $("input[name='headerId']").val(nameArr.join(','));
    });
    obj.remove();
}

//获取编辑的数据
function getEditDataFn() {
    getRequest('airPortService/busLightPlan/get', 'post', { id: curId }, function(data) {
        editData = data;
        $('.contentEdit input').each(function(i, v) {
            if (v.name == 'headerId') {
                $(v).val(editData.headerName);
            } else {
                $(v).val(editData[v.name]);
            }
        });
    });
}
