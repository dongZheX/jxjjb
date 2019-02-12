$(function () {
    let init = "13034512630";
    $.ajax({
        url:"admin/getUserInfo.php?action=2",
        type:"post",
        dataType:"json",
        error:function () {
            toastr.error("数据错误");
        },
        success:function (data) {
            data = JSON.parse(JSON.stringify(data));
            $("#name").val(data['name']);
            $("#dept").val(data['dept']);
            $("#tel").val(data['tel']);
            init = data['tel'];
        }
    });
   $("#tel").dblclick(function () {
        $("#tel").prop("readonly",null);
       $("#tel_label").text("电话（离开确定）");

   });
    $("#tel").mouseleave(function () {
        if(!$("#tel").attr("readonly")){
            if(checkMobile($("#tel").val())){
                if($("#tel").val()!=init){
                    $.ajax({
                        url:"admin/getUserInfo.php?action=1",
                        type:"post",
                        dataType:"json",
                        data:{tel:$("#tel").val()},
                        error:function () {
                            toastr.error("数据错误");
                            $("#tel").val(init);
                        },
                        success:function (data) {
                            data = JSON.parse(JSON.stringify(data));
                            if(data['status']==1){
                                toastr.success("修改成功");
                                init = $("#tel").val();
                            }else{
                                toastr.error("修改失败");
                                $("#tel").val(init);
                            }
                        }
                    });
                }
            }
            else
            {
                bootbox.alert("电话号码不合法");
                $("#tel").val(init);
            }
            $("#tel").prop("readonly","readonly");
        }
    })
    $("#btn_changpass").click(function () {
        let old = $("#old_pass").val();
        let newpass = $("#new_pass").val();
        let new_pass_con = $("#new_pass_conf").val();
        if(newpass!=new_pass_con){
            toastr.error("两次密码输入不一致");
            $("#new_pass_conf").val("");
            $("#new_pass").val("");
            return false;
        }else if(old==newpass){
            toastr.error("请换一个与旧密码不一致的密码");
        }
        else{
            $.ajax({
                url:"admin/getUserInfo.php?action=3",
                type:"post",
                dataType:"json",
                data:{newpass:newpass,oldpass:old},
                error:function () {
                    toastr.error("数据错误");
                },
                success:function (data) {
                    data = JSON.parse(JSON.stringify(data));
                    if(data['status']==1)
                    {
                        toastr.success("修改成功");
                        bootbox.confirm({
                            size:"small",
                            message:"请重新登录",
                            callback:function () {
                                $.cookie("PHPSESSID",null);
                                window.location="login.html";
                            }
                        });

                    }
                    else{
                        toastr.error("修改失败");
                    }
                }
            });
        }

    })
});

function checkMobile(str) {
    var
        re = /^1\d{10}$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}