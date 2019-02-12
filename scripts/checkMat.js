$(function () {
    $("#check_btn").click(function () {
        $("#tb_check").bootstrapTable("refresh",{
            url:"admin/checkMat.php"
        })
    });
    InitSelect();
    let table = new TableInitc();
    table.Init();

    //thickbox
    $('#tb_check').on('post-body.bs.table', function (e, arg1, arg2){
        tb_init('a.thickbox, area.thickbox, input.thickbox');
    });
    $("#check_form").validate();
    //提交时间
    $("#check_form").submit(function () {
        let row = JSON.parse($.cookie("check_row"));
        let index = $.cookie("check_index");
        if($("#check_form").valid()){
            bootbox.confirm({
                size:"small",
                message:"确定提交审核？",
                callback:function (result) {
                    if(result)
                    $.ajax({
                        url:"admin/checkMat.php",
                        type:"post",
                        dataType:"json",
                        data:{
                            action:"2",
                            plus_audit_note:$("#ckMatDes").val(),
                            plus_point_checked:$("#ckMatScore").val(),
                            plus_item_S:$("#ckMatFor").val(),
                            plus_item_B:$("#ckMatFor_B").val(),
                            plus_id:row.plus_id
                        },
                        error:function () {
                            toastr.error("网络错误");
                        },
                        success:function (data) {
                            data = JSON.parse(JSON.stringify(data));
                            if(data['status']==1){
                                newdata = {
                                    "plus_keywords":row.plus_keywords,
                                    "plus_item_B":$("#ckMatFor_B").val(),
                                    "plus_item_S":$("#ckMatFor").val(),
                                    "plus_point_submitted":row.plus_point_submitted,
                                    "plus_point_checked":$("#ckMatScore").val(),
                                   "plus_state":$("#ckMatScore").val()<row.plus_point_submitted?"审核未通过":"审核通过",
                                    "plus_audit_note":$("#ckMatDes").val(),
                                    "plus_audit_employee":data['plus_audit_employee'],
                                    "plus_Certificate":row.plus_Certificate
                                };
                                $("#tb_check").bootstrapTable("updateRow",{index:index,row:newdata});
                                toastr.success("审核成功");
                                $("#check_modal").modal("hide");
                            }
                            else {
                                toastr.error("审核失败");
                            }
                        }
                    })
                }
            })

        }
        return false;
    });
    $("#ckMatFor_B").change(function () {
        let value = $("#ckMatFor_B").val();
        $.getJSON("data/big_item_small.json",function (data) {
            $.getJSON("data/big_item.json",function (td1) {
                td1 = JSON.parse(JSON.stringify(td1));
                indext = Object.values(td1).indexOf(value)+1;
                $.getJSON("data/small_item.json",function (td2) {
                    data2 = JSON.parse(JSON.stringify(td2));
                    data = JSON.parse(JSON.stringify(data));
                    data = data[indext];
                    $("#ckMatFor").html("");
                    data.forEach(function (value) {
                        $("#ckMatFor").append(
                            '<option>'+data2[value]+'</option>'
                        )
                    });
                });
            });
        });
    })
});
function InitSelect() {
    //这个初始化要改
    let username = "20160101";
    let select_y = $("#select_y_c");
    let select_m = $("#select_m_c");
    let select_class = $("#select_class_c");
    let select_state = $("#select_state_c");
    let now_Y = new Date().getFullYear();
    let now_m = new Date().getMonth()+1;
    if (now_m<9) select_y.append("<option>"+now_Y-1+"</option>"+ "<option>"+(now_Y-2)+"</option>"+ "<option>"+(now_Y-3)+"</option>");
    else select_y.append("<option>"+now_Y+"</option>"+ "<option>"+(now_Y-1)+"</option>"+ "<option>"+(now_Y-2)+"</option>")

    $.getJSON("data/major_id.json",function (data) {
        data = JSON.parse(JSON.stringify(data));
        let appended = "";
        console.log(Object.values(data));
        Object.values(data).forEach(function (value) {
            appended = appended +  "<option>"+value+"</option>";
        });
        select_m.append(appended);
        select_m.val(data[username.substring(4,6)]);
        select_class.append(
            "<option>01</option>"+
            "<option>02</option>"
        );
        select_state.append(
            "<option>全部</option>"+
            "<option>未审核</option>"+
            "<option>审核未通过</option>"+
            "<option>审核通过</option>"+
            "<option>已确认</option>"
        );
        //假设设置
        select_y.val(username.substring(0,4));
        select_class.val(username.substring(6,8));
    });

}
//初始化表格和点击事件
let TableInitc = function () {
    let oTableInitc = new Object();
    //初始化Table
    oTableInitc.Init = function () {
        $('#tb_check').bootstrapTable({
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
                  "select_y":$("#select_y_c").val(),
                  "select_m":$("#select_m_c").val(),
                  "select_class":$("#select_class_c").val(),
                  "select_state":$("#select_state_c").get(0).selectedIndex,
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
                searchable:true
            }, {
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
            }, {
                field: 'operator',
                title: '操作',
                align:"center",
                valign:"middle",
                events: operateEvents,
                formatter: operateFormatter
            }]
        });
    };
    return oTableInitc;
};
function operateFormatter(value, row, index) {
    return [
        '<button type="button" class="RoleOfcheck btn btn-link">审核</button>'
    ].join('');
}
window.operateEvents = {
    'click .RoleOfcheck': function (e, value, row, index) {
        if(row.plus_state=="已确认"){
            toastr.info("已确认，无法审核");
            return;
        }
        $.cookie("check_row",JSON.stringify(row));
        $.cookie("check_index",index);
        let plus_item_B = row.plus_item_B;
        //加载框内容
        $.getJSON("data/big_item_small.json",function (data) {
            $.getJSON("data/big_item.json",function (td1) {
                td1 = JSON.parse(JSON.stringify(td1));
                indext = Object.values(td1).indexOf(plus_item_B)+1;
                $.getJSON("data/small_item.json",function (td2) {
                    data2 = JSON.parse(JSON.stringify(td2));
                    data = JSON.parse(JSON.stringify(data));
                    data = data[indext];
                    $("#ckMatFor").html("");
                    data.forEach(function (value) {
                        $("#ckMatFor").append(
                            '<option>'+data2[value]+'</option>'
                        )
                    });
                    $("#ckMatScore").val(row.plus_point_checked);
                    $("#ckMatFor").val(row.plus_item_S);
                    $("#ckMatDes").val(row.plus_audit_note);
                    $("#ckMatFor_B").val(row.plus_item_B);
                    $("#ckMatFor").find("option").first().attr("selected",true);
                    $("#check_modal").modal("show");
                    $("#myModalLabel3").text(row.plus_keywords+":审核材料");
                });
            });
        });
    },
};
//初始化表格和点击事件结束