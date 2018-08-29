// ==UserScript==
// @name         EverZhihu
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  更友好地使用Evernote收藏知乎答案！
// @author       gzr2017
// @match        https://www.zhihu.com/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @require            https://greasyfork.org/scripts/369577/code/event-emitter.js
// @require            https://greasyfork.org/scripts/369578/code/dom.js
// @grant        GM_addStyle

// ==/UserScript==

(function () {
    'use strict';
    // 问题、回答居中
    var patt1 = /answer/;
    var patt2 = /question/;
    if (patt1.test(window.location.href)) {
        window.onload = function () {
            // 重命名网页标题
            document.title = document.title.replace(/\((.+)\)/g, "");
            document.title = document.title.replace(" - 知乎", "");


            GM_addStyle(`
.QuestionHeader-main,
.Question-mainColumn
{
width: 100%;
}
}
`);
            // 移除浏览数、关注数、你关注的人也关注了这个问题
            $(".QuestionHeader-side").remove();
            // 移除更多答案
            $(".Card.MoreAnswers").remove();
            // 自动展开问题描述
            $(".Button.QuestionRichText-more.Button--plain").click();
            // 移除答案上面的全部答案按钮
            $(".QuestionMainAction").first().remove();
            // 移除侧栏
            $(".Question-sideColumn.Question-sideColumn--sticky").remove();
        }
    } else if (patt2.test(window.location.href)) {
        Dom.on('.Card .List .List-item', e => {
            for (const btn of e.querySelectorAll('button')) {
                if (btn.textContent === '收起') {
                    btn.click();
                }
            }
        });
        $('.Button.ContentItem-rightButton.Button--plain').click(function () {
            var answer_id = $(this).parent('.RichContent.is-collapsed.RichContent--unescapable').parent('.ContentItem.AnswerItem').attr("name");
            var new_link = window.location.href + '/answer/' + answer_id;
            window.open(new_link);

        });
    }
    // else {
    //     // $('.RichText.ztext.CopyrightRichText-richText').click(function () {
    //     //     var new_link = $(this).parent('.RichContent-inner').parent('.RichContent.is-collapsed').parent('.ContentItem.AnswerItem').children('.ContentItem-title').children($("div")).children($('a[data-za-detail-view-element_name$="Title"]'));
    //     //     window.open(new_link);
    //     // });
    //     // $('.RichText.ztext.CopyrightRichText-richText').attr("onclick", "null");
    //     $('.Button.ContentItem-more.Button--plain').click(function () {
    //         var new_link = $(this).parent('.RichContent-inner').parent('.RichContent.is-collapsed').parent('.ContentItem.AnswerItem').children('.ContentItem-title').children($("div")[0]).children($('a[data-za-detail-view-element_name$="Title"]'));
    //         window.open(new_link);

    //     });
    // }

})();