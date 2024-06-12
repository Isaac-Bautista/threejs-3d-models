// main.js

// Configuración de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Agregar luz a la escena
const ambientLight = new THREE.AmbientLight(0x404040); // luz ambiental suave
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // luz direccional fuerte
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Variables para el modelo y la animación
let mixer;

// Cargar modelo FBX
const loader = new THREE.FBXLoader();
loader.load('threejs-3d-model-personalized/Ch14_nonPBR.fbx', (object) => {
    console.log('Modelo cargado exitosamente');
    object.scale.set(0.1, 0.1, 0.1); // Aumentar la escala
    object.position.set(0, 0, 0); // Ajustar la posición si es necesario
    scene.add(object);

    // Cargar animación FBX
    loader.load('threejs-3d-model-personalized/Rumba Dancing.fbx', (animation) => {
        console.log('Animación cargada exitosamente');
        mixer = new THREE.AnimationMixer(object);
        const action = mixer.clipAction(animation.animations[0]);
        action.play();
    }, (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado');
    }, (error) => {
        console.error('Error al cargar la animación', error);
    });

    animate(); // Iniciar la animación después de cargar el modelo
}, (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% cargado');
}, (error) => {
    console.error('Error al cargar el modelo', error);
});

camera.position.set(0, 20, 30); // Acercar la cámara

// Función de animación
function animate() {
    requestAnimationFrame(animate);
    if (mixer) mixer.update(0.01); // Actualizar la animación
    renderer.render(scene, camera);
}

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate(); // Iniciar la animación