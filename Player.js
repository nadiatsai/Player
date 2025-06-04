
var myMusic = document.getElementById("myMusic"); //播放音樂
var information = document.getElementById("information"); //音樂資訊
var functionButtons = document.getElementById("functionButtons");

var progressBar = document.getElementById("progressBar");

var volumeRange= document.getElementById("volumeRange"); //range音量調整
var volumeControl = document.getElementById("volumeControl"); //音量控制
var timeinfo = document.getElementById("timeinfo"); //音樂時間資訊


var playStatus = information //目前曲目
var musicDuration = timeinfo; //目前音樂時間
var btnPlay = functionButtons.children[3];
var txtVolume = volumeControl;
var rangeVolume = volumeRange;


function playMusic() {
console.log(event.target);


    
    ProgressInitial()
    updateInfo("目前播放" + myMusic.title + "...")
    
    myMusic.play();
    btnPlay.classList.remove("bi-caret-right"); //移除播放按鈕的樣式
    btnPlay.classList.add("bi-pause"); //添加暫停按鈕的樣式
    event.target.onclick = pauseMusic; //設定暫停按鈕的事件

}

function pauseMusic() {

    myMusic.pause();
    updateInfo("音樂暫停")

    btnPlay.classList.remove("bi-pause"); //移除暫停按鈕的樣式
    btnPlay.classList.add("bi-caret-right"); //添加播放按鈕的樣式
    btnPlay.disabled = false; //啟用播放按鈕
    event.target.onclick = playMusic; //設定播放按鈕的事件
}

function stopMusic() {
    myMusic.pause();
    myMusic.currentTime = 0; //重置音樂到開頭
    btnPlay.classList.remove("bi-pause"); //移除暫停按鈕的樣式
    btnPlay.classList.add("bi-caret-right"); //添加播放按鈕的樣式
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

    progressBar.value = myMusic.currentTime * 10000; //更新進度條的值
    //console.log(progressBar.value);

    var w = myMusic.currentTime / myMusic.duration * 100; //計算進度條的長度
    progressBar.style.backgroundImage = "linear-gradient(to right, rgb(165, 63, 90) " + w + "%, rgb(114, 183, 126) " + w + "%)"; //更新進度條的背景
}

function ProgressInitial() {
    progressBar.max = myMusic.duration * 10000; //音樂的總長度
    setInterval(setMusicDuration, 10);
}


function changeTime(s) {
                myMusic.currentTime += s;
}

setVolumeByRangeBar(); //初始化音量

            //音量調整
function setVolumeByRangeBar() {
         console.log(event.target.value);
txtVolume.value = rangeVolume.value;
myMusic.volume = txtVolume.value / 100; //真正寫入音量屬性值

                //塗音量條的顏色
rangeVolume.style.backgroundImage = `linear-gradient(to right, rgb(37, 136, 75) ${rangeVolume.value}%,rgb(211, 236, 189) ${rangeVolume.value}%)`;
 }

function changeVolume(v) {
    rangeVolume.value = parseInt(rangeVolume.value) + v;
    setVolumeByRangeBar();
}

