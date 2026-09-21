// =====================================
// Girlfriend's Day Website Script
// =====================================

// Smooth scroll when "Begin Our Journey" is clicked
const startBtn = document.getElementById("startBtn");

if (startBtn) {
    startBtn.addEventListener("click", () => {
        document.querySelector(".intro").scrollIntoView({
            behavior: "smooth"
        });
    });
}

// Reveal sections on scroll
const revealElements = document.querySelectorAll(
".hero,.intro,.gallery-section,.reasons-section,.final-section,.journey-section,.forever-section"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });
}, {
    threshold: 0.2
});

revealElements.forEach((section) => {

    section.style.opacity = "0";
    section.style.transform = "translateY(80px)";
    section.style.transition = "1s ease";

    observer.observe(section);

});

// Floating heart burst on click
document.addEventListener("click", (e) => {

    for (let i = 0; i < 10; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "❤";

        heart.style.position = "fixed";
        heart.style.left = e.clientX + "px";
        heart.style.top = e.clientY + "px";

        heart.style.fontSize = (18 + Math.random() * 20) + "px";
        heart.style.pointerEvents = "none";
        heart.style.color = `hsl(${330 + Math.random() * 30},100%,75%)`;

        heart.style.transition = "all 1.5s ease-out";
        heart.style.zIndex = "9999";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.style.transform = `
                translate(
                    ${(Math.random() - 0.5) * 250}px,
                    ${-200 - Math.random() * 150}px
                )
                scale(${0.5 + Math.random()})
                rotate(${Math.random() * 360}deg)
            `;

            heart.style.opacity = "0";

        }, 30);

        setTimeout(() => {
            heart.remove();
        }, 1600);

    }

});
const loader = document.getElementById("loader");

// Hero text animation
window.addEventListener("load", () => {

    const glass = document.querySelector(".hero-card");

if(!glass) return;

glass.style.opacity = "0";
glass.style.transform = "translateY(50px) scale(.95)";
glass.style.transition = "1.2s ease";
    glass.style.transform = "translateY(50px) scale(.95)";
    glass.style.transition = "1.2s ease";

    setTimeout(() => {
        glass.style.opacity = "1";
        glass.style.transform = "translateY(0) scale(1)";
    }, 200);

});

// Button glow pulse
setInterval(() => {

    if (startBtn) {
        startBtn.animate([
            { transform: "scale(1)" },
            { transform: "scale(1.05)" },
            { transform: "scale(1)" }
        ], {
            duration: 1800,
            iterations: 1
        });
    }

}, 3500);

// Greeting based on time
const hour = new Date().getHours();
let greeting = "My Beautiful Bugu ❤️";

if (hour < 12) {
    greeting = "Good Morning, My Beautiful Bugu ☀️";
} else if (hour < 18) {
    greeting = "Good Afternoon, My Beautiful Bugu 🌸";
} else {
    greeting = "Good Evening, My Beautiful Bugu 🌙";
}

const title = document.getElementById("heroTitle");
if (title) {
    title.textContent = greeting;
}

// Romantic console message ❤️
console.log(`
❤️ Happy Girlfriend's Day ❤️

Made with infinite love
From Pugu ❤️
To Bugu ❤️
`);
/* LOADER */

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.opacity="0";

loader.style.visibility="hidden";

},2500);

});



/* MUSIC */

/* ==========================
   BACKGROUND MUSIC
========================== */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

music.volume = 0;

function fadeMusic(){

    let volume = 0;

    const fade = setInterval(()=>{

        volume += 0.02;

        music.volume = Math.min(volume,0.30);

        if(volume >= 0.30){

            clearInterval(fade);

        }

    },150);

}

let playing = false;

musicBtn.innerHTML = "🔇";

musicBtn.addEventListener("click", async () => {

    try{

        if(!playing){

            await music.play();

fadeMusic();

            playing = true;

            musicBtn.innerHTML = "🎵";

        }

        else{

            music.pause();

            playing = false;

            musicBtn.innerHTML = "🔇";

        }

    }

    catch(error){

        console.log(error);

    }

});
/* Auto Play */

window.addEventListener("pointerdown", function startMusic(){

    if(!playing){

        music.play().then(()=>{

fadeMusic();

            playing = true;

            musicBtn.innerHTML = "🎵";

        }).catch(()=>{});

    }

    

},{once:true});
// Relationship Counter
const startDate = new Date("2025-07-22T00:27:00");

setInterval(() => {

const now = new Date();

const diff = now - startDate;

const days = Math.floor(diff / 86400000);

const hours = Math.floor((diff % 86400000) / 3600000);

const minutes = Math.floor((diff % 3600000) / 60000);

const seconds = Math.floor((diff % 60000) / 1000);

document.getElementById("days").textContent = days;
document.getElementById("hours").textContent = hours;
document.getElementById("minutes").textContent = minutes;
document.getElementById("seconds").textContent = seconds;

},1000);

document.getElementById("loveBtn").onclick = () => {

document.getElementById("letter").scrollIntoView({
behavior:"smooth"
});

};
const message = `

My Dearest Bugu ❤️,

Happy Girlfriend's Day.

Sometimes I wonder how I got so lucky to have someone as wonderful as you in my life.

You have given me countless smiles, endless happiness, and memories that I will treasure forever.

No matter how many miles separate us, you are always the closest person to my heart.

You are my comfort.

My peace.

My favorite notification.

My home.

Every day I thank God for bringing you into my life.

I promise to keep choosing you,
supporting you,
respecting you,
and loving you with all my heart.

Happy Girlfriend's Day, my beautiful Bugu.

Forever Yours,

❤️ Pugu ❤️

`;

const box = document.getElementById("typewriter");

let i = 0;

function type(){

if(i < message.length){

box.innerHTML += message.charAt(i);

i++;

setTimeout(type,35);

}

}

setTimeout(type,1200);
setInterval(()=>{

const p=document.createElement("div");

p.className="petal";

p.innerHTML="🌸";

p.style.left=Math.random()*100+"vw";

p.style.animationDuration=(6+Math.random()*6)+"s";

document.body.appendChild(p);

setTimeout(()=>{

p.remove();

},12000);

},450);
const photos=document.querySelectorAll(".photo img");

const lightbox=document.getElementById("lightbox");

const preview=document.getElementById("preview");

const close=document.getElementById("close");

photos.forEach(img=>{

img.onclick=()=>{

lightbox.style.display="flex";

preview.src = img.currentSrc || img.src;
preview.alt = img.alt;

};

});

close.onclick=()=>{

lightbox.style.display="none";

};

lightbox.onclick=(e)=>{

if(e.target===lightbox){

lightbox.style.display="none";

}

};

setInterval(()=>{

const s=document.createElement("div");

s.className="star";

s.style.top=Math.random()*40+"vh";

s.style.left=(70+Math.random()*30)+"vw";

document.body.appendChild(s);

setTimeout(()=>{

s.remove();

},2000);

},2500);
const surpriseBtn = document.getElementById("surpriseBtn");
const finalMessage = document.getElementById("finalMessage");

const finalText =
"Thank you for being the most beautiful part of my life.";

const endingTitle = document.querySelector(".typing-ending");

let endingIndex = 0;

function endingType(){

    if(endingIndex < finalText.length){

        endingTitle.innerHTML += finalText.charAt(endingIndex);

        endingIndex++;

        setTimeout(endingType,60);

    }

}

surpriseBtn.onclick = () => {
    if (endingIndex > 0) return;

    finalMessage.classList.add("show");

    surpriseBtn.style.display = "none";

    launchConfetti();

    endingType();

    const lines = document.querySelectorAll(".promise-box p");

    lines.forEach((line,index)=>{

        setTimeout(()=>{

            line.classList.add("show");

        },1500 + (index * 1200));

    });

};

// Simple heart confetti
function launchConfetti(){

    for(let i=0;i<150;i++){

        const heart=document.createElement("div");

        heart.innerHTML="❤️";

        heart.style.position="fixed";
        heart.style.left=Math.random()*100+"vw";
        heart.style.top="-20px";
        heart.style.fontSize=(12+Math.random()*24)+"px";
        heart.style.transition="6s linear";
        heart.style.pointerEvents="none";
        heart.style.zIndex="99999";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.style.transform=
            `translateY(120vh)
             rotate(${Math.random()*720}deg)`;

            heart.style.opacity="0";

        },50);

        setTimeout(()=>{

            heart.remove();

        },6000);

    }

}


const grid = document.querySelector(".reasons-grid");
const button = document.getElementById("showMore");

const perPage = 10;
let page = 0;

function renderReasons(animated = true){

    const start = page * perPage;
    const current = reasons.slice(start, start + perPage);

    function createCards(){

        grid.innerHTML = "";

        current.forEach((reason,index)=>{

            const card = document.createElement("div");

            card.className = "reason-card show";

            card.style.animationDelay = (index * 0.12) + "s";

            card.innerHTML = `
                <div class="reason-inner">
                    <div class="front">❤️</div>
                    <div class="back">${reason}</div>
                </div>
            `;

            card.onclick = () => {
                card.classList.toggle("active");
            };

            grid.appendChild(card);

        });

    }

    if(animated){

        document.querySelectorAll(".reason-card").forEach(card=>{
            card.classList.add("hide");
        });

        setTimeout(createCards,600);

    }else{

        createCards();

    }

    page++;

    if(page * perPage >= reasons.length){

        page = 0;
        button.innerHTML = "Start Again ❤️";

    }else{

        button.innerHTML = "Show More ❤️";

    }

}

renderReasons(false);

button.onclick = () => {

    renderReasons(true);

};

const journeyPhotos=[

"journey/photo1.jpg",
"journey/photo2.jpg",
"journey/photo3.jpg",
"journey/photo4.jpg",
"journey/photo5.jpg",
"journey/photo6.jpg",
"journey/photo7.jpg",
"journey/photo8.jpg",
"journey/photo9.jpg",
"journey/photo10.jpg",
"journey/photo11.jpg",
"journey/photo12.jpg"

];

const captions=[

"The day that changed my life ❤️",

"My favorite smile 🌸",

"You make every moment magical ✨",

"Our happiest memories 💖",

"You are my safe place ❤️",

"Every picture tells our story 📸",

"My forever favorite person 💞",

"Our beautiful journey 🌹",

"My heart belongs to you ❤️",

"Distance never changed my love 🌍",

"My dream girl 💖",

"Our forever begins every day ❤️"

];

let currentSlide=0;

const slide=document.getElementById("slideImage");

const caption=document.getElementById("journeyCaption");

setInterval(()=>{

currentSlide++;

if(currentSlide>=journeyPhotos.length){

currentSlide=0;

}

slide.style.transition = "opacity .8s ease";
slide.style.opacity = 0;

setTimeout(()=>{

slide.src=journeyPhotos[currentSlide];

caption.innerHTML=captions[currentSlide];

slide.style.opacity=1;

},500);

},4000);

document.getElementById("continueEnding").onclick=()=>{

document.getElementById("journey").scrollIntoView({

behavior:"smooth"

});

};
const foreverText =

`No matter how many years pass...

No matter how many memories we create...

No matter where life takes us...

I will always love you.

You are my safest place.

My greatest blessing.

My favorite person.

My forever.

Thank you for existing.

❤️`;

const foreverBox=document.getElementById("foreverMessage");

let foreverIndex=0;

function typeForever(){

if(foreverIndex<foreverText.length){

foreverBox.innerHTML+=foreverText.charAt(foreverIndex);

foreverIndex++;

setTimeout(typeForever,55);

}

}

document.getElementById("nextJourney").onclick = () => {

    document.getElementById("forever").scrollIntoView({

        behavior:"smooth"

    });

    setTimeout(typeForever,800);

    startFireworks();

    setTimeout(stopFireworks,15000);

};
document.getElementById("replayBtn").onclick = () => {

location.reload();

};
let fireworks = null;

function createFirework(){

    const fire = document.createElement("div");

    fire.innerHTML = "✨";

    fire.style.position = "fixed";
    fire.style.left = Math.random()*100 + "vw";
    fire.style.top = Math.random()*100 + "vh";
    fire.style.fontSize = (20 + Math.random()*40) + "px";
    fire.style.opacity = "1";
    fire.style.pointerEvents = "none";
    fire.style.transition = "2s";
    fire.style.zIndex = "99999";

    document.body.appendChild(fire);

    setTimeout(()=>{

        fire.style.transform = "scale(3)";
        fire.style.opacity = "0";

    },50);

    setTimeout(()=>{

        fire.remove();

    },2000);

}

function startFireworks(){

    if(fireworks) return;

    fireworks = setInterval(createFirework,500);

}

function stopFireworks(){

    clearInterval(fireworks);

    fireworks = null;

}