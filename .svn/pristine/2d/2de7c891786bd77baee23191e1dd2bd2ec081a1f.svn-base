var arrangeId = '';
var type;
var editData = {};
var nameArr = [];
var idArr = [];
var listInfo = [];
var listData = [];
var arr2 = [];
$(function() {
    arrangeId = getParam('id');

    getDetailFn();
    //选择
    $('.scheduling').on('click', '.choose', function(e) {
        var index = $('.choose').index($(this));
        arr2 = [];
        var html = '';
        if (listData[index].params == 'people') {
            //console.log(getUserId, 'userId');
            //弹窗为选人
            getUsersFn('airPortService/api/web/selectTopUserTree', 'get', {}, function(obj, arr) {
                arr.forEach(function(item) {
                    arr2.push({
                        peopleId: item.id,
                        label: item.label,
                        peopleLevel: item.peopleLevel,
                        peopleRole: item.peopleRole
                    });
                });

                listData[index].listInfo.length = 0;
                var planId = listData[index].planId;
                var teamPlanId = listData[index].teamPlanId;

                arr2.forEach(function(item) {
                    var addPerson = {
                        pepoleId: item.peopleId,
                        pepoleName: item.label,
                        pepoleLevel: item.peopleLevel,
                        pepoleRole: item.peopleRole,
                        teamPlanId: teamPlanId,
                        planId: planId,
                        id: item.id || ''
                    };
                    listData[index].listInfo.push(addPerson);
                    html += '<ul>';
                    html += '<li style="width:33%;">' + item.label + '</li>';
                    html += '<li style="width:33%;">' + item.peopleLevel + '</li>';
                    html += '<li style="width:33%;">' + item.peopleRole + '</li>';
                    html += '</ul>';
                });

                if (arr.length == listData[index].type_num) {
                    $('.contentList')
                        .eq(index)
                        .find('.list')
                        .html(html);
                    obj.remove();
                } else {
                    layer.msg('所选数量不一致，请重新选择！');
                }

            });
        } else {
            //弹窗为选车
            var carTypeName = listData[index].type_name;
            var carType = listData[index].params;
            getCarsFn(
                'airPortService/carType/list',
                'post', {
                    carTypeName: carTypeName,
                    carType: carType
                    // userId: '6002'
                },
                function(obj, carArr) {
                    listData[index].listInfo.length = 0;
                    var planId = listData[index].planId;
                    var teamPlanId = listData[index].teamPlanId;
                    carArr.forEach(function(item) {
                        carList = JSON.parse(item);
                        var addCar = {
                            carId: carList.carId,
                            carName: carList.carType,
                            carMode: carList.carModel,
                            carCode: carList.carCode,
                            teamPlanId: teamPlanId,
                            planId: planId
                        };
                        // listInfo.splice(index, listData[index].type_num, addCar);
                        listData[index].listInfo.push(addCar);
                        html += '<ul>';
                        html += '<li style="width:33%;">' + carList.carType + '</li>';
                        html += '<li style="width:33%;">' + carList.carCode + '</li>';
                        html += '<li style="width:33%;">' + carList.carModel + '</li>';
                        html += '</ul>';
                    });

                    if (carArr.length == listData[index].type_num) {
                        $('.contentList')
                            .eq(index)
                            .find('.list')
                            .html(html);
                        obj.remove();
                    } else {
                        layer.msg('所选数量不一致，请重新选择！');
                    }

                }
            );
        }
    });
});

function submitBtnFn(obj, arr) {

    var html = '';
    nameArr = [];
    idArr = [];

    //传值
    arr.forEach(function(item) {
        nameArr.push(item.label);
        idArr.push(item.id);
        $('#sentryUser').val(nameArr.join(','));

        html += '<ul>';
        html += '<li style="width:33%;">' + item.carType + '</li>';
        html += '<li style="width:33%;">' + item.carCode + '</li>';
        html += '<li style="width:33%;">' + item.carModel + '</li>';
        // html += '<li class="operationBtns" style="width:33%;"';;
        // html += '<a class="editBtn" href="javascript:;">删除</a>';
        // html += '</li>';
        html += '</ul>';
    });
    obj.remove();
}

function getDetailFn() {
    getRequest(
        'airPortService/busSecurity/headType',
        'post', {
            planId: arrangeId
            // userId: '5000'
        },
        function(data) {
            listData = data;
            //console.log(listData, 'listData');
            if (data.length != 0) {
                var itemBlock = '';
                data.forEach(function(item) {
                    //console.log(item.params == 'people', 'people');
                    if (item.params == 'people') {
                        //人
                        if (item.listInfo == '') {
                            //新增
                            itemBlock += '<div class="contentList">';
                            itemBlock += '<div class="search">';
                            itemBlock += '<form style="overflow:hidden;">';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">名称：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="type_name" value="' + item.type_name + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">数量：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input number" disabled type="text" name="type_num" value="' + item.type_num + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">到达时间：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="arrival_time" value="' + item.arrival_time + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">到达地点：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="arrival_place" value="' + item.arrival_place + '" /></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem" style="display:none;">';
                            itemBlock += '<label class="title">类型：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="params" /></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<button type="button" class="layui-btn layui-btn-normal choose">选择</button>';
                            itemBlock += '</div>';
                            itemBlock += '</form>';
                            itemBlock += '</div>';
                            itemBlock += '<ul class="title">';
                            itemBlock += '<li style="width:33%">名称</li>';
                            itemBlock += '<li style="width:33%">级别</li>';
                            itemBlock += '<li style="width:33%">角色</li>';
                            // itemBlock += '<li style="width:33%">操作</li>';
                            itemBlock += '</ul>';
                            itemBlock += '<div class="list">';
                            itemBlock += '</div>';
                            itemBlock += '</div>';
                        } else {
                            //编辑
                            var editInfo = '';
                            var peopleInfo = item.listInfo;
                            peopleInfo.forEach(function(item) {
                                editInfo += '<ul>';
                                editInfo += '<li style="width:33%;">' + item.pepoleName + '</li>';
                                editInfo += '<li style="width:33%;">' + item.pepoleLevel + '</li>';
                                editInfo += '<li style="width:33%;">' + item.pepoleRole + '</li>';
                                // editInfo += '<li class="operationBtns" style="width:33%;"';;
                                // editInfo += '<a class="editBtn" href="javascript:;">删除</a>';
                                // editInfo += '</li>';
                                editInfo += '</ul>';
                            });
                            //console.log(editInfo);
                            itemBlock += '<div class="contentList">';
                            itemBlock += '<div class="search">';
                            itemBlock += '<form style="overflow:hidden;">';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">名称：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="type_name" value="' + item.type_name + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">数量：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input number" disabled type="text" name="type_num" value="' + item.type_num + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">到达时间：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="arrival_time" value="' + item.arrival_time + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">到达地点：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="arrival_place" value="' + item.arrival_place + '" /></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem" style="display:none;">';
                            itemBlock += '<label class="title">类型：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="params" /></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<button type="button" class="layui-btn layui-btn-normal choose">选择</button>';
                            itemBlock += '</div>';
                            itemBlock += '</form>';
                            itemBlock += '</div>';
                            itemBlock += '<ul class="title">';
                            itemBlock += '<li style="width:33%">名称</li>';
                            itemBlock += '<li style="width:33%">级别</li>';
                            itemBlock += '<li style="width:33%">角色</li>';
                            // itemBlock += '<li style="width:33%">操作</li>';
                            itemBlock += '</ul>';
                            itemBlock += '<div class="list">';
                            itemBlock += editInfo;
                            itemBlock += '</div>';
                            itemBlock += '</div>';
                        }
                    } else {
                        //车
                        if (item.listInfo == '') {
                            //新增
                            itemBlock += '<div class="contentList">';
                            itemBlock += '<div class="search">';
                            itemBlock += '<form style="overflow:hidden;">';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">名称：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="type_name" value="' + item.type_name + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">数量：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input number" disabled type="text" name="type_num" value="' + item.type_num + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">到达时间：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="arrival_time" value="' + item.arrival_time + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">到达地点：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="arrival_place" value="' + item.arrival_place + '" /></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem" style="display:none;">';
                            itemBlock += '<label class="title">类型：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="params" /></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<button type="button" class="layui-btn layui-btn-normal choose">选择</button>';
                            itemBlock += '</div>';
                            itemBlock += '</form>';
                            itemBlock += '</div>';
                            itemBlock += '<ul class="title">';
                            itemBlock += '<li style="width:33%">车名称</li>';
                            itemBlock += '<li style="width:33%">车牌号</li>';
                            itemBlock += '<li style="width:33%">车辆类型</li>';
                            // itemBlock += '<li style="width:33%">操作</li>';
                            itemBlock += '</ul>';
                            itemBlock += '<div class="list">';
                            itemBlock += '</div>';
                            itemBlock += '</div>';
                        } else {
                            //编辑
                            var editInfo = '';
                            var carInfo = item.listInfo;
                            carInfo.forEach(function(item) {
                                //listInfo.push(editCar);
                                editInfo += '<ul>';
                                editInfo += '<li style="width:33%;">' + item.carName + '</li>';
                                editInfo += '<li style="width:33%;">' + item.carCode + '</li>';
                                editInfo += '<li style="width:33%;">' + item.carMode + '</li>';
                                editInfo += '</ul>';
                            });

                            itemBlock += '<div class="contentList">';
                            itemBlock += '<div class="search">';
                            itemBlock += '<form style="overflow:hidden;">';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">名称：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="type_name" value="' + item.type_name + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">数量：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input number" disabled type="text" name="type_num" value="' + item.type_num + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">到达时间：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="arrival_time" value="' + item.arrival_time + '"/></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<label class="title">到达地点：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="arrival_place" value="' + item.arrival_place + '" /></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem" style="display:none;">';
                            itemBlock += '<label class="title">类型：</label>';
                            itemBlock += '<div class="input-block"><input class="layui-input" disabled type="text" name="params" /></div>';
                            itemBlock += '</div>';
                            itemBlock += '<div class="searchItem">';
                            itemBlock += '<button type="button" class="layui-btn layui-btn-normal choose">选择</button>';
                            itemBlock += '</div>';
                            itemBlock += '</form>';
                            itemBlock += '</div>';
                            itemBlock += '<ul class="title">';
                            itemBlock += '<li style="width:33%">车名称</li>';
                            itemBlock += '<li style="width:33%">车牌号</li>';
                            itemBlock += '<li style="width:33%">车辆类型</li>';
                            // itemBlock += '<li style="width:33%">操作</li>';
                            itemBlock += '</ul>';
                            itemBlock += '<div class="list">';
                            itemBlock += editInfo;
                            itemBlock += '</div>';
                            itemBlock += '</div>';
                        }
                    }
                });
                $('.footer').before(itemBlock);
            } else {
                $('.footer').before('<p class="noData">暂无数据！</p>');
            }
        }
    );
}

//提交

function requestList() {
    listData.forEach(function(item) {
        if (item.listInfo != '') {
            if (item.params == 'people') {
                item.listInfo.forEach(function(item) {
                    var editPerson = {
                        pepoleId: item.pepoleId,
                        pepoleName: item.pepoleName,
                        pepoleLevel: item.pepoleLevel,
                        pepoleRole: item.pepoleRole,
                        teamPlanId: item.teamPlanId,
                        planId: item.planId,
                        id: item.id || ''
                    };
                    listInfo.push(editPerson);
                });
            } else {
                item.listInfo.forEach(function(item) {
                    var addCar = {
                        carId: item.carId,
                        carName: item.carName,
                        carMode: item.carMode,
                        carCode: item.carCode,
                        teamPlanId: item.teamPlanId,
                        planId: item.planId,
                        id: item.id || ''
                    };
                    listInfo.push(addCar);
                });
            }
        }
    });

    getRequest('airPortService/busSecurityPlanTeamInfo/update', 'post', listInfo, function(data) {
        window.location.href = 'list-flight-support.html';
    });
}