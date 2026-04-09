let points = localStorage.getItem("points") || 0;

document.getElementById("points").innerText = points;

function addPoints() {
  points++;
  localStorage.setItem("points", points);
  document.getElementById("points").innerText = points;
}