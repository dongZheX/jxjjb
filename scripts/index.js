$(function () {
    $("#edit").click(function () {
       $("#myModal2").modal({backdrop: 'static'});
    });
    //表单提交
    $("#edit_confirm_btn").click(function () {
        bootbox.confirm({
            size:"small",
            message:"确认修改公告？",
            callback:function (result) {
                if (result){
                    let val = $("#edit_info_gg textarea").val();
                    let tempval = val;
                    $.ajax({
                       url:"admin/index_board.php",
                        type:"post",
                        data:{action:1,content:tempval},
                        dataType:"json",
                        error:function () {
                            toastr.error("网络错误");
                        },
                        success:function (data) {
                            toastr.success("修改成功");
                        }
                    });
                    val = val.replace(/(\r)*\n/g,"<br/>").replace(/\s/g,"&nbsp");
                    $("#content_info").html(val);
                    $("#myModal2").modal("hide");
                }
            }
        });
        return false;
    });
    //加载公告栏
    $.ajax({
        url:"admin/index_board.php",
        type:"post",
        data:{action:2},
        dataType:"text",
        error:function () {
            toastr.error("网络错误");
        },
        success:function (data) {
            $("#content_info img").hide();
            data = data.replace(/(\r)*\n/g,"<br/>").replace(/\s/g,"&nbsp");
            $("#content_info").html(data);
        },
        beforeSend:function () {
            $("#content_info img").hide();
        }
    })

});
