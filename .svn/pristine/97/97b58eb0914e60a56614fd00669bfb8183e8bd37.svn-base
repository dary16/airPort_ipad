var map;
var markers = [];
var infos = [];
var sipNum;
var markerArr = [];
var selectedValue; //电子围栏类型
var groupId; //组id
var deptId = ''; //组织id
var groupName;
var sipArr = [];
// var userId = '5000';
var newGroupName; //新建组名
var pttChoose;
var sipUser;
var polygonId;
var wlGroup;
var typeGgoup = ''; //分层组类型
var markers1 = []; //组1
var markers2 = []; //组2
var drawType = ''; //判断所绘制类型
var orgIds = [];
var allOrg = [];
var userId;
var userMarkerLon;
var userMarkerLat;
var EARTH_RADIUS = 2000;
var globalCenter = [];
var personShow = 'show';
var carShow = 'show';
var allLayer;
var checkLeft = true;
var checkPeople;
var checkCar;
var checkRight = true;
var markerLine;
var org1, org2, org3, org4, org5, org6, org7, org8, org9, org10;
//定义不同的图标
var peopleIcon = L.icon({
    iconUrl: './img/index/people.png',
    iconSize: [50, 50]
});
var carIcon = L.icon({
    iconUrl: './img/index/car.png',
    iconSize: [50, 50]
});
var commonIcon;

$(document).ready(function() {
    setTimeout(function() {
        pantoMap();
    }, 3000);

    setInterval(function() {
        getList();
    }, 10000);
    //getGroupList(); //组列表
    organizeList(); //部门列表
});
$(function() {
    form.render();
    form.on('checkbox(all)', function(data) {
        if (data.elem.checked) {
            checkLeft = true;
            personShow = 'show';
            carShow = 'show';
            getList();
            $('#leftCheck .layui-form-checkbox').addClass('layui-form-checked');
        } else {
            checkLeft = false;
            $('#leftCheck .layui-form-checkbox').removeClass('layui-form-checked');
            personShow = 'hide';
            carShow = 'hide';
            getList();
        }
    });
    form.on('checkbox(car)', function(data) {
        if (data.elem.checked) {
            checkCar = true;
            carShow = 'show';
            if ($('#leftCheck .layui-form-checked').length == 2) {
                $('#leftCheck .layui-form-checkbox')
                    .first()
                    .addClass('layui-form-checked');
            }
        } else {
            checkCar = false;
            checkLeft = false;
            carShow = 'hide';
            $('#leftCheck .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
        }
        getList();
    });
    form.on('checkbox(people)', function(data) {
        if (data.elem.checked) {
            checkPeople = true;
            personShow = 'show';
            if ($('#leftCheck .layui-form-checked').length == 2) {
                $('#leftCheck .layui-form-checkbox')
                    .first()
                    .addClass('layui-form-checked');
            }
        } else {
            checkPeople = false;
            checkLeft = false;
            personShow = 'hide';
            $('#leftCheck .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
        }
        getList();
    });
    //右边全选
    form.on('checkbox(right)', function(data) {
        if (data.elem.checked) {
            checkRight = true;
            deptId = allOrg.join(',');
            // deptId = orgIds.join(',');
            $('#org .layui-form-checkbox').addClass('layui-form-checked');
            getList();
            //console.log(data.elem.id);
        } else {
            checkRight = false;
            orgIds = [];
            deptId = '';
            $('#org .layui-form-checkbox').removeClass('layui-form-checked');
            getList();
        }
    });
    form.on('checkbox(org1)', function(data) {
        if (data.elem.checked) {
            org1 = true;
            if ($('#org .layui-form-checked').length == allOrg.length) {
                $('#org .layui-form-checkbox')
                    .first()
                    .addClass('layui-form-checked');
            }
            orgIds.push(data.elem.id);
            deptId = orgIds.join(',');
            getList();
            //console.log(data.elem.id);
        } else {
            org1 = false;
            checkRight = false;
            $('#org .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
            orgIds.remove(data.elem.id);
            deptId = orgIds.join(',');
            getList();
        }
    });
    form.on('checkbox(org2)', function(data) {
        if (data.elem.checked) {
            org2 = true;
            if ($('#org .layui-form-checked').length == allOrg.length) {
                $('#org .layui-form-checkbox')
                    .first()
                    .addClass('layui-form-checked');
            }
            orgIds.push(data.elem.id);
            deptId = orgIds.join(',');
            getList();
            //console.log(data.elem.id);
        } else {
            org2 = false;
            checkRight = false;
            $('#org .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
            orgIds.remove(data.elem.id);
            deptId = orgIds.join(',');
            getList();
        }
    });
    form.on('checkbox(org3)', function(data) {
        if (data.elem.checked) {
            org3 = true;
            if ($('#org .layui-form-checked').length == allOrg.length) {
                $('#org .layui-form-checkbox')
                    .first()
                    .addClass('layui-form-checked');
            }
            orgIds.push(data.elem.id);
            deptId = orgIds.join(',');
            getList();
            //console.log(data.elem.id);
        } else {
            org3 = false;
            checkRight = false;
            $('#org .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
            orgIds.remove(data.elem.id);
            deptId = orgIds.join(',');
            getList();
        }
    });
    form.on('checkbox(org4)', function(data) {
        if (data.elem.checked) {
            org4 = true;
            orgIds.push(data.elem.id);
            deptId = orgIds.join(',');
            getList();
            //console.log(data.elem.id);
        } else {
            org4 = false;
            checkRight = false;
            $('#org .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
            orgIds.remove(data.elem.id);
            deptId = orgIds.join(',');
            getList();
        }
    });
    form.on('checkbox(org5)', function(data) {
        if (data.elem.checked) {
            org5 = true;
            orgIds.push(data.elem.id);
            deptId = orgIds.join(',');
            getList();
            //console.log(data.elem.id);
        } else {
            org5 = false;
            checkRight = false;
            $('#org .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
            orgIds.remove(data.elem.id);
            deptId = orgIds.join(',');
            getList();
        }
    });
    form.on('checkbox(org6)', function(data) {
        if (data.elem.checked) {
            org6 = true;
            orgIds.push(data.elem.id);
            deptId = orgIds.join(',');
            getList();
            //console.log(data.elem.id);
        } else {
            org6 = false;
            checkRight = false;
            $('#org .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
            orgIds.remove(data.elem.id);
            deptId = orgIds.join(',');
            getList();
        }
    });
    form.on('checkbox(org7)', function(data) {
        if (data.elem.checked) {
            org7 = true;
            orgIds.push(data.elem.id);
            deptId = orgIds.join(',');
            getList();
            //console.log(data.elem.id);
        } else {
            org7 = false;
            checkRight = false;
            $('#org .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
            orgIds.remove(data.elem.id);
            deptId = orgIds.join(',');
            getList();
        }
    });
    form.on('checkbox(org8)', function(data) {
        if (data.elem.checked) {
            org8 = true;
            orgIds.push(data.elem.id);
            deptId = orgIds.join(',');
            getList();
            //console.log(data.elem.id);
        } else {
            org8 = false;
            checkRight = false;
            $('#org .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
            orgIds.remove(data.elem.id);
            deptId = orgIds.join(',');
            getList();
        }
    });
    form.on('checkbox(org9)', function(data) {
        if (data.elem.checked) {
            org9 = true;
            orgIds.push(data.elem.id);
            deptId = orgIds.join(',');
            getList();
            //console.log(data.elem.id);
        } else {
            org9 = false;
            checkRight = false;
            $('#org .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
            orgIds.remove(data.elem.id);
            deptId = orgIds.join(',');
            getList();
        }
    });
    form.on('checkbox(org10)', function(data) {
        if (data.elem.checked) {
            org10 = true;
            orgIds.push(data.elem.id);
            deptId = orgIds.join(',');
            getList();
            //console.log(data.elem.id);
        } else {
            org10 = false;
            checkRight = false;
            $('#org .layui-form-checkbox')
                .first()
                .removeClass('layui-form-checked');
            orgIds.remove(data.elem.id);
            deptId = orgIds.join(',');
            getList();
        }
    });
    form.on('switch(box)', function(data) {
        if (data.elem.checked) {
            //console.log("checked");
            var layers = [];
            getRequest(
                'airPortService/busElectronicFence/listFence',
                'post', {
                    userId: userId,
                    fence_type: ''
                },
                function(data) {
                    //console.log(data, 'data');
                    data.rows.forEach(function(item) {
                        var newPoint = PointsTo(item.fence_points);
                        //console.log(newPoint);
                        //one为每一组坐标点
                        var one = JSON.parse(newPoint);
                        var polygon = L.polygon(one[0], {
                            color: 'red',
                            id: item.id
                        });
                        var popTitle = 'title:' + item.fence_name;

                        polygon.bindPopup(popTitle);
                        polygon.bindContextMenu({
                            contextmenu: true,
                            contextmenuInheritItems: false,
                            contextmenuItems: [{
                                text: '删除',
                                iconCls: 'fa fa-trash',
                                context: layer,
                                callback: function(e) {
                                    //alert(polygon.options.id);
                                    polygonId = polygon.options.id;
                                    var layer = this;
                                    polygon.remove();
                                    layer.msg('删除了');
                                    getPlanListFn();
                                    delElectronicFence();
                                }
                            }]
                        });
                        layers.push(polygon);
                    });
                    wlGroup = L.layerGroup(layers);
                    map.addLayer(wlGroup);
                    aga = true;
                }
            );
        } else {
            map.removeLayer(wlGroup);
        }
    });
    $('.tuceng').on('click', function(index) {
        if (checkLeft) {
            $('#leftCheck .layui-form-checkbox').addClass('layui-form-checked');
        } else if (checkCar) {
            $('#leftCheck .layui-form-checkbox').eq(1).addClass('layui-form-checked');
        } else if (checkPeople) {
            $('#leftCheck .layui-form-checkbox').eq(2).addClass('layui-form-checked');
        }
        if (checkRight) {
            $('#org .layui-form-checkbox').addClass('layui-form-checked');
        } else if (org1) {
            $('#leftCheck .layui-form-checkbox').eq(1).addClass('layui-form-checked');
        } else if (org2) {
            $('#leftCheck .layui-form-checkbox').eq(2).addClass('layui-form-checked');
        } else if (org3) {
            $('#leftCheck .layui-form-checkbox').eq(3).addClass('layui-form-checked');
        } else if (org4) {
            $('#leftCheck .layui-form-checkbox').eq(4).addClass('layui-form-checked');
        } else if (org5) {
            $('#leftCheck .layui-form-checkbox').eq(5).addClass('layui-form-checked');
        } else if (org6) {
            $('#leftCheck .layui-form-checkbox').eq(6).addClass('layui-form-checked');
        } else if (org7) {
            $('#leftCheck .layui-form-checkbox').eq(7).addClass('layui-form-checked');
        } else if (org8) {
            $('#leftCheck .layui-form-checkbox').eq(8).addClass('layui-form-checked');
        } else if (org9) {
            $('#leftCheck .layui-form-checkbox').eq(9).addClass('layui-form-checked');
        } else if (org10) {
            $('#leftCheck .layui-form-checkbox').eq(10).addClass('layui-form-checked');
        }
        layer.open({
            type: 1,
            title: ['选择图层', 'text-align:center;font-size:0.36rem;'],
            area: ['9.07rem'],
            skin: 'layui-layer-molv',
            closeBtn: 1,
            shade: 0,
            content: $('#chooseLayer')
        });
    });

    function showFence() {
        getPlanListFn();
        layer.open({
            type: 1,
            title: ['电子围栏', 'text-align:center;font-size:0.36rem;'],
            area: ['10.82rem', '6.8rem'],
            skin: 'layui-layer-molv',
            closeBtn: 1,
            shade: 0,
            content: $('#electricFence')
        });
    }
    $('.weilan').on('click', function() {
        showFence();
    });
    //触发天气
    $('.weather').on('click', function() {
        getWeatherList();
        layer.open({
            type: 1,
            title: ['天气', 'text-align:center;font-size:0.36rem;'],
            area: ['10.82rem', '6.8rem'],
            skin: 'layui-layer-molv',
            closeBtn: 1,
            shade: 0,
            content: $('#weatherList')
        });
    });
    //切换附近距离
    $('input:radio[name="inlineRadioOptions"]').change(function() {
        if ($('#inlineRadio1').is(':checked')) {
            EARTH_RADIUS = 500;
        }
        if ($('#inlineRadio2').is(':checked')) {
            EARTH_RADIUS = 1000;
        }
        if ($('#inlineRadio3').is(':checked')) {
            EARTH_RADIUS = 2000;
        }
    });
});
var flag = false;

//获取 GPS点相关信息
function getList() {
    if (allLayer) {
        map.removeLayer(allLayer);
    }
    typeGgoup = '';
    getRequest(
        'airPortService/inter/gps',
        'post', {
            userId: userId,
            deptId: deptId,
            personShow: personShow,
            carShow: carShow
        },
        function(data) {
            var pointData = data.gpsData;
            var airMarker;
            markers1 = [];
            markers2 = [];
            markers = [];
            //console.log(markers, 'markers');
            pointData.forEach(function(item, index) {
                if (userId == item.user) {
                    userMarkerLon = item.lat;
                    userMarkerLat = item.lon;
                }
                var peopleContent = 'sip号：' + item.user + '<br>用户名:' + item.obj.userName + '<br>类型：' + item.type + '<br>纬度：' + item.lat + '<br>经度：' + item.lon + '<br><button type="button" class="btn btn-primary" id="' + item.user + '"' + 'onclick=\'guiji(this,"' + item.type + '")\'>查看轨迹</button>';
                var carContent = 'sip号：' + item.user + '<br>名称：' + item.obj.carName + '<br>类型：' + item.type + '<br>纬度：' + item.lat + '<br>经度：' + item.lon + '<br><button type="button" class="btn btn-primary" id="' + item.user + '"' + 'onclick=\'guiji(this,"' + item.type + '")\'>查看轨迹</button>';

                if (item.type == 'car') {
                    commonIcon = carIcon;
                    airMarker = L.marker(L.latLng(item.lat, item.lon), {
                        title: '汽车',
                        icon: commonIcon
                    });
                    markers1.push(airMarker);
                    //markers.push(airMarker);
                    airMarker.bindPopup(carContent).openPopup();
                } else if (item.type == 'ugps') {
                    commonIcon = peopleIcon;
                    var airMarker = L.marker(L.latLng(item.lat, item.lon), {
                        title: '人员',
                        icon: commonIcon
                    });
                    markers2.push(airMarker);
                    // markers.push(airMarker2);
                    airMarker.bindPopup(peopleContent).openPopup();
                }
                //设置标注的自定义属性值
                Object.defineProperties(airMarker, {
                    sip: {
                        value: item.user
                    },
                    lon: {
                        value: item.lon
                    },
                    lat: {
                        value: item.lat
                    },
                    id: {
                        value: index + 1
                    },
                    type: {
                        value: item.type
                    }
                });

                //airMarker.on('click', MarkerClickEvent);
                markers.push(airMarker);
            });
            if (markers.length != 0) {
                allLayer = L.layerGroup(markers);
                allLayer.addTo(map);
            }

        }
    );
}

//查看轨迹
function guiji(obj, type) {
    var objName = $(obj);
    objSip = objName.attr('id');
    var newlatlngs = [];
    getRequest(
        'airPortService/inter/trajectoryBack',
        'post', {
            startTime: '',
            endTime: '',
            sip: objSip,
            type: type
        },
        function(data) {
            data.forEach(function(item) {
                newlatlngs.push([item.lat, item.lon]);
            });
            if (newlatlngs.length == 0) {
                layer.msg("暂无数据！");
            }
            markerLine = L.Marker.movingMarker(newlatlngs, [2000, 2000, 2000, 2000, 2000], {
                autostart: true,
                icon: commonIcon
            }).addTo(map);
            var liner = L.polyline(newlatlngs, {
                color: 'red'
            }).addTo(map);
            markerLine.on('end', function() {
                layer.msg('轨迹回放完成');
                newlatlngs = [];
                map.removeLayer(markerLine);
                map.removeLayer(liner);
            });
        }
    );
}

function pantoMap() {
    if (userMarkerLon) {
        map.panTo([userMarkerLon, userMarkerLat]);
    }
}

var orgName = [];
//组织列表
function organizeList() {
    getRequest('airPortService/api/web/sysOrg?userId=' + userId, 'get', {}, function(data) {
        var zNodes = JSON.parse(data.treeData);
        //console.log(data.treeData);
        zNodes.forEach(function(item) {
            //console.log(item.children);
            var orgList = '';
            item.children.forEach(function(item, index) {
                orgList += "<input type='checkbox' lay-skin='primary' id='" + item.id + "' title='" + item.label + "'lay-filter=org" + (index + 1) + '>';
                orgIds.push(item.id);
                allOrg.push(item.id);
            });
            deptId = orgIds.join(',');
            $('#org').append(orgList);
            form.render();
        });
        getList();
    });
}

function PointsTo(polygonPoints) {
    var shuzu = JSON.parse(polygonPoints);
    shuzu = shuzu[0];
    var xinshuzu = new Array();
    for (var i = 0; i < shuzu.length; i++) {
        var point = shuzu[i].join(',').split(',');
        var str = '[' + point[1] + ',' + point[0] + ']';
        xinshuzu.push(str);
    }
    return '[[' + xinshuzu.toString() + ']]';
}

//获取 天气相关信息
function getWeatherList() {
    $('#weatherList').html('');
    getRequest('airPortService/busWeather/list', 'post', {}, function(data) {
        var weatherData = data.rows;
        weatherData.forEach(function(item) {
            var ulList = '';
            ulList += '<ul><li> 标题：';
            ulList += item.title;
            ulList += '</li><li> 内容：';
            ulList += item.comment;
            ulList += '</li><li> 温度：';
            ulList += item.temperature;
            ulList += '</li><li> 天气：';
            ulList += item.weather;
            ulList += '</li><li> 风向：';
            ulList += item.windDirection;
            ulList += '</li><li> 风力：';
            ulList += item.windPower;
            ulList += '</li><li> 云量：';
            ulList += item.cloudAmount;
            ulList += '</li><li> 时间段：';
            ulList += item.timestemp;

            $('#weatherList').append(ulList);
        });
    });
}

//删除围栏
function delElectronicFence() {
    getRequest(
        'airPortService/busElectronicFence/delete',
        'post', {
            userId: userId,
            id: polygonId
        },
        function(data) {
            //console.log(data);
        }
    );
}

//创建组
function createGroup() {
    getRequest(
        'airPortService/systemPpt/add',
        'post', {
            userId: userId,
            ptt_recording: pttChoose,
            ptt_name: newGroupName,
            ptt_type: '临时组',
            ptt_member: sipUser
        },
        function(data) {
            //getGroupList();
        }
    );
}

//圈选
$('#polygon').click(function() {
    var polygon = {
        name: '矩形',
        iconClass: 'mp_icon_rect',
        type: 'rectangle',
        style: {
            fill: true,
            color: '#0000ff',
            weight: 3
        }
    };
    drawTool.startDraw(polygon.type, polygon);
});
//附近
$('#nearby').click(function() {
    map.on('click', function(e) {
        var center = [];
        center.push(e.latlng.lat.toFixed(5), e.latlng.lng.toFixed(5));
        globalCenter.push(e.latlng.lat.toFixed(5), e.latlng.lng.toFixed(5));

        L.circle(center, EARTH_RADIUS, {
            color: 'transparent', //颜色
            fillColor: '#f03',
            fillOpacity: 0 //透明度
        }).addTo(map);
        var circleIn = [];
        markers.forEach(function(item) {
            var pointIn = L.latLng(center).distanceTo([item.lat, item.lon]);
            if (pointIn < EARTH_RADIUS) {
                var distanceIn = Math.round(L.latLng(center).distanceTo([item.lat, item.lon]));

                circleIn.push({
                    distance: distanceIn,
                    sip: item.sip,
                    type: item.type
                });
            } else {
                return false;
            }
        });
        if (circleIn.length == 0) {
            return false;
        } else {
            getRequest(
                'airPortService/inter/nearbyUser',
                'post', {
                    sip: userId,
                    data: circleIn
                },
                function(data) {
                    $('.infoList').html();
                    var nearType;
                    var html = '';
                    data.forEach(function(item) {
                        if (item.type == 'ugps') {
                            nearType = '人员';
                        } else if (item.type == 'car') {
                            nearType = '车辆';
                        }
                        var equip = [];
                        item.budingList.forEach(function(item) {
                            equip.push(item.equipName);
                        });
                        html += '<li><span>' + '姓名：' + item.name + '</span>' + '<span>' + '连队：' + item.orgName + '</span>' + '<span>' + '类型：' + nearType + '</span>' + '<span>' + '距离点：' + item.distance + '米' + '</span>' + '<span>' + '装备：' + equip.join(',') + '</span></li>';
                    });
                    $('.infoList').html(html);
                    $('.nearby').show();
                }
            );
        }
    });
});

//关闭
$('.offPop').click(function() {
    $('.nearby').hide();
    map.off('click');
});
//地图相关
$('#addEleCircle').click(function() {
    layer.closeAll();
    drawType = 'eleType';
    var polygon = {
        name: '面',
        iconClass: 'mp_icon_area',
        type: 'polygon',
        style: {
            fill: true,
            color: '#0000ff',
            weight: 3
        }
    };
    drawTool.startDraw(polygon.type, polygon);
});
$('#clear').click(function() {
    drawTool.clearDraw();
});

function rep(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i]) == i) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

//相交查询通用方法
function Intersect(checkPoint, polygonPoints) {
    var counter = 0;
    var i;
    var xinters;
    var p1, p2;
    $.each(polygonPoints, function(i, points) {
        var pointCount = points.length;
        p1 = points[0];

        for (i = 1; i <= pointCount; i++) {
            p2 = points[i % pointCount];
            if (checkPoint[0] > Math.min(p1[0], p2[0]) && checkPoint[0] <= Math.max(p1[0], p2[0])) {
                if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
                    if (p1[0] != p2[0]) {
                        xinters = ((checkPoint[0] - p1[0]) * (p2[1] - p1[1])) / (p2[0] - p1[0]) + p1[1];
                        if (p1[1] == p2[1] || checkPoint[1] <= xinters) {
                            counter++;
                        }
                    }
                }
            }
            p1 = p2;
        }
    });

    if (counter % 2 == 0) {
        return false;
    } else {
        return true;
    }
}

//其它
//触发 传参
$('#audio').on('click', function() {
    window.location.href = 'app://audioCall?sipNum=' + sipNum;
});

$('#video').on('click', function() {
    window.location.href = 'app://videoCall?sipNum=' + sipNum;
});

//新建路线
$('#drawLine').on('click', function() {
    drawType = 'lineType';
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

function pointInCircle(point, center) {
    return L.latlng(point).distanceTo(center);
}

//标注的点击事件
function MarkerClickEvent(e) {
    sipNum = e.target.sip;
    //alert(sipNum);
}

//地图点击显示坐标
function mapClick() {
    map.on('click', function(e) {
        console.log(e.latlng.lat.toFixed(5), e.latlng.lng.toFixed(5));
    });
}
//触发平移事件
$('#panToCenter').on('click', function() {
    map.on('click', function(e) {
        map.panTo([e.latlng.lat.toFixed(5), e.latlng.lng.toFixed(5)]);
    });
});
//关闭点击事件
$('#offClickEvent').on('click', function() {
    map.off('click');
});
//数组移除
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};