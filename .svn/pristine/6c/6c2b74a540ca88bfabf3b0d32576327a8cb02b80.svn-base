var num = 0;
var momentTime_front = '';
var momentTime_rear = '';
var timeRangeArr = []; // return数组初始化
var startTimes = 0; //开始时间
var endTimes = 0; //结束时间
var timeGap = 0; //间隔毫秒数
var breakFirstDate = 0; //开始休息时间
var breakEndDate = 0; //结束休息时间
var amount = 0; //次数

function timeRangeFn(startTimes, endTimes, timeSlot, breakFirst, breakEnd) {
    startTimes = new Date(startTimes).getTime(); // 计算开始时间的时间戳
    endTimes = new Date(endTimes).getTime(); // 计算结束时间的时间戳
    timeGap = getMillisecond(timeSlot);
    breakFirstDate = new Date(breakFirst).getTime(); // 计算休息开始时间戳
    breakEndDate = new Date(breakEnd).getTime(); // 计算休息结束时间戳

    var timeAll = endTimes - startTimes - (breakEndDate - breakFirstDate); // 总时间间隔
    if (endTimes <= startTimes) {
        layer.msg('结束时间不能小于开始时间！');
        return false;
    }
    amount = Math.ceil(timeAll / timeGap); // 分割后时间间隔
    timeRangeArr = [];
    for (var i = 0; i < amount; i++) {
        momentTime_front = startTimes + timeGap * i;
        momentTime_rear = startTimes + timeGap * (i + 1);
        timeRangeArr.push({ startTime: addDatetime(momentTime_front), endTime: addDatetime(momentTime_rear) });
        //上一个排版的结束时间大于休息的开始时间，并且排版的开始时间小于休息时间的开始
        if (momentTime_rear >= breakFirstDate && momentTime_front <= breakFirstDate) {
            num = amount - (i + 1);
            // if (momentTime_rear > breakEndDate) {
            // otherTest();
            // } else {
            test();
            // }
            break;
        }
    }
    setShowList(timeRangeArr);
}

function test() {
    for (var i = 0; i < num; i++) {
        momentTime_front = addDatetime(breakEndDate + timeGap * i);
        momentTime_rear = addDatetime(breakEndDate + timeGap * (i + 1));
        timeRangeArr.push({ startTime: momentTime_front, endTime: momentTime_rear });
    }
}

function otherTest() {
    alert(2);
}

function noIntervalFn(startTimes, endTimes, timeSlot) {
    startTimes = new Date(startTimes).getTime(); // 计算开始时间的时间戳
    endTimes = new Date(endTimes).getTime(); // 计算结束时间的时间戳
    timeGap = getMillisecond(timeSlot);

    var timeAll = endTimes - startTimes; // 总时间间隔
    if (endTimes <= startTimes) {
        layer.msg('结束时间不能小于开始时间！');
        return false;
    }
    amount = Math.ceil(timeAll / timeGap); // 分割后时间间隔
    timeRangeArr = [];
    for (var i = 0; i < amount; i++) {
        momentTime_front = startTimes + timeGap * i;
        momentTime_rear = startTimes + timeGap * (i + 1);
        timeRangeArr.push({ startTime: addDatetime(momentTime_front), endTime: addDatetime(momentTime_rear) });
    }
    setShowList(timeRangeArr);
}

function getMillisecond(time) {
    var s = '';

    var hour = time.split(':')[0];
    var min = time.split(':')[1];
    var sec = time.split(':')[2];

    s = (Number(hour * 3600) + Number(min * 60) + Number(sec)) * 1000;

    return s;
}

function addDatetime(dt) {
    //时间戳转换日期格式，我这边的格式是 "2017-10-05 01：02：56",需要补零
    dt = new Date(dt);
    var dataTime_str = '';

    var Year = dt.getFullYear();
    dataTime_str += Year + '-'; //存入年

    var mon = parseInt(dt.getMonth()) + 1;
    dataTime_str += (mon < 10 ? '0' + mon : mon) + '-'; //存入月  .getMonth()函数从0月开始算，正确日期应该+1

    var day = dt.getDate();
    dataTime_str += (day < 10 ? '0' + day : day) + ' '; //存入日

    var hh_ = dt.getHours();
    dataTime_str += (hh_ < 10 ? '0' + hh_ : hh_) + ':'; //存入时

    var mm_ = dt.getMinutes();
    dataTime_str += (mm_ < 10 ? '0' + mm_ : mm_) + ':'; //存入分

    var ss_ = dt.getSeconds();
    dataTime_str += ss_ < 10 ? '0' + ss_ : ss_; //存入秒

    return dataTime_str;
}
