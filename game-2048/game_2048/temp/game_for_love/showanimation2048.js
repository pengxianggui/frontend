function showNumberWithAnimation(i, j, randNumber) {
	var numberCell = $("#number-cell-" + i + "-" + j);

	numberCell.css("background-color", getNumberBackgroundColor(randNumber));
	numberCell.css("color", getNumberColor(randNumber));
	numberCell.text(showChange((randNumber)));

	numberCell.animate({//jquery的animate()函数
		width: "100px",
		height: "100px",
		top: getPosTop(i, j),
		left: getPosLeft(i, j),
	}, 300);
}

function showMoveAnimation(fromx, fromy, tox, toy) {
	var numberCell = $("#number-cell-" + fromx + "-" + fromy);
	numberCell.animate({
		top: getPosTop(tox, toy),
		left: getPosLeft(tox, toy)
	}, 200);
}