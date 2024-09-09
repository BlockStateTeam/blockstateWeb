import { downloadZip } from "https://cdn.jsdelivr.net/npm/client-zip/index.js";
let shouldCustomize = false;
let musicList = {
    disc0: [undefined, 0],
    disc1: [undefined, 0],
    disc2: [undefined, 0],
    disc3: [undefined, 0],
    disc4: [undefined, 0]
};
for (let i = 0; i < 5; i++) {
    document.getElementById(`upload${i + 1}`).addEventListener('change', () => {
        shouldCustomize = true;
        const file = document.getElementById(`upload${i + 1}`).files[0];
        const audio = document.getElementById(`upload${i + 1}audio`);
        audio.src = URL.createObjectURL(file);
        audio.addEventListener("loadedmetadata", () => {
            musicList['disc' + i][0] = file;
            musicList['disc' + i][1] = Math.ceil(audio.duration);
            console.log(`upload${i + 1}: ${musicList['disc' + i][1]}`);
        });

    });
}
function updateFetch(fetchContent) {
    document.getElementById("loadingText").innerHTML = fetchContent;
    let loadingBarRun = document.getElementById("loadingBarRun");
    let currentWidth = loadingBarRun.style.width;
    let numericWidth = parseFloat(currentWidth);
    numericWidth += 1.36985;
    loadingBarRun.style.width = numericWidth + '%';
}
window.downloadTestZip = async function downloadTestZip() {
    if (!shouldCustomize) {
        window.location.href = 'https://dl.dropboxusercontent.com/s/9c5zrbpikx3vxea/Music%20Box%20RP.mcaddon?dl=0';
        return;
    }
    [...document.getElementsByClassName("compiler")].forEach((element) => {
        element.style.display = "flex";
    });
    let zipItems = [];
    for (let i = 0; i < 5; i++) {
        let file = musicList['disc' + i][0];
        if (file !== undefined) {
            const zipItem = {
                name: `Music Box RP/sounds/music/i${i + 1}.ogg`,
                lastModified: new Date(),
                input: file,
            };
            zipItems.push(zipItem);
        };
    }
    let BPAnim;
    fetch('https://dl.dropboxusercontent.com/scl/fi/wdc6nbmskwjpl4e3buzhg/music_box.animation.json?rlkey=92erzwjew495pk5aipwb7lq3c&st=1fvxblve&dl=0')
    .then((response) => response.json())
    .then((jsonData) => {
        BPAnim = JSON.stringify(jsonData).replace(0.11, `${musicList.disc0[1] + 0.05}`).replace(0.12, musicList.disc0[1]).replace(0.13, `${musicList.disc1[1] + 0.05}`).replace(0.14, musicList.disc1[1]).replace(0.15, `${musicList.disc2[1] + 0.05}`).replace(0.16, musicList.disc2[1]).replace(0.17, `${musicList.disc3[1] + 0.05}`).replace(0.18, musicList.disc3[1]).replace(0.19, `${musicList.disc4[1] + 0.05}`).replace(0.21, musicList.disc4[1]);
    })
    .catch((error) => console.error('Error fetching and updating JSON data:', error));
    updateFetch("LOADING BPAnim");
    const RPAC = { name: "Music Box RP/animation_controllers/music_box.animation_controllers.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/lczrl456q46zxkg4jc1bx/music_box.animation_controllers.json?rlkey=mblyw7kndkw6h1381tn7jyb95&dl") };
    console.log("LOADING RPAC");
    updateFetch("LOADING RPAC");
    const RPAnim = { name: "Music Box RP/animations/music_box.animation.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/wdc6nbmskwjpl4e3buzhg/music_box.animation.json?rlkey=92erzwjew495pk5aipwb7lq3c&dl") };
    console.log("LOADING RPAnim");
    updateFetch("LOADING RPAnim");
    const RPE1 = { name: "Music Box RP/entity/music_box.entity.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/451lpqw010db85b5vp0ar/music_box.entity.json?rlkey=dl8ovnnc08lk2ulh4lideanlg&dl") };
    console.log("LOADING RPE1");
    updateFetch("LOADING RPE1");
    const RPE2 = { name: "Music Box RP/entity/music_box_broken.entity.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/0utz30tsqejtbgfo7j5kh/music_box_broken.entity.json?rlkey=hnhxwide5yqd52wtc0afhyr8t&dl") };
    console.log("LOADING RPE2");
    updateFetch("LOADING RPE2");
    const RPE3 = { name: "Music Box RP/entity/music_box_spilled.entity.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/trufd98hhq7ec09r5guhb/music_box_spilled.entity.json?rlkey=t9gngzgvzlyycbflr6yqfdp1b&dl") };
    console.log("LOADING RPE3");
    updateFetch("LOADING RPE3");
    const RPI1 = { name: "Music Box RP/items/i1.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/tkbnjgsu7ktxw31btyrvu/i1.item.json?rlkey=srbl3bypt99kd6wytqpq0xpeo&dl") };
    console.log("LOADING RPI1");
    updateFetch("LOADING RPI1");
    const RPI2 = { name: "Music Box RP/items/i2.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/bh576g6bpvv8spi0jl7jr/i2.item.json?rlkey=kxra7syn9mst29g9bsojv1ido&dl") };
    console.log("LOADING RPI2");
    updateFetch("LOADING RPI2");
    const RPI3 = { name: "Music Box RP/items/i3.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/md1q0waxye6s1eia32sny/i3.item.json?rlkey=wgdkucbmr9gg5gqyc5easws4t&dl") };
    console.log("LOADING RPI3");
    updateFetch("LOADING RPI3");
    const RPI4 = { name: "Music Box RP/items/i4.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/g840tvy0lpu34iwr2ng8b/i4.item.json?rlkey=l81yzwa27oieb63rizn94wgdk&dl") };
    console.log("LOADING RPI4");
    updateFetch("LOADING RPI4");
    const RPI5 = { name: "Music Box RP/items/i5.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/5jquy994h9wn20t59yslw/i5.item.json?rlkey=g9a6wha67fywmlqewh5r6ce3e&dl") };
    console.log("LOADING RPI5");
    updateFetch("LOADING RPI5");
    const RPI6 = { name: "Music Box RP/items/gilded.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/s2zdfvkuzb2iv1ejk2a21/gilded.item.json?rlkey=kummklges5g7wt0ok6ds3utl5&dl") };
    console.log("LOADING RPI6");
    updateFetch("LOADING RPI6");
    const RPI7 = { name: "Music Box RP/items/raider.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/sw0uk37fkb89xbznzu6dp/raider.item.json?rlkey=tqb4tpqgzvyzobej3d7awnbzu&dl") };
    console.log("LOADING RPI7");
    updateFetch("LOADING RPI7");
    const RPI8 = { name: "Music Box RP/items/shrieker.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/0o9ckadx25tasteb1qsum/shrieker.item.json?rlkey=vd04mwdnh3qa36engpuw97ftb&dl") };
    console.log("LOADING RPI8");
    updateFetch("LOADING RPI8");
    const RPI9 = { name: "Music Box RP/items/warden.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/v9gyx4xpv8wg7drwcd7um/warden.item.json?rlkey=xjz9jvpq87cu41fsa2qqk3iqt&dl") };
    console.log("LOADING RPI9");
    updateFetch("LOADING RPI9");
    const RPI10 = { name: "Music Box RP/items/wither.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/j91q3qc77fbd7gskdcole/wither.item.json?rlkey=bs90hcwyv0vi1pho3sbcumnmt&dl") };
    console.log("LOADING RPI10");
    updateFetch("LOADING RPI10");
    const RPMB = { name: "Music Box RP/models/blocks/dummy_block.geo.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/c6dcvmi51t2xl6lsh3v9p/dummy_block.geo.json?rlkey=283ds6p735oihfelkdfzqeudr&dl=0") };
    console.log("LOADING RPMB");
    updateFetch("LOADING RPMB");
    const RPME = { name: "Music Box RP/models/entity/music_box.geo.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/sa41j6gaacyossznx8c9h/music_box.geo.json?rlkey=twy7x1c5fbmkkd3lpbqs2jc9n&dl=0") };
    console.log("LOADING RPME");
    updateFetch("LOADING RPME");
    const RPP = { name: "Music Box RP/particles/note.particle.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/26pfadgk42x3g5vcu9wzu/note.particle.json?rlkey=d3od81y5qlg6wrryptjtnkn1w&dl") };
    console.log("LOADING RPP");
    updateFetch("LOADING RPP");
    const RPSD = { name: "Music Box RP/sounds/sound_definitions.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/2qdmb50wojeyshxs4z3mo/sound_definitions.json?rlkey=482swfloch8il84z0nt566h8i&dl") };
    console.log("LOADING RPSD");
    updateFetch("LOADING RPSD");
    const RPSF1 = { name: "Music Box RP/sounds/music/gilded.ogg", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/rnu42uvzhhuxow8wadar0/gilded.ogg?rlkey=7dqhglf3gownekq0i7tca69he&dl") };
    console.log("LOADING RPSF1");
    updateFetch("LOADING RPSF1");
    const RPSF2 = { name: "Music Box RP/sounds/music/raider.ogg", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/niy5hqwnehcg3sq5qehvh/raider.ogg?rlkey=moi92b2qqw64xru4b90lqzy76&dl") };
    console.log("LOADING RPSF2");
    updateFetch("LOADING RPSF2");
    const RPSF3 = { name: "Music Box RP/sounds/music/shrieker.ogg", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/849ry4nyep61jx0wuokgj/shrieker.ogg?rlkey=iwsu4xwkzzwaajckff5hl1nx0&dl") };
    console.log("LOADING RPSF3");
    updateFetch("LOADING RPSF3");
    const RPSF4 = { name: "Music Box RP/sounds/music/wither.ogg", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/3nddu6t1sg6ido1416mor/wither.ogg?rlkey=03kr622cmv6q0lf2z7tmixd4f&dl") };
    console.log("LOADING RPSF4");
    updateFetch("LOADING RPSF4");
    const RPSF5 = { name: "Music Box RP/sounds/music/warden.ogg", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/c9nt1sjibqadb2vwdahbh/warden.ogg?rlkey=xlpq1p6e4ba9ybqc6uqir5iwt&dl") };
    console.log("LOADING RPSF5");
    updateFetch("LOADING RPSF5");
    const RPT = { name: "Music Box RP/texts/en_US.lang", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/wnaaljz0rix3iuoyk42nf/en_US.lang?rlkey=8guno8x6xv208oxgsj2w93pvv&dl") };
    console.log("LOADING RPT");
    updateFetch("LOADING RPT");
    const RPSE = { name: "Music Box RP/textures/items/music_box_spawn_egg.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/sbjeheq26cg84wmtdzx5p/music_box_spawn_egg.png?rlkey=tih257589bibae4y279ndx2to&dl=0") };
    console.log("LOADING RPSE");
    updateFetch("LOADING RPSE");
    const RPTB = { name: "Music Box RP/textures/blocks/dummy_block.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/kmvillv1lc5jlj6tlye3f/dummy_block.png?rlkey=x0110g1ow482y9kpflrhy6gos&dl") };
    console.log("LOADING RPTB");
    updateFetch("LOADING RPTB");
    const RPTE = { name: "Music Box RP/textures/entity/music_box.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/c41vcza0fyy3odnak1j7d/music_box.png?rlkey=h671sgcmq08p1gyuqjaqtrzsy&dl") };
    console.log("LOADING RPTE");
    updateFetch("LOADING RPTE");
    const RPTI1 = { name: "Music Box RP/textures/items/i1.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/fwblxvxo4qzsw7npiofym/i1.png?rlkey=xgzlnn9ljgj1ll4ttpo4h8dzu&dl") };
    console.log("LOADING RPTI1");
    updateFetch("LOADING RPTI1");
    const RPTI2 = { name: "Music Box RP/textures/items/i2.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/bx705hoi1rzukkp38e41e/i2.png?rlkey=wss2qw78xhgfhwpcw4crz9ztx&dl") };
    console.log("LOADING RPTI2");
    updateFetch("LOADING RPTI2");
    const RPTI3 = { name: "Music Box RP/textures/items/i3.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/7iy46jhyy63rz9p5pz8i5/i3.png?rlkey=spx1ql4zakb8u1m1l728vw92q&dl") };
    console.log("LOADING RPTI3");
    updateFetch("LOADING RPTI3");
    const RPTI4 = { name: "Music Box RP/textures/items/i4.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/up4g3dilcaimb9u9ntki6/i4.png?rlkey=q7fnzni1xe52n0liz8ybjvihf&dl") };
    console.log("LOADING RPTI4");
    updateFetch("LOADING RPTI4");
    const RPTI5 = { name: "Music Box RP/textures/items/i5.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/tuu92dyo912w1ksdmq9px/i5.png?rlkey=ijjn4pz5ewkby0ljyc3jtfz82&dl") };
    console.log("LOADING RPTI5");
    updateFetch("LOADING RPTI5");
    const RPTI6 = { name: "Music Box RP/textures/items/gilded.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/1vgrcqzt1wc7sdw9z2ldj/gilded.png?rlkey=24e53xeolmmlakmujgnx7e9n1&dl") };
    console.log("LOADING RPTI6");
    updateFetch("LOADING RPTI6");
    const RPTI7 = { name: "Music Box RP/textures/items/raider.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/kasftmpp3ajzrf7frlpf8/raider.png?rlkey=hvflsxqdf86z1x8o43yco7hxj&dl") };
    console.log("LOADING RPTI7");
    updateFetch("LOADING RPTI7");
    const RPTI8 = { name: "Music Box RP/textures/items/shrieker.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/kasftmpp3ajzrf7frlpf8/raider.png?rlkey=hvflsxqdf86z1x8o43yco7hxj&dl") };
    console.log("LOADING RPTI8");
    updateFetch("LOADING RPTI8");
    const RPTI9 = { name: "Music Box RP/textures/items/warden.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/b7lgwhepuqd537yjcfd3x/warden.png?rlkey=6su0kbs4pfj457s6aiaym3kgq&dl") };
    console.log("LOADING RPTI9");
    updateFetch("LOADING RPTI9");
    const RPTI10 = { name: "Music Box RP/textures/items/wither.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/wx3szgrzyssf6gn0rxu6g/wither.png?rlkey=1bf5p3i10mditdht14w2pvo0k&dl") };
    console.log("LOADING RPTI10");
    updateFetch("LOADING RPTI10");
    const RPIT = { name: "Music Box RP/textures/item_texture.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/eyn7q7r9jfngnrb78a6at/item_texture.json?rlkey=ztsxquef9rb228h1cf99qccuh&dl") };
    console.log("LOADING RPIT");
    updateFetch("LOADING RPIT");
    const RPTT = { name: "Music Box RP/textures/terrain_texture.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/bp40a6uqej8ds1lv3zar7/terrain_texture.json?rlkey=wl6536lh7dakg951wc1glfqyv&dl") };
    console.log("LOADING RPTT");
    updateFetch("LOADING RPTT");
    const RPBJ = { name: "Music Box RP/blocks.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/jy444mq9krju3itfqnwog/blocks.json?rlkey=s4jgybaaw0lbfukoxsqke3fmc&dl") };
    console.log("LOADING RPBJ");
    updateFetch("LOADING RPBJ");
    const RPMNF = { name: "Music Box RP/manifest.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/w980u5x008kfnviqggyw5/manifest.json?rlkey=1ut72c30zbz2lzn2fear9vv3z&dl") };
    console.log("LOADING RPMNF");
    updateFetch("LOADING RPMNF");
    const RPPI = { name: "Music Box RP/pack_icon.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/x28cd8apyvgu6ou3defqw/pack_icon.png?rlkey=p6hn6pvitipv9kytf6d1v2nxt&dl") };
    console.log("LOADING RPPI");
    updateFetch("LOADING RPPI");
    //BP & RP SEPERATION LINE
    const BPPI = { name: "Music Box BP/pack_icon.png", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/4si7pqk54jrkk5ehipme4/pack_icon.png?rlkey=pmz6qsu3qivdfwtszc7xzntp6&dl") };
    console.log("LOADING BPPI");
    updateFetch("LOADING BPPI");
    const BPSCRIPT = { name: "Music Box BP/scripts/main.js", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/su1is6byf847my0vw3494/main.js?rlkey=f4gbvj5kyyl0sdnvw816h3lnx&st=346d5o9p&dl=0") };
    console.log("LOADING BPSCRIPT");
    updateFetch("LOADING BPSCRIPT");
    const BPAC = { name: "Music Box BP/animation_controllers/music_box.animation_controllers.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/mwectpyr1r5xe349wzg81/music_box.animation_controllers.json?rlkey=9p3tf0h0y6pjz62npe8vihvdp&dl") };
    console.log("LOADING BPAC");
    updateFetch("LOADING BPAC");
    const BPAnimInject = { name: "Music Box BP/animations/music_box.animation.json", lastModified: new Date(), input: BPAnim };
    console.log("LOADING BPAnimInject");
    updateFetch("LOADING BPAnimInject");
    const BPB = { name: "Music Box BP/blocks/dummy_block.block.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/bhltgjtyla7bd7te42pk5/dummy_block.block.json?rlkey=7aub7t95rogwvvi717ghe94w4&dl") };
    console.log("LOADING BPB");
    updateFetch("LOADING BPB");
    const BPE1 = { name: "Music Box BP/entities/music_box.behavior.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/ac9d2x18yigvi4ms4b3xl/music_box.behavior.json?rlkey=919ze0hyapdalcfd4lova96mt&dl") };
    console.log("LOADING BPE1");
    updateFetch("LOADING BPE1");
    const BPE2 = { name: "Music Box BP/entities/music_box_broken.behavior.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/uuh7t05k3eeyxz7aoez6x/music_box_broken.behavior.json?rlkey=c3l6nhj79wqexblxd20yn6odx&dl") };
    console.log("LOADING BPE2");
    updateFetch("LOADING BPE2");
    const BPE3 = { name: "Music Box BP/entities/music_box_spilled.behavior.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/yqv5frexwwe7wtl1vxzaz/music_box_spilled.behavior.json?rlkey=09oex0yf1i01b28zsdgyl5doq&dl") };
    console.log("LOADING BPE3");
    updateFetch("LOADING BPE3");
    const BPI1 = { name: "Music Box BP/items/i1.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/nyh4d41g4u3hws3pqbyo8/i1.item.json?rlkey=crf8ii5b99qaht1dhwhsdbdc4&dl") };
    console.log("LOADING BPI1");
    updateFetch("LOADING BPI1");
    const BPI2 = { name: "Music Box BP/items/i2.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/qxhwgk8aj5rpwvlom7gd9/i2.item.json?rlkey=w3pa8d5nvyxf2r92fiz8zgc6t&dl") };
    console.log("LOADING BPI2");
    updateFetch("LOADING BPI2");
    const BPI3 = { name: "Music Box BP/items/i3.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/wmp8iu761xkfecxz06a8e/i3.item.json?rlkey=pitp2i16p01p2o6kdhfh8r1kr&dl") };
    console.log("LOADING BPI3");
    updateFetch("LOADING BPI3");
    const BPI4 = { name: "Music Box BP/items/i4.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/t3hzahznbfpawg1x6exq4/i4.item.json?rlkey=awy7m3r6is8pxr6t4esyuc47f&dl") };
    console.log("LOADING BPI4");
    updateFetch("LOADING BPI4");
    const BPI5 = { name: "Music Box BP/items/i5.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/rayzvf29cz5pt9c9r97in/i5.item.json?rlkey=5og8nuoqke1t2knkd82aplzdr&dl") };
    console.log("LOADING BPI5");
    updateFetch("LOADING BPI5");
    const BPI6 = { name: "Music Box BP/items/gilded.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/j5rdg4jmor9c0wup7gjud/gilded.item.json?rlkey=iec8cegcl4mhwlr3ssro06e6l&dl") };
    console.log("LOADING BPI6");
    updateFetch("LOADING BPI6");
    const BPI7 = { name: "Music Box BP/items/raider.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/p5g325i4xq18xt2ap0vrd/raider.item.json?rlkey=kmpwuj8c52nlozf9xyg1xcnav&dl") };
    console.log("LOADING BPI7");
    updateFetch("LOADING BPI7");
    const BPI8 = { name: "Music Box BP/items/shrieker.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/1p3ka4t0xad61vd1bwmhl/shrieker.item.json?rlkey=9hjt3h7yb20xkr19w5nakva9h&dl") };
    console.log("LOADING BPI8");
    updateFetch("LOADING BPI8");
    const BPI9 = { name: "Music Box BP/items/warden.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/jyohqnwz3hdige4o1t1c4/warden.item.json?rlkey=slhzzungvf53yghwyzze02eo7&dl") };
    console.log("LOADING BPI9");
    updateFetch("LOADING BPI9");
    const BPI10 = { name: "Music Box BP/items/wither.item.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/iwi4beb6ph4wf8vzlm4mx/wither.item.json?rlkey=r4jmtqhiqa9zizjubebv9fvt4&dl") };
    console.log("LOADING BPI10");
    updateFetch("LOADING BPI10");
    const BPLT = { name: "Music Box BP/loot_tables/music_box.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/d0n7yrkqlddxdodjigrx3/music_box.json?rlkey=bxchwb9kwqg6tsfxfbfkke1mp&dl") };
    console.log("LOADING BPLT");
    updateFetch("LOADING BPLT");
    const BPR1 = { name: "Music Box BP/recipes/i1_disc.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/wawpepr8xncfeovh7ehyv/i1_disc.json?rlkey=6pqjcqyuny2b3t2huqhc2doqe&dl") };
    console.log("LOADING BPR1");
    updateFetch("LOADING BPR1");
    const BPR2 = { name: "Music Box BP/recipes/i2_disc.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/6rrq6lj7eltr5pyez1cah/i2_disc.json?rlkey=qvzhlo15y0wokylb7zapcm723&dl") };
    console.log("LOADING BPR2");
    updateFetch("LOADING BPR2");
    const BPR3 = { name: "Music Box BP/recipes/i3_disc.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/470m1oxtzycus5f3ys3ol/i3_disc.json?rlkey=49eih8sitqqfttcd2e6sxzdey&dl") };
    console.log("LOADING BPR3");
    updateFetch("LOADING BPR3");
    const BPR4 = { name: "Music Box BP/recipes/i4_disc.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/9fwv82pg9jkokpkktdqez/i4_disc.json?rlkey=l1kp7f9tq6x97qlvhzamxd74n&dl") };
    console.log("LOADING BPR4");
    updateFetch("LOADING BPR4");
    const BPR5 = { name: "Music Box BP/recipes/i5_disc.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/6qswjz3ior662ymb7p9no/i5_disc.json?rlkey=grcwdaccb6lx7da7njnmnuqug&dl") };
    console.log("LOADING BPR5");
    updateFetch("LOADING BPR5");
    const BPR6 = { name: "Music Box BP/recipes/gilded_disc.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/uovxcuks8p6jz6n7jv66s/gilded_disc.json?rlkey=r8i8yvigay87o0irffiklvat5&dl") };
    console.log("LOADING BPR6");
    updateFetch("LOADING BPR6");
    const BPR7 = { name: "Music Box BP/recipes/raider_disc.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/ys7vuyy3r7yqcyr67dqxv/raider_disc.json?rlkey=3jc376ejma12n6jygq5nfa9e1&dl") };
    console.log("LOADING BPR7");
    updateFetch("LOADING BPR7");
    const BPR8 = { name: "Music Box BP/recipes/shrieker_disc.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/64p28yhmjwwnxa3rs7izg/shrieker_disc.json?rlkey=vvcgwg7ma7udz7vr198lp8e14&dl") };
    console.log("LOADING BPR8");
    updateFetch("LOADING BPR8");
    const BPR9 = { name: "Music Box BP/recipes/warden_disc.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/9lavpfhl2vrlav5pxv1s3/warden_disc.json?rlkey=n9fa8f93y3avjkjtgfr3c3d99&dl") };
    console.log("LOADING BPR9");
    updateFetch("LOADING BPR9");
    const BPR10 = { name: "Music Box BP/recipes/wither_disc.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/t2cshd6wptlkcgyujmf3l/wither_disc.json?rlkey=g0r4zvkni9vanyz1v350aohli&dl") };
    console.log("LOADING BPR10");
    updateFetch("LOADING BPR10");
    const BPR11 = { name: "Music Box BP/recipes/music_box.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/9wjf7ejuzgd20njlqd08i/music_box.json?rlkey=hv0uiil88olfolkzetkrd2vuy&dl=0") };
    console.log("LOADING BPR11");
    updateFetch("LOADING BPR11");
    const BPTD = { name: "Music Box BP/trading/economy_trades/wandering_trader_trades.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/mv6tacinlgowym2w4390z/wandering_trader_trades.json?rlkey=89qaz3dtxoa3gxn7nvoss1ah5&dl") };
    console.log("LOADING BPTD");
    updateFetch("LOADING BPTD");
    const BPMF = { name: "Music Box BP/manifest.json", lastModified: new Date(), input: await fetch("https://dl.dropboxusercontent.com/scl/fi/7w0t3sn5xnwi0e6e5uwes/manifest.json?rlkey=6qfnwlk2of10xsuabn9vissk0&dl") };
    console.log("LOADING BPMF");
    updateFetch("LOADING BPMF");
    updateFetch("FINISHED!");
    const blob = await downloadZip([...zipItems, BPSCRIPT, RPSE, BPTD, BPMF, BPI10, BPLT, BPR1, BPR2, BPR3, BPR4, BPR5, BPR6, BPR7, BPR8, BPR9, BPR10, BPR11, BPPI, BPAC, BPAnimInject, BPB, BPE1, BPE2, BPE3, BPI1, BPI2, BPI3, BPI4, BPI5, BPI6, BPI7, BPI8, BPI9, RPIT, RPTT, RPBJ, RPMNF, RPPI, RPTI1, RPTI2, RPTI3, RPTI4, RPTI5, RPTI6, RPTI7, RPTI8, RPTI9, RPTI10, RPSF1, RPSF2, RPSF3, RPSF4, RPSF5, RPT, RPTB, RPTE, RPAC, RPAnim, RPE1, RPE2, RPE3, RPI1, RPI2, RPI3, RPI4, RPI5, RPI6, RPI7, RPI8, RPI9, RPI10, RPMB, RPME, RPP, RPSD]).blob()
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "Music Box Addon.mcaddon"
    link.click()
    link.remove()
    const compiler = document.getElementsByClassName("compiler");
    for (let i = 0; i < compiler.length; i++) {
        compiler[i].style.display = "none";
    }
}