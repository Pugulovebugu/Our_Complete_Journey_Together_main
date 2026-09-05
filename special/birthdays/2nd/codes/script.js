const $=s=>document.querySelector(s);
function go(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
function photo(input,id){if(!input.files?.[0])return;let u=URL.createObjectURL(input.files[0]),e=document.querySelector("."+id);e.style.backgroundImage=`linear-gradient(#0001,#0008),url("${u}")`;e.classList.add("has");e.querySelector("small").textContent="PHOTO ADDED ♡"}
const memories=["The day everything became a beginning.","The tiny moments that somehow became the big ones.","Today: another birthday, another page, another reason to celebrate you."];function capsule(i){$("#capText").innerHTML="<b>"+memories[i]+"</b><br><span>Save this feeling. ♡</span>"}
let step=1;

const sm=[
    "The first spark. ✦",
    "The story started connecting. ♡",
    "Some memories became favourites.",
    "And suddenly there was an us.",
    "Five stars. One little universe. ✨"
];

function star(n){
    if(n!==step){
        $("#starmsg").textContent=`Star ${step} is waiting ✦`;
        return;
    }

    document.querySelector(".s"+n).style.color="#fff";
    $("#starmsg").textContent=sm[n-1];

    step++;

    if(step===6)
    $("#starmsg").textContent="Constellation complete. ♡ ✨";
}
function wish(){document.querySelectorAll(".flames i").forEach(x=>x.style.display="none");$("#wishmsg").textContent="Wish made. ✨ May it find its way to you.";confetti()}
function confetti(){for(let i=0;i<90;i++){let x=document.createElement("i");x.style.cssText=`position:fixed;z-index:60;left:${Math.random()*100}vw;top:-12px;width:5px;height:11px;background:hsl(${Math.random()*360},70%,82%);animation:drop ${1.5+Math.random()*2.2}s linear forwards`;document.body.append(x);setTimeout(()=>x.remove(),4000)}}

/* =========================================================
   SAVED PUGU VOICE NOTE
   PLAY / PAUSE + PROGRESS BAR
   ========================================================= */

const voicePlayer = document.getElementById("player");
const voiceProgress = document.getElementById("voiceProgress");
const voiceCurrentTime = document.getElementById("voiceCurrentTime");
const voiceDuration = document.getElementById("voiceDuration");
const voicePlayButton = document.getElementById("voicePlayButton");
const voicePlayIcon = document.getElementById("voicePlayIcon");
const voicePlayText = document.getElementById("voicePlayText");
const voiceDisc = document.getElementById("voiceDisc");
const voiceStatus = document.getElementById("voiceStatus");


function formatVoiceTime(seconds) {

  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return minutes + ":" + secs;
}


/* PLAY / PAUSE BUTTON */

function toggleVoiceNote() {

  if (!voicePlayer) return;

  /* Pause birthday music */

  if (
    typeof birthdayMusic !== "undefined" &&
    birthdayMusic &&
    !birthdayMusic.paused
  ) {
    birthdayMusic.pause();

    if (typeof birthdayMusicOn !== "undefined") {
      birthdayMusicOn = false;
    }

    if (typeof updateMusicButton === "function") {
      updateMusicButton();
    }
  }


  if (voicePlayer.paused) {

    voicePlayer.play().catch(() => {

      if (voiceStatus) {
        voiceStatus.textContent =
          "Tap again to play the message ♡";
      }

    });

  } else {

    voicePlayer.pause();

  }
}


/* BUTTON STATE */

function updateVoiceButton(isPlaying) {

  if (!voicePlayButton) return;

  voicePlayButton.classList.toggle(
    "playing",
    isPlaying
  );

  if (voiceDisc) {
    voiceDisc.classList.toggle(
      "playing",
      isPlaying
    );
  }

  if (voicePlayIcon) {
    voicePlayIcon.textContent =
      isPlaying ? "Ⅱ" : "▶";
  }

  if (voicePlayText) {
    voicePlayText.textContent =
      isPlaying
        ? "PAUSE MY VOICE NOTE"
        : "PLAY MY VOICE NOTE";
  }

  if (voiceStatus) {
    voiceStatus.textContent =
      isPlaying
        ? "Playing Pugu's birthday wish ♡"
        : "A little birthday wish from Pugu ♡";
  }
}


/* AUDIO EVENTS */

if (voicePlayer) {

  /* EXACT DURATION */

  voicePlayer.addEventListener(
    "loadedmetadata",
    function () {

      const duration = voicePlayer.duration;

      if (!Number.isFinite(duration)) return;

      voiceProgress.max = duration;
      voiceProgress.value = 0;

      voiceDuration.textContent =
        formatVoiceTime(duration);

      voiceCurrentTime.textContent =
        "0:00";
    }
  );


  /* MOVING PROGRESS BAR */

  voicePlayer.addEventListener(
    "timeupdate",
    function () {

      const current =
        voicePlayer.currentTime;

      const duration =
        voicePlayer.duration;

      if (voiceCurrentTime) {
        voiceCurrentTime.textContent =
          formatVoiceTime(current);
      }

      if (
        voiceProgress &&
        Number.isFinite(duration)
      ) {

        voiceProgress.max = duration;
        voiceProgress.value = current;

      }
    }
  );


  /* PLAY */

  voicePlayer.addEventListener(
    "play",
    function () {

      updateVoiceButton(true);

    }
  );


  /* PAUSE */

  voicePlayer.addEventListener(
    "pause",
    function () {

      updateVoiceButton(false);

    }
  );


  /* FINISHED */

  voicePlayer.addEventListener(
    "ended",
    function () {

      if (voiceProgress) {
        voiceProgress.value = 0;
      }

      if (voiceCurrentTime) {
        voiceCurrentTime.textContent = "0:00";
      }

      updateVoiceButton(false);

      if (voiceStatus) {
        voiceStatus.textContent =
          "Message finished — play it again ♡";
      }
    }
  );


  /* ERROR */

  voicePlayer.addEventListener(
    "error",
    function () {

      if (voiceStatus) {
        voiceStatus.textContent =
          "Voice note could not be loaded.";
      }
    }
  );
}


/* CLICK / DRAG PROGRESS BAR */

if (voiceProgress) {

  voiceProgress.addEventListener(
    "input",
    function () {

      if (!voicePlayer) return;

      voicePlayer.currentTime =
        Number(this.value);

    }
  );
}
/* =========================================================
   NIGHT SKY INTERACTION
   ========================================================= */

(function () {

    const stage = document.getElementById("moonStage");
    const moon = document.getElementById("nightMoon");
    const starsContainer = document.getElementById("nightStars");
    const intro = document.getElementById("moonIntro");

    const counter = document.getElementById("moonFound");
    const overlay = document.getElementById("moonMessageOverlay");
    const messageText = document.getElementById("moonMessageText");

    const constellation =
        document.getElementById("nightConstellation");

    const finalMessage =
        document.getElementById("nightFinal");

    const nextButton =
        document.getElementById("moonNext");

    const hiddenStars =
        document.querySelectorAll(".hidden-star");


    /* -----------------------------------------------------
       CREATE BACKGROUND STARS
       ----------------------------------------------------- */

    if (starsContainer) {

        for (let i = 0; i < 100; i++) {

            const star =
                document.createElement("span");

            star.className = "night-star";

            star.style.left =
                Math.random() * 100 + "%";

            star.style.top =
                Math.random() * 100 + "%";

            const size =
                Math.random() < 0.15
                    ? 3
                    : Math.random() < 0.4
                        ? 2
                        : 1;

            star.style.width = size + "px";
            star.style.height = size + "px";

            star.style.setProperty(
                "--star-speed",
                (2 + Math.random() * 4) + "s"
            );

            star.style.setProperty(
                "--star-delay",
                Math.random() * 5 + "s"
            );

            starsContainer.appendChild(star);
        }
    }


    /* -----------------------------------------------------
       MOON DRAGGING
       ----------------------------------------------------- */

    let dragging = false;

    function moveMoon(clientX, clientY) {

        if (!stage || !moon) return;

        const rect =
            stage.getBoundingClientRect();

        let x =
            ((clientX - rect.left) /
                rect.width) * 100;

        let y =
            ((clientY - rect.top) /
                rect.height) * 100;


        /* Keep moon inside stage */

        x = Math.max(10, Math.min(90, x));
        y = Math.max(12, Math.min(88, y));


        moon.style.left = x + "%";
        moon.style.top = y + "%";


        /* Hide intro after movement */

        if (intro &&
            (Math.abs(x - 50) > 4 ||
             Math.abs(y - 55) > 4)) {

            intro.classList.add("hidden");
        }


        /* Check distance from hidden stars */

        hiddenStars.forEach(function (star) {

            if (
                star.classList.contains("found")
            ) {
                return;
            }

            const starRect =
                star.getBoundingClientRect();

            const starX =
                starRect.left +
                starRect.width / 2;

            const starY =
                starRect.top +
                starRect.height / 2;

            const distance =
                Math.hypot(
                    clientX - starX,
                    clientY - starY
                );


            if (distance < 100) {

                star.classList.add("near");

            } else {

                star.classList.remove("near");

            }

        });
    }


    if (moon) {

        moon.addEventListener(
            "pointerdown",
            function (event) {

                dragging = true;

                moon.setPointerCapture?.(
                    event.pointerId
                );

                moon.style.transition =
                    "none";

                moveMoon(
                    event.clientX,
                    event.clientY
                );
            }
        );


        moon.addEventListener(
            "pointermove",
            function (event) {

                if (!dragging) return;

                moveMoon(
                    event.clientX,
                    event.clientY
                );
            }
        );


        moon.addEventListener(
            "pointerup",
            function () {

                dragging = false;

                moon.style.transition =
                    "filter .5s ease";
            }
        );


        moon.addEventListener(
            "pointercancel",
            function () {

                dragging = false;

            }
        );
    }


    /* -----------------------------------------------------
       STAR DISCOVERY
       ----------------------------------------------------- */

    let found = 0;


    hiddenStars.forEach(function (star) {

        star.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                if (
                    star.classList.contains("found")
                ) {
                    return;
                }


                star.classList.add("found");

                found++;


                if (counter) {
                    counter.textContent = found;
                }


                /* Show message */

                if (messageText) {

                    messageText.textContent =
                        star.dataset.message || "";

                }


                if (overlay) {

                    overlay.classList.add("show");

                }


                /* All stars found */

                if (found === 3) {

                    setTimeout(function () {

                        if (overlay) {
                            overlay.classList.remove(
                                "show"
                            );
                        }

                        if (constellation) {

                            constellation.classList.add(
                                "show"
                            );

                        }

                    }, 900);


                    setTimeout(function () {

                        if (finalMessage) {

                            finalMessage.classList.add(
                                "show"
                            );

                        }

                        if (nextButton) {

                            nextButton.classList.add(
                                "show"
                            );

                        }

                    }, 2600);
                }

            }
        );
    });


    /* -----------------------------------------------------
       CLOSE MESSAGE
       ----------------------------------------------------- */

    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                overlay.classList.remove(
                    "show"
                );

            }
        );
    }

})();
function openLetter(){$(".envelope").style.display="none";$("#letterbox").classList.remove("hidden")}
function unlock(){let v=$("#pass").value.trim().toLowerCase();if(["bugu","pugu","0509","22072025"].includes(v)){$("#secretbox").classList.remove("hidden");$("#finalBtn").classList.remove("hidden");confetti()}else{$("#pass").value="";$("#pass").placeholder="not that one ♡"}}
const st=document.createElement("style");st.textContent="@keyframes drop{to{transform:translateY(105vh) rotate(720deg);opacity:0}}";document.head.append(st);
addEventListener("scroll",()=>{let h=document.documentElement.scrollHeight-innerHeight;$(".progress i").style.width=(scrollY/h*100)+"%"});
function update(){let target=new Date("2026-09-05T00:00:00"),now=new Date(),d=target-now;if(d<=0){$("#countdown").textContent="TODAY IS BUGU DAY ♡";return}let days=Math.floor(d/86400000),hrs=Math.floor(d/3600000)%24,min=Math.floor(d/60000)%60;$("#countdown").textContent=`${days}D · ${String(hrs).padStart(2,"0")}H · ${String(min).padStart(2,"0")}M`;};update();setInterval(update,30000);
const sections=[...document.querySelectorAll("section")];addEventListener("scroll",()=>{let mid=scrollY+innerHeight*.45,idx=sections.reduce((best,s,i)=>Math.abs(s.offsetTop-mid)<Math.abs(sections[best].offsetTop-mid)?i:best,0);$("#scene").textContent=String(idx+1).padStart(2,"0")+" / "+sections.length});

const timelineWords=["The day the story got its first page.","The laughs that made ordinary days feel cinematic.","The nights where even silence felt like company.","All the tiny things became one beautiful us. ♡"];
function timeline(i){document.querySelectorAll('.timeline button').forEach((b,n)=>b.classList.toggle('active',n===i));$('#timelineText').innerHTML='<b>'+timelineWords[i]+'</b><br><span>Chapter '+(i+1)+' of forever.</span>'}
const reasons=["Your smile changes the atmosphere.","You make little moments feel important.","You are beautifully, unmistakably you.","You make ordinary days memorable.","Your laugh deserves its own soundtrack.","You make distance feel smaller.","You are worth celebrating beyond birthdays.","You turn memories into home.","You are my favourite plot twist.","Because there is nobody else I would choose for this story. ♡"];
function reason(el,i){el.classList.add('revealed');el.querySelector('b').textContent='♡';$('#reasonText').innerHTML='<b>'+reasons[i]+'</b><br><span>Reason '+(i+1)+' unlocked.</span>'}
/* =========================================================
   ONE PERFECT FRAME
   Permanent photo storage
   ========================================================= */

const PERFECT_FRAME_KEY = "bugu_one_perfect_frame_v1";


function polaroid(input) {

  const file = input.files && input.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please choose an image.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {

    const image = new Image();

    image.onload = function() {

      /*
       * Resize the image before saving.
       * This keeps localStorage from becoming unnecessarily huge.
       */

      const maxSize = 1400;

      let width = image.width;
      let height = image.height;

      if (width > maxSize || height > maxSize) {

        if (width > height) {
          height = Math.round(
            height * maxSize / width
          );

          width = maxSize;

        } else {

          width = Math.round(
            width * maxSize / height
          );

          height = maxSize;
        }
      }

      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        0,
        0,
        width,
        height
      );

      /*
       * JPEG gives much smaller storage size
       * while keeping the photo looking good.
       */

      const savedPhoto = canvas.toDataURL(
        "image/jpeg",
        0.88
      );

      try {

        localStorage.setItem(
          PERFECT_FRAME_KEY,
          savedPhoto
        );

        showPerfectFrame(savedPhoto);

      } catch (error) {

        console.error(
          "Could not save perfect frame:",
          error
        );

        alert(
          "The photo could not be saved. " +
          "Please try a smaller image."
        );
      }
    };

    image.onerror = function() {

      alert("This image could not be loaded.");

    };

    image.src = event.target.result;
  };

  reader.onerror = function() {

    alert("Could not read this photo.");

  };

  reader.readAsDataURL(file);
}


/* =========================================================
   DISPLAY SAVED PHOTO
   ========================================================= */

function showPerfectFrame(photo) {

  const frame = document.getElementById(
    "perfectFrame"
  );

  if (!frame) return;

  const label = frame.querySelector("label");

  const prompt = document.getElementById(
    "perfectFramePrompt"
  );

  if (!label) return;

  label.style.backgroundImage =
    `url("${photo}")`;

  frame.classList.add("has-photo");

  if (prompt) {

    prompt.textContent =
      "MEMORY CAPTURED ♡";

  }
}


/* =========================================================
   RESTORE PHOTO EVERY TIME THE WEBSITE OPENS
   ========================================================= */

function restorePerfectFrame() {

  try {

    const savedPhoto =
      localStorage.getItem(
        PERFECT_FRAME_KEY
      );

    if (savedPhoto) {

      showPerfectFrame(savedPhoto);

    }

  } catch (error) {

    console.error(
      "Could not restore perfect frame:",
      error
    );

  }
}


/* =========================================================
   RESTORE AFTER PAGE LOAD
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  restorePerfectFrame
);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.16});document.querySelectorAll('.chapter,.hero,.finale').forEach(e=>{e.classList.add('reveal');io.observe(e)});

// V8 cinematic interactions
function enterFilm(){
  const intro=$("#cinematicIntro");
  startBirthdayMusic();
  intro.classList.add("hide");
  document.body.classList.add("film-started");
  setTimeout(()=>intro.remove(),1200);
}
let moonDragging=false, moonRevealed=0;
function startMoon(e){
  moonDragging=true;
  const move=(ev)=>{
    if(!moonDragging)return;
    const r=$("#moonStage").getBoundingClientRect();
    const x=Math.max(20,Math.min(r.width-150,ev.clientX-r.left-65));
    const y=Math.max(35,Math.min(r.height-165,ev.clientY-r.top-65));
    $(".moon").style.left=x+"px"; $(".moon").style.top=y+"px";
    const msgs=document.querySelectorAll(".moon-message");
    const progress=x/r.width;
    msgs.forEach((m,i)=>{if(progress>(i+1)*.23)m.classList.add("show")});
  };
  const up=()=>{moonDragging=false;window.removeEventListener("pointermove",move);window.removeEventListener("pointerup",up)};
  window.addEventListener("pointermove",move);window.addEventListener("pointerup",up);
  e.preventDefault();
}
function openGift(){
  const box=$(".giftbox"); box.classList.add("open");
  $("#giftMessage").innerHTML="<b>My gift to you?</b><br>More memories. More laughter. More ordinary days that somehow become our favourite ones. ♡";
  $("#giftNext").classList.remove("hidden");
  confetti();
}
/* =========================================================
   BUGU — JPG MEMORY FILM
   PHOTO VIEWER SYSTEM
   ========================================================= */


/*
   These are the four JPG files.

   Your folder should contain:

   photos/
      memory1.jpg
      memory2.jpg
      memory3.jpg
      memory4.jpg
*/

const memoryPhotos = [

  {
    src: "photos/memory1.jpg",
    number: "01",
    title: "The Beginning",
    subtitle: "22 JULY 2025"
  },

  {
    src: "photos/memory2.jpg",
    number: "02",
    title: "Your Smile",
    subtitle: "THE LITTLE THING"
  },

  {
    src: "photos/memory3.jpg",
    number: "03",
    title: "Us",
    subtitle: "JUST US"
  },

  {
    src: "photos/memory4.jpg",
    number: "04",
    title: "Favourite Day",
    subtitle: "A DAY TO REMEMBER"
  }

];



/* =========================================================
   LOAD JPGS
   ========================================================= */

function setupMemoryPhotos() {

  const frames =
    document.querySelectorAll(
      ".cinematic-photo"
    );


  frames.forEach((frame) => {

    const image =
      frame.querySelector("img");

    const placeholder =
      frame.querySelector(
        ".photo-placeholder"
      );


    if (!image) return;


    /*
       JPG loaded successfully
    */

    image.addEventListener(
      "load",
      () => {

        image.classList.add(
          "loaded"
        );

        if (placeholder) {

          placeholder.classList.add(
            "hidden-placeholder"
          );

        }

      }
    );


    /*
       JPG missing / wrong filename
    */

    image.addEventListener(
      "error",
      () => {

        image.classList.remove(
          "loaded"
        );

        if (placeholder) {

          placeholder.classList.remove(
            "hidden-placeholder"
          );

        }

      }
    );


    /*
       If browser already cached image
    */

    if (
      image.complete &&
      image.naturalWidth > 0
    ) {

      image.classList.add(
        "loaded"
      );

      if (placeholder) {

        placeholder.classList.add(
          "hidden-placeholder"
        );

      }

    }

  });

}



/* =========================================================
   OPEN PHOTO
   ========================================================= */

function openPhotoViewer(index) {

  const data =
    memoryPhotos[index];

  const viewer =
    document.getElementById(
      "photoViewer"
    );

  const image =
    document.getElementById(
      "viewerImage"
    );

  const placeholder =
    viewer.querySelector(
      ".viewer-placeholder"
    );


  if (!data || !viewer) return;


  /*
     Update caption
  */

  document.getElementById(
    "viewerNumber"
  ).textContent =
    data.number;


  document.getElementById(
    "viewerTitle"
  ).textContent =
    data.title;


  document.getElementById(
    "viewerSubtitle"
  ).textContent =
    data.subtitle;


  document.getElementById(
    "viewerPlaceholderText"
  ).textContent =
    data.title.toUpperCase();



  /*
     Reset previous image
  */

  image.classList.remove(
    "visible"
  );

  image.removeAttribute(
    "src"
  );


  /*
     Show placeholder
     while JPG loads
  */

  placeholder.style.display =
    "flex";


  /*
     Load selected JPG
  */

  image.onload = () => {

    image.classList.add(
      "visible"
    );

    placeholder.style.display =
      "none";

  };


  /*
     If JPG doesn't exist
  */

  image.onerror = () => {

    image.classList.remove(
      "visible"
    );

    placeholder.style.display =
      "flex";

  };


  image.src =
    data.src;


  /*
     Open viewer
  */

  viewer.classList.add(
    "active"
  );

  viewer.setAttribute(
    "aria-hidden",
    "false"
  );


  /*
     Stop background scrolling
  */

  document.body.style.overflow =
    "hidden";

}



/* =========================================================
   CLOSE PHOTO
   ========================================================= */

function closePhotoViewer() {

  const viewer =
    document.getElementById(
      "photoViewer"
    );


  if (!viewer) return;


  viewer.classList.remove(
    "active"
  );


  viewer.setAttribute(
    "aria-hidden",
    "true"
  );


  /*
     Restore scrolling
  */

  document.body.style.overflow =
    "";

}



/* =========================================================
   TAP DARK BACKGROUND TO CLOSE
   ========================================================= */

document.addEventListener(
  "click",
  (event) => {

    const viewer =
      document.getElementById(
        "photoViewer"
      );


    if (
      viewer &&
      viewer.classList.contains(
        "active"
      ) &&
      event.target.classList.contains(
        "viewer-backdrop"
      )
    ) {

      closePhotoViewer();

    }

  }
);



/* =========================================================
   ESC KEY TO CLOSE
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closePhotoViewer();

    }

  }
);



/* =========================================================
   INITIALIZE
   ========================================================= */

setupMemoryPhotos();
/* =========================================================
   FILM OF US — 4 CHAPTER LETTERS
   ========================================================= */

const usLetters = [

  {
    chapter: "CHAPTER I",
    label: "THE BEGINNING",
    title: "Where it all started.",

    body: `
      <p>
        Some stories begin loudly.
        Ours began quietly.
      </p>

      <p>
        One date became a beginning,
        and somehow that beginning became
        one of my favourite parts of my life.
      </p>

      <p>
        22 July 2025 wasn't just a date.
        It became the first page of us.
      </p>
    `
  },


  {
    chapter: "CHAPTER II",
    label: "LITTLE THINGS",
    title: "The moments in between.",

    body: `
      <p>
        It was never only about the big moments.
      </p>

      <p>
        It was the random conversations,
        the silly laughs, the little updates,
        the tiny things that somehow became
        important because they were ours.
      </p>

      <p>
        Somewhere between all those little moments,
        you became one of my favourite parts
        of every ordinary day.
      </p>
    `
  },


  {
    chapter: "CHAPTER III",
    label: "BECOMING US",
    title: "Somewhere along the way.",

    body: `
      <p>
        We didn't wake up one morning
        and suddenly become "us".
      </p>

      <p>
        We became us slowly —
        through memories, conversations,
        laughter, patience, and all the
        little moments we kept choosing
        to share.
      </p>

      <p>
        And somehow, without noticing,
        the story started feeling like home.
      </p>
    `
  },


  {
    chapter: "CHAPTER IV",
    label: "STILL US",
    title: "This isn't the ending.",

    body: `
      <p>
        If these four chapters could tell us
        anything, it would be this:
        we have already come a long way.
      </p>

      <p>
        But I don't want this to be the last page.
      </p>

      <p>
        There are still birthdays to celebrate,
        places to discover, photographs to take,
        silly memories to make, and countless
        ordinary days waiting to become ours.
      </p>

      <p>
        So this isn't the end of our film.
        It's just the part we're watching right now.
      </p>
    `
  }

];


function openUsLetter(index) {

  const data = usLetters[index];

  const viewer =
    document.getElementById("usLetterViewer");

  if (!data || !viewer) return;


  document.getElementById(
    "usLetterChapter"
  ).textContent =
    data.chapter;


  document.getElementById(
    "usLetterLabel"
  ).textContent =
    data.label;


  document.getElementById(
    "usLetterTitle"
  ).textContent =
    data.title;


  document.getElementById(
    "usLetterBody"
  ).innerHTML =
    data.body;


  viewer.classList.add("active");

  viewer.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";
}


/* =========================================================
   CLOSE LETTER
   Tap anywhere outside the letter
   ========================================================= */

function closeUsLetter() {

  const viewer =
    document.getElementById(
      "usLetterViewer"
    );

  if (!viewer) return;


  viewer.classList.remove("active");

  viewer.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";
}


/* =========================================================
   TAP ANYWHERE ON BACKDROP TO CLOSE
   ========================================================= */

document.addEventListener(
  "click",
  function(event) {

    const viewer =
      document.getElementById(
        "usLetterViewer"
      );

    if (
      viewer &&
      viewer.classList.contains("active") &&
      event.target.classList.contains(
        "us-letter-backdrop"
      )
    ) {

      closeUsLetter();

    }

  }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape"
    ) {

      closeUsLetter();

    }

  }
);
/* =========================================================
   CINEMATIC REASONS — 10 REASONS
   This version intentionally uses "cinematicReasons"
   so it does NOT conflict with the existing "reasons".
   ========================================================= */

const cinematicReasons = [

  {
    number: "REASON 01",
    icon: "♡",
    label: "YOUR SMILE",
    title: "Your smile.",
    body: `
      <p>
        Because somehow your smile can make
        an ordinary moment feel completely different.
      </p>

      <p>
        There is something about seeing you happy
        that makes me happy too.
      </p>

      <p>
        And honestly, I could never get tired
        of seeing that smile.
      </p>
    `
  },

  {
    number: "REASON 02",
    icon: "✦",
    label: "YOUR HEART",
    title: "Your heart.",
    body: `
      <p>
        You have a softness in you that makes
        you incredibly special.
      </p>

      <p>
        The way you care, the way you feel,
        and the way you love the people
        who matter to you.
      </p>

      <p>
        That beautiful heart of yours
        is one of the biggest reasons
        I adore you.
      </p>
    `
  },

  {
    number: "REASON 03",
    icon: "☾",
    label: "YOUR LITTLE THINGS",
    title: "The little things.",
    body: `
      <p>
        Sometimes it isn't the big moments
        that stay with me.
      </p>

      <p>
        It's the tiny things you probably
        don't even realize I notice.
      </p>

      <p>
        Your expressions, your little habits,
        the way you say things —
        somehow they all became part
        of what makes you you.
      </p>
    `
  },

  {
    number: "REASON 04",
    icon: "∞",
    label: "YOUR PRESENCE",
    title: "Just having you here.",
    body: `
      <p>
        I don't always need anything special
        to happen.
      </p>

      <p>
        Sometimes just knowing you're there
        is enough to make an ordinary day
        feel a little better.
      </p>

      <p>
        Your presence has quietly become
        one of my favourite comforts.
      </p>
    `
  },

  {
    number: "REASON 05",
    icon: "✧",
    label: "YOUR LAUGH",
    title: "Your laugh.",
    body: `
      <p>
        Because your laugh is impossible
        not to love.
      </p>

      <p>
        Especially those moments when
        something completely stupid makes
        both of us laugh way more than it should.
      </p>

      <p>
        Those are the sounds I want
        to remember for a very long time.
      </p>
    `
  },

  {
    number: "REASON 06",
    icon: "♡",
    label: "THE WAY YOU CARE",
    title: "The way you care.",
    body: `
      <p>
        You don't always have to say
        that you care.
      </p>

      <p>
        Sometimes it shows up in the smallest
        things — in the questions you ask,
        the things you remember,
        and the way you make someone
        feel noticed.
      </p>

      <p>
        I notice it.
        And I love that about you.
      </p>
    `
  },

  {
    number: "REASON 07",
    icon: "✦",
    label: "OUR CHAOS",
    title: "Our beautiful chaos.",
    body: `
      <p>
        We aren't perfect.
        And honestly, I don't think
        I'd want us to be.
      </p>

      <p>
        There are silly moments,
        random conversations,
        teasing, nonsense and chaos.
      </p>

      <p>
        Somehow, our particular kind of chaos
        became one of my favourite places to be.
      </p>
    `
  },

  {
    number: "REASON 08",
    icon: "☁",
    label: "YOUR COMFORT",
    title: "You feel like home.",
    body: `
      <p>
        There are people who enter your life
        and remain people.
      </p>

      <p>
        And then there are people who slowly
        become a feeling.
      </p>

      <p>
        Somehow, you became that feeling for me —
        something warm, familiar and comforting.
      </p>
    `
  },

  {
    number: "REASON 09",
    icon: "✧",
    label: "BECOMING US",
    title: "The way we became us.",
    body: `
      <p>
        I love that our story wasn't created
        in one perfect moment.
      </p>

      <p>
        It happened slowly.
        Through conversations, memories,
        laughter, ordinary days and everything
        in between.
      </p>

      <p>
        Little by little,
        we became something that feels
        uniquely ours.
      </p>
    `
  },

  {
    number: "REASON 10",
    icon: "♡",
    label: "THE REAL REASON",
    title: "Simply you.",
    body: `
      <p>
        After all these reasons,
        maybe the simplest answer is
        the most honest one.
      </p>

      <p>
        I don't love you because
        of one particular thing.
      </p>

      <p>
        I love all the little pieces
        that make you Bugu.
      </p>

      <p>
        Your smile.
        Your heart.
        Your weirdness.
        Your softness.
        Your chaos.
        Your everything.
      </p>

      <p>
        The real reason is simply
        <strong>you.</strong>
      </p>
    `
  }

];


/* =========================================================
   OPEN CINEMATIC REASON
   ========================================================= */

function openReason(index) {

  const data = cinematicReasons[index];

  const viewer =
    document.getElementById("reasonViewer");

  if (!data || !viewer) return;


  const number =
    document.getElementById(
      "reasonViewerNumber"
    );

  const icon =
    document.getElementById(
      "reasonViewerIcon"
    );

  const label =
    document.getElementById(
      "reasonViewerLabel"
    );

  const title =
    document.getElementById(
      "reasonViewerTitle"
    );

  const body =
    document.getElementById(
      "reasonViewerBody"
    );


  if (
    !number ||
    !icon ||
    !label ||
    !title ||
    !body
  ) {
    console.error(
      "Reasons viewer elements are missing."
    );

    return;
  }


  number.textContent =
    data.number;

  icon.textContent =
    data.icon;

  label.textContent =
    data.label;

  title.textContent =
    data.title;

  body.innerHTML =
    data.body;


  viewer.classList.add(
    "active"
  );

  viewer.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";
}


/* =========================================================
   CLOSE CINEMATIC REASON
   ========================================================= */

function closeReason() {

  const viewer =
    document.getElementById(
      "reasonViewer"
    );

  if (!viewer) return;


  viewer.classList.remove(
    "active"
  );

  viewer.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";
}


/* =========================================================
   TAP BACKDROP TO CLOSE
   ========================================================= */

document.addEventListener(
  "click",
  function(event) {

    const viewer =
      document.getElementById(
        "reasonViewer"
      );

    if (!viewer) return;


    if (
      viewer.classList.contains("active") &&
      event.target.classList.contains(
        "reason-backdrop"
      )
    ) {

      closeReason();

    }

  }
);


/* =========================================================
   ESC KEY TO CLOSE
   ========================================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key !== "Escape"
    ) {
      return;
    }


    const viewer =
      document.getElementById(
        "reasonViewer"
      );


    if (
      viewer &&
      viewer.classList.contains(
        "active"
      )
    ) {

      closeReason();

    }

  }
);
/* =========================================================
   BIRTHDAY MUSIC
   ========================================================= */

const birthdayMusic = document.getElementById("birthdayMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

let birthdayMusicOn = false;


/* START MUSIC */
function startBirthdayMusic() {

  if (!birthdayMusic) return;

  birthdayMusic.volume = 0.05;

  birthdayMusic.play()
    .then(() => {
      birthdayMusicOn = true;
      updateMusicButton();
    })
    .catch(() => {
      birthdayMusicOn = false;
      updateMusicButton();
    });
}


/* TOGGLE MUSIC */
function toggleBirthdayMusic() {

  if (!birthdayMusic) return;

  if (birthdayMusic.paused) {

    birthdayMusic.volume = 0.35;

    birthdayMusic.play()
      .then(() => {
        birthdayMusicOn = true;
        updateMusicButton();
      })
      .catch(() => {
        birthdayMusicOn = false;
        updateMusicButton();
      });

  } else {

    birthdayMusic.pause();

    birthdayMusicOn = false;

    updateMusicButton();
  }
}


/* UPDATE BUTTON */
function updateMusicButton() {

  if (!musicToggle) return;

  if (birthdayMusicOn) {

    musicToggle.classList.add("music-on");

    musicIcon.textContent = "♫";
    musicText.textContent = "MUSIC ON";

  } else {

    musicToggle.classList.remove("music-on");

    musicIcon.textContent = "♫";
    musicText.textContent = "MUSIC OFF";
  }
}
/* =========================================
   CONSTELLATION COMPLETION
   ========================================= */

(function () {

    const originalStar = window.star;

    if (typeof originalStar !== "function") return;

    window.star = function (n) {

        originalStar(n);

        if (n === 5) {

            const complete =
                document.getElementById("constellationComplete");

            if (!complete) return;

            setTimeout(function () {

                complete.classList.add("show");

            }, 800);
        }
    };

})();
/* =========================================
   RESUME MUSIC AFTER VOICE NOTE
   ========================================= */

const voiceNote = document.getElementById("player");

if (voiceNote) {

    voiceNote.addEventListener("ended", function () {

        const music = document.querySelector(
            'audio:not(#player)'
        );

        if (music) {
            music.play().catch(function () {
                // Playback may be blocked by the browser.
            });
        }

    });

}