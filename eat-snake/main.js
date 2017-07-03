/**
	思路：
		snakePosition数组记录组成整个蛇的所有div的位置坐标，它的长度是不断增长的。位置也是不断变化的
		通过snakePosition数组不断刷新（updateViewsnakePosition()）前端页面中div的位置。
*/

var snakePosition = new Array();//snakePosition记录“蛇”的每个div块对应的位置坐标
(function() {
	newgame();
})();

function newgame() {
	init();//初始化snakePosition
	generateOnePoint();//随机在游戏区域非蛇的位置显示一个10*10div块

	while(true) {
		if (!isgameover()) {
			movesnake();//一旦初始化完成，就蛇就开始走动，每执行一次，移动一步。因此这个函数无限制执行，直到死亡，游戏结束
		} else {
			/*提醒游戏结束*/
			break;
		}
	}
}

function init() {
	var i, j;
	for (i = 0; i < 5; i++) {
		snakePosition[i] = new Array();
		for (j = 0; j < 2; j++) {
			snakePosition[i][0] = 30;
			snakePosition[i][1] = 30 - i;
		}
	}

	updateViewsnakePosition();
}

function generateOnePoint() {
	if (nospace()) {
		return false;
	}


	while(true) {

	}
}

function updateViewsnakePosition() {
	var i, j, snakecell;
	var snakecells = document.querySelector("#block div");
	if ( snakecells != null) snakecells.remove();
	for (i = 0; i < snakePosition.length; i++) {
		document.getElementById("block").append('<div id="index-'+ i + '"></div>');
		snakecell = document.getElementById("index-" + i);
		snakecell.css("left", getPosLeft(i));
		snakecell.css("top", getPosTop(i));
	}
}

function getPosLeft(i) {
	return snakePosition[i][0] * 10;
}
function getPosTop(i) {
	return snakePosition[i][1] *10;
}