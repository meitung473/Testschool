window.onload = function () {
    loadfooter();
    Loadinfo();
};
function Loadinfo() {
    //新聞填入
    $.get("設定/SchoolInformation.txt", function (data) {
        //填入文檔位置 : 文章標題
        var title = data.split("\n");

        for (let index = 0; index < title.length; index++) {
            title[index] = title[index].replace(/^\s+|\s+$/g, '');
        }
        // name of school
        let Name = title.indexOf("The full name of school") + 1;
        document.getElementById('SchoolName').innerHTML = title[Name];
        // School level
        let LV = title.indexOf("School level") + 1;
        document.getElementById('SchoolLV').innerHTML = title[LV];
        // // document.getElementById('NewsinnerTitle').innerHTML = title[0];

        // //文章內容
        // content.shift();
        // content = content.filter(item => item);
        // //生成圖片
        // var img = "[圖片]";
        // var num = 1;
        // for (let index = 0; index < content.length; index++) {

        //     let order = content.indexOf(img, index);
        //     // let size = order + 1;
        //     var sprite =null;
        //     if (content[index] === img) {
        //         sprite = '<img class="img-fluid rounded my-4' + ' col-' + 8 + ' offset-' + 2 + '" src="' + '../img/News/News' + num + '.jpg" alt="' + title[0] + '"></img>';
        //         content[index] = content[index].replace(img, sprite);
        //         num++;
        //     }
        // }

        //尋找是否有列點項
        if (title.includes("*")) {

            for (let index = 1; index < title.length; index++) {

                let listfirstat = title.indexOf("*", 2 * index - 1);
                title[listfirstat] = '<ul>';
                title[listfirstat] = title[listfirstat] + '<br>';
                let listfirend = title.indexOf("*", 2 * index);
                title[listfirend] = '</ul>';
                //列點項
                for (listfirstat; listfirstat < listfirend - 1; listfirstat++) {

                    title[listfirstat + 1] = "<li>" + title[listfirstat + 1] + "</li>";
                }
            }
            //尋找列點起始

        }
        console.log(title);
        // document.getElementById('NewsinnerContent').innerHTML = content.join(' <br>');
    });
}
