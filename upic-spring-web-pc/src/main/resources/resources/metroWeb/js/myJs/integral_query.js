/*
 * @Author: Marte
 * 我的积分
 * @Date:   2017-09-24 10:17:37
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-25 13:04:45
 */

var getAllIntegralLogByStudentNum = "/stu/getAllIntegralLogByStudentNum";
var getProjectCategoryUrl = "/common/getAllProjectCategory";
var types = "GET";

$(function () {
    /*
     加载数据
     */
    ajaxs("studentNum=1522110240", "showAll", getAllIntegralLogByStudentNum)

})


function ajaxs(datas, method, urls) {
    if (pageCount == page || pageCount == 0) {
        return;
    }
    $.ajax({
        type: types, // 提交方式
        url: urls,// 路径
        data: datas,//

        beforeSend: function (XMLHttpRequest) {
// progress.inc();
        },
        success: function (result) {// 返回数据根据结果进行相应的处理
            pageCount = result.total;
            var datas = result.content;
            addHtmls(datas, method)
        },
        complete: function (XMLHttpRequest, textStatus) {
// progress.done(true);
        },
        error: function () {
// progress.done(true);
        }
    });
}


function addHtmls(result, method) {
    var htmls = "";
    var htmlss = "";
    if (method == "showAll") {
        for (var i = 0; i < result.length; i++) {
            var color = "";
            var statusC = "";
            htmls += "<tr>";
            htmls += "<td class='center_td'></td>";
            if (result[i].status === "PENDING_AUDIT") {
                color = "danger";
                statusC = "待审核";
            } else if (result[i].status === "HAVEPASSED") {
                color = "success";
                statusC = "已通过";
            } else if (result[i].status === "FAILURE_TO_PASS_THE_AUDIT") {
                color = "danger";
                statusC = "未通过";
            } else if (result[i].status === "ALREADY_SIGN_UP") {
                color = "danger";
                statusC = "已报名";
            } else if (result[i].status === "SIGNED_IN") {
                color = "success";
                statusC = "已签到";
            } else if (result[i].status === "COMPLETED") {
                color = "success";
                statusC = "已完成";
            }
            htmls += "<td class='center_td'><button class='btn btn-mini btn-" + color + "'>" + statusC + "</button></td>";
            htmls += "<td>" + splitJson(result[i].event) + "</td>";
            htmls += "<td>" + result[i].projectName + "</td>";
            htmls += "<td>" + result[i].college + "</td>";
            htmls += "<td>" + result[i].integral + "</td>";
            htmls += "<td>";
            htmls += "<a href='#mymodal1' data-toggle='modal'><div class='message_div'>查看详情</div></a></td>";
            htmls += "</tr>";

            htmlss = "<div class='row-form clearfix'>";
            htmlss = "<div class='span3'>编号</div>";
            htmlss = "<div class='span3'>" + (i + 1) + "</div>";
            htmlss = "<div class='span3'>代码</div>";
            htmlss = "<div class='span3'>" + result[i].integralLogId.projectNum + "</div>";
            htmlss = "</div>";
            htmlss = "<div class='row-form clearfix'>";
            htmlss = "<div class='span3'>项目申请日期</div>";
            htmlss = "<div class='span3'>" + result[i].creatTime + "</div>";
            htmlss = "<div class='span3'>状态</div>";
            htmlss = "<div class='span3'>" + statusC + "</div>";
            htmlss = "</div>";
            htmlss = "<div class='row-form clearfix'>";
            htmlss = "<div class='span3'>项目类别</div>";
            htmlss = "<div class='span3'>" + splitJson(result[i].event) + "</div>";
            htmlss = "<div class='span3'>所属学院</div>";
            htmlss = "<div class='span3'>" + result[i].college + "</div>";
            htmlss = "</div>";
            htmlss = "<div class='row-form clearfix'>";
            htmlss = "<div class='span3'>项目名称</div>";
            htmlss = "<div class='span3'>" + result[i].projectName + "</div>";
            htmlss = "<div class='span3'>负责人</div>";
            htmlss = "<div class='span3'>XXX</div>";
            htmlss = "</div>";
            htmlss = "<div class='row-form clearfix'>";
            htmlss = "<div class='span3'>项目内容</div>";
            htmlss = "<div class='span9'>校级学生干部加分校级学生干部加分校级学生干部加分校级学生干部加分校级学生干部加分校级学生干部加分</div>";
            htmlss = "</div>";
            htmlss = "<div class='row-form clearfix'>";
            htmlss = "<div class='span3'>评价标准与形式</div>";
            htmlss = "<div class='span9'>校级学生干部加分校级学生干部加分校级学生干部加分校级学生干部加分校级学生干部加分校级学生干部加分</div>";
            htmlss = "</div>";
        }

        $("#showAll").html(htmls);
        $("#details").html(htmlss);

    }
}

function splitJson(json) {
    var projectCategorys = new Array();
    projectCategorys.concat(json.split(" >> "));
    return projectCategorys[0];
}