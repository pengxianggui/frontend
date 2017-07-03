window.onload = function() {
	var index = 0;//用于表示当前图片轮播到第几张图片，从0开始
	var ishover;
	var sons = document.getElementsByClassName("son");

	//将控制的div的伪数组变为真正的数组
	var controlDiv = Array.prototype.slice.call(document.getElementsByClassName("control"));
	//监听函数，鼠标移入事件
	for (var i = 0; i < 4; i++) {
		(function(i, controlDiv) {//需要用立即执行函数对数组中的所有元素进行绑定事件
				controlDiv[i].addEventListener("mouseover", function() {rotateByHover(i, controlDiv)});
		})(i, controlDiv);
	}
	
	//设置图片的自动播放
	setInterval(rotateAuto, 6000);

	/*
	 * 控制当鼠标不在block中时,图片轮播自动进行
	 */
	function rotateAuto() {
		//下面是监听鼠标是否移动到id为parent的div块上，需要的逻辑是，一旦鼠标移动上去了，就不会自动切换
		(function(index){
			sons[getChangeIndex(index)].addEventListener("mouseover", function() {ishover = true, console.log("true---show:"+index+"hover:"+(index < 2 ? (index + 2) : (index - 2)))});
			sons[getChangeIndex(index)].addEventListener("mouseout", function() {ishover = false, console.log("false--show:"+index+"hover:"+(index < 2 ? (index + 2) : (index - 2)))});
		})(index);
		if (!ishover) {
			rotateByHover(++index >= 4 ? 0 : index, controlDiv);	
		}
	}


}


function rotateByHover(num, controlDiv) {
	var rotateParent = document.getElementById("parent");
	//旋转parent
	rotateParent.style.transform = " translateZ(500px) rotateY(" + (num * 90) + "deg)";
	//别忘了，纠正control块的颜色 
	controlDiv[num].classList.add("hover");
	for (var i = 0; i < controlDiv.length; i++) {
		if (i !== num) {
			controlDiv[i].classList.remove("hover");
		}
	}
	index = num;
	console.log("index:"+index);
}

function getChangeIndex(index) {
	return index < 2 ? (index + 2) : (index - 2);
}