window.onload = function () {
    loadfooter();
    LoadNews();
};
function LoadNews() {
    //新聞填入
    $.get("News.txt", function (data) {
        //填入文檔位置 : 文章標題
        var title = data.split("\n");

        for (let index = 0; index < title.length; index++) {
            title[index] = title[index].replace(/^\s+|\s+$/g, '');
        }
        var content = title;
        document.getElementById('NewsinnerTitle').innerHTML = title[0];

        //文章內容
        content.shift();

        //生成圖片
        var img = "[圖片]";
        for (let index = 1; index < content.length; index++) {

            let order = content.indexOf(img,index);
            let size=order+1;
            console.log(content[size]);
            var sprite= '<img class="img-fluid rounded my-4'+' col-'+8+' offset-'+4+'" src="'+'img/News'+'.jpg" alt="'+title[0]+'"></img>';
            content[index] = content[index].replace(img, sprite);
        }
        console.log(content);
        // //去除空白
        content = content.filter(item => item);
        document.getElementById('NewsinnerContent').innerHTML = content.join(' <br>');
    });
}
