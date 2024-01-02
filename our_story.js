//import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
//===================================================== canvas
let renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var scene = new THREE.Scene();
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}
onWindowResize();
window.addEventListener('resize', onWindowResize);

scene.background = new THREE.Color(0xb5e2ff);

if (window.screen.width > 720) {
  camera.position.set(-0.25, 1.8, -12);
  camera.lookAt( 0, 0, 0 );
}
else {
  camera.position.set(0, 1.5, -10.5);
  camera.lookAt( 0, -0.15, 0 );
};

//===================================================== lights

const HemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 2);
scene.add(HemiLight)
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const spotLight = new THREE.SpotLight(0xffa95c, 3);
spotLight.castShadow = true;
spotLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
spotLight.shadow.bias = 0;

spotLight.shadow.bias = -0.0001;
spotLight.shadow.mapSize.width = 2048*4;
spotLight.shadow.mapSize.height = 2048*4;

spotLight.position.set(0, 20, -20);
scene.add(spotLight);

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.0;
renderer.shadowMap.enabled = true;
//=====================================================Scene Adaptive



//===================================================== model
//const orbit = new OrbitControls(camera, renderer.domElement)
//orbit.update();
var manager = new THREE.LoadingManager();
manager.onLoad = function () {
  		window.addEventListener("load", () => {
		const loadingScreen = document.getElementById("loadingScreen");
		const fadeDuration = 1000;
		const intervalTime = fadeDuration / 50;

		loadingScreen.style.opacity = "1";

		setTimeout(() => {
			const fadeOutStep = () => {
				const currentOpacity = parseFloat(loadingScreen.style.opacity) - (1 / 50);
				loadingScreen.style.opacity = currentOpacity;

				if (currentOpacity <= 0) {
					loadingScreen.style.visibility = "hidden";
					clearInterval(fadeInterval);
				}
			};

			const fadeInterval = setInterval(fadeOutStep, intervalTime);
		}, 1000);
	});
  document.getElementById("loadingScreen").style.opacity = "0";
  document.getElementById("loadingScreen").style.height = 0;
};
var loader = new THREE.GLTFLoader(manager);
var mixer;
var model;
loader.load(
  "https://dl.dropboxusercontent.com/scl/fi/h1u3qk9s4kgg3egyzuei4/FinalBB_1.gltf?rlkey=mqxeabpztsbaj875cpy786y5b&dl=0",
  function (gltf) {
    gltf.scene.traverse(n => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      //if(n.material.map) n.material.map.anisotropy = 1;
    }
  });
    model = gltf.scene;
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'animation2');
    var action = mixer.clipAction(clip);
    action.play();
    action.paused = true;
    createAnimation(mixer, action, clip);
    model.position.set(-3, -22, 12);
    model.rotation.set(0, 0, 0);
  }
);
var clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render()

gsap.registerPlugin(ScrollTrigger);
var show;
function createAnimation(mixer, action, clip) {
  let proxy = {
    get time() {
      return mixer.time;
    },
    set time(value) {
      action.paused = false;
      mixer.setTime(value);
      action.paused = true;
    }
  };
  let scrollingTL = gsap.timeline({
    scrollTrigger: {
      trigger: renderer.domElement,
      start: "0 0",
      end: "100000vh",
      pin: true,
      scrub: 1.5,
      markers: false,
      onUpdate: function () {
        camera.updateProjectionMatrix();
        //console.log(proxy.time);
        show = proxy.time;
        console.log(show);
        if (show < 3.2) {
          document.getElementById("text").innerHTML = " Hello strangers around the globe ";
        } else if (show >= 3.2 && show < 5) {
          document.getElementById("text").innerHTML = " We are a new Minecraft crew, born from a dream of innovation ";
        } else if (show >= 5 && show < 8) {
          document.getElementById("text").innerHTML = " Like any other crew, we face initial setbacks and failures";
        } else if (show >= 8 && show < 12) {
          document.getElementById("text").innerHTML = " We thought it was the end of our team ";
        } else if (show >= 12 && show < 15) {
          document.getElementById("text").innerHTML = " But we all know No pain, No gain! ";
        } else if (show >= 15 && show < 18) {
          document.getElementById("text").innerHTML = " We all share the same vision ";
        } else if (show >= 18 && show < 21) {
          document.getElementById("text").innerHTML = " And we will fight to make it happen ";
        } else if (show >= 21 && show < 23) {
          document.getElementById("text").innerHTML = " Each challenge we overcome, we learn and we grow ";
        } else if (show >= 23 && show < 25) {
          document.getElementById("text").innerHTML = " We finally released our first ever project! ";
        } else if (show >= 25 && show < 27) {
          document.getElementById("text").innerHTML = " Amidst all the success, we have come to appreciate our friendship more ";
        } else if (show >= 28 && show < 30) {
          document.getElementById("text").innerHTML = " The camaraderie, support, and shared passion for our work have bound us together like never before ";
        } else if (show >= 30 && show < 35) {
          document.getElementById("text").innerHTML = " And we know there's more waiting of us ";
        } else if (show >= 35 && show < 38) {
          document.getElementById("text").innerHTML = " And who knows what lies ahead? ";
        } else if (show >= 38 && show < 42) {
          document.getElementById("text").innerHTML = " It can be daunting challenge or golden opportunity ";
        } else if (show >= 42 && show < 45) {
          document.getElementById("text").innerHTML = " But what ever it is, we're ready for it ";
        } else if (show >= 45 && show < 50) {
          document.getElementById("text").innerHTML = " So, let's see how far will we go ";
        } else if (show >= 50 && show < 54) {
          document.getElementById("text").innerHTML = " When we all go together ";
        } else if (show >= 54 && show < 56) {
          document.getElementById("text").innerHTML = " THE END ";
        };
        if (show > 55.95) {
          model.visible = false;
        } else {
          model.visible = true;
        }        
      }
    }
  });
    scrollingTL.to(proxy, {
      time: 56,
  });
};

