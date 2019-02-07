$(function () {
    $("#navbarcol li").click(function () {
        $(this).addClass("active").siblings().removeClass("active")
        /*启用选项卡*/
        $("#myTab a").click(function(e){
            e.preventDefault();/*不要执行与事件有关的默认动作*/
            $(this).tab('show');
        })
    });
    $("#edit_info_gg").submit(function () {
        showDialog("询问")
        return false;
    })

});
