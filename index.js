//import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

let mixer, model, marker, cat;
let mouse = {};
const THREE = window.MINDAR.IMAGE.THREE;
const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#container"),
    imageTargetSrc: "./targets.mind"
});
const {renderer, scene, camera} = mindarThree;

const raycaster = new THREE.Raycaster();
const pmremGenerator = new THREE.PMREMGenerator( renderer );
const anchor = mindarThree.addAnchor(0);
const clock = new THREE.Clock();
//const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();

renderer.setPixelRatio( window.devicePixelRatio );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

//dracoLoader.setDecoderPath( 'https://github.com/sabsabila/sabsabila.github.io/tree/main/node_modules/three/examples/jsm/libs/draco/gltf' );
//loader.setDRACOLoader( dracoLoader );

camera.position.set(0, 2, 5);

loader.load( './src/models/plane/plane.gltf', function ( gltf ) {
    model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);
    model.rotation.x = 90
    model.name = "model";
	anchor.group.add( model );

    mixer = new THREE.AnimationMixer( model );
	mixer.clipAction( gltf.animations[ 0 ] ).play();
    animate();
}, undefined, function ( error ) {
	console.error( error );
} );

loader.load( './location_marker.gltf', function ( gltf ) {
    marker = gltf.scene;
    marker.position.set(0, 0, 0.3);
    marker.scale.set(0.01, 0.01, 0.01);
    marker.rotation.x = 90
    var newMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
    marker.traverse((o) => {
    if (o.isMesh) o.material = newMaterial;
    });

	anchor.group.add( marker );
}, undefined, function ( error ) {
	console.error( error );
} );

loader.load( './cat.glb', function ( gltf ) {
    cat = gltf.scene;
    cat.position.set(0, 0, 0);
    cat.scale.set(0.01, 0.01, 0.01);
	anchor.group.add( cat );
    cat.visible = false;
}, undefined, function ( error ) {
	console.error( error );
} );

const start = async() => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });

    addEventListener( "mousedown", (e)=>{
        mouse.x = (e.clientX/window.innerWidth)*2-1;
        mouse.y = (e.clientY/window.innerHeight)*-2+1;
        
        raycaster.setFromCamera(mouse, camera);
        let items = raycaster.intersectObjects(scene.children, true);

        items.forEach((i)=>{
            if(i.object.name == "location_marker"){
                console.log("marker click");
                window.open("https://goo.gl/maps/83YcKR6xT1EwEZSM8");
            }else if(i.object.name != ""){
                console.log(i.object.name);
                anchor.group.remove(model);
                cat.visible = true;
                //window.open("https://wa.me/+6281316892915");
            }
        })
    } );
}

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
};

function animate() {
    requestAnimationFrame( animate );

    const delta = clock.getDelta();

    mixer.update( delta );
}

start();