import * as THREE from "https://cdn.skypack.dev/three@0.133.1/build/three.module";
import {OrbitControls} from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";
const containerEl = document.querySelector(".globe-wrapper");
const canvas3D = containerEl.querySelector("#globe-3d");
const canvas2D = containerEl.querySelector("#globe-2d-overlay");
// заменить на похожий канвас, данный работать отказывается
// 
const popupEl = containerEl.querySelector(".globe-popup");
let renderer, scene, camera, rayCaster, controls, group;
let overlayCtx = canvas2D.getContext("2d");
// WARNING: Multiple instances of Three.js being imported.
// выдает ошибку, необходимо заменить
let coordinates2D = [0, 0];
let pointerPos;
// не испольхывается 
let clock, mouse, pointer, globe, globeMesh;
let popupVisible;
let earthTexture, mapMaterial;
let popupOpenTl, popupCloseTl;
let dragged = false;
initScene();
window.addEventListener("resize", updateSize);
function initScene() {
    renderer = new THREE.WebGLRenderer({canvas: canvas3D, alpha: true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1.1, 1.1, 1.1, -1.1, 0, 3);
    camera.position.z = 1.1;
    rayCaster = new THREE.Raycaster();
    rayCaster.far = 1.15;
    mouse = new THREE.Vector2(-1, -1);
    clock = new THREE.Clock();
    createOrbitControls();
    popupVisible = false;
    new THREE.TextureLoader().load(
        "images/map.jpg",
        (mapTex) => {
            earthTexture = mapTex;
            earthTexture.repeat.set(1, 1);
            createGlobe();
            createPointer();
            addCanvasEvents();
            updateSize();
            render();
        });
}
function createOrbitControls() {
    controls = new OrbitControls(camera, canvas3D);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.minPolarAngle = .4 * Math.PI;
    controls.maxPolarAngle = .4 * Math.PI;
    controls.autoRotate = true;
    let timestamp;
    controls.addEventListener("start", () => {
        timestamp = Date.now();
    });
    controls.addEventListener("end", () => {
        dragged = (Date.now() - timestamp) > 200;
    });
}
function createGlobe() {
    const globeGeometry = new THREE.IcosahedronGeometry(1, 22);
    mapMaterial = new THREE.ShaderMaterial({
        vertexShader: document.getElementById("vertex-shader-map").textContent,
        fragmentShader: document.getElementById("fragment-shader-map").textContent,
        uniforms: {
            u_map_tex: {type: "t", value: earthTexture},
            u_dot_size: {type: "f", value: 0},
            u_pointer: {type: "v3", value: new THREE.Vector3(.0, .0, 1.)},
            u_time_since_click: {value: 0},
        },
        alphaTest: false,
        transparent: true
    });
    globe = new THREE.Points(globeGeometry, mapMaterial);
    scene.add(globe);
    globeMesh = new THREE.Mesh(globeGeometry, new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.1,
    }));
    scene.add(globeMesh);
}
function createPointer() {
    const geometry = new THREE.SphereGeometry(.04, 16, 16);
    const material = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0
    });
    pointer = new THREE.Mesh(geometry, material);
    scene.add(pointer);
}
function updateOverlayGraphic() {
    let activePointPosition = pointer.position.clone();
    activePointPosition.applyMatrix4(globe.matrixWorld);
    const activePointPositionProjected = activePointPosition.clone();
    activePointPositionProjected.project(camera);
    coordinates2D[0] = (activePointPositionProjected.x + 1) * containerEl.offsetWidth * .5;
    coordinates2D[1] = (1 - activePointPositionProjected.y) * containerEl.offsetHeight * .5;
    const matrixWorldInverse = controls.object.matrixWorldInverse;
    activePointPosition.applyMatrix4(matrixWorldInverse);
    if (activePointPosition.z > -1) {
        if (popupVisible === false) {
            popupVisible = true;
            showPopupAnimation(false);
        }
        let popupX = coordinates2D[0];
        popupX -= (activePointPositionProjected.x * containerEl.offsetWidth * .3);
        let popupY = coordinates2D[1];
        const upDown = (activePointPositionProjected.y > .6);
        popupY += (upDown ? 20 : -20);
        gsap.set(popupEl, {
            x: popupX,
            y: popupY,
            xPercent: -35,
            yPercent: upDown ? 0 : -100
        });
        popupY += (upDown ? -5 : 5);
        const curveMidX = popupX + activePointPositionProjected.x * 100;
        const curveMidY = popupY + (upDown ? -.5 : .1) * coordinates2D[1];
        drawPopupConnector(coordinates2D[0], coordinates2D[1], curveMidX, curveMidY, popupX, popupY);
    } else {
        if (popupVisible) {
            popupOpenTl.pause(0);
            popupCloseTl.play(0);
        }
        popupVisible = false;
    }
}
// NaN - не могу выделить сбой вращения
function addCanvasEvents() {
    containerEl.addEventListener("mousemove", (e) => {
        updateMousePosition(e.clientX, e.clientY);
    });
    function updateMousePosition(eX, eY) {
        mouse.x = (eX - containerEl.offsetLeft) / containerEl.offsetWidth * 2 - 1;
        mouse.y = -((eY - containerEl.offsetTop) / containerEl.offsetHeight) * 2 + 1;
    }
}
function checkIntersects() {
    rayCaster.setFromCamera(mouse, camera);
    const intersects = rayCaster.intersectObject(globeMesh);
    if (intersects.length) {
        document.body.style.cursor = "pointer";
    } else {
        document.body.style.cursor = "auto";
    }
    return intersects;
}
// это не сбой, дело в другом, мб
function render() {
    mapMaterial.uniforms.u_time_since_click.value = clock.getElapsedTime();
    checkIntersects();
    if (pointer) {
        updateOverlayGraphic();
    }
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
function updateSize() {
    const minSide = .65 * Math.min(window.innerWidth, window.innerHeight);
    containerEl.style.width = minSide + "px";
    containerEl.style.height = minSide + "px";
    renderer.setSize(minSide, minSide);
    canvas2D.width = canvas2D.height = minSide;
    mapMaterial.uniforms.u_dot_size.value = .04 * minSide;
}