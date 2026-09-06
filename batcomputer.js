/* =========================================================
   BATCOMPUTER
   ========================================================= */


/* ---------------------------------------------------------
   ACCESSIBLE REPORTS
   --------------------------------------------------------- */

const ACCESSIBLE = {

  4: {
    date: "12/05/2025",
    attachment: "EXPERIMENT 4-C",

    oracle:
      "REPORT 4 loaded. One associated experiment is available.",

    body: `
      <p>
        <strong>SURFACE ENTRY:</strong>
        22:17
      </p>

      <p>
        <strong>SURFACE EXIT:</strong>
        05:42
      </p>

      <p>
        <strong>DURATION OF TIME BELOW:</strong>
        7 HOURS, 25 MINUTES
      </p>

      <p>
        <strong>ALFRED'S VERIFICATION:</strong>
        6 HOURS, 13 MINUTES
      </p>

      <p>
        This is the prototype report viewer.
        The complete report will be inserted after
        the interface design is finalized.
      </p>
    `
  },


  7: {
    date: "12/12/2025",
    attachment: "ATTACHMENTS AVAILABLE",

    oracle:
      "REPORT 7 loaded. Associated experiments and appendices are available from within the report.",

    body: `
      <p>
        Prototype report viewer for REPORT 7.
      </p>
    `
  },


  19: {
    date: "01/04/2026",
    attachment: "5 APPENDICES",

    oracle:
      "REPORT 19 loaded. Five groups of recovered correspondence are associated with this report. Attachments have been indexed by post office box.",

    body: `
      <p>
        Prototype report viewer for REPORT 19.
      </p>
    `
  },


  23: {
    date: "02/08/2026",
    attachment: "EXPERIMENT AVAILABLE",

    oracle:
      "REPORT 23 loaded. One associated experiment is currently indexed.",

    body: `
      <p>
        Prototype report viewer for REPORT 23.
      </p>
    `
  },


  56: {
    date: "04/01/2026",
    attachment: null,

    oracle:
      "REPORT 56 loaded. No associated attachments are currently available.",

    body: `
      <p>
        Prototype report viewer for REPORT 56.
      </p>
    `
  }

};



/* ---------------------------------------------------------
   PAGE ELEMENTS
   --------------------------------------------------------- */

const loginScreen =
  document.getElementById("loginScreen");

const archiveScreen =
  document.getElementById("archiveScreen");

const loginForm =
  document.getElementById("loginForm");

const authenticateButton =
  document.getElementById("authenticateButton");

const passwordDisplay =
  document.getElementById("passwordDisplay");

const passwordStatus =
  document.getElementById("passwordStatus");

const authSequence =
  document.getElementById("authSequence");

const deviceStatus =
  document.getElementById("deviceStatus");

const biometricStatus =
  document.getElementById("biometricStatus");

const clearanceStatus =
  document.getElementById("clearanceStatus");

const accessStatus =
  document.getElementById("accessStatus");

const bootSequence =
  document.getElementById("bootSequence");

const contentArea =
  document.getElementById("contentArea");

const oracleMessage =
  document.getElementById("oracleMessage");

const addressBar =
  document.getElementById("addressBar");

const backButton =
  document.getElementById("backButton");

const homeButton =
  document.getElementById("homeButton");



/* ---------------------------------------------------------
   NAVIGATION HISTORY
   --------------------------------------------------------- */

let historyStack = [];

let currentView = {
  type: "logs"
};



/* ---------------------------------------------------------
   AUTOMATIC PASSWORD ENTRY

   The reader never learns Batman's password.
   The dots simply appear as though he is typing it.
   --------------------------------------------------------- */

const passwordLength = 16;

let typedCharacters = 0;


function typePassword() {

  if (
    typedCharacters < passwordLength
  ) {

    typedCharacters++;

    passwordDisplay.textContent =
      "•".repeat(typedCharacters);

    setTimeout(
      typePassword,
      85
    );

  }

  else {

    passwordStatus.textContent =
      "CREDENTIALS ENTERED";

    passwordStatus.classList.add(
      "password-ready"
    );

    authenticateButton.disabled =
      false;

    authenticateButton.classList.add(
      "authenticate-ready"
    );

  }

}



/* start password sequence shortly after page loads */

setTimeout(
  typePassword,
  650
);



/* ---------------------------------------------------------
   AUTHENTICATE BUTTON
   --------------------------------------------------------- */

authenticateButton.addEventListener(
  "click",
  function () {

    authenticateButton.disabled =
      true;

    loginForm.classList.add(
      "hidden"
    );

    authSequence.classList.remove(
      "hidden"
    );

    runAuthenticationSequence();

  }
);



/* ---------------------------------------------------------
   AUTHENTICATION SEQUENCE
   --------------------------------------------------------- */

function runAuthenticationSequence() {


  deviceStatus.textContent =
    "CHECKING...";

  biometricStatus.textContent =
    "PENDING";

  clearanceStatus.textContent =
    "PENDING";

  accessStatus.textContent =
    "PENDING";



  /* DEVICE */

  setTimeout(
    function () {

      deviceStatus.textContent =
        "RECOGNIZED";

      deviceStatus.classList.add(
        "auth-success"
      );

    },
    500
  );



  /* BIOMETRIC */

  setTimeout(
    function () {

      biometricStatus.textContent =
        "VERIFIED";

      biometricStatus.classList.add(
        "auth-success"
      );

    },
    1050
  );



  /* CLEARANCE */

  setTimeout(
    function () {

      clearanceStatus.textContent =
        "ROOT";

      clearanceStatus.classList.add(
        "auth-success"
      );

    },
    1600
  );



  /* ACCESS */

  setTimeout(
    function () {

      accessStatus.textContent =
        "GRANTED";

      accessStatus.classList.add(
        "auth-success"
      );

    },
    2150
  );



  /* BOOT */

  setTimeout(
    function () {

      bootSequence.classList.remove(
        "hidden"
      );

    },
    2600
  );



  /* OPEN ARCHIVE */

  setTimeout(
    function () {

      loginScreen.classList.add(
        "hidden"
      );

      archiveScreen.classList.remove(
        "hidden"
      );

      showLogs(false);

    },
    4000
  );

}



/* ---------------------------------------------------------
   BACK BUTTON
   --------------------------------------------------------- */

backButton.addEventListener(
  "click",
  function () {

    const previous =
      historyStack.pop();

    if (!previous) {
      return;
    }

    renderView(
      previous,
      false
    );

  }
);



/* ---------------------------------------------------------
   HOME BUTTON
   --------------------------------------------------------- */

homeButton.addEventListener(
  "click",
  function () {

    showLogs(true);

  }
);



/* ---------------------------------------------------------
   ORACLE
   --------------------------------------------------------- */

function setOracle(paragraphs) {

  oracleMessage.innerHTML =
    paragraphs
      .map(
        paragraph =>
          `<p>${paragraph}</p>`
      )
      .join("");

}



/* ---------------------------------------------------------
   OPEN LOGS
   --------------------------------------------------------- */

function showLogs(
  pushHistory = true
) {

  renderView(
    {
      type: "logs"
    },
    pushHistory
  );

}



/* ---------------------------------------------------------
   OPEN REPORT
   --------------------------------------------------------- */

function openReport(number) {

  renderView(
    {
      type: "report",
      number: number
    },
    true
  );

}



/* ---------------------------------------------------------
   RENDER VIEW
   --------------------------------------------------------- */

function renderView(
  view,
  pushHistory = true
) {

  if (pushHistory) {

    historyStack.push(
      currentView
    );

  }


  currentView = view;


  if (
    view.type === "logs"
  ) {

    renderLogs();

    return;

  }


  if (
    view.type === "report"
  ) {

    renderReport(
      view.number
    );

  }

}



/* ---------------------------------------------------------
   EXPEDITION LOG DIRECTORY
   --------------------------------------------------------- */

function renderLogs() {


  addressBar.textContent =
    "BATCOMPUTER / CASE_FILES / COURT_OF_OWLS / EXPEDITION_LOGS";


  let rows = "";


  for (
    let i = 1;
    i <= 69;
    i++
  ) {


    const report =
      ACCESSIBLE[i];


    if (report) {


      rows += `

        <tr
          class="file-open"
          data-report="${i}"
        >

          <td>

            ▣

            <button type="button">
              REPORT_${String(i).padStart(2, "0")}
            </button>

          </td>


          <td>
            ${report.date}
          </td>


          <td>

            AVAILABLE

            ${
              report.attachment

                ? `
                  <span class="attachment-mark">
                    [+]
                  </span>
                `

                : ""
            }

          </td>

        </tr>

      `;


    }


    else {


      rows += `

        <tr class="file-disabled">

          <td>
            □ REPORT_${String(i).padStart(2, "0")}
          </td>

          <td>
            --/--/----
          </td>

          <td>
            RESTRICTED
          </td>

        </tr>

      `;

    }

  }



  contentArea.innerHTML = `

    <h1 class="archive-title">
      EXPEDITION LOGS
    </h1>


    <p class="archive-meta">
      69 FILES
      &nbsp; | &nbsp;
      5 AVAILABLE DURING CURRENT SESSION
    </p>


    <table class="file-table">

      <thead>

        <tr>
          <th>FILE</th>
          <th>DATE</th>
          <th>STATUS</th>
        </tr>

      </thead>


      <tbody>
        ${rows}
      </tbody>

    </table>

  `;



  document
    .querySelectorAll(
      ".file-open"
    )
    .forEach(
      row => {

        row.addEventListener(
          "click",
          function () {

            openReport(
              Number(
                this.dataset.report
              )
            );

          }
        );

      }
    );



  setOracle([

    "<strong>ORACLE:</strong> Welcome back, Batman.",

    "I'm ORACLE, the Batcomputer's virtual assistant. I can locate reports, retrieve attachments, and help navigate the archive.",

    "Think of me as a sexier Clippy. With a better firewall.",

    "69 expedition reports indexed. ...Nice.",

    "Five files are accessible. I've highlighted them in blue. Select a report to open it."

  ]);

}



/* ---------------------------------------------------------
   REPORT VIEWER
   --------------------------------------------------------- */

function renderReport(number) {


  const report =
    ACCESSIBLE[number];


  if (!report) {
    return;
  }



  addressBar.textContent =

    "BATCOMPUTER / CASE_FILES / COURT_OF_OWLS / " +

    "EXPEDITION_LOGS / REPORT_" +

    String(number)
      .padStart(2, "0");



  const attachment =

    report.attachment

      ? `

        <div class="attachments">

          <h3>
            ATTACHMENTS
          </h3>

          <button
            class="attachment-button"
            type="button"
            id="attachmentButton"
          >

            ⌕ ${report.attachment}

          </button>

        </div>

      `

      : "";



  contentArea.innerHTML = `

    <article class="report">


      <header class="report-header">

        <h2>
          REPORT ${number}
        </h2>


        <div class="report-id">

          FILE:
          EXPEDITION_LOG_${String(number).padStart(3, "0")}

        </div>

      </header>



      <div class="report-body">


        <p>

          <strong>
            DATE:
          </strong>

          ${report.date}

        </p>


        ${report.body}


        ${attachment}


      </div>


    </article>

  `;



  const attachmentButton =
    document.getElementById(
      "attachmentButton"
    );


  if (
    attachmentButton
  ) {

    attachmentButton.addEventListener(
      "click",
      function () {

        alert(
          "Attachment viewer will be added next."
        );

      }
    );

  }



  setOracle([

    `<strong>ORACLE:</strong> ${report.oracle}`

  ]);

}
