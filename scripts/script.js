function myFunction() {
    var x = document.getElementById("myHeadnav");
    if (x.className == "head-nav") {
        x.className += " responsive";
    } else {
        x.className = "head-nav";
    }
}