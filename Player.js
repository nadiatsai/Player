
var myMusic = document.getElementById("myMusic"); //播放音樂
var information = document.getElementById("information"); //音樂資訊
var functionButtons = document.getElementById("functionButtons");
var musicList = document.getElementById("musicList");
var progressBar = document.getElementById("progressBar");

var volumeRange = document.getElementById("volumeRange"); //range音量調整
var volumeControl = document.getElementById("volumeControl"); //音量控制
var timeinfo = document.getElementById("timeinfo"); //音樂時間資訊
var controlPanel = document.getElementById("controlPanel"); //控制面板
var txtVolume = document.getElementById("textVolume"); //音量文字顯示
var groupButtons = document.getElementById("groupButtons"); //循環/隨機按鈕組

var playStatus = information //目前曲目
var musicDuration = timeinfo; //目前音樂時間
var btnPlay = functionButtons.children[3];
var rangeVolume = volumeRange;
var infoStatus = groupButtons; //目前循環/隨機狀態

function musicStatus() {

    if (infoStatus.innerText == "one") {
        changeMusic(0); //單曲循環，播放當前音樂
    } else if (infoStatus.innerText == "random") {
        var i = Math.floor(Math.random() * musicList.length); //隨機選擇一首音樂
        changeMusic(i - musicList.selectedIndex); //播放隨機音樂
    } else if (infoStatus.innerText == "all" && musicList.length == musicList.selectedIndex + 1) {
        changeMusic(0 - musicList.selectedIndex); //全曲循環，播放第一首音樂
    } else if (infoStatus.innerText == "cancel" && musicList.length == musicList.selectedIndex + 1) { //是否有選x且為最後一首歌
        pauseMusic(); //停止音樂
    } else if (musicList.length == musicList.selectedIndex + 1) {
        pauseMusic(); //停止音樂
    } else {  //不是最後一首歌就播放下一首
        changeMusic(1); //播放下一首音樂
    }
}

function loopOne() {
    infoStatus.innerHTML = infoStatus.innerHTML == "one" ? "normal" : "one";
}
function setRandom() {
    infoStatus.innerHTML = infoStatus.innerHTML == "random" ? "normal" : "random";
}
function loopAll() {
    infoStatus.innerHTML = infoStatus.innerHTML == "all" ? "normal" : "all";
}

function cancel() {
    infoStatus.innerHTML = infoStatus.innerHTML == "cancel" ? "normal" : "cancel";
}

myMusic.onended = musicStatus; //音樂播放完畢後，會自動觸發這個事件
myMusic.onloadeddata = function () {
    myMusic.play(); //音樂載入完成後才開始播放
    myMusic.pause(); //暫停音樂，等待用戶點擊播放按鈕
}

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
    progressBar.style.backgroundImage = "linear-gradient(to right, rgb(222, 219, 52) " + w + "%, rgb(102, 175, 114) " + w + "%)"; //更新進度條的背景


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
    console.log(rangeVolume.value);
    txtVolume.value = rangeVolume.value;
    myMusic.volume = txtVolume.value / 100; //真正寫入音量屬性值
    var v = txtVolume.value / 100; //音量值
    volumeRange.style.backgroundImage = "linear-gradient(to right, rgb(222, 219, 52) " + v * 100 + "%, rgb(221, 181, 36) " + v * 100 + "%)"; //更新音量條的背景

}

function changeVolume(v) {
    rangeVolume.value = parseInt(rangeVolume.value) + v;
    setVolumeByRangeBar();
}

function setMute() {
    myMusic.muted = !myMusic.muted;
    if (myMusic.muted) {
        rangeVolume.value = 0; //靜音時音量條歸零
        volumeRange.style.backgroundImage = "linear-gradient(to right, rgb(222, 219, 52) 0%, rgb(221, 181, 36) 100%)"; //更新音量條的背景
    } else {
        rangeVolume.value = txtVolume.value; //取消靜音時恢復原來的音量
    }
}




function changeMusic(n) {

    var i = musicList.selectedIndex; //選擇音樂列表中的第n首音樂
    myMusic.src = musicList.children[i + n].value; //更換音樂來源
    myMusic.title = musicList.children[i + n].innerText; //更新音樂標題
    musicList.children[i + n].selected = true; //選擇的音樂索引

    if (btnPlay.classList.contains("bi-pause") == true) { //如果當前是暫停狀態
        myMusic.onloadeddata = playMusic; //音樂載入完成後才開始播放
    }
}

