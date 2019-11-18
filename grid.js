figureSet = [];

function generateRandomGrid() {
  var neighbours;
  var fl = 0;
  var fll = 1;
  //created an array for storying cell values
cellsArray = create2dArray(x, y);
//reset canvas
resetCanvas();
//randomly filled the array with values 0 and 1 representing black(0) and white(1) cells when filling canvas
for (var xx = 0; xx < x; xx=xx+1) {
  for (var yy = 0; yy < y; yy=yy+1) {
    if (Math.random() > 0.5) {
    cellsArray[xx][yy] = 1;
          }
      }
   }
//smoothing the random spread of cells to make a solid structure of white fillable cells
for (var iter = 0; iter < 20; iter++) {
for (var xx = 0; xx < x; xx=xx+1) {
  for (var yy = 0; yy < y; yy=yy+1) {
    //counting values of adjacent cells to see what to do with current cell, if > (some number) white cells then make(or remain) current cell white...
         neighbours = countNeighbours(xx, yy, cellsArray);
        if (neighbours > 4) {
          cellsArray[xx][yy] = 1;
        } else {
          cellsArray[xx][yy] = 0;
        }
     }
   }
 }
 for (var xx = 0; xx < x; xx=xx+1) {
   for (var yy = 0; yy < y; yy=yy+1) {
     fl = 0;
     if (cellsArray[xx][yy] == 1) {
       if (xx-1 >= 0) fl += cellsArray[xx-1][yy];
       if (yy-1 >= 0) fl += cellsArray[xx][yy-1];
       if (xx+1 < x) fl += cellsArray[xx+1][yy];
       if (yy+1 < y) fl += cellsArray[xx][yy+1];
       if (fl == 0) {
         fll = 0;
       }
     }

      }
    }
//checking if canvas is playable, if not - recursively try to generate grid again
  if (checkAvailabilityOfCanvas(cellsArray) && fll == 1) {
  //filled the canvas with white and black cells based on values in cellsArray
    fillCanvas(cellsArray);
    figureSet = determineFigureSet(pentas, cellsArray);
    while (figureSet.length != fillableCellCount(cellsArray) / 5) {
      figureSet = determineFigureSet(pentas, cellsArray);
    }
    updateSolution(figureSet, cellsArray);
    console.log(solution);
    oldFSet = Array.from(figureSet);
   } else {
    generateRandomGrid();
  }
  monitornApplySetChanges(figureSet);
}

function generateRectGrid() {

}
