//set up the scene

// import '/css/styles-blank.css' //troubleshoot - QUESTION: inspect page


// const renderer = new THREE.WebGLRenderer({
//     canvas: document.querySelector('#bg'),
// });




//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

let scene, camera, renderer, cube;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.setZ(30);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);
    // add lighting ----------------------------------
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(3, 4, 5);
    scene.add(light);
    const helper = new THREE.DirectionalLightHelper(light, 5)
    scene.add(helper)

    const lightLeft = new THREE.DirectionalLight(0xff0000, 3);
    lightLeft.position.set(-3, 4, 5);
    scene.add(light);
    const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5)
    scene.add(helperLeft)

    // // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
    // const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshStandardMaterial( {color: 0x0000ff});
    const texture = new THREE.TextureLoader().load('images/Ice002_1K-JPG_Color.jpg');
    const material = new THREE.MeshStandardMaterial({ map: texture });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;
}
// // ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~


function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.006;
    // cube.rotation.y += 0.006;

    renderer.render(scene, camera);
}

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// window.addEventListener('resize', onWindowResize, false)

init();
animate();












//adding geometry

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geometry, material);

//add geometry to the scene
scene.add(torus)

//add lighting to scene
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight)

//add light and grid helper
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,5);
scene.add(lightHelper, gridHelper)

//add orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);
// //adds star geometry
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material);
//randomizes position of stars
    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z)
    scene.add(star)
}
//randomizes number of stars
Array(200).fill().forEach(addStar)

//add space background
const bgTexture = new THREE.TextureLoader().load('AdobeStock_564419409.jpeg');
scene.background = bgTexture;

//call animate function
animate()

//avatar QUESTION: CAN YOU USE GIFS AS TEXTURE
// const catTexture = new THREE.TextureLoader().load('cat.jpg');

// const cat = new THREE.Mesh(
//     new THREE.BoxGeometry(3,3,3),
//     new THREE.MeshBasicMaterial({map:catTexture})
// );   

// scene.add(cat);

//moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    })
);

scene.add(moon);

//can use 'position.x' or 'setX'
moon.position.z = 30;
moon.position.setX(-10);

//moves camera on scroll
function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    // cat.rotation.y += 0.01;
    // cat.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.002;
    camera.position.y = t * -0.002;
}

document.body.onscroll = moveCamera



//define animate function
function animateTorus(){
    requestAnimationFrame(animate);
    //infinite loop
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    //set up renderer again
    // controls.update();
    renderer.render(scene, camera);
}
animateTorus();