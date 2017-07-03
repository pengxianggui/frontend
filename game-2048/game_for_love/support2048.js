function getPosTop(i, j) {
	return 20 + i * 120;
}

function getPosLeft(i, j) {
	return 20 + j * 120;
}

function getNumberBackgroundColor(number) {
	switch(number) {
		case 2: return "#eee4da"; break;
		case 4: return "#ede0c8"; break;
		case 8: return "#f2b179"; break;
		case 16: return "#f59563"; break;
		case 32: return "#f67c5f"; break;
		case 64: return "#f65e3b"; break;
		case 128: return "#edcf72"; break;
		case 256: return "#edcc61"; break;
		case 512: return "#99cc00"; break;
		case 1024: return "#33b5e5"; break;
		case 2048: return "#0099cc"; break;
		case 4096: return "#aa66cc"; break;
		case 8192: return "#9933cc"; break;
	}
	return "black";
}

function getNumberColor(number) {
	if (number <= 4) {
		return "#776e65";
	}

	return "white";
}

function nospace(board) {
	var i, j;
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			if (board[i][j] === 0) {
				return false;
			}
		}
	}

	return true;
}

/*判断格盘上的是否存在number-cell还能向左移动*/
function canMoveLeft(board) {
	var i, j;
	for (i = 0; i < 4; i++) {
		for (j = 1; j < 4; j++) { //向左的移动的判断中，最左边一列无需向左移动，因此j只需从1开始
			if (board[i][j] != 0) {
				if (board[i][j - 1] === 0 || board[i][j] === board[i][j - 1]) { //目标number-cell的左边如果没有number-cell或者左边的number-cell的值等于自己，则可以向左移动。只要有一个可以向左移动，就可以返回true
					return true;
				}
			}
		}
	}
	return false; //否则不可以向左移动
}

/*判断格盘上的是否存在number-cell还能向上移动*/
function canMoveUp(board) {
	var i, j;
	for (i = 1; i < 4; i++) {//第一行无需向上移动
		for (j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i - 1][j] === 0 || board[i][j] === board[i - 1][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

/*判断格盘上的是否存在number-cell还能向右移动*/
function canMoveRight(board) {
	var i, j;
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 3; j++) {
			if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) {
				return true;
			}
		}
	}

	return false;
}

/*判断格盘上的是否存在number-cell还能向下移动*/
function canMoveDown(board) {
	var i, j;
	for (i = 0; i < 3; i++) {
		for (j = 0; j < 4; j++) {
			if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) {
				return true;
			}
		}
	}

	return false;
}

/*判断要移动的number-cell和左侧空值的number-cell之间是否有非空值的number-cell*/
function noBlockHorizontal(row, col1, col2, board) {
	var j;
	for (j = col1 + 1; j < col2; j++) {
		if (board[row][j] != 0) {
			return false;
		}
	}
	return true;
}

/*判断要移动的number-cell和头顶上空值的number-cell之间是否有非空的number-cell*/
function noBlockVertical(col, row1, row2, board) {
	var i;
	for (i = row1 + 1; i < row2; i++) {
		if (board[i][col] != 0) {
			return false;
		}
	}
	return true;
}

function showChange(num) {
	return data[Math.log2(num) - 1];
}
 
function boardMax(board) {
	var temp = board.join(",").split(",");//转化为一维数组
	return Math.max.apply(null, temp);//最大值
}

/*移动端判断触摸滑动的方向*/
function moveDirection(event, pressPoint) {
	var touch = event.changedTouches[0];
	// console.log(touch.pageX+"; "+touch.pageY);
	var moveX = touch.pageX - pressPoint[0];
	var moveY = touch.pageY - pressPoint[1];
	var touchSensitive = $("#touchSensitive")[0].value;
	console.log(touchSensitive);
	if (Math.abs(moveX) > Math.abs(moveY)) {
		if (moveX > touchSensitive) {
			return 39;//向右
		} else if (moveX < -touchSensitive) {
			return 37;//向左
		}
	} else {
		if (moveY > touchSensitive) {
			return 40;//向下
		} else if (moveY < -touchSensitive){
			return 38;//向上
		}
	}
}