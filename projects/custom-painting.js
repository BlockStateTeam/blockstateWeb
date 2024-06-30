import { downloadZip } from "https://cdn.jsdelivr.net/npm/client-zip/index.js"

async function buildAddon() {
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
            input: await expandImage(convertToHttps(totalData[i][1])),
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
    const RPTX = { name:"Head Decoration RP/textures/blocks/base.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/9ekew12vjbcvkpwhnx5jp/base.png?rlkey=qzfysk1nc1j2yckqbcindzmg2&dl=0") };
    console.log("LOADING RPTX");
    updateFetch("LOADING RPTX");
    const RPLJ = { name:"Head Decoration RP/texts/languages.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/mtew7mgt17uleu6izalt8/languages.json?rlkey=5wpapeaccwzl186ql3njm96nx&dl=0") };
    console.log("LOADING RPLJ");
    updateFetch("LOADING RPLJ");
    const RPM = { name:"Head Decoration RP/models/blocks/base.geo.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/8epmni11rjzvcyvovk5q0/base.geo.json?rlkey=dlf8le7xxhlez1xr2u2vx7zwn&dl=0") };
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
downloadButton.addEventListener('click', () => {
    if (!tosCheckbox.checked) {
        alert('Please agree to the Terms of Service (TOS) before downloading.');
        return;
    }
    buildAddon();
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