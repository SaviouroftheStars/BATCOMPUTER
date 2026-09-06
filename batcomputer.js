const ACCESSIBLE = {
  4: {
    date: "12/05/2025",
    attachment: "EXPERIMENT 4-C",
    oracle: "REPORT 4 loaded. One associated experiment is available.",
    body: `
      <p><strong>SURFACE ENTRY:</strong> 22:17</p>
      <p><strong>SURFACE EXIT:</strong> 05:42</p>
      <p><strong>DURATION OF TIME BELOW:</strong> 7 HOURS, 25 MINUTES</p>
      <p><strong>ALFRED'S VERIFICATION:</strong> 6 HOURS, 13 MINUTES</p>
      <p>This is the prototype report viewer. We can replace this with the full prose when the interface is approved.</p>
    `
  },
  7: {
    date: "12/12/2025",
    attachment: "ATTACHMENTS AVAILABLE",
    oracle: "REPORT 7 loaded. Associated experiments and appendices are available from within the report.",
    body: `<p>Prototype report viewer for REPORT 7.</p>`
  },
  19: {
    date: "01/04/2026",
    attachment: "5 APPENDICES",
    oracle: "REPORT 19 loaded. Five groups of recovered correspondence are associated with this report. Attachments have been indexed by post office box.",
    body: `<p>Prototype report viewer for REPORT 19.</p>`
  },
  23: {
    date: "02/08/2026",
    attachment: "EXPERIMENT AVAILABLE",
    oracle: "REPORT 23 loaded. One associated experiment is currently indexed.",
    body: `<p>Prototype report viewer for REPORT 23.</p>`
  },
  56: {
    date: "04/01/2026",
    attachment: null,
    oracle: "REPORT 56 loaded. No associated attachments are currently available.",
    body: `<p>Prototype report viewer for REPORT 56.</p>`
  }
};

const loginScreen = document.getElementById("loginScreen");
const archiveScreen = document.getElementById("archiveScreen");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const contentArea = document.getElementById("contentArea");
const oracleMessage = document.getElementById("oracleMessage");
const addressBar = document.getElementById("addressBar");
const backButton = document.getElementById("backButton");
const homeButton = document.getElementById("homeButton");

let historyStack = [];
let currentView = { type: "logs" };

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const user = document.getElementById("username").value.trim().toUpperCase();
  const password = document.getElementById("password").value;

  if (user !== "BATMAN" || password !== "iamtheknight") {
    loginError.textContent = "AUTHENTICATION FAILED";
    return;
  }

  loginError.textContent = "";
  loginScreen.classList.add("hidden");
  archiveScreen.classList.remove("hidden");
  showLogs(false);
});

backButton.addEventListener("click", function () {
  const previous = historyStack.pop();
  if (!previous) return;
  renderView(previous, false);
});

homeButton.addEventListener("click", function () {
  showLogs(true);
});

function setOracle(paragraphs) {
  oracleMessage.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join("");
}

function showLogs(pushHistory = true) {
  renderView({ type: "logs" }, pushHistory);
}

function openReport(number) {
  renderView({ type: "report", number }, true);
}

function renderView(view, pushHistory = true) {
  if (pushHistory) historyStack.push(currentView);
  currentView = view;

  if (view.type === "logs") {
    renderLogs();
    return;
  }

  if (view.type === "report") {
    renderReport(view.number);
  }
}

function renderLogs() {
  addressBar.textContent = "BATCOMPUTER / CASE_FILES / COURT_OF_OWLS / EXPEDITION_LOGS";

  let rows = "";

  for (let i = 1; i <= 69; i++) {
    const report = ACCESSIBLE[i];

    if (report) {
      rows += `
        <tr class="file-open" data-report="${i}">
          <td>▣ <button type="button">REPORT_${String(i).padStart(2, "0")}</button></td>
          <td>${report.date}</td>
          <td>AVAILABLE ${report.attachment ? '<span class="attachment-mark">[+]</span>' : ""}</td>
        </tr>
      `;
    } else {
      rows += `
        <tr class="file-disabled">
          <td>□ REPORT_${String(i).padStart(2, "0")}</td>
          <td>--/--/----</td>
          <td>ARCHIVED</td>
        </tr>
      `;
    }
  }

  contentArea.innerHTML = `
    <h1 class="archive-title">EXPEDITION LOGS</h1>
    <p class="archive-meta">69 FILES &nbsp; | &nbsp; 5 AVAILABLE DURING CURRENT SESSION</p>
    <table class="file-table">
      <thead><tr><th>FILE</th><th>DATE</th><th>STATUS</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  document.querySelectorAll(".file-open").forEach(row => {
    row.addEventListener("click", function () {
      openReport(Number(this.dataset.report));
    });
  });

  setOracle([
    "<strong>ORACLE:</strong> Welcome back, Batman.",
    "I'm ORACLE, the Batcomputer's virtual assistant. I can locate reports, retrieve attachments, and navigate the archive.",
    "Think of me as a sexier Clippy. With a better firewall.",
    "69 expedition reports indexed. Nice.",
    "Five files are accessible. I've highlighted them in blue. Select a report to open it."
  ]);
}

function renderReport(number) {
  const report = ACCESSIBLE[number];
  if (!report) return;

  addressBar.textContent =
    `BATCOMPUTER / CASE_FILES / COURT_OF_OWLS / EXPEDITION_LOGS / REPORT_${String(number).padStart(2, "0")}`;

  const attachment = report.attachment
    ? `
      <div class="attachments">
        <h3>ATTACHMENTS</h3>
        <button class="attachment-button" type="button" id="attachmentButton">⌕ ${report.attachment}</button>
      </div>
    `
    : "";

  contentArea.innerHTML = `
    <article class="report">
      <header class="report-header">
        <h2>REPORT ${number}</h2>
        <div class="report-id">FILE: EXPEDITION_LOG_${String(number).padStart(3, "0")}</div>
      </header>
      <div class="report-body">
        <p><strong>DATE:</strong> ${report.date}</p>
        ${report.body}
        ${attachment}
      </div>
    </article>
  `;

  const attachmentButton = document.getElementById("attachmentButton");
  if (attachmentButton) {
    attachmentButton.addEventListener("click", function () {
      alert("Attachment viewer is ready to be built next.");
    });
  }

  setOracle([`<strong>ORACLE:</strong> ${report.oracle}`]);
}
