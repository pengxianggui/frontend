$(document).ready(function(){
	var numStr = getNum("20150710");//将数字转换成字符串,接受数字型字符串也接受数字
	init(numStr);
});


function getNum(num) {
	return num.toString();
}

function init(numStr) {
	var numBlock = document.getElementById("numBlock");
	var numStrArr = numStr.split("");//将numStr转换成字符串数组
	var iTag;//代表i标签
	//先追加numStrArr.length个i标签，并设置background-position初始值
	for (var i = 0; i < numStrArr.length; i++) {
		iTag = document.createElement("i");
		iTag.style.backgroundPosition = "0px 0px";
		numBlock.appendChild(iTag);
		iTag = null;
	}

	//再更改i标签background-position的值
	for (var j = 0; j < numStrArr.length; j++) {
		$("#numBlock > i:nth-of-type(" + (j + 1) + ")").animate({
			backgroundPositionX: getPosX(numStrArr, j) + "px",
			backgroundPositionY: getPosY(numStrArr, j) + "px"
		}, 2000, "easeInOutExpo");
	}
}

/*
 * 暂时没有用到%和千分号
 */
function getPosX(numStrArr, index) {
	return 0;
}

/*
 * 举例10341
 * 则0位置的1的背景需要移动   -(0*200 + 1*20) px
 *   1......0................ -(1*200 + 0*20) px
 *   2......3................ -(10*200 + 3*20) px
 *   3......4................ -(103*200 + 4*20) px
 *   4......1................ -(1034*200 + 1*20) px
 *   我们根据上面的推论构造式子：
 *   index..numStrArr[index]..param*200 + numStrArr[index]*20 px
 *   并且他们的时间都是相同的，如上面2000,
 *   因此，构造出param是关键
 */
function getPosY(numStrArr, index) {
	var param = 0;
	for (var i = 0; i < index; i++) {
		param += numStrArr[i];//这里是字符串拼接
	}
	param -= 0;//这里是将最后拼接而成的字符串编程数字
	var posY = getResult(param, numStrArr[index]);
	return  param < 10000 ? getResult(param, numStrArr[index]) : getResult(10000 * index, numStrArr[index]);
}

function getResult(param, value) {
	return -(param * 200 + value * 20);
}