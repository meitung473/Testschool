window.onload = function () {
    loadfooter();
    LoadFeatures();
};
function LoadFeatures() {
    $.get("設定/Setting.txt", function (data) {
        let thisarry = data.split("\n");
        for (let index = 0; index < thisarry.length; index++) {
            thisarry[index] = thisarry[index].replace(/^\s+|\s+$/g, '');
        }
        var breadtitle = thisarry.indexOf("0.顯示標題:") + 1;
        document.getElementById('sidebarname').innerHTML = 'About '+thisarry[breadtitle];
    });
    $.get("設定/Features.txt", function (data) {
        //填入文檔位置 
        // data.unshift('<p>');
        var content = data.split("\n");
        content.unshift('<p>');
        for (let index = 0; index < content.length; index++) {
            content[index] = content[index].replace(/^\s+|\s+$/g, '');
        }
        for (let index = 0; index < content.length; index++) {

            if (content.includes("*")) {
               
                var list = content.indexOf("*", index);
                content[list] = '<ul>';
                var liend = content.indexOf("*", index);
                content[liend] = '</ul>';
                //列點項
                for (list; list < liend - 1; list++) {
                    content[list + 1] = "<li>" + content[list + 1] + "</li>";
                }
            }
            
            //新標題
            content[index] = content[index].replace("{", '<h2>');
            content[index] = content[index].replace("}", '</h2>');

        }
        //生成圖片
        var img = "[圖片]";
        var num = 1;
        for (let index = 0; index < content.length; index++) {

            var sprite = null;
            if (content[index] === img) {
                sprite = '<img class="img-fluid rounded my-4 col-sm-12' + ' col-xl-' + 8 + ' offset-xl-' + 2 + '" src="' + 'img/Features-img/Feature' + num + '.jpg" alt=""></img>';
                content[index] = content[index].replace(img, sprite);
                num++;
            }
        }
        //消除空白欄
        //   content = content.filter(item => item);
        // content.unshift(' <p>');
        document.getElementById('content').innerHTML = content.join(' </br>');
    });

}