let sounds = [new Audio('media/ding-triangle-hit-smartsound-fx-1-00-03.mp3'), new Audio('media/ding-triangle-hit-smartsound-fx-1-00-03 (mp3cut.net).mp3'), new Audio('media/hotel-bell-ding-1-174457.mp3')];
let lastSound = 0;



let song = document.querySelector("#song");
let sound = document.querySelector("#sound");
let playBtn = document.querySelector("#play-btn")



document.querySelector("#body").addEventListener("pointerdown", () => {
sounds[lastSound].pause();
    sounds.volume = 0.1;
    sounds[lastSound].currentTime = 0;
    let random = Math.floor(Math.random() * sounds.length);
    sounds[random].play();
    lastSound = random;
});

song.volume = 0.3;
song.loop = true;
sounds.volume = 0.1;
// sounds.volume = 0.1;

playBtn.addEventListener("mousedown", button_action);

function button_action() {
    if (song.paused) {
        song.play();
        playBtn.innerHTML = "♫";
    } else {
        song.pause();
        playBtn.innerHTML = "🔇"
    }
}

document.onclick = function (e) {
    let x = e.pageX;
    let y = e.pageY;

    let span = document.createElement("span");
    span.classList.add("click_effect");
    span.style.top = y + "px";
    span.style.left = x + "px";
    document.body.appendChild(span);

    setTimeout(() => {
        span.remove();
    }, 500);
}


sound.addEventListener("click", click_sfx);

function click_sfx() {
    sound.play();
}


// let sound = document.querySelector("#sound");
// var sound = new Audio("#sound");
// sound.preload = 'auto';
// sound.load();

// function playSound(volume: 0.2) {
//   var click=sound.cloneNode();
//   click.volume=volume;
//   click.play();
// }