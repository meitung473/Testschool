window.onload = function () {
    loadfooter();
    Loadinfo();
};
function Loadinfo() {
    $.get("設定/Setting.txt", function (data) {
        let thisarry = data.split("\n");
        for (let index = 0; index < thisarry.length; index++) {
            thisarry[index] = thisarry[index].replace(/^\s+|\s+$/g, '');
        }
        var breadtitle = thisarry.indexOf("0.顯示標題:") + 1;
        document.getElementById('sidebarname').innerHTML = 'About ' + thisarry[breadtitle];
    });

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

        //Student grade level
        let GLV = title.indexOf("Student grade level") + 1;
        document.getElementById('SchoolGLV').innerHTML = title[GLV];

        //Number of teaching staff & enrollment
        let NTS = title.indexOf("Number of teaching staff & enrollment") + 1;
        var Ntsstr = title[NTS] + '<br>' + title[NTS + 1];
        document.getElementById('SchoolNTS').innerHTML = Ntsstr;

        //Schools types
        let ST = title.indexOf("Schools types") + 1;
        document.getElementById('SchoolST').innerHTML = title[ST];

        //Composition of students
        let SOT = title.indexOf("Composition of students") + 1;
        document.getElementById('SchoolSOT').innerHTML = title[SOT];

        //Affiliation of schools
        let AOS = title.indexOf("Affiliation of schools") + 1;
        document.getElementById('SchoolAOS').innerHTML = title[AOS];

        //The main instruction languages
        let TMIL = title.indexOf("The main instruction languages") + 1;
        document.getElementById('SchoolTMIL').innerHTML = title[TMIL];

        //Foreign language programs
        let FLP = title.indexOf("Foreign language programs") + 1;
        document.getElementById('SchoolFLP').innerHTML = title[FLP];

        //Number of overseas sister schools
        let OSS = title.indexOf("Number of overseas sister schools") + 1;
        //尋找是否有列點項
        if (title.includes("*")) {

            for (let index = 1; index < title.length; index++) {
                if (!title[index].includes("ul") && !title[index].includes("li")) {
                    title[index] += '<br>';
                }
                let listfirstat = title.indexOf("*", 2 * index - 1);
                title[listfirstat] = '<ul>';
                title[listfirstat] = title[listfirstat];
                let listfirend = title.indexOf("*", 2 * index);
                title[listfirend] = '</ul>';
                //列點項
                for (listfirstat; listfirstat < listfirend - 1; listfirstat++) {

                    title[listfirstat + 1] = "<li>" + title[listfirstat + 1] + "</li>";
                }
            }
        }
        var osssC = title.slice(OSS, -1);
        console.log(osssC);
        osssC = osssC.filter(item => item);
        document.getElementById('SchoolOSS').innerHTML = osssC.join('');
    });
}
