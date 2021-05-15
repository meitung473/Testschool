window.onload = function () { loadDoc() };

function loadDoc() {

    $.get("Setting.txt", function (data) {
        let thisarry = data.split("\n");
        console.log(thisarry);
        //title
        var schooltitle = thisarry.indexOf("0.顯示標題:\r")+1;
        console.log(schooltitle);
        document.title = thisarry[schooltitle];

        //輪播照片:標題
        let picTITLE1 = thisarry.indexOf("1.輪播標題1:\r") + 1;
        document.getElementById('pictxt ' + 1).innerHTML = thisarry[picTITLE1];
        document.getElementById('picsen ' + 1).innerHTML = thisarry[picTITLE1 + 1];

        let picTITLE2 = thisarry.indexOf("2.輪播標題2:\r") + 1;
        document.getElementById('pictxt ' + 2).innerHTML = thisarry[picTITLE2];
        document.getElementById('picsen ' + 2).innerHTML = thisarry[picTITLE2 + 1];
        let picTITLE3 = thisarry.indexOf("3.輪播標題3:\r") + 1;
        document.getElementById('pictxt ' + 3).innerHTML = thisarry[picTITLE3];
        document.getElementById('picsen ' + 3).innerHTML = thisarry[picTITLE3 + 1];
        //簡介標題
        let InformationTITLE = thisarry.indexOf("1.歡迎標題:\r") + 1;
        document.getElementById('Information ' + 1).innerHTML = thisarry[InformationTITLE];

        //簡介內文
        let CONTENTstart = thisarry.indexOf("2.簡介內文:\r") + 1;
        let CONTENTend = thisarry.indexOf("三、行事曆\r") - 1;
        var Infocontent = thisarry.slice(CONTENTstart, CONTENTend);
        Infocontent.join(' <br>');

        //尋找是否有列點項
        if (Infocontent.includes("*\r")) {
            //尋找列點起始
            let listfirstat = Infocontent.indexOf("*\r");
            Infocontent[listfirstat] = '<ul>';
            Infocontent[listfirstat] = Infocontent[listfirstat] + '<br>';
            let listfirend = Infocontent.indexOf("*\r", 2);
            Infocontent[listfirend] = '</ul>';
            //列點項
            for (listfirstat; listfirstat < listfirend - 1; listfirstat++) {

                Infocontent[listfirstat + 1] = "<li>" + Infocontent[listfirstat + 1] + "</li>";
            }
        }
        document.getElementById('Information ' + 2).innerHTML = Infocontent.join(' ');

        //關於我們 資訊欄
        // 1.電話:
        let telenum = thisarry.indexOf("1.電話:\r") + 1;
        document.getElementById('telephonenum').innerHTML = 'Tel：' + thisarry[telenum];
        // 2.傳真:
        let Faxnum = thisarry.indexOf("2.傳真:\r") + 1;
        document.getElementById('Faxnum').innerHTML = 'Fax：' + thisarry[Faxnum];
        // 3.Email:
        let Emailnum = thisarry.indexOf("3.Email:\r") + 1;
        document.getElementById('Emailnum').innerHTML = 'Email：' + thisarry[Emailnum];
        // 4.服務時間:
        let Servicetime = thisarry.indexOf("4.服務時間:\r") + 1;
        document.getElementById('Servicetime').innerHTML = 'Service：' + thisarry[Servicetime];

        //社群相關連結網址
        //1.FB:
        let FBnum = thisarry.indexOf("1.FB:\r") + 1;
        if (thisarry[FBnum] !== "\r") {
            document.getElementById('FBinfo').setAttribute("href", thisarry[FBnum]);
        }
        else {
            document.getElementById('FBinfo').style.display = 'none';
        }
        //2.Instagram:
        let IGnum = thisarry.indexOf("2.Instagram:\r") + 1;
        if (thisarry[IGnum] !== "\r") {
            document.getElementById('IGinfo').setAttribute("href", thisarry[IGnum]);
        }
        else {
            document.getElementById('IGinfo').style.display = 'none';
        }
        //2.Instagram:
        let YTnum = thisarry.indexOf("3.Youtube:\r") + 1;
        if (thisarry[YTnum] !== "\r") {
            document.getElementById('YTinfo').setAttribute("href", thisarry[YTnum]);
        }
        else {
            document.getElementById('YTinfo').style.display = 'none';
        }
        // if (thisarry[FBnum] == " \n") {

        // }
        // else {
        //     console.log(thisarry[FBnum + 1] + 'show');
        // }

        // Infocontent.forEach(lista => {
        //     let listat=Infocontent.indexOf("*\r");
        //     Infocontent[listat]='<li>';
        //     console.log(listat);

        // });
        // function filterItems(query) {
        //     return Infocontent.filter(function(el) {
        //         return el.indexOf("*") > -1;
        //     })
        //   }
        // Infocontent.replace('a','x');





    });
    //新聞填入
    $.get("News.txt", function (data) {
        //填入文檔位置 : 文章標題
        var title = data.split("\n");
        var content = title;
        document.getElementById('NewsTitle').innerHTML = title[0];

        //文章內容
        content.shift();

        // //撇除img的物件
        // var n = "</img>";

        // content.filter(e => e !== n);
        // console.log(content.includes(n));

        document.getElementById('Newscontent').innerHTML = content.join(' <br>');
    });

}
