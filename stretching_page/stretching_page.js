window.onload = function() {
	var parent = document.getElementById("parent");
	var sonArr = parent.getElementsByClassName("son");
	var sonNum = sonArr.length;
	var $parentWidth = 600;//伸缩区间的区域宽度，与css中保持一致
	var $offSet = $parentWidth / (2 * (sonNum - 1));//两张图片重叠的宽度

	initPosition(sonArr, $offSet, $parentWidth);//初始化图片位置

	//下面为sonArr中的节点添加事件监听
	for (var i = 0; i < sonArr.length; i++) {
		(function(i){
			sonArr[i].addEventListener("mouseover", function(){
				initPosition(sonArr, $offSet, $parentWidth);//先初始化一下位置
				// console.log(i);//验证是否可以取到i
				for(var j = i; j > 0; j--) {
					sonArr[j].style.left = j * $offSet + 'px';
				}
			});
		})(i);
	}
};

/*
 * 初始化图片的位置
 */
function initPosition(arr, $offSet, $parentWidth) {
	for (var i = 1; i < arr.length; i++) {
		arr[i].style.left = (i - 1) * $offSet + ($parentWidth / 2) + 'px';
	}
}