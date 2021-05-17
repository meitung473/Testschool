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

    //確認數量
    var thispicnum = thisarry.indexOf("一、輪播圖片設定") + 2;
    var putpicnum = thisarry[thispicnum].split("").pop();
    if (putpicnum <= 0) {
      console.error('錯誤!\n 請新增\n欲輪播的照片"數量"至設定/Setting.txt中');
    }
    //生成圖片與載入圖片
    // 取得外層容器 myList
    var ul = document.getElementById("indicators");

    // 建立一個 DocumentFragment，可以把它看作一個「虛擬的容器」
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < putpicnum; i++) {
      // 生成新的 li，加入文字後置入 fragment 中。
      let li = document.createElement("li");
      li.classList.add("data-target='#carouselExampleIndicators'");
      li.classList.add("data-slide-to=" + i);
      // li.appendChild(document.createTextNode("Item " + (i+1)));
      fragment.appendChild(li);
    }
    // 最後將組合完成的 fragment 放進 ul 容器
    ul.appendChild(fragment);

    //輪播圖片與敘述
    var container = document.getElementById("carouselinner");
    var fragment1 = document.createDocumentFragment();
    for (var i = 0; i < putpicnum; i++) {

      // 生成新的 li，加入文字後置入 fragment 中。
      let divc = document.createElement("div");
      let caption = document.createElement("div");
      //加入標題
      let pictitle = document.createElement("H3");
      pictitle.id = 'pictxt ' + (i + 1);
      //加入說明文字
      let pictext = document.createElement("P");
      pictext.id = 'picsen ' + (i + 1);

      //加入輪播class
      divc.classList.add("carousel-item");
      divc.style.backgroundImage = "url('img/carousel-img/0" + (i + 1) + ".jpg')";
      var urlpath="img/carousel-img/0" + (i + 1) + ".jpg";
      $.get(urlpath)
        .fail(function () {
    
          console.error("錯誤!缺少輪播照片!\n 請放置"+"圖片並更名為\n0"+i +".jpg\n至img/carousel-img資料夾中");
        })
      if (i == 0) //首張要先啟動
      {
        divc.classList.add("active");
      }
      caption.classList.add("carousel-caption");
      caption.classList.add("d-none");
      caption.classList.add("d-md-block");
    
      divc.appendChild(caption);
      caption.appendChild(pictitle);
      caption.appendChild(pictext);
      fragment1.appendChild(divc);

    }
    // 最後將組合完成的 fragment 放進 ul 容器
    container.appendChild(fragment1);

    for (let index = 1; index <= putpicnum; index++) {
      var imgtitle = index + '.輪播標題' + index + ":";
      let picnum = thisarry.indexOf(imgtitle) + 1;
      if (thisarry.indexOf(imgtitle) < 0) {
        console.error('錯誤!\n 請新增\n' + index + '.輪播標題' + index + ':\n[圖片標題' + index + ']\n[短句敘述' + index + '] \n等文字至設定/Setting.txt中');
      }

      document.getElementById('pictxt ' + index).innerHTML = thisarry[picnum];
      document.getElementById('picsen ' + index).innerHTML = thisarry[picnum + 1];
    }

    //簡介標題
    let InformationTITLE = thisarry.indexOf("1.歡迎標題:") + 1;
    document.getElementById('Information ' + 1).innerHTML = thisarry[InformationTITLE];

    //簡介內文
    let CONTENTstart = thisarry.indexOf("2.簡介內文:") + 1;
    let CONTENTend = thisarry.indexOf("三、行事曆") - 1;
    var Infocontent = thisarry.slice(CONTENTstart, CONTENTend);
    // Infocontent.join(' <br>');
    if (Infocontent.includes("*")) {

      for (let index = 0; index < Infocontent.length; index++) {

        let listfirstat = Infocontent.indexOf("*", index);
        Infocontent[listfirstat] = '<ul>';
        Infocontent[listfirstat] = Infocontent[listfirstat];
        let listfirend = Infocontent.indexOf("*", index);
        Infocontent[listfirend] = '</ul>';
        //列點項
        for (listfirstat; listfirstat < listfirend - 1; listfirstat++) {

          Infocontent[listfirstat + 1] = "<li>" + Infocontent[listfirstat + 1] + "</li>";
        }
        if (!Infocontent[index].includes("ul") && !Infocontent[index].includes("li")) {
          Infocontent[index] += '<br>';
        }
        //新標題
        Infocontent[index] = Infocontent[index].replace("{", '<h2>');
        Infocontent[index] = Infocontent[index].replace("}", '</h2>');
      }
      document.getElementById('Information ' + 2).innerHTML = Infocontent.join('');
    }
    else {
      for (let index = 0; index < Infocontent.length; index++) {
        //新標題
        Infocontent[index] = Infocontent[index].replace("{", '<h2>');
        Infocontent[index] = Infocontent[index].replace("}", '</h2>');
      }
      document.getElementById('Information ' + 2).innerHTML = Infocontent.join('<br>');
    }
  });
  //新聞填入
  $.get("設定/News.txt", function (data) {
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


