$(function () {
    $.ajax({
        url:"/admin/loginCheck.php",
        type:"post",
        dataType:"json",
        error:function(){
            toastr.error("出错");
        },
        complete:function(){
        },
        success:function (data) {
            data = JSON.parse(JSON.stringify(data));
            if (data["status"]==0){
                bootbox.alert({
                    size:"small",
                    message:"请您先登录",
                    callback:function () {
                        window.location="login.html";
                    }
                })
            }
            else{
                if (data["user_tag"]==1){
                    $("#a_user_tag").prop("title","团学组织");
                    $("#navbarcol ul li").eq(2).show();
                    $("#edit").show();
                    $("#navbarcol ul li").eq(4).show();
                    //防止用户输入url
                    if(window.location.toString().split("/")[3]=="submitMat.html"){
                        bootbox.alert({
                            size:"small",
                            message:"您没有权限",
                            callback:function () {
                                window.location="index.html";
                            }
                        });
                    }
                }
                else {
                    $("#a_user_tag").prop("title","团支部");
                    $("#navbarcol ul li").eq(1).show();
                    $("#rightnow").show();
                    if(window.location.toString().split("/")[3]=="checkMat.html"){
                        bootbox.alert({
                            size:"small",
                            message:"您没有权限",
                            callback:function () {
                                window.location="index.html";
                            }
                        });
                    }
                    if(window.location.toString().split("/")[3]=="funcCenter.html"){
                        bootbox.alert({
                            size:"small",
                            message:"您没有权限",
                            callback:function () {
                                window.location="index.html";
                            }
                        });
                    }
                }
            }

        }
    });

});
function showDialog(title,content,font,func) {
    $("#myModalLabel").text(title);
    $("#model_content").text(content);
    $("#a_icon").prop("class",font);
    $('#myModal').on('hidden.bs.modal',func);
    $("#myModal").modal();
}