/*
 * @Author: Marte
 * 我的积分
 * @Date:   2017-09-24 10:17:37
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-10-11 22:55:01
 */

var getAllIntegralLogByStudentNum = "/stu/getAllIntegralLogByStudentNum";
var getProjectCategoryUrl = "/common/getAllProjectCategory";
var getIntegralLogByIntegralLogId = "/common/getIntegralLogByIntegralLogId";
var types = "GET";

$(function () {
    /*
     加载数据
     */
    ajaxs("studentNum=1522110240", "showAll", getAllIntegralLogByStudentNum)
})


function ajaxs(datas, method, urls, j) {
    $.ajax({
        type: types, // 提交方式
        url: urls,// 路径
        data: datas,//

        beforeSend: function (XMLHttpRequest) {
// progress.inc();
        },
        success: function (result) {// 返回数据根据结果进行相应的处理
            addHtmls(result, method, j)
        },
        complete: function (XMLHttpRequest, textStatus) {
// progress.done(true);
        },
        error: function () {
// progress.done(true);
        }
    });
}


function addHtmls(result, method, j) {
    var htmls = "";
    var htmlss = "";
    if (method === "showAll") {
        for (var i = 0; i < result.content.length; i++) {
            var color = "";
            var statusC = "";
            htmls += "<tr>";
            htmls += "<td class='center_td'>" + i + 1 + "</td>";
            if (result.content[i].status === "PENDING_AUDIT") {
                color = "danger";
                statusC = "待审核";
            } else if (result.content[i].status === "HAVEPASSED") {
                color = "success";
                statusC = "已通过";
            } else if (result.content[i].status === "FAILURE_TO_PASS_THE_AUDIT") {
                color = "danger";
                statusC = "未通过";
            } else if (result.content[i].status === "ALREADY_SIGN_UP") {
                color = "danger";
                statusC = "已报名";
            } else if (result.content[i].status === "SIGNED_IN") {
                color = "success";
                statusC = "已签到";
            } else if (result.content[i].status === "COMPLETED") {
                color = "success";
                statusC = "已完成";
            }
            htmls += "<td class='center_td'><button class='btn btn-mini btn-" + color + "'>" + statusC + "</button></td>";
            htmls += "<td>" + splitJson(result.content[i].event) + "</td>";
            htmls += "<td>" + result.content[i].projectName + "</td>";
            htmls += "<td>" + result.content[i].college + "</td>";
            htmls += "<td>" + result.content[i].integral + "</td>";
            htmls += "<td>";
            htmls += "<a href='#mymodal1' data-toggle='modal'><div class='message_div' onclick=ajaxs('projectNum=" + result.content[i].integralLogId.projectNum + "','details','/common/getIntegralLogByIntegralLogId','" + (i + 1) + "')>查看详情</div></a></td>";
            htmls += "</tr>";
        }
        $("#showAll").html(htmls);
    } else if (method === "details") {
        var statusC = "";
        if (result.status === "PENDING_AUDIT") {
            color = "danger";
            statusC = "待审核";
        } else if (result.status === "HAVEPASSED") {
            color = "success";
            statusC = "已通过";
        } else if (result.status === "FAILURE_TO_PASS_THE_AUDIT") {
            color = "danger";
            statusC = "未通过";
        } else if (result.status === "ALREADY_SIGN_UP") {
            color = "danger";
            statusC = "已报名";
        } else if (result.status === "SIGNED_IN") {
            color = "success";
            statusC = "已签到";
        } else if (result.status === "COMPLETED") {
            color = "success";
            statusC = "已完成";
        }

        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>编号</div>";
        htmlss += "<div class='span3'>" + j + "</div>";
        htmlss += "<div class='span3'>代码</div>";
        htmlss += "<div class='span3'>" + result.integralLogId.projectNum + "</div>";
        htmlss += "</div>";
        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>项目申请日期</div>";
        htmlss += "<div class='span3'>" + result.creatTime + "</div>";
        htmlss += "<div class='span3'>状态</div>";
        htmlss += "<div class='span3'>" + statusC + "</div>";
        htmlss += "</div>";
        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>项目类别</div>";
        htmlss += "<div class='span3'>" + splitJson(result.event) + "</div>";
        htmlss += "<div class='span3'>所属学院</div>";
        htmlss += "<div class='span3'>" + result.college + "</div>";
        htmlss += "</div>";
        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>项目名称</div>";
        htmlss += "<div class='span3'>" + result.projectName + "</div>";
        htmlss += "<div class='span3'>负责人</div>";
        htmlss += "<div class='span3' id='guidanceMan" + result.integralLogId.projectNum + "'>" + "1" + "</div>";
        htmlss += "</div>";
        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>项目内容</div>";
        htmlss += "<div class='span9' id='content" + result.integralLogId.projectNum + "'>" + "1" + "</div>";
        htmlss += "</div>";
        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>评价标准与形式</div>";
        htmlss += "<div class='span9' id='checkAssessmentCriteraAndForm" + result.integralLogId.projectNum + "'>" + "1" + "</div>";
        htmlss += "</div>";

        $("#details").html(htmlss);

        projectAjaxs("projectNum=" + result.integralLogId.projectNum, "/common/getProjectInfo", result.integralLogId.projectNum);
    }
}

function projectAjaxs(datas, url, projectNum) {
    $.ajax({
        type: types, // 提交方式
        url: url,// 路径
        data: datas,//

        beforeSend: function (XMLHttpRequest) {
        },
        success: function (result) {// 返回数据根据结果进行相应的处理
            $("#guidanceMan" + projectNum).html(result.guidanceMan);
            $("#content" + projectNum).html(result.content);
            $("#checkAssessmentCriteraAndForm" + projectNum).html(result.checkAssessmentCriteraAndForm);
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });
}

function splitJson(json) {
    var projectCategorys = new Array();
    projectCategorys.concat(json.split(" >"));
    return projectCategorys[0];
}

//*************************************************************************************************************************************

var Script = function () {
    // begin first table
    $('#sample_1,#sample_1_1,#sample_1_2,#sample_1_3').dataTable({
        "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "对不起，查询不到任何相关数据",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": " ",
            "oPaginate": {
                "sFirst": "第一页",
                "sPrevious": " 上一页 ",
                "sNext": " 下一页 ",
                "sLast": " 最后一页 "
            },
        },
        "aLengthMenu": [5, 10, 25, 50, 100],
        "aoColumnDefs": [{
            'bSortable': false,
            'aTargets': [0]
        }]
    });

    jQuery('#sample_1,#sample_1_1,#sample_1_2,#sample_1_3 .group-checkable').change(function () {
        var set = jQuery(this).attr("data-set");
        var checked = jQuery(this).is(":checked");
        jQuery(set).each(function () {
            if (checked) {
                $(this).attr("checked", true);
            } else {
                $(this).attr("checked", false);
            }
        });
        jQuery.uniform.update(set);
    });

    jQuery('#sample_1_wrapper .dataTables_filter input').addClass("input-medium"); // modify table search input
    jQuery('#sample_1_wrapper .dataTables_length select').addClass("input-mini"); // modify table per page dropdown

    // begin second table
    $('#sample_2').dataTable({
        "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_ per page",
            "oPaginate": {
                "sPrevious": "Prev",
                "sNext": "Next"
            }
        },
        "aoColumnDefs": [{
            'bSortable': false,
            'aTargets': [0]
        }]
    });

    jQuery('#sample_2 .group-checkable').change(function () {
        var set = jQuery(this).attr("data-set");
        var checked = jQuery(this).is(":checked");
        jQuery(set).each(function () {
            if (checked) {
                $(this).attr("checked", true);
            } else {
                $(this).attr("checked", false);
            }
        });
        jQuery.uniform.update(set);
    });

    jQuery('#sample_2_wrapper .dataTables_filter input').addClass("input-small"); // modify table search input
    jQuery('#sample_2_wrapper .dataTables_length select').addClass("input-mini"); // modify table per page dropdown

    // begin: third table
    $('#sample_3').dataTable({
        "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_ per page",
            "oPaginate": {
                "sPrevious": "Prev",
                "sNext": "Next"
            }
        },
        "aoColumnDefs": [{
            'bSortable': false,
            'aTargets': [0]
        }]
    });

    jQuery('#sample_3 .group-checkable').change(function () {
        var set = jQuery(this).attr("data-set");
        var checked = jQuery(this).is(":checked");
        jQuery(set).each(function () {
            if (checked) {
                $(this).attr("checked", true);
            } else {
                $(this).attr("checked", false);
            }
        });
        jQuery.uniform.update(set);
    });

    jQuery('#sample_3_wrapper .dataTables_filter input').addClass("input-small"); // modify table search input
    jQuery('#sample_3_wrapper .dataTables_length select').addClass("input-mini"); // modify table per page dropdown
}();
