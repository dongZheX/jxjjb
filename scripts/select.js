$(function () {
    InitselectIf();
    let ot = new TableInits1();
    ot.Init();
    $("#select1_btn").click(function () {
        $("#tb_select1").bootstrapTable("refresh",{
            url:"admin/select_add_1.php"
        })
    });
    $('#tb_select1').on('post-body.bs.table', function (e, arg1, arg2){
        tb_init('a.thickbox, area.thickbox, input.thickbox');
    });
});
//初始化搜索
function InitselectIf() {
    //这个初始化要改
    let username = "20160101";
    let select_y = $("#select_y_s1");
    let select_m = $("#select_m_s1");
    let select_year = $("#select_year_s1");
    let select_mon = $("#select_mon_s1");
    let select_class = $("#select_class_s1");
    let select_state = $("#select_state_s1");
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
        select_state.append(
            "<option>全部</option>"+
            "<option>未审核</option>"+
            "<option>审核未通过</option>"+
            "<option>审核通过</option>"+
            "<option>已确认</option>"
        );
        //假设设置
        select_y.val("全部");
        select_class.val("全部");
    });
    //初始化时间
    if(now_m<=12&&now_m>=9){
        select_year.append('<option>'+now_Y+'</option>'+'<option>'+(now_Y-1)+'</option>')
        select_year.val(now_Y);
        for(let i=1;i<=now_m;i++)select_mon.append('<option>'+i+'</option>');
        select_mon.val(now_m);
        select_year.change(function () {
            if(select_year.val()==(now_Y-1)){
                select_mon.html("");
                for(let i=9;i<=12;i++)select_mon.append('<option>'+i+'</option>');
                select_mon.val("9");
            }else {
                select_mon.html("");
                for(let i=1;i<=now_m;i++)select_mon.append('<option>'+i+'</option>');
                select_mon.val(now_m);
            }
        })
    }else{
        select_year.append('<option>'+now_Y+'</option>'+'<option>'+(now_Y-1)+'</option>'+'<option>'+(now_Y-2)+'</option>')
        select_year.val(now_Y);
        for(let i=1;i<=now_m;i++)select_mon.append('<option>'+i+'</option>');
        select_mon.val(now_m);
        select_year.change(function () {
            if(select_year.val()==((now_Y-1))){
                select_mon.html("");
                for(let i=1;i<=12;i++)select_mon.append('<option>'+i+'</option>');
                select_mon.val("1");
            }else if(select_year.val()==((now_Y))){
                select_mon.html("");
                for(let i=1;i<=now_m;i++)select_mon.append('<option>'+i+'</option>');
                select_mon.val(now_m);
            }else{
                select_mon.html("");
                for(let i=9;i<=12;i++)select_mon.append('<option>'+i+'</option>');
                select_mon.val("9");
            }
        })
    }
}
//初始化表格
//初始化表格和点击事件
let TableInits1 = function () {
    let oTableInitc = new Object();
    //初始化Table
    oTableInitc.Init = function () {
        $('#tb_select1').bootstrapTable({
            contentType: "application/x-www-form-urlencoded",
            url:"",
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: true,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
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
            uniqueId: "plus_id",                     //每一行的唯一标识，一般为主键列
            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            queryParamsType:"",
            queryParams:function(params){
                return {
                    "select_y":$("#select_y_s1").val(),
                    "select_m":$("#select_m_s1").val(),
                    "select_class":$("#select_class_s1").val(),
                    "select_state":$("#select_state_s1").get(0).selectedIndex,
                    "select_year":$("#select_year_s1").val(),
                    "select_mon":$("#select_mon_s1").val(),
                    "select_key":$("#select1_key").val(),
                    "select_item_b":$("#select1_itemB").get(0).selectedIndex,
                    "offset":params.pageNumber,
                    "size":params.pageSize,
                    "action":1
                };
            },
            columns: [{
                field: 'plus_id',
                visible:false
            }, {
                field: 'plus_keywords',
                title: '材料名',
                align:"center",
                valign:"middle",

            }, {
                field: 'class_id',
                title: '班级名',
                align:"center",
                valign:"middle",
            },{
                field: 'plus_item_B',
                title: '所属大项',
                align:"center",
                valign:"middle"
            }, {
                field: 'plus_item_S',
                title: '所属小项',
                align:"center",
                valign:"middle"
            }, {
                field: 'plus_point_submitted',
                title: '应加分',
                align:"center",
                valign:"middle"
            },{
                field: 'plus_point_checked',
                title: '审核加分',
                align:"center",
                valign:"middle"
            }, {
                field: 'plus_state',
                title: '审核状态',
                align:"center",
                valign:"middle",
                formatter:function (value,row,index) {
                    if (row.plus_state=="未审核"){
                        return '<p><span class="glyphicon glyphicon-upload"></span>未审核</p>'
                    }
                    else if(row.plus_state=="审核通过"){
                        return '<p style="color: mediumseagreen;"><span class="glyphicon glyphicon-ok-circle"></span>审核通过</p>'
                    }
                    else if(row.plus_state=="审核未通过"){
                        return '<p style="color: darkred;"><span class="glyphicon glyphicon-remove-circle"></span>审核未通过</p>'
                    }
                    else if(row.plus_state=="已确认"){
                        return '<p style="color: black;"><span class="glyphicon glyphicon-ban-circle"></span>已确认</p>'
                    }
                }
            },{
                field: 'plus_audit_note',
                title: '审核描述',
                align:"center",
                valign:"middle"
            }, {
                field: 'plus_audit_employee',
                title: '审核人',
                align:"center",
                valign:"middle"
            }, {
                field: 'plus_Certificate',
                title: '证明材料',
                valign:"middle",
                align:"center",
                formatter: function(value,row,index){
                    hz = row.plus_Certificate.split(".")[1];
                    if(hz=="jpg"||hz=="png"||hz=="gif")
                        return '<a class="thickbox"  href="'+row.plus_Certificate+'"><img style="width: 60px;height: 60px" src="'+row.plus_Certificate+'" class="img-rounded thickbox" ></a>';
                    else{
                        return '<a class="media" href="'+row.plus_Certificate+'">点我下载'+hz+'</a>';
                    }
                },
            }],

        });
    };
    return oTableInitc;
};