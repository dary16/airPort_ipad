var nameArr = [];
var userIdArr = [];
var addData = {};
var editData = {};
var isEdit = false;
var curId;
var planId;
var curName = '';
$(function() {
    curId = getParam('id');
    form.render('select');
    getTabDataFn();

    //完成按钮
    $('.searchBtn').on('click', function() {
        var getFormData = $('#form').serializeArray();
        getFormData.forEach(function(item) {
            addData[item.name] = item.value;
        });
        curName = $('#tabList .layui-this').html();
        window.location.href = 'list-flight-support-allot.html?id=' + planId;
    });
});

function getDetail() {
    var getFormData = $('#form').serializeArray();
    getFormData.forEach(function(item) {
        addData[item.name] = item.value;
    });
    curName = $('#tabList .layui-this').html();
    window.location.href = 'list-flight-support-allot.html?id=' + planId;
}

//获取编辑的数据
function getEditDataFn() {
    getRequest(
        'airPortService/busSecurityPlan/get',
        'post', {
            id: curId
        },
        function(data) {
            planId = data.id;
            //console.log(data.flightPlanId);
            var strContent = '';
            data.listTeam.forEach(function(item) {
                $("#tabList li").each(function(i) {
                    var strContent = '';
                    if ($(this)[0].id == item.teamId) {
                        //console.log(item.arrivalTime, item.arrivalPlace, item.carType);
                        strContent += '<li>';
                        strContent += item.arrivalTime;
                        strContent += '</li>';
                        strContent += '<li>';
                        strContent += item.arrivalPlace;
                        strContent += '</li>';
                        strContent += '<li>';
                        strContent += item.carType;
                        strContent += '</li>';
                        strContent += '<li>';
                        strContent += item.carNum;
                        strContent += '</li>';
                        //console.log(this, 'this', i);
                        var ddd = $(this).parent().parent().find("#tabContent").children().eq(i).children().find(".ul-content");
                        //console.log(ddd);
                        ddd.append(strContent);
                    }
                });
            });

            $("#tabList li").each(function() {
                //console.log($(this)[0].id);
            });

            editData = data;
            infoData = data.listTeam;
            $('.contentEdit input').each(function(i, v) {
                $(v).val(editData[v.name]);
            });
            $('.contentEdit select').each(function(i, v) {
                $(v).val(editData[v.name]);
            });
            getOrgFn();
        }
    );
}
//获取tab标题
function getTabDataFn() {
    getRequest(
        'airPortService/systemOrg/getLeafOrgList',
        'post', {
            id: curId
        },
        function(data) {
            var strTitle = '';
            var strContent = '';
            data.forEach(function(item, index) {
                strTitle += '<li id="' + item.orgId + '">' + item.orgName + '</li>';
                strContent += '<div class="layui-tab-item">';
                strContent += '<div class="eachList">';
                strContent += '<ul class="ul-title clearfix"><li>到达时间</li><li>到达地点</li><li>类型</li><li>数量</li></ul>';
                strContent += '<ul class="ul-content clearfix">';
                strContent += '</ul>';
                strContent += '</div>';
                strContent += '</div>';
            });
            $("#tabList").html(strTitle);
            $("#tabList li").first().addClass("layui-this");
            $("#tabContent").html(strContent);
            $("#tabContent div").first().addClass("layui-show");
            getEditDataFn();
        }
    );
}

//获取可分配连队
function getOrgFn() {
    getRequest(
        'airPortService/api/web/getDept',
        'post', {},
        function(data) {
            var html = '';
            $("#tabList li").each(function(index) {
                if ($(this).attr("id") == data.orgId) {
                    html = ' <div class="searchItem"><button id="over" type="button" onclick="getDetail();" class="searchBtn">分配</button></div>';
                    $("#tabContent").find('.layui-tab-item').eq(index).append(html);
                }
            })
        })
}