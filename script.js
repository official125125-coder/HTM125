/* =================================
   GAME DATA
================================= */

const games = [

  {
    name:"918KISS",
    image:"./images/918kiss.png?v=3"
  },

  {
    name:"MEGA888",
    image:"./images/mega888.png?v=3"
  },

  {
    name:"EVO888",
    image:"./images/evo888.png?v=3"
  },

  {
    name:"PUSSY888",
    image:"./images/pussy888.png?v=3"
  },

  {
    name:"918KAYA",
    image:"./images/918kaya.png?v=3"
  },

  {
    name:"NEWTOWN",
    image:"./images/newtown.png?v=3"
  },

  {
    name:"SUNCITY",
    image:"./images/suncity.png?v=3"
  },

  {
    name:"WWBET",
    image:"./images/wwbet.png?v=3"
  },

  {
    name:"ACE333",
    image:"./images/ace333.png?v=3"
  },

  {
    name:"LIVE22",
    image:"./images/live22.png?v=3"
  },

  {
    name:"JOKER",
    image:"./images/joker.png?v=3"
  },

  {
    name:"918KISS H5",
    image:"./images/918kiss-h5.png?v=3"
  },

  {
    name:"GREAT WALL",
    image:"./images/greatwall.png?v=3"
  },

  {
    name:"MEGA H5",
    image:"./images/mega-h5.png?v=3"
  }

];


/* HEADER */

const header =
  document.getElementById(
    "header"
  );


function updateHeader(){

  if(
    window.scrollY > 20
  ){

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


/* SCROLL */

let lastScrollY =
  window.scrollY;


let scrollDirection =
  "down";


window.addEventListener(
  "scroll",
  () => {

    const current =
      window.scrollY;


    if(
      Math.abs(
        current - lastScrollY
      ) > 2
    ){

      scrollDirection =
        current > lastScrollY
          ? "down"
          : "up";

    }


    lastScrollY =
      current;

  },
  {
    passive:true
  }
);


/* REVEAL */

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


            if(
              entry.isIntersecting
            ){

              element.classList.add(
                "visible"
              );


              return;

            }


            const rect =
              element.getBoundingClientRect();


            if(
              scrollDirection === "up" &&
              rect.top >
              window.innerHeight + 140
            ){

              element.classList.remove(
                "visible"
              );

            }


            if(
              scrollDirection === "down" &&
              rect.bottom < -140
            ){

              element.classList.remove(
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


/* LIVE DEMO */

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


  return `${prefix}-XXX-${randomNumber(
    1000,
    9999
  )}`;

}


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
    providerQueue[0] === lastProvider
  ){

    providerQueue.push(
      providerQueue.shift()
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


function createJoin(){

  return `

    <div class="transaction join">

      <span class="transaction-type">
        JOIN
      </span>

      <span class="transaction-info">
        ${randomMaskedPhone()}
      </span>

      <span class="transaction-value">
        ${getNextProvider()}
      </span>

    </div>

  `;

}


function getRandomInAmount(){

  const chance =
    Math.random();


  if(
    chance < .15
  ){

    const amounts = [
      10,
      20,
      30,
      40,
      50
    ];


    return amounts[
      randomNumber(
        0,
        amounts.length - 1
      )
    ];

  }


  if(
    chance < .35
  ){

    return (
      randomNumber(
        5,
        49
      ) * 10
    ) + 5;

  }


  return (
    randomNumber(
      6,
      50
    ) * 10
  );

}


function createIn(){

  return `

    <div class="transaction in">

      <span class="transaction-type">
        IN
      </span>

      <span class="transaction-info">
        ${getNextProvider()}
      </span>

      <span class="transaction-value">
        RM${getRandomInAmount()}
      </span>

    </div>

  `;

}


function createOut(){

  return `

    <div class="transaction out">

      <span class="transaction-type">
        OUT
      </span>

      <span class="transaction-info">
        ${getNextProvider()}
      </span>

      <span class="transaction-value">
        RM${randomNumber(
          100,
          1500
        )}
      </span>

    </div>

  `;

}


function createTransactionSet(){

  let html = "";


  for(
    let i = 0;
    i < 10;
    i++
  ){

    html += createJoin();

    html += createIn();

    html += createOut();

  }


  return html;

}


function generateTransactions(){

  const set =
    createTransactionSet();


  tickerTrack.innerHTML = `

    <div class="ticker-set">
      ${set}
    </div>

    <div
      class="ticker-set"
      aria-hidden="true"
    >
      ${set}
    </div>

  `;

}


/* BONUS */

const bonuses = {

  1:{

    icon:"💳",

    title:"Normal Deposit",

    html:`

      <div class="detail-main">
        No Bonus & No Turnover
      </div>

      <div class="detail-note">
        🎮 All games are available
      </div>

    `

  },


  2:{

    icon:"🎁",

    title:"Bonus 30–50%",

    html:`

      <div class="detail-row">

        <span>
          Deposit RM30
        </span>

        <strong>
          Receive RM39
        </strong>

        <b>
          Cash Out RM117
        </b>

      </div>


      <div class="detail-row">

        <span>
          Deposit RM50
        </span>

        <strong>
          Receive RM65
        </strong>

        <b>
          Cash Out RM195
        </b>

      </div>


      <div class="detail-row">

        <span>
          Deposit RM100
        </span>

        <strong>
          Receive RM150
        </strong>

        <b>
          Cash Out RM450
        </b>

      </div>


      <div class="detail-note">
        🎰 Slots Only ×3
      </div>

    `

  },


  3:{

    icon:"💰",

    title:"One-Time Refund",

    html:`

      <div class="refund-detail-row">

        <span>
          Deposit RM30 Lost
        </span>

        <strong>
          Refund RM10
        </strong>

      </div>


      <div class="refund-detail-row">

        <span>
          Deposit RM50 Lost
        </span>

        <strong>
          Refund RM20
        </strong>

      </div>


      <div class="refund-detail-row">

        <span>
          Deposit RM100 Lost
        </span>

        <strong>
          Refund RM30
        </strong>

      </div>


      <div class="detail-note">

        No Turnover

        <br>

        🎮 All games are available

      </div>

    `

  }

};


const bonusModal =
  document.getElementById(
    "bonusModal"
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


        document
        .getElementById(
          "popupBonusIcon"
        )
        .textContent =
          bonus.icon;


        document
        .getElementById(
          "bonusModalTitle"
        )
        .textContent =
          bonus.title;


        document
        .getElementById(
          "bonusDetailContent"
        )
        .innerHTML =
          bonus.html;


        openModal(
          bonusModal
        );

      }
    );

  }
);


document
.getElementById(
  "bonusClose"
)
.addEventListener(
  "click",
  () => {

    closeModal(
      bonusModal
    );

  }
);


document
.getElementById(
  "bonusOverlay"
)
.addEventListener(
  "click",
  () => {

    closeModal(
      bonusModal
    );

  }
);


/* MEMBER REWARD */

const rewards = {

  daily:{

    icon:"📅",

    title:"Daily Cash Rebate",

    html:`

      <div class="reward-intro">

        Every top-up earns
        <strong>
          Lucky Duit Points
        </strong>.

      </div>


      <div class="reward-highlight">

        Once you reach

        <strong>
          4,000 Lucky Duit Points
        </strong>,

        you can exchange them for

        <strong>
          RM20 credit
        </strong>

        into your game ID.

      </div>


      <div class="reward-detail-row">

        <span>
          4,000 Points
        </span>

        <strong>
          RM20 ID Credit
        </strong>

      </div>


      <div class="reward-highlight">

        When your points reach

        <strong>
          5,000 or more
        </strong>,

        you can claim the available
        cash reward based on your
        point balance.

      </div>


      <div class="reward-detail-row">

        <span>
          5,000 Points
        </span>

        <strong>
          RM12 Cash
        </strong>

      </div>


      <div class="reward-detail-row">

        <span>
          10,000 Points
        </span>

        <strong>
          RM25 Cash
        </strong>

      </div>


      <div class="reward-detail-row">

        <span>
          20,000 Points
        </span>

        <strong>
          RM50 Cash
        </strong>

      </div>


      <div class="reward-detail-row">

        <span>
          50,000 Points
        </span>

        <strong>
          RM125 Cash
        </strong>

      </div>


      <div class="claim-limit">

        <span class="claim-limit-title">
          Lucky Duit Claim Point
        </span>


        <div class="claim-limit-grid">

          <div class="claim-limit-box">

            <span>
              MIN OUT
            </span>

            <strong>
              RM100
            </strong>

          </div>


          <div class="claim-limit-box">

            <span>
              MAX OUT
            </span>

            <strong>
              RM388
            </strong>

          </div>

        </div>

      </div>

    `

  },


  weekly:{

    icon:"🎁",

    title:"Weekly Random Bonus",

    html:`

      <div class="reward-intro">

        The Weekly Random Bonus is a

        <strong>
          weekly rebate reward
        </strong>

        for eligible HTM125 members.

      </div>


      <div class="reward-time">
        📅 Claim every Sunday
      </div>


      <div class="reward-time">
        ⏰ 11:00 AM – 11:00 PM
      </div>


      <div class="reward-highlight">

        Members can check their rebate
        points through the special link
        provided by HTM125 Customer Service.

      </div>

    `

  },


  friend:{

    icon:"👥",

    title:"Weekly Friend Bonus",

    html:`

      <div class="reward-intro">

        The Weekly Friend Bonus rewards
        members who refer active players
        to HTM125.

      </div>


      <div class="reward-highlight">

        When your referred members
        continue to play and remain active,
        you can earn

        <strong>
          Friend Bonus Points
        </strong>.

      </div>


      <div class="reward-time">
        📅 Claim every Saturday
      </div>


      <div class="reward-time">
        ⏰ 11:00 AM – 11:00 PM
      </div>

    `

  },


  refer:{

    icon:"🤝",

    title:"Referral Bonus 20%",

    html:`

      <div class="reward-intro">

        Refer a new member to HTM125
        and receive a

        <strong>
          20% referral bonus
        </strong>

        from their first top-up.

      </div>


      <div class="reward-highlight">

        This bonus applies only to the
        referred member's

        <strong>
          first top-up
        </strong>

        and can only be claimed

        <strong>
          once per referred member
        </strong>.

      </div>


      <div class="reward-example">

        <strong>
          Example
        </strong>

        <br><br>

        First Top-Up:

        <strong>
          RM300
        </strong>

        <br>

        Referral Bonus 20%:

        <strong>
          RM60
        </strong>

      </div>

    `

  }

};


const rewardModal =
  document.getElementById(
    "rewardModal"
  );


document
.querySelectorAll(
  ".reward-card[data-reward]"
)
.forEach(
  card => {

    card.addEventListener(
      "click",
      function(){

        const reward =
          rewards[
            this.dataset.reward
          ];


        if(!reward){
          return;
        }


        document
        .getElementById(
          "rewardIcon"
        )
        .textContent =
          reward.icon;


        document
        .getElementById(
          "rewardTitle"
        )
        .textContent =
          reward.title;


        document
        .getElementById(
          "rewardContent"
        )
        .innerHTML =
          reward.html;


        openModal(
          rewardModal
        );

      }
    );

  }
);


document
.getElementById(
  "rewardClose"
)
.addEventListener(
  "click",
  () => {

    closeModal(
      rewardModal
    );

  }
);


document
.getElementById(
  "rewardOverlay"
)
.addEventListener(
  "click",
  () => {

    closeModal(
      rewardModal
    );

  }
);


/* GAME */

const gameGrid =
  document.getElementById(
    "gameGrid"
  );


const gameModal =
  document.getElementById(
    "gameModal"
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


function createGameCards(){

  gameGrid.innerHTML =
    "";


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


      card.style.transitionDelay =
        `${Math.min(
          index * .025,
          .18
        )}s`;


      const short =
        getShortName(
          game.name
        );


      card.innerHTML = `

        <div class="game-image-wrap">

          <div class="default-game-logo">
            ${short}
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


      const fallback =
        card.querySelector(
          ".default-game-logo"
        );


      image.addEventListener(
        "load",
        () => {

          fallback.style.display =
            "none";

        }
      );


      image.addEventListener(
        "error",
        () => {

          image.style.display =
            "none";


          fallback.style.display =
            "flex";

        }
      );


      card.addEventListener(
        "click",
        () => {

          modalGameName.textContent =
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

            if(
              entry.isIntersecting
            ){

              entry.target
              .classList
              .add(
                "game-visible"
              );

            }

          }
        );

      },

      {
        threshold:.05,

        rootMargin:
          "100px 0px"
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


document
.getElementById(
  "gameClose"
)
.addEventListener(
  "click",
  () => {

    closeModal(
      gameModal
    );

  }
);


document
.getElementById(
  "gameOverlay"
)
.addEventListener(
  "click",
  () => {

    closeModal(
      gameModal
    );

  }
);


/* MODAL */

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

        activeModal.classList.remove(
          "active"
        );

      }

    }
  );


  requestAnimationFrame(
    () => {

      modal.classList.add(
        "active"
      );

    }
  );


  document.body.style.overflow =
    "hidden";

}


function closeModal(modal){

  modal.classList.remove(
    "active"
  );


  setTimeout(
    () => {

      if(
        !document.querySelector(
          ".modal.active"
        )
      ){

        document.body.style.overflow =
          "";

      }

    },
    350
  );

}


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


/* START */

generateTransactions();

createGameCards();
