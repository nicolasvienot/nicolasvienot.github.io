var width = 500;
var height = 500;
var scene2 = new THREE.Scene();
var camera2 = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000);
var renderer2 = new THREE.WebGLRenderer();
scene2.background = new THREE.Color(0xffffff);

renderer2.setSize(width, height);
document.body.appendChild(renderer2.domElement);
var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshFaceMaterial([
//     new THREE.MeshBasicMaterial({
//         color: 0x00ff00
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 0xff0000
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 0x0000ff,
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 0xffff00
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 0x00ffff
//     }),
//     new THREE.MeshBasicMaterial({
//         color: 0xff00ff
//     })
// ]);

var material = new THREE.MeshPhongMaterial({
	ambient: 0x55555,
	color: 0x55555,
	specular: 0xffffff,
	shininess: 50,
	shading: THREE.SmoothShading
});

var cube = new THREE.Mesh(geometry, material);
cube.rotation.x = Math.PI / 4;
cube.rotation.y = Math.PI / 4;
scene2.add(cube);

scene2.add(new THREE.AmbientLight(0xffffff));
var light = new THREE.PointLight(0xffffff, 6, 40);
light.position.set(20, 20, 20);
scene2.add(light);

camera2.position.z = 10;

var isDragging = false;
var previousMousePosition = {
	x: 0,
	y: 0
};

$(renderer2.domElement).on('mousedown', function (e) {
	isDragging = true;
})

	.on('mousemove', function (e) {
		var deltaMove = {
			x: e.offsetX - previousMousePosition.x,
			y: e.offsetY - previousMousePosition.y
		};
		if (isDragging) {
			var deltaRotationQuaternion = new THREE.Quaternion()
				.setFromEuler(new THREE.Euler(toRadians(deltaMove.y * 1), toRadians(deltaMove.x * 1), 0, 'XYZ'));
			cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
		}
		previousMousePosition = {
			x: e.offsetX,
			y: e.offsetY
		};
	});

$(document).on('mouseup', function (e) {
	isDragging = false;
});

window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

var clic = false;

$("#stop").on('click', function (e) {
	if (clic == false)
		clic = true;
	else
		clic = false;
});

function render() {
	renderer2.render(scene2, camera2);
	if (clic == false) {
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
	}
	requestAnimFrame(render);
}

render();
update(0, totalGameTime);

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}

