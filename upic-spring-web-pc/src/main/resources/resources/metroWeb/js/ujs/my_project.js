/*
 * @Author: Marte
 * @Date:   2017-10-11 12:12:10
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-10-12 00:19:08
 */
var getProjectByGuidanceNum = "/common/getProjectByGuidanceNum";//查看我的项目列表
var getProjectInfo = "/common/getProjectInfo";//查看项目详情

$(function () {
    /*
     加载数据
     */
    ajaxs("", "showAll", getProjectByGuidanceNum);
})

function ajaxs(datas, method, urls, j) {
    $.ajax({
        type: "GET", // 提交方式
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
            var status = "";

            if (result.content[i].implementationProcess === "SAVED") {
                status = "已保存"
            } else if (result.content[i].implementationProcess === "IN_AUDIT") {
                status = "审核中"
            } else if (result.content[i].implementationProcess === "NOT_PASS") {
                status = "未通过"
            } else if (result.content[i].implementationProcess === "AUDITED") {
                status = "已审核"
            } else if (result.content[i].implementationProcess === "HAVE_IN_HAND") {
                status = "进行中"
            } else {
                status = "已完成"
            }

            htmls += "<tr>";
            htmls += "<td><input type='checkbox' class='checkboxes' value='1' /></td>";
            htmls += "<td class='center_td'>" + (i + 1) + "</td>";
            htmls += "<td>" + result.content[i].id + "</td>";
            htmls += "<td>" + result.content[i].projectCategory + "</td>";
            htmls += "<td>" + result.content[i].projectName + "</td>";
            htmls += "<td>" + result.content[i].integral + "</td>";
            htmls += "<td>" + result.content[i].maximum + "</td>";
            htmls += "<td>" + (result.content[i].integral * result.content[i].maximum) + "</td>";
            htmls += "<td>" + result.content[i].creatTime + "</td>";
            htmls += "<td>" + status + "</td>";
            htmls += "<td>";
            htmls += "<a href='#mymodal1' data-toggle='modal'><div class='message_div' onclick=ajaxs('projectNum=" + result.content[i].projectNum + "','info','" + getProjectInfo + "','" + (i + 1) + "')>查看详情</div></a></td>";
            htmls += "</tr>";
        }
        $("#showAll").html(htmls);
    } else {
        var status = "";

        if (result.implementationProcess === "SAVED") {
            status = "已保存"
        } else if (result.implementationProcess === "IN_AUDIT") {
            status = "审核中"
        } else if (result.implementationProcess === "NOT_PASS") {
            status = "未通过"
        } else if (result.implementationProcess === "AUDITED") {
            status = "已审核"
        } else if (result.implementationProcess === "HAVE_IN_HAND") {
            status = "进行中"
        } else {
            status = "已完成"
        }

        htmlss += "<div class='block-fluid'>";
        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>编号</div>";
        htmlss += "<div class='span3'>" + j + "</div>";
        htmlss += "<div class='span3'>代码</div>";
        htmlss += "<div class='span3'>" + result.id + "</div>";
        htmlss += "</div>";
        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>项目申请日期</div>";
        htmlss += "<div class='span3'>" + result.creatTime + "</div>";
        htmlss += "<div class='span3'>状态</div>";
        htmlss += "<div class='span3'>" + status + "</div>";
        htmlss += "</div>";
        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>项目类别</div>";
        htmlss += "<div class='span3'>" + result.projectCategory + "</div>";
        htmlss += "<div class='span3'>申报单位</div>";
        htmlss += "<div class='span3'>" + result.declareUnit + "</div>";
        htmlss += "</div>";
        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>项目名称</div>";
        htmlss += "<div class='span3'>" + result.projectName + "</div>";
        htmlss += "<div class='span3'>负责人</div>";
        htmlss += "<div class='span3'>" + result.guidanceMan + "</div>";
        htmlss += "</div>";
        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>项目内容</div>";
        htmlss += "<div class='span9'>" + result.content + "</div>";
        htmlss += "</div>";
        htmlss += "<div class='row-form clearfix'>";
        htmlss += "<div class='span3'>评价标准与形式</div>";
        htmlss += "<div class='span9'>" + result.checkAssessmentCriteraAndForm + "</div>";
        htmlss += "</div>";
        htmlss += "</div>";
    }
    $("#info").html(htmlss);
}

function splitJson(json) {
    var projectCategorys = new Array();
    projectCategorys = json.split(">");
    return projectCategorys[0];
}