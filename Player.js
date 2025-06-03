
var myMusic = document.getElementById("myMusic"); //播放音樂
var information = document.getElementById("information"); //音樂資訊

var progressBar = document.getElementById("progressBar");

var playStatus = information //目前曲目
var musicDuration = timeinfo; //目前音樂時間



function playMusic() {

    myMusic.play();
    updateInfo("目前播放" + myMusic.title + "...")
}

function pauseMusic() {

    myMusic.pause();
    updateInfo("音樂暫停")
}

function stopMusic() {
    myMusic.pause();
    myMusic.currentTime = 0; //重置音樂到開頭
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

function setMusicDuration() {
    musicDuration.innerHTML = getTimeFormat(myMusic.currentTime) + "/" + getTimeFormat(myMusic.duration);

    prograssBar.value = myMusic.currentTime * 10000; //更新進度條的值
    //console.log(progressBar.value);

    var w = myMusic.currentTime / myMusic.duration * 100; //計算進度條的長度
    progressBar.progress-bartyle = `width: ${w}%`;
}

function ProgressInitial() {
    progressBar.max = myMusic.duration * 10000; //音樂的總長度
    setInterval(setMusicDuration, 10);
}