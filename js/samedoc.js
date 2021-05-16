

function loadfooter() {
    $.get("設定/Setting.txt", function (data) {
        let thisarry = data.split("\n");
        for (let index = 0; index < thisarry.length; index++) {
            thisarry[index] = thisarry[index].replace(/^\s+|\s+$/g, '');
        }
        // var schooltitle = thisarry.indexOf("0.顯示標題:") + 1;
        // document.title = thisarry[schooltitle];
        //關於我們 資訊欄
        // 1.電話:
        let telenum = thisarry.indexOf("1.電話:") + 1;
        document.getElementById('telephonenum').innerHTML = 'Tel：' + thisarry[telenum];
        tele='Tel：' + thisarry[telenum];
        // 2.傳真:
        let Faxnum = thisarry.indexOf("2.傳真:") + 1;
        document.getElementById('Faxnum').innerHTML = 'Fax：' + thisarry[Faxnum];
        Fax='Fax：' + thisarry[Faxnum];
        // 3.Email:
        let Emailnum = thisarry.indexOf("3.Email:") + 1;
        document.getElementById('Emailnum').innerHTML = 'Email：' + thisarry[Emailnum];
        Email='Email：' + thisarry[Emailnum]
        // 4.服務時間:
        let Servicetime = thisarry.indexOf("4.服務時間:") + 1;
        document.getElementById('Servicetime').innerHTML = 'Service：' + thisarry[Servicetime];
        ServiceT='Service：' + thisarry[Servicetime];

        //社群相關連結網址
        //1.FB:
        let FBnum = thisarry.indexOf("1.FB:") + 1;
        if (thisarry[FBnum] !== "") {
            document.getElementById('FBinfo').setAttribute("href", thisarry[FBnum]);
        }
        else {
            document.getElementById('FBinfo').style.display = 'none';
        }
        //2.Instagram:
        let IGnum = thisarry.indexOf("2.Instagram:") + 1;
        if (thisarry[IGnum] !== "") {
            document.getElementById('IGinfo').setAttribute("href", thisarry[IGnum]);
        }
        else {
            document.getElementById('IGinfo').style.display = 'none';
        }
        //2.Youtube:
        let YTnum = thisarry.indexOf("3.Youtube:") + 1;
        if (thisarry[YTnum] !== "") {
            document.getElementById('YTinfo').setAttribute("href", thisarry[YTnum]);
        }
        else {
            document.getElementById('YTinfo').style.display = 'none';
        }
    });
}