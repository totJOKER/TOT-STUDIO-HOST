document.querySelector('#main').onmousemove = function(event) {
	event = event || window.event;
	document.querySelector('#offx').innerHTML = event.pageX;
	document.querySelector('#offy').innerHTML = event.pageY;
}

document.querySelector('#main').onmousemove = function(event) {
	event = event || window.event;
	let top = document.querySelector('#offy').innerHTML = event.pageY;
	document.getElementById('top').style.top = top + "px";
	let ver = document.querySelector('#offy').innerHTML = event.pageY;
	document.getElementById('ver').style.top = top + "px";
}







