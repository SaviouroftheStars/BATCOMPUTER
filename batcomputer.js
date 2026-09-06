/* =========================================================
   BATCOMPUTER
   ========================================================= */


/* ---------------------------------------------------------
   ACCESSIBLE REPORTS
   --------------------------------------------------------- */

const ACCESSIBLE = {

  4: {
    date: "12/05/2025",
    attachment: null,

    oracle:
      "REPORT 04 loaded. One restricted location notice detected. Associated files have been manually deleted."
  },


  7: {
    date: "12/12/2025",
    attachment: "ATTACHMENTS AVAILABLE",

    oracle:
      "REPORT 07 loaded. Associated experiments and appendices are available from within the report.",

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

let oracleIntroduced = false;



/* ---------------------------------------------------------
   AUTOMATIC PASSWORD ENTRY
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


  setTimeout(
    function () {

      bootSequence.classList.remove(
        "hidden"
      );

    },
    2600
  );


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



  if (!oracleIntroduced) {

    setOracle([

      "<strong>ORACLE:</strong> Welcome back, Batman.",

      "I'm ORACLE, the Batcomputer's virtual assistant. I can locate reports, retrieve attachments, and help navigate the archive.",

      "Think of me as a sexier Clippy. With a better firewall.",

      "Sixty-nine expedition reports indexed. Five are accessible. I've highlighted them in blue. Select a report to open it."

    ]);

    oracleIntroduced = true;

  }

  else {

    setOracle([

      "<strong>ORACLE:</strong> Expedition logs loaded.",

      "Five files are accessible."

    ]);

  }

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



  /* Report 04 gets its complete custom viewer */

  if (
    number === 4
  ) {

    renderReport04();

    setOracle([

      "<strong>ORACLE:</strong> REPORT 04 loaded.",

      "One restricted location notice detected. Associated telemetry has been manually deleted."

    ]);

    return;

  }



  /* Other reports remain prototypes for now */

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
          <strong>DATE:</strong>
          ${report.date}
        </p>

        ${report.body}

        ${attachment}

      </div>

    </article>

  `;



  setOracle([

    `<strong>ORACLE:</strong> ${report.oracle}`

  ]);

}



/* =========================================================
   REPORT 04
   ========================================================= */

function renderReport04() {

  contentArea.innerHTML = `

    <article class="report report-04">


      <!-- REPORT HEADER -->

      <header class="report-header">

        <h2>
          REPORT 4
        </h2>

        <div class="report-id">
          FILE: EXPEDITION_LOG_004
        </div>

      </header>



      <div class="report-body">


        <!-- =================================================
             FIELD METADATA
             ================================================= -->

        <section class="report-section">

          <div class="report-grid">

            <div class="report-field">
              <span class="field-label">DATE</span>
              <span class="field-value">12/05/2025</span>
            </div>

            <div class="report-field">
              <span class="field-label">SURFACE ENTRY</span>
              <span class="field-value">22:17</span>
            </div>

            <div class="report-field">
              <span class="field-label">SURFACE EXIT</span>
              <span class="field-value">05:42</span>
            </div>

            <div class="report-field">
              <span class="field-label">DURATION OF TIME BELOW</span>
              <span class="field-value">7 HOURS, 25 MINUTES</span>
            </div>

            <div class="report-field">
              <span class="field-label">ALFRED'S VERIFICATION</span>
              <span class="field-value">6 HOURS, 13 MINUTES</span>
            </div>

          </div>

        </section>



        <!-- =================================================
             ROUTE
             ================================================= -->

        <section class="report-section">

          <div class="section-heading">
            ROUTE
          </div>

          <div class="route-line">

            MANOR ACCESS

            <span class="route-arrow">→</span>

            EASTERN CORRIDOR

            <span class="route-arrow">→</span>

            JUNCTION 14

            <span class="route-arrow">→</span>

            THE ABYSS

            <span class="route-arrow">→</span>

            MINIATURE GOTHAM

            <span class="route-arrow">→</span>

            HALL OF MIRRORS

            <span class="route-arrow">→</span>

            <span class="inline-redaction">
              REDACTED
            </span>

            <span class="route-arrow">→</span>

            EXIT (VIA WAYNE TOWER)

          </div>


          <div class="report-note">

            <p>
              <em>
                R. GRAYSON provided route navigation via achilloron thread.
              </em>
            </p>

            <p>
              <em>
                R. Grayson provided accompaniment from Hall of Mirrors to Exit.
              </em>
            </p>

          </div>

        </section>



        <!-- =================================================
             EXTRACTION
             ================================================= -->

        <section class="report-section">

          <div class="section-heading">
            NO EXTRACTION OPPORTUNITIES PRESENTED FOR
          </div>

          <ul class="extraction-list">
            <li>D. WAYNE</li>
            <li>T. DRAKE</li>
            <li>J. TODD</li>
            <li>R. GRAYSON</li>
          </ul>

        </section>



        <!-- =================================================
             MINIATURE GOTHAM
             ================================================= -->

        <section class="report-section">

          <div class="section-heading">
            NEW AREAS EXPLORED
          </div>

          <p>
            MINIATURE GOTHAM
          </p>


          <div class="subheading">
            ESTIMATED DIMENSIONS
          </div>

          <p class="report-muted">
            <em>
              Estimated from the dimensions of Wayne Manor's Grand ballroom
            </em>
          </p>


          <div class="measurement-grid">

            <div>
              <span>LENGTH</span>
              <strong>130 FT</strong>
            </div>

            <div>
              <span>WIDTH</span>
              <strong>75 FT</strong>
            </div>

            <div>
              <span>SQUARE FOOTAGE</span>
              <strong>9,750 SQ FT</strong>
            </div>

          </div>

        </section>



        <!-- =================================================
             ARCHITECTURAL NOTES
             ================================================= -->

        <section class="report-section">

          <div class="section-heading">
            ARCHITECTURAL NOTES
          </div>

          <ul>
            <li>
              Contained a scaled representation of Gotham City
            </li>

            <li>
              Building exhibit details exceeding visible scale limitations
            </li>
          </ul>

        </section>



        <!-- =================================================
             OBSERVATIONS
             ================================================= -->

        <section class="report-section">

          <div class="section-heading">
            OBSERVATIONS
          </div>

          <ul>

            <li>
              Model corresponds to city layout approximates 25 years old as gifted by P. WAYNE
            </li>

            <li>
              Wayne Tower missing 13th Guardian
            </li>

            <li>
              Model had no accumulation of dust
            </li>

            <li>
              Model components — trains, subway lines, street lights have no apparent electrical source or stored battery.
            </li>

            <li>
              No on/off switch located
            </li>

          </ul>

        </section>



        <!-- =================================================
             RESTRICTED LOCATION
             ================================================= -->

        <section class="restricted-location">

          <div class="restricted-heading">
            RESTRICTED LOCATION NOTICE
          </div>


          <p>
            Location Designation:
            <span class="restricted-value">
              [RESTRICTED]
            </span>
          </p>


          <ul>

            <li>
              All Cowl audio-visual recordings associated with location manually deleted.
            </li>

            <li>
              Automatic cloud backup disabled prior to deletion.
            </li>

            <li>
              Local backup deleted.
            </li>

            <li>
              GPS/Spatial Mapping Data deleted
            </li>

            <li>
              Written observations removed from file.
            </li>

            <li>
              No copies authorized
            </li>

          </ul>



          <div class="restricted-data-grid">

            <div>
              <span>ENTRY</span>
              <strong>04:27:14</strong>
            </div>

            <div>
              <span>EXIT</span>
              <strong>05:03:43</strong>
            </div>

            <div>
              <span>ELAPSED TIME</span>
              <strong>36 MINUTES, 29 SECONDS</strong>
            </div>

            <div>
              <span>AUDIO</span>
              <strong class="deleted-data">
                MANUALLY DELETED
              </strong>
            </div>

            <div>
              <span>VIDEO</span>
              <strong class="deleted-data">
                MANUALLY DELETED
              </strong>
            </div>

            <div>
              <span>TRANSCRIPT</span>
              <strong class="deleted-data">
                MANUALLY DELETED
              </strong>
            </div>

            <div>
              <span>LOCATION DATA</span>
              <strong class="deleted-data">
                MANUALLY DELETED
              </strong>
            </div>

            <div>
              <span>HEART RATE UPON ENTRY</span>
              <strong>65 BPM</strong>
            </div>

            <div>
              <span>MAXIMUM RECORDED HEART RATE</span>
              <strong>184 BPM</strong>
            </div>

            <div>
              <span>HEART RATE ON EXIT</span>
              <strong>87 BPM</strong>
            </div>

          </div>

        </section>



        <!-- =================================================
             EXPERIMENT 4-C
             ================================================= -->

        <section class="experiment-section">

          <div class="experiment-kicker">
            EXPERIMENT PERFORMED
          </div>

          <h3>
            4-C
          </h3>


          <div class="experiment-intro">

            <p>
              <strong>OBJECTIVE:</strong>
              <em>
                determine whether dimensions remain constant
              </em>
            </p>

            <p>
              <strong>METHOD:</strong>
              <em>
                Laser rangefinder measurements conducted from seven positions
              </em>
            </p>

          </div>



          <div class="section-heading">
            RESULTS
          </div>



          <div class="attempt">

            <div class="attempt-heading">
              ATTEMPT 1
            </div>

            <div class="attempt-grid">

              <span>LENGTH</span>
              <strong>127.8 FT</strong>

              <span>WIDTH</span>
              <strong>76.3 FT</strong>

              <span>SQUARE FOOTAGE</span>
              <strong>9,751 SQ FT</strong>

            </div>

          </div>



          <div class="attempt">

            <div class="attempt-heading">
              ATTEMPT 2
            </div>

            <div class="attempt-grid">

              <span>LENGTH</span>
              <strong>132.4 FT</strong>

              <span>WIDTH</span>
              <strong>73.9 FT</strong>

              <span>SQUARE FOOTAGE</span>
              <strong>9,784 SQ FT</strong>

            </div>

          </div>



          <div class="attempt">

            <div class="attempt-heading">
              ATTEMPT 3
            </div>

            <div class="attempt-grid">

              <span>LENGTH</span>
              <strong>119.6 FT</strong>

              <span>WIDTH</span>
              <strong>82.7 FT</strong>

              <span>SQUARE FOOTAGE</span>
              <strong>9,891 SQ FT</strong>

            </div>

          </div>



          <div class="attempt">

            <div class="attempt-heading">
              ATTEMPT 4
            </div>

            <div class="attempt-grid">

              <span>LENGTH</span>
              <strong>164.2 FT</strong>

              <span>WIDTH</span>
              <strong>61.FT</strong>

              <span>SQUARE FOOTAGE</span>
              <strong>10,033 SQ FT</strong>

            </div>

          </div>



          <div class="attempt">

            <div class="attempt-heading">
              ATTEMPT 5
            </div>

            <div class="attempt-grid">

              <span>LENGTH</span>
              <strong>∞</strong>

              <span>WIDTH</span>
              <strong>MEASUREMENT FAILED</strong>

              <span>SQUARE FOOTAGE</span>
              <strong>INCONCLUSIVE</strong>

            </div>

          </div>



          <div class="attempt">

            <div class="attempt-heading">
              ATTEMPT 6
            </div>

            <div class="attempt-grid">

              <span>LENGTH</span>
              <strong>THIRTEEN</strong>

              <span>WIDTH</span>
              <strong>THIRTEEN</strong>

              <span>SQUARE FOOTAGE</span>
              <strong>THIRTEEN</strong>

            </div>

          </div>



          <div class="attempt">

            <div class="attempt-heading">
              ATTEMPT 7
            </div>

            <div class="attempt-grid attempt-corrupted">

              <span>LENGTH</span>
              <strong>HCRAM NLOCNIL OLLEH</strong>

              <span>WIDTH</span>
              <strong>: HƎ⅂⅂O ꓕHOϺ∀S Ϻ∀⅄NƎ ᒋꓤ˙</strong>

              <span>SQUARE FOOTAGE</span>
              <strong>HELLO BRUCE WAYNE</strong>

            </div>

          </div>



          <div class="attempt">

            <div class="attempt-heading">
              ATTEMPT 8
            </div>

            <div class="attempt-grid">

              <span>LENGTH</span>
              <strong>124.8 FT</strong>

              <span>WIDTH</span>
              <strong>72.3 FT</strong>

              <span>SQUARE FOOTAGE</span>
              <strong>9,023.04 SQ FT</strong>

            </div>

          </div>



          <div class="summary-findings">

            <div class="section-heading">
              SUMMARY OF FINDINGS
            </div>

            <p>
              <em>
                Results inconsistent. Attempts 1–4 produced contradictory measurements. Attempt 5 produced a result outside known operational parameters of equipment. Attempts 6–7 could not be replicated.
              </em>
            </p>

            <p>
              <em>
                Rangefinder inspected upon return to surface.
              </em>
            </p>

            <p>
              <em>
                No malfunction identified.
              </em>
            </p>

          </div>

        </section>


      </div>

    </article>

  `;

}
