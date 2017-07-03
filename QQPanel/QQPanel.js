window.onload = function() {
	var panel = document.getElementById('panel');
	var control_panel = document.getElementById('up');
	eventUtils.getAddEventListener(control_panel, "mousedown", down);

	function down(e) {
		e = eventUtils.getEvent(e);
		var x0 = e.clientX - panel.offsetLeft;
		var y0 = e.clientY - panel.offsetTop;

		//应该将为整个document添加mousemove事件，否则鼠标移动快了，就会脱离控制
		eventUtils.getAddEventListener(document, "mousemove", move);

		function move(e) {
			e = eventUtils.getEvent(e);
			var x = e.clientX - x0;
			var y = e.clientY - y0;
			$canMoveWidth = document.documentElement.clientWidth - panel.offsetWidth;
			$canmoveHeight = document.documentElement.clientHeight - panel.offsetHeight;

			//下面是为了防止panel移动到窗口的外面
			x = x < 0 ? 0 : x;
			x = x > $canMoveWidth ? $canMoveWidth : x;
			y = y < 0 ? 0 : y;
			y = y > $canmoveHeight ? $canmoveHeight : y;

			panel.style.left = x + "px";
			panel.style.top = y + "px";
		}

		//为document添加mouseup事件，才能使得当鼠标在panel外松开时，也能保证up的执行
		eventUtils.getAddEventListener(document, "mouseup", up);

		function up(e) {
			e = eventUtils.getEvent(e);
			eventUtils.getRemoveEventListener(document, "mousemove", move);
			eventUtils.getRemoveEventListener(document, "mouseup", up);
		}
	}
	
};

