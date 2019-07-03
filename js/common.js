config = {
    // host: 'http://192.168.0.145/'
    // host: 'http://192.168.0.108:8080/'
    // host: 'http://47.94.165.211:88/'
    host: 'http://192.168.0.100:81/'
};
var userId;
//查看详情页面
var isEdit, isView;
//layui layer弹框,form表单,laydate日历,table表格 laypage分页
var layer, form, laydate, table, laypage;
$(function() {
    // userId = '1011';
    if (getParam('userId')) {
        setLoc('userId', getParam('userId'));
    }
    var _root = document.documentElement,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
        resizeCallback = function() {
            _root.style.fontSize = parseInt(_root.clientWidth / 19.2) + 'px';
            document.body && (document.body.style.fontSize = 0.16 + 'rem');
        };

    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', resizeCallback, false);
        resizeCallback();
        window.addEventListener(resizeEvent, resizeCallback, false);
    }
    layuiFn();
    //返回上一级
    $('#comBack').on('click', function() {
        window.history.back(-1);
    });
    //返回APP
    $('#backApp').on('click', function() {
        window.location.href = 'app://finish';
    });
    var placeholderArr = [];
    $('input').each(function(i, v) {
        placeholderArr.push($(v).attr('placeholder'));
        $(v).on('focus', function() {
            $(this).attr('placeholder', '');
        });
        $(v).on('blur', function() {
            $(this).attr('placeholder', placeholderArr[i]);
        });
    });
    isEdit = getParam('edit');
    isView = getParam('view');
    if ((isEdit || isEdit == 'true') && (isView || isView == 'true')) {
        $('.searchBtn').hide();
        $('input').each(function(i, v) {
            $(this).attr('disabled', 'disabled');
        });
        $('textarea').each(function(i, v) {
            $(this).attr('disabled', 'disabled');
        });
        $('select').each(function(i, v) {
            $(this).attr('disabled', 'disabled');
        });
        $('.header p').html('详情');
    } else if (isEdit || isEdit == 'true') {
        $('.header p').html('编辑');
    }
});

//ajax方法
function getRequest(url, method, param, callback) {
    var getParam, getUserId;
    getUserId = getLoc('userId');
    if (getUserId) {
        $.extend(param, {
            userId: getUserId
        });
    }

    $.extend(param, {
        userId: '1011'
    });
    if (method == 'get') {
        getParam = param;
    } else {
        getParam = JSON.stringify(param);
    }
    $.ajax({
        url: config.host + url,
        type: method || 'post',
        data: getParam,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            if (data.code == 1) {
                callback(data.body);
            } else {
                layer.msg(data.msg);
            }
        },
        error: function(data) {
            //getAjax(url , dataJson);
        }
    });
}
//根据url获取参数
function getParam(paramName) {
    (paramValue = ''), (isFound = !1);
    if (this.location.search.indexOf('?') == 0 && this.location.search.indexOf('=') > 1) {
        (arrSource = unescape(this.location.search)
            .substring(1, this.location.search.length)
            .split('&')),
        (i = 0);
        while (i < arrSource.length && !isFound) arrSource[i].indexOf('=') > 0 && arrSource[i].split('=')[0].toLowerCase() == paramName.toLowerCase() && ((paramValue = arrSource[i].split('=')[1]), (isFound = !0)), i++;
    }
    return paramValue == '' && (paramValue = null), paramValue;
}

function layuiFn() {
    layui.use(['layer', 'form', 'laydate', 'table', 'laypage'], function() {
        layer = layui.layer;
        form = layui.form;
        laydate = layui.laydate;
        table = layui.table;
        laypage = layui.laypage;
    });
}
//表单的弹框
function formPopup(title, message, width, btns, callback1, callback2, initCallback, position) {
    var html = '';
    //width、height非必填项，可以传空或null
    width = width == null || width == undefined || width == '' ? 5.84 : width;

    html += '<div class="popupContent" id="dialog" style="width:' + width + 'rem;z-index:999;">';
    html += '<div class="popupTitle" id="moveTitle"> ' + title + '</div>';
    html += '<div style="padding-top:0.2rem">' + message + '</div>';
    html += '<ul class="popupBtn">';
    html += '<li id="submitBtn">' + btns.btn1 + '</li>';
    html += '<li id="cancelBtn">' + btns.btn2 + '</li>';
    html += '</ul>';
    html += '</div>';

    $('body').append(html);

    //拖拽弹框
    // dragPopup();
    //取消拖拽功能，保留自己居中
    if (position == null) {
        autoCenter($('#dialog'));
    } else {
        $('#dialog').css({
            left: position.left + 'rem',
            top: position.top + 'rem',
            right: position.right + 'rem',
            bottom: position.bottom + 'rem'
        });
    }

    // 非必填项，在页面初始化完成后进行赋值操作。
    // 执行在确认取消回调函数之前
    if (initCallback != null && initCallback != undefined && initCallback != '') {
        initCallback();
    }
    //右按钮
    $('#cancelBtn').on('click', function() {
        callback2($('.popupContent'));
    });
    //左按钮
    $('#submitBtn').on('click', function() {
        callback1($('.popupContent'));
    });
}

//移动端拖拽
function dragPopup() {
    /*拖动事件*/
    var cont = $('#dialog');
    var contW = $('#dialog').width();
    var contH = $('#dialog').height();
    var startX, startY, sX, sY, moveX, moveY, disX, disY;
    var winW = $(window).width();
    var winH = $(window).height();
    autoCenter(cont);
    cont.on({
        //绑定事件
        touchstart: function(e) {
            startX = e.originalEvent.targetTouches[0].pageX; //获取点击点的X坐标
            startY = e.originalEvent.targetTouches[0].pageY; //获取点击点的Y坐标
            //console.log("startX="+startX+"************startY="+startY);
            sX = $(this).offset().left; //相对于当前窗口X轴的偏移量
            sY = $(this).offset().top; //相对于当前窗口Y轴的偏移量
            //console.log("sX="+sX+"***************sY="+sY);
            leftX = startX - sX; //鼠标所能移动的最左端是当前鼠标距div左边距的位置
            rightX = winW - contW + leftX; //鼠标所能移动的最右端是当前窗口距离减去鼠标距div最右端位置
            topY = startY - sY; //鼠标所能移动最上端是当前鼠标距div上边距的位置
            bottomY = winH - contH + topY; //鼠标所能移动最下端是当前窗口距离减去鼠标距div最下端位置
        },
        touchmove: function(e) {
            e.preventDefault();
            moveX = e.originalEvent.targetTouches[0].pageX; //移动过程中X轴的坐标
            moveY = e.originalEvent.targetTouches[0].pageY; //移动过程中Y轴的坐标
            //console.log("moveX="+moveX+"************moveY="+moveY);
            if (moveX < leftX) {
                moveX = leftX;
            }
            if (moveX > rightX) {
                moveX = rightX;
            }
            if (moveY < topY) {
                moveY = topY;
            }
            if (moveY > bottomY) {
                moveY = bottomY;
            }
            $(this).css({
                left: moveX + sX - startX,
                top: moveY + sY - startY
            });
        },
        mousedown: function(ev) {
            var patch = parseInt($(this).css('height')) / 2;
            //console.log(patch);
            $(this).mousemove(function(ev) {
                var oEvent = ev || event;
                //console.log(oEvent.target);
                var oX = oEvent.clientX;
                var oY = oEvent.clientY;
                var t = oY - patch;
                var l = oX - patch;
                var w = $(window).width() - $(this).width();
                var h = $(window).height() - $(this).height();
                if (t < 0) {
                    t = 0;
                }
                if (l < 0) {
                    l = 0;
                }
                if (t > h) {
                    t = h;
                }
                if (l > w) {
                    l = w;
                }
                $(this).css({
                    top: t,
                    left: l
                });
            });
            $(this).mouseup(function() {
                $(this).unbind('mousemove');
            });
        }
    });
}
//Pc端拖拽
// function dragPopup() {
//     var $dialog = $('#dialog');
//     autoCenter($dialog);

//     //声明需要用到的变量
//     var mx = 0,
//         my = 0; //鼠标x、y轴坐标（相对于left，top）
//     var dx = 0,
//         dy = 0; //对话框坐标（同上）
//     var isDraging = false; //不可拖动

//     //鼠标按下
//     $('#moveTitle').mousedown(function(e) {
//         e = e || window.event;
//         mx = e.pageX; //点击时鼠标X坐标
//         my = e.pageY; //点击时鼠标Y坐标
//         dx = $dialog.offset().left;
//         dy = $dialog.offset().top;
//         isDraging = true; //标记对话框可拖动
//     });

//     //鼠标移动更新窗口位置
//     $(document).mousemove(function(e) {
//         var e = e || window.event;
//         var x = e.pageX; //移动时鼠标X坐标
//         var y = e.pageY; //移动时鼠标Y坐标
//         if (isDraging) {
//             //判断对话框能否拖动
//             var moveX = dx + x - mx; //移动后对话框新的left值
//             var moveY = dy + y - my; //移动后对话框新的top值
//             //设置拖动范围
//             var pageW = $(window).width();
//             var pageH = $(window).height();
//             var dialogW = $dialog.width();
//             var dialogH = $dialog.height();
//             var maxX = pageW - dialogW; //X轴可拖动最大值
//             var maxY = pageH - dialogH; //Y轴可拖动最大值
//             moveX = Math.min(Math.max(0, moveX), maxX); //X轴可拖动范围
//             moveY = Math.min(Math.max(0, moveY), maxY); //Y轴可拖动范围
//             //重新设置对话框的left、top
//             $dialog.css({ left: moveX + 'px', top: moveY + 'px' });
//         }
//     });

//     //鼠标离开
//     $('#moveTitle').mouseup(function() {
//         isDraging = false;
//     });
// }

//自动居中对话框
function autoCenter(el) {
    var bodyW = $(window).width();
    var bodyH = $(window).height();
    var elW = el.width();
    var elH = el.height();
    el.css({
        left: (bodyW - elW) / 2 + 'px',
        top: (bodyH - elH) / 2 + 'px'
    });
}

//日历时间分组方法-返回所需数据格式
function mapLoction(arr) {
    var newArr = [];
    arr.forEach(function(item, i) {
        var index = -1;
        var alreadyExists = false;
        newArr.some(function(newItem, j) {
            if (item.startTime === newItem.startTime) {
                index = j;
                return (alreadyExists = true);
            }
        });

        if (!alreadyExists) {
            newArr.push({
                startTime: item.startTime,
                listArr: [item]
            });
        } else {
            newArr[index].listArr.push(item);
        }
    });
    return newArr;
}

//选择人员的弹框
function getUsersFn(url, method, obj, submitCallback, getInitData) {
    var html = '';
    html += '<div class="getUserMask">';
    html += '<div class="getUserContent clearfix">';
    html += '<div class="left leftTree"><ul id="usersTree" class="ztree"></ul></div>';
    html += '<div class="right checkedList">';
    html += '<h3>已选择人员</h3>';
    html += '<ul class="checkedUsers clearfix"><li class="getUserNoData">请选择人员！</li></ul>';
    html += '<ul class="btns clearfix">';
    html += '<li><a id="setUsersBtn" href="javascript:;">确定</a></li>';
    html += '<li><a id="userCancelBtn" href="javascript:;">取消</a></li>';
    html += '</ul>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    $('body').append(html);
    var zTree, selectedNode;
    var showArr = [];
    if (getInitData != null && getInitData != undefined && getInitData != '') {
        getInitData.userIds.split(',').forEach(function(item, index) {
            showArr.push({
                label: getInitData.userNames.split(',')[index],
                id: item
            });
        });
        var getInitHtml = '';
        if (showArr.length != 0) {
            showArr.forEach(function(item, index) {
                getInitHtml += '<li>' + item.label + '<a id="' + item.id + '" href="javascript:;"><img src="./img/del.png"/></a></li>';
            });
            $('.checkedUsers').html(getInitHtml);
        } else {
            $('.checkedUsers').html('<li class="getUserNoData">请选择人员！</li>');
        }
    }
    getRequest(url, method, obj, function(data) {
        var zNodes;
        if (typeof data.treeData == 'string') {
            zNodes = JSON.parse(data.treeData);
        } else {
            zNodes = data.treeData;
        }

        var setting = {
            check: {
                enable: true
            },
            data: {
                key: {
                    name: 'label'
                },
                simpleData: {
                    enable: true
                }
            },
            view: {
                showIcon: false,
                selectedMulti: false,
                fontCss: {
                    color: '#4e4d4d'
                },
                showLine: false,
                dblClickExpand: false
            },
            callback: {
                onCheck: onCheck,
                onClick: zTreeOnClick
            }
        };
        var treeObj = $.fn.zTree.init($('#usersTree'), setting, zNodes);
        treeObj.expandAll(true);

        if (showArr.length != 0) {
            showArr.forEach(function(item) {
                var node = treeObj.getNodeByParam('id', item.id);
                treeObj.checkNode(node, true, true);
            });
        }
        zTree = $.fn.zTree.getZTreeObj('usersTree');
        selectedNode = zTree.getCheckedNodes();
    });

    function zTreeOnClick(e, treeId, treeNode) {
        zTree.checkNode(treeNode, !treeNode.checked, true);
        zTree.cancelSelectedNode();
        onCheck();
        // zTree.expandNode(treeNode);
    }

    function onCheck(e, treeId, treeNode) {
        selectedNode = zTree.getCheckedNodes();
        var html = '';
        showArr = [];
        if (selectedNode.length != 0) {
            selectedNode.forEach(function(item) {
                if (item.sip && item.sip != 'null') {
                    showArr.push({
                        label: item.label,
                        id: item.id,
                        peopleLevel: item.people_level,
                        peopleRole: item.people_role
                    });
                }
            });
            if (showArr.length != 0) {
                showArr.forEach(function(item, index) {
                    html += '<li>' + item.label + '<a id="' + item.id + '" href="javascript:;"><img src="./img/del.png"/></a></li>';
                });
                $('.checkedUsers').html(html);
            } else {
                $('.checkedUsers').html('<li class="getUserNoData">请选择人员！</li>');
            }
        } else {
            $('.checkedUsers').html('<li class="getUserNoData">请选择人员！</li>');
        }
    }

    //删除按钮
    $('.checkedUsers').on('click', 'a', function() {
        var currentId = $(this).attr('id');
        var delIndex;
        for (var k = 0; k < selectedNode.length; k++) {
            if (selectedNode[k].id == currentId) {
                zTree.checkNode(selectedNode[k]); //取消这个节点的勾选状态
                delIndex = k;
            }
        }
        showArr.forEach(function(item, index) {
            if (item.id == selectedNode[delIndex].id) {
                showArr.splice(index, 1);
            }
        });
        $(this)
            .parent('li')
            .remove();
        if (showArr.length == 0) {
            $('.checkedUsers').html('<li class="getUserNoData">请选择人员！</li>');
        }
    });
    //确定按钮
    $('#setUsersBtn').on('click', function() {
        submitCallback($('.getUserMask'), showArr);
    });
    //取消按钮
    $('#userCancelBtn').on('click', function() {
        $('.getUserMask').remove();
    });
}

//set local
// function setLoc(k, val) {
//     if (typeof val == 'string') {
//         localStorage.setItem(k, val);
//         return val;
//     }
//     localStorage.setItem(k, JSON.stringify(val));
//     return val;
// }

//get local
// function getLoc(k) {
//     let uu = localStorage.getItem(k);

//     try {
//         if (typeof JSON.parse(uu) != 'number') {
//             uu = JSON.parse(uu);
//         }
//     } catch (e) {}
//     return uu;
// }

function setLoc(name, value) {
    //设置名称为name,值为value的Cookie
    var expdate = new Date(); //初始化时间
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000); //时间单位毫秒
    document.cookie = name + '=' + value + ';expires=' + expdate.toGMTString() + ';path=/';

    //即document.cookie= name+"="+value+";path=/";  时间默认为当前会话可以不要，但路径要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！
}

function getLoc(c_name) {
    //判断document.cookie对象里面是否存有cookie
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + '=');
        //如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}

//选车等弹框
function getCarsFn(url, method, obj, submitCallback, initObj) {
    var html = '';
    html += '<div class="getCarMask">';
    html += '<div class="getCarContent clearfix">';
    html += '<div class="left">';
    html += '<ul class="leftTitle"></ul>';
    html += '</div>';
    html += '<div class="right">';
    html += '<div class="rightContent"></div>';
    html += ' <ul class="btns clearfix">';
    html += '<li><a id="setCarBtn" href="javascript:;">确定</a></li>';
    html += '<li><a id="carCancelBtn" href="javascript:;">取消</a></li>';
    html += '</ul>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    $('body').append(html);
    getRequest(url, method, obj, function(data) {
        var titleHtml = '';
        var contentHtml = '';
        /*****组装数据******/
        if (initObj != null && initObj != undefined && initObj != '') {
            data.forEach(function(item, index) {
                item.list.forEach(function(subItem, subIndex) {
                    initObj.forEach(function(itemObj, iinde) {
                        if (item.carCode == 'CWL') {
                            if (JSON.parse(itemObj).carId == subItem.id) {
                                item.list.splice(subIndex, 1);
                            }
                        } else if (item.carCode == 'QCL') {
                            if (JSON.parse(itemObj).carId == subItem.id) {
                                item.list.splice(subIndex, 1);
                            }
                        } else if (item.carCode == 'SZL') {
                            if (JSON.parse(itemObj).carId == subItem.szlCarId) {
                                item.list.splice(subIndex, 1);
                            }
                        } else {
                            if (JSON.parse(itemObj).carId == subItem.carId) {
                                item.list.splice(subIndex, 1);
                            }
                        }
                    });
                });
            });
        }
        /******渲染页面******/
        data.forEach(function(item, index) {
            if (index == 0) {
                titleHtml += '<li class="isHoverTitle">' + item.carType + '</li>';
            } else {
                titleHtml += '<li>' + item.carType + '</li>';
            }

            var subInput = '';
            item.list.forEach(function(subItem, subIndex) {
                var obj = '';
                if (item.carCode == 'CWL') {
                    obj = {
                        carId: subItem.id,
                        carType: subItem.equipmentType,
                        carCode: subItem.carNumber,
                        carModel: subItem.model
                    };
                } else if (item.carCode == 'QCL') {
                    obj = {
                        carId: subItem.id,
                        carType: subItem.carType,
                        carCode: subItem.carCode,
                        carModel: subItem.model
                    };
                } else if (item.carCode == 'SZL') {
                    obj = {
                        carId: subItem.szlCarId,
                        carType: subItem.carType,
                        carCode: subItem.carCode,
                        carModel: subItem.model
                    };
                } else {
                    obj = {
                        carId: subItem.carId,
                        carType: subItem.carType,
                        carCode: subItem.carCode,
                        carModel: subItem.carModel
                    };
                }
                subInput += '<span><input type="checkbox" setData=' + JSON.stringify(obj) + '> ' + obj.carCode + '</span>';
            });
            if (index == 0) {
                contentHtml += '<div class="isShow">' + subInput + '</div>';
            } else {
                contentHtml += '<div>' + subInput + '</div>';
            }
        });

        $('.leftTitle').append(titleHtml);
        $('.rightContent').append(contentHtml);

        $('.leftTitle li').on('click', function() {
            var i = $(this).index(); //下标第一种写法
            $(this)
                .addClass('isHoverTitle')
                .siblings()
                .removeClass('isHoverTitle');
            $('.rightContent div')
                .eq(i)
                .show()
                .siblings()
                .hide();
        });
    });

    $('#setCarBtn').on('click', function() {
        var checkedArr = [];
        $.each($('input[type=checkbox]:checked'), function() {
            checkedArr.push($(this).attr('setData'));
        });
        if (checkedArr.length == 0) {
            layer.msg('请至少选择一个！');
            return false;
        }
        submitCallback($('.getCarMask'), checkedArr);
    });
    $('#carCancelBtn').on('click', function() {
        $('.getCarMask').remove();
    });
}
//图片
function showPicsFn(url) {
    var html = '';
    html += '<div class="maskPic">';
    html += '<div class="picShow">';
    html += '<div class="big getBigger"></div>';
    html += '<div class="smallWrap"><ul class="small clearfix"></ul></div>';
    html += '<a class="picClose" href="javascript:;">关闭</a>';
    html += '</div>';
    html += '</div>';
    $('body').append(html);
    $('.picClose').on('click', function() {
        $('.maskPic').remove();
    });
    var urlArr = [];
    urlArr = url.split(',');
    var bigImgHtml = '';
    var imgHtml = '';
    var showBiggestHtml = '<div id="maskBigPic"></div>';
    urlArr.forEach(function(item, index) {
        if (index == 0) {
            bigImgHtml = '<img url="' + item + '" src="' + item + '" />';
        }
        imgHtml += '<li curIndex="' + index + '"><img src="' + item + '" /></li>';
    });
    $('.picShow .big').html(bigImgHtml);
    $('.picShow .small')
        .css('width', urlArr.length * 2 + 0.1 + 'rem')
        .html(imgHtml);
    $('.picShow .small li').on('click', function() {
        var index = $(this).attr('curIndex');
        $('.picShow .big').html('<img url="' + urlArr[index] + '" src="' + urlArr[index] + '" />');
    });
    $('.getBigger').on('click', function() {
        var url = $(this)
            .find('img')
            .attr('url');
        $('body').append(showBiggestHtml);
        $('#maskBigPic').html('<img src="' + url + '" />');
    });
    $('body').on('click', '#maskBigPic', function() {
        $(this).remove();
    });
}

//播放视频
function playVideoFn(url) {
    var html = '<div class="viewVideo"><video id="my-video" class="video-js" controls="controls" autoplay="autoplay" preload="auto" data-setup="{}"><source src="' + url + '" type="video/mp4" />' + 'Your browser does not support the video tag.' + '"</video></div>';
    $('body').append(html);
    $('.viewVideo').on('click', function() {
        $(this).remove();
    });
}
