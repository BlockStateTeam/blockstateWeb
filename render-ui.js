import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
//===================================================== canvas

const canvasContainer = document.getElementById('canvasContainer');
let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
canvasContainer.appendChild(renderer.domElement);
let camera = new THREE.PerspectiveCamera(
  65,
  canvasContainer.clientWidth / canvasContainer.clientHeight,
  0.1,
  3000
);
var scene = new THREE.Scene();
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
onWindowResize();
window.addEventListener('resize', onWindowResize);

camera.position.set(0, 3, -3);
camera.lookAt( 0, -1, 0 );

//===================================================== lights
let platformShape = new THREE.BoxGeometry(1, 1, 1);
let platformArray = [];
function setUpPlatform(environmentType) {
  platformArray.forEach(platform => {
    scene.remove(platform);
  });
  platformArray = [];

  for (let i = 0; i < 6; i++) {
    let noPlatform = ["underwater", "soul_sand_valley", "coral_reef", "none"];
    if (!noPlatform.includes(environmentType)) {
      let platformfacetexture;

      if (i === 2) {
        platformfacetexture = new THREE.TextureLoader().load(`./panorama/${environmentType}/pf_1.png`);
      } else if (i === 3) {
        platformfacetexture = new THREE.TextureLoader().load(`./panorama/${environmentType}/pf_1.png`);
      } else {
        platformfacetexture = new THREE.TextureLoader().load(`./panorama/${environmentType}/pf_0.png`);
      }

      platformfacetexture.magFilter = THREE.NearestFilter;
      platformfacetexture.minFilter = THREE.NearestFilter;

      platformArray.push(new THREE.MeshBasicMaterial({ map: platformfacetexture }));
      platformArray[i].toneMapped = false;
    }
  }
};
let skybox;
function applyEnvironmentWebp(environmentType) {
  scene.remove(skybox);
  let materialArray = [];
  for (let i = 0; i < 6; i++)
    {
      let facetexture = new THREE.TextureLoader().load( `./panorama/${environmentType}/webp/skybox_${i}.webp`);
      materialArray.push(new THREE.MeshBasicMaterial( { map: facetexture }));
      materialArray[i].side = THREE.BackSide;
      materialArray[i].toneMapped= false;
    }
  let skyboxGeo = new THREE.BoxGeometry( 2000, 2000, 2000);
  skybox = new THREE.Mesh( skyboxGeo, materialArray );
}
document.getElementById("dropdownList").addEventListener("change", function() {
  let environment = this.value;
  console.log(environment);
  for (let i = 0; i < 21; i++) {
    scene.remove(window[`platform${i}`]);
    window[`platform${i}`] = null;
  };
  if (environment === "none") {
    scene.remove(skybox);
    platformArray.forEach(platform => {
      scene.remove(platform);
    });
    platformArray = [];
  } else{
    setUpPlatform(environment);
    applyEnvironmentWebp(environment);
    scene.add(skybox);
    for (let i = 0; i < 21; i++) {
      let positionArray = [[-1, 0, 1], [0, 0, 1], [1, 0, 1], [-1, 0, 0], [0, 0, 0], [1, 0, 0], [-1, 0, -1], [0, 0, -1], [1, 0, -1], [-1, -1, 2], [0, -1, 2], [1, -1, 2], [-2, -1, 1], [2, -1, 1], [-2, -1, 0], [2, -1, 0], [-2, -1, -1], [2, -1, -1], [-1, -1, -2], [0, -1, -2], [1, -1, -2]];
      window[`platform${i}`] = new THREE.Mesh(platformShape, platformArray);
      scene.add(window[`platform${i}`]);
      window[`platform${i}`].position.set(positionArray[i][0], positionArray[i][1], positionArray[i][2]);
    }
  }
});

///////////////////////////////////////////////////////////

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
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
const orbit = new OrbitControls(camera, renderer.domElement)
orbit.update();
orbit.minDistance = 0;
orbit.maxDistance = 600;
var model;
function loadModel(file) {
  const loader = new THREE.GLTFLoader();
  loader.load(
    file,
    (gltf) => {
      if (model) {
        scene.remove(model);
      }

      model = gltf.scene;
      scene.add(model);
      model.position.set(0, 0.5, 0);
      render();
    },
    undefined,
    (error) => {
      console.error('Error loading GLTF model:', error);
    }
  );
}
function onFileInputChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const result = event.target.result;
      loadModel(result);
    };
    reader.readAsDataURL(file);
  }
}
const modelInput = document.getElementById('modelInput');
modelInput.addEventListener('change', onFileInputChange, false);
let getImageData = true;
let imgData;
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  if(getImageData == true){
    imgData = renderer.domElement.toDataURL();
    getImageData = false;
  }
}
render();
document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('myButton');
  button.addEventListener('click', function() {
    getImageData = true;
    render();
    const fileName = 'image.png';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    const scalingFactorInput = document.getElementById('scalingFactor');
    let scalingFactor = 1;
    scalingFactor = parseFloat(scalingFactorInput.value);
    
    image.onload = function () {
        canvas.width = image.width * scalingFactor;
        canvas.height = image.height * scalingFactor;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let top = canvas.height;
        let bottom = 0;
        let left = canvas.width;
        let right = 0;

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const alpha = pixels[index + 3];

            if (alpha !== 0) {
              top = Math.min(top, y);
              bottom = Math.max(bottom, y);
              left = Math.min(left, x);
              right = Math.max(right, x);
            }
          }
        }
        const width = right - left;
        const height = bottom - top;
        const trimmedCanvas = document.createElement('canvas');
        trimmedCanvas.width = width;
        trimmedCanvas.height = height;
        const trimmedCtx = trimmedCanvas.getContext('2d');
        trimmedCtx.drawImage(
          canvas,
          left,
          top,
          width,
          height,
          0,
          0,
          width,
          height
        );
        const dataURL = trimmedCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    image.src = imgData;
  });
  imgData = "clear";
});