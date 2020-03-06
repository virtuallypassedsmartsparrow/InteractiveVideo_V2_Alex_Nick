var scenes = [
    {
        startTime: 0,
        name: "Scene 1",
        showSimulation: true,
        showSkipPrompt: true,
    },
    {
        startTime: 10,
        name: "Scene 2",
        showSimulation: false,
        showSkipPrompt: true,
    },
    {
        startTime: 20,
        name: "Scene 3",
        showSimulation: true,
        showSkipPrompt: false,
    },
    {
        startTime: 30,
        name: "Scene 4",
        showSimulation: false,
        showSkipPrompt: false,
    }
];

var state = {
    scenes: scenes,
    currentSceneIndex: 0,

    videoPlaying: false,
    videoMuted: false,
    fullscreen: false,
    currentVideoTime: 0.00,
}











var testCanvas;
var testCanvasContext;







var framesPerSecond = 50;

var responsiveCanvas;

var videoCanvasCtx;
var videoElement;
var videoCanvas;
var simulationCanvas;

var playBtn, pauseBtn, fullscreenBtn, exitFullscreenBtn, muteBtn, unmuteBtn;
var videoTime, videoCurrentScene, videoCanvasNavController, navSeeDerivationBtn, navSkipDerivationBtn;
var runningInterval;
initializeVideoCanvas = () => {
    responsiveCanvas = document.getElementById("responsiveCanvas");
    videoElement = document.getElementById("videoElement");
    videoCanvas = document.getElementById("videoCanvas");
    simulationCanvas = document.getElementById("simulationCanvas");

    videoCanvasCtx = videoCanvas.getContext("2d");
    videoCanvasCtx.canvas.width = videoElement.videoWidth;
    videoCanvasCtx.canvas.height = videoElement.videoHeight;

    // TESTING TO SEE IF I CAN GET CANVAS TO BE THE SAME SCALE AS VIDEO
    testCanvas = document.getElementById("testCanvas");
    testCanvasContext = testCanvas.getContext("2d");
    testCanvasContext.canvas.width = videoElement.videoWidth;
    testCanvasContext.canvas.height = videoElement.videoHeight;
    testCanvasContext.fillStyle = "red";



    videoTime = document.getElementById("videoTime");
    videoCurrentScene = document.getElementById("videoCurrentScene");
    videoCanvasNavController = document.getElementById("videoCanvasNavController");
    navSeeDerivationBtn = document.getElementById("navSeeDerivationBtn");
    navSkipDerivationBtn = document.getElementById("navSkipDerivationBtn");
    $(navSeeDerivationBtn).on("click", handleClickSeeDerivation);
    $(navSkipDerivationBtn).on("click", handleClickSkipDerivation);

    // video canvas controller buttons
    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");
    muteBtn = document.getElementById("muteBtn");
    unmuteBtn = document.getElementById("unmuteBtn");
    fullscreenBtn = document.getElementById("fullscreenBtn");
    exitFullscreenBtn = document.getElementById("exitFullscreenBtn");
    playBtn.addEventListener("click", playVideo);
    pauseBtn.addEventListener("click", pauseVideo);
    muteBtn.addEventListener("click", muteVideo);
    unmuteBtn.addEventListener("click", unmuteVideo);
    fullscreenBtn.addEventListener("click", setFullScreen);
    exitFullscreenBtn.addEventListener("click", exitFullscreen);

    runningInterval = setInterval(() => {
        refreshCanvasVideo();
    }, 1000 / framesPerSecond);
}


















function refreshCanvasVideo() {
    this.renderVideo();
    this.setCurrentVideoTime();
    this.setCurrentScene();
};

renderVideo = () => {
    this.renderVideoCanvasMediaControllerBtns();
    if (videoElement.currentTime !== 0) {
        videoCanvas.height = videoElement.videoHeight;
        videoCanvas.width = videoElement.videoWidth;
        testCanvas.height = videoElement.videoHeight;
        testCanvas.width = videoElement.videoWidth;
        testCanvasContext.fillRect(10, 10, 10, 10);

        var vRatio = (videoCanvas.width / videoElement.videoHeight) * videoElement.videoWidth;
        videoCanvasCtx.drawImage(videoElement, 0, 0, vRatio, videoCanvas.height);
        var hRatio = (videoCanvas.width / videoElement.videoWidth) * videoElement.videoHeight;
        videoCanvasCtx.drawImage(videoElement, 0, 0, videoCanvas.width, hRatio);
    }
    /**
     * WHAT DOES THIS DO ???
     */
    // else {
    //     videoCanvasCtx.fillRect(0, 0, videoElement.videoWidth, videoElement.videoHeight);
    //     videoCanvasCtx.fillStyle = "black";
    // }
}
renderVideoCanvasMediaControllerBtns = () => {
    if (state.videoPlaying) {
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
    } else {
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
    }

    if (state.videoMuted) {
        muteBtn.style.display = "none";
        unmuteBtn.style.display = "block";
    } else {
        muteBtn.style.display = "block";
        unmuteBtn.style.display = "none";
    }

    if (state.fullscreen) {
        fullscreenBtn.style.display = "none";
        exitFullscreenBtn.style.display = "block";
    } else {
        fullscreenBtn.style.display = "block";
        exitFullscreenBtn.style.display = "none";
    }
}
setCurrentVideoTime = () => {
    state.currentVideoTime = videoElement.currentTime;
    videoTime.innerHTML = String(Math.floor(state.currentVideoTime)) + " s";
}
setCurrentScene = () => {
    let currentSceneindex = 0;
    for (let i = currentSceneindex; i < state.scenes.length; i++) {
        if (i !== state.scenes.length - 1) {
            if (state.currentVideoTime >= state.scenes[i].startTime && state.currentVideoTime < state.scenes[i + 1].startTime) {
                currentSceneindex = i;
                break;
            }
        } else {
            currentSceneindex = i;
        }
    }
    state.currentSceneIndex = currentSceneindex;
    videoCurrentScene.innerHTML = state.scenes[state.currentSceneIndex].name;
    this.betweenScenePause();
}


betweenScenePause = () => {
    if (state.scenes[state.currentSceneIndex].showSkipPrompt && (state.scenes[state.currentSceneIndex + 1].startTime - state.currentVideoTime) <= 5) {
        $(videoCanvasNavController).removeClass("d-none");
    } else {
        $(videoCanvasNavController).addClass("d-none");
    }

    if (state.scenes[state.currentSceneIndex].showSimulation) {
        $(simulationCanvas).removeClass("d-none");
    } else {
        $(simulationCanvas).addClass("d-none");
    }
}
















/**
 * ALL HANDLERS FOR CLICKABLE BUTTONS
 */
function handleClickSeeDerivation() {
    if (state.currentSceneIndex + 1 < state.scenes.length) {
        state.currentSceneIndex = state.currentSceneIndex + 1;
        videoElement.currentTime = state.scenes[state.currentSceneIndex].startTime;
        refreshCanvasVideo();
    }
}
function handleClickSkipDerivation() {
    if (state.currentSceneIndex + 2 < state.scenes.length) {
        state.currentSceneIndex = state.currentSceneIndex + 2;
        videoElement.currentTime = state.scenes[state.currentSceneIndex].startTime;
        refreshCanvasVideo();
    }
}
handleVideoControls = () => {
    if (state.videoPlaying) {
        videoElement.play();
    }
    if (!state.videoPlaying) {
        videoElement.pause();
    }
    if (state.videoMuted) {
        videoElement.muted = true;
    }
    if (!state.videoMuted) {
        videoElement.muted = false;
    }
}

playVideo = event => {
    event.preventDefault();
    state.videoPlaying = true;
    state.sceneBreak = false;
    this.handleVideoControls();
}
pauseVideo = event => {
    event.preventDefault();
    state.videoPlaying = false;
    this.handleVideoControls();
}
muteVideo = event => {
    event.preventDefault();
    state.videoMuted = true;
    this.handleVideoControls();
}
unmuteVideo = event => {
    event.preventDefault();
    state.videoMuted = false;
    this.handleVideoControls();
}
setFullScreen = event => {
    event.preventDefault();
    state.fullscreen = true;
    responsiveCanvas.requestFullscreen();
    window.screen.orientation.lock("landscape").catch(function (error) {
        console.log("caught", error);
    });
}
exitFullscreen = event => {
    event.preventDefault();
    state.fullscreen = false;
    document.exitFullscreen();

    window.screen.orientation.lock("landscape").then(function () {
        window.screen.orientation.unlock();
    }).catch(function (error) {
        console.log("caught", error);
    });
};






















$(document).ready(function () {
    initializeVideoCanvas();
    refreshCanvasVideo();
});
