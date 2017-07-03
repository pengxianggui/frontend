/**
 * eventUtils类封装了js事件处理的常用属性和方法，为的是解决浏览器关于事件处理过程中
 * 存在的兼容性问题。例如绑定事件的方式，获取事件的触发元素、阻止冒泡，阻止事件的默认
 * 行为等等。eventUtils提供了一个事件处理兼容性问题较为综合普遍的解决方案。eventUtils
 * 还可以进一步完善。
 */
var eventUtils = {
	/**
	 * 为一个元素添加事件
	 * @param  {HTMLElement} element   html元素对象
	 * @param  {String} type      事件类型，如"click"
	 * @param  {Function} handerFun 触发element的click事件时，执行的函数,需要用户自己自定义传入
	 * @return {[type]}           无返回值
	 */
	getAddEventListener: function(element, type, handerFun) {
		if (element.addEventListener) {//浏览器支持element调用addEventListener()方法
			element.addEventListener(type, handerFun, false);
		} else if (element.attachEvent) {//浏览器不支持addEventListener()，而是支持attachEvent()，如IE8之前
			element.attachEvent("on" + type, handerFun);
		} else { //如果上面的两种DOM2级事件添加方法都不支持，则采用DOM0级方式
			element['on' + type] = handerFun;
		}
	},

	/**
	 * 为一个元素删除添加了的事件
	 * @param  {HTMLElement} element   html元素对象
	 * @param  {String} type      事件类型，如"click"
	 * @param  {Function} handerFun 触发事件时执行的函数，需要用户自定义传入
	 * @return {[type]}           无返回值
	 */
	getRemoveEventListener: function(element, type, handerFun) {
		if (element.removeEventListener) {//DOM2级事件处理方式
			element.removeEventListener(type, handerFun, false);
		} else if (element.detachEvent) {//DOM2级事件另一种处理方式
			element.detachEvent("on" + type, handerFun);
		} else {//DOM0级处理方式
			element["on" + type] = null;
		}
	},

	/**
	 * 获取事件对象，在IE老版本浏览器中，事件对象的获取通过window.event因此需要兼容处理
	 * @param  {Event} event 事件对象
	 * @return {Event}       返回事件对象
	 */
	getEvent: function(event) {
		return event?event:window.event;//event有效，则取event，无效则采用window.event
	},

	/**
	 * 获取事件类型
	 * @param  {Event} event 事件对象
	 * @return {String}       返回事件类型，如"click"
	 */
	getType: function(event) {
		return event.type;//事件类型各类浏览器都一样，无需做兼容性处理
	},

	/**
	 * 获取事件的target属性
	 * @param  {Event} event 事件对象
	 * @return {attribute}       返回触发事件的target属性
	 */
	getTargetElement: function(event) {
		return event.target || event.srcElement;//IE老版本就是使用的就是srcElement
	},

	/**
	 * 停止事件继续向上一级冒泡
	 * @param  {Event} event 事件对象
	 * @return {[type]}       无
	 */
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;//IE阻止冒泡的方式是event的一个属性设置为true
		}
	},

	/**
	 * 防止一些默认事件行为，如a标签的超链接，点击事件发生后，会自动跳转到对应的连接
	 * @param  {Event} event 事件对象
	 * @return {[type]}       无
	 */
	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;//IE阻止默认事件行为的方式是event的一个boolean属性设置为false即可
		}
	}
};