import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { gsap } from "gsap";

let pictures, consulting, technology, back, technologyMaterial;
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
const loader = new GLTFLoader();
const fontLoader = new FontLoader();

renderer.setPixelRatio( window.devicePixelRatio );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

camera.position.set(0, 2, 5);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
scene.add( directionalLight );

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
const sphereMaterial2 = new THREE.MeshBasicMaterial({color:0xE6C675});
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

    const picturesMaterial = new THREE.MeshLambertMaterial({color:0x7A0D9E});
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

    const consultingMaterial = new THREE.MeshLambertMaterial({color:0xE6A617});
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

    technologyMaterial = new THREE.MeshLambertMaterial({color:0x08995D, transparent: true, opacity: 0});
    technology = new THREE.Mesh(technologyGeometry, technologyMaterial);
    technology.scale.set(0.005, 0.005, 0.005);
    technology.position.set(-1, 0, 0);
} );
//#endregion

const mainGroup = new THREE.Group();
mainGroup.add(sphere);
mainGroup.add(sphere2);
mainGroup.add(sphere3);
// mainGroup.add(sphere3);
anchor.group.add(mainGroup);

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
            if(i.object.name == "sphere"){
                console.log("pictures");
                anchor.group.add(pictures);
                anchor.group.add(back);
                anchor.group.remove(mainGroup);
            }else if(i.object.name == "sphere2"){
                console.log("consulting");
                anchor.group.add(consulting);
                anchor.group.add(back);
                anchor.group.remove(mainGroup);
            }else if(i.object.name == "sphere3"){
                console.log("technology");
                anchor.group.add(technology);
                gsap.to(technologyMaterial, { duration: 5, opacity: 1 });
                anchor.group.add(back);
                anchor.group.remove(mainGroup);
            }else if(i.object.name == "back"){
                console.log("back");
                anchor.group.add(mainGroup);
                anchor.group.remove(back);
                anchor.group.remove(pictures);
                anchor.group.remove(technology);
                anchor.group.remove(consulting);
            }
        })
    } );
}

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
};

start();