var mediaSource = "/Assets/2DOFSpringMassSystemProof.mp4"
var mouseisdown = true; //This makes simulation not run initially
var canvas = document.getElementById("myCanvas"); // get the canvas from the page
var ctx = getCanvas();
var videoContainer; // object to hold video and associated info
var video = document.createElement("video"); // create a video element

prepare();


// // PROGRESS BAR
// video.ontimeupdate = function () {
//    var percentage = (video.currentTime / video.duration) * 100;
//    // $("#custom-seekbar span").css("width", percentage + "%");
// };
// $("#custom-seekbar").on("click", function (e) {
//    var offset = $(this).offset();
//    var left = (e.pageX - offset.left);
//    var totalWidth = $("#custom-seekbar").width();
//    var percentage = (left / totalWidth);
//    var vidTime = video.duration * percentage;
//    video.currentTime = vidTime;
//    window.cancelAnimationFrame()
// });

// video.src = mediaSource;
// video.autoPlay = false; // auto play video - doens't work though?
// video.loop = true; // set the video to loop.
// video.muted = muted;
videoContainer = {  // we will add properties as needed
   video: video,
   ready: false,
};

readyToPlayVideo();
//Checks if mouse is down on simulation.
canvas.addEventListener("mousedown", function (event) { //if mousedown then play do below
   if (utils.pointInRect(event.clientX - ctx.canvas.offsetLeft, event.clientY - ctx.canvas.offsetTop, handle)) { //if clicked on simulation box
      mouseisdown = true;
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp);
      offset.x = event.clientX - ctx.canvas.offsetLeft - handle.x;
      offset.y = event.clientY - ctx.canvas.offsetTop - handle.y;
   }
});

canvas.addEventListener("touchstart", function (event) { //if mousedown then play do below
   if (utils.pointInRect(event.touches[0].clientX - ctx.canvas.offsetLeft, event.touches[0].clientY - ctx.canvas.offsetTop, handle)) {
      mouseisdown = true;
      document.body.addEventListener("touchmove", onMouseMove_touch);
      document.body.addEventListener("touchend", onMouseUp_touch);
      offset.x = event.touches[0].clientX - ctx.canvas.offsetLeft - handle.x;
      offset.y = event.touches[0].clientY - ctx.canvas.offsetTop - handle.y;
   }
});

function readyToPlayVideo(event) { // this is a referance to the video
   // the video may not match the canvas size so find a scale to fit
   videoContainer.scale = Math.min(
      canvas.width / this.videoWidth,
      canvas.height / this.videoHeight);
   videoContainer.ready = true;
   requestAnimationFrame(updateCanvas);
   // document.querySelector(".mute").textContent = "Mute";
}

//Plays video using requestAnimationFrame
function updateCanvas() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   // only draw simulation if loaded and ready
   if (videoContainer !== undefined && videoContainer.ready) {
      // find the top left of the video on the canvas
      video.muted = muted;
      var scale_vid = videoContainer.scale; //important to make this scale different to physics simulation scale.
      var vidH = videoContainer.video.videoHeight;
      var vidW = videoContainer.video.videoWidth;
      var top = canvas.height / 2 - (vidH / 2) * scale_vid;
      var left = canvas.width / 2 - (vidW / 2) * scale_vid;
      ctx.drawImage(videoContainer.video, left, top, vidW * scale_vid, vidH * scale_vid); //this creates the video!

      //Moves simulation but doesn't play it
      if (mouseisdown == true) {
         draw();
      } else {
         simulate_calcs();
      }
   }
   requestAnimationFrame(updateCanvas);// request the next frame in 1/60th of a second 
}
