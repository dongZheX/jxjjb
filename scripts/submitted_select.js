$(function () {
    $("#submitted_btn").click(function () {
        $("#tb_submitted").bootstrapTable("refresh",{
            url:"admin/submitted_select.php"
        });
    });
    InitSelect();
    let s_t = new TableInits();
    s_t.Init();
    $('#tb_submitted').on('post-body.bs.table', function (e, arg1, arg2){
        tb_init('a.thickbox, area.thickbox, input.thickbox');
    });
});
function InitSelect() {
    let username = "20160201";
    let select_y = $("#select_y");
    let select_m = $("#select_m");
    let select_class = $("#select_class");
    let now_Y = new Date().getFullYear();
    let now_m = new Date().getMonth()+1;
    if (now_m<9) select_y.append("<option>"+now_Y-1+"</option>"+ "<option>"+(now_Y-2)+"</option>"+ "<option>"+(now_Y-3)+"</option>");
    else select_y.append("<option>"+now_Y+"</option>"+ "<option>"+(now_Y-1)+"</option>"+ "<option>"+(now_Y-2)+"</option>")

    $.getJSON("data/major_id.json",function (data) {
        data = JSON.parse(JSON.stringify(data));
        let appended = "";
        Object.values(data).forEach(function (value) {
            appended = appended +  "<option>"+value+"</option>";
        });
        select_m.append(appended);
        select_m.val(data[username.substring(4,6)]);
        select_class.append(
            "<option>01</option>"+
            "<option>02</option>"+
            "<option>03</option>"
        );
        //假设设置
        select_y.val(username.substring(0,4));
        select_class.val(username.substring(6,8));
        $("#submitted_btn").click();
    });

}
let TableInits = function () {
    let oTableInits = new Object();
    //初始化Table
    oTableInits.Init = function () {
        $('#tb_submitted').bootstrapTable({
            data:"",
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: true,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 6,                       //每页的记录行数（*）
            pageList: [4, 5, 6,8,9],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 700,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            queryParams:function(){
                return {
                    "select_y":$("#select_y").val(),
                    "select_m":$("#select_m").val(),
                    "select_class":$("#select_class").val(),
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
                valign:"middle"
            }, {
                field: 'plus_item_B',
                title: '所属大项',
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
                },
            },{
                field: 'plus_audit_note',
                title: '审核描述',
                align:"center",
                valign:"middle",

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
            }]
        });
    };
    return oTableInits;
};