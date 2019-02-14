$(function () {
    InitselectIf2();
    $("input[name='who']").change(function () {
        if($("#radio_txz").is(":checked")){
            $("#select_dept").prop("disabled",null);
            $("#select_y_s2").prop("disabled","disabled");
            $("#select_m_s2").prop("disabled","disabled");
            $("#select_class_s2").prop("disabled","disabled");
        }else if($("#radio_tzb").is(":checked")){
            $("#select_dept").prop("disabled","disabled");
            $("#select_y_s2").prop("disabled",null);
            $("#select_m_s2").prop("disabled",null);
            $("#select_class_s2").prop("disabled",null);
        }
    })
    let ot = new TableInits2();
    ot.Init();
    $("#btn_txl").click(function () {
        $('#tb_txl').bootstrapTable("refresh",{
            url:"admin/txl.php"
        })
    })
});
//初始化搜索
function InitselectIf2() {
    //这个初始化要改
    let username = "20160101";
    let select_y = $("#select_y_s2");
    let select_m = $("#select_m_s2");
    let select_class = $("#select_class_s2");
    let now_Y = new Date().getFullYear();
    let now_m = new Date().getMonth()+1;
    //初始化年级
    if (now_m<9) select_y.html("<option>全部</option><option>"+(now_Y-1)+"</option>"+ "<option>"+(now_Y-2)+"</option>"+ "<option>"+(now_Y-3)+"</option>");
    else select_y.html("<option>全部</option><option>"+now_Y+"</option>"+ "<option>"+(now_Y-1)+"</option>"+ "<option>"+(now_Y-2)+"</option>");
    //初始化专业
    $.getJSON("data/major_id.json",function (data) {
        data = JSON.parse(JSON.stringify(data));
        let appended = "";
        select_m.append("<option>全部</option>");
        console.log(Object.values(data));
        Object.values(data).forEach(function (value) {
            appended = appended +  "<option>"+value+"</option>";
        });
        select_m.append(appended);
        select_m.val("全部");
        select_class.append(
            "<option>全部</option>"+
            "<option>01</option>"+
            "<option>02</option>"+
            "<option>03</option>"
        );
        //假设设置
        select_y.val("全部");
        select_class.val("全部");
    });
}
//初始化表格和点击事件
let TableInits2= function () {
    let oTableInitt = new Object();
    //初始化Table
    oTableInitt.Init = function () {
        $('#tb_txl').bootstrapTable({
            contentType: "application/x-www-form-urlencoded",
            url:"",
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: true,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 9,                       //每页的记录行数（*）
            pageList: [4, 5, 6,8,9],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 700,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            queryParamsType:"",
            queryParams:function(params){
                if($("#radio_txz").is(":checked")){
                    return {
                        action:1,
                        dept:$("#select_dept").get(0).selectedIndex
                    }
                }else if($("#radio_tzb").is(":checked")){
                    return{
                        action:2,
                        select_y:$("#select_y_s2").val(),
                        select_m:$("#select_y_s2").val(),
                        select_class:$("#select_class_s2").val()
                    };
                }
            },
            columns: [{
                field: 'id',
                title: '用户名',
                align:"center",
                valign:"middle",
            }, {
                field: 'name',
                title: '姓名',
                align:"center",
                valign:"middle",

            }, {
                field: 'toWho',
                title: '所属',
                align:"center",
                valign:"middle",
            },{
                field: 'tel',
                title: '电话号码',
                align:"center",
                valign:"middle"
            }]

        });
    };
    return oTableInitt;
};