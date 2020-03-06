var mouseisdown = true;
var canvas = document.getElementById("simulationCanvas");
var ctx = getCanvas();

prepare();
requestAnimationFrame(updateCanvas);

canvas.addEventListener("mousedown", function (event) {
   if (utils.pointInRect(event.clientX - ctx.canvas.offsetLeft, event.clientY - ctx.canvas.offsetTop, handle)) {
      mouseisdown = true;
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp);
      offset.x = event.clientX - ctx.canvas.offsetLeft - handle.x;
      offset.y = event.clientY - ctx.canvas.offsetTop - handle.y;
   }
});

canvas.addEventListener("touchstart", function (event) {
   if (utils.pointInRect(event.touches[0].clientX - ctx.canvas.offsetLeft, event.touches[0].clientY - ctx.canvas.offsetTop, handle)) {
      mouseisdown = true;
      document.body.addEventListener("touchmove", onMouseMove_touch);
      document.body.addEventListener("touchend", onMouseUp_touch);
      offset.x = event.touches[0].clientX - ctx.canvas.offsetLeft - handle.x;
      offset.y = event.touches[0].clientY - ctx.canvas.offsetTop - handle.y;
   }
});

function updateCanvas() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   if (mouseisdown == true) {
      draw();
   } else {
      simulate_calcs();
   }
   requestAnimationFrame(updateCanvas);
}
