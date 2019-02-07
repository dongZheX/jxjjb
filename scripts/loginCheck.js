$(function () {
    $.ajax({
        url:"/admin/loginCheck.php",
        type:"post",
        dataType:"json",
        success:function (data) {
            data = JSON.parse(JSON.stringify(data));
            if (data["status"]==0){
                showDialog("警告","请先登录","glyphicon glyphicon-exclamation-sign",function () {
                    window.location = "login.html";
                })
            }
            else{
                if (data["user_tag"]==1){
                    $("#a_user_tag").prop("title","团学组织");
                    $("#edit").show();
                }
                else {
                    $("#a_user_tag").prop("title","团支部");
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