     //使用者觸發click事件，則播放音樂
        //播放音樂
        var myMusic = document.getElementById("myMusic");
        var volumeControl = document.getElementById("volumeControl");
        /*  var controlPanel = document.getElementById("controlPanel")如果設定console.log這個就用不到 */
        /*  var btn1 = controlPanel.children[0]; 可以把原本的換成btn1再去設console.log */
        var information = document.getElementById("information");
        var progressBar = document.getElementById("progressBar");
        var musicList = document.getElementById("musicList");
        var functionButtons = document.getElementById("functionButtons");

        var txtVolume = volumeControl.children[3];
        var rangeVolume = volumeControl.children[0];
        var musicDuration = information.children[0];
        var playStatus = information.children[1];
        var btnPlay = functionButtons.children[0];

        var infoStatus = information.children[2];


        function musicStatus() {
            if (infoStatus.innerText == "單曲循環") {
                changeMusic(0);
            }
            else if (infoStatus.innerText == "隨機播放") {
            }
            else if (infoStatus.innerText == "全曲循環" && musicList.length == musicList.selectedIndex + 1) {
                changeMusic(0 - musicList.selectedIndex);
            }
            else if (musicList.length == musicList.selectedIndex + 1) { //是否為最後一首歌
                stopMusic();
            }
            else {  //不是最後一首歌就播放下一首
                changeMusic(1);
            }
        }

            function loopOne() {
                infoStatus.innerHTML = infoStatus.innerHTML == "單曲循環" ? "正常" : "單曲循環";
            }
            function setRandom() {
                infoStatus.innerHTML = infoStatus.innerHTML == "隨機播放" ? "正常" : "隨機播放";
            }
            function loopAll() {
                infoStatus.innerHTML = infoStatus.innerHTML == "全曲循環" ? "正常" : "全曲循環";
            }

            myMusic.onended = musicStatus; //音樂播放完畢後，會自動觸發這個事件
            myMusic.onloadeddata = function () {
                myMusic.play(); //音樂載入完成後才開始播放
                myMusic.pause(); //音樂載入完成後才開始播放
            }

            function changeMusic(n) {
                /*   console.log(event.target.value); //這邊的event是指上面音樂列表的選擇
                  console.log(event.target); */

                var i = musicList.selectedIndex; //選擇的音樂索引
                myMusic.src = musicList.children[i + n].value; //更改音樂來源
                myMusic.title = musicList.children[i + n].innerText;
                musicList.children[i + n].selected = true; //選擇的音樂索引

                if (btnPlay.innerText == ";") {

                    myMusic.onloadeddata = playMusic; //音樂載入完成後才開始播放
                }



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
                progressBar.style.backgroundImage = `linear-gradient(to right, rgb(128, 128, 129) ${w}%,white ${w}%)`;
            }

            function ProgressInitial() {
                progressBar.max = myMusic.duration * 10000; //音樂的總長度
                setInterval(setMusicDuration, 10);
            }


            
            setVolumeByRangeBar(); //初始化音量

            //音量調整
            function setVolumeByRangeBar() {
                /*  console.log(event.target.value); */
                txtVolume.value = rangeVolume.value;
                myMusic.volume = txtVolume.value / 100; //真正寫入音量屬性值

                //塗音量條的顏色
                rangeVolume.style.backgroundImage = `linear-gradient(to right, rgb(159, 159, 243) ${rangeVolume.value}%,rgb(128, 0, 128) ${rangeVolume.value}%)`;
            }
            //音量調整(用+/-來調整音量)
            function changeVolume(v) {
                rangeVolume.value = parseInt(rangeVolume.value) + v;
                setVolumeByRangeBar();
            }



            //靜音(如果是布林值很常用=!再倒回去給自己)
            function setMute() {
                myMusic.muted = !myMusic.muted;
                /* 第一種寫法 event.target.innerHTML = event.target.innerHTML == "U" ? "V" : "U"; */
                event.target.className = event.target.className == "setMute" ? "" : "setMute";
            }

            /*    if {event.target.innerHTML="U";
               event.target.innerHTML="V"
               else{
                   event.target.innerHTML="U";
               }
           } */
            //快轉倒轉
            function changeTime(s) {
                myMusic.currentTime += s;  /* 用正負數來處理 */
            }

            /*         //倒轉
                    function prevTime() {
                        myMusic.currentTime = myMusic.currentTime + 5; 原理
                    }
                    //快轉
                    function nextTime() {
                        myMusic.currentTime +=5; 
                    }
             */

            function updateInfo(txt) {
                playStatus.innerHTML = txt;
            }

            //播放音樂
            function playMusic() {
                console.log(event.target);

                myMusic.play();
                event.target.innerHTML = ";";   /* 暫停圖 */
                /* 這邊children指的是上面div id="controlPanel"裡面的兩個span第一個和第二個 */
                event.target.onclick = pauseMusic;

                ProgressInitial(); //音樂播放時，才開始更新進度條

                updateInfo("目前播放" + myMusic.title + "...")
            }
            //暫停音樂
            function pauseMusic() {
                myMusic.pause();
                event.target.innerHTML = "4";  /* 播放圖 */
                event.target.onclick = playMusic;
                updateInfo("音樂暫停")
            }

            //停止音樂(音樂要停下來且時間歸零)
            function stopMusic() {
                myMusic.pause()
                myMusic.currentTime = 0;
                btnPlay.innerHTML = "4"; /* 播放圖 */
                btnPlay.onclick = playMusic;  //恢復播放音樂功能

                /* 從這邊來的console.log(event.target.previousElementSibling) */
                updateInfo("音樂停止")
            }

            function musicStatus() {
            if (event.target.value == "one") {
                changeMusic(0);
            }
            else if (event.target.value == "all") {
            }
            else if (event.target.value == "random" && musicList.length == musicList.selectedIndex + 1) {
                changeMusic(0 - musicList.selectedIndex);
            }
            else if (musicList.length == musicList.selectedIndex + 1) { //是否為最後一首歌
                stopMusic();
            }
            else {  //不是最後一首歌就播放下一首
                changeMusic(1);
            }
        }

              function loopOne() {
                event.target.value = event.target.value == "one" ? "one" : "";
            }
            function setRandom() {
                event.target.value = event.target.value == "random" ? "" : "random";
            }
            function loopAll() {
                event.target.value = event.target.value == "all" ? "" : "all";

                function musicStatus() {
    if (document.querySelector('input[name="vbtn-radio"]:checked').value == "one") {
        myMusic.currentTime = 0; //如果是單曲循環，則重置音樂到開頭
        myMusic.play(); //重新播放音樂
    } else if (document.querySelector('input[name="vbtn-radio"]:checked').value == "all") {
        changeMusic(0 - musicList.selectedIndex); //如果是全部循環，則播放下一首音樂
    } else if (document.querySelector('input[name="vbtn-radio"]:checked').value == "random") {
        var randomIndex = Math.floor(Math.random() * musicList.options.length); //隨機選擇一首音樂
        changeMusic(randomIndex - musicList.selectedIndex); //更換音樂來源
    }
}



