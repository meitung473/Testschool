window.onload = function () {
    loadfooter();
    LoadNews();
};
function LoadNews() {
    //新聞填入
    $.get("設定/News.txt", function (data) {
        //填入文檔位置 : 文章標題
        var title = data.split("\n");

        for (let index = 0; index < title.length; index++) {
            title[index] = title[index].replace(/^\s+|\s+$/g, '');
        }
        var content = title;
        document.getElementById('NewsinnerTitle').innerHTML = title[0];

        //文章內容
        content.shift();
        content = content.filter(item => item);
        //生成圖片
        var img = "[圖片]";
        var num = 1;
        for (let index = 0; index < content.length; index++) {

            let order = content.indexOf(img, index);
            // let size = order + 1;
            var sprite = null;
            if (content[index] === img) {
                sprite = '<img class="img-fluid rounded my-4 col-sm-12' + ' col-xl-' + 8 + ' offset-xl-' + 2 + '" src="' + 'img/News/News' + num + '.jpg" alt="' + title[0] + '"></img>';
                content[index] = content[index].replace(img, sprite);
                num++;
            }
        }

        //尋找是否有列點項
        if (content.includes("*")) {

            for (let index = 1; index < content.length; index++) {

                let listfirstat = content.indexOf("*", 2 * index - 1);
                content[listfirstat] = '<ul>';
                content[listfirstat] = content[listfirstat] + '<br>';
                let listfirend = content.indexOf("*", 2 * index);
                content[listfirend] = '</ul>';
                //列點項
                for (listfirstat; listfirstat < listfirend - 1; listfirstat++) {

                    content[listfirstat + 1] = "<li>" + content[listfirstat + 1] + "</li>";
                }
            }
            //尋找列點起始

        }

        document.getElementById('NewsinnerContent').innerHTML = content.join(' <br>');
    });
}
