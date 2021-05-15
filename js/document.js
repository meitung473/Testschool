window.onload = function () {
   
    loadfooter();
    loadDoc();
};
function loadDoc() {

    $.get("設定/Setting.txt", function (data) {
        let thisarry = data.split("\n");

        for (let index = 0; index < thisarry.length; index++) {
            thisarry[index] = thisarry[index].replace(/^\s+|\s+$/g, '');
        }
        var schooltitle = thisarry.indexOf("0.顯示標題:") + 1;

        document.title = thisarry[schooltitle];

        //輪播照片:標題
        let picTITLE1 = thisarry.indexOf("1.輪播標題1:") + 1;
        document.getElementById('pictxt ' + 1).innerHTML = thisarry[picTITLE1];
        document.getElementById('picsen ' + 1).innerHTML = thisarry[picTITLE1 + 1];

        let picTITLE2 = thisarry.indexOf("2.輪播標題2:") + 1;
        document.getElementById('pictxt ' + 2).innerHTML = thisarry[picTITLE2];
        document.getElementById('picsen ' + 2).innerHTML = thisarry[picTITLE2 + 1];
        let picTITLE3 = thisarry.indexOf("3.輪播標題3:") + 1;
        document.getElementById('pictxt ' + 3).innerHTML = thisarry[picTITLE3];
        document.getElementById('picsen ' + 3).innerHTML = thisarry[picTITLE3 + 1];
        //簡介標題
        let InformationTITLE = thisarry.indexOf("1.歡迎標題:") + 1;
        document.getElementById('Information ' + 1).innerHTML = thisarry[InformationTITLE];

        //簡介內文
        let CONTENTstart = thisarry.indexOf("2.簡介內文:") + 1;
        let CONTENTend = thisarry.indexOf("三、行事曆") - 1;
        var Infocontent = thisarry.slice(CONTENTstart, CONTENTend);
        Infocontent.join(' <br>');

        //尋找是否有列點項
        if (Infocontent.includes("*")) {

            for (let index = 1; index < Infocontent.length; index++) {

                let listfirstat = Infocontent.indexOf("*",2*index-1);
                Infocontent[listfirstat] = '<ul>';
                Infocontent[listfirstat] = Infocontent[listfirstat] + '<br>';
                let listfirend = Infocontent.indexOf("*", 2*index);
                Infocontent[listfirend] = '</ul>';
                //列點項
                for (listfirstat; listfirstat < listfirend - 1; listfirstat++) {

                    Infocontent[listfirstat + 1] = "<li>" + Infocontent[listfirstat + 1] + "</li>";
                }
            }
            //尋找列點起始

        }
        document.getElementById('Information ' + 2).innerHTML = Infocontent.join(' ');
    });
    //新聞填入
    $.get("News.txt", function (data) {
        //填入文檔位置 : 文章標題
        var title = data.split("\n");

        for (let index = 0; index < title.length; index++) {
            title[index] = title[index].replace(/^\s+|\s+$/g, '');
        }
        var content = title;
        document.getElementById('NewsTitle').innerHTML = title[0];

        //文章內容
        content.shift();

        //撇除img的物件
        var n = "[圖片]";
        for (let index = 0; index < title.length; index++) {
            title[index] = title[index].replace(n, '');
        }
        //去除空白
        content = content.filter(item => item);
        document.getElementById('Newscontent').innerHTML = content.join(' <br>');
    });

}


