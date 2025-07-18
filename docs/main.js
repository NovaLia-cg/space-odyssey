/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/MTLLoader.js */ "./node_modules/three/examples/jsm/loaders/MTLLoader.js");
/* harmony import */ var three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/OBJLoader.js */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
//23FI118 森田小風流





class ThreeJSContainer {
    scene;
    light;
    //ワープ
    warpParticles;
    particleVelocity;
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_3__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_3__.Color(0x000000));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_3__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_3__.Scene();
        const loader = new three__WEBPACK_IMPORTED_MODULE_3__.TextureLoader();
        // const axesBarLength = 10.0;
        // this.scene.add(new THREE.AxesHelper(axesBarLength));
        //オブジェクトのロード
        let loadOBJ = (objFilePath, mtlFilePath) => {
            let object = new three__WEBPACK_IMPORTED_MODULE_3__.Object3D;
            const mtlLoader = new three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_1__.MTLLoader();
            mtlLoader.load(mtlFilePath, (material) => {
                material.preload();
                const objLoader = new three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_2__.OBJLoader();
                objLoader.setMaterials(material);
                objLoader.load(objFilePath, (obj) => {
                    object.add(obj);
                });
            });
            return object;
        };
        //GUI and GROUP
        let gui = new lil_gui__WEBPACK_IMPORTED_MODULE_4__["default"]();
        let guiObj = {
            world: 'Earth'
        };
        let world = 'Earth';
        let world_1 = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        let world_2 = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        let world_3 = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        world_1.visible = true;
        world_2.visible = false;
        world_3.visible = false;
        gui.add(guiObj, 'world', ['Earth', 'Ringed Planet', 'BlackHole']);
        this.scene.add(world_1);
        this.scene.add(world_2);
        this.scene.add(world_3);
        //宇宙船
        const spaceship = loadOBJ("spaceship.obj", "spaceship.mtl");
        this.scene.add(spaceship);
        //宇宙の背景
        const colors = [
            'rgba(255,255,255,1)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgba(0,0,0,1)'
        ];
        const starsNum = 5000;
        const starPositions = [];
        const offsets = [0, 0.1, 0.2, 1];
        let generateSprite = (colors) => {
            let canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;
            let context = canvas.getContext('2d');
            let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(offsets[0], colors[0]);
            gradient.addColorStop(offsets[1], colors[1]);
            gradient.addColorStop(offsets[2], colors[2]);
            gradient.addColorStop(offsets[3], colors[3]);
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            let texture = new three__WEBPACK_IMPORTED_MODULE_3__.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        };
        let createPoints = (geom, colors) => {
            let material = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
                color: 0xffffff,
                size: 3,
                sizeAttenuation: false,
                opacity: 0.8,
                transparent: true,
                blending: three__WEBPACK_IMPORTED_MODULE_3__.AdditiveBlending,
                depthWrite: false,
                map: generateSprite(colors)
            });
            return new three__WEBPACK_IMPORTED_MODULE_3__.Points(geom, material);
        };
        let createStarField = () => {
            let radius = 0;
            const maxR = 1000;
            const minR = 800;
            for (let i = 0; i < starsNum; i++) {
                radius = minR + Math.random() * (maxR - minR);
                const u = 2 * Math.PI * Math.random();
                const v = Math.PI * Math.random() - Math.PI / 2;
                const x = radius * Math.cos(u) * Math.cos(v);
                const y = radius * Math.sin(u) * Math.cos(v);
                const z = radius * Math.sin(v);
                starPositions.push(x, y, z);
            }
            const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
            geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.Float32BufferAttribute(starPositions, 3));
            const starField = createPoints(geometry, colors);
            this.scene.add(starField);
        };
        createStarField();
        //月と地球
        const earthGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        const moonOrbitGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        const moonGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        const createMoon = (earthPos) => {
            let radius = 25;
            const distance = 200;
            const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.SphereGeometry(radius, 32, 16);
            const texture = loader.load('moon.png');
            const material = new three__WEBPACK_IMPORTED_MODULE_3__.MeshBasicMaterial({ map: texture });
            const mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geometry, material);
            moonGroup.add(mesh);
            moonGroup.position.set(distance, 0, 0);
            moonOrbitGroup.add(moonGroup);
            moonOrbitGroup.position.copy(earthPos);
            world_1.add(moonOrbitGroup);
            this.scene.add(world_1);
        };
        const createEarth = () => {
            let radius = 100;
            const x = -100;
            const y = -25;
            const z = -200;
            const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.SphereGeometry(radius, 32, 16);
            const texture = loader.load('earth.png');
            const material = new three__WEBPACK_IMPORTED_MODULE_3__.MeshBasicMaterial({ map: texture });
            const mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geometry, material);
            mesh.rotation.set(0, 0, -Math.PI / 12);
            earthGroup.add(mesh);
            earthGroup.position.set(x, y, z);
            world_1.add(earthGroup);
            this.scene.add(world_1);
            createMoon(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(x, y, z));
        };
        createEarth();
        //環付き惑星
        const ringedPlanetGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        const ringGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        const createRingedPlanet = () => {
            let radius = 500;
            const x = 500;
            const y = -200;
            const z = -600;
            const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.SphereGeometry(radius, 32, 16);
            const texture = loader.load('ringedPlanet.png');
            const material = new three__WEBPACK_IMPORTED_MODULE_3__.MeshBasicMaterial({ map: texture });
            const mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            mesh.rotation.set(0, 0, -Math.PI / 12);
            ringedPlanetGroup.add(mesh);
            //リング
            const ringCount = 40;
            let colors = [
                "rgba(180, 140, 80)",
                "rgba(160, 120, 60)",
                "rgba(190, 150, 90)",
                "rgba(150, 110, 70)",
                "rgba(170, 130, 75)",
                "rgba(200, 160, 100)",
                "rgba(9, 5, 1)",
                "rgba(210, 170, 110)"
            ];
            for (let i = 0; i < ringCount; i++) {
                const innerRadius = radius + 100 + i * 10;
                const outerRadius = innerRadius + Math.random() * 10 + 5;
                const thetaSegments = 128;
                const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.RingGeometry(innerRadius, outerRadius, thetaSegments);
                const col = colors[Math.floor(Math.random() * colors.length)];
                const material = new three__WEBPACK_IMPORTED_MODULE_3__.MeshBasicMaterial({
                    color: col,
                    opacity: 0.8,
                    transparent: false,
                    blending: three__WEBPACK_IMPORTED_MODULE_3__.AdditiveBlending,
                    depthWrite: false,
                    side: three__WEBPACK_IMPORTED_MODULE_3__.DoubleSide
                });
                const ring = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geometry, material);
                ringGroup.add(ring);
            }
            ringGroup.position.set(x, y, z);
            ringGroup.rotation.set(Math.PI / 2, -Math.PI / 12, 0);
            ringedPlanetGroup.add(ringGroup);
            world_2.add(ringedPlanetGroup);
            this.scene.add(world_2);
        };
        createRingedPlanet();
        //星のリングのマテリアル
        const createRings = (geom, colors) => {
            let material = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
                color: 0x111111,
                size: 15,
                sizeAttenuation: false,
                opacity: 0.2,
                transparent: true,
                blending: three__WEBPACK_IMPORTED_MODULE_3__.AdditiveBlending,
                depthWrite: false,
                map: generateSprite(colors)
            });
            return new three__WEBPACK_IMPORTED_MODULE_3__.Points(geom, material);
        };
        //ブラックホール
        const blackHoleGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        const blackHoleRing = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        const createBlackHole = () => {
            const BlackHoleCore = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(new three__WEBPACK_IMPORTED_MODULE_3__.SphereGeometry(50, 32, 32), new three__WEBPACK_IMPORTED_MODULE_3__.MeshBasicMaterial({ color: 0x000000 }));
            blackHoleGroup.add(BlackHoleCore);
            const glowSphere = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(new three__WEBPACK_IMPORTED_MODULE_3__.SphereGeometry(52, 32, 32), new three__WEBPACK_IMPORTED_MODULE_3__.MeshBasicMaterial({
                color: 0xffffaa,
                transparent: true,
                opacity: 0.8,
                blending: three__WEBPACK_IMPORTED_MODULE_3__.AdditiveBlending,
                side: three__WEBPACK_IMPORTED_MODULE_3__.BackSide
            }));
            blackHoleGroup.add(glowSphere);
            let radius = 20;
            const x = -50;
            const y = 0;
            const z = -100;
            const positions = [];
            const num = 20;
            let torusRadius = 0;
            let tube = 0;
            let radialSegments = 0;
            let tubularSegments = 0;
            for (let i = 0; i < num; i++) {
                const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.TorusGeometry(torusRadius = radius + (i + 1) * 4, tube = 1, radialSegments = 16, tubularSegments = 300);
                let colors = [
                    ['rgba(0, 0, 0, 1)', 'rgba(70, 5, 5, 0.44)', 'rgba(235, 176, 113, 0.56)', 'rgba(0,0,0,1)'],
                    ['rgba(0, 0, 0, 1)', 'rgba(78, 46, 5, 0.44)', 'rgba(143, 143, 20, 0.69)', 'rgba(0,0,0,1)'],
                ];
                let idx = Math.floor(Math.random() * (colors.length));
                positions[i] = createRings(geometry, colors[idx]);
                blackHoleRing.add(positions[i]);
                blackHoleGroup.add(positions[i]);
                blackHoleGroup.position.set(x, y, z);
                blackHoleGroup.rotation.set(Math.PI / 2, -Math.PI / 12, 0);
            }
            world_3.add(blackHoleGroup);
            this.scene.add(world_3);
        };
        createBlackHole();
        //ワープ
        let isWarping = false;
        const warpGroup = new three__WEBPACK_IMPORTED_MODULE_3__.Group();
        const warpAnimation = () => {
            const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.BufferGeometry();
            const texture = loader.load('warpEffect.png');
            const material = new three__WEBPACK_IMPORTED_MODULE_3__.PointsMaterial({
                size: 1,
                map: texture,
                blending: three__WEBPACK_IMPORTED_MODULE_3__.AdditiveBlending,
                color: 0xaaaaFF,
                depthWrite: false,
                transparent: false,
                opacity: 1
            });
            const particleNum = 1000000;
            const positions = new Float32Array(particleNum * 3);
            let particleIndex = 0;
            this.particleVelocity = [];
            const radius = 20;
            for (let i = 0; i < particleNum; i++) {
                const theta = 2 * Math.PI * Math.random();
                positions[particleIndex++] = radius * Math.cos(theta);
                positions[particleIndex++] = radius * Math.sin(theta);
                positions[particleIndex++] = 1000;
                this.particleVelocity.push(new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0.0, 0.0, Math.random() * 0.1 + 0.1));
            }
            geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_3__.BufferAttribute(positions, 3));
            this.warpParticles = new three__WEBPACK_IMPORTED_MODULE_3__.Points(geometry, material);
            warpGroup.add(this.warpParticles);
            this.scene.add(warpGroup);
        };
        warpAnimation();
        warpGroup.visible = false;
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_3__.DirectionalLight(0xffffff, 2);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        const clock = new three__WEBPACK_IMPORTED_MODULE_3__.Clock();
        let update = (time) => {
            //ワープ
            const deltaTime = clock.getDelta();
            const geom = this.warpParticles.geometry;
            const positions = geom.getAttribute('position');
            for (let i = 0; i < positions.count; i++) {
                if (positions.getZ(i) > 500) {
                    positions.setZ(i, -1000 * Math.random() - 500);
                }
                positions.setX(i, positions.getX(i) + this.particleVelocity[i].x * deltaTime * 100);
                positions.setY(i, positions.getY(i) + this.particleVelocity[i].y * deltaTime * 100);
                positions.setZ(i, positions.getZ(i) + this.particleVelocity[i].z * deltaTime * 1000);
            }
            positions.needsUpdate = true;
            //地球と月
            earthGroup.rotation.y += 0.005;
            moonOrbitGroup.rotation.y += 0.005;
            moonGroup.rotation.y += 0.01;
            //環付き惑星
            ringGroup.rotation.z -= 0.0005;
            //ブラックホール
            blackHoleGroup.rotation.z -= 0.002;
            //GUI
            if (guiObj.world != world) {
                if (!isWarping) {
                    isWarping = true;
                    warpGroup.visible = true;
                    world_1.visible = false;
                    world_2.visible = false;
                    world_3.visible = false;
                    setTimeout(() => {
                        warpGroup.visible = false;
                        switch (guiObj.world) {
                            case 'Earth':
                                world_1.visible = true;
                                world_2.visible = false;
                                world_3.visible = false;
                                break;
                            case 'Ringed Planet':
                                world_1.visible = false;
                                world_2.visible = true;
                                world_3.visible = false;
                                break;
                            case 'BlackHole':
                                world_1.visible = false;
                                world_2.visible = false;
                                world_3.visible = true;
                                break;
                            default:
                                world_1.visible = false;
                                world_2.visible = false;
                                world_3.visible = false;
                        }
                        world = guiObj.world;
                        isWarping = false;
                    }, 8000);
                }
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_3__.Vector3(0, 5, 10));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_lil-gui_dist_lil-gui_esm_js-node_modules_three_examples_jsm_controls_Orb-b4a37c"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZTtBQUNnQjtBQUMyQztBQUNOO0FBQ0E7QUFDMUM7QUFHMUIsTUFBTSxnQkFBZ0I7SUFDVixLQUFLLENBQWM7SUFDbkIsS0FBSyxDQUFjO0lBRTNCLEtBQUs7SUFDRyxhQUFhLENBQWU7SUFDNUIsZ0JBQWdCLENBQWtCO0lBRTFDO0lBRUEsQ0FBQztJQUVELHFCQUFxQjtJQUNkLGlCQUFpQixHQUFHLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUF3QixFQUFFLEVBQUU7UUFDbkYsTUFBTSxRQUFRLEdBQUcsSUFBSSxnREFBbUIsRUFBRSxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSx3Q0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbEQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsZUFBZTtRQUVsRCxRQUFRO1FBQ1IsTUFBTSxNQUFNLEdBQUcsSUFBSSxvREFBdUIsQ0FBQyxFQUFFLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFDLE1BQU0sYUFBYSxHQUFHLElBQUksb0ZBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQiwwQkFBMEI7UUFDMUIsbUNBQW1DO1FBQ25DLE1BQU0sTUFBTSxHQUF5QixDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUV2QixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlCLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDNUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUMxQyxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVELGdCQUFnQjtJQUNSLFdBQVcsR0FBRyxHQUFHLEVBQUU7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHdDQUFXLEVBQUUsQ0FBQztRQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLGdEQUFtQixFQUFFLENBQUM7UUFFekMsOEJBQThCO1FBQzlCLHVEQUF1RDtRQUV2RCxZQUFZO1FBQ1osSUFBSSxPQUFPLEdBQUcsQ0FBQyxXQUFtQixFQUFFLFdBQW1CLEVBQUUsRUFBRTtZQUN2RCxJQUFJLE1BQU0sR0FBRyxJQUFJLDJDQUFjLENBQUM7WUFDaEMsTUFBTSxTQUFTLEdBQUcsSUFBSSw4RUFBUyxFQUFFLENBQUM7WUFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDckMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQixNQUFNLFNBQVMsR0FBRyxJQUFJLDhFQUFTLEVBQUUsQ0FBQztnQkFDbEMsU0FBUyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFcEIsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVELGVBQWU7UUFDZixJQUFJLEdBQUcsR0FBRyxJQUFJLCtDQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLE1BQU0sR0FBRztZQUNULEtBQUssRUFBRSxPQUFPO1NBQ2pCLENBQUM7UUFDRixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDcEIsSUFBSSxPQUFPLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFDaEMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdkIsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDeEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBR3hCLEtBQUs7UUFDTCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTFCLE9BQU87UUFDUCxNQUFNLE1BQU0sR0FBYTtZQUNyQixxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxlQUFlO1NBQ3JGLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdEIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBRXpCLE1BQU0sT0FBTyxHQUFhLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFM0MsSUFBSSxjQUFjLEdBQUcsQ0FBQyxNQUFnQixFQUFFLEVBQUU7WUFDdEMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNsQixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVuQixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUUzSSxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3QyxPQUFPLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUM3QixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsSUFBSSxPQUFPLEdBQUcsSUFBSSwwQ0FBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQzNCLE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7UUFFRCxJQUFJLFlBQVksR0FBRyxDQUFDLElBQTBCLEVBQUUsTUFBZ0IsRUFBRSxFQUFFO1lBQ2hFLElBQUksUUFBUSxHQUFHLElBQUksaURBQW9CLENBQUM7Z0JBQ3BDLEtBQUssRUFBRSxRQUFRO2dCQUNmLElBQUksRUFBRSxDQUFDO2dCQUNQLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixPQUFPLEVBQUUsR0FBRztnQkFDWixXQUFXLEVBQUUsSUFBSTtnQkFDakIsUUFBUSxFQUFFLG1EQUFzQjtnQkFDaEMsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLEdBQUcsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDO2FBQzlCLENBQUMsQ0FBQztZQUNILE9BQU8sSUFBSSx5Q0FBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRUQsSUFBSSxlQUFlLEdBQUcsR0FBRyxFQUFFO1lBRXZCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNmLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsQixNQUFNLElBQUksR0FBRyxHQUFHLENBQUM7WUFFakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0IsTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBRTlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUvQixhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDL0I7WUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLGlEQUFvQixFQUFFLENBQUM7WUFDNUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSx5REFBNEIsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RixNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFDRCxlQUFlLEVBQUUsQ0FBQztRQUVsQixNQUFNO1FBQ04sTUFBTSxVQUFVLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFDckMsTUFBTSxjQUFjLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFDekMsTUFBTSxTQUFTLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFDcEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxRQUFzQixFQUFFLEVBQUU7WUFDMUMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNyQixNQUFNLFFBQVEsR0FBRyxJQUFJLGlEQUFvQixDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QyxNQUFNLFFBQVEsR0FBRyxJQUFJLG9EQUF1QixDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDL0QsTUFBTSxJQUFJLEdBQUcsSUFBSSx1Q0FBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVoRCxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFdkMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QixjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDRCxNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7WUFDckIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUVmLE1BQU0sUUFBUSxHQUFHLElBQUksaURBQW9CLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMxRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sUUFBUSxHQUFHLElBQUksb0RBQXVCLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUMvRCxNQUFNLElBQUksR0FBRyxJQUFJLHVDQUFVLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRWhELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBRXZDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUdqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXhCLFVBQVUsQ0FBQyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxXQUFXLEVBQUUsQ0FBQztRQUdkLE9BQU87UUFDUCxNQUFNLGlCQUFpQixHQUFHLElBQUksd0NBQVcsRUFBRSxDQUFDO1FBQzVDLE1BQU0sU0FBUyxHQUFHLElBQUksd0NBQVcsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO1lBQzVCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNqQixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBRWYsTUFBTSxRQUFRLEdBQUcsSUFBSSxpREFBb0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNoRCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9EQUF1QixDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDL0QsTUFBTSxJQUFJLEdBQUcsSUFBSSx1Q0FBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBRXZDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU1QixLQUFLO1lBQ0wsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksTUFBTSxHQUFhO2dCQUNuQixvQkFBb0I7Z0JBQ3BCLG9CQUFvQjtnQkFDcEIsb0JBQW9CO2dCQUNwQixvQkFBb0I7Z0JBQ3BCLG9CQUFvQjtnQkFDcEIscUJBQXFCO2dCQUNyQixlQUFlO2dCQUNmLHFCQUFxQjthQUN4QjtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLE1BQU0sV0FBVyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDMUMsTUFBTSxXQUFXLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUM7Z0JBQzFCLE1BQU0sUUFBUSxHQUFHLElBQUksK0NBQWtCLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUM7Z0JBRWhGLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzdELE1BQU0sUUFBUSxHQUFHLElBQUksb0RBQXVCLENBQUM7b0JBQ3pDLEtBQUssRUFBRSxHQUFHO29CQUNWLE9BQU8sRUFBRSxHQUFHO29CQUNaLFdBQVcsRUFBRSxLQUFLO29CQUNsQixRQUFRLEVBQUUsbURBQXNCO29CQUNoQyxVQUFVLEVBQUUsS0FBSztvQkFDakIsSUFBSSxFQUFFLDZDQUFnQjtpQkFDekIsQ0FBQztnQkFFRixNQUFNLElBQUksR0FBRyxJQUFJLHVDQUFVLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUVoRCxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZCO1lBRUQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RELGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUNELGtCQUFrQixFQUFFLENBQUM7UUFFckIsYUFBYTtRQUNiLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBMEIsRUFBRSxNQUFnQixFQUFFLEVBQUU7WUFDakUsSUFBSSxRQUFRLEdBQUcsSUFBSSxpREFBb0IsQ0FBQztnQkFDcEMsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsZUFBZSxFQUFFLEtBQUs7Z0JBQ3RCLE9BQU8sRUFBRSxHQUFHO2dCQUNaLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixRQUFRLEVBQUUsbURBQXNCO2dCQUNoQyxVQUFVLEVBQUUsS0FBSztnQkFDakIsR0FBRyxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUM7YUFDOUIsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxJQUFJLHlDQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFFRCxTQUFTO1FBQ1QsTUFBTSxjQUFjLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFDekMsTUFBTSxhQUFhLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFDeEMsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFO1lBQ3pCLE1BQU0sYUFBYSxHQUFHLElBQUksdUNBQVUsQ0FDaEMsSUFBSSxpREFBb0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUNwQyxJQUFJLG9EQUF1QixDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQ25ELENBQUM7WUFDRixjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRWxDLE1BQU0sVUFBVSxHQUFHLElBQUksdUNBQVUsQ0FDN0IsSUFBSSxpREFBb0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUNwQyxJQUFJLG9EQUF1QixDQUFDO2dCQUN4QixLQUFLLEVBQUUsUUFBUTtnQkFDZixXQUFXLEVBQUUsSUFBSTtnQkFDakIsT0FBTyxFQUFFLEdBQUc7Z0JBQ1osUUFBUSxFQUFFLG1EQUFzQjtnQkFDaEMsSUFBSSxFQUFFLDJDQUFjO2FBQ3ZCLENBQUMsQ0FDTDtZQUNELGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFHL0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDZixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDckIsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNiLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFFeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxnREFBbUIsQ0FDcEMsV0FBVyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQ2xDLElBQUksR0FBRyxDQUFDLEVBQ1IsY0FBYyxHQUFHLEVBQUUsRUFDbkIsZUFBZSxHQUFHLEdBQUcsQ0FDeEI7Z0JBQ0QsSUFBSSxNQUFNLEdBQWU7b0JBQ3JCLENBQUMsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsMkJBQTJCLEVBQUUsZUFBZSxDQUFDO29CQUMxRixDQUFDLGtCQUFrQixFQUFFLHVCQUF1QixFQUFFLDBCQUEwQixFQUFFLGVBQWUsQ0FBQztpQkFDN0YsQ0FBQztnQkFDRixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM5RDtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUNELGVBQWUsRUFBRSxDQUFDO1FBSWxCLEtBQUs7UUFDTCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdEIsTUFBTSxTQUFTLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFDcEMsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHLElBQUksaURBQW9CLEVBQUUsQ0FBQztZQUM1QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFOUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxpREFBb0IsQ0FBQztnQkFDdEMsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsR0FBRyxFQUFFLE9BQU87Z0JBQ1osUUFBUSxFQUFFLG1EQUFzQjtnQkFDaEMsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixPQUFPLEVBQUUsQ0FBQzthQUNiLENBQUMsQ0FBQztZQUVILE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUM1QixNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEQsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFFM0IsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDMUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RELFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0RCxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSwwQ0FBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3RGO1lBQ0QsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxrREFBcUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUkseUNBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFMUQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUNELGFBQWEsRUFBRSxDQUFDO1FBQ2hCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBSTFCLFFBQVE7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbURBQXNCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sSUFBSSxHQUFHLElBQUksMENBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQixzQkFBc0I7UUFDdEIsbUNBQW1DO1FBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUksd0NBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksTUFBTSxHQUF5QixDQUFDLElBQUksRUFBRSxFQUFFO1lBRXhDLEtBQUs7WUFDTCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFHbkMsTUFBTSxJQUFJLEdBQXlCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1lBQy9ELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUU7b0JBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDbEQ7Z0JBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDcEYsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDcEYsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUN4RjtZQUNELFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBRTdCLE1BQU07WUFDTixVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUM7WUFDL0IsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDO1lBQ25DLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztZQUM3QixPQUFPO1lBQ1AsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDO1lBRS9CLFNBQVM7WUFDVCxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUM7WUFFbkMsS0FBSztZQUdMLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQUU7Z0JBRXZCLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBRVosU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDakIsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBRXpCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUN4QixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDeEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBRXhCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ1osU0FBUyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7d0JBRTFCLFFBQVEsTUFBTSxDQUFDLEtBQUssRUFBRTs0QkFDbEIsS0FBSyxPQUFPO2dDQUNSLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dDQUN2QixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQ0FDeEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0NBQ3hCLE1BQU07NEJBQ1YsS0FBSyxlQUFlO2dDQUNoQixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQ0FDeEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0NBQ3ZCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dDQUN4QixNQUFNOzRCQUNWLEtBQUssV0FBVztnQ0FDWixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQ0FDeEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0NBQ3hCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dDQUN2QixNQUFNOzRCQUNWO2dDQUNJLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dDQUN4QixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQ0FDeEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7eUJBQy9CO3dCQUNELEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUVyQixTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDO2lCQUNYO2FBRUo7WUFDRCxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUVKO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBRWxELFNBQVMsSUFBSTtJQUNULElBQUksU0FBUyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztJQUV2QyxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLDBDQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7Ozs7Ozs7VUNwZUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8yM0ZJMTE4IOajrueUsOWwj+miqOa1gVxyXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xyXG5pbXBvcnQgeyBNVExMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9NVExMb2FkZXIuanMnO1xyXG5pbXBvcnQgeyBPQkpMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9PQkpMb2FkZXIuanMnO1xyXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknO1xyXG5cclxuXHJcbmNsYXNzIFRocmVlSlNDb250YWluZXIge1xyXG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XHJcbiAgICBwcml2YXRlIGxpZ2h0OiBUSFJFRS5MaWdodDtcclxuXHJcbiAgICAvL+ODr+ODvOODl1xyXG4gICAgcHJpdmF0ZSB3YXJwUGFydGljbGVzOiBUSFJFRS5Qb2ludHM7XHJcbiAgICBwcml2YXRlIHBhcnRpY2xlVmVsb2NpdHk6IFRIUkVFLlZlY3RvcjNbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g55S76Z2i6YOo5YiG44Gu5L2c5oiQKOihqOekuuOBmeOCi+aeoOOBlOOBqOOBqykqXHJcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcclxuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSk7XHJcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlOyAvL+OCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xyXG5cclxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxyXG4gICAgICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XHJcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcclxuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcclxuXHJcbiAgICAgICAgY29uc3Qgb3JiaXRDb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcclxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIxyZW5kZXJcclxuICAgICAgICAvLyByZXFlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcclxuICAgICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcclxuICAgICAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCBjYW1lcmEpO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XHJcblxyXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcclxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLm1hcmdpbiA9IFwiMTBweFwiO1xyXG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxyXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XHJcbiAgICAgICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcclxuXHJcbiAgICAgICAgLy8gY29uc3QgYXhlc0Jhckxlbmd0aCA9IDEwLjA7XHJcbiAgICAgICAgLy8gdGhpcy5zY2VuZS5hZGQobmV3IFRIUkVFLkF4ZXNIZWxwZXIoYXhlc0Jhckxlbmd0aCkpO1xyXG5cclxuICAgICAgICAvL+OCquODluOCuOOCp+OCr+ODiOOBruODreODvOODiVxyXG4gICAgICAgIGxldCBsb2FkT0JKID0gKG9iakZpbGVQYXRoOiBzdHJpbmcsIG10bEZpbGVQYXRoOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgbGV0IG9iamVjdCA9IG5ldyBUSFJFRS5PYmplY3QzRDtcclxuICAgICAgICAgICAgY29uc3QgbXRsTG9hZGVyID0gbmV3IE1UTExvYWRlcigpO1xyXG4gICAgICAgICAgICBtdGxMb2FkZXIubG9hZChtdGxGaWxlUGF0aCwgKG1hdGVyaWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5wcmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmpMb2FkZXIgPSBuZXcgT0JKTG9hZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBvYmpMb2FkZXIuc2V0TWF0ZXJpYWxzKG1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgIG9iakxvYWRlci5sb2FkKG9iakZpbGVQYXRoLCAob2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmFkZChvYmopO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0dVSSBhbmQgR1JPVVBcclxuICAgICAgICBsZXQgZ3VpID0gbmV3IEdVSSgpO1xyXG4gICAgICAgIGxldCBndWlPYmogPSB7XHJcbiAgICAgICAgICAgIHdvcmxkOiAnRWFydGgnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgd29ybGQgPSAnRWFydGgnO1xyXG4gICAgICAgIGxldCB3b3JsZF8xID0gbmV3IFRIUkVFLkdyb3VwKCk7XHJcbiAgICAgICAgbGV0IHdvcmxkXzIgPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICAgICAgICBsZXQgd29ybGRfMyA9IG5ldyBUSFJFRS5Hcm91cCgpO1xyXG4gICAgICAgIHdvcmxkXzEudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgd29ybGRfMi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgd29ybGRfMy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgZ3VpLmFkZChndWlPYmosICd3b3JsZCcsIFsnRWFydGgnLCAnUmluZ2VkIFBsYW5ldCcsICdCbGFja0hvbGUnXSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHdvcmxkXzEpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHdvcmxkXzIpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHdvcmxkXzMpO1xyXG5cclxuXHJcbiAgICAgICAgLy/lroflrpnoiLlcclxuICAgICAgICBjb25zdCBzcGFjZXNoaXAgPSBsb2FkT0JKKFwic3BhY2VzaGlwLm9ialwiLCBcInNwYWNlc2hpcC5tdGxcIik7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoc3BhY2VzaGlwKTtcclxuXHJcbiAgICAgICAgLy/lroflrpnjga7og4zmma9cclxuICAgICAgICBjb25zdCBjb2xvcnM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICAgICAncmdiYSgyNTUsMjU1LDI1NSwxKScsICdyZ2IoMjU1LCAyNTUsIDI1NSknLCAncmdiKDI1NSwgMjU1LCAyNTUpJywgJ3JnYmEoMCwwLDAsMSknXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhcnNOdW0gPSA1MDAwO1xyXG4gICAgICAgIGNvbnN0IHN0YXJQb3NpdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0czogbnVtYmVyW10gPSBbMCwgMC4xLCAwLjIsIDFdO1xyXG5cclxuICAgICAgICBsZXQgZ2VuZXJhdGVTcHJpdGUgPSAoY29sb3JzOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IDE2O1xyXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTY7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICBsZXQgZ3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCAwLCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgY2FudmFzLndpZHRoIC8gMik7XHJcblxyXG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3Aob2Zmc2V0c1swXSwgY29sb3JzWzBdKTtcclxuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKG9mZnNldHNbMV0sIGNvbG9yc1sxXSk7XHJcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcChvZmZzZXRzWzJdLCBjb2xvcnNbMl0pO1xyXG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3Aob2Zmc2V0c1szXSwgY29sb3JzWzNdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnQ7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgbGV0IHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShjYW52YXMpO1xyXG4gICAgICAgICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3JlYXRlUG9pbnRzID0gKGdlb206IFRIUkVFLkJ1ZmZlckdlb21ldHJ5LCBjb2xvcnM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogMHhmZmZmZmYsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAzLFxyXG4gICAgICAgICAgICAgICAgc2l6ZUF0dGVudWF0aW9uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuOCxcclxuICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXHJcbiAgICAgICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1hcDogZ2VuZXJhdGVTcHJpdGUoY29sb3JzKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUSFJFRS5Qb2ludHMoZ2VvbSwgbWF0ZXJpYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNyZWF0ZVN0YXJGaWVsZCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCByYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhSID0gMTAwMDtcclxuICAgICAgICAgICAgY29uc3QgbWluUiA9IDgwMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhcnNOdW07IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmFkaXVzID0gbWluUiArIE1hdGgucmFuZG9tKCkgKiAobWF4UiAtIG1pblIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHUgPSAyICogTWF0aC5QSSAqIE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2ID0gTWF0aC5QSSAqIE1hdGgucmFuZG9tKCkgLSBNYXRoLlBJIC8gMjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHggPSByYWRpdXMgKiBNYXRoLmNvcyh1KSAqIE1hdGguY29zKHYpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IHJhZGl1cyAqIE1hdGguc2luKHUpICogTWF0aC5jb3Modik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB6ID0gcmFkaXVzICogTWF0aC5zaW4odik7XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhclBvc2l0aW9ucy5wdXNoKHgsIHksIHopO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xyXG4gICAgICAgICAgICBnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoc3RhclBvc2l0aW9ucywgMykpO1xyXG4gICAgICAgICAgICBjb25zdCBzdGFyRmllbGQgPSBjcmVhdGVQb2ludHMoZ2VvbWV0cnksIGNvbG9ycyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHN0YXJGaWVsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNyZWF0ZVN0YXJGaWVsZCgpO1xyXG5cclxuICAgICAgICAvL+aciOOBqOWcsOeQg1xyXG4gICAgICAgIGNvbnN0IGVhcnRoR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICAgICAgICBjb25zdCBtb29uT3JiaXRHcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xyXG4gICAgICAgIGNvbnN0IG1vb25Hcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZU1vb24gPSAoZWFydGhQb3M6VEhSRUUuVmVjdG9yMykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmFkaXVzID0gMjU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gMjAwO1xyXG4gICAgICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeShyYWRpdXMsIDMyLCAxNik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHR1cmUgPSBsb2FkZXIubG9hZCgnbW9vbi5wbmcnKTtcclxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xyXG5cclxuICAgICAgICAgICAgbW9vbkdyb3VwLmFkZChtZXNoKTtcclxuICAgICAgICAgICAgbW9vbkdyb3VwLnBvc2l0aW9uLnNldChkaXN0YW5jZSwgMCwgMCk7XHJcblxyXG4gICAgICAgICAgICBtb29uT3JiaXRHcm91cC5hZGQobW9vbkdyb3VwKTtcclxuICAgICAgICAgICAgbW9vbk9yYml0R3JvdXAucG9zaXRpb24uY29weShlYXJ0aFBvcyk7XHJcblxyXG4gICAgICAgICAgICB3b3JsZF8xLmFkZChtb29uT3JiaXRHcm91cCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHdvcmxkXzEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjcmVhdGVFYXJ0aCA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJhZGl1cyA9IDEwMDtcclxuICAgICAgICAgICAgY29uc3QgeCA9IC0xMDA7XHJcbiAgICAgICAgICAgIGNvbnN0IHkgPSAtMjU7XHJcbiAgICAgICAgICAgIGNvbnN0IHogPSAtMjAwO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkocmFkaXVzLCAzMiwgMTYpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0dXJlID0gbG9hZGVyLmxvYWQoJ2VhcnRoLnBuZycpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IG1hcDogdGV4dHVyZSB9KTtcclxuICAgICAgICAgICAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XHJcblxyXG4gICAgICAgICAgICBtZXNoLnJvdGF0aW9uLnNldCgwLCAwLCAtTWF0aC5QSSAvIDEyKTtcclxuXHJcbiAgICAgICAgICAgIGVhcnRoR3JvdXAuYWRkKG1lc2gpO1xyXG4gICAgICAgICAgICBlYXJ0aEdyb3VwLnBvc2l0aW9uLnNldCh4LCB5LCB6KTtcclxuXHJcblxyXG4gICAgICAgICAgICB3b3JsZF8xLmFkZChlYXJ0aEdyb3VwKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQod29ybGRfMSk7XHJcblxyXG4gICAgICAgICAgICBjcmVhdGVNb29uKG5ldyBUSFJFRS5WZWN0b3IzKHgsIHksIHopKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3JlYXRlRWFydGgoKTtcclxuXHJcblxyXG4gICAgICAgIC8v55Kw5LuY44GN5oOR5pifXHJcbiAgICAgICAgY29uc3QgcmluZ2VkUGxhbmV0R3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICAgICAgICBjb25zdCByaW5nR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICAgICAgICBjb25zdCBjcmVhdGVSaW5nZWRQbGFuZXQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByYWRpdXMgPSA1MDA7XHJcbiAgICAgICAgICAgIGNvbnN0IHggPSA1MDA7XHJcbiAgICAgICAgICAgIGNvbnN0IHkgPSAtMjAwO1xyXG4gICAgICAgICAgICBjb25zdCB6ID0gLTYwMDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KHJhZGl1cywgMzIsIDE2KTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dHVyZSA9IGxvYWRlci5sb2FkKCdyaW5nZWRQbGFuZXQucG5nJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgbWFwOiB0ZXh0dXJlIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcclxuICAgICAgICAgICAgbWVzaC5wb3NpdGlvbi5zZXQoeCwgeSwgeik7XHJcbiAgICAgICAgICAgIG1lc2gucm90YXRpb24uc2V0KDAsIDAsIC1NYXRoLlBJIC8gMTIpO1xyXG5cclxuICAgICAgICAgICAgcmluZ2VkUGxhbmV0R3JvdXAuYWRkKG1lc2gpO1xyXG5cclxuICAgICAgICAgICAgLy/jg6rjg7PjgrBcclxuICAgICAgICAgICAgY29uc3QgcmluZ0NvdW50ID0gNDA7XHJcbiAgICAgICAgICAgIGxldCBjb2xvcnM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICAgICAgICAgXCJyZ2JhKDE4MCwgMTQwLCA4MClcIixcclxuICAgICAgICAgICAgICAgIFwicmdiYSgxNjAsIDEyMCwgNjApXCIsXHJcbiAgICAgICAgICAgICAgICBcInJnYmEoMTkwLCAxNTAsIDkwKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZ2JhKDE1MCwgMTEwLCA3MClcIixcclxuICAgICAgICAgICAgICAgIFwicmdiYSgxNzAsIDEzMCwgNzUpXCIsXHJcbiAgICAgICAgICAgICAgICBcInJnYmEoMjAwLCAxNjAsIDEwMClcIixcclxuICAgICAgICAgICAgICAgIFwicmdiYSg5LCA1LCAxKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZ2JhKDIxMCwgMTcwLCAxMTApXCJcclxuICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByaW5nQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5uZXJSYWRpdXMgPSByYWRpdXMgKyAxMDAgKyBpICogMTA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvdXRlclJhZGl1cyA9IGlubmVyUmFkaXVzICsgTWF0aC5yYW5kb20oKSAqIDEwICsgNTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRoZXRhU2VnbWVudHMgPSAxMjg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5SaW5nR2VvbWV0cnkoaW5uZXJSYWRpdXMsIG91dGVyUmFkaXVzLCB0aGV0YVNlZ21lbnRzKVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbCA9IGNvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb2xvcnMubGVuZ3RoKV1cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogY29sLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuOCxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByaW5nID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICByaW5nR3JvdXAuYWRkKHJpbmcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByaW5nR3JvdXAucG9zaXRpb24uc2V0KHgsIHksIHopO1xyXG4gICAgICAgICAgICByaW5nR3JvdXAucm90YXRpb24uc2V0KE1hdGguUEkgLyAyLCAtTWF0aC5QSSAvIDEyLCAwKTtcclxuICAgICAgICAgICAgcmluZ2VkUGxhbmV0R3JvdXAuYWRkKHJpbmdHcm91cCk7XHJcblxyXG4gICAgICAgICAgICB3b3JsZF8yLmFkZChyaW5nZWRQbGFuZXRHcm91cCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHdvcmxkXzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjcmVhdGVSaW5nZWRQbGFuZXQoKTtcclxuXHJcbiAgICAgICAgLy/mmJ/jga7jg6rjg7PjgrDjga7jg57jg4bjg6rjgqLjg6tcclxuICAgICAgICBjb25zdCBjcmVhdGVSaW5ncyA9IChnZW9tOiBUSFJFRS5CdWZmZXJHZW9tZXRyeSwgY29sb3JzOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IDB4MTExMTExLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogMTUsXHJcbiAgICAgICAgICAgICAgICBzaXplQXR0ZW51YXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMC4yLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcclxuICAgICAgICAgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWFwOiBnZW5lcmF0ZVNwcml0ZShjb2xvcnMpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRIUkVFLlBvaW50cyhnZW9tLCBtYXRlcmlhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+ODluODqeODg+OCr+ODm+ODvOODq1xyXG4gICAgICAgIGNvbnN0IGJsYWNrSG9sZUdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XHJcbiAgICAgICAgY29uc3QgYmxhY2tIb2xlUmluZyA9IG5ldyBUSFJFRS5Hcm91cCgpO1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUJsYWNrSG9sZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgQmxhY2tIb2xlQ29yZSA9IG5ldyBUSFJFRS5NZXNoKFxyXG4gICAgICAgICAgICAgICAgbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDUwLCAzMiwgMzIpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4MDAwMDAwIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGJsYWNrSG9sZUdyb3VwLmFkZChCbGFja0hvbGVDb3JlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdsb3dTcGhlcmUgPSBuZXcgVEhSRUUuTWVzaChcclxuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSg1MiwgMzIsIDMyKSxcclxuICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IDB4ZmZmZmFhLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuOCxcclxuICAgICAgICAgICAgICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcclxuICAgICAgICAgICAgICAgICAgICBzaWRlOiBUSFJFRS5CYWNrU2lkZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBibGFja0hvbGVHcm91cC5hZGQoZ2xvd1NwaGVyZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHJhZGl1cyA9IDIwO1xyXG4gICAgICAgICAgICBjb25zdCB4ID0gLTUwO1xyXG4gICAgICAgICAgICBjb25zdCB5ID0gMDtcclxuICAgICAgICAgICAgY29uc3QgeiA9IC0xMDA7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdCBudW0gPSAyMDtcclxuICAgICAgICAgICAgbGV0IHRvcnVzUmFkaXVzID0gMDtcclxuICAgICAgICAgICAgbGV0IHR1YmUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcmFkaWFsU2VnbWVudHMgPSAwO1xyXG4gICAgICAgICAgICBsZXQgdHVidWxhclNlZ21lbnRzID0gMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoXHJcbiAgICAgICAgICAgICAgICAgICAgdG9ydXNSYWRpdXMgPSByYWRpdXMgKyAoaSArIDEpICogNCxcclxuICAgICAgICAgICAgICAgICAgICB0dWJlID0gMSxcclxuICAgICAgICAgICAgICAgICAgICByYWRpYWxTZWdtZW50cyA9IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgIHR1YnVsYXJTZWdtZW50cyA9IDMwMFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yczogc3RyaW5nW11bXSA9IFtcclxuICAgICAgICAgICAgICAgICAgICBbJ3JnYmEoMCwgMCwgMCwgMSknLCAncmdiYSg3MCwgNSwgNSwgMC40NCknLCAncmdiYSgyMzUsIDE3NiwgMTEzLCAwLjU2KScsICdyZ2JhKDAsMCwwLDEpJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgWydyZ2JhKDAsIDAsIDAsIDEpJywgJ3JnYmEoNzgsIDQ2LCA1LCAwLjQ0KScsICdyZ2JhKDE0MywgMTQzLCAyMCwgMC42OSknLCAncmdiYSgwLDAsMCwxKSddLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGxldCBpZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoY29sb3JzLmxlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zW2ldID0gY3JlYXRlUmluZ3MoZ2VvbWV0cnksIGNvbG9yc1tpZHhdKTtcclxuICAgICAgICAgICAgICAgIGJsYWNrSG9sZVJpbmcuYWRkKHBvc2l0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBibGFja0hvbGVHcm91cC5hZGQocG9zaXRpb25zW2ldKTtcclxuICAgICAgICAgICAgICAgIGJsYWNrSG9sZUdyb3VwLnBvc2l0aW9uLnNldCh4LCB5LCB6KTtcclxuICAgICAgICAgICAgICAgIGJsYWNrSG9sZUdyb3VwLnJvdGF0aW9uLnNldChNYXRoLlBJIC8gMiwgLU1hdGguUEkgLyAxMiwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd29ybGRfMy5hZGQoYmxhY2tIb2xlR3JvdXApO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh3b3JsZF8zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3JlYXRlQmxhY2tIb2xlKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/jg6/jg7zjg5dcclxuICAgICAgICBsZXQgaXNXYXJwaW5nID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3Qgd2FycEdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XHJcbiAgICAgICAgY29uc3Qgd2FycEFuaW1hdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dHVyZSA9IGxvYWRlci5sb2FkKCd3YXJwRWZmZWN0LnBuZycpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xyXG4gICAgICAgICAgICAgICAgc2l6ZTogMSxcclxuICAgICAgICAgICAgICAgIG1hcDogdGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IDB4YWFhYUZGLFxyXG4gICAgICAgICAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcGFydGljbGVOdW0gPSAxMDAwMDAwO1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBhcnRpY2xlTnVtICogMyk7XHJcbiAgICAgICAgICAgIGxldCBwYXJ0aWNsZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZVZlbG9jaXR5ID0gW107XHJcblxyXG4gICAgICAgICAgICBjb25zdCByYWRpdXMgPSAyMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZU51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aGV0YSA9IDIgKiBNYXRoLlBJICogTWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uc1twYXJ0aWNsZUluZGV4KytdID0gcmFkaXVzICogTWF0aC5jb3ModGhldGEpO1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zW3BhcnRpY2xlSW5kZXgrK10gPSByYWRpdXMgKiBNYXRoLnNpbih0aGV0YSk7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNbcGFydGljbGVJbmRleCsrXSA9IDEwMDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpY2xlVmVsb2NpdHkucHVzaChuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgTWF0aC5yYW5kb20oKSAqIDAuMSArIDAuMSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xyXG4gICAgICAgICAgICB0aGlzLndhcnBQYXJ0aWNsZXMgPSBuZXcgVEhSRUUuUG9pbnRzKGdlb21ldHJ5LCBtYXRlcmlhbCk7XHJcblxyXG4gICAgICAgICAgICB3YXJwR3JvdXAuYWRkKHRoaXMud2FycFBhcnRpY2xlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHdhcnBHcm91cCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdhcnBBbmltYXRpb24oKTtcclxuICAgICAgICB3YXJwR3JvdXAudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXHJcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAyKTtcclxuICAgICAgICBjb25zdCBsdmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5saWdodCk7XHJcblxyXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jOabtOaWsFxyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxyXG4gICAgICAgIGNvbnN0IGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XHJcbiAgICAgICAgbGV0IHVwZGF0ZTogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy/jg6/jg7zjg5dcclxuICAgICAgICAgICAgY29uc3QgZGVsdGFUaW1lID0gY2xvY2suZ2V0RGVsdGEoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBjb25zdCBnZW9tID0gPFRIUkVFLkJ1ZmZlckdlb21ldHJ5PnRoaXMud2FycFBhcnRpY2xlcy5nZW9tZXRyeTtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25zID0gZ2VvbS5nZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zaXRpb25zLmNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbnMuZ2V0WihpKSA+IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5zZXRaKGksIC0xMDAwICogTWF0aC5yYW5kb20oKSAtIDUwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMuc2V0WChpLCBwb3NpdGlvbnMuZ2V0WChpKSArIHRoaXMucGFydGljbGVWZWxvY2l0eVtpXS54ICogZGVsdGFUaW1lICogMTAwKTtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5zZXRZKGksIHBvc2l0aW9ucy5nZXRZKGkpICsgdGhpcy5wYXJ0aWNsZVZlbG9jaXR5W2ldLnkgKiBkZWx0YVRpbWUgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLnNldFooaSwgcG9zaXRpb25zLmdldFooaSkgKyB0aGlzLnBhcnRpY2xlVmVsb2NpdHlbaV0ueiAqIGRlbHRhVGltZSAqIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5uZWVkc1VwZGF0ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvL+WcsOeQg+OBqOaciFxyXG4gICAgICAgICAgICBlYXJ0aEdyb3VwLnJvdGF0aW9uLnkgKz0gMC4wMDU7XHJcbiAgICAgICAgICAgIG1vb25PcmJpdEdyb3VwLnJvdGF0aW9uLnkgKz0gMC4wMDU7XHJcbiAgICAgICAgICAgIG1vb25Hcm91cC5yb3RhdGlvbi55ICs9IDAuMDE7XHJcbiAgICAgICAgICAgIC8v55Kw5LuY44GN5oOR5pifXHJcbiAgICAgICAgICAgIHJpbmdHcm91cC5yb3RhdGlvbi56IC09IDAuMDAwNTtcclxuXHJcbiAgICAgICAgICAgIC8v44OW44Op44OD44Kv44Ob44O844OrXHJcbiAgICAgICAgICAgIGJsYWNrSG9sZUdyb3VwLnJvdGF0aW9uLnogLT0gMC4wMDI7XHJcblxyXG4gICAgICAgICAgICAvL0dVSVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChndWlPYmoud29ybGQgIT0gd29ybGQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzV2FycGluZykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpc1dhcnBpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHdhcnBHcm91cC52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGRfMS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGRfMi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGRfMy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3YXJwR3JvdXAudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChndWlPYmoud29ybGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VhcnRoJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JsZF8xLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmxkXzIudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmxkXzMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnUmluZ2VkIFBsYW5ldCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ybGRfMS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ybGRfMi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JsZF8zLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0JsYWNrSG9sZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ybGRfMS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ybGRfMi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ybGRfMy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ybGRfMS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ybGRfMi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ybGRfMy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ybGQgPSBndWlPYmoud29ybGQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhcnBpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA4MDAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XHJcblxyXG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKDY0MCwgNDgwLCBuZXcgVEhSRUUuVmVjdG9yMygwLCA1LCAxMCkpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmItYjRhMzdjXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9