const { floor } = Math;
const cellSize = 6;
const rowSize = 100;
const colSize = 200;
const width = colSize * cellSize;
const height = rowSize * cellSize;

let grid = undefined;
let ant = { row: floor(rowSize / 4), col: floor(colSize / 1.5), headDirection: 'north' };

function array(rowSize, colSize) {
  const grid = [];
  for (let row = 0; row < rowSize; row++) {
    grid.push([]);
    for (let col = 0; col < colSize; col++) {
      grid[row].push({ row, col, flag: true });
    }
  }
  return grid;
}

function displayGrid(grid) {
  strokeWeight(0.1);
  stroke('black');
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      rect(col * cellSize + 0.3, row * cellSize + 0.3, cellSize - 0.3);
    }
  }
}

function changeHeadDirection() {
  if (grid[ant.row][ant.col].flag) {
    if (ant.headDirection == 'north') ant.headDirection = 'east';
    else if (ant.headDirection == 'south') ant.headDirection = 'west';
    else if (ant.headDirection == 'west') ant.headDirection = 'north';
    else if (ant.headDirection == 'east') ant.headDirection = 'south';
  } else {
    if (ant.headDirection == 'north') ant.headDirection = 'west';
    else if (ant.headDirection == 'south') ant.headDirection = 'east';
    else if (ant.headDirection == 'west') ant.headDirection = 'south';
    else if (ant.headDirection == 'east') ant.headDirection = 'north';
  }
}

function move() {
  if (ant.headDirection == 'north') ant.row--;
  else if (ant.headDirection == 'south') ant.row++;
  else if (ant.headDirection == 'west') ant.col--;
  else if (ant.headDirection == 'east') ant.col++;
}

function fillCell({ row, col }) {
  noStroke();
  if (grid[row][col].flag) fill('white');
  else fill('black');
  square(ant.col * cellSize + 0.3, ant.row * cellSize + 0.3, cellSize - 0.3);
}

function setup() {
  const canvas = createCanvas(width, height);
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  background(200);
  grid = array(rowSize, colSize);
  displayGrid(grid);
  noStroke();
  fill('deepskyblue');
  square(ant.col * cellSize + 0.3, ant.row * cellSize + 0.3, cellSize - 0.3);
}

function draw() {
  if (ant.row < 0 || ant.col < 0 || ant.row > rowSize - 1 || ant.col > colSize - 1) return;
  changeHeadDirection();
  grid[ant.row][ant.col].flag = !grid[ant.row][ant.col].flag;
  fillCell(ant);
  move();
  noStroke();
  fill('deepskyblue');
  square(ant.col * cellSize + 0.3, ant.row * cellSize + 0.3, cellSize - 0.3);
}
