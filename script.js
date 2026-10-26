/* =================================
   GAME DATA
================================= */

const games = [

  {
    name:"918KISS",
    image:"images/918kiss.png"
  },

  {
    name:"MEGA888",
    image:"images/mega888.png"
  },

  {
    name:"EVO888",
    image:"images/evo888.png"
  },

  {
    name:"PUSSY888",
    image:"images/pussy888.png"
  },

  {
    name:"918KAYA",
    image:"images/918kaya.png"
  },

  {
    name:"NEWTOWN",
    image:"images/newtown.png"
  },

  {
    name:"SUNCITY",
    image:"images/suncity.png"
  },

  {
    name:"WWBET",
    image:"images/wwbet.png"
  },

  {
    name:"ACE333",
    image:"images/ace333.png"
  },

  {
    name:"LIVE22",
    image:"images/live22.png"
  },

  {
    name:"JOKER",
    image:"images/joker.png"
  },

  {
    name:"918KISS H5",
    image:"images/918kiss-h5.png"
  },

  {
    name:"GREAT WALL",
    image:"images/greatwall.png"
  },

  {
    name:"MEGA H5",
    image:"images/mega-h5.png"
  }

];


/* =================================
   HEADER
================================= */

const header =
  document.getElementById("header");


function updateHeader(){

  if(window.scrollY > 20){

    header.classList.add(
      "scrolled"
    );

  }else{

    header.classList.remove(
      "scrolled"
    );

  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive:true
  }
);


updateHeader();


/* =================================
   DETECT SCROLL DIRECTION
================================= */

let lastScrollY =
  window.scrollY;


let scrollDirection =
  "down";


window.addEventListener(
  "scroll",
  () => {

    const currentScrollY =
      window.scrollY;


    if(
      Math.abs(
        currentScrollY -
        lastScrollY
      ) > 2
    ){

      scrollDirection =
        currentScrollY >
        lastScrollY
          ? "down"
          : "up";

    }


    lastScrollY =
      currentScrollY;

  },

  {
    passive:true
  }
);


/* =================================
   ULTRA SMOOTH REVEAL
================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if(
  "IntersectionObserver" in window
){

  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            const element =
              entry.target;


            /* MASUK VIEWPORT */

            if(
              entry.isIntersecting
            ){

              requestAnimationFrame(
                () => {

                  element
                    .classList
                    .add(
                      "visible"
                    );

                }
              );


              return;

            }


            /*
              RESET HANYA BILA
              SUDAH JAUH DARI VIEWPORT
            */

            const rect =
              element
                .getBoundingClientRect();


            /*
              SCROLL KE ATAS
            */

            if(
              scrollDirection === "up" &&
              rect.top >
              window.innerHeight + 140
            ){

              element
                .classList
                .remove(
                  "visible"
                );

            }


            /*
              SCROLL KE BAWAH
            */

            if(
              scrollDirection === "down" &&
              rect.bottom < -140
            ){

              element
                .classList
                .remove(
                  "visible"
                );

            }

          }
        );

      },

      {
        threshold:.08,

        rootMargin:
          "90px 0px 90px 0px"
      }

    );


  revealElements.forEach(
    element => {

      revealObserver.observe(
        element
      );

    }
  );

}else{

  revealElements.forEach(
    element => {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* =================================
   LIVE DEMO
================================= */

const tickerTrack =
  document.getElementById(
    "tickerTrack"
  );


const providerNames =
  games.map(
    game => game.name
  );


function randomNumber(
  min,
  max
){

  return Math.floor(
    Math.random() *
    (max - min + 1)
  ) + min;

}


/* =================================
   MASKED MALAYSIA PHONE
================================= */

function randomMaskedPhone(){

  const prefixes = [

    "010",
    "011",
    "012",
    "013",
    "014",
    "016",
    "017",
    "018",
    "019"

  ];


  const prefix =
    prefixes[
      randomNumber(
        0,
        prefixes.length - 1
      )
    ];


  const last =
    randomNumber(
      1000,
      9999
    );


  return `${prefix}-XXX-${last}`;

}


/* =================================
   PROVIDER SHUFFLE
================================= */

function shuffleArray(array){

  const shuffled =
    [...array];


  for(
    let i =
      shuffled.length - 1;

    i > 0;

    i--
  ){

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    [
      shuffled[i],
      shuffled[j]
    ] = [

      shuffled[j],
      shuffled[i]

    ];

  }


  return shuffled;

}


let providerQueue = [];

let lastProvider = "";


function refillProviderQueue(){

  providerQueue =
    shuffleArray(
      providerNames
    );


  if(
    providerQueue.length > 1 &&
    providerQueue[0] ===
    lastProvider
  ){

    const first =
      providerQueue.shift();


    providerQueue.push(
      first
    );

  }

}


function getNextProvider(){

  if(
    providerQueue.length === 0
  ){

    refillProviderQueue();

  }


  let provider =
    providerQueue.shift();


  if(
    provider === lastProvider &&
    providerQueue.length > 0
  ){

    const replacement =
      providerQueue.shift();


    providerQueue.push(
      provider
    );


    provider =
      replacement;

  }


  lastProvider =
    provider;


  return provider;

}


/* =================================
   JOIN
================================= */

function createJoin(){

  const provider =
    getNextProvider();


  return `

    <div class="transaction join">

      <span class="transaction-type">
        JOIN
      </span>

      <span class="transaction-info">
        ${randomMaskedPhone()}
      </span>

      <span class="transaction-value">
        ${provider}
      </span>

    </div>

  `;

}


/* =================================
   IN AMOUNT
================================= */

function getRandomInAmount(){

  const chance =
    Math.random();


  /*
    15%
    RM10 - RM50
  */

  if(
    chance < .15
  ){

    const smallAmounts = [

      10,
      20,
      30,
      40,
      50

    ];


    return smallAmounts[
      randomNumber(
        0,
        smallAmounts.length - 1
      )
    ];

  }


  /*
    20%
    RM55, RM65, RM75...
  */

  if(
    chance < .35
  ){

    const base =
      randomNumber(
        5,
        49
      ) * 10;


    return base + 5;

  }


  /*
    65%
    RM60, RM70, RM80...
  */

  return (
    randomNumber(
      6,
      50
    ) * 10
  );

}


/* =================================
   IN
================================= */

function createIn(){

  const provider =
    getNextProvider();


  const amount =
    getRandomInAmount();


  return `

    <div class="transaction in">

      <span class="transaction-type">
        IN
      </span>

      <span class="transaction-info">
        ${provider}
      </span>

      <span class="transaction-value">
        RM${amount}
      </span>

    </div>

  `;

}


/* =================================
   OUT
   MINIMUM RM100
   MAXIMUM RM1500
================================= */

function createOut(){

  const provider =
    getNextProvider();


  /*
    OUT tidak akan
    di bawah RM100
  */

  const amount =
    randomNumber(
      100,
      1500
    );


  return `

    <div class="transaction out">

      <span class="transaction-type">
        OUT
      </span>

      <span class="transaction-info">
        ${provider}
      </span>

      <span class="transaction-value">
        RM${amount}
      </span>

    </div>

  `;

}


/* =================================
   TRANSACTION SET
================================= */

function createTransactionSet(){

  let html = "";


  for(
    let i = 0;
    i < 10;
    i++
  ){

    html +=
      createJoin();


    html +=
      createIn();


    html +=
      createOut();

  }


  return html;

}


/* =================================
   SEAMLESS TICKER
================================= */

function generateTransactions(){

  const transactionSet =
    createTransactionSet();


  tickerTrack.innerHTML = `

    <div class="ticker-set">

      ${transactionSet}

    </div>


    <div
      class="ticker-set"
      aria-hidden="true"
    >

      ${transactionSet}

    </div>

  `;

}


/* =================================
   BONUS DATA
================================= */

const bonuses = {

  1:{

    icon:"💳",

    title:
      "Normal Deposit",

    html:`

      <div class="detail-main">

        Tiada Bonus & Turn Over

      </div>


      <div class="detail-note">

        🎮 Semua game boleh main

      </div>

    `

  },


  2:{

    icon:"🎁",

    title:
      "Bonus 30–50%",

    html:`

      <div class="detail-row">

        <span>
          IN 30
        </span>

        <strong>
          Dapat 39
        </strong>

        <b>
          OUT 117
        </b>

      </div>


      <div class="detail-row">

        <span>
          IN 50
        </span>

        <strong>
          Dapat 65
        </strong>

        <b>
          OUT 195
        </b>

      </div>


      <div class="detail-row">

        <span>
          IN 100
        </span>

        <strong>
          Dapat 150
        </strong>

        <b>
          OUT 450
        </b>

      </div>


      <div class="detail-note">

        🎰 Only Slot ×3

      </div>

    `

  },


  3:{

    icon:"💰",

    title:
      "Refund 1 Kali",

    html:`

      <div class="refund-detail-row">

        <span>
          IN 30 kalah
        </span>

        <strong>
          Refund 10
        </strong>

      </div>


      <div class="refund-detail-row">

        <span>
          IN 50 kalah
        </span>

        <strong>
          Refund 20
        </strong>

      </div>


      <div class="refund-detail-row">

        <span>
          IN 100 kalah
        </span>

        <strong>
          Refund 30
        </strong>

      </div>


      <div class="detail-note">

        No Turn Over

        <br>

        🎮 Semua game boleh main

      </div>

    `

  }

};


/* =================================
   BONUS MODAL
================================= */

const bonusModal =
  document.getElementById(
    "bonusModal"
  );


const bonusOverlay =
  document.getElementById(
    "bonusOverlay"
  );


const bonusClose =
  document.getElementById(
    "bonusClose"
  );


const bonusModalTitle =
  document.getElementById(
    "bonusModalTitle"
  );


const popupBonusIcon =
  document.getElementById(
    "popupBonusIcon"
  );


const bonusDetailContent =
  document.getElementById(
    "bonusDetailContent"
  );


document
  .querySelectorAll(
    ".bonus-card"
  )
  .forEach(
    card => {

      card.addEventListener(
        "click",
        function(){

          const bonus =
            bonuses[
              this.dataset.bonus
            ];


          if(!bonus){
            return;
          }


          popupBonusIcon
            .textContent =
              bonus.icon;


          bonusModalTitle
            .textContent =
              bonus.title;


          bonusDetailContent
            .innerHTML =
              bonus.html;


          openModal(
            bonusModal
          );

        }
      );

    }
  );


bonusClose.addEventListener(
  "click",
  () => {

    closeModal(
      bonusModal
    );

  }
);


bonusOverlay.addEventListener(
  "click",
  () => {

    closeModal(
      bonusModal
    );

  }
);


/* =================================
   GAME
================================= */

const gameGrid =
  document.getElementById(
    "gameGrid"
  );


const gameModal =
  document.getElementById(
    "gameModal"
  );


const gameOverlay =
  document.getElementById(
    "gameOverlay"
  );


const gameClose =
  document.getElementById(
    "gameClose"
  );


const modalGameName =
  document.getElementById(
    "modalGameName"
  );


function getShortName(name){

  const upper =
    name.toUpperCase();


  if(
    upper === "GREAT WALL"
  ){
    return "GW";
  }


  if(
    upper === "NEWTOWN"
  ){
    return "NT";
  }


  if(
    upper === "SUNCITY"
  ){
    return "SC";
  }


  if(
    upper === "LIVE22"
  ){
    return "L22";
  }


  if(
    upper === "918KISS H5"
  ){
    return "K-H5";
  }


  if(
    upper === "MEGA H5"
  ){
    return "M-H5";
  }


  return upper
    .replace(
      /\s+/g,
      ""
    )
    .substring(
      0,
      3
    );

}


/* =================================
   CREATE GAME CARDS
================================= */

function createGameCards(){

  gameGrid.innerHTML = "";


  games.forEach(
    (game,index) => {

      const card =
        document.createElement(
          "button"
        );


      card.type =
        "button";


      card.className =
        "game-card reveal-game";


      /*
        SMOOTH STAGGER
      */

      card.style.transitionDelay =
        `${Math.min(
          index * .025,
          .18
        )}s`;


      const shortName =
        getShortName(
          game.name
        );


      card.innerHTML = `

        <div class="game-image-wrap">

          <div class="default-game-logo">

            ${shortName}

          </div>


          <img
            src="${game.image}"
            alt="${game.name}"
            class="game-image"
          >

        </div>


        <h3>
          ${game.name}
        </h3>


        <span>
          PLAY NOW
        </span>

      `;


      const image =
        card.querySelector(
          ".game-image"
        );


      const defaultLogo =
        card.querySelector(
          ".default-game-logo"
        );


      /*
        LOGO BERHASIL LOAD
      */

      image.addEventListener(
        "load",
        () => {

          defaultLogo
            .style
            .display =
              "none";

        }
      );


      /*
        LOGO BELUM ADA
      */

      image.addEventListener(
        "error",
        () => {

          image
            .style
            .display =
              "none";


          defaultLogo
            .style
            .display =
              "flex";

        }
      );


      /*
        OPEN GAME POPUP
      */

      card.addEventListener(
        "click",
        () => {

          modalGameName
            .textContent =
              game.name;


          openModal(
            gameModal
          );

        }
      );


      gameGrid.appendChild(
        card
      );

    }
  );


  observeGameCards();

}


/* =================================
   GAME REVEAL
   SMOOTH + REPEAT
================================= */

function observeGameCards(){

  const cards =
    document.querySelectorAll(
      ".reveal-game"
    );


  if(
    !(
      "IntersectionObserver"
      in window
    )
  ){

    cards.forEach(
      card => {

        card.classList.add(
          "game-visible"
        );

      }
    );


    return;

  }


  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            const card =
              entry.target;


            /*
              MASUK VIEWPORT
            */

            if(
              entry.isIntersecting
            ){

              requestAnimationFrame(
                () => {

                  card
                    .classList
                    .add(
                      "game-visible"
                    );

                }
              );


              return;

            }


            const rect =
              card
                .getBoundingClientRect();


            /*
              SCROLL KE ATAS
            */

            if(
              scrollDirection === "up" &&
              rect.top >
              window.innerHeight + 150
            ){

              card
                .classList
                .remove(
                  "game-visible"
                );

            }


            /*
              SCROLL KE BAWAH
            */

            if(
              scrollDirection === "down" &&
              rect.bottom < -150
            ){

              card
                .classList
                .remove(
                  "game-visible"
                );

            }

          }
        );

      },

      {
        threshold:.05,

        rootMargin:
          "100px 0px 100px 0px"
      }

    );


  cards.forEach(
    card => {

      observer.observe(
        card
      );

    }
  );

}


/* =================================
   GAME MODAL CLOSE
================================= */

gameClose.addEventListener(
  "click",
  () => {

    closeModal(
      gameModal
    );

  }
);


gameOverlay.addEventListener(
  "click",
  () => {

    closeModal(
      gameModal
    );

  }
);


/* =================================
   SMOOTH MODAL OPEN
================================= */

function openModal(modal){

  document
    .querySelectorAll(
      ".modal.active"
    )
    .forEach(
      activeModal => {

        if(
          activeModal !== modal
        ){

          activeModal
            .classList
            .remove(
              "active"
            );

        }

      }
    );


  /*
    Force render sebelum
    animation dimulai
  */

  modal.offsetHeight;


  requestAnimationFrame(
    () => {

      requestAnimationFrame(
        () => {

          modal
            .classList
            .add(
              "active"
            );

        }
      );

    }
  );


  document.body
    .style
    .overflow =
      "hidden";

}


/* =================================
   SMOOTH MODAL CLOSE
================================= */

function closeModal(modal){

  modal
    .classList
    .remove(
      "active"
    );


  window.setTimeout(
    () => {

      const activeModal =
        document.querySelector(
          ".modal.active"
        );


      if(
        !activeModal
      ){

        document.body
          .style
          .overflow =
            "";

      }

    },

    420
  );

}


/* =================================
   ESC CLOSE
================================= */

document.addEventListener(
  "keydown",
  event => {

    if(
      event.key === "Escape"
    ){

      document
        .querySelectorAll(
          ".modal.active"
        )
        .forEach(
          modal => {

            closeModal(
              modal
            );

          }
        );

    }

  }
);


/* =================================
   START WEBSITE
================================= */

generateTransactions();

createGameCards();