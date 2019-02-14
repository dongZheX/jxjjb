$(function () {
    $("#add_user").validate();
    $("#addFile").validate();
    $("#addFile_2").validate();
    $("#addDate").validate();
    add1();
    $("#import_user_single").click(function () {
        $("#add_user_modal").modal({backdrop:false});
    });
    $("#add_user").submit(function () {
        if($(this).valid()){
            bootbox.confirm({
                size:"small",
                message:"确定添加？",
                callback:function (res) {
                    if(res){
                        $.ajax({
                            url:"admin/importUser.php",
                            type:"post",
                            dataType:"json",
                            data:{
                                action:"1",
                                userid:$("#userid").val(),
                                user_name:$("#user_name").val(),
                                user_dept:$("#user_dept").get(0).selectedIndex+1,
                                user_tel:$("#user_tel").val()
                            },
                            error:function () {
                                toastr.error("未知错误");
                            },
                            success:function (data) {
                                data = JSON.parse(JSON.stringify(data));
                                if (data['status']==1)
                                {
                                    toastr.success("添加成功");
                                    $("#add_user_modal").modal("hide");
                                }
                                else {
                                    toastr.error("添加失败");
                                }
                            }
                        })
                    }
                }
            })
        }
        return false;
    });
    $("#import_user_much").click(function () {
        $("#addFile_modal").modal({backdrop:false});
    });
    //提交模板用户
    $("#addFile").submit(function () {
        if($("#addFile").valid()){
            bootbox.confirm({
                size:"small",
                message:"确定添加？",
                callback:function (res) {
                    if(res){
                        let file = $("#commit_file").val();
                        let name = file.substring(file.lastIndexOf(".")+1);
                        if (name!="xls"){toastr.error("错误的文件格式");return true;}
                        let formdata = new FormData($("#addFile")[0]);
                        formdata.append("action","2");
                        $.ajax({
                            url:"admin/importUser.php",
                            type:"post",
                            dataType:"json",
                            contentType: false,
                            processData:false,
                            data:formdata,
                            error:function () {
                                toastr.error("未知错误");
                            },
                            success:function (data) {
                                data = JSON.parse(JSON.stringify(data));
                                if (data['status']==1)
                                {
                                    toastr.success("添加成功");
                                    $("#addFile_modal").modal("hide");
                                }
                                else {
                                    toastr.error("添加失败,数据重复");
                                }
                            }
                        })
                    }
                }
            })
        }
        return false;
    });
    //提交卫生信息
    $("#import_ws_much").click(function () {
        $("#addFile_modal_2").modal({backdrop:false});
    });
    $("#addFile_2").submit(function () {
        if($("#addFile_2").valid()){
            bootbox.confirm({
                size:"small",
                message:"确定添加？",
                callback:function (res) {
                    if(res){
                        let file = $("#commit_file_2").val();
                        let name = file.substring(file.lastIndexOf(".")+1);
                        if (name!="xls"){toastr.error("错误的文件格式");return true;}
                        let formdata = new FormData($("#addFile_2")[0]);
                        formdata.append("action","1");
                        $.ajax({
                            url:"admin/importWs.php",
                            type:"post",
                            dataType:"json",
                            contentType: false,
                            processData:false,
                            data:formdata,
                            error:function () {
                                toastr.error("未知错误");
                            },
                            success:function (data) {
                                data = JSON.parse(JSON.stringify(data));
                                if (data['status']==1)
                                {
                                    toastr.success("添加成功");
                                    $("#addFile_modal_2").modal("hide");
                                }
                                else {
                                    toastr.error("数据格式错误");
                                }
                            }
                        })
                    }
                }
            })
        }
        return false;
    })
    //设置截止日期
    $("#set_date").click(function () {
        $("#date_modal").modal({backdrop:false});
    });
    $("#addDate").submit(function () {
        if($("#addDate").valid()){
            start_date = new Date($("#start_date").val()).getTime()/1000;
            end_date = new Date($("#end_date").val()).getTime()/1000;
            bootbox.confirm({
                size:"small",
                message:"确定设置？",
                callback:function (res) {
                    if(res){
                        $.ajax({
                            url:"admin/deadline.php",
                            dataType:"json",
                            data:{
                                action:"2",
                                start:start_date,
                                end:end_date
                            },
                            type:"post",
                            error:function () {
                                toastr.error("出现错误");
                            },
                            success:function (data) {
                                data = JSON.parse(JSON.stringify(data));
                                if(data['status']==1){
                                    toastr.success("设置成功");
                                    $("#date_modal").modal("hide");
                                }else{
                                    toastr.error("设置失败");
                                }
                            }
                        })
                    }
                }
            })
        }
        return false;
    })
});
function add1() {
    jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写手机号码");

}
//时间选择器
$(function() {
    $.datepicker.regional['zh-CN'] = {
        changeMonth: true,
        changeYear: true,
        clearText: '清除',
        clearStatus: '清除已选日期',
        closeText: '关闭',
        closeStatus: '不改变当前选择',
        prevText: '<上月',
        prevStatus: '显示上月',
        prevBigText: '<<',
        prevBigStatus: '显示上一年',
        nextText: '下月>',
        nextStatus: '显示下月',
        nextBigText: '>>',
        nextBigStatus: '显示下一年',
        currentText: '今天',
        currentStatus: '显示本月',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthStatus: '选择月份',
        yearStatus: '选择年份',
        weekHeader: '周',
        weekStatus: '年内周次',
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dayStatus: '设置 DD 为一周起始',
        dateStatus: '选择 m月 d日, DD',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        initStatus: '请选择日期',
        isRTL: false
    };
    $("#start_date").prop("readonly",true);
    $("#end_date").prop("readonly",true);
        $.timepicker.datetimeRange(
        $("#start_date"),
        $("#end_date"), {
            minInterval: (1000 * 60 * 60 * 24 * 1), // 区间时间间隔时间
            maxInterval: (1000 * 60 * 60 * 24 * 1), // 1 days 区间时间间隔时间
            start: {
                changeMonth: true,
                changeYear:true,
                timeText: '时间',
                hourText: '小时',
                minuteText: '分钟',
                secondText: '秒',
                currentText: '现在',
                closeText: '完成',
                showSecond: true, //显示秒
                timeFormat: 'HH:mm:ss', //格式化时间
                dateFormat: "yy-mm-dd",
                onClose: function(selectedDate) {
                    $("#start_date").datepicker("option", "minDate", selectedDate);
                }
            }, // start picker options
            end: {
                changeMonth: true,
                changeYear:true,
                timeText: '时间',
                hourText: '小时',
                minuteText: '分钟',
                secondText: '秒',
                currentText: '现在',
                closeText: '完成',
                showSecond: true, //显示秒
                timeFormat: 'HH:mm:ss', //格式化时间
                dateFormat: "yy-mm-dd",
                onClose: function(selectedDate) {
                    $("#end_date").datepicker("option", "maxDate", selectedDate);
                }
            } // end picker options});
        }
    );


});
//规章制度扣分功能
$(function () {
    select_y = $("#rule_y");
    $("#ruleMat_form").validate();
    let now_Y = new Date().getFullYear();
    let now_m = new Date().getMonth()+1;
    //初始化年级
    if (now_m<9) select_y.html("<option>"+(now_Y-1)+"</option>"+ "<option>"+(now_Y-2)+"</option>"+ "<option>"+(now_Y-3)+"</option>");
    else select_y.html("<option>"+now_Y+"</option>"+ "<option>"+(now_Y-1)+"</option>"+ "<option>"+(now_Y-2)+"</option>");
    $("#btn_kf").click(function () {
        $("#ruleMat_modal").modal({backdrop:false});
    });
    $("#ruleMat_form").submit(function () {
        if($(this).valid()){
            bootbox.confirm({
                size:"small",
                message:"请仔细确认，避免出错",
                callback:function(){
                    let formdata = new FormData($("#ruleMat_form")[0]);
                    formdata.append("action","1");
                    $.ajax({
                        url:"admin/ruleMat.php",
                        type:"post",
                        dataType:"json",
                        data:formdata,
                        contentType: false,
                        processData:false,
                        error:function () {
                            toastr.error("未知的错误");
                        },
                        success:function (data) {
                            data = JSON.parse(JSON.stringify(data));
                            if(data['status']==1){
                                toastr.success("添加成功");
                                $("#ruleMat_modal").modal("hide");
                            }

                            else
                                toastr.error("添加失败");
                        }
                    })
                }
            })
        }
        return false;
    })
});