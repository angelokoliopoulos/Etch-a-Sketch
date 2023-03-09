const grid = document.querySelector(".grid-area");
const slide = document.querySelector(".slide");
const colorPick = document.querySelector(".colorPick");
const sizeInfo = document.querySelector(".size-info");
const rainbow = document.querySelector(".rainbow");
let rainbowClicked = false;

const global = {
  color: colorPick.value,
  size: slide.value,
};

function createGrid(gridNumber) {
  let gridArea = gridNumber * gridNumber;
  let gridTemplate = `repeat(${gridNumber}, 1fr)`;
  grid.style.gridTemplateColumns = gridTemplate;
  grid.style.gridTemplateRows = gridTemplate;

  let gridItems = "";
  for (let i = 1; i <= gridArea; i++) {
    gridItems += '<div class="grid-item"></div>';
  }
  sizeInfo.textContent = `${global.size} * ${global.size}`;

  grid.innerHTML = gridItems;
}

function hover(e) {
  if (e.target.classList.contains("grid-item")) {
    e.target.style.backgroundColor = global.color;
    if (rainbowClicked) {
      global.color = randomColor();
    }
  }
}

function changeColor() {
  // console.log(e.target.value);
  global.color = colorPick.value;
}
function changeSize() {
  global.size = slide.value;
  createGrid(global.size);
}

function eraseGrid() {
  grid.innerHTML = "";
  createGrid(global.size);
}

function randomColor() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}

function rainbowHandler() {
  if (rainbow.classList.contains("active")) {
    rainbowClicked = false;
    global.color = "black";
    rainbow.classList.remove("active");
  } else {
    rainbowClicked = true;

    rainbow.classList.add("active");
  }
}

document.querySelector("#erase").addEventListener("click", eraseGrid);
rainbow.addEventListener("click", rainbowHandler);
colorPick.addEventListener("input", changeColor);
slide.addEventListener("input", changeSize);
grid.addEventListener("mouseover", hover);
document.addEventListener("DOMContentLoaded", createGrid(global.size));
