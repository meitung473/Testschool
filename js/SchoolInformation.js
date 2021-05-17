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
        var thiselement = title[LV].split("/");
        for (let index = 0; index < thiselement.length; index++) {
            thiselement[index] = '<li class="list-group-item">' + thiselement[index] + '</li>';
        }
        document.getElementById('SchoolLV').innerHTML = thiselement.join("");

        //Student grade level
        let GLV = title.indexOf("Student grade level") + 1;
        var GLVelement = title[GLV].split("/");
        for (let index = 0; index < GLVelement.length; index++) {
            GLVelement[index] = '<li class="list-group-item">' + GLVelement[index] + '</li>';
        }
        document.getElementById('SchoolGLV').innerHTML = GLVelement.join("");

        //Number of teaching staff & enrollment
        let NTS = title.indexOf("Number of teaching staff & enrollment") + 1;
        title[NTS] = '<li class="list-group-item px-0 mx-0">' + title[NTS] + '</li>';
        title[NTS + 1] = '<li class="list-group-item px-0 mx-0">' + title[NTS + 1] + '</li>';
        var Ntsstr = title[NTS] + title[NTS + 1];
        document.getElementById('SchoolNTS').innerHTML = Ntsstr;

        //Schools types
        let ST = title.indexOf("Schools types") + 1;
        var STVelement = title[ST].split("/");
        for (let index = 0; index < STVelement.length; index++) {
            STVelement[index] = '<li class="list-group-item">' + STVelement[index] + '</li>';
        }
        document.getElementById('SchoolST').innerHTML = STVelement.join("");
        // document.getElementById('SchoolST').innerHTML = title[ST];

        //Composition of students
        let SOT = title.indexOf("Composition of students") + 1;
        var SOTelement = title[SOT].split("/");
        for (let index = 0; index < SOTelement.length; index++) {
            SOTelement[index] = '<li class="list-group-item">' + SOTelement[index] + '</li>';
        }
        document.getElementById('SchoolSOT').innerHTML = SOTelement.join("");

        //Affiliation of schools
        let AOS = title.indexOf("Affiliation of schools") + 1;
        var AOSelement = title[AOS].split("/");
        for (let index = 0; index < AOSelement.length; index++) {
            AOSelement[index] = '<li class="list-group-item">' + AOSelement[index] + '</li>';
        }
        document.getElementById('SchoolAOS').innerHTML = AOSelement.join("");

        //The main instruction languages
        let TMIL = title.indexOf("The main instruction languages") + 1;
        var TMILelement = title[TMIL].split("/");
        for (let index = 0; index < TMILelement.length; index++) {
            TMILelement[index] = '<li class="list-group-item">' + TMILelement[index] + '</li>';
        }
        document.getElementById('SchoolTMIL').innerHTML = TMILelement.join("");

        //Foreign language programs
        let FLP = title.indexOf("Foreign language programs") + 1;
        var FLPelement = title[FLP].split("/");
        for (let index = 0; index < FLPelement.length; index++) {
            FLPelement[index] = '<li class="list-group-item">' + FLPelement[index] + '</li>';
        }
        document.getElementById('SchoolFLP').innerHTML = FLPelement.join("");

        //Number of overseas sister schools
        let OSS = title.indexOf("Number of overseas sister schools") + 1;
        title[OSS] = '<li class="list-group-item px-0 mx-0">' + title[OSS] + '</li>';
        title[OSS + 1] = '<li class="list-group-item px-0 mx-0">' + title[OSS + 1] + '</li>';
        var OSSsstr = title[OSS] + title[OSS + 1];
        document.getElementById('SchoolOSS').innerHTML = OSSsstr;

        let osssC = title.slice((OSS + 2), -1);
        let listfirstat = 0;
        let listfirend = 0;

        //尋找是否有列點項
        if (osssC.includes("*")) {
            listfirstat = osssC.indexOf("*", 0);
            listfirend = osssC.indexOf("*", 1);
            if (listfirstat >= 0) {
                for (listfirstat; listfirstat < listfirend; listfirstat++) {
    
                    osssC[listfirstat + 1] = '<tr><th class="font-weight-normal">' + osssC[listfirstat + 1] + "<th></tr>";
                }
            }
            // for (listfirend; listfirend <= osssC.length; listfirend++) {
                
            //         osssC[listfirend]+='<br>';
            //         console.log( osssC[listfirend]);
     
            
            // }
        }
 
     
  
     
        osssC[0] = "";
        osssC[listfirend] = "";
        osssC = osssC.filter(item => item);
        console.log( osssC);
        document.getElementById('areazone').innerHTML = osssC.join('');
    });
}
