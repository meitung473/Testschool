
window.onload = function () {
  loadfooter();
  LoadContact();
};
$(function () {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function () {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        error: function () {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        complete: function () {
          setTimeout(function () {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
  $('#success').html('');
});


function LoadContact() {
  //
  $.get("設定/Setting.txt", function (data) {
    let contactinfo = data.split("\n");
    for (let index = 0; index < contactinfo.length; index++) {
      contactinfo[index] = contactinfo[index].replace(/^\s+|\s+$/g, '');
    }
    //關於我們 資訊欄
    // 1.電話:
    let tele = contactinfo.indexOf("1.電話:") + 1;
    document.getElementById('telephonenumC').innerHTML = 'Tel：' + contactinfo[tele];

    // 2.傳真:
    let Fax = contactinfo.indexOf("2.傳真:") + 1;
    document.getElementById('FaxnumC').innerHTML = 'Fax：' + contactinfo[Fax];

    // 3.Email:
    let EML = contactinfo.indexOf("3.Email:") + 1;
    document.getElementById('EmailnumC').innerHTML = 'Email：' + contactinfo[EML];
    // 4.服務時間:
    let sT = contactinfo.indexOf("4.服務時間:") + 1;
    document.getElementById('ServicetimeC').innerHTML = 'Service：' + contactinfo[sT];
  });

  $.get("設定/Contact.txt", function (data) {
    //填入文檔位置 : 文章標題
    var content = data.split("\n");
    for (let index = 0; index < content.length; index++) {
      content[index] = content[index].replace(/^\s+|\s+$/g, '');
    }
  
    let mapnum = content.indexOf("[SchoolMap]")+1;
    document.getElementById('map').innerHTML = content[mapnum];

    let location = content.indexOf("[School location]") + 1;
    document.getElementById('location').innerHTML = content[location];
    let article = location + 1;

    content = content.slice(article, -1);
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

    }
    //生成圖片
    var img = "[圖片]";
    var num = 1;
    for (let index = 0; index < content.length; index++) {

      let order = content.indexOf(img, index);
      // let size = order + 1;
      var sprite = null;
      if (content[index] === img) {
        sprite = '<img class="img-fluid rounded my-4 col-sm-12' + ' col-xl-' + 8 + ' offset-xl-' + 2 + '" src="' + 'img/Contactus-img/Contact' + num + '.jpg" alt=""></img>';
        content[index] = content[index].replace(img, sprite);
        num++;
      }
    }
    content = content.filter(item => item);
    document.getElementById('HTGTS').innerHTML = content.join(' </br>');
  });

}
