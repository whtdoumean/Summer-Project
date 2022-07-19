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

$('a.scroll-to').on('click', function(event) {
    var $anchor = $(this)
    $('html, body')
        .stop()
        .animate(
            {
                scrollTop: $($anchor.attr('href')).offset().top - 80,
            },
            {
                duration: 1800,
                specialEasing: {
                    width: 'linear',
                    height: 'easeInOutCubic',
                },
            }
        )
    event.preventDefault()
})


const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const wrapper = document.querySelector(".wrapper");
const html = document.querySelector("html");
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute("href").replace("#", "");
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcons = document.querySelectorAll(".close-popup");
if (popupCloseIcons.length > 0) {
    for (let index = 0; index < popupCloseIcons.length; index ++) {
        const popupCloseIcon = popupCloseIcons[index];
        popupCloseIcon.addEventListener("click", function (e) {
            popupClose(popupCloseIcon.closest(".popup"));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector(".popup.open");
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add("open");
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest(".popup-content")) {
                popupClose(e.target.closest(".popup"));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove("open");
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }

    //body.style.paddingRight = lockPaddingValue;
    //body.classList.add("lock");
    //wrapper.style.paddingRight = lockPaddingValue;
    //wrapper.classList.add("lock");
    html.style.paddingRight = lockPaddingValue;
    html.classList.add("lock");

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
        }
        //body.style.paddingRight = "0px";
        //body.classList.remove("lock");
        //wrapper.style.paddingRight = "0px";
        //wrapper.classList.remove("lock");
        html.style.paddingRight = "0px";
        html.classList.remove("lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener("keydown", function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector(".popup.open");
        popupClose(popupActive);
    }
});