var myIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("slides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = x.length}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 750); // Change image every 0.4 second
}
