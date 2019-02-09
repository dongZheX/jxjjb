$(function () {
    /*
    date
     */
    Date.prototype.format = function(fmt) {
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    };
    /*
    刷新date
     */
    $.ajax({
        url:"admin/deadline.php",
        type:"post",
        dataType:"json",
        data:{action:1},
        error:function () {
            toastr.error("网络错误");
        },
        success:function (data) {
            data = JSON.parse(JSON.stringify(data));
            status = data['status'];
            if (status == 2){
                toastr.error("参数错误");
            } else if (status == 1){
                start = new Date(data['start']*1000).format("yyyy-MM-dd hh:mm:ss");
                end = new Date(data['end']*1000).format("yyyy-MM-dd hh:mm:ss");
                month = new Date(data['start']*1000).format("MM").replace("0","");
                $("#date_month").html(month);
                $("#deadline_date").html("提交日期&#58;\<strong\>"+start+"\<\/strong\>&nbsp-&nbsp\<strong\>"+end+"\<\/strong\>")

            }
        }
    })
});