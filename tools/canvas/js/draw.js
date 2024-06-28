
var lastX, lastY;

function isStylus(event) {
    if (event.touches === undefined) {
        return false;
    }
    if (event.touches[0].touchType === "stylus") {
        return true;
    } else {
        return false;
    }
}

function drawStroke(ctx, color, width, startX, startY, endX, endY) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.strokeStyle = color;
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
}

function adjustCanvasSize(initial) {
    if (!initial && navigator.userAgent.match(/Mac OS X/i)) {
        return;
    }
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function startDrawing(e) {
    if (e.type == "mousedown") {
        lastX = e.offsetX;
        lastY = e.offsetY;
        return;
    }
    if (!isStylus(e)) {
        return;
    }
	lastX = e.touches[0].clientX - canvas.offsetLeft;
	lastY = e.touches[0].clientY - canvas.offsetTop;
	e.preventDefault();
}

function keepDrawing(e) {
	if (e.type === "mousemove" && e.buttons !== 1) {
		return;
	}

    if (e.type === "touchmove" && !isStylus(e)) {
        return;
    }

    let currentX, currentY;
    if (e.type == "mousemove") {
        currentX = e.offsetX;
        currentY = e.offsetY;
    } else {
	    currentX = e.touches[0].clientX - canvas.offsetLeft;
	    currentY = e.touches[0].clientY - canvas.offsetTop;
    }
	
    drawStroke(context, "black", 2, lastX, lastY, currentX, currentY);

    saveStroke(lastX, lastY, currentX, currentY);

	lastX = currentX;
	lastY = currentY;

	e.preventDefault();
}

function stopDrawing(e) {
    if (!isStylus(e)) {
        return;
    }
	lastX = null;
	lastY = null;
    e.preventDefault();
}
