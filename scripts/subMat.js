$(function () {
    let oTable = new TableInit();
    //初始化表格
    oTable.Init();
    //初始化thickbox
    $('#tb_upload').on('post-body.bs.table', function (e, arg1, arg2){
        tb_init('a.thickbox, area.thickbox, input.thickbox');
    });
    //添加提交按钮点击事件
    $("#btn_addMat").click(function () {
            $("#addModal").modal({backdrop:false});
            $("#commit_form").validate();
        }
    );
    $("#alter_form").submit(function () {
        let row = JSON.parse($.cookie("presentRow"));

        let index = $.cookie("presentIndex");
        if($("#alter_form").valid()){
            bootbox.confirm({
                size:"small",
                message:"你确定要修改吗",
                callback:function (res) {
                    if(res){
                        let formData_re = new FormData($("#alter_form")[0]);
                        formData_re.append("action","3");
                        formData_re.append("plus_id",row.plus_id);
                        formData_re.append("plus_Certificate",row.plus_Certificate);
                        $.ajax({
                            url:"admin/commitMat.php",
                            type:"post",
                            dataType:"json",
                            data:formData_re,
                            contentType: false,
                            processData:false,
                            error:function () {
                                toastr.error("错误");
                            },
                            success:function (data) {
                                data = JSON.parse(JSON.stringify(data));
                                if(data['status']==1){
                                    let datat = {
                                        "plus_Certificate":data['plus_Certificate'],
                                        "plus_state":"未审核",
                                        "plus_keywords":$("#re_MatName").val(),
                                        "plus_item_B":$("#re_MatFor").val(),
                                        "plus_point_submitted":$("#re_MatScore").val(),
                                        "plus_audit_note":row.plus_audit_note,
                                        "plus_audit_employee":row.plus_audit_employee
                                    };
                                    console.log(datat);
                                    $("#tb_upload").bootstrapTable("updateRow",{index:index,row:datat});
                                    // row.plus_Certificate = data['plus_Certificate'];
                                    // row.plus_state = "未审核";
                                    // row.plus_keywords = formdata.get("plus_keywords");
                                    // row.plus_item_B = formdata.get("plus_item_B");
                                    // row.plus_point_submitted = formdata("plus_point_submitted");
                                    toastr.success("修改成功");
                                    $("#re_addModal").modal("hide");
                                }
                                else{
                                    toastr.error("修改失败");
                                }

                            }
                        })
                    }
                }
            });
        }
        return false;
    })
    //提交材料表单提交
    $("#commit_form").submit(function () {
        if($("#commit_form").valid()){
            let formData = new FormData($("#commit_form")[0]);
            formData.append("action","1");
            console.log(formData);
            //其他不管
            bootbox.confirm({
                size:"small",
                message:"您确认要提交吗?",
                callback:function (result) {
                    if (result){
                        $.ajax({
                            url:"admin/commitMat.php",
                            dataType:"json",
                            type:"post",
                            data:formData,
                            contentType: false,
                            processData:false,
                            error:function () {
                                toastr.error("网络错误，提交失败");
                            },
                            success:function(data){
                                data = JSON.parse(JSON.stringify(data));
                                if(data['status']==1){
                                    toastr.success("提交成功");
                                    $("#commit_form").bootstrapTable("resetSearch");
                                    data = data['data'];
                                    newdata = {
                                        index:1,
                                        row:{
                                            plus_Certificate:data['plus_Certificate'],
                                            plus_id:data['plus_id'],
                                            plus_keywords:data['plus_keywords'],
                                            plus_big_B:data['plus_big_B'],
                                            plus_point_submitted:data['plus_point_submitted']
                                        }
                                    };
                                    $("#tb_upload").bootstrapTable("insertRow",newdata);
                                    $("#addModal").modal("hide");
                                }else{
                                    toastr.error("提交失败");
                                }


                            }
                        })
                    }
                }
            });
        }
        return false;
    });

});
//初始化表格和点击事件
let TableInit = function () {
    let oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_upload').bootstrapTable({
            url:'admin/commitMat.php?action=2',
            data:"",
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: true,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: function (params) {
                //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

            },//传递参数（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 6,                       //每页的记录行数（*）
            pageList: [4, 5, 6,8,9],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: false,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 700,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
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
                valign:"middle"
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
                events: operateEvents,
                formatter: operateFormatter
            }]
        });
    };
    //得到查询的参数
    oTableInit.queryParams = function (params) {

    };
    return oTableInit;
};
function operateFormatter(value, row, index) {
    return [
        '<button type="button" class="RoleOfdelete btn btn-link  btn-sm" style="margin-right:5px;">删除</button>',
        '<button type="button" class="RoleOfedit btn btn-link  btn-sm" style="margin-right:5px;">修改</button>',
        '<button type="button" class="RoleOfconfirm btn btn-link  btn-sm" style="margin-right:5px;">确认</button>'
    ].join('');
}
window.operateEvents = {
    'click .RoleOfdelete': function (e, value, row, index) {
        bootbox.confirm({
            size:"small",
            message:"您确定要删除码，删除后将无法撤销！",
            callback:function (res ){
                if (res){
                    $.ajax({
                        url:"admin/commitMat.php?action=5",
                        type:"post",
                        dataType:"json",
                        data:{action:"5",plus_id:row.plus_id},
                        error:function () {
                            toastr.error("错误");
                        },
                        success:function (data) {
                            data = JSON.parse(JSON.stringify(data));
                            if (data['status']==1){
                                toastr.success("删除成功！");
                                $("#tb_upload").bootstrapTable("remove",{field:'plus_id',values:row.plus_id});
                            }
                            else{
                                toastr.error("删除失败！");
                            }
                        }
                    })
                }
            }
        })
    },
    'click .RoleOfedit': function (e, value, row, index) {
        $("#re_MatName").val(row.plus_keywords);
        $("#re_MatFor").val(row.plus_item_B);
        $("#re_MatScore").val(row.plus_point_submitted);
        $("#re_addModal").modal({backdrop:false});
        $("#alter_form").validate();
        $.cookie("presentRow",JSON.stringify(row));
        $.cookie("presentIndex",index);
        //修改材料表单提交

    },
    'click .RoleOfconfirm': function (e, value, row, index) {
        bootbox.confirm({
            size:"small",
            message:"您确定要确认吗，确认后将无法更改！",
            callback:function (res) {
                if (res){
                    $.ajax({
                        url:"admin/commitMat.php",
                        type:"post",
                        dataType:"json",
                        data:{action:"4",plus_id:row.plus_id},
                        error:function () {
                            toastr.error("错误");
                        },
                        success:function (data) {
                            data = JSON.parse(JSON.stringify(data));
                            if (data['status']==1){
                                toastr.success("确认成功");
                                $("#tb_upload").bootstrapTable("updateCell",{
                                    index:index,
                                    field:'plus_state',
                                    value:'已确认'
                                })
                            }else{
                                toastr.error("确认失败");
                            }

                        }
                    })
                }
            }
        })
    }
};
//初始化表格和点击事件结束
//是否能提交验证
$(function () {
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
                start = data['start'];
                end = data['end'];
                //需要测试
                now = Date.parse(new Date())/1000;
                if(now<start||now>end){
                    $("#btn_addMat").hide();
                    $("#tb_upload").hide();
                    $("#matsubmit").append(
                        "<p>当前截止日期已过</p>"
                    )
                }
            }
        }
    })
})