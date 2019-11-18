var pentas = [];
var solution = [];

function placeOne(figure, solarray, array) {
console.log(figure);
var ii = Math.floor(Math.random()*figure.length);
var color = randomColor();
for (var i = 0; i < figure[ii].length; i++) array[solarray[ii][1]+figure[ii][i][0]][solarray[ii][2]+figure[ii][i][1]] = color;
for (var i = ii; i < figure.length; i++) figure[i] = figure[i+1];
figure.length -= 1;
figureSet = Array.from(figure);
monitornApplySetChanges(figureSet);
fillCanvas(cellsArray);
updateSolution(figureSet, cellsArray);
}

function updateSolution(figure, array) {
  solution = [];
  for (var sx = 0; sx < array.length; sx=sx+1) {
    for (var sy = 0; sy < array[sx].length; sy=sy+1) {
      if (array[sx][sy] == 1) {
      fitnum=0;
      for (var i = 0; i < figure.length; i++) {
          for (var j = 0; j < figure[i].length; j++) {
            if (figure[i][j][0]+sx >= 0 && figure[i][j][1] + sy >=0 && figure[i][j][0] + sx < x && figure[i][j][1] + sy < y) {
             if (array[figure[i][j][0] + sx][figure[i][j][1] + sy] == 1)  {
              array[figure[i][j][0] + sx][figure[i][j][1] + sy] = 2;
              fitnum ++;
              }
            }
          }
          if (fitnum == 5) {
            solution.push([i, sx, sy])
            for (var j = 0; j < figure[i].length; j++) {
              if (figure[i][j][0]+sx >= 0 && figure[i][j][1] + sy >=0 && figure[i][j][0] + sx < x && figure[i][j][1] + sy < y) {
               if (array[figure[i][j][0] + sx][figure[i][j][1] + sy] == 2)  {
                array[figure[i][j][0] + sx][figure[i][j][1] + sy] = 3;
                }
              }
            }
          } else {
            for (var j = 0; j < figure[i].length; j++) {
              if (figure[i][j][0]+sx >= 0 && figure[i][j][1] + sy >=0 && figure[i][j][0] + sx < x && figure[i][j][1] + sy < y) {
               if (array[figure[i][j][0] + sx][figure[i][j][1] + sy] == 2)  {
                array[figure[i][j][0] + sx][figure[i][j][1] + sy] = 1;
                }
              }
            }
          }
          fitnum = 0;
        }
     }
   }
clearGridHippie(array, false);
}
}

function checkEmptyCell(nx, ny, array) {
   if (array[nx][ny] == 1) return true; else return false
}

function firstEmptyCell(array) {
  for (var xx = 0; xx < array.length; xx=xx+1) {
    for (var yy = 0; yy < array[xx].length; yy=yy+1) {
      if (array[xx][yy] == 1) {
        return [xx,yy];
      }
     }
   }
   return false;
}

function resetFigureSet(settoreset) {
settoreset = [];
return settoreset;
}

function determineFigureSet(figure, array) {
  nset = [];

  for (var sx = 0; sx < array.length; sx++) {
    for (var sy = 0; sy < array[sx].length; sy++) {
      if (array[sx][sy] == 1) {
      i = Math.floor(Math.random()*62);
      k = i;
      fitnum=0;
      for (i; i < figure.length; i++) {
          for (var j = 0; j < figure[i].length; j++) {
            if (figure[i][j][0]+sx >= 0 && figure[i][j][1] + sy >=0 && figure[i][j][0] + sx < x && figure[i][j][1] + sy < y) {
             if (array[figure[i][j][0] + sx][figure[i][j][1] + sy] == 1)  {
              array[figure[i][j][0] + sx][figure[i][j][1] + sy] = 2;
              fitnum ++;
              }
            }
          }
          if (fitnum == 5) {
            nset.push(figure[i]);
            for (var j = 0; j < figure[i].length; j++) {
              if (figure[i][j][0]+sx >= 0 && figure[i][j][1] + sy >=0 && figure[i][j][0] + sx < x && figure[i][j][1] + sy < y) {
               if (array[figure[i][j][0] + sx][figure[i][j][1] + sy] == 2)  {
                array[figure[i][j][0] + sx][figure[i][j][1] + sy] = 3;
                }
              }
            }
          } else {
            for (var j = 0; j < figure[i].length; j++) {
              if (figure[i][j][0]+sx >= 0 && figure[i][j][1] + sy >=0 && figure[i][j][0] + sx < x && figure[i][j][1] + sy < y) {
               if (array[figure[i][j][0] + sx][figure[i][j][1] + sy] == 2)  {
                array[figure[i][j][0] + sx][figure[i][j][1] + sy] = 1;
                }
              }
            }
          }
          fitnum = 0;
        }

        fitnum = 0;

      for (k; k >= 0; k--) {
            for (var j = 0; j < figure[k].length; j++) {
              if (figure[k][j][0]+sx >= 0 && figure[k][j][1] + sy >=0 && figure[k][j][0]+sx < x && figure[k][j][1] + sy < y){
                if (array[figure[k][j][0] + sx][figure[k][j][1] + sy] == 1) {
                array[figure[k][j][0] + sx][figure[k][j][1] + sy] = 2;
                fitnum ++;
                }
              }
            }
            if (fitnum == 5) {
              nset.push(figure[k]);
              for (var j = 0; j < figure[k].length; j++) {
                if (figure[k][j][0]+sx >= 0 && figure[k][j][1] + sy >=0 && figure[k][j][0]+sx < x && figure[k][j][1] + sy < y){
                  if (array[figure[k][j][0] + sx][figure[k][j][1] + sy] == 2) {
                  array[figure[k][j][0] + sx][figure[k][j][1] + sy] = 3;
                  }
                }
              }
            } else {
              for (var j = 0; j < figure[k].length; j++) {
                if (figure[k][j][0]+sx >= 0 && figure[k][j][1] + sy >=0 && figure[k][j][0]+sx < x && figure[k][j][1] + sy < y){
                  if (array[figure[k][j][0] + sx][figure[k][j][1] + sy] == 2) {
                  array[figure[k][j][0] + sx][figure[k][j][1] + sy] = 1;
                  }
                }
              }
            }
              fitnum = 0;
          }
       }
     }
  }
clearGrid(array, true)
return nset;
}

function drawFigure(sx, sy, figurear, array) {
  var figure = Array.from(figurear);
  var color;
  i = Math.floor(Math.random()*(figure.length-1));
  k = i;
  fitnum=0;
for (i; i < figure.length; i++) {
    for (var j = 0; j < figure[i].length; j++) {
      if (figure[i][j][0]+sx >= 0 && figure[i][j][1] + sy >=0 && figure[i][j][0] + sx < x && figure[i][j][1] + sy < y) {
       if (array[figure[i][j][0] + sx][figure[i][j][1] + sy] == 1)  {
        fitnum++;
        }
      }
    }
    if (fitnum == 5) {
      color = randomColor();
      for (var fini = 0; fini < figure[i].length; fini++) {
        array[figure[i][fini][0] + sx][figure[i][fini][1] + sy] = color;
      }
      for (var some = i; some < figure.length; some++) {
        figure[some] = figure[some+1];
      }
      figure.length = figure.length - 1;
      figureSet = Array.from(figure);
  //    monitornApplySetChanges(figureSet);
      return true;
    }
    fitnum = 0;
  }
  fitnum = 0;

for (k; k >= 0; k--) {
      for (var j = 0; j < figure[k].length; j++) {
        if (figure[k][j][0]+sx >= 0 && figure[k][j][1] + sy >=0 && figure[k][j][0]+sx < x && figure[k][j][1] + sy < y){
          if (array[figure[k][j][0] + sx][figure[k][j][1] + sy] == 1) {
          fitnum ++;
          }
        }
      }
      if (fitnum == 5) {
        color = randomColor();
        for (var fini = 0; fini < figure[k].length; fini++) {
          array[figure[k][fini][0] + sx][figure[k][fini][1] + sy] = color;
        }
        for (var some = k; some < figure.length; some++) {
          figure[some] = figure[some+1];
        }
        figure.length = figure.length - 1;
        figureSet = Array.from(figure);
    //    monitornApplySetChanges(figureSet);
        return true;
      }
        fitnum = 0;
    }
    return false;
}

function drawFigureBetter(sx, sy, figurear, array) {
  var figure = Array.from(figurear);
  var maxnum = 0;
  var fl = 0;;
  var figind;
  var neighbournum;
  console.log(figurear, figureSet);
  for (var i = 0; i < figure.length; i++) {
    neighbournum = 0;
    fl = 0;
    for (var j = 0; j < figure[i].length; j++) {
      if (fl == 0) {
      if (figure[i][j][0]+sx >= 0 && figure[i][j][1] + sy >=0 && figure[i][j][0]+sx < x && figure[i][j][1] + sy < y && array[figure[i][j][0]+sx][figure[i][j][1]+sy] == 1){
        neighbournum = neighbournum + countNeighboursForSolve(figure[i][j][0]+sx, figure[i][j][1]+sy, array);
      } else {
        fl = 1;
      }
    }
  }
    if (neighbournum > maxnum) {
      figind = i;
      maxnum = neighbournum;
    }
  }
color = randomColor();
for (var i = 0; i < figure[figind].length; i++) {
    if (array[figure[figind][i][0]+sx][figure[figind][i][1]+sy] == 1 ) {
      array[figure[figind][i][0]+sx][figure[figind][i][1]+sy] = color;
    } else return false;
  }
  for (var j = figind; j < figure.length; j++) {
    figure[j] = figure[j+1];
  }
  figure.length = figure.length - 1;
  figureSet = Array.from(figure);
  return true;
}

var counter = 0;
var solved = 0;

function startSolve() {
  figureSet = Array.from(oldFSet);
  oldFSet = Array.from(figureSet);
//console.log(cellsArray);
if (counter < 1000) {
  if (!solve()) {
    counter = counter + 1;
    console.log(counter, "hello");
    setTimeout(startSolve, 10);
  } else {
    counter = 0;
  }
} else {
  counter = 0;
  //console.log("cant solve");
  clearGrid(cellsArray, true);
  monitornApplySetChanges(oldFSet);
}
if (solved == 1) monitornApplySetChanges(figureSet);
}

function solve() {
  for (var xx = 0; xx < cellsArray.length; xx=xx+1) {
    for (var yy = 0; yy < cellsArray[xx].length; yy=yy+1) {
        if (cellsArray[xx][yy] == 1) {
          if (!drawFigure(xx, yy, figureSet, cellsArray)) {
            clearGrid(cellsArray, false);
            return false;
        }
      }
    }
   }
   fillCanvas(cellsArray);
   solved += 1;
   return true;
}


// fill in the array with pentomino figures per https://en.wikipedia.org/wiki/Pentomino#Symmetry

// 4 vaiations of L figure
pentas.push([[0,0], [1,0], [2,0], [3,0], [3,1]]);
pentas.push([[0,0], [1,1], [1,2], [1,3], [1,0]]);
pentas.push([[0,0], [0,1], [1,1], [2,1], [3,1]]);
pentas.push([[0,0], [1,0], [0,1], [0,2], [0,3]]);

// 4 vaiations of mirrored L figure
pentas.push([[0,0], [1,0], [2,0], [3,0], [3,-1]]);
pentas.push([[0,0], [0,1], [0,2], [0,3], [1,3]]);
pentas.push([[0,0], [1,0], [2,0], [3,0], [0,1]]);
pentas.push([[0,0], [1,0], [1,1], [1,2], [1,3]]);


// 8 vaiations of F figure
pentas.push([[0,0], [1,0], [1,-1], [2,-1], [1,1]]);
pentas.push([[0,0], [1,0], [1,-1], [2,0], [2,1]]);//
pentas.push([[0,0], [0,1], [1,1], [1,2], [2,1]]);
pentas.push([[0,0], [1,0], [1,1], [1,2], [2,1]]);
pentas.push([[0,0], [1,0], [1,-1], [2,0], [0,1]]);
pentas.push([[0,0], [1,0], [1,1], [2,1], [1,2]]);
pentas.push([[0,0], [1,0], [1,1], [1,-1], [2,1]]);
pentas.push([[0,0], [1,0], [1,1], [2,0], [2,-1]]);

// 8 vaiations of N figure
pentas.push([[0,0], [0,1], [0,2], [1,2], [1,3]]);
pentas.push([[0,0], [1,0], [1,-1], [2,-1], [3,-1]]);
pentas.push([[0,0], [1,0], [2,0], [2,-1], [3,-1]]);
pentas.push([[0,0], [0,1], [1,1], [1,2], [1,3]]);
pentas.push([[0,0], [1,0], [1,-1], [0,1], [0,2]]);
pentas.push([[0,0], [1,0], [2,0], [2,1], [3,1]]);
pentas.push([[0,0], [1,0], [1,1], [2,1], [3,1]]);
pentas.push([[0,0], [0,1], [1,0], [1,-1], [1,-2]]);

// 8 vaiations of P figure
pentas.push([[0,0], [1,0], [2,0], [0,1], [1,1]]);
pentas.push([[0,0], [1,0], [0,1], [1,1], [1,2]]);
pentas.push([[0,0], [1,1], [0,1], [0,2], [1,2]]);
pentas.push([[0,0], [1,0], [2,0], [1,-1], [2,-1]]);
pentas.push([[0,0], [0,1], [0,2], [1,0], [1,1]]);
pentas.push([[0,0], [1,0], [2,0], [1,1], [2,1]]);
pentas.push([[0,0], [1,0], [0,1], [1,1], [2,1]]);
pentas.push([[0,0], [0,1], [1,1], [1,0], [1,-1]]);

// 8 vaiations of Y figure
pentas.push([[0,0], [0,1], [0,2], [0,3], [1,2]]);
pentas.push([[0,0], [1,0], [2,0], [3,0], [1,1]]);
pentas.push([[0,0], [1,0], [2,0], [3,0], [2,-1]]);
pentas.push([[0,0], [1,1], [1,0], [1,-1], [1,2]]);
pentas.push([[0,0], [1,0], [2,0], [3,0], [2,1]]);
pentas.push([[0,0], [1,1], [1,0], [1,-1], [1,-2]]);
pentas.push([[0,0], [0,1], [0,2], [0,3], [1,1]]);
pentas.push([[0,0], [1,0], [1,-1], [2,0], [3,0]]);

// 4 vaiations of T figure
pentas.push([[0,0], [1,0], [2,0], [1,1], [1,2]]);
pentas.push([[0,0], [1,-1], [1,0], [1,-2], [2,0]]);
pentas.push([[0,0], [1,0], [2,0], [2,-1], [2,1]]);
pentas.push([[0,0], [0,1], [0,2], [1,1], [2,1]]);

// 4 vaiations of U figure
pentas.push([[0,0], [0,1], [1,1], [2,1], [2,0]]);
pentas.push([[0,0], [0,1], [1,0], [2,0], [2,1]]);
pentas.push([[0,0], [0,1], [0,2], [1,0], [1,2]]);
pentas.push([[0,0], [1,0], [1,1], [1,2], [0,2]]);

// 4 vaiations of V figure
pentas.push([[0,0], [0,1], [0,2], [1,2], [2,2]]);
pentas.push([[0,0], [1,0], [2,0], [2,-1], [2,-2]]);
pentas.push([[0,0], [0,1], [0,2], [1,0], [2,0]]);
pentas.push([[0,0], [1,0], [2,0], [2,1], [2,2]]);

// 4 vaiations of W figure
pentas.push([[0,0], [0,1], [1,1], [1,2], [2,2]]);
pentas.push([[0,0], [1,0], [1,-1], [2,-1], [2,-2]]);
pentas.push([[0,0], [1,0], [1,1], [2,1], [2,2]]);
pentas.push([[0,0], [0,1], [1,0], [1,-1], [2,-1]]);

// 4 vaiations of Z figure
pentas.push([[0,0], [1,0], [1,1], [1,2], [2,2]]);
pentas.push([[0,0], [1,-1], [1,0], [1,-2], [2,-2]]);
pentas.push([[0,0], [1,0], [2,0], [2,-1], [0,1]]);
pentas.push([[0,0], [0,1], [1,1], [2,1], [2,2]]);

// 2 vaiations of I figure
pentas.push([[0,0], [1,0], [2,0], [3,0], [4,0]]);
pentas.push([[0,0], [0,1], [0,2], [0,3], [0,4]]);

// 1 vaiation of X figure
pentas.push([[0,0], [1,0], [2,0], [1,-1], [1,1]]);
