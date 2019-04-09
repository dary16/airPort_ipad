var nameArr = [];
var idArr = [];
var userId;
var orgIds = [];
var markerGuards;
var markers;
$(document).ready(function() {
    var uid = getParam('userId');
    sessionStorage.setItem('uid', uid);
    userId = uid;
    console.log(userId);
    guardList();
    patrolList();
});

// function choosePeoples() {
//     $('.choosePeople').show();
// }

function choosePeoples() {
    getUsersFn('airPortService/inter/sysUser?userId=' + userId, 'get', {}, submitBtnFn);
}

function choosePeoples2() {
    getUsersFn('airPortService/inter/sysUser?userId=' + userId, 'get', {}, submitBtnFn2);
}

function submitBtnFn(obj, arr) {
    nameArr = [];
    idArr = [];
    //传值
    arr.forEach(function(item) {
        nameArr.push(item.label);
        idArr.push(item.id);
        $('#sentryUser').val(nameArr.join(','));
    });
    obj.remove();
}

function submitBtnFn2(obj, arr) {
    nameArr = [];
    idArr = [];
    //传值
    arr.forEach(function(item) {
        nameArr.push(item.label);
        idArr.push(item.id);
        $('#patrolUser').val(nameArr.join(','));
    });
    obj.remove();
}

//获取岗哨列表
function guardList() {
    markerGuards = {};
    if (markers) {
        map.removeLayer(markers);
    }
    getRequest('airPortService/api/mobile/busGuardPositionList', 'post', {}, function(data) {
        $('#gsList').html('');
        var liItem = '';
        var markers = [];
        data.forEach(function(item, index) {
            var id = item.positionId;
            liItem = '<li id=' + id + "><div onclick='infoGs(this);'><span>" + item.positionName + "</span><img class='more' src='./img/sentinel/more.png' /></div><div><img class='del' src='./img/sentinel/delete.png' onclick='deleteGs(this);'></div></li>";
            $('#gsList').append(liItem);
            var markerGuard = L.marker(L.latLng(item.positionLongitude, item.positionLatitude));
            //设置标注的自定义属性值
            Object.defineProperties(markerGuard, {
                name: {
                    value: item.positionName
                },
                lon: {
                    value: item.positionLongitude
                },
                lat: {
                    value: item.positionLatitude
                },
                range: {
                    value: item.positionRange
                },
                type: {
                    value: item.positionType
                },
                level: {
                    value: item.userLevel
                },
                userName: {
                    value: item.specialUserName
                },
                userId: {
                    value: item.specialUser
                },
                comment: {
                    value: item.comment
                },
                id: {
                    value: item.positionId
                }
            });
            markerGuard.on('click', MarkerClick);
            markers.push(markerGuard);
        });
        markerGuards = L.layerGroup(markers);
        markerGuards.addTo(map);
    });
}
//点击标注弹出详情
function MarkerClick(e) {
    map.panTo([e.target.lon, e.target.lat]);
    //console.log(e.target);
    map.removeLayer(markerGuards);
    $('.sentryWrap').hide();
    var infoId = e.target.id;
    var str = '';
    getRequest(
        'airPortService/api/mobile/getBusGuardPositionDetail',
        'post',
        {
            positionId: infoId
        },
        function(data) {
            str += '<form class="layui-form" id="gsForm">';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">名称</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title" id="sentryName" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">径纬度</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" id="addressLngLat" lay-verify="title" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">岗哨范围</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" id="sentryControl" lay-verify="title" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">岗哨类型</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title" id="sentryType" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">专业等级</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title"  id="sentryLevel" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">特定人员</label>';
            str += '<div class="layui-input-block">';
            str += '<textarea value="" class="layui-textarea" id="sentryUser" readonly></textarea>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">备注</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="comment" lay-verify="title"  id="sentryComment" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div></form>';
            var marker = L.marker([e.target.lon, e.target.lat]);
            map.addLayer(marker);

            formPopup(
                '岗哨详情',
                str,
                '',
                {
                    btn1: '编辑',
                    btn2: '取消'
                },
                function(obj) {
                    //console.log($('#form').serializeArray());
                    editObj(infoId);
                    map.removeLayer(marker);
                    obj.remove();
                    $('.sentryWrap').show();
                    markerGuards.addTo(map);
                },
                function(obj) {
                    obj.remove();
                    map.removeLayer(marker);
                    $('.sentryWrap').show();
                    markerGuards.addTo(map);
                },
                function() {
                    $('#sentryName').val(e.target.name);
                    $('#addressLngLat').val([e.target.lon, e.target.lat]);
                    $('#sentryControl').val(e.target.range);
                    $('#sentryType').val(e.target.type + '人');
                    $('#sentryLevel').val(e.target.level);
                    $('#sentryUser').val(e.target.userName);
                    $('#sentryComment').val(e.target.comment);
                },
                {
                    left: 0,
                    top: 1
                }
            );
        }
    );
}

//新建岗哨
$('.content1 .add').on('click', function() {
    map.removeLayer(markerGuards);
    $('.sentryWrap').hide();
    // $('.xgPop input').val('');
    // $('.xgPop textarea').val('');

    var str = '';

    str += '<form class="layui-form" id="gsForm"> <div class = "layui-form-item">';
    str += '<label class = "layui-form-label"> 名称 </label>';
    str += '<div class = "layui-input-block"><input type = "text" name = "title" lay - verify = "title" id = "sentryName" autocomplete = "off" placeholder = "请输入岗哨名称" class = "layui-input" >';
    str += '</div></div><div class = "layui-form-item">';
    str += '<label class = "layui-form-label"> 径纬度 </label>';
    str += '<div class = "layui-input-block"><input type = "text" name = "title" lay - verify = "title" id = "addressLngLat" autocomplete = "off" placeholder = "请在地图上选择" class = "layui-input" readonly onclick = "MarkerClickEvent(event);" >';
    str += '</div></div><div class = "layui-form-item">';
    str += '<label class = "layui-form-label"> 岗哨范围 </label>';
    str += '<div class = "layui-input-block"> <input type = "text" name = "title" id = "sentryControl" lay - verify = "title" autocomplete = "off" placeholder = "请输入岗哨范围" class = "layui-input" >';
    str += '</div></div><div class = "layui-form-item" >';
    str += '<label class = "layui-form-label"> 岗哨类型 </label>';
    str += '<div class = "layui-input-block"><input type = "text" name = "title" lay - verify = "title" id = "sentryType" autocomplete = "off" placeholder = "请输入岗哨类型" class = "layui-input" >';
    str += '</div></div><div class = "layui-form-item">';
    str += '<label class = "layui-form-label"> 专业等级 </label>';
    str += '<div class = "layui-input-block" >';
    str += '<select name = "interest" lay - filter = "aihao" id = "sentryLevel">';
    str += '<option value = "一级" selected = ""> 一级 </option> <option value = "二级" > 二级 </option> <option value = "三级" > 三级 </option> </select >';
    str += '</div></div><div class = "layui-form-item">';
    str += '<label class = "layui-form-label"> 特定人员 </label>';
    str += '<div class = "layui-input-block"><textarea placeholder="请选择特定人员" class="layui-textarea" id="sentryUser" readonly onclick = "choosePeoples();"></textarea>';
    str += '</div></div><div class = "layui-form-item">';
    str += '<label class = "layui-form-label"> 备注 </label>';
    str += '<div class = "layui-input-block" >';
    str += '<input type = "text" name = "comment" lay - verify = "title" id = "sentryComment" autocomplete = "off" placeholder = "请输入备注" class = "layui-input" >';
    str += '</div></div></form>';

    formPopup(
        '新建岗哨',
        str,
        '',
        {
            btn1: '确定',
            btn2: '取消'
        },
        function(obj) {
            //console.log($('#gsForm').serializeArray());
            var positionName = $('#sentryName').val();
            var markerLng = g_lng;
            var markerLat = g_lat;
            var range = $('#sentryControl').val();
            var positionType = $('#sentryType').val();
            var level = $('#sentryLevel option:selected').val();
            var ids = idArr.join(',');
            var Sencomment = $('#sentryComment').val();
            var arrLL = $('#addressLngLat')
                .val()
                .split(',');

            if (!positionName) {
                layer.msg('请输入岗哨名称！');
                return false;
            }
            if (arrLL == '') {
                layer.msg('请选择经纬度！');
                return false;
            }
            if (!range) {
                layer.msg('请输入岗哨范围！');
                return false;
            }
            if (!positionType) {
                layer.msg('请输入岗哨类型！');
                return false;
            }

            if (!ids) {
                layer.msg('请选择特定人员！');
                return false;
            }
            if (arrLL && range && positionType && positionName && ids && arrLL != '') {
                getRequest(
                    'airPortService/api/mobile/addBusGuardPosition',
                    'post',
                    {
                        positionName: positionName,
                        positionLongitude: arrLL[0],
                        positionLatitude: arrLL[1],
                        positionRange: range,
                        positionType: positionType,
                        userLevel: level,
                        specialUser: ids,
                        comment: Sencomment
                        // exchangCycle: exchangCycle
                    },
                    function(data) {
                        layer.msg('新增成功！');
                        $('.sentryWrap').show();
                        guardList();
                        //map.removeLayer(marker);
                        map.off('click');
                        obj.remove();
                        //markerGuards.addTo(map);
                    }
                );
            } else {
                layer.msg('请填写完整信息！');
            }
        },
        function(obj) {
            $('.sentryWrap').show();
            obj.remove();
            map.off('click');
            markerGuards.addTo(map);
        },
        null,
        {
            left: 0,
            top: 1
        }
    );
    form.render();
});

//岗哨详情
function infoGs(obj) {
    // console.log(markerGuards);
    // markerGuards = {};
    map.removeLayer(markerGuards);
    $('.sentryWrap').hide();
    var infoId = $(obj)
        .parent()
        .attr('id');
    var str = '';
    getRequest(
        'airPortService/api/mobile/getBusGuardPositionDetail',
        'post',
        {
            positionId: infoId
        },
        function(data) {
            str += '<form class="layui-form" id="gsForm">';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">名称</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title" id="sentryName" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">径纬度</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title" id="addressLngLat" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">岗哨范围</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" id="sentryControl" lay-verify="title" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">岗哨类型</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title" id="sentryType" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">专业等级</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title"  id="sentryLevel" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">特定人员</label>';
            str += '<div class="layui-input-block">';
            str += '<textarea value="" class="layui-textarea" id="sentryUser" readonly></textarea>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">备注</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="comment" lay-verify="title"  id="sentryComment" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div></form>';

            var mars = [];
            map.panTo([data.positionLongitude, data.positionLatitude]);
            var ms = L.marker([data.positionLongitude, data.positionLatitude]);
            mars.push(ms);
            mars1 = L.layerGroup(mars);
            mars1.addTo(map);
            formPopup(
                '岗哨详情',
                str,
                '',
                {
                    btn1: '编辑',
                    btn2: '取消'
                },
                function(obj) {
                    //console.log($('#form').serializeArray());
                    $('.sentryWrap').show();
                    //map.removeLayer(mars1);
                    obj.remove();
                    editObj(infoId, mars1);
                },
                function(obj) {
                    map.removeLayer(mars1);
                    $('.sentryWrap').show();
                    obj.remove();
                    guardList();
                },
                function() {
                    $('#sentryName').val(data.positionName);
                    $('#addressLngLat').val([data.positionLongitude, data.positionLatitude]);
                    $('#sentryControl').val(data.positionRange);
                    $('#sentryType').val(data.positionType + '人');
                    $('#sentryLevel').val(data.userLevel);
                    $('#sentryUser').val(data.specialUserName);
                    $('#sentryComment').val(data.comment);
                },
                {
                    left: 0,
                    top: 1
                }
            );
        }
    );
}

//编辑岗哨
function editObj(id, editMarker) {
    $('.sentryWrap').hide();
    var str = '';
    getRequest(
        'airPortService/api/mobile/getBusGuardPositionDetail',
        'post',
        {
            positionId: id
        },
        function(data) {
            str += '<form class="layui-form" id="gsEditForm">';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">名称</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title" id="sentryName" autocomplete="off" value="" class="layui-input">';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">径纬度</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title" id="addressLngLat" autocomplete="off" value="" class="layui-input" readonly onclick="MarkerClickEvent(event);">';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">岗哨范围</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" id="sentryControl" lay-verify="title" autocomplete="off" value="" class="layui-input">';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">岗哨类型</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title" id="sentryType" autocomplete="off" value="" class="layui-input">';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">专业等级</label>';
            str += '<div class="layui-input-block">';
            str += '<select name="interest" lay-filter="aihao" id="sentryLevel">';
            str += '<option value="一级" selected="">一级</option>';
            str += '<option value="二级">二级</option>';
            str += '<option value="三级">三级</option>';
            str += '</select></div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">特定人员</label>';
            str += '<div class="layui-input-block">';
            str += '<textarea value="" class="layui-textarea" id="sentryUser" readonly"></textarea>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">备注</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="comment" lay-verify="title"  id="sentryComment" autocomplete="off" value="" class="layui-input">';
            str += '</div></div></form>';

            formPopup(
                '编辑岗哨',
                str,
                '',
                {
                    btn1: '确定',
                    btn2: '取消'
                },
                function(obj) {
                    var gsList = $('#gsEditForm').serializeArray();
                    //console.log(gsList);
                    var patrolName = gsList[0].value;
                    var patorRange = gsList[2].value;
                    var patrolType = gsList[3].value;
                    var patrolLevel = gsList[4].value;
                    var patrolUser = $('#sentryUser').val();
                    var ids = idArr.join(',') || data.specialUser;
                    var patrolComment = $('#sentryComment').val();
                    var arrLL = $('#addressLngLat')
                        .val()
                        .split(',');

                    getRequest(
                        'airPortService/api/mobile/addBusGuardPosition',
                        'post',
                        {
                            positionId: id,
                            positionName: patrolName,
                            positionLongitude: arrLL[0],
                            positionLatitude: arrLL[1],
                            positionRange: patorRange,
                            positionType: patrolType,
                            userLevel: patrolLevel,
                            specialUser: ids,
                            comment: patrolComment
                        },
                        function(data) {
                            map.removeLayer(editMarker);
                            layer.msg('编辑成功！');
                            $('.sentryWrap').show();
                            obj.remove();
                            guardList();
                        }
                    );
                },
                function(obj) {
                    map.removeLayer(editMarker);
                    $('.sentryWrap').show();
                    obj.remove();
                    map.off('click');
                    guardList();
                },
                function() {
                    modifyData = {};
                    modifyData.userIds = data.specialUser;
                    modifyData.userNames = data.specialUserName;
                    $('#sentryName').val(data.positionName);
                    $('#addressLngLat').val([data.positionLongitude, data.positionLatitude]);
                    $('#addressLat').val(data.positionLatitude);
                    $('#sentryControl').val(data.positionRange);
                    $('#sentryType').val(data.positionType);
                    $('#sentryLevel').val(data.userLevel);
                    $('#sentryUser').val(data.specialUserName);
                    $('#sentryComment').val(data.comment);
                    $('#sentryUser').on('click', function() {
                        //弹出选择人员的弹框
                        var obj = {
                            userId: id
                        };
                        getUsersFn('airPortService/inter/sysUser?userId=' + userId, 'get', obj, submitBtnFn, modifyData);
                    });
                },
                {
                    left: 0,
                    top: 1
                }
            );
            form.render();
        }
    );
}

//删除岗哨
function deleteGs(obj) {
    var delId = $(obj)
        .parent()
        .parent()
        .attr('id');
    layer.msg('确定删除吗？', {
        time: 0, //不自动关闭
        btn: ['确定', '取消'],
        yes: function(index) {
            layer.close(index);
            getRequest(
                'airPortService/api/mobile/delBusGuardPosition',
                'post',
                {
                    positionId: delId
                },
                function(data) {
                    layer.msg('删除成功！');
                    guardList();
                }
            );
        }
    });
}

//tab切换
$('.titles span').on('click', function(e) {
    var idNow = $(e.target).attr('id');
    if (idNow == 'gs') {
        $('.content1').show();
        $('.content2').hide();
        markerGuards.addTo(map);
    } else {
        $('.content2').show();
        $('.content1').hide();
        map.removeLayer(markerGuards);
    }
    $(this)
        .addClass('title_active')
        .removeClass('title_color');
    $(this)
        .siblings()
        .removeClass('title_active')
        .addClass('title_color');
});

//选取路线
$('#choose').on('click', function() {
    var polyline = {
        name: '线',
        iconClass: 'mp_icon_line',
        type: 'polyline',
        style: {
            fill: true,
            color: '#0000ff',
            weight: 3
        }
    };
    drawTool.startDraw(polyline.type, polyline);
});
//选择人员
$('#choose2').on('click', function() {
    $('.choosePeople').show();
});

//取消
$('#cancel').on('click', function() {
    $('.choosePeople').hide();
});

//获取巡更列表
function patrolList() {
    getRequest('airPortService/api/mobile/busGuardTourList', 'post', {}, function(data) {
        //console.log(data);
        $('#xgList').html('');

        data.forEach(function(item, index) {
            var id = item.tourId;
            var liItem = '<li id=' + id + "><div onclick='infoXg(this);'><span>" + item.tourName + "</span><img class='more' src='./img/sentinel/more.png' /></div><div><img class='del' src='./img/sentinel/delete.png' onclick='deleteXg(this);'></div></li>";

            $('#xgList').append(liItem);
        });
    });
}

//新建巡更
$('.content2 .add').on('click', function(e) {
    $('.sentryWrap').hide();
    e.stopPropagation();
    // $('.xgPop input').val('');
    // $('.xgPop textarea').val('');
    var str = '';
    str += '<form class="layui-form" id="xgForm">';
    str += '<div class="layui-form-item">';
    str += '<label class="layui-form-label">名称</label>';
    str += '<div class="layui-input-block">';
    str += '<input type="text" name="title" lay-verify="title" id="patrolName" autocomplete="off" placeholder="请输入巡更名称" class="layui-input">';
    str += '</div></div>';
    str += '<div class="layui-form-item">';
    str += '<label class="layui-form-label">点位集合</label>';
    str += '<div class="layui-input-block">';
    str += '<input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请在地图上选择路线" class="layui-input" readonly onclick="xgLine();">';
    str += '</div></div>';
    str += '<div class="layui-form-item" style="display:none;">';
    str += '<label class="layui-form-label">巡更路线</label>';
    str += '<div class="layui-input-block">';
    str += '<input type="text" name="title" lay-verify="title" id="latlngs" autocomplete="off" placeholder="请在地图上选择路线" class="layui-input" readonly onclick="xgLine();">';
    str += '</div></div>';
    str += '<div class="layui-form-item">';
    str += '<label class="layui-form-label">巡更类型</label>';
    str += '<div class="layui-input-block">';
    str += '<input type="text" name="title" id="patrolType" lay-verify="title" autocomplete="off" placeholder="请输入巡更类型" class="layui-input">';
    str += '</div></div>';
    str += '<div class="layui-form-item">';
    str += '<label class="layui-form-label">专业等级</label>';
    str += '<div class="layui-input-block">';
    str += '<select name="interest" lay-filter="aihao" id="patrolLevel">';
    str += '<option value="一级" selected="">一级</option>';
    str += '<option value="二级">二级</option>';
    str += '<option value="三级">三级</option>';
    str += '</select></div></div>';
    str += '<div class="layui-form-item">';
    str += '<label class="layui-form-label">特定人员</label>';
    str += '<div class="layui-input-block">';
    str += '<input type="text" name="title" lay-verify="title" id="patrolUser" autocomplete="off" placeholder="请选择特定人员" class="layui-input" readonly onclick="choosePeoples2();">';
    str += '</div></div>';
    str += '<div class="layui-form-item">';
    str += '<label class="layui-form-label">描述</label>';
    str += '<div class="layui-input-block">';
    str += '<textarea placeholder="请输入内容" class="layui-textarea" id="patrolInfo"></textarea>';
    str += '</div></div></form>';

    formPopup(
        '添加巡更',
        str,
        '',
        {
            btn1: '确定',
            btn2: '取消'
        },
        function(obj) {
            var gsList = $('#xgForm').serializeArray();
            //console.log(gsList);
            var patrolName = gsList[0].value;
            var latlngs = gsList[2].value;
            var patrolType = gsList[3].value;
            var patrolLevel = gsList[4].value;
            var patrolUser = gsList[5].value;
            var ids = idArr.join(',');
            var patrolInfo = $('#patrolInfo').val();
            //console.log(patrolType, idArr.length);

            if (!patrolName) {
                layer.msg('请输入名称！');
                return false;
            }
            if (!latlngs) {
                layer.msg('请选择巡更路线！');
                return false;
            }
            if (!patrolType) {
                layer.msg('请输入巡更类型！');
                return false;
            }
            if (!ids) {
                layer.msg('请选择特定人员！');
                return false;
            }

            if (patrolName && latlngs && patrolType && ids) {
                getRequest(
                    'airPortService/api/mobile/addBusGuardTour',
                    'post',
                    {
                        tourName: patrolName,
                        tourPosition: latlngs,
                        tourType: patrolType,
                        userLevel: patrolLevel,
                        specialUser: ids,
                        comment: patrolInfo
                    },
                    function(data) {
                        map.removeLayer(gPoint);
                        drawTool.clearDraw();
                        layer.msg('新增成功!');
                        $('.sentryWrap').show();
                        patrolList();
                        //console.log(gPoint);
                    }
                );
                obj.remove();
            } else {
                layer.msg('请填写完整信息！');
            }
        },
        function(obj) {
            $('.sentryWrap').show();
            obj.remove();
            map.removeLayer(gPoint);
            drawTool.clearDraw();
        },
        null,
        {
            left: 0,
            top: 1.5
        }
    );
    form.render();
});

//巡更删除
function deleteXg(obj) {
    var delId = $(obj)
        .parent()
        .parent()
        .attr('id');
    layer.msg('确定删除吗？', {
        time: 0, //不自动关闭
        btn: ['确定', '取消'],
        yes: function(index) {
            layer.close(index);
            getRequest(
                'airPortService/api/mobile/delBusGuardTour',
                'post',
                {
                    tourId: delId
                },
                function(data) {
                    patrolList();
                }
            );
        }
    });
}
//巡更详情
function infoXg(obj) {
    $('.sentryWrap').hide();
    var infoId = $(obj)
        .parent()
        .attr('id');
    getRequest(
        'airPortService/api/mobile/getBusGuardTourDetail',
        'post',
        {
            tourId: infoId
        },
        function(data) {
            //console.log(data.tourPosition);
            var objPosition = JSON.parse(data.tourPosition);
            //console.log(objPosition);
            map.panTo([objPosition[0].positionLongitude, objPosition[0].positionLatitude]);
            var arrPosition = [];
            objPosition.forEach(function(item) {
                var arr = [item.positionLongitude, item.positionLatitude];
                arrPosition.push(arr);
            });
            var antPolyline = new L.Polyline(arrPosition, {
                color: 'red'
            });
            var layers = [];
            arrPosition.forEach(function(item, index) {
                var airMarker = L.marker([item[0], item[1]], {
                    icon: L.icon({
                        iconUrl: './img/sentinel/' + index + '.png',
                        iconSize: [40, 40]
                    })
                });
                layers.push(airMarker);
            });
            var mGroup = L.layerGroup(layers);
            map.addLayer(mGroup);
            map.addLayer(antPolyline);

            var str = '';
            str += '<form class="layui-form" id="xgForm">';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">名称</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title" id="patrolName" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item" style="display:none;">';
            str += '<label class="layui-form-label">点位集合</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title" id="latlngs" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">巡更类型</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" id="patrolType" lay-verify="title" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">专业等级</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" id="patrolLevel" lay-verify="title" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">特定人员</label>';
            str += '<div class="layui-input-block">';
            str += '<input type="text" name="title" lay-verify="title" id="patrolUser" autocomplete="off" value="" class="layui-input" readonly>';
            str += '</div></div>';
            str += '<div class="layui-form-item">';
            str += '<label class="layui-form-label">描述</label>';
            str += '<div class="layui-input-block">';
            str += ' <textarea placeholder="请输入内容" class="layui-textarea" id="patrolInfo" readonly>${data.comment}</textarea>';
            str += '</div></div></form>';

            formPopup(
                '巡更详情',
                str,
                '',
                {
                    btn1: '确定',
                    btn2: '取消'
                },
                function(obj) {
                    drawTool.clearDraw();
                    obj.remove();
                    map.removeLayer(antPolyline);
                    map.removeLayer(mGroup);
                    $('.sentryWrap').show();
                },
                function(obj) {
                    drawTool.clearDraw();
                    obj.remove();
                    map.removeLayer(antPolyline);
                    map.removeLayer(mGroup);
                    $('.sentryWrap').show();
                },
                function() {
                    $('#patrolName').val(data.tourName);
                    //$('#latlngs').val(data.tourPosition);
                    $('#patrolType').val(data.tourType + '人');
                    $('#patrolLevel').val(data.userLevel);
                    $('#patrolUser').val(data.specialUserName);
                    $('#patrolInfo').val(data.comment);
                },
                {
                    left: 0,
                    top: 1.5
                }
            );
            //$("#latlngs").val(data.tourPosition);
        }
    );
}
