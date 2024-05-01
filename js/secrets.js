/* 
glTF import:
- glTF loader imported + enabled
-Global variable added to store moth gltf
-Two directional lights added to view glTF
- Added HELPERS to debug light position (disable after you place them)
-glTF imported from blender (not it is an *embedded* .glTF file, not .glb)
-Changed material on ball from BASIC to STANDARD so that the geometry catches light
*/


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~ Declare Global Variables~~~~~~~~~~~~~~~~
let scene, camera, renderer, ball, moth, mixer;


// ~~~~~~~~~~~~~~~~ Initialize Scene in init() ~~~~~~~~~~~~~~~~
function init() {

    // ~~~~~~Set up scene, camera, + renderer ~~~~~~

    scene = new THREE.Scene();
    scene.background = new THREE.Color (0x4f4990);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // ~~~~~~ Add Lights ~~~~~~
    // Add helpers to debug the lights' position - COMMENT OUT WHEN DONE placing the light! https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper

    // ~~ add directional light 
    const lightRight = new THREE.DirectionalLight(0x4f99080, 3);
    lightRight.position.set(3, 4, 5);
    scene.add(lightRight);

    // const helperRight = new THREE.DirectionalLightHelper(lightRight, 5);
    // scene.add(helperRight); // comment out when done placing light


    // ~~ add directional light 
    const lightLeft = new THREE.DirectionalLight(0xff00000, 5);
    lightLeft.position.set(-3, 4, 5);
    scene.add(lightLeft);

    // const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5);
    // scene.add(helperLeft); // comment out when done placing light






    // ~~~~~~ Initiate add-ons ~~~~~~

    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models



    // ~~~~~~ Create Geometry ~~~~~~

    // ---> create ball
    const geometry = new THREE.SphereGeometry(.2, 32, 16);

    // -> change material from Basic to standard for geometry to capture lights
    // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

    const texture = new THREE.TextureLoader().load('space.jpg');

    const material = new THREE.MeshStandardMaterial({ map: texture });
    // texture.minFilter = THREE.LinearFilter; // makes image sharper but aliased

    ball = new THREE.Mesh(geometry, material);
    scene.add(ball);



    // --> Load glTF

    // load moth model
    loader.load('moths_fluttering_around_a_light_source\scene.gltf', function (gltf) {
        moth = gltf.scene;
        scene.add(moth);
        moth.scale.set(2, 2, 2); // scale your model
        moth.position.y = -2; // set initial position

        mixer = new THREE.AnimationMixer(moth);
        const clips = gltf.animations;
        const clipPant = THREE.AnimationClip.findByName(clips, 'animation');
        const actionPant = mixer.clipAction(clipAnimation);
        actionPant.play();
    });


    // ~~~~~~Position Camera~~~~~~
    camera.position.z = 5;

}

// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)

const clock = new THREE.Clock();
function animate() {
    if(mixer)
    mixer.update(clock.getDelta());
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓
    
    // ball.rotation.x += 0.007;
    ball.rotation.y += 0.1;

    ball.position.x = Math.sin(Date.now() / 300) *2;
    ball.position.y = Math.sin(Date.now() / 1000) *2;
    ball.position.z = Math.sin(Date.now() / 800) *2;
    // console.log(ball.position.x)



    if (moth) {
        // moth.rotation.x += 0.007;
        // moth.rotation.y += 0.007;
        moth.rotation.y = Math.sin(Date.now() / 800) *1;
    }


    // always end animation loop with renderer
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

init(); // execute initialize function
animate(); // execute animation function

const bgTexture = new THREE.TextureLoader().load('AdobeStock_564419409.jpeg');
scene.background = bgTexture;


// console.log("hello!!!");

// //click on button changes background color, looped between pink & dark gray//

// var box = document.querySelector("body")
// var button = document.querySelector("button"),
//     colors = ["pink", "rgb(30, 30, 35)"];

// button.onclick = function () {
//     boxColor = colors.shift();
//     colors.push(boxColor);

//     box.style.backgroundColor = boxColor;}


// //set up the scene

// // import '/css/styles-blank.css' //troubleshoot - QUESTION: inspect page


// // const renderer = new THREE.WebGLRenderer({
// //     canvas: document.querySelector('#bg'),
// // });




// //~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
// import * as THREE from 'three';

// // Import add-ons
// import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

// let scene, camera, renderer, cube;

// function init() {
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.setZ(30);

//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     renderer.render(scene, camera);
//     // add lighting ----------------------------------
//     const light = new THREE.DirectionalLight(0xffffff, 3);
//     light.position.set(3, 4, 5);
//     scene.add(light);
//     const helper = new THREE.DirectionalLightHelper(light, 5)
//     scene.add(helper)

//     const lightLeft = new THREE.DirectionalLight(0xff0000, 3);
//     lightLeft.position.set(-3, 4, 5);
//     scene.add(light);
//     const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5)
//     scene.add(helperLeft)

//     // // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
//     // const controls = new OrbitControls(camera, renderer.domElement);
//     const loader = new GLTFLoader();

//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     // const material = new THREE.MeshStandardMaterial( {color: 0x0000ff});
//     const texture = new THREE.TextureLoader().load('images/Ice002_1K-JPG_Color.jpg');
//     const material = new THREE.MeshStandardMaterial({ map: texture });
//     cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     camera.position.z = 2;
// }
// // // ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~


// function animate() {
//     requestAnimationFrame(animate);

//     // cube.rotation.x += 0.006;
//     // cube.rotation.y += 0.006;

//     renderer.render(scene, camera);
// }

// // function onWindowResize() {
// //     camera.aspect = window.innerWidth / window.innerHeight;
// //     camera.updateProjectMatrix();
// //     renderer.setSize(window.innerWidth, window.innerHeight);
// // }

// // window.addEventListener('resize', onWindowResize, false)

// init();
// animate();












// //adding geometry

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial({color:0xFF6347});
// const torus = new THREE.Mesh(geometry, material);

// //add geometry to the scene
// scene.add(torus)

// //add lighting to scene
// const pointLight = new THREE.PointLight(0xffffff)
// pointLight.position.set(5,5,5)

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight,ambientLight)

// //add light and grid helper
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,5);
// scene.add(lightHelper, gridHelper)

// //add orbit controls
// // const controls = new OrbitControls(camera, renderer.domElement);
// // //adds star geometry
// function addStar() {
//     const geometry = new THREE.SphereGeometry(0.25, 24, 24)
//     const material = new THREE.MeshStandardMaterial({color: 0xffffff})
//     const star = new THREE.Mesh(geometry, material);
// //randomizes position of stars
//     const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

//     star.position.set(x,y,z)
//     scene.add(star)
// }
// //randomizes number of stars
// Array(200).fill().forEach(addStar)

// //add space background
// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

// //call animate function
// animate()

// //avatar QUESTION: CAN YOU USE GIFS AS TEXTURE
// // const catTexture = new THREE.TextureLoader().load('cat.jpg');

// // const cat = new THREE.Mesh(
// //     new THREE.BoxGeometry(3,3,3),
// //     new THREE.MeshBasicMaterial({map:catTexture})
// // );   

// // scene.add(cat);

// //moon
// const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

// const moon = new THREE.Mesh(
//     new THREE.SphereGeometry(3,32,32),
//     new THREE.MeshStandardMaterial({
//         map: moonTexture,
//         normalMap: normalTexture
//     })
// );

// scene.add(moon);

// //can use 'position.x' or 'setX'
// moon.position.z = 30;
// moon.position.setX(-10);

// //moves camera on scroll
// function moveCamera() {

//     const t = document.body.getBoundingClientRect().top;
//     moon.rotation.x += 0.05;
//     moon.rotation.y += 0.075;
//     moon.rotation.z += 0.05;

//     // cat.rotation.y += 0.01;
//     // cat.rotation.z += 0.01;

//     camera.position.z = t * -0.01;
//     camera.position.x = t * -0.002;
//     camera.position.y = t * -0.002;
// }

// document.body.onscroll = moveCamera



// //define animate function
// function animateTorus(){
//     requestAnimationFrame(animate);
//     //infinite loop
//     torus.rotation.x += 0.01;
//     torus.rotation.y += 0.005;
//     torus.rotation.z += 0.01;
//     //set up renderer again
//     // controls.update();
//     renderer.render(scene, camera);
// }
// animateTorus();
    


// //click on background changes text color, looped between pink & dark gray//
// // box.onclick = function () {
// //     document.getElementById("textColor").style.color,
// //     colors = ["pink", "rgb(30, 30, 35)"];
// // box.onclick = function changeFontColor() {
// //     if (color == "pink") { // if bg color is pink change it to gray otherwise change it to pink.
// //         box.style.color = "rgb(30, 30, 35)";
// //      } else {
// //         box.style.color = "pink";

// //     box.style.textDecorationColor = textColor;}