var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

window.addEventListener("resize", () => {
    adjustCanvasSize(false);
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", startDrawing);

canvas.addEventListener("mousemove", keepDrawing);
canvas.addEventListener("touchmove", keepDrawing);

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);

adjustCanvasSize(true);
getStrokes().forEach(stroke => {
    drawStroke(context, "gray", 2, stroke[0], stroke[1], stroke[2], stroke[3]);
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("/serviceworker.js")
            .then(function(registration) {
                console.log("Service worker registered successfully");
            })
            .catch(function(error) {
                console.log("Service worker registration failed:", error);
            });
    });
}
