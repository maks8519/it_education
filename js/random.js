var img = [];
img[0] = "url('img/img1.jpg')";
img[1] = "url('img/img2.jpg')";
img[2] = "url('img/img3.jpg')";


function changeBG() {
    var i = Math.floor(Math.random() * img.length);
    var elem = document.getElementsByTagName("header");
    elem[0].style.backgroundImage = img[i];

    /*alert("Новый фон: " + img[i]);*/
}

document.addEventListener("DOMContentLoaded", function() {
    changeBG();
});
