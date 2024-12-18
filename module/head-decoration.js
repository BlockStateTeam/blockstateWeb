import { downloadZip } from "https://cdn.jsdelivr.net/npm/client-zip/index.js"
function convertToHttps(url) {
    return url.replace(/^http:/, 'https:');
}
function trimDown(variable) {
    return variable.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}
window.onload = function () {
    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');
    menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hoverVideo');
    video.pause();
    video.addEventListener('mouseover', () => {
        video.play();
    });
    video.addEventListener('mouseout', () => {
        video.pause();
        video.currentTime = 0;
    });
});
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
/////////////////////////////////////////////////////////////////////////////////////////
let paginatedData;
let searchInput = document.getElementById("search");
let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function() {
    if (typeof paginatedData === "undefined") {
        document.getElementById("datawarning").style.display = "block";
        document.getElementById("datawarning").innerHTML  = "No category selected";
        console.log("No data to search.");
        return;
    } else {
        document.getElementById("datawarning").style.display = "none";
    }
    let searchQuery = searchInput.value.toLowerCase().trim();
    console.log(searchQuery);
    let filteredData = paginatedData.filter(function(item) {
        return item.name.toLowerCase().includes(searchQuery);
    });
    if (filteredData.length === 0) {
        document.getElementById("datawarning").style.display = "block";
        document.getElementById("datawarning").innerHTML  = "No results found";
        console.log("No data to search.");
        return;
    }
    renderTable(filteredData, 1, Math.min(filteredData.length, 50));
});
function decodeBase64(base64) {
    const decoded = atob(base64);
    return JSON.parse(decoded);
}

function renderTable(data, currentPage, itemsPerPage) {
    document.getElementById("headcontent").style.display = "block";
    let tableBody = document.getElementById("data");
    tableBody.innerHTML = "";

    let startIdx = (currentPage - 1) * itemsPerPage;
    let endIdx = startIdx + itemsPerPage;
    let paginatedData = data.slice(startIdx, endIdx);

    paginatedData.forEach(item => {
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        let htmlCell = document.createElement("td");
        let buttonCell = document.createElement("td");
        nameCell.textContent = item.name;
        let decodedData = decodeBase64(item.value);
        let imageUrl = decodedData.textures.SKIN.url;
        let img = new Image();
        img.src = imageUrl;
        let headClass;
        img.onload = function() {
            let imageHeight = img.height;
            headClass = "head" + imageHeight;
            let headHtml = `
                <div class="${headClass}">
                    <div class="faces">
                        <div class="inner back" style="background-image: url('${imageUrl}');"></div>
                        <div class="inner right" style="background-image: url('${imageUrl}');"></div>
                        <div class="inner top" style="background-image: url('${imageUrl}');"></div>
                        <div class="inner bottom" style="background-image: url('${imageUrl}');"></div>
                        <div class="inner front" style="background-image: url('${imageUrl}');"></div>
                        <div class="inner left" style="background-image: url('${imageUrl}');"></div>
                        <div class="outer back" style="background-image: url('${imageUrl}');"></div>
                        <div class="outer right" style="background-image: url('${imageUrl}');"></div>
                        <div class="outer top" style="background-image: url('${imageUrl}');"></div>
                        <div class="outer bottom" style="background-image: url('${imageUrl}');"></div>
                        <div class="outer front" style="background-image: url('${imageUrl}');"></div>
                        <div class="outer left" style="background-image: url('${imageUrl}');"></div>
                    </div>
                </div>`;
            htmlCell.innerHTML = headHtml;
            let btnHTML = `<button id="searchButton" class="headButton" onClick="handleButtonClick('${item.name}', '${imageUrl}', '${headClass}', true)">Add head</button>`;
            buttonCell.innerHTML = btnHTML;
            row.appendChild(nameCell);
            row.appendChild(htmlCell);
            row.appendChild(buttonCell);
            tableBody.appendChild(row);
        };
        img.onerror = function() {
            console.error('Error loading the image.');
        };
        
    });
}
function updatePagination(data, itemsPerPage) {
    let pageSelect = document.getElementById("page");
    pageSelect.innerHTML = "";
    let pageCount = Math.ceil(data.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        pageSelect.appendChild(option);
    }
    pageSelect.addEventListener("change", function() {
        let currentPage = parseInt(this.value, 10);
        renderTable(data, currentPage, itemsPerPage);
    });
}

document.getElementById("category").addEventListener("change", function() {
    let selectedCategory = this.value;
    if (selectedCategory) {
        let apiUrl = `/json/${selectedCategory}.json`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                let itemsPerPage = 20;
                paginatedData = data;
                updatePagination(data, itemsPerPage);
                renderTable(data, 1, itemsPerPage);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    } else {
        document.getElementById("headcontent").style.display = "none";
        document.getElementById("data").innerHTML = "";
        document.getElementById("page").innerHTML = "";
    }
});

const warningNameText = document.getElementById("namewarning");
const nameList = [];
function asyncNameCheck() {
    nameList.length = 0;
    const inputNameFields = document.querySelectorAll(".input-name-field");
    inputNameFields.forEach(function (input) {
        const inputValue = input.value.trim();
        if (inputValue) {
            nameList.push(inputValue);
        }
    });
}
const warningDuplicateNameText = document.getElementById("duplicateNameWarning");

function updateNameByUrl(url, newName) {
    const cookies = document.cookie.split('; ');
    let updatedCookies = [];
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === url) {
            const parts = cookieValue.split('-');
            if (parts.length > 1 && parts[0] !== newName) {
                parts[0] = newName;
                const updatedValue = parts.join('-');
                updatedCookies.push(`${url}=${updatedValue}; expires=${new Date("9999-01-01T00:00:00").toUTCString()}; path=/;`);
                document.cookie = `${url}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }
        }
    }
    document.cookie = updatedCookies.join('; ');
}
document.body.addEventListener("input", function (event) {
    let inputField = event.target.classList.contains("input-name-field");
    if (inputField) {
        const inputValue = event.target.value;
        const regex = /^[a-zA-Z0-9_ ()#@]*$/;
        if (!regex.test(inputValue)) {
            event.target.style.setProperty("color", "red", "important");
            warningNameText.style.display = "block";
            console.log("Validation Failed: " + inputValue);
        } else {
            event.target.style.setProperty("color", "", "important");
            warningNameText.style.display = "none";
            if (nameList.includes(inputValue)) {
                event.target.style.setProperty("color", "red", "important");
                warningDuplicateNameText.style.display = "block";
                console.log("Duplicate Name Found: " + inputValue);
            } else {
                event.target.style.setProperty("color", "", "important");
                warningDuplicateNameText.style.display = "none";
                console.log("Valid Name: " + inputValue);
                console.log(nameList);
                updateNameByUrl(`${event.target.closest('tr').cells[3].querySelector('div').textContent}`, inputValue);
                console.log(`updateNameByUrl(${event.target.closest('tr').cells[3].querySelector('div').textContent}, ${inputValue});`);
            }
        }
    };
    asyncNameCheck();
});
function updateFetch(fetchContent) {
    document.getElementById("loadingText").innerHTML = fetchContent;
    let loadingBarRun = document.getElementById("loadingBarRun");
    let currentWidth = loadingBarRun.style.width;
    let numericWidth = parseFloat(currentWidth);
    numericWidth += 8.333;
    loadingBarRun.style.width = numericWidth + '%';
}
function cropImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = url;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 16;
            const context = canvas.getContext('2d');
            context.fillStyle = 'transparent';
            context.fillRect(0, 0, 64, 16);
            context.drawImage(image, 0, 0, 64, 16, 0, 0, 64, 16);
            canvas.toBlob(blob => resolve(blob), 'image/png');
        };
        image.onerror = () => {
            reject(new Error('Failed to load the image.'));
        };
    });
  }
async function buildAddon(totalData) {
    let headListNumber = document.getElementById('myTable').rows.length;
    console.log(headListNumber);
    if (headListNumber <= 1) {
        window.location.href = 'https://dl.dropboxusercontent.com/scl/fi/a9h5fhxme55phkpdlxbwh/Head-Decoration-Addon.mcaddon?rlkey=lv65g9zt6emerxpxo0xqo5zzu&dl=0';
    } else {
        const originalJSON = {
            "num_mip_levels": 4,
            "padding": 8,
            "resource_pack_name": "head-decoration",
            "texture_name": "atlas.terrain",
            "texture_data": {
                "base": {
                    "textures": "textures/blocks/base"
                }
            }
        };
        const originalJSONString = `
        {
            "format_version": "1.20.30",
            "minecraft:block": {
                "description": {
                    "identifier": "head_system:base",
                    "traits": {
                    "minecraft:placement_position": {
                        "enabled_states": ["minecraft:block_face"]
                    }
                    },
                    "states": {
                    "head_system:rotation": {
                        "values": { "min": 0, "max": 15 }
                    }
                    }
                },
                "components": {
                    "minecraft:destructible_by_mining": {
                        "seconds_to_destroy": 1
                    },
                    "minecraft:collision_box": {
                    "origin": [-4, 0, -4],
                    "size": [8, 8, 8]
                    },
                    "minecraft:selection_box": {
                    "origin": [-4, 0, -4],
                    "size": [8, 8, 8]
                    },
                    "minecraft:geometry": {
                    "identifier": "geometry.base",
                    "bone_visibility": {
                        "up_0": "q.block_state('minecraft:block_face') == 'up' && !math.mod(q.block_state('head_system:rotation'), 4)",
                        "up_22_5": "q.block_state('minecraft:block_face') == 'up' && !math.mod(q.block_state('head_system:rotation') - 1, 4)",
                        "up_45": "q.block_state('minecraft:block_face') == 'up' && !math.mod(q.block_state('head_system:rotation') - 2, 4)",
                        "up_67_5": "q.block_state('minecraft:block_face') == 'up' && !math.mod(q.block_state('head_system:rotation') - 3, 4)",
                        "side": "q.block_state('minecraft:block_face') != 'up'"
                    }
                    },
                    "minecraft:material_instances": {
                    "*": {
                        "texture": "base",
                        "render_method": "alpha_test"
                    }
                    },
                    "minecraft:placement_filter": {
                    "conditions": [
                        {
                        "allowed_faces": ["up", "side"]
                        }
                    ]
                    },
                    "minecraft:on_player_placing": {
                    "condition": "q.block_face == 1",
                    "event": "head_system:set_rotation"
                    }
                },
                "events": {
                    "head_system:set_rotation": {
                    "set_block_state": {
                        "head_system:rotation": "t.positive_head_rot = q.head_y_rotation(0) + 360 * (q.head_y_rotation(0) != math.abs(q.head_y_rotation(0))); t.block_rotation = math.round(t.positive_head_rot / 22.5); return t.block_rotation != 16 ? t.block_rotation;"
                    }
                    }
                },
                "permutations": [
                    {
                    "condition": "q.block_state('head_system:rotation') >= 4 || q.block_state('minecraft:block_face') == 'east'",
                    "components": {
                        "minecraft:transformation": { "rotation": [0, -90, 0] }
                    }
                    },
                    {
                    "condition": "q.block_state('head_system:rotation') >= 8 || q.block_state('minecraft:block_face') == 'south'",
                    "components": {
                        "minecraft:transformation": { "rotation": [0, 180, 0] }
                    }
                    },
                    {
                    "condition": "q.block_state('head_system:rotation') >= 12 || q.block_state('minecraft:block_face') == 'west'",
                    "components": {
                        "minecraft:transformation": { "rotation": [0, 90, 0] }
                    }
                    },
                    {
                    "condition": "q.block_state('minecraft:block_face') != 'up'",
                    "components": {
                        "minecraft:collision_box": {
                        "origin": [-4, 5, 0],
                        "size": [8, 8, 8]
                        },
                        "minecraft:selection_box": {
                        "origin": [-4, 5, 0],
                        "size": [8, 8, 8]
                        }
                    }
                    }
                ]
            }
        }          
        `;
        const textureFile = { ...originalJSON };
        console.log("Data Length is " + totalData.length);
        let TXLIST = [];
        const BPBLOCK = [];
        let langFile = "tile.head_system:base.name=Base";
        let mcFunction = "give @s head_system:base"
        for (let i = 0; i < totalData.length; i++) {
            langFile += `\ntile.head_system:${trimDown(totalData[i][0])}.name=${totalData[i][0]}`
            mcFunction += `\ngive @s head_system:${trimDown(totalData[i][0])}`
            const individualTexture = {
                name: `Head Decoration RP/textures/blocks/custom/${trimDown(totalData[i][0])}.png`,
                lastModified: new Date(),
                input: await cropImage(convertToHttps(totalData[i][1])),
            };
            TXLIST.push(individualTexture);
            textureFile.texture_data[trimDown(totalData[i][0])] = {
                "textures": `textures/blocks/custom/${trimDown(totalData[i][0])}`
            };
            let modifiedJSONString = originalJSONString;
            modifiedJSONString = modifiedJSONString.replace(/"head_system:base"/g, `"head_system:${trimDown(totalData[i][0])}"`).replace(/"texture": "base"/g, `"texture": "${trimDown(totalData[i][0])}"`);
            const individualBPBLOCK = {
                name: `Head Decoration BP/blocks/${trimDown(totalData[i][0])}.json`,
                lastModified: new Date(),
                input: modifiedJSONString,
            };
            BPBLOCK.push(individualBPBLOCK);
        }
        console.log(TXLIST);
        console.log(BPBLOCK);
        console.log("LOADING IMPORTANT FILES");
        updateFetch("LOADING IMPORTANT FILES");
        const RPLANG = { name:"Head Decoration RP/texts/en_US.lang", lastModified: new Date(), input: langFile };
        console.log("LOADING RPLANG");
        updateFetch("LOADING RPLANG");
        const MCFUNCTION = { name:"Head Decoration BP/functions/head.mcfunction", lastModified: new Date(), input: mcFunction };
        console.log("LOADING MCFUNCTION");
        updateFetch("LOADING MCFUNCTION");
        console.log(JSON.stringify(textureFile));
        const TERTXT = { name:"Head Decoration RP/textures/terrain_texture.json", lastModified: new Date(), input: JSON.stringify(textureFile) };
        console.log(TERTXT);
        console.log("LOADING TERTXT");
        updateFetch("LOADING TERTXT");
        const BASE = { name:"Head Decoration BP/blocks/base.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/7hxoot632ow5sghfp1shj/base.json?rlkey=1bkcpyahrq0nlngwk4061386f&dl=0") };
        console.log("LOADING BASE");
        console.log(BASE);
        updateFetch("LOADING BASE");
        const BPMF = { name:"Head Decoration BP/manifest.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/9pf26dz0y6e86p2lut473/manifest.json?rlkey=xrsdsur9zt5ngn24ukh08ax7t&dl=0") };
        console.log("LOADING BPMF");
        updateFetch("LOADING BPMF");
        const BPICO = { name:"Head Decoration BP/pack_icon.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/zp33h1w7jd76vv2ka8m7q/pack_icon.png?rlkey=novn54ej872rncd603gggik5q&dl=0") };
        console.log("LOADING BPICO");
        updateFetch("LOADING BPICO");
        /////////// RP & BP seperation //////////////
        const RPICO = { name:"Head Decoration RP/pack_icon.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/zp33h1w7jd76vv2ka8m7q/pack_icon.png?rlkey=novn54ej872rncd603gggik5q&dl=0") };
        console.log("LOADING RPICO");
        updateFetch("LOADING RPICO");
        const RPMF = { name:"Head Decoration RP/manifest.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/bti6c2dqlxalgy3vc4rxs/manifest.json?rlkey=vl1d1s8i1fua1lbh7att9upir&dl=0") };
        console.log("LOADING RPMF");
        updateFetch("LOADING RPMF");
        const RPTX = { name:"Head Decoration RP/textures/blocks/base.png", lastModified: new Date(), input: await fetch("./base.png") };
        console.log("LOADING RPTX");
        updateFetch("LOADING RPTX");
        const RPLJ = { name:"Head Decoration RP/texts/languages.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/mtew7mgt17uleu6izalt8/languages.json?rlkey=5wpapeaccwzl186ql3njm96nx&dl=0") };
        console.log("LOADING RPLJ");
        updateFetch("LOADING RPLJ");
        const RPM = { name:"Head Decoration RP/models/blocks/base.geo.json", lastModified: new Date(), input: await fetch("./base.geo.json") };
        console.log("LOADING RPM");
        updateFetch("LOADING RPM");
        updateFetch("FINISHED!");
        console.log("THIS IS THE END OF THE LINE");
        const blob = await downloadZip([RPLANG, MCFUNCTION, ...TXLIST, TERTXT, ...BPBLOCK, BASE, BPMF, BPICO, RPICO, RPMF, RPTX, RPLJ, RPM]).blob()
        console.log("THING IS FINE HERE");
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = "Head Decoration Addon.mcaddon"
        link.click()
        link.remove()
        const compiler = document.getElementsByClassName("compiler");
        for (let i = 0; i < compiler.length; i++) {
            compiler[i].style.display = "none";
        }
    }
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
const errorWarningCompile = document.getElementById("errorWarningCompile");
let errorFound = false;
downloadButton.addEventListener('click', () => {
    if (!tosCheckbox.checked) {
        alert('Please agree to the Terms of Service (TOS) before downloading.');
        return;
    }
    let dataTable = document.getElementById("myTable");
    let uniqueInputValues = [];
    let dataArray = [];
    for (let i = 1; i < dataTable.rows.length; i++) {
        let row = dataTable.rows[i];
        let inputValue = row.querySelector('input.input-name-field').value;
        let rowData = [inputValue, row.cells[3].textContent];
        if (uniqueInputValues.includes(inputValue)) {
            console.log(`Duplicate value found: ${inputValue}`);
            errorFound = true;
            errorWarningCompile.style.display = "block";
            errorWarningCompile.innerHTML += `<br>${inputValue}`;
        } else {
            errorWarningCompile.style.display = "none";
            uniqueInputValues.push(inputValue);
            dataArray.push(rowData);
            errorFound = false;
        }
    }
    if (errorFound) {return;}
    const compiler = document.getElementsByClassName("compiler");
    for (let i = 0; i < compiler.length; i++) {
        compiler[i].style.display = "flex";
    }
    const loadingBarRun = document.getElementById("loadingBar");
    loadingBarRun.style.display = "block";
    console.log(dataArray);
    buildAddon(dataArray);
    fetch('https://api.ipify.org/')
    .then(r => r.ok ? r.text() : Promise.reject('Network response was not ok'))
    .catch(e => ('undefined', console.error('Error:', e)))
    .then(data => {
        let formData = new FormData();
        formData.append("entry.606279263", data);
        formData.append("entry.1080269179", document.URL.substring(document.URL.lastIndexOf("/") + 1));
        formData.append("entry.826374623", Date.now());

        return fetch("https://docs.google.com/forms/d/e/1FAIpQLSfiIG0fLLNucnSzChPm9F2gWqkk9GOhUHGHUlYT-k3h-FBRFA/formResponse", { method: "POST", body: formData, mode: "no-cors" });
    })
    .then(() => console.log("Form submitted successfully"))
    .catch(error => console.error("Error:", error));
});
