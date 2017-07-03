//游戏面板——数据
var board = new Array();//是一个全局变量，应用了闭包特性
var pressPoint = [0, 0]; //记录手指按下时的坐标，初始值为0
var issuccess = false;
//文档加载时
$(document).ready(function() {
	newgame();//HTML文档加载时，只是去开始一个新的函数：newgame()

	document.onkeydown = function(event) {
		keyDown(event);
	}

});

function newgame() {
	//初始化棋盘格
	init();
	//在随机两个格子生成数字(number-cell)
	generateOneNumber();
	generateOneNumber();
}

function init() {
	var i, j, girdCell;
	//对16个格子的位置进行赋值
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			girdCell = $("#gird-cell-" + i + "-" + j);//取到小格子
			//然后去定位这些格子,top和left的值由另外的两个函数根据i、j去计算，这两个函数存放在support2048.js文件中
			girdCell.css("top", getPosTop(i, j));
			girdCell.css("left", getPosLeft(i, j));
		}
	}

	for (i = 0; i < 4; i++) { //让board变成一个二维数组
		board[i] = new Array();
		for (j = 0; j < 4; j++) {
			board[i][j] = 0; //初始化board二维数组,初始值为0
		}
	}
	score = 0;
	$("#grade").text("0");
	$("#aimgrade").text(showChange(2048));
	$("#grid-container").css("border", "none");
	updateScore();
	updateGrade();
	updateBoardView();
}

function keyDown(event) {
	// if (event.targetTouches.length === 1) {
		// alert("touchend");
		if (!isgameover(board)) {//判断一下游戏是否结束
			$("#grid-container").css("border","3px solid red");
			alert("Game Over");
		}
		switch(event && event.keyCode) {
			case 37: //玩家按下左箭头
			console.log("左移：37");
				if(moveLeft()) {	//将格盘中所有的方块(number-cell)都向左移动,并且返回一个boolean值，表示是否还能继续向左移动
					setTimeout("generateOneNumber()", 200);//在格盘空余初随机生成一个初始数据
				}

				break;
			case 38: //玩家按下上箭头
			console.log("上移：38");
				if(moveUp()) {	//将格盘中所有的方块(number-cell)都向上移动,并且返回一个boolean值，表示是否还能继续向上移动
					setTimeout("generateOneNumber()", 200);//在格盘空余初随机生成一个初始数据
				}	
				break;
			case 39: //玩家按下右箭头
			console.log("右移：39");
				if(moveRight()) { //将格盘中所有的方块(number-cell)都向右移动,并且返回一个boolean值，表示是否还能继续向右移动
					setTimeout("generateOneNumber()", 200);//在格盘空余初随机生成一个初始数据
				}	
				break;
			case 40: //玩家按下下箭头
			console.log("下移：40");
				if(moveDown()) { //将格盘中所有的方块(number-cell)都向下移动,并且返回一个boolean值，表示是否还能继续向下移动
					setTimeout("generateOneNumber()", 200);//在格盘空余初随机生成一个初始数据
				}
				break;

			default:
				break;
		}
	// }
}


/*updateBoardView函数是根据board二维数组的数据对前端的数字方块number-cell进行操作的函数*/
function updateBoardView() {
	var i, j, theNumberCell;
	$(".number-cell").remove();//删除格盘中的number-cell
	for (i = 0; i < 4; i++) { 
		for (j = 0; j < 4; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+ i + '-' + j +'"></div>');
			theNumberCell = $("#number-cell-" + i + "-" + j);

			//board数组中值不同，前端html页面中的显示也不同
			if (board[i][j] === 0) {//如果theNumberCell对应的board中的元素为0，则该numberCell不显示，同时放在grid-Cell中间
				theNumberCell.css("width", "0");
				theNumberCell.css("height", "0");
				theNumberCell.css("top", getPosTop(i, j) + 30);
				theNumberCell.css("left", getPosLeft(i, j) + 30);
			} else {//如果对应的board中的元素不为0
				theNumberCell.css("width", "60px");
				theNumberCell.css("height", "60px");
				theNumberCell.css("top", getPosTop(i, j));
				theNumberCell.css("left", getPosLeft(i, j));
				/*getNumberBackgroundColor和getNumberColor都是自定义函数，因为number-cell的背景色和前景色都是根据board元素数据的不同而不同*/
				theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
				theNumberCell.css("color", getNumberColor(board[i][j]));
				theNumberCell.text(showChange(board[i][j]));
			}
		}
	}
}

/*在格盘可空余地方随机随机生成一个数字number-cell*/
function generateOneNumber() {
	//生成数字前需要判断一下是否格盘还有空的空间
	if (nospace(board)) {//如果没有空余的空间
		return false;
	}

	/*随机一个位置,[0, 3]*/
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	while (true) {
		if (board[randx][randy] === 0) {//判断随机生成的位置上是否没有number-cell了，即是否是空的，只有空的才能在这个位置上生成新的number-cell。
			break;
		}

		//否则继续生成随机位置
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));
	}

	/*随机一个数字：2或者4*/
	var randNumber = Math.random() < 0.5 ? 2 : 4;

	/*在随机位置显示随机数字*/
	board[randx][randy] = randNumber;//更新board数组中的数据
	showNumberWithAnimation(randx, randy, randNumber);//以动画的形式显示出这个随机数,因此用函数封装

	return true;
}

/*判断游戏是否结束*/
function isgameover(board) {
	if (canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board))
		return true;

	return false;
}

/*将棋盘中的number-cell都向左移动*/
function moveLeft() {
	var i, j, k;
	//移动之前要先判断一下是否可以向左移动，在canMoveLeft()函数中
	if (!canMoveLeft(board)) {
		return false;
	}

	for (i = 0; i < 4; i++) {//对格盘所有元素进行移动处理
		for (j = 1; j < 4; j++) {//除了第一列
			if (board[i][j] != 0) {//只有不为0，即有数字number-cell时，才需要移动
				for (k = 0; k < j; k++) {
					if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {//noBlockHorizontal()是判断在该number-cell左侧是否有number-cell
						//则 可以 move
						showMoveAnimation(i, j, i, k);//移动动画函数
						//然后要对board进行更新
						board[i][k] = board[i][j];
						board[i][j] = 0;

						continue;//结束本次循环，进行下一轮循环
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
						//则，可以move
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;

						continue;
					}
				}
			}
		}
	}
	//上面只是改变了移动number-cell之后的board数组里的值,html页面中的div并没有移动，因此要调用updateBoardView
	//由于直接调用updateBoardView后会迅速对格盘进行一次大扫除，因此showMoveAnimation这里面的200毫秒的动画来不及显示，格盘就已经被刷新了。因此可以使用setTimeout("function",200);
	//updateBoardView();//使用updateBoardView根据board数组里面的值对前端的页面number-cell的格局进行一次刷新
	setTimeout("updateBoardView()", 200);//第一个参数是函数名包括括号
	updateScore();
	updateGrade();
	setTimeout("isSuccess()", 200);
	return true;
}

/*将棋盘中的number-cell都向上移动*/
function moveUp() {
	var i, j, k;
	if (!canMoveUp(board)) {
		return false;
	}

	for (i = 1; i < 4; i++) {//对格盘所有元素进行向上移动处理,除了第一行
		for (j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (k = 0; k < i; k++) {//判断需要移动的number-cell的上面是否存在number-cell
					if (board[k][j] === 0 && noBlockVertical(j, k, i, board)) {
						//则可以move
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;

						continue;
					} else if (board[i][j] === board[k][j] && noBlockVertical(j, k, i, board)) {//判断需要移动的number-cell的上面的number-cell是否和本number-cell值一样
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;

						continue;
					}
				}
			}
		}
	}

	//调用updateBoardView的理由同上，setTimeout()的理由也一样
	setTimeout("updateBoardView()", 200);
	updateScore();
	updateGrade();
	setTimeout("isSuccess()", 200);
	return true;
}

/*将棋盘中的number-cell都向右移动*/
function moveRight() {
	var i, j, k;
	if (!canMoveRight(board)) {
		return false;
	}

	for (i = 0; i < 4; i++) {
		for (j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {
				for (k = 3; k > j; k--) {//遍历需要移动的numer-cell的右边所有的number-cell
					if (board[i][k] === 0 && noBlockHorizontal(i, j, k, board)) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;

						continue;
					} else if (board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board)) {
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;

						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	updateScore();
	updateGrade();
	setTimeout("isSuccess()", 200);
	return true;
}

/*将棋盘中的number-cell都向下移动*/
function moveDown() {
	var i, j, k;
	if (!canMoveDown(board)) { 
		return false;
	}

	for (i = 2; i >= 0; i--) {
		for (j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (k = 3; k > i; k--) {
					if (board[k][j] === 0 && noBlockVertical(j, i, k, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;

						continue;

					} else if (board[i][j] === board[k][j] && noBlockVertical(j, i, k, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;					

						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	updateScore();
	updateGrade();
	setTimeout("isSuccess()", 200);
	return true;
}



/*改变当前的分数score*/
function updateScore() {
	var i, j;
	var score = 0;//游戏得分——数据——初始值为0
	for (i = 0 ; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			score += board[i][j];
		}
	}
	$("#score").text(score);
}

function updateGrade() {
	$("#grade").text(showChange(boardMax(board)));
}

/*判断玩家是否玩到了2048*/
function isSuccess() {
	if (issuccess) {
		return;
	}
	if (boardMax(board) >= 2048) {
		issuccess = true;
		$("#grid-container").css("border","3px solid green");
		alert("恭喜成功通关！");
	}
}

