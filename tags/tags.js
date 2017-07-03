window.onload = function() {
	var aArr = document.getElementsByClassName("taghead");
	var divArr = document.getElementsByClassName("tagbody");
	var num = aArr.length;
	for (var i = 0; i < num; i++) {
		(function(i){
			aArr[i].addEventListener("click", function(){
				for (var j = 0; j < num; j++) {
					if (i != j) {
						aArr[j].classList.remove("active");
						divArr[j].classList.remove("active");
					}
					aArr[i].classList.add("active");
					divArr[i].classList.add("active");
				}
			});
		})(i);
	}
}