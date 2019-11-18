//convinient version of fillRect, this fills a rect with a particular color
function fillRectUpd(nx,ny,width,height,color) {
ctx.fillStyle = color;
ctx.fillRect(nx,ny,width,height);
}

//fill canvas cells according to an existing array values
function fillCanvas(array) {
  for (var xx = 0; xx < array.length; xx=xx+1) {
    for (var yy = 0; yy < array[xx].length; yy=yy+1) {
      if(array[xx][yy] == 1) {
         fillRectUpd(xx*cellWidth, yy*cellHeight, cellWidth-1, cellHeight-1, "white");
      } else if (array[xx][yy] == 0 ){
        fillRectUpd(xx*cellWidth, yy*cellHeight, cellWidth-1, cellHeight-1, "black");
      }
        else if (array[xx][yy] == 2){
        fillRectUpd(xx*cellWidth, yy*cellHeight, cellWidth-1, cellHeight-1, "red");
      } else if (array[xx][yy] == 3) {
        fillRectUpd(xx*cellWidth, yy*cellHeight, cellWidth-1, cellHeight-1, "green");
      } else {
        fillRectUpd(xx*cellWidth, yy*cellHeight, cellWidth-1, cellHeight-1, array[xx][yy]);
      }
     }
   }
}
function placeFigure(event, figure, ind, array) {
  var fl = 0;
  var i = 0;
  var fitment = 0;
  var xx = Math.floor(event.clientX/cellWidth);
  var yy = Math.floor(event.clientY/cellHeight);
  var color = randomColor();
  while ((fl == 0) && (i < 5)) {
    if (xx+figure[i][0] < x && yy+figure[i][1] < y && yy+figure[i][1] >= 0 && xx+figure[i][0] >= 0 && array[figure[i][0]+xx][yy+figure[i][1]] == 1) {
      fitment = fitment + 1;
    } else {
      fl = 1;
    }
    i = i + 1;
  }
  if (fitment == 5) {
    for (var i = 0; i < 5; i++) {
        array[xx+figure[i][0]][yy+figure[i][1]] = color;
    }
    for (var some = ind; some < figureSet.length; some++) {
      figureSet[some] = figureSet[some+1];
    }
    figureSet.length = figureSet.length - 1;
    monitornApplySetChanges(figureSet);
  }
  fillCanvas(array);
}
function removeFigureFromSet() {

}
function monitornApplySetChanges(set) {
  var node = document.getElementById('figPicker');
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  for (var ind = 0; ind < set.length; ind++) {
      var offset = 0;
    var fig = document.createElement("canvas");
    fig.width = 150;
    fig.height = 150;
    fig.figind = ind;
    fig.onclick = function() {
      selectFigure(set, this.figind);
  };
    figctx = fig.getContext("2d");
    for (var j = 0; j < 5; j++) {
      if (set[ind][j][1]+offset < 0) {
        offset = offset + 1;
      }
    }
      for (var j = 0; j < 5; j++) {
        figctx.fillRect(set[ind][j][0]*30, (set[ind][j][1]+offset)*30, 29, 29);
    }
    node.appendChild(fig);
  }
  selectFigure(set, 0);
}

var selectedFigure;
var selectedind;
function selectFigure(set, figureind) {
selectedFigure = set[figureind];
selectedind = figureind;
}

function prePlaceFigure(event, figure) {
  var fl = 0;
  if (figure != null) {
  fillCanvas(cellsArray);
  var xx = Math.floor(event.clientX/cellWidth);
  var yy = Math.floor(event.clientY/cellHeight);
  for (var i = 0; i < 5; i++) {
      fillRectUpd((figure[i][0]+xx)*cellWidth, (figure[i][1]+yy)*cellHeight, cellWidth-1, cellHeight-1, "lightblue");

  }
}
}
function fillableCellCount(array) {
  count = 0;
  for (var xx = 0; xx < array.length; xx=xx+1) {
    for (var yy = 0; yy < array[xx].length; yy=yy+1) {
      if(array[xx][yy] == 1 || array[xx][yy] == 2 || array[xx][yy] == 3) {
        count++;
      }
     }
   }
   return count;
}
//function that checks if total amount of white cells is multiple to five and if canvas is not plain white or black
function checkAvailabilityOfCanvas(array) {
  multfive = true;
  total = 0;
  for (var xx = 0; xx < array.length; xx=xx+1) {
    for (var yy = 0; yy < array[xx].length; yy=yy+1) {
      if (array[xx][yy] == 3 || array[xx][yy] == 2) {
        total = total + 1;
      }
         total = total + array[xx][yy];
     }
   }
   if ((total % 5 != 0) || (total == 0) || (total == x*y)){
      multfive = false;
   }
   return multfive;
}

function clearGrid(array, needDraw) {
  for (var xx = 0; xx < array.length; xx=xx+1) {
    for (var yy = 0; yy < array[xx].length; yy=yy+1) {
      if ((array[xx][yy] != 1) && (array[xx][yy] != 0)) {
        array[xx][yy] = 1;
      }
     }
   }
   if (needDraw = true) {
     fillCanvas(array);
   }
}

function clearGridHippie(array, needDraw) {
  for (var xx = 0; xx < array.length; xx=xx+1) {
    for (var yy = 0; yy < array[xx].length; yy=yy+1) {
      if ((array[xx][yy] != 1) && (array[xx][yy] != 0) && (typeof array[xx][yy] != 'string')) {
        array[xx][yy] = 1;
      }
     }
   }
   if (needDraw = true) {
     fillCanvas(array);
   }
}

//canvas reset function for making canvas color plain black to draw cells on it
function resetCanvas() {
fillRectUpd(0, 0, canvas.width, canvas.height, "black");
}

//function that sums values of 8 adjacent cells of particular cell
function countNeighbours(nx, ny, array) {
  var total = 0;
  for (var xx = nx-1; xx <= nx+1; xx=xx+1) {
    for (var yy = ny-1; yy <= ny+1; yy=yy+1) {
          if ((xx >= 0) && (yy >=0) && (xx < x) && (yy < y)){
              total = total + array[xx][yy];
          }
        }
     }
     total = total + Math.random()*(4)-2;
  return total;
}

function countNeighboursForSolve(nx, ny, array) {
  var total = 0;
  for (var xx = nx-1; xx <= nx+1; xx=xx+1) {
    for (var yy = ny-1; yy <= ny+1; yy=yy+1) {
          if ((xx >= 0) && (yy >=0) && (xx < x) && (yy < y)){
            if (array[xx][yy] != 0 && array[xx][yy] != 1) {
              total = total + 1;
            } else {
            total = total + array[xx][yy];
          }
          }
        }
     }
  return total;
}
//simple function to create 2d array for any purposes
function create2dArray(c, r) {
var newArray = new Array(c);
for (var i = 0; i < newArray.length; i++) {
  newArray[i] = new Array(r);
}
for (var xx = 0; xx < newArray.length; xx=xx+1) {
  for (var yy = 0; yy < newArray[xx].length; yy=yy+1) {
    newArray[xx][yy] = 0;
  }
}
return newArray;
}
