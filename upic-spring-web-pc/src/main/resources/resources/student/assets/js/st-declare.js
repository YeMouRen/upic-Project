/*
 * @Author: Marte
 * 积分申报
 * @Date:   2017-09-20 12:22:12
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-21 14:23:12
 */


/**
 * 1.如果传过来的状态码 审核中对应id="aa" ....
 */
var page = 1;
var pageCount = -1;
var getProjectCategoryUrl = "/common/getAllProjectCategory";//项目类别获取
var getStudentInfoUrl = "/common/getUserInfo";
var getIntegralLogPage = "/common/getIntegralLogPage";
var types = "GET";

$(function () {
    /**
     * 1.进入加载申报表数据
     * 2.点击已申报 加载审核中数据
     *   点击申报表，加载申报表数据
     * 3.点击审核成功，加载成功数据
     * 4.点击审核失败，加载失败数据
     * 5.点击审核中，加载数据
     */

    /*
     获取用户学院
     */
    $.ajax({
        type: "GET", // 提交方式
        url: getStudentInfoUrl,// 路径
        success: function (result) {// 返回数据根据结果进行相应的处理
            $("#college").html(result.college);
        }
    });
    /**
     * 获取项目类别
     */
    ajaxs("", "getProCateg", getProjectCategoryUrl)

    /*
     获取点击申报表
     */
    $(".aa").click(function () {

        /*
         获取用户学院
         */
        $.ajax({
            type: "GET", // 提交方式
            url: getStudentInfoUrl,// 路径
            success: function (result) {// 返回数据根据结果进行相应的处理
                $("#college").html(result.college);
            }
        });
        /**
         * 获取项目类别
         */
        ajaxs("", "getProCateg", getProjectCategoryUrl)


    })
    /*
     获取点击已申报   加载审核中数据
     */
    $(".bb").click(function () {//和点击审核中是一样的
        juge($(this));
        ajaxs("status=PENDING_AUDIT&type=VOLUNTARY_APPLICATION", "inreview", getIntegralLogPage)

    })
    /*
     获取点击审核中
     */
    $(".cc").click(function () {
        juge($(this));
        ajaxs("status=PENDING_AUDIT&type=VOLUNTARY_APPLICATION", "inreview", getIntegralLogPage)

    })
    /*
     获取点击审核成功
     */
    $(".dd").click(function () {
        juge($(this));
        ajaxs("status=HAVEPASSED&type=VOLUNTARY_APPLICATION", "success", getIntegralLogPage)

    })
    /*
     获取点击审核失败
     */
    $(".ee").click(function () {
        juge($(this));
        ajaxs("status=FAILURE_TO_PASS_THE_AUDIT&type=VOLUNTARY_APPLICATION", "defeated", getIntegralLogPage)

    })
})

function juge(obj) {
    if (obj.hasClass("active")) {
        return;
    }
    page = 1;
    pageCount = -1;
}

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

    for (var i = 0; i < result.length; i++) {
        htmls += "<div class='act-div'><div class='tab-left'><img src='" + result[i].integralLogPic + "'></div>";
        htmls += "<div class='tab-right'><div class='tab-title'><div class='right-name'>" + subMyStr(result[i].projectName) + "</div></div>";
        htmls += "<div class='tab-text'><span>" + "创新创业类" + " >></span>&nbsp;<span>" + "国赛" + " >></span>&nbsp;<span>" + "一等奖" + "</span><br><span>" + "信息工程学院" + "</span></div>";
        htmls += "<a href='st-check.html?projectNum=" + result[i].integralLogId.projectNum + "'><div class='tab-search'>" + "查看详情" + " ></div></a></div></div>";
    }

    if (method === "inreview") {
        if (page == 1) {
            $("#aa").html(htmls);
        } else {
            $("#aa").append(htmls);
        }
    }
    else if (method === "success") {
        if (page == 1) {
            $("#bb").html(htmls);
        } else {
            $("#bb").append(htmls);
        }
    }
    else {
        if (page == 1) {
            $("#cc").html(htmls);
        } else {
            $("#cc").append(htmls);
        }
    }
}

function subMyStr(str) {
    if (str.length > 8) {
        str = str.substring(0, 8);
        str += "...";
    }
    return str;
}