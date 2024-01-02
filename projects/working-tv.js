import { downloadZip } from "https://cdn.jsdelivr.net/npm/client-zip/index.js"
const { fetchFile } = FFmpegUtil;
const { FFmpeg } = FFmpegWASM;
let ffmpeg = null;
let hasFile = false;
let slotArray = [];
let imgSlotBlob = [];
let audioSlotBlob = [];
function updateFetch(fetchContent) {
  document.getElementById("loadingText").innerHTML = fetchContent;
  let loadingBarRun = document.getElementById("loadingBarRun");
  let currentWidth = loadingBarRun.style.width;
  let numericWidth = parseFloat(currentWidth);
  numericWidth += 5.2632;
  loadingBarRun.style.width = numericWidth + '%';
}
let uploadButton;
let currentInfo;
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fileTrigger').forEach(element => {
    element.addEventListener('change', () => {
      let currentId = element.id;
      uploadButton = document.getElementsByClassName('uploadButton');
      Array.from(uploadButton).forEach(element => {
        element.style.pointerEvents  = "none";
      });
      currentInfo = document.getElementById(currentId+'info');
      currentInfo.style.display = "flex";
      let label = document.querySelector(`label[for="${currentId}"]`);
      label.innerHTML = "File Uploaded";
      label.style.pointerEvents  = "none";
      converting(event, currentId);

    });
  });
});
function panic() {
  [...document.getElementsByClassName('childMessage')].forEach(element => {
    element.textContent = "Something went wrong! Please contact the team on discord.";
    element.style.color = "red";
  });
}
let metaData = [];
async function converting ({ target: { files } }, uploadId) {
  slotArray.push(parseInt(uploadId.replace('upload', ''))-1);
  console.log(`%cID of file targetting: ${uploadId}`, "color:green;font-family:system-ui;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold");
  let previewVideo = document.getElementById(uploadId+'video');
  previewVideo.style.display = "inline-block";
  let debugMessage = document.getElementById('debugMessage');
  if (ffmpeg === null) {
    ffmpeg = new FFmpeg();
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
      debugMessage.innerHTML += `<br><br> > ${message}`;
      [...document.getElementsByClassName('childMessage')].forEach(element => {
        element.textContent = message.toString().split(/\s+/).slice(0, 4).join(' ')
      });
    })
    ffmpeg.on("progress", ({ progress }) => {
      [...document.getElementsByClassName('childProgress')].forEach(element => {
        element.value = Math.min(progress * 100, 100);
      });
    })
    await ffmpeg.load({
      coreURL: "/assets/core/package/dist/umd/ffmpeg-core.js",
    });
  }
  const { name } = files[0];
  console.log(name);
  const outputDirectory = uploadId + 'output_images';
  const outputPattern = `${outputDirectory}/output-%04d.png`;
  const fps = "10";
  await ffmpeg.createDir(outputDirectory);
  await ffmpeg.writeFile(name, await fetchFile(files[0]));
  let audioElement;
  try {
    await ffmpeg.exec([
      '-i', name,
      '-vn',
      '-c:a', 'libvorbis',
      '-q:a', '5',
      `${uploadId}audio.ogg`
    ]);
    const audioOutput = await ffmpeg.readFile(`${uploadId}audio.ogg`);
    audioElement = document.createElement('audio');
    audioElement.classList.add('devDebug');
    audioElement.controls = true;
    const audioblob = new Blob([audioOutput], { type: 'audio/ogg' });
    const audioUrl = URL.createObjectURL(audioblob);
    audioElement.src = audioUrl;
    audioSlotBlob.push({
      name: "Working TV RP/sounds/music/c" + uploadId.replace('upload', '') + ".ogg", 
      lastModified: new Date(), 
      input: audioblob
    })
    document.getElementById('imageContainer').appendChild(audioElement);
    audioElement.addEventListener('loadedmetadata', function () {
      console.log(`%cAudio Duration: ${audioElement.duration}`, "color:yellow;font-family:system-ui;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold");
    });
  } catch (error) {
    console.log(error)
  }
  
  await ffmpeg.exec([
    '-i', name,
    '-vf', 'scale=250:trunc(ow/a/2)*2,pad=250:250:(ow-iw)/2:(oh-ih)/2:black,hue=s=2',
    '-r', fps,
    '-c:a', 'copy',
    `${uploadId}scaledVideo.mp4`
  ]);
  const scaledVideo = await ffmpeg.readFile(uploadId+'scaledVideo.mp4');
  if (!scaledVideo) {
    panic();
    return;
  }
  document.getElementById(uploadId+'video').src = URL.createObjectURL(new Blob([scaledVideo.buffer], { type: 'video/mp4' }));
  await ffmpeg.exec([
    '-i', `${uploadId}scaledVideo.mp4`,
    '-framerate', fps,
    outputPattern
  ]);
  const directoryContents = await ffmpeg.listDir(outputDirectory);
  if (!directoryContents) {
    panic();
    return;
  }
  console.log(
    `%cFrame: ${directoryContents.length - 2}  |||  Grid: ${Math.ceil(Math.sqrt(directoryContents.length - 2))}`,
    "color:red;font-family:system-ui;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold"
  );
  let optimizedGrid = Math.ceil(Math.sqrt(directoryContents.length - 2));
  await ffmpeg.exec([
    '-framerate', fps,
    '-i', `concat:${outputPattern}`,
    '-vf', `tile=layout=${optimizedGrid}x${optimizedGrid}`,
    `${uploadId}output.png`
  ]);
  const finalImageData = await ffmpeg.readFile(uploadId+'output.png');
  if (!finalImageData) {
    panic();
    return;
  }
  const imgElement = document.createElement('img');
  const blob = new Blob([finalImageData], { type: 'image/png' });
  imgSlotBlob.push({
    name: "Working TV RP/textures/entity/c" + uploadId.replace('upload', '') + ".png", 
    lastModified: new Date(), 
    input: blob
  })
  const imgUrl = URL.createObjectURL(blob);
  imgElement.src = imgUrl;
  imgElement.id = uploadId + '-outputImg';
  document.getElementById('imageContainer').appendChild(imgElement);
  hasFile = true;
  Array.from(uploadButton).forEach(element => {
    element.style.pointerEvents = "auto";
  });
  [...document.getElementsByClassName('info')].forEach(element => {
    element.style.display = "none";
  });
  if (audioElement?.duration) {
    metaData.push({
      name: uploadId,
      duration: audioElement.duration,
      frame: directoryContents.length - 2,
      grid: optimizedGrid
    })
  } else {
    metaData.push({
      name: uploadId,
      duration: 12345,
      frame: directoryContents.length - 2,
      grid: optimizedGrid
    })
  }
  console.log(
    `%c ${JSON.stringify(metaData, null, 2)}`,
    "color:red;font-family:system-ui;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold"
  );
}
const tosCheckbox = document.getElementById('tosCheckbox');
const downloadButton = document.getElementById('genericButton');
tosCheckbox.addEventListener('change', () => {
if (tosCheckbox.checked) {
    downloadButton.removeAttribute('disabled');
    tosLabel.innerHTML = 'I agree to the <a href="/TOS" target="_blank">Term of service</a>';
} else {
    downloadButton.setAttribute('disabled', 'disabled');
    tosLabel.innerHTML = 'I <span style="text-decoration: underline;">disagree</span> to the <a href="/TOS" target="_blank">Term of service</a>';
}
});
function errorWarning(error) {
  document.getElementById('debugMessage').innerHTML += `<br><br><span style="color:red; font-size:2vw"> ${error} </span>`;

}
async function downloadTestZip() {
  let sortedArray = [
    ["upload1", "123456", "1", "1"],
    ["upload2", "234567", "1", "1"],
    ["upload3", "345678", "1", "1"],
    ["upload4", "456789", "1", "1"],
    ["upload5", "567890", "1", "1"]
  ];

  sortedArray.forEach(item => {
    let [name] = item;
    let metaDataEntry = metaData.find(entry => entry.name === name);
    if (metaDataEntry) {
      item[1] = metaDataEntry.duration;
      item[2] = metaDataEntry.frame;
      item[3] = metaDataEntry.grid;
    }
  });
  console.log(JSON.stringify(sortedArray, 2, null));
  let RPEList = [];
  let BPEJSONLIST = [];
  let BPAnim;
  try {
    let BPELIST = [
      'https://dl.dropboxusercontent.com/scl/fi/viz9oaz1j0tv7twjugt29/c1.behavior.json?rlkey=sc02qqd5oz109h3zd4maavpbf&dl=0',
      'https://dl.dropboxusercontent.com/scl/fi/wnz0gkg090yj78tbnpy0q/c2.behavior.json?rlkey=3xml0pvbyy6u5hrc2hxjzllcv&dl=0',
      'https://dl.dropboxusercontent.com/scl/fi/wtynknnhuloxq7ql8ixuj/c3.behavior.json?rlkey=tffrtv37vd4bh8zbs3m2xvpyn&dl=0',
      'https://dl.dropboxusercontent.com/scl/fi/ef3b8eywukdpcv5mlkf71/c4.behavior.json?rlkey=yn7vhqmsx6e27qnxnyu653m4m&dl=0',
      'https://dl.dropboxusercontent.com/scl/fi/nsar9jo6epa26380shx8l/c5.behavior.json?rlkey=3id3zinqmsqycwofr3g4n99hz&dl=0'
    ];
    console.log("LOADING BPELIST");
    updateFetch("LOADING BPELIST");
    for (let i = 0; i < 5; i++) {
      fetch(BPELIST[i])
      .then((response) => response.json())
      .then((jsonData) => {
        let gridIndex = parseInt(sortedArray[i][3]);
        let frameIndex = parseInt(sortedArray[i][2]);
        jsonData["minecraft:entity"]["description"]["properties"]["working_tv:channel_frame"]["range"] = [gridIndex, gridIndex+1];
        jsonData["minecraft:entity"]["description"]["properties"]["working_tv:channel_frame"]["default"] = `${gridIndex}`;
        jsonData["minecraft:entity"]["description"]["properties"]["working_tv:info_frame"]["range"] = [frameIndex, frameIndex+1];
        jsonData["minecraft:entity"]["description"]["properties"]["working_tv:info_frame"]["default"] = `${frameIndex}`;
        console.log(JSON.stringify(jsonData, 2, null));
        BPEJSONLIST.push(
          {
            name: `Working TV BP/entities/c${i+1}.behavior.json`, 
            lastModified: new Date(), 
            input: JSON.stringify(jsonData)
          }
        )
    });
    };
    console.log("LOADING RPEList");
    updateFetch("LOADING RPEList");
    fetch('https://dl.dropboxusercontent.com/scl/fi/gb4tlqk4q02dzo9yaa0n9/c1.entity.json?rlkey=3ypyddciocngjakzguvqgnai3&dl=0')
      .then((response) => response.json())
      .then((jsonData) => {
        for (let i = 0; i < 5; i++) {
          RPEList.push({
            name: `Working TV RP/entity/c${i+1}.entity.json`,
            lastModified: new Date(),
            input: JSON.stringify(jsonData).replace(/c1/g, `c${i+1}`)
          })
        }
    });
    console.log("LOADING BPAnim");
    updateFetch("LOADING BPAnim");
    fetch('https://dl.dropboxusercontent.com/scl/fi/k0bik4nbiwd4ffygy6zng/working_tv.animation.json?rlkey=e01twrh64reaj8zhzdpjdw7c4&dl=0')
      .then((response) => response.json())
      .then((jsonData) => {
        BPAnim = {
          name: "Working TV BP/animations/working_tv.animation.json", 
          lastModified: new Date(), 
          input: JSON.stringify(jsonData).replace('123456', sortedArray[0][1]).replace('234567', sortedArray[1][1]).replace('345678', sortedArray[2][1]).replace('456789', sortedArray[3][1]).replace('567890', sortedArray[4][1])
        };
    });
  } catch (error) {
    console.error(error);
    errorWarning(error);
    return;
  }
  //
  const RPM = { name: "Working TV RP/materials/entity.material", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/55dgbqa46su5rbwr70nw9/entity.material?rlkey=4fsl30e91gaulk1e4tyrio7g8&dl=0 ") };
  console.log("LOADING RPM");
  updateFetch("LOADING RPM");  
  const RPTET = { name: "Working TV RP/textures/terrain_texture.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/32krfwkoplempq1el9lwx/terrain_texture.json?rlkey=fjpwgc42s6rwz6bi77oigyn89&dl=0") };
  console.log("LOADING RPTET");
  updateFetch("LOADING RPTET");
  const RPBG = { name: "Working TV RP/models/blocks/tv.geo.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/37c6t9k0ovt184xmrsdbh/tv.geo.json?rlkey=h9ca8ao0ph0dq5jphmpw4tgrf&dl=0") };
  console.log("LOADING RPBG");
  updateFetch("LOADING RPBG");
  const RPEG = { name: "Working TV RP/models/entity/tv_content.geo.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/qktt0s95a32e5tj953rsj/tv_content.geo.json?rlkey=2me24mkdifvrow5r26avylr3q&dl=0") };
  console.log("LOADING RPEG");
  updateFetch("LOADING RPEG");
  const RPRC = { name: "Working TV RP/render_controllers/tv_content.render_controllers.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/u1j4gjzizvnj933nrzyjb/tv_content.render_controllers.json?rlkey=s6g03lv8k6im2qn7gi0l1kar3&dl=0") };
  console.log("LOADING RPRC");
  updateFetch("LOADING RPRC");
  const RPSD = { name: "Working TV RP/sounds/sound_definitions.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/yi8hty4xojy3rhvcfvb7u/sound_definitions.json?rlkey=y2in5s8m6hdqh4zmmci0qhx97&dl=0") };
  console.log("LOADING RPSD");
  updateFetch("LOADING RPSD");
  const RPTXT = { name: "Working TV RP/texts/en_US.lang", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/5ozefz7g7ymqu6xs8m3lb/en_US.lang?rlkey=2uz8yvq8aaa9a9moxc8s4lql4&dl=0") };
  console.log("LOADING RPTXT");
  updateFetch("LOADING RPTXT");
  const RPTB = { name: "Working TV RP/textures/blocks/tv.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/tkmmsingmunh25zxwz8ot/tv.png?rlkey=kx51gkjg48ggtjv1fl9mmhlvz&dl=0") };
  console.log("LOADING RPTB");
  updateFetch("LOADING RPTB");
  let RPTEList = [];
  try {
    let RPTELinkList = [
      'https://dl.dropboxusercontent.com/scl/fi/jxs3ta0s4nwy1g7f5c7nl/c1.png?rlkey=lvnh174rzjimalteh4w7jdgbe&dl=0',
      'https://dl.dropboxusercontent.com/scl/fi/7ues6tnfc5zlkwszh3p19/c2.png?rlkey=1woptg29d47uifqgzxelthvzy&dl=0',
      'https://dl.dropboxusercontent.com/scl/fi/p1obs8v4anp1r2gsanwcg/c3.png?rlkey=n2ytgcbke4iumth2y21robmac&dl=0',
      'https://dl.dropboxusercontent.com/scl/fi/orrh4vl9dipxhzvsvvsxq/c4.png?rlkey=b5v9v4pwt8txx6dtd0dus7ci0&dl=0',
      'https://dl.dropboxusercontent.com/scl/fi/x7jvzaf30cipvsmq9io6n/c5.png?rlkey=22wq1ezxq7b59fpjtaho9vp77&dl=0'
    ];
    console.log("LOADING RPTEO");
    updateFetch("LOADING RPTEO");
    for (let i = 0; i < 5; i++) {
      if (slotArray.includes(i)) {
        console.log("The img index of " + i + " is in the array! Skipping...");
        continue;
      } else {
        let RPTEO = {
          name: `Working TV RP/textures/entity/c${i+1}.png`, 
          lastModified: new Date(), 
          input: await fetch(RPTELinkList[i]) 
        }
        RPTEList.push(RPTEO)
      }
      
    }
  } catch (error) {
    console.error(error);
    errorWarning(error);
    return
  }
  const RBBJ = { name: "Working TV RP/blocks.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/4jh3qxh5ta920u1ntujh3/blocks.json?rlkey=i3h2e1v7wi5llv60ja2ihjjmu&dl=0") };
  console.log("LOADING RBBJ");
  updateFetch("LOADING RBBJ");
  const RPMF = { name: "Working TV RP/manifest.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/3q04qmkl0yeieuaiuy4lr/manifest.json?rlkey=ss0skvrljohfiwqfa38itabqt&dl=0") };
  console.log("LOADING RPMF");
  updateFetch("LOADING RPMF");
  const RPPIC = { name: "Working TV RP/pack_icon.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/k0qz6s22agyynbxdem782/pack_icon.png?rlkey=bxf1vjncs7t0nezenzxt5f3dx&dl=0") };
  console.log("LOADING RPPIC");
  updateFetch("LOADING RPPIC");
  ///////BP/////////
  const BPPIC = { name: "Working TV BP/pack_icon.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/k0qz6s22agyynbxdem782/pack_icon.png?rlkey=bxf1vjncs7t0nezenzxt5f3dx&dl=0") };
  console.log("LOADING BPPIC");
  updateFetch("LOADING BPPIC");
  const BPMF = { name: "Working TV BP/manifest.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/yvz0dntmd0stkkyj2ohxh/manifest.json?rlkey=0rx4q0d0p1y84arxju197o41l&dl=0") };
  console.log("LOADING BPMF");
  updateFetch("LOADING BPMF");
  const BPAC = { name: "Working TV BP/animation_controllers/tv_content.animation_controllers.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/b7r3jspnl1of0lk625hle/tv_content.animation_controllers.json?rlkey=zy7i5bw4e9g15zrb741w24txx&dl=0") };
  console.log("LOADING BPAC");
  updateFetch("LOADING BPAC");
  const BPB = { name: "Working TV BP/blocks/tv.block.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/y0ahd6q2lgl6i0h0kzv4i/tv.block.json?rlkey=vfda3i53oyafxwihdcxh1m7pb&dl=0") };
  console.log("LOADING BPB");
  updateFetch("LOADING BPB");
  const BPR = { name: "Working TV BP/recipes/working_tv.recipe.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/fl0kh1vz4vmsv82b42vo7/working_tv.recipe.json?rlkey=n072i26yy7tznxd06cgpuqfwa&dl=0") };
  console.log("LOADING BPR");
  updateFetch("LOADING BPR");
  updateFetch("FINISHED!");
  const blob = await downloadZip([...audioSlotBlob, ...imgSlotBlob, ...RPEList, ...BPEJSONLIST, ...RPTEList, BPR, RPTET, BPAnim, RPM, RPBG, RPEG, RPRC, RPSD, RPTXT, RPTB, RBBJ, RPMF, RPPIC, BPPIC, BPMF, BPAC, BPB]).blob()
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "Working TV Addon.mcaddon"
  link.click()
  link.remove()
  const compiler = document.getElementsByClassName("compiler");
  for (let i = 0; i < compiler.length; i++) {
      compiler[i].style.display = "none";
  }
}

downloadButton.addEventListener('click', () => {
  if (!tosCheckbox.checked) {
      alert('Please agree to the Terms of Service (TOS) before downloading.');
      return;
  }
  let userIP;
  $(document).ready(() => {
      $.getJSON('https://api.ipify.org?format=json', (data) => {
          userIP = data.ip;
      });
  });
  let link = document.URL;
  let currentURL = link.substring(link.lastIndexOf("/") + 1);
  const ws = new WebSocket('wss://blockstate.team');
  ws.onopen = () => {
      const data = {
          content: currentURL,
          ip: userIP,
          timestamp: Date.now(),
      };
      ws.send(JSON.stringify(data));
      ws.close();
  };
  if (hasFile) {
    downloadTestZip();
    const compiler = document.getElementsByClassName("compiler");
    for (let i = 0; i < compiler.length; i++) {
        compiler[i].style.display = "flex";
    }
    document.getElementById("loadingBar").style.display = "block";
    document.getElementById("loadingBarRun").style.width = "0";
  } else {
    window.location.href = 'https://dl.dropboxusercontent.com/scl/fi/e9vzm55bsdfgbgnkn2g3h/Working-TV-Addon.mcaddon?rlkey=937gyfsne5yejerm6nwhoxy8n&dl=0';
  }
});
document.getElementById('devMode').addEventListener('change', (e) => {
  let devComponents = document.getElementsByClassName('devDebug');
  if (e.target.checked) {
    [...devComponents].forEach(element => {
      element.style.display = "inline-block";
    })
  } else {
    [...devComponents].forEach(element => {
      element.style.display = "none";
    })
  }
});