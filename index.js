var width = 500;
var height = 500;

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
var camera = new THREE.PerspectiveCamera(25, width/height, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// create the cube
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshPhongMaterial({
  ambient: 0x55555,
  color: 0x55555,
  specular: 0xffffff,
  shininess: 50,
  shading: THREE.SmoothShading
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// create lights
scene.add( new THREE.AmbientLight(0xffffff) );
var light = new THREE.PointLight(0xffffff, 6, 40);
light.position.set(20, 20, 20);
scene.add(light);

// set the camera
camera.position.z = 10;

// define an animation loop
var render = function () {
  requestAnimationFrame(render);
  // rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.setClearColor( 0xffffff, 0);
  renderer.render(scene, camera);
};

render();