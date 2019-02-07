//验证登录
//本地保存密码等
$(function () {
    //初始化吐司框
    toastr.options = {
        closeButton: true,                                            // 是否显示关闭按钮，（提示框右上角关闭按钮）
        onclick: null,                                                     // 点击消息框自定义事件 
        showDuration: "300",                                      // 显示动画的时间
        hideDuration: "1000",                                     //  消失的动画时间
        timeOut: "2000",                                             //  自动关闭超时时间 
        extendedTimeOut: "1000",                             //  加长展示时间
        showEasing: "swing",                                     //  显示时的动画缓冲方式
        hideEasing: "linear",                                       //   消失时的动画缓冲方式
        showMethod: "fadeIn",                                   //   显示时的动画方式
        hideMethod: "fadeOut"                                   //   消失时的动画方式
    };
    //开启检测
    $("#login_form").validate({
        onsubmit:true,// 是否在提交是验证
        onfocusout:false,// 是否在获取焦点时验证
        onkeyup :false,// 是否在敲击键盘时验证
    });
   //检测是否记住密码
   let isRemember = $.cookie("isRemember");
   let psw = null;
   let username = null;
   let flag = true;
   if(isRemember==1){
        //如果记住密码，则自动勾选并且载入密码框
        $("#isR_checkbox").prop("checked",true);
        psw = $.cookie("jx_password");
        username = $.cookie("jx_username");
        $("#jx_psw").val(psw);
        $("#jx_username").val(username);
   }
   //表单点击事件
   $("#jx_btn_login").click(function () {
       if($("#login_form").valid()&&flag){
           let result = 0;
            flag = false;
           $.ajax({
               url:"/admin/login.php",
               type:"post",
               data:{
                   username:$("#jx_username").val(),
                   password:$("#jx_psw").val(),
               },
               success:function (data) {
                   data = JSON.parse(JSON.stringify(data));
                   if(data["status"]===1){
                       toastr.success("登陆成功");
                       if(!$("#isR_checkbox").is(":checked")){
                           $.cookie("isRemember",0);
                           $.cookie("jx_username",null);
                           $.cookie("jx_password",null);
                       }else  {
                           $.cookie("isRemember",1, { expires: 7 });
                           $.cookie("jx_username",$("#jx_username").val(), { expires: 7 });
                           $.cookie("jx_password",$("#jx_psw").val(), { expires: 7 });
                       }
                       //登录成功后才生效
                       window.location="index.html";
                   }
                   else if(data["status"]===2){
                       toastr.success("用户名密码错误");
                       flag = true;
                       $("#jx_psw").val("");
                   }
                   else if(data["status"]===3){
                       toastr.success("提交失败");
                       flag = true;
                   }
               },
               dataType:"json",
               error:function () {
                   toastr.success("网络错误");
                   $("#jx_psw").val("");
                   flag = true;
               }
           });

           return false;
       }
       return false;
   });
   //清空按钮
    $(".remove_text").click(function () {
       $(this).siblings(":input").val("");
    });
});
