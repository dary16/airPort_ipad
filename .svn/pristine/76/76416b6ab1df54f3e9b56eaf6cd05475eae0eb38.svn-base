var postionId = '';
var popupHtml = '';
var startTimeVal, endTimeVal;
var modifyData = [];
var getFormData = [];
var showListData = [];
var nameArr = [];
var userIdArr = [];
popupHtml += '<form class="layui-form" id="form">';
popupHtml += '<div class="layui-form-item">';
popupHtml += '<label class="layui-form-label">开始时间：</label>';
popupHtml += '<div class="layui-input-block">';
popupHtml += '<input class="layui-input" type="text" name="startTime" placeholder="请选择开始时间" autocomplete="off">';
popupHtml += '</div>';
popupHtml += '</div>';
popupHtml += '<div class="layui-form-item">';
popupHtml += '<label class="layui-form-label">结束时间：</label>';
popupHtml += '<div class="layui-input-block">';
popupHtml += '<input class="layui-input" type="text" name="endTime" placeholder="请选择结束时间" autocomplete="off">';
popupHtml += '</div>';
popupHtml += '</div>';
popupHtml += '<div class="layui-form-item">';
popupHtml += '<label class="layui-form-label">排班人员：</label>';
popupHtml += '<div class="layui-input-block">';
popupHtml += '<input id="modifyUser" class="layui-input specialBtn ellipsis" type="text" name="userNames">';
popupHtml += '</div>';
popupHtml += '</div>';
popupHtml += '</form>';
$(function() {
    postionId = getParam('postionId');
    getPlanList();
    //编辑状态
    $('#makeEditBtn').on('click', function() {
        $('.editBtn').css('display', 'block');
    });
    //取消编辑状态
    $('#cancelEditBtn').on('click', function() {
        $('.editBtn').css('display', 'none');
    });
});

//获取排班列表
function getPlanList() {
    getRequest(
        'airPortService/api/mobile/userArrangeDetail',
        'post',
        {
            postionId: postionId
        },
        function(data) {
            if (data.length == 0) {
                return false;
            }
            $('.topic').html('<span>' + data[0].positionName + '</span><span>' + data[0].userInfo + '人岗</span><span>每班时长：' + data[0].positionCycle + '小时</span>');
            showListData = JSON.parse(JSON.stringify(data));
            showListData.forEach(function(item) {
                item.startHour = item.startTime.slice(11);
                item.endHour = item.endTime.slice(11);
                item.startTime = item.startTime.slice(0, 10);
                item.endTime = item.endTime.slice(0, 10);
            });
            var showDataArr = mapLoction(showListData);
            var showHtml = '';
            showDataArr.forEach(function(item) {
                var html = '';
                item.listArr.forEach(function(subItem) {
                    var users = subItem.userNames.split(',');
                    var liHtml = '';
                    users.forEach(function(userItem) {
                        liHtml += '<li>' + userItem + '</li>';
                    });
                    html += '<div class="block">';
                    html += '<p>' + subItem.startHour + '-' + subItem.endHour + '</p>';
                    html += '<ul>';
                    html += liHtml;
                    html += '</ul>';
                    html += '<a class="editBtn" href="javascript:;"><img src="img/scheduling/edit.png"/></a>';
                    html += '</div>';
                });
                showHtml += '<div class="listShow">';
                showHtml += '<div class="title">';
                showHtml += '<img src="img/calendar.png" /> ' + item.startTime + '</div>';
                showHtml += '<div class="list clearfix">' + html + '</div>';
                showHtml += '</div>';
            });
            $('#timeUserList').html(showHtml);
            $('.editBtn').each(function(i, v) {
                $(v).on('click', function() {
                    modifyData = data[i];
                    formPopup(
                        '修改',
                        popupHtml,
                        '7',
                        { btn1: '确定', btn2: '取消' },
                        function(obj) {
                            //确定的回调
                            getFormData = $('#form').serializeArray();
                            getFormData.forEach(function(item) {
                                modifyData[item.name] = item.value;
                            });
                            if (new Date(modifyData.endTime).getTime() <= new Date(modifyData.startTime).getTime()) {
                                layer.msg('结束时间不能小于等于开始时间！');
                                return false;
                            }
                            if (modifyData.userNames.split(',').length != modifyData.userInfo) {
                                layer.msg(modifyData.positionName + '是' + modifyData.userInfo + '人岗位，请重新选择人员！');
                                return false;
                            }
                            modifyData.userIds = userIdArr.length != 0 ? userIdArr.join(',') : modifyData.userIds;
                            modifyData.userNames = nameArr.length != 0 ? nameArr.join(',') : modifyData.userNames;
                            getRequest('airPortService/api/mobile/updateUserArrangeInfo', 'post', modifyData, function(data) {
                                //该岗位时间段已有排班人员
                                if (data == 1) {
                                    layer.confirm('该岗位时间段已有排班人员,确定排版？', function(index) {
                                        layer.close(index);
                                        obj.remove();
                                        modifyData.type = '2';
                                        getRequest('airPortService/api/mobile/updateUserArrangeInfo', 'post', modifyData, function(data) {
                                            layer.msg('排版成功！');
                                            window.location.reload();
                                        });
                                    });
                                }
                            });
                        },
                        function(obj) {
                            //取消的回调
                            obj.remove();
                        },
                        function() {
                            // 赋值的函数
                            $("input[name='startTime']").val(modifyData.startTime);
                            $("input[name='endTime']").val(modifyData.endTime);
                            $("input[name='userNames']").val(modifyData.userNames);
                            $('#modifyUser').on('click', function() {
                                //弹出选择人员的弹框
                                var obj = {};
                                getUsersFn('airPortService/api/web/selectTopUserTree', 'get', obj, submitBtnFn, modifyData);
                            });
                        },
                        null
                    );
                    //开始时间
                    laydate.render({
                        elem: "input[name='startTime']",
                        type: 'datetime',
                        done: function(value, date, endDate) {
                            startTimeVal = value;
                        }
                    });
                    //结束时间
                    laydate.render({
                        elem: "input[name='endTime']",
                        type: 'datetime',
                        done: function(value, date, endDate) {
                            endTimeVal = value;
                        }
                    });
                });
            });
        }
    );
}
//自动生成排班时间
function autoScheduling() {
    getRequest(
        'airPortService/api/mobile/lastAvialableUserArrangeTime',
        'post',
        {
            postionId: $('#stationList').val()
        },
        function(data) {
            if (new Date(data).getTime() > new Date(startTime).getTime()) {
                layer.msg('请选择' + data + '以后的时间排班！');
                return false;
            }
            //自动生成时间段
            timeRangeFn(startTimeVal, endTimeVal, timeRangeVal, startRestTimeVal, endRestTimeVal);
        }
    );
}
//选人弹框关闭并赋值已选中的人员
function submitBtnFn(obj, arr) {
    nameArr = [];
    userIdArr = [];
    //传值
    arr.forEach(function(item) {
        nameArr.push(item.label);
        userIdArr.push(item.id);
        $("input[name='userNames']").val(nameArr.join(','));
    });
    obj.remove();
}
