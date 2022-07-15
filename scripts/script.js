function myFunction() {
    var x = document.getElementById("myHeadnav");
    if (x.className == "head-nav") {
        x.className += " responsive";
    } else {
        x.className = "head-nav";
    }
}

let lastScroll = 0;
const defoultOffset = 500;
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', ()=>{

if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defoultOffset) {
    //scroll down
    console.log('down');
    header.classList.add('hide');
}
else if (scrollPosition() < lastScroll && containHide()){
    //scroll up
    console.log('up');
    header.classList.remove('hide');
}

lastScroll  = scrollPosition();

});
