import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/environments/RoomEnvironment.js';
import { FontLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/geometries/TextGeometry.js';
import { gsap } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js";

//#region variables
let back, pictures, picturesMaterial, consulting, consultingMaterial, technology, technologyMaterial, mdn, mdnMaterial;
let umnp, umnc, umnt;
let initialRotation;
let mouse = {};
//const THREE = window.MINDAR.IMAGE.THREE;
const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#container"),
    imageTargetSrc: "./targets.mind"
});
const {renderer, scene, camera} = mindarThree;

const raycaster = new THREE.Raycaster();
const pmremGenerator = new THREE.PMREMGenerator( renderer );
const anchor = mindarThree.addAnchor(0);
const clock = new THREE.Clock();
const loader = new GLTFLoader();
const fontLoader = new FontLoader();

// const renderScene = new RenderPass(scene, camera);
// const composer = new EffectComposer(renderer);
// composer.addPass(renderScene);

// const bloomPass = new UnrealBloomPass(
//     new THREE.Vector2(window.innerWidth, window.innerHeight),
//     1.6,
//     0.1,
//     0.1
// );
// composer.addPass(bloomPass);
//#endregion

//#region scene setup
renderer.setPixelRatio( window.devicePixelRatio );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

camera.position.set(0, 2, 5);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
scene.add( directionalLight );
//#endregion

//#region back
fontLoader.load( './src/fonts/Roboto_Regular.json', function ( font ) {

	const backGeometry = new TextGeometry( 'Back', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );

    const backMaterial = new THREE.MeshBasicMaterial({color:0x000000});
    back = new THREE.Mesh(backGeometry, backMaterial);
    back.scale.set(0.002, 0.002, 0.002);
    back.name = "back";
    back.position.set(-1.2, 1.5, 0);
} );
//anchor.group.add(back);
//#endregion

//#region sphere 1
const sphereGeometry = new THREE.SphereGeometry();
const sphereMaterial = new THREE.MeshBasicMaterial({color:0x7A0D9E});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.name = "sphere";
sphere.scale.set(0.1, 0.1, 0.1);
sphere.position.set(-1, 1, 0);
//#endregion

//#region sphere 2
const sphereGeometry2 = new THREE.SphereGeometry();
const sphereMaterial2 = new THREE.MeshBasicMaterial({color:0xE6A617});
const sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
sphere2.name = "sphere2";
sphere2.scale.set(0.1, 0.1, 0.1);
sphere2.position.set(0, 0, 0);
//#endregion

//#region sphere 3
const sphereGeometry3 = new THREE.SphereGeometry();
const sphereMaterial3 = new THREE.MeshBasicMaterial({color:0x08995D});
const sphere3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3);
sphere3.name = "sphere3";
sphere3.scale.set(0.1, 0.1, 0.1);
sphere3.position.set(1, -1, 0);
//#endregion

//#region pictures
fontLoader.load( './src/fonts/Roboto_Regular.json', function ( font ) {

	const picturesGeometry = new TextGeometry( 'Pictures', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );

    picturesMaterial = new THREE.MeshStandardMaterial({color:0x7A0D9E, transparent: true, opacity: 0});
    pictures = new THREE.Mesh(picturesGeometry, picturesMaterial);
    pictures.scale.set(0.005, 0.005, 0.005);
    pictures.position.set(-1, 0, 0);
} );
//#endregion

//#region consulting
fontLoader.load( './src/fonts/Roboto_Regular.json', function ( font ) {

	const consultingGeometry = new TextGeometry( 'Consulting', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );

    consultingMaterial = new THREE.MeshStandardMaterial({color:0xE6A617, transparent: true, opacity: 0});
    consulting = new THREE.Mesh(consultingGeometry, consultingMaterial);
    consulting.scale.set(0.005, 0.005, 0.005);
    consulting.position.set(-1, 0, 0);
} );
//#endregion

//#region technology
fontLoader.load( './src/fonts/Roboto_Regular.json', function ( font ) {

	const technologyGeometry = new TextGeometry( 'Technology', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );

    technologyMaterial = new THREE.MeshStandardMaterial({color:0x08995D, transparent: true, opacity: 0});
    technology = new THREE.Mesh(technologyGeometry, technologyMaterial);
    technology.scale.set(0.005, 0.005, 0.005);
    technology.position.set(-1, 0, 0);
} );
//#endregion

//#region MDN
fontLoader.load( './src/fonts/Roboto_Regular.json', function ( font ) {

	const mdnGeometry = new TextGeometry( 'MDN', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );

    //08995D
    mdnMaterial = new THREE.MeshStandardMaterial({color:0x000000, transparent: true, opacity: 0});
    mdn = new THREE.Mesh(mdnGeometry, mdnMaterial);
    mdn.scale.set(0.005, 0.005, 0.005);
    mdn.position.set(-0.6, 0, 0);
    mdn.rotation.y = 90;

    anchor.group.add(mdn);
    const timeline = gsap.timeline();
    timeline.to(mdnMaterial, { duration: 5, opacity: 1, ease:"slow"})
            .to(mdnMaterial, { duration: 1, opacity: 0, onComplete: ()=>{onAnimationComplete();} });
    //gsap.from(mdn, {rotationY: -90, duration: 10, transformOrigin:"50% 50%"});
    //gsap.fromTo(mdn.rotation, {y:-180}, {y: 0, duration: 10, ease:"bounce"});
} );
//#endregion

//#region umnp
fontLoader.load( './src/fonts/Roboto_Regular.json', function ( font ) {

	const umnpGeometry = new TextGeometry( 'UMN\nPictures', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );

    const umnpMaterial = new THREE.MeshStandardMaterial({color:0x7A0D9E});
    umnp = new THREE.Mesh(umnpGeometry, umnpMaterial);
    umnp.scale.set(0.002, 0.002, 0.002);
    umnp.position.set(-0.8, 1, 0);
} );
//#endregion

//#region umnc
fontLoader.load( './src/fonts/Roboto_Regular.json', function ( font ) {

	const umncGeometry = new TextGeometry( 'UMN\nConsulting', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );

    const umncMaterial = new THREE.MeshStandardMaterial({color:0xE6A617});
    umnc = new THREE.Mesh(umncGeometry, umncMaterial);
    umnc.scale.set(0.002, 0.002, 0.002);
    umnc.position.set(0.2, 0, 0);
} );
//#endregion

//#region umnt
fontLoader.load( './src/fonts/Roboto_Regular.json', function ( font ) {

	const umntGeometry = new TextGeometry( 'UMN\nTechnology', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );

    const umntMaterial = new THREE.MeshStandardMaterial({color:0x08995D});
    umnt = new THREE.Mesh(umntGeometry, umntMaterial);
    umnt.scale.set(0.002, 0.002, 0.002);
    umnt.position.set(1.2, -1, 0);
} );
//#endregion

const mainGroup = new THREE.Group();
mainGroup.add(sphere);
mainGroup.add(sphere2);
mainGroup.add(sphere3);

function onAnimationComplete(){
    anchor.group.remove(mdn);
    anchor.group.add(mainGroup);
    const buttons = gsap.timeline();
    anchor.group.add(umnp);
    anchor.group.add(umnc);
    anchor.group.add(umnt);
    buttons.from(sphere.position, { duration: 1, y: -3, ease:"back"})
           .from(sphere2.position, { duration: 1, y: 3, ease:"back"})
           .from(sphere3.position, { duration: 1, y: -3, ease:"back"})
           .from(umnp.position, { duration: 1, x: -5, ease:"back"})
           .from(umnc.position, { duration: 1, x: -5, ease:"back"})
           .from(umnt.position, { duration: 1, x: -5, ease:"back"})
}

const start = async() => {
    await mindarThree.start();
    // renderer.setAnimationLoop(() => {
    //     renderer.render(scene, camera);
    // });

    addEventListener( "mousedown", (e)=>{
        mouse.x = (e.clientX/window.innerWidth)*2-1;
        mouse.y = (e.clientY/window.innerHeight)*-2+1;
        
        raycaster.setFromCamera(mouse, camera);
        let items = raycaster.intersectObjects(scene.children, true);

        items.forEach((i)=>{
            if(i.object.name == "sphere"){
                console.log("pictures");
                anchor.group.add(pictures);
                gsap.to(picturesMaterial, { duration: 3, opacity: 1 });
                anchor.group.add(back);
                anchor.group.remove(mainGroup);
                anchor.group.remove(umnp);
                anchor.group.remove(umnc);
                anchor.group.remove(umnt);
            }else if(i.object.name == "sphere2"){
                console.log("consulting");
                anchor.group.add(consulting);
                gsap.to(consultingMaterial, { duration: 3, opacity: 1 });
                anchor.group.add(back);
                anchor.group.remove(mainGroup);
                anchor.group.remove(umnp);
                anchor.group.remove(umnc);
                anchor.group.remove(umnt);
            }else if(i.object.name == "sphere3"){
                console.log("technology");
                anchor.group.add(technology);
                gsap.to(technologyMaterial, { duration: 3, opacity: 1 });
                anchor.group.add(back);
                anchor.group.remove(mainGroup);
                anchor.group.remove(umnp);
                anchor.group.remove(umnc);
                anchor.group.remove(umnt);
            }else if(i.object.name == "back"){
                console.log("back");
                anchor.group.add(mainGroup);
                anchor.group.add(umnp);
                anchor.group.add(umnc);
                anchor.group.add(umnt);
                anchor.group.remove(back);
                anchor.group.remove(pictures);
                anchor.group.remove(technology);
                anchor.group.remove(consulting);
            }
        })
    } );
    animate();
}

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
};

function animate(){
    requestAnimationFrame(animate);
    if(mdn.rotation.y != initialRotation)
        mdn.rotation.y -= 0.01;
    renderer.render(scene, camera);
}

start();