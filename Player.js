
var myMusic = document.getElementById("myMusic"); //播放音樂
var information = document.getElementById("information"); //音樂資訊
var functionButtons = document.getElementById("functionButtons");

var progressBar = document.getElementById("progressBar");
var timeinfo = document.getElementById("timeinfo"); //音樂時間資訊


var playStatus = information //目前曲目
var musicDuration = timeinfo; //目前音樂時間
var btnPlay = functionButtons.children[3];


function playMusic() {

    myMusic.play();
    ProgressInitial()
    updateInfo("目前播放" + myMusic.title + "...")
    functionButtons.children[6].disabled = false;
    event.target.onclick = pauseMusic; //設定暫停按鈕的事件

}

function pauseMusic() {

    myMusic.pause();
    updateInfo("音樂暫停")
    event.target.disabled = false; //啟用播放按鈕
    functionButtons.children[3].disabled = true; //啟用播放按鈕
    event.target.onclick = playMusic; //設定播放按鈕的事件
}

function stopMusic() {
    myMusic.pause();
    myMusic.currentTime = 0; //重置音樂到開頭

    event.target.onclick = playMusic; //設定播放按鈕的事件
    btnPlay.onclick = playMusic;
    updateInfo("音樂停止")
}

function updateInfo(txt) {
    playStatus.innerHTML = txt;

}

function getTimeFormat(t) {
    var min = parseInt(t.toFixed(0) / 60);//執行出來是秒，需要變成分:秒，個位再補上0
    var sec = parseInt(t.toFixed(0) % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    return min + ":" + sec;
}

function setProgress() {
    myMusic.currentTime = progressBar.value / 10000; //音樂的當前時間
}

//音樂播放時間/設定現在進度&全部長度
function setMusicDuration() {
    musicDuration.innerHTML = getTimeFormat(myMusic.currentTime) + "/" + getTimeFormat(myMusic.duration);

    prograssBar.value = myMusic.currentTim * 10000; //更新進度條的值
    //console.log(progressBar.value);

    var w = myMusic.currentTime / myMusic.duration * 100; //計算進度條的長度
    progressBar.style.backgroundImage = "linear-gradient(to right, rgb(85, 63, 165) " + w + "%, rgb(114, 183, 126) " + w + "%)"; //更新進度條的背景
}

function ProgressInitial() {
    progressBar.max = myMusic.duration * 10000; //音樂的總長度
    setInterval(setMusicDuration, 10);
}



