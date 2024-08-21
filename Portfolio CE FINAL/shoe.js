// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up lighting
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5); // Slightly warmer ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7); // Dimmed directional light
directionalLight.position.set(5, 10, 5); // Adjusted light position
scene.add(directionalLight);

// Get the loading overlay element
const loadingOverlay = document.getElementById('loading-overlay');

// Load 3D model
const loader = new THREE.GLTFLoader();
let shoeModel;

loader.load('/assets/images/uploads_files_4278121_Nike_Air_Shoes.glb', function (gltf) {
    shoeModel = gltf.scene;
    scene.add(shoeModel);

    // Adjust model position and scale
    shoeModel.position.set(0, -0.2, 0); // Lowered the model position by approximately 20% vertically
    shoeModel.scale.set(5, 5, 5); // Adjust scale as needed

    // Apply detailed materials and textures with shaders
    shoeModel.traverse((node) => {
        if (node.isMesh) {
            // Apply materials based on node names
            switch (node.name) {
                case 'laces':
                case 'tongue':
                    node.material = new THREE.MeshStandardMaterial({
                        color: 0xf0f0f0, // Lighter shade of white for tongue and laces
                        roughness: 0.8, // Roughness for matte appearance
                        metalness: 0.2, // Low metalness for non-metallic look
                    });
                    break;
                case 'sole':
                    node.material = new THREE.MeshStandardMaterial({
                        color: 0xf0f0f0, // Lighter shade of white for sole
                        roughness: 0.6, // Adjust roughness for sole texture
                        metalness: 0.1, // Low metalness for non-metallic look
                    });
                    break;
                case 'swish':
                    node.material = new THREE.MeshStandardMaterial({
                        color: 0x666666, // Grey color for swish mark
                        roughness: 0.2, // Adjust roughness for smooth appearance
                        metalness: 0.5, // Medium metalness for slight reflectivity
                    });
                    break;
                default:
                    node.material = new THREE.MeshStandardMaterial({
                        color: 0xffffff, // Default white color
                        roughness: 0.4, // Adjust roughness for general parts
                        metalness: 0.3, // Adjust metalness for slight reflectivity
                    });
                    break;
            }

            // Pixelation effect
            if (node.material.map) {
                node.material.map.minFilter = THREE.NearestFilter;
                node.material.map.magFilter = THREE.NearestFilter;
                node.material.map.generateMipmaps = false;
            }
        }
    });

    // Rotate model to stand vertically on toe
    shoeModel.rotation.set(-Math.PI / 3, 1, 1); // Rotate around x-axis (vertical)

    // Hide loading overlay
    loadingOverlay.style.display = 'none';

}, undefined, function (error) {
    console.error('Error loading model:', error);
    loadingOverlay.innerHTML = 'Error loading model. Please try again.';
});

// Set up shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Adjust camera position and look-at target
camera.position.set(0, 3, 4); // Adjust camera position to view the model more closely
camera.lookAt(new THREE.Vector3(0, 0, 0)); // Point the camera towards the center of the scene

// Handle window resize
window.addEventListener('resize', function () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation loop with slight bounce effect
function animate() {
    requestAnimationFrame(animate);

    // Rotate the model on its vertical axis
    if (shoeModel) {
        shoeModel.rotation.y += 0.01; // Rotate around y-axis (toes)
    }

    // Implement a slight bounce effect
    if (shoeModel) {
        shoeModel.position.y = -0.2 + Math.sin(Date.now() * 0.002) * 0.05; // Adjust the y position with a sine wave for bounce
    }

    renderer.render(scene, camera);
}

animate();
