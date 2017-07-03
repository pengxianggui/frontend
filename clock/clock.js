// JavaScript Document
function fun1(e){
	var hour = e.value;
	if(hour<0 && hour>23){
		return false;
	}
	else{
		document.getElementById("hour").style.animation="none";
		document.getElementById("hour").style.transform="rotate("+hour*30+"deg)";
		return true;
	}
	
}

function fun3(e){
	var second = e.value;
	var secondPoint = document.getElementById("second");
	if(second<0&&second>59){
		return false;
	}
	else{
		secondPoint.style.animation="none";//首先停掉动画
		secondPoint.style.animationPlayState="paused";
		secondPoint.style.animation="TIME1 infinite 60s -"+second+"s both steps(60)";//
	}
}

function fun4(e){
	alert("hello");
	return true;
	//var size = e.value;
	//alert(size);
	//document.body.style.fontSize*=size;
}