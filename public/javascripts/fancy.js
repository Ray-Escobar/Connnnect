// Fullscreen functionality
let elem = document.documentElement;
function gofullscreen() {
    if ((window.fullScreen) ||
        (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    } else {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }
}


// Clickable-Row on splash screen
jQuery(document).ready(function ($) {
    $(".clickable-row").click(function () {
        window.location = $(this).data("href");
    });
});

// Sound functionality
var blockAudio = new Audio('ping.mp3');
blockAudio.volume = 0.5;

function updateVolume() {
    blockAudio.volume = (blockAudio.volume === 0.5)? 0.0 : 0.5;
}