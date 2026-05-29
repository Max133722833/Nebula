// ----- VIEW SWITCHING -----
const navItems = document.querySelectorAll(".nav-item");
const views = document.querySelectorAll(".view");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        const target = item.dataset.view;

        // Update active sidebar item
        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        // Update visible view
        views.forEach(view => {
            view.classList.remove("active-view");
            if (view.id === `view-${target}`) view.classList.add("active-view");
        });

        // Update topbar text
        document.getElementById("view-title").textContent =
            target.charAt(0).toUpperCase() + target.slice(1);

        const subtitles = {
            dashboard: "High-level overview of your AI automations.",
            workflows: "Build, preview and analyze your automations.",
            logs: "Execution history of all automation runs.",
            settings: "Configure parameters used by the AI engine."
        };
        document.getElementById("view-subtitle").textContent = subtitles[target];
    });
});


// ----- WORKFLOW BUILDER: GRAPH RENDER -----
const flowCards = document.querySelectorAll(".workflow-card");
const graph = document.getElementById("builder-graph");
const builderTitle = document.getElementById("builder-title");
const builderSubtitle = document.getElementById("builder-subtitle");

const flows = {
    email: [
        { type: "trigger", title: "New email" },
        { type: "ai", title: "Draft AI reply" },
        { type: "action", title: "Log to CRM" }
    ],
    support: [
        { type: "trigger", title: "New ticket" },
        { type: "ai", title: "Classify intent" },
        { type: "branch", title: "Route to queue" }
    ],
    summary: [
        { type: "trigger", title: "18:00 schedule" },
        { type: "ai", title: "Generate summary" },
        { type: "action", title: "Send to Slack" }
    ]
};

flowCards.forEach(card => {
    card.addEventListener("click", () => {
        const id = card.dataset.flowId;
        const flow = flows[id];

        // Update builder header
        builderTitle.textContent = card.querySelector("h3").textContent;
        builderSubtitle.textContent = "Workflow structure overview.";

        // Clear graph
        graph.classList.remove("builder-graph-empty");
        graph.innerHTML = "";

        // Build flow visually
        flow.forEach((step, index) => {
            const row = document.createElement("div");
            row.classList.add("flow-row");

            // Node
            const node = document.createElement("div");
            node.classList.add("flow-node");

            const label = document.createElement("div");
            label.classList.add("flow-node-label");
            label.textContent = step.type;

            const title = document.createElement("div");
            title.classList.add("flow-node-title");
            title.textContent = step.title;

            node.appendChild(label);
            node.appendChild(title);
            row.appendChild(node);

            // Arrow if not last
            if (index < flow.length - 1) {
                const arrow = document.createElement("div");
                arrow.classList.add("flow-arrow");
                arrow.textContent = "→";
                row.appendChild(arrow);
            }

            graph.appendChild(row);
        });
    });
});


// ----- DEMO EXECUTION (Fake Log Entry) -----
const runDemoBtn = document.getElementById("run-demo-btn");
const logsBody = document.getElementById("logs-body");

runDemoBtn.addEventListener("click", () => {
    const now = new Date();
    const time = now.toTimeString().slice(0, 8);

    // Demo entry
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${time}</td>
        <td>Demo workflow</td>
        <td><span class="badge badge-green">Success</span></td>
        <td>Executed demo steps successfully</td>
    `;

    logsBody.prepend(tr);
});
