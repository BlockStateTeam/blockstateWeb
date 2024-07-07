const canvas = document.getElementById("renderingCanvas");

const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

const scene = new BABYLON.Scene(engine);
scene.clearColor = BABYLON.Color3.FromHexString("#b5e2ff");

const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 1.5, -10.5), scene);
camera.setTarget(BABYLON.Vector3.Zero());
camera.position = new BABYLON.Vector3(-5.75, 2.2, -12);
camera.setTarget(new BABYLON.Vector3(-5.75, 1, 0));


const hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);

const ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(0, 1, 0), scene);

const spotLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 20, -20), new BABYLON.Vector3(0, -1, 1), Math.PI / 2, 1, scene);

let model;
let animationGroup;

BABYLON.SceneLoader.ImportMesh("", "https://dl.dropboxusercontent.com/scl/fi/h1u3qk9s4kgg3egyzuei4/FinalBB_1.gltf?rlkey=mqxeabpztsbaj875cpy786y5b&dl=0", "", scene, function (meshes, particleSystems, skeletons, animationGroups) {
    if (meshes.length > 0) {
        model = meshes[0];
        model.position = new BABYLON.Vector3(-3, -22, 12);

        if (animationGroups.length > 0) {
            animationGroup = animationGroups[0];
            animationGroup.pause();
        }

        // Hide loading screen
        const loadingScreen = document.getElementById("loadingScreen");
        loadingScreen.style.opacity = "1";
        setTimeout(() => {
            let opacity = 1;
            const fadeInterval = setInterval(() => {
                opacity -= 0.02;
                loadingScreen.style.opacity = opacity;
                if (opacity <= 0) {
                    loadingScreen.style.visibility = "hidden";
                    clearInterval(fadeInterval);
                }
            }, 20);
        }, 1000);
    }
});

let show;

function getScrollAmounts() {
    return {
        x: window.scrollX || document.documentElement.scrollLeft,
        y: window.scrollY || document.documentElement.scrollTop
    };
}

function updateText(show) {
    console.log(show);
    show = show * 56;
    let text = "";
    if (show < 3.2) {
        text = " Hello strangers around the globe ";
    } else if (show >= 3.2 && show < 5) {
        text = " We are a new Minecraft crew, born from a dream of innovation ";
    } else if (show >= 5 && show < 8) {
        text = " Like any other crew, we face initial setbacks and failures";
    } else if (show >= 8 && show < 12) {
        text = " We thought it was the end of our team ";
    } else if (show >= 12 && show < 15) {
        text = " But we all know No pain, No gain! ";
    } else if (show >= 15 && show < 18) {
        text = " We all share the same vision ";
    } else if (show >= 18 && show < 21) {
        text = " And we will fight to make it happen ";
    } else if (show >= 21 && show < 23) {
        text = " Each challenge we overcome, we learn and we grow ";
    } else if (show >= 23 && show < 25) {
        text = " We finally released our first ever project! ";
    } else if (show >= 25 && show < 27) {
        text = " Amidst all the success, we have come to appreciate our friendship more ";
    } else if (show >= 27 && show < 30) {
        text = " The camaraderie, support, and shared passion for our work have bound us together like never before ";
    } else if (show >= 30 && show < 35) {
        text = " And we know there's more waiting of us ";
    } else if (show >= 35 && show < 38) {
        text = " And who knows what lies ahead? ";
    } else if (show >= 38 && show < 42) {
        text = " It can be daunting challenge or golden opportunity ";
    } else if (show >= 42 && show < 45) {
        text = " But what ever it is, we're ready for it ";
    } else if (show >= 45 && show < 50) {
        text = " So, let's see how far will we go ";
    } else if (show >= 50 && show < 54) {
        text = " When we all go together ";
    } else if (show >= 54) {
        text = " THE END ";
    }
    document.getElementById("text").innerHTML = text;
}
window.addEventListener('scroll', () => {
    const scrollY = getScrollAmounts().y;
    const time = scrollY / 35000;
    
    if (animationGroup) {
        animationGroup.play();
        animationGroup.goToFrame(time * animationGroup.to);
        animationGroup.pause();
    }

    show = time;
    updateText(show);
});

engine.runRenderLoop(function() {
    scene.render();
});
window.addEventListener("resize", function() {
    engine.resize();
});
document.addEventListener('DOMContentLoaded', () => {
    window.scrollBy(0, 5);
});
