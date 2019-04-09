 
//此方式：弹窗非iframe模式
var toolPrint = L.widget.bindClass(L.widget.BaseWidget.extend({
    map: null,//框架会自动对map赋值
    options: {
        resources: [
            'view.css',
            'lib/print.js',
            'lib/dom-to-image.js'
        ],
        view: [
            { type: "append", url: "view.html" },
            { type: "append", url: "viewmap.html", parent: "#centerDiv" }
        ],
    },
    $mapParentDiv: null,    //map地图的父级容器
    $mapDiv: null,          //map地图 容器
    //初始化[仅执行1次]
    create: function () {
        this.$mapParentDiv = $("#centerDiv");
        this.$mapDiv = $("#" + this.map._container.id);
    },
    winCreateOK: function (opt, result) {
        var that = this;
        if (opt.url.indexOf('view.html') != -1) {
            $("#btn_print_expimg").click(function () {
                that.expImg();
            });
            $("#btn_print_start").click(function () {
                that.printview();
            });
            $("#btn_print_type").change(function () {
                var val = $(this).val();
                that.changeSize(val);
            });
            $("#btn_print_close").click(function () {
                that.disableBase();
            });
        }
        else {
            $("#btn_print_edititle").click(function () {
                that.editTitle();
            });
            $("#btn_print_eidttitle_yes").click(function () {
                that.saveEidtTitle();
            });

            $("#btn_print_eidttitle_no").click(function () {
                that.cancelEidtTitle();
            });
        }
    },
    //激活插件
    activate: function () {
        //隐藏div
        $(".leaflet-control").hide();
        $(".leaflet-control-scale").show();
        $(".no-print-view").hide();

        //显示打印div
        $("#mapprint_title_view").show();
        $("#mapprint_title_editview").hide();
        $("#mapprint_foot_view").show();

        //修改css
        $("html").css({
            "overflow": "auto",
            "background-color": "#888"
        });
        $("body").css({
            "overflow": "auto",
            "background-color": "#888"
        });
        this.$mapParentDiv.css({
            "position": "absolute",
            "background-color": "#ffffff",
            "left": "0",
            "right": "0", 
        });
        this.$mapDiv.removeClass('map').addClass('map_print').css({ "position": "absolute" });

        this.changeSize(this._lasttype);
        this.invalidateSize();
    },
    //释放插件
    disable: function () {
        //还原显示div
        $(".leaflet-control").show();
        $(".no-print-view").show();

        //隐藏打印div
        $("#mapprint_title_view").hide();
        $("#mapprint_title_editview").hide();
        $("#mapprint_foot_view").hide();

        //修改css
        $("html").css({
            "overflow": "hidden",
            "background-color": "#ffffff"
        });
        $("body").css({
            "overflow": "hidden",
            "background-color": ""
        }); 
        this.$mapParentDiv.css({
            "background-color": "",
            "border": "",
            "position": "",
            "top": "0",
            "bottom": "0",
            "left": "0",
            "right": "0",
            "height": "100%",
            "width": "100%"
        });
        this.$mapDiv.removeClass('map_print').addClass('map').css({ "position": "" });

        this.invalidateSize(); 
    },
    invalidateSize: function () {
        var map = this.map;
        setTimeout(function () {
            map.invalidateSize(false);
        }, 200);
    },
    _lasttype: "A4H",
    changeSize: function (type) {
        this._lasttype = type;

        var width;
        var height;
        var isZongxiang;
        switch (type) {//单位为：mm毫米
            default:
            case "A4H":
                width = 297;
                height = 210;
                break;
            case "A4Z":
                width = 210;
                height = 297;
                isZongxiang = true;
                break;
            case "A3H":
                width = 420;
                height = 297;
                break;
            case "A3Z":
                width = 297;
                height = 420;
                isZongxiang = true;
                break;
        }

        //減去边框
        if (isZongxiang) {
            width -= 10;
            height -= 10;
        } else {
            width -= 10;
            height -= 15;
        }

        this.$mapParentDiv.css({
            width: width + "mm",
            height: height + "mm"
        });

        this.invalidateSize();
    },
    editTitle: function () {
        $("#mapprint_title_view").hide();
        $("#mapprint_title_editview").show();

        var tilte = $("#lbl_printmap_title").html();
        $("#txt_printmap_title").val(tilte);
    },
    saveEidtTitle: function () {
        var tilte = $("#txt_printmap_title").val();
        $("#lbl_printmap_title").html(tilte);

        $("#mapprint_title_editview").hide();
        $("#mapprint_title_view").show();
    },
    cancelEidtTitle: function () {
        $("#mapprint_title_editview").hide();
        $("#mapprint_title_view").show();
    },

    printview: function () {
        var that = this;
        this.changeElStylForStart();

        this.$mapParentDiv.css({ border: "" }).print({
            noPrintSelector: ".no-print",
            deferred: $.Deferred().done(function () {
                that.changeElStylForEnd();
            })
        });
    },
    expImg: function () {
        var that = this;
        this.changeElStylForStart();
         

        //IIS:     "proxy/proxy.ashx?";
        //Tomcat:  "proxy/proxy.jsp?";

        //解决跨域问题
        domtoimage.proxy = function (url) {
            //此处可以加入各种逻辑判断，哪些情况进行不走代理。
            //if (url.startsWith("http://116.62.243.72:6080"))
            //    return url;

            return "proxy/proxy.jsp?" + url;    //走代理
        }



        //此处应该加进度条
        haoutil.loading.show();

        var eleid = "centerDiv";
        var node = document.getElementById(eleid);
        domtoimage.toPng(node)
            .then(function (dataUrl) {
                haoutil.loading.hide();
                that.changeElStylForEnd();

                var blob = that._dataURItoBlob(dataUrl);
                haoutil.file.download("地图截图.png", blob);

                //此处应该关闭进度条
                toastr.success('导出完成');
            })
            .catch(function (error) {
                haoutil.loading.hide();
                that.changeElStylForEnd();
                console.error('未知原因，导出失败!', error);

                toastr.error('导出失败');
            });
    },
    _dataURItoBlob: function (dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var dw = new DataView(ab);
        for (var i = 0; i < byteString.length; i++) {
            dw.setUint8(i, byteString.charCodeAt(i));
        }
        return new Blob([ab], { type: mimeString });
    },
    //修改节点样式，开始导出
    changeElStylForStart: function () { 
        $(".no-print").hide();
    },
    //修改节点样式，完成导出
    changeElStylForEnd: function () { 
        $(".no-print").show(); 
    },


}));
