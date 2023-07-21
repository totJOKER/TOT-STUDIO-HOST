function dispNone() {
    let preload = document.getElementById('preloader');
	preload.style.display = 'none';
}
window.onload = function () {
	let preload = document.getElementById('preloader');
	preload.style.opacity = 0;
    setTimeout(dispNone, 1000)
}