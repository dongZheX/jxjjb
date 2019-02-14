
$(function () {
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //初始化下拉列表
    initSelect();

    //定义查询按钮方法
    $("#btn_query").click(function () {
        //清除表格内容
        $("#tb_departments").bootstrapTable('removeAll');
        //转到查询php
        $("#tb_departments").bootstrapTable("refresh",{
            url:"admin/table.php",
        })

    });
});
//表格初始化
var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: '',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            queryParamsType:"",
            columns:[
                [
                    {
                        field:"class_id",
                        title:"班级",
                        align:"center",
                        valign:"middle",
                        width:80,
                        rowspan:2,
                    },
                    {
                        field:"ideologically_driven",
                        title:"思政建设",
                        align:"center",
                        valign:"middle",
                        colspan:3,
                    },
                    {
                        field:"media_driven",
                        title:"新媒体建设",
                        align:"center",
                        valign:"middle",
                        colspan:5
                    },
                    {
                        field:"study_driven",
                        title:"学风建设",
                        align:"center",
                        valign:"middle",
                        colspan:5
                    },
                    {
                        field:"system_driven",
                        title:"纪律及制度建设",
                        align:"center",
                        valign:"middle",
                        colspan:4
                    },
                    {
                        field:"technology",
                        title:"科技创新",
                        align:"center",
                        valign:"middle",
                        colspan:5
                    },
                    {
                        field:"practice_volunteer",
                        title:"实践及志愿服务",
                        align:"center",
                        valign:"middle",
                        colspan:3
                    },
                    {
                        field:"school_cultural",
                        title:"校园文化活动",
                        align:"center",
                        valign:"middle",
                        colspan:3
                    },
                    {
                        field:"class_cultural",
                        title:"班级活动",
                        align:"center",
                        valign:"middle",
                        colspan:4
                    },
                    {
                        field:"dormitory",
                        title:"宿舍情况",
                        align:"center",
                        valign:"middle",
                        colspan:3
                    },
                    {
                        field:"other",
                        title:"其他",
                        align:"center",
                        valign:"middle",
                        colspan:4,
                    },
                    {
                        field:"total",
                        title:"合计",
                        align:"center",
                        valign:"middle",
                        rowspan:2,
                        width:100,
                        sortOrder: "des"
                    }
                ],
                [
                    {
                        field:"1",
                        align:"center",
                        valign:"middle",
                        title:"入党申请书",
                    },
                    {
                        field:"2",
                        align:"center",
                        valign:"middle",
                        title:"主题团日",
                    },
                    {
                        field:"3",
                        align:"center",
                        valign:"middle",
                        title:"主题教育立项",
                    },
                    {
                        field:"4",
                        align:"center",
                        valign:"middle",
                        title:"微博微信建设",
                    },
                    {
                        field:"5",
                        align:"center",
                        valign:"middle",
                        title:"青年之声建设",
                    },
                    {
                        field:"6",
                        align:"center",
                        valign:"middle",
                        title:"新媒体思政类活动",
                    },
                    {
                        field:"7",
                        align:"center",
                        valign:"middle",
                        title:"网络宣传工作",
                    },
                    {
                        field:"8",
                        align:"center",
                        valign:"middle",
                        title:"创新性成果",
                    },
                    {
                        field:"9",
                        align:"center",
                        valign:"middle",
                        title:"团干部成绩",
                    },
                    {
                        field:"10",
                        align:"center",
                        valign:"middle",
                        title:"成绩警示",
                    },
                    {
                        field:"11",
                        align:"center",
                        valign:"middle",
                        title:"奖学金",
                    },
                    {
                        field:"12",
                        align:"center",
                        valign:"middle",
                        title:"学习经验交流会",
                    },
                    {
                        field:"13",
                        align:"center",
                        valign:"middle",
                        title:"通过国家等级考试",
                    },
                    {
                        field:"14",
                        align:"center",
                        valign:"middle",
                        title:"会议出勤和材料上交",
                    },
                    {
                        field:"15",
                        align:"center",
                        valign:"middle",
                        title:"课堂考勤",
                    },
                    {
                        field:"16",
                        align:"center",
                        valign:"middle",
                        title:"学校、学院处分",
                    },
                    {
                        field:"17",
                        align:"center",
                        valign:"middle",
                        title:"考勤制度、财务制度",
                    },
                    {
                        field:"18",
                        align:"center",
                        valign:"middle",
                        title:"文章发表",
                    },
                    {
                        field:"19",
                        align:"center",
                        valign:"middle",
                        title:"挑战杯",
                    },
                    {
                        field:"20",
                        align:"center",
                        valign:"middle",
                        title:"科研立项",
                    },
                    {
                        field:"21",
                        align:"center",
                        valign:"middle",
                        title:"其他科技竞赛",
                    },
                    {
                        field:"22",
                        align:"center",
                        valign:"middle",
                        title:"国家专利",
                    },
                    {
                        field:"23",
                        align:"center",
                        valign:"middle",
                        title:"暑期社会实践",
                    },
                    {
                        field:"24",
                        align:"center",
                        valign:"middle",
                        title:"寒假社会实践",
                    },
                    {
                        field:"25",
                        align:"center",
                        valign:"middle",
                        title:"志愿服务活动",
                    },
                    {
                        field:"26",
                        align:"center",
                        valign:"middle",
                        title:"文艺演出活动",
                    },
                    {
                        field:"27",
                        align:"center",
                        valign:"middle",
                        title:"文体竞赛活动",
                    },
                    {
                        field:"28",
                        align:"center",
                        valign:"middle",
                        title:"运动会",
                    },
                    {
                        field:"29",
                        align:"center",
                        valign:"middle",
                        title:"班级特色活动",
                    },
                    {
                        field:"30",
                        align:"center",
                        valign:"middle",
                        title:"竞赛活动",
                    },
                    {
                        field:"31",
                        align:"center",
                        valign:"middle",
                        title:"承办及协办活动",
                    },
                    {
                        field:"32",
                        align:"center",
                        valign:"middle",
                        title:"活动宣传",
                    },
                    {
                        field:"33",
                        align:"center",
                        valign:"middle",
                        title:"星级文明宿舍",
                    },
                    {
                        field:"34",
                        align:"center",
                        valign:"middle",
                        title:"以宿舍为单位的竞赛活动",
                    },
                    {
                        field:"35",
                        align:"center",
                        valign:"middle",
                        title:"宿舍卫生及纪律",
                    },
                    {
                        field:"36",
                        align:"center",
                        valign:"middle",
                        title:"各项其他荣誉称号",
                    },
                    {
                        field:"37",
                        align:"center",
                        valign:"middle",
                        title:"军训",
                    },
                    {
                        field:"38",
                        align:"center",
                        valign:"middle",
                        title:"配合团学组织工作",
                    },
                    {
                        field:"39",
                        align:"center",
                        valign:"middle",
                        title:"其他难以区分的项目",
                    }
                ]
            ],
            sortable:true,
            sortName:"total",
            setOrder:"desc",
            showExport: true,
            exportDataType: "basic",
            buttonsAlign:"right",  //按钮位置
            exportTypes:['excel','xlsx'],  //导出文件类型
            exportOptions:{//导出设置
                fileName: '汇总表',
                worksheetName:'sheet1',
                tableName: '汇总表'
            },
            Icons:'glyphicon-export',//导出按钮设置
            //表格加载成功后
            onLoadSuccess:function () {
                var type = $('#select_Y option:selected').text();
                var isTop = $('#select_T option:selected').text();
                //判断是否需要合并单元格
                //只有type=学年且isTop=是的时候才需要合并
                if(type.length < 10 && isTop == "是") {
                    //获取表格记录数
                    var lenth = $('#tb_departments').bootstrapTable('getOptions').totalRows;
                    for (var i = 0; i < lenth; i++) {
                        $('#tb_departments').bootstrapTable('mergeCells', {
                            index: i,
                            field: "18",
                            colspan: 5
                        });
                    }
                }
            },
            onSort:function () {
                var type = $('#select_Y option:selected').text();
                var isTop = $('#select_T option:selected').text();
                //判断是否需要合并单元格
                //只有type=学年且isTop=是的时候才需要合并
                if(type.length < 10 && isTop == "是") {
                    //获取表格记录数
                    var lenth = $('#tb_departments').bootstrapTable('getOptions').totalRows;
                    for (var i = 0; i < lenth; i++) {
                        $('#tb_departments').bootstrapTable('mergeCells', {
                            index: i,
                            field: "18",
                            colspan: 5
                        });
                    }
                }
            }
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            // limit: params.limit,   //页面大小
            // offset: params.offset,  //页码
            select_Y:$('#select_Y option:selected').text(),
            select_M:$('#select_M option:selected').text(),
            select_G:$('#select_G option:selected').text(),
            select_T:$('#select_T option:selected').text()
        };
        return temp;
    };
    return oTableInit;
};

//初始化下拉列表
function initSelect() {
    var select_year = $('#select_Y');
    var select_month = $('#select_M');
    var select_grade = $('#select_G');
    var year, month;
    var date = new Date();
    var now_year = date.getFullYear();
    for(year = 2016; year <= now_year; year++){
        select_year.append(
            "<option>"+year+"-"+(year + 1)+"</option>>"+
            "<option>"+year+"-"+(year + 1)+"(1)</option>>"+
            "<option>"+year+"-"+(year + 1)+"(2)</option>>"
        )
        select_grade.append(
            "<option>"+year+"</option>>"
        )
    }

}
//二级联动 学年和月份
function set_month() {
    var select_month = $('#select_M');
    var selected_year = $('#select_Y option:selected').text();
    var num = selected_year.substr(10,1);
    if(num == "1"){
        select_month.empty();
        select_month.append(
            "<option>"+"请选择"+"</option>>"+
            "<option>"+9+"</option>>"+
            "<option>"+10+"</option>>"+
            "<option>"+11+"</option>>"+
            "<option>"+12+"</option>>"+
            "<option>"+1+"</option>>"+
            "<option>"+2+"</option>>"
        )
    }
    else if(num == "2"){
        select_month.empty();
        select_month.append(
            "<option>"+"请选择"+"</option>>"+
            "<option>"+3+"</option>>"+
            "<option>"+4+"</option>>"+
            "<option>"+5+"</option>>"+
            "<option>"+6+"</option>>"+
            "<option>"+7+"</option>>"+
            "<option>"+8+"</option>>"
        )
    }
    else
        select_month.empty();
        select_month.append(
            "<option>"+"请选择"+"</option>>"
        )
}
//二级联动 月份和是否封顶
function set_isTop() {
    var select_month = $('#select_M option:selected').text();
    var isTop = $('#select_T');
    if(select_month == "请选择"){
        isTop.empty();
        isTop.append(
            "<option>"+"是"+"</option>"+
            "<option>"+"否"+"</option>"
        )
    }
    else{
        isTop.empty();
        isTop.append(
            "<option>"+"否"+"</option>"
        )
    }
}




