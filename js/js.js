mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.height = "50px";
    document.getElementById("logo").style.width = "20%";
    mybutton.style.display = "block";
  } else {
    document.getElementById("navbar").style.height = "70px";
    document.getElementById("logo").style.width = "25%";
    mybutton.style.display = "none";
  }
  //沒用到
  // if (document.body.scrollTop > 650 || document.documentElement.scrollTop > 650) {
  //   sidebar.style.position = "absolute";
  // } else {
  //   sidebar.style.position = "fixed";
  // }
}
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


