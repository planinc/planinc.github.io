
function saveStroke(startX, startY, stopX, stopY) {
  var existingArray = JSON.parse(localStorage.getItem("strokes")) || [];
  existingArray.push([startX, startY, stopX, stopY]);
  localStorage.setItem("strokes", JSON.stringify(existingArray));
}

function getStrokes() {
  return JSON.parse(localStorage.getItem("strokes")) || [];
}
