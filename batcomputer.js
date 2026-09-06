/* =========================================================
   BATCOMPUTER
   ========================================================= */


/* ---------------------------------------------------------
   ACCESSIBLE REPORTS
   --------------------------------------------------------- */

const ACCESSIBLE = {

  4: {
    date: "12/05/2025",
    attachment: null
  },

  7: {
    date: "12/12/2025",
    attachment: "APPENDIX C"
  },

  19: {
    date: "01/04/2026",
    attachment: "5 APPENDICES"
  },

  23: {
    date: "02/08/2026",
    attachment: "EXPERIMENT AVAILABLE"
  },

  56: {
    date: "04/01/2026",
    attachment: null
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
   STATE
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

  if (typedCharacters < passwordLength) {

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
   AUTHENTICATE
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
   NAVIGATION
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
   VIEW HELPERS
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


function openReport(number) {

  renderView(
    {
      type: "report",
      number: number
    },
    true
  );

}


function openAttachment(
  report,
  attachment
) {

  renderView(
    {
      type: "attachment",
      report: report,
      attachment: attachment
    },
    true
  );

}



/* ---------------------------------------------------------
   VIEW ROUTER
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


  if (view.type === "logs") {

    renderLogs();

    return;

  }


  if (view.type === "report") {

    renderReport(
      view.number
    );

    return;

  }


  if (view.type === "attachment") {

    renderAttachment(
      view.report,
      view.attachment
    );

  }

}



/* =========================================================
   EXPEDITION LOG DIRECTORY
   ========================================================= */

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
                ? `<span class="attachment-mark">[+]</span>`
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



/* =========================================================
   REPORT ROUTER
   ========================================================= */

function renderReport(number) {

  addressBar.textContent =

    "BATCOMPUTER / CASE_FILES / COURT_OF_OWLS / " +

    "EXPEDITION_LOGS / REPORT_" +

    String(number).padStart(2, "0");


  if (number === 4) {

    renderReport04();

    setOracle([

      "<strong>ORACLE:</strong> REPORT 04 loaded.",

      "One restricted location notice detected. Associated telemetry has been manually deleted."

    ]);

    return;

  }


  if (number === 7) {

    renderReport07();

    setOracle([

      "<strong>ORACLE:</strong> REPORT 07 loaded. One appendix is available.",

      "The merchant account traces to a defunct Spirit Halloween. Gotham remains committed to thematic consistency."

    ]);

    return;

  }



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
          Prototype report viewer.
        </p>

      </div>

    </article>

  `;


  setOracle([

    `<strong>ORACLE:</strong> REPORT ${String(number).padStart(2, "0")} loaded.`

  ]);

}



/* =========================================================
   REPORT 04
   ========================================================= */

function renderReport04() {

  contentArea.innerHTML = `

    <article class="report report-04">


      <header class="report-header">

        <h2>
          REPORT 4
        </h2>

        <div class="report-id">
          FILE: EXPEDITION_LOG_004
        </div>

      </header>



      <div class="report-body">


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



        <section class="report-section">

          <div class="section-heading">
            NO EXTRACTION OPPORTUNITIES PRESENTED FOR
          </div>

          <ul>
            <li>D. WAYNE</li>
            <li>T. DRAKE</li>
            <li>J. TODD</li>
            <li>R. GRAYSON</li>
          </ul>

        </section>



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
              <strong class="deleted-data">MANUALLY DELETED</strong>
            </div>

            <div>
              <span>VIDEO</span>
              <strong class="deleted-data">MANUALLY DELETED</strong>
            </div>

            <div>
              <span>TRANSCRIPT</span>
              <strong class="deleted-data">MANUALLY DELETED</strong>
            </div>

            <div>
              <span>LOCATION DATA</span>
              <strong class="deleted-data">MANUALLY DELETED</strong>
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


          ${renderAttempt("1", "127.8 FT", "76.3 FT", "9,751 SQ FT")}

          ${renderAttempt("2", "132.4 FT", "73.9 FT", "9,784 SQ FT")}

          ${renderAttempt("3", "119.6 FT", "82.7 FT", "9,891 SQ FT")}

          ${renderAttempt("4", "164.2 FT", "61.FT", "10,033 SQ FT")}

          ${renderAttempt("5", "∞", "MEASUREMENT FAILED", "INCONCLUSIVE")}

          ${renderAttempt("6", "THIRTEEN", "THIRTEEN", "THIRTEEN")}

          ${renderAttempt(
            "7",
            "HCRAM NLOCNIL OLLEH",
            ": HƎ⅂⅂O ꓕHOϺ∀S Ϻ∀⅄NƎ ᒋꓤ˙",
            "HELLO BRUCE WAYNE"
          )}

          ${renderAttempt("8", "124.8 FT", "72.3 FT", "9,023.04 SQ FT")}



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



/* ---------------------------------------------------------
   REPORT 04 ATTEMPT HELPER
   --------------------------------------------------------- */

function renderAttempt(
  number,
  length,
  width,
  squareFootage
) {

  return `

    <div class="attempt">

      <div class="attempt-heading">
        ATTEMPT ${number}
      </div>

      <div class="attempt-grid">

        <span>LENGTH</span>
        <strong>${length}</strong>

        <span>WIDTH</span>
        <strong>${width}</strong>

        <span>SQUARE FOOTAGE</span>
        <strong>${squareFootage}</strong>

      </div>

    </div>

  `;

}



/* =========================================================
   REPORT 07
   ========================================================= */

function renderReport07() {

  contentArea.innerHTML = `

    <article class="report report-07">


      <header class="report-header">

        <h2>
          REPORT 7
        </h2>

        <div class="report-id">
          FILE: EXPEDITION_LOG_007
        </div>

      </header>



      <div class="report-body">


        <section class="report-section">

          <div class="report-grid">

            <div class="report-field">
              <span class="field-label">DATE</span>
              <span class="field-value">12/12/2025</span>
            </div>

            <div class="report-field">
              <span class="field-label">SURFACE ENTRY</span>
              <span class="field-value">2:12 AM</span>
            </div>

            <div class="report-field">
              <span class="field-label">SURFACE EXIT</span>
              <span class="field-value">1:14 AM</span>
            </div>

            <div class="report-field">
              <span class="field-label">DURATION OF TIME BELOW</span>

              <span class="field-value">
                4 DAYS, 15 HOURS, 21 MINUTES
              </span>
            </div>

            <div class="report-field">

              <span class="field-label">
                ALFRED'S VERIFICATION
              </span>

              <span class="field-value">
                6 DAYS, 23 HOURS AND 2 MINUTES
              </span>

            </div>

          </div>

        </section>



        <section class="report-section">

          <div class="section-heading">
            ROUTE
          </div>

          <div class="route-line">

            MANOR ACCESS
            <span class="route-arrow">→</span>

            NORTHERN CORRIDOR
            <span class="route-arrow">→</span>

            JUNCTION 14
            <span class="route-arrow">→</span>

            CHARON'S LANDING
            <span class="route-arrow">→</span>

            RIVER STYX
            <span class="route-arrow">→</span>

            THE BIRD MARKET
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
                T. Drake and R. Grayson provided accompaniment from Charon's Landing. T. Drake provided accompaniment until Bird Market. R. Grayson provided accompaniment to Exit.
              </em>

            </p>

          </div>

        </section>



        <section class="report-section">

          <div class="section-heading">
            NEW AREAS EXPLORED
          </div>

          <p>
            CHARON'S LANDING, RIVER STYX, BIRD MARKET
          </p>

        </section>



        <section class="report-section">

          <div class="location-heading">
            CHARON'S LANDING
          </div>

          <ul>

            <li>
              Stone dock constructed along edge of subterranean river.
            </li>

            <li>
              Water surface reflects no visible light source.
            </li>

            <li>
              Current direction inconsistent.
            </li>

            <li>
              Ambient temperature lower than surrounding chambers.
            </li>

            <li>
              Venetian-style gondola permanently moored at dock.
            </li>

            <li>
              Vessel appears unattended.
            </li>

            <li>
              No oar present
            </li>

          </ul>


          <div class="subheading">
            OBSERVATIONS
          </div>

          <ul>

            <li>
              Initial attempts to board vessel unsuccessful.
            </li>

            <li>
              Vessel remained fixed to dock despite absence of visible restraints.
            </li>

            <li>
              Movement only permitted following payment.
            </li>

            <li>
              T. Drake and R. Grayson present.
            </li>

            <li>
              T. Drake identified location as "Charon's Landing."
            </li>

            <li>

              Stone marker present adjacent to boarding area.

              <button
                type="button"
                class="inline-attachment-link"
                id="appendixCInline"
              >
                SEE APPENDIX C
              </button>

            </li>

            <li>
              Contactless payment terminal mounted directly beneath inscription.
            </li>

            <li>
              Terminal design consistent with commercially available transit payment systems.
            </li>

            <li>
              Terminal operational.
            </li>

            <li>
              Terminal displayed no manufacturer information.
            </li>

            <li>
              Terminal possessed no visible power source.
            </li>

            <li>
              Network connectivity could not be determined.
            </li>

          </ul>


          <div class="payment-methods">

            <div class="subheading">
              ACCEPTABLE PAYMENT METHODS ACCORDING TO R. GRAYSON
            </div>

            <ul>
              <li>Drachma (Gold, Silver, Electrum)</li>
              <li>Faustian bargains</li>
              <li>Mastercard</li>
              <li>VISA</li>
              <li>NOT ACCEPTED: American Express</li>
            </ul>

          </div>


          <p class="report-note">

            <em>
              Terminal emitted standard approval tone following successful transaction.
            </em>

          </p>

        </section>



        <section class="report-section">

          <div class="location-heading">
            RIVER STYX
          </div>

          <ul>

            <li>
              Subterranean river extending beyond visible range in both directions.
            </li>

            <li>
              Water black in appearance.
            </li>

            <li>
              No visible riverbed.
            </li>

            <li>
              No detectable shoreline beyond designated docking locations.
            </li>

            <li>
              Surface remains unnaturally calm regardless of vessel movement.
            </li>

            <li>
              No wildlife observed.
            </li>

          </ul>


          <div class="subheading">
            OBSERVATIONS
          </div>

          <ul>

            <li>
              Crossed via gondola departing Charon's Landing.
            </li>

            <li>
              Transit accompanied by R. Grayson and T. Drake.
            </li>

            <li>
              No propulsion mechanism observed aboard vessel.
            </li>

            <li>
              T. Drake utilized bo staff in place of gondolier's pole.
            </li>

            <li>
              Contact between staff and river surface produced propulsion despite apparent absence of riverbed
            </li>

            <li>
              T. Drake successfully balanced on one foot atop the gondola while rotating the bo staff continuously for approximately seven minutes. Purpose of maneuver remains unclear.
            </li>

            <li>
              Cowl sonar returned inconsistent readings.
            </li>

            <li>
              Water depth could not be determined.
            </li>

            <li>
              Objects dropped into river produced no visible splash and no audible impact.
            </li>

            <li>
              Attempts to illuminate riverbed unsuccessful.
            </li>

            <li>
              Reflections occasionally failed to correspond with present surroundings.
            </li>

            <li>
              Warned against retrieving water samples by both T. Drake and R. Grayson
            </li>

            <li>
              Recommendation followed.
            </li>

          </ul>

        </section>



        <section class="report-section">

          <div class="location-heading">
            THE BIRD MARKET
          </div>


          <div class="subheading">
            ARCHITECTURAL NOTES
          </div>

          <ul>

            <li>
              Large subterranean chamber accessible via River Styx.
            </li>

            <li>
              Chamber organized around central plaza approximately 300 meters in diameter.
            </li>

            <li>
              No visible ceiling.
            </li>

            <li>
              Chamber exhibits characteristics of both marketplace and aviary.
            </li>

            <li>
              Hundreds of suspended cages present throughout chamber.
            </li>

            <li>
              Cage construction varied significantly. Materials included iron, bronze, silver, bone and unidentified alloys.
            </li>

            <li>
              Structure suspended above central plaza by chain system anchored beyond visible range.
            </li>

          </ul>


          <div class="subheading">
            OBSERVATIONS
          </div>

          <ul>

            <li>
              No human occupants observed.
            </li>

            <li>
              Hundreds of avian specimens present throughout chamber.
            </li>

            <li>
              Species diversity significantly lower than expected.
            </li>

            <li>
              Majority of observed birds belonged to either the orders <em>Strigiformes</em>, <em>Accipitriformes</em>, <em>Falconiformes</em>, or the family <em>Corvidae</em>.
            </li>

            <li>
              Four exceptions identified.
            </li>

            <li>
              Four American Robins (<em>Turdus migratorius</em>) observed during survey period.
            </li>

          </ul>


          <div class="specimen-box">

            <span class="specimen-title">
              OBSERVED ROBIN SPECIMENS
            </span>

            <ul>
              <li>Adult male</li>
              <li>Leucistic adult male</li>
              <li>Juvenile male</li>
              <li>Hatchling</li>
            </ul>

          </div>


          <ul>

            <li>
              No additional songbird species located.
            </li>

            <li>
              Commercial stalls arranged throughout marketplace.
            </li>

            <li>
              Multiple birds occupied vendor stalls.
            </li>

          </ul>


          <div class="specimen-box">

            <span class="specimen-title">
              GOODS DISPLAYED
            </span>

            <ul>
              <li>Cages</li>
              <li>Perches</li>
              <li>Nesting boxes</li>
              <li>Hoods</li>
              <li>Jesses</li>
              <li>Leashes</li>
              <li>Restraints</li>
            </ul>

          </div>


          <ul>

            <li>
              Several cages exceeded dimensions necessary for avian habitation.
            </li>

            <li>
              Largest structures capable of comfortably housing multiple adult humans.
            </li>

            <li>
              Intended occupants unknown.
            </li>

            <li>
              R. Grayson entered cage via suspended support chain.
            </li>

            <li>
              R. Grayson utilized swing perches as improvised trapeze apparatus, and multiple aerial maneuvers performed within and around structure.
            </li>

            <li>
              Structure exhibited signs of repeated prior use.
            </li>

            <li>
              Wear patterns observed on several perches and support chains.
            </li>

            <li>
              Patterns consistent with regular traversal by a human occupant.
            </li>

          </ul>

        </section>



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
              <strong>1:00 AM</strong>
            </div>

            <div>
              <span>EXIT</span>
              <strong>1:13 AM</strong>
            </div>

            <div>
              <span>ELAPSED TIME</span>
              <strong>13 MINUTES</strong>
            </div>

            <div>
              <span>AUDIO</span>
              <strong class="deleted-data">MANUALLY DELETED</strong>
            </div>

            <div>
              <span>VIDEO</span>
              <strong class="deleted-data">MANUALLY DELETED</strong>
            </div>

            <div>
              <span>TRANSCRIPT</span>
              <strong class="deleted-data">MANUALLY DELETED</strong>
            </div>

            <div>
              <span>LOCATION DATA</span>
              <strong class="deleted-data">MANUALLY DELETED</strong>
            </div>

            <div>
              <span>HEART RATE UPON ENTRY</span>
              <strong>74 BPM</strong>
            </div>

            <div>
              <span>MAXIMUM RECORDED HEART RATE</span>
              <strong>172 BPM</strong>
            </div>

            <div>
              <span>HEART RATE ON EXIT</span>
              <strong>115 BPM</strong>
            </div>

          </div>

        </section>



        <section class="experiment-section">

          <div class="experiment-kicker">
            EXPERIMENT
          </div>

          <h3>
            7-A
          </h3>

          <div class="experiment-title">
            PAYMENT TESTING AT CHARON'S LANDING
          </div>

          <div class="section-heading">
            RESULTS
          </div>


          <div class="payment-results">

            <div>
              <span>American Express</span>
              <strong class="payment-rejected">REJECTED</strong>
            </div>

            <div>
              <span>Bitcoin wallet</span>
              <strong class="payment-rejected">REJECTED</strong>
            </div>

            <div>
              <span>PayPal</span>
              <strong class="payment-rejected">REJECTED</strong>
            </div>

            <div>
              <span>Apple Pay</span>
              <strong class="payment-rejected">REJECTED</strong>
            </div>

            <div>
              <span>Gotham City Transit Pass</span>
              <strong class="payment-rejected">REJECTED</strong>
            </div>

            <div>
              <span>Visa</span>
              <strong class="payment-accepted">ACCEPTED</strong>
            </div>

            <div>
              <span>Mastercard</span>
              <strong class="payment-accepted">ACCEPTED</strong>
            </div>

            <div>
              <span>Faustian bargain</span>
              <strong class="payment-unverified">UNVERIFIED</strong>
            </div>

          </div>

        </section>



        <section class="report-attachment-callout">

          <div>

            <span class="attachment-label">
              ATTACHMENT
            </span>

            <strong>
              APPENDIX C — INSCRIPTION 7A
            </strong>

          </div>

          <button
            type="button"
            class="open-attachment-button"
            id="appendixCButton"
          >
            OPEN
          </button>

        </section>



        <section class="report-section">

          <div class="section-heading">
            POST-EXPEDITION FOLLOW-UP
          </div>

          <p>
            Visa transaction successfully processed.
          </p>


          <div class="transaction-grid">

            <div>
              <span>MERCHANT</span>

              <strong>
                CHARON TRANSPORT SERVICES LLC.
              </strong>
            </div>

            <div>
              <span>AMOUNT</span>

              <strong>
                $3.25
              </strong>
            </div>

            <div>
              <span>MERCHANT CATEGORY CODE</span>

              <strong>
                4111 (Local and Suburban Passenger Transit)
              </strong>
            </div>

            <div>
              <span>ADDRESS ON FILE</span>

              <strong>
                495 Prospect Avenue Suite 18, Gotham, NJ 07052
              </strong>
            </div>

          </div>

        </section>


      </div>

    </article>

  `;


  document
    .getElementById("appendixCButton")
    .addEventListener(
      "click",
      function () {

        openAttachment(
          7,
          "C"
        );

      }
    );


  document
    .getElementById("appendixCInline")
    .addEventListener(
      "click",
      function () {

        openAttachment(
          7,
          "C"
        );

      }
    );

}



/* =========================================================
   ATTACHMENT ROUTER
   ========================================================= */

function renderAttachment(
  report,
  attachment
) {

  if (
    report === 7 &&
    attachment === "C"
  ) {

    renderAppendix7C();

  }

}



/* =========================================================
   REPORT 07 — APPENDIX C
   ========================================================= */

function renderAppendix7C() {

  addressBar.textContent =
    "BATCOMPUTER / CASE_FILES / COURT_OF_OWLS / EXPEDITION_LOGS / REPORT_07 / APPENDIX_C";


  contentArea.innerHTML = `

    <article class="attachment-document">


      <header class="attachment-document-header">

        <span class="attachment-kicker">
          REPORT 07
        </span>

        <h2>
          APPENDIX C
        </h2>

        <span class="attachment-subtitle">
          INSCRIPTION 7A
        </span>

      </header>



      <div class="attachment-document-body">


        <section class="inscription-panel">

          <div class="section-heading">
            ORIGINAL TEXT
          </div>

          <div class="greek-inscription">

            <p>
              ἡ πάροδος μισθοῦ δεῖται
            </p>

            <p>
              Ἅψαι ὥστε ἀποτίνειν
            </p>

            <p>
              Σκάναρον τὸν κώδικα QR πρὸς ἐπιλογὰς κινητῆς ἀποτίσεως
            </p>

            <p>
              Πᾶσαι πωλήσεις ὁριστικαί
            </p>

            <p>
              Οὐκ ἀποδόσεις
            </p>

            <p>
              Αἱ τῶν πελατῶν ἐνστάσεις πρὸς τὴν διοίκησιν ἀναπεμπέσθωσαν
            </p>

          </div>

        </section>



        <section class="translation-panel">

          <div class="section-heading">
            TRANSLATION
          </div>

          <p>PASSAGE REQUIRES PAYMENT</p>

          <p>TAP TO PAY</p>

          <p>
            SCAN QR CODE FOR MOBILE PAYMENT OPTIONS
          </p>

          <p>ALL SALES FINAL</p>

          <p>NO REFUNDS</p>

          <p>
            CUSTOMER COMPLAINTS MAY BE DIRECTED TO MANAGEMENT
          </p>

        </section>


      </div>

    </article>

  `;


  setOracle([

    "<strong>ORACLE:</strong> APPENDIX C loaded.",

    "Original inscription and translation are displayed."

  ]);

}
