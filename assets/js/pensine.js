// Initialisation de la scène
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("pensine-canvas"),
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Création de la géométrie sphérique
const geometry = new THREE.SphereGeometry(2.5, 80, 80);

// Matériau en particules
const material = new THREE.PointsMaterial({
  color: 0x88ccff,
  size: 0.05,
  transparent: true,
  opacity: 0.8,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const points = new THREE.Points(geometry, material);
scene.add(points);

// Animation
function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0025;
  points.rotation.x += 0.001;
  renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
