btn = document.getElementById("top-button");
window.onscroll = function() {onScrolling()};

function onScrolling() {
    if (document.body.scrollTop > 240 || document.documentElement.scrollTop > 240) {
        btn.style.display = "block";
    }
    else {
        btn.style.display = "none";
    }
}

function gotoTop() {
    document.body.scrollTop = 0; //Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
}
