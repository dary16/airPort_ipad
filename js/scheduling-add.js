var startTimeVal, endTimeVal, timeRangeVal, startRestTimeVal, endRestTimeVal;
var positionOrTour = [];
var planData = [];
var postionId = ''; //排班岗位id
$(function() {
    //时间选择
    getDateFn();
    //获取岗位
    getStationFn();

    $('#createPlan').on('click', function() {
        if (!startTimeVal) {
            layer.msg('请选择开始时间！');
            return false;
        }
        if (!endTimeVal) {
            layer.msg('请选择结束时间！');
            return false;
        }
        if (!postionId) {
            layer.msg('请选择岗哨！');
            return false;
        }
        if (!startRestTimeVal && endRestTimeVal) {
            layer.msg('请选择开始休息时间！');
            return false;
        }
        if (!endRestTimeVal && startRestTimeVal) {
            layer.msg('请选择结束休息时间！');
            return false;
        }
        if (!timeRangeVal) {
            layer.msg('请选择每岗时长！');
            return false;
        }
        //自动生成排班时间
        autoScheduling();
    });
    $('#submitPlan').on('click', function() {
        if (planData.length != 0) {
            planData.forEach(function(item) {
                item.userId = getLoc('userId');
                item.timeRange = timeRangeVal;
                item.postionId = postionId;
            });
            getRequest('airPortService/api/mobile/addBusPositionArrange', 'post', planData, function(data) {
                layer.msg('排班成功！');
                window.location.href = 'scheduling.html';
            });
        } else {
            layer.msg('请选选择时间生成排班！');
        }
    });
});

//获取岗位，选择岗位
function getStationFn() {
    var html = '';
    getRequest('airPortService/api/mobile/selectPositionOrTour', 'post', {}, function(data) {
        data.positionList.forEach(function(item) {
            html += '<option value="' + item.positionId + '">' + item.positionName + '</option>';
        });
        data.tourList.forEach(function(item) {
            html += '<option value="' + item.tourId + '">' + item.tourName + '</option>';
        });
        positionOrTour = data.positionList.concat(data.tourList);
        $('#stationList').append(html);
        form.render('select');
        //选择岗位，显示几人岗
        form.on('select(stationList)', function(data) {
            if (data.value) {
                positionOrTour.forEach(function(item) {
                    if (item.positionId == data.value || item.tourId == data.value) {
                        $('#positionType span').html(item.positionType || item.tourType);
                    }
                });
            } else {
                $('#positionType span').html(0);
            }
            postionId = $('#stationList').val();
        });
    });
}

//自动生成排班时间
function autoScheduling() {
    getRequest(
        'airPortService/api/mobile/lastAvialableUserArrangeTime',
        'post',
        {
            postionId: postionId
        },
        function(data) {
            if (new Date(data).getTime() > new Date(startTimeVal).getTime()) {
                layer.msg('请选择' + data + '以后的时间排班！');
                return false;
            }
            //自动生成时间段
            if (startRestTimeVal && endRestTimeVal) {
                timeRangeFn(startTimeVal, endTimeVal, timeRangeVal, startRestTimeVal, endRestTimeVal);
            } else {
                noIntervalFn(startTimeVal, endTimeVal, timeRangeVal);
            }

            // timeRangeFn('2019-01-16 00:00:00', '2019-01-18 00:00:00', '06:00:00', '2019-01-17 00:00:00', '2019-01-17 07:00:00');
        }
    );
}

//排班时间
function setShowList(timeRangeArr) {
    var userLevel, specialUser;
    positionOrTour.forEach(function(item) {
        if (item.positionId == postionId || item.tourId == postionId) {
            userLevel = item.userLevel;
            specialUser = item.specialUser || '';
        }
    });
    var obj = {
        postionId: postionId,
        userLevel: userLevel,
        specialUser: specialUser,
        startTime: startTimeVal,
        endTime: endTimeVal,
        times: timeRangeArr
    };
    var load = layer.load(0);
    getRequest('airPortService/api/mobile/assignedArrangeList', 'post', obj, function(data) {
        layer.close(load);
        if (data == '人员不够') {
            layer.msg('人员不够！');
        } else {
            planData = JSON.parse(JSON.stringify(data));
            data.forEach(function(item) {
                item.startHour = item.startTime.slice(11);
                item.endHour = item.endTime.slice(11);
                item.startTime = item.startTime.slice(0, 10);
                item.endTime = item.endTime.slice(0, 10);
            });
            var showDataArr = mapLoction(data);
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
                    html += '</div>';
                });
                showHtml += '<div class="listShow">';
                showHtml += '<div class="title">';
                showHtml += '<img src="img/calendar.png" /> ' + item.startTime + '</div>';
                showHtml += '<div class="list clearfix">' + html + '</div>';
                showHtml += '</div>';
            });
            $('#timeUserList').html(showHtml);
        }
    });
}

function getDateFn() {
    var arr = [
        {
            id: 'startTime',
            type: 'datetime'
        },
        {
            id: 'endTime',
            type: 'datetime'
        },
        {
            id: 'timeRange',
            type: 'time'
        },
        {
            id: 'startRestTime',
            type: 'datetime'
        },
        {
            id: 'endRestTime',
            type: 'datetime'
        }
    ];
    arr.forEach(function(item) {
        laydate.render({
            elem: '#' + item.id,
            type: item.type,
            done: function(value, date, endDate) {
                window[item.id + 'Val'] = value;
            }
        });
    });
}
