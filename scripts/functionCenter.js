$(function () {
    $("#add_user").validate();
    $("#addFile").validate();
    $("#addFile_2").validate();
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
});
function add1() {
    jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写手机号码");

}