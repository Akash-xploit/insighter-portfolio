// Renders the site from data.js and runs the UI effects.

const SITE = window.SITE || {};
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const lite = document.documentElement.classList.contains("lite");

// Single rAF-throttled scroll loop shared by all scroll-driven effects.
const scrollTasks = [];
let scrollQueued = false;
window.addEventListener("scroll", () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => { scrollQueued = false; for (const fn of scrollTasks) fn(); });
}, { passive: true });

// ---- Helpers ----

// el("a", { href: "#", class: "btn" }, "text", childNode, ...)
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "style") node.style.cssText = v;
    else node.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c === undefined || c === null || c === false) continue;
    node.append(c instanceof Node ? c : document.createTextNode(c));
  }
  return node;
}

const $ = (id) => document.getElementById(id);

// Highlight symbols/digits in the handle.
function handleNodes(text) {
  return String(text).split(/([$\d]+)/).filter(Boolean)
    .map((part) => (/^[$\d]+$/.test(part) ? el("b", {}, part) : part));
}

// Fallback label for skills without a logo, e.g. "GuardDuty" -> "GD".
function monogram(name) {
  const clean = String(name).trim();
  if (clean.length <= 3) return clean.toUpperCase();
  const words = clean.split(/\s+/).map((w) => w.replace(/[^A-Za-z0-9]/g, "")).filter(Boolean);
  if (words.length > 1) return words.slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const caps = clean.match(/[A-Z]/g);
  if (caps && caps.length >= 2) return caps.slice(0, 2).join("");
  return clean[0].toUpperCase() + clean[1];
}

// Inline SVG icons.
const BUILTIN = {
  linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.9h-4z" fill="currentColor"/>',
  github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" fill="currentColor"/>',
  resume: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3v5h5M9 13h6M9 17h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  microsoft: '<rect x="2" y="2" width="9.5" height="9.5" fill="#f25022"/><rect x="12.5" y="2" width="9.5" height="9.5" fill="#7fba00"/><rect x="2" y="12.5" width="9.5" height="9.5" fill="#00a4ef"/><rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#ffb900"/>',
  paper: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 3v5h5M8.5 12.5h7M8.5 15.5h7M8.5 18.5h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
};

// Resolve an icon spec (builtin | devicon | si:simpleicons | path/url) to a node.
function iconNode(icon, name, accent, mode) {
  const fallback = () =>
    el("span", { class: "mono-tile", style: `--a:${accent || "#3fa9f5"}`, "aria-hidden": "true" }, monogram(name));

  if (!icon) return fallback();
  if (BUILTIN[icon]) {
    const span = el("span", { class: "ico", "aria-hidden": "true" });
    span.innerHTML = `<svg viewBox="0 0 24 24">${BUILTIN[icon]}</svg>`;
    return span;
  }

  let src;
  if (/^https?:\/\//.test(icon) || icon.startsWith("assets/")) src = icon;
  else if (icon.startsWith("si:")) src = `https://cdn.simpleicons.org/${icon.slice(3)}/ffffff`;
  else if (mode === "mono") src = `https://cdn.simpleicons.org/${icon}/ffffff`;
  else {
    const path = icon.includes("/") ? icon : `${icon}/${icon}-original`;
    src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`;
  }
  const tone = src.includes("devicon") ? "ico ico-color" : "ico";
  const img = el("img", { class: tone, src, alt: "", width: 32, height: 32, loading: "lazy", decoding: "async" });
  img.addEventListener("error", () => img.replaceWith(fallback()), { once: true });
  return img;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const t = el("textarea", { style: "position:fixed;opacity:0" }, text);
    document.body.append(t);
    t.select();
    document.execCommand("copy");
    t.remove();
  }
}

let toastTimer;
function toast(...parts) {
  const box = $("toast");
  box.replaceChildren(...parts);
  box.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => box.classList.remove("show"), 2400);
}

function linkButton(link) {
  // mailto links copy the address instead
  if (/^mailto:/i.test(link.url)) {
    const address = link.url.replace(/^mailto:/i, "").split("?")[0];
    const btn = el("button", { class: "glass-btn", type: "button", "aria-label": `Copy email address ${address}` },
      iconNode(link.icon || "email", link.label, null, "mono"), el("span", {}, link.label));
    btn.addEventListener("click", async () => {
      await copyText(address);
      toast(el("b", {}, "✓ Copied "), address);
    });
    return el("li", {}, btn);
  }
  const isFile = /\.pdf$/i.test(link.url);
  const isExternal = /^https?:\/\//.test(link.url);
  return el("li", {},
    el("a", {
      class: "glass-btn",
      href: link.url,
      target: isExternal ? "_blank" : undefined,
      rel: isExternal ? "noopener" : undefined,
      download: isFile ? true : undefined,
    }, iconNode(link.icon || "link", link.label, null, "mono"), el("span", {}, link.label))
  );
}

// ---- Render each section from data.js ----

const P = SITE.profile || {};

document.querySelectorAll("[data-fill]").forEach((node) => {
  const key = node.dataset.fill;
  if (key === "handle") node.replaceChildren(...handleNodes(P.handle || ""));
  else node.textContent = P[key] || "";
});

// Avatar (initials fallback)
(function avatar() {
  const box = $("avatar");
  const initials = el("span", { class: "initials" }, (P.name || "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2));
  if (!P.photo) return box.append(initials);
  const img = el("img", { src: P.photo, alt: `Photo of ${P.name}`, width: 480, height: 480, fetchpriority: "high", decoding: "async" });
  img.addEventListener("error", () => img.replaceWith(initials), { once: true });
  box.append(img);
})();

if (P.available) $("available").textContent = P.available;
else $("available").remove();

$("bio").append(...(P.bio || []).map((p) => el("p", {}, p)));

function progressBar(pct) {
  const v = Math.max(0, Math.min(100, Number(pct) || 0));
  return el("div", { class: "prog" },
    el("div", { class: "prog-track", role: "progressbar", "aria-valuenow": v, "aria-valuemin": 0, "aria-valuemax": 100 },
      el("i", { style: `width:${Math.max(v, 3)}%` })),
    el("span", { class: "prog-pct" }, `${v}%`)
  );
}
const isOngoing = (item) => item.progress !== undefined && item.progress !== null && item.progress !== "";

const liveLinks = (SITE.links || []).filter((l) => l.url);
$("links").append(...liveLinks.map(linkButton));
$("contact-links").append(...liveLinks.map(linkButton));

// Skills
const skillGroups = SITE.skills || [];
$("skill-groups").append(...skillGroups.map((g) =>
  el("article", { class: "skill-card glass", style: `--a:${g.accent || "#3fa9f5"}` },
    el("h3", {}, g.group),
    el("ul", { class: "skill-grid" },
      g.items.map((s) => el("li", { class: "skill" }, iconNode(s.icon, s.name, g.accent), el("span", {}, s.name)))
    )
  )
));

// Projects
$("project-cards").append(...(SITE.projects || []).map((p) => {
  const visual = p.image
    ? el("img", { class: "card-img", src: p.image, alt: "" })
    : el("div", { class: "flow" },
        (p.flow || []).flatMap((step, i) => [
          i ? el("i", { class: "flow-link", "aria-hidden": "true" }) : null,
          el("span", { class: "flow-node" }, step),
        ])
      );
  const ongoing = isOngoing(p);
  const live = /progress/i.test(p.status || "");
  const upcoming = /upcoming|planned|next/i.test(p.status || "");
  return el("article", { class: ongoing || upcoming ? "card glass card-prog" : "card glass" },
    el("div", { class: "card-top" }, visual),
    el("div", { class: "card-body" },
      el("p", { class: "card-meta" },
        el("span", { class: upcoming ? "badge badge-next" : live ? "badge badge-live" : "badge" }, p.status || ""),
        (p.tags || []).join(" · ")
      ),
      el("h3", {}, p.title),
      el("p", { class: "card-text" }, p.summary),
      ongoing ? progressBar(p.progress) : null,
      p.repo
        ? el("a", { class: "btn", href: p.repo, target: "_blank", rel: "noopener" }, "View project", el("span", { "aria-hidden": "true" }, " →"))
        : el("span", { class: "btn btn-off" }, "Repo coming soon")
    )
  );
}));

// Blog
(function blog() {
  const box = $("blog-cards");
  const posts = SITE.blogs || [];
  if (!posts.length) {
    const medium = (SITE.links || []).find((l) => /medium/i.test(l.label) && l.url);
    box.classList.add("cards-1");
    box.append(el("article", { class: "card glass empty" },
      el("div", { class: "card-body" },
        el("p", { class: "card-meta" }, el("span", { class: "badge" }, "Coming soon")),
        el("h3", {}, "First posts are on the way"),
        el("p", { class: "card-text" }, "Write-ups on detection engineering, AWS security and home-lab experiments."),
        medium ? el("a", { class: "btn", href: medium.url, target: "_blank", rel: "noopener" }, "Follow on Medium →") : null
      )
    ));
    return;
  }
  if (posts.length < 3) box.classList.add("cards-wide");
  const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 34);
  box.append(...posts.map((b) =>
    el("article", { class: isOngoing(b) ? "card glass card-prog" : "card glass" },
      el("div", { class: "card-top" },
        b.image
          ? el("img", { class: "card-img", src: b.image, alt: "" })
          : el("div", { class: "post-cover" },
              el("span", { class: "post-cover-ico" }, iconNode(/medium/i.test(b.platform || "") ? "si:medium" : "paper", b.platform || "Blog", null, "mono")),
              el("code", {}, `~/blog/${slug(b.title)}`))
      ),
      el("div", { class: "card-body" },
        el("p", { class: "card-meta" },
          el("span", { class: "badge" }, b.platform || "Blog"),
          b.sample ? el("span", { class: "badge badge-sample" }, "Sample") : null,
          b.date || ""),
        el("h3", {}, b.title),
        el("p", { class: "card-text" }, b.summary || ""),
        isOngoing(b) ? progressBar(b.progress) : null,
        b.url && !isOngoing(b) && !b.sample
          ? el("a", { class: "btn", href: b.url, target: "_blank", rel: "noopener" }, "Read post →")
          : el("span", { class: "btn btn-off" }, isOngoing(b) ? "Being written" : "Coming soon")
      )
    )
  ));
})();

// Experience
$("timeline").append(...(SITE.experience || []).map((x) =>
  el("li", {},
    el("time", {}, x.when),
    el("div", {},
      el("h3", {}, x.title),
      el("p", { class: "org" }, x.org),
      x.points && x.points.length ? el("ul", { class: "points" }, x.points.map((pt) => el("li", {}, pt))) : null
    )
  )
));

// Certifications
function certCard(c) {
  const logo = iconNode(c.logo || "", c.issuer || c.name, "#3fa9f5");
  const state = c.done ? ["st-ok", "Verified"] : c.planned ? ["st-plan", "Planned"] : ["st-prog", "In progress"];
  return el("li", { class: c.done ? "cert glass" : c.planned ? "cert glass cert-prog cert-plan" : "cert glass cert-prog" },
    el("div", { class: "cert-top" },
      el("span", { class: "cert-logo" }, logo),
      el("span", { class: `cert-st ${state[0]}` }, state[1])
    ),
    el("h3", {}, c.name),
    el("p", { class: "cert-meta" }, [c.issuer, c.date].filter(Boolean).join(" · ")),
    c.done || c.planned ? null : el("div", { class: "cert-bar", "aria-hidden": "true" }, el("i")),
    c.url
      ? el("a", { class: "cert-link", href: c.url, target: "_blank", rel: "noopener" }, c.done ? "View credential" : "View progress", el("span", { "aria-hidden": "true" }, " ↗"))
      : el("span", { class: "cert-link cert-link-off" }, c.done ? "Credential link coming soon" : c.planned ? "On the roadmap" : "Exam upcoming")
  );
}
(function certGroups() {
  const all = SITE.certifications || [];
  const groups = [
    ["Earned", "st-ok", all.filter((c) => c.done)],
    ["In progress & planned", "st-prog", all.filter((c) => !c.done)],
  ];
  for (const [label, tone, list] of groups) {
    if (!list.length) continue;
    $("cert-groups").append(
      el("div", { class: "cert-group" },
        el("p", { class: `group-label ${tone}` }, label, el("b", {}, String(list.length))),
        el("ul", { class: "certs" }, list.map(certCard)))
    );
  }
})();

// Papers
$("paper-cards").append(...(SITE.papers || []).map((p) =>
  el("article", { class: "card glass paper" },
    p.image ? el("div", { class: "card-top" }, el("img", { class: "card-img", src: p.image, alt: "" })) : null,
    el("div", { class: "card-body" },
      el("div", { class: "paper-head" },
        el("span", { class: "paper-ico" }, iconNode("paper", "Paper")),
        el("p", { class: "card-meta" }, p.venue)
      ),
      el("h3", {}, p.title),
      el("p", { class: "card-text" }, p.summary),
      p.url
        ? el("a", { class: "btn", href: p.url, target: "_blank", rel: "noopener" }, "Read paper", el("span", { "aria-hidden": "true" }, " ↗"))
        : el("span", { class: "btn btn-off" }, "Link coming soon")
    )
  )
));

// Journey timeline
(function journey() {
  const items = SITE.journey || [];
  const list = $("journey");
  if (!items.length) { list.closest(".journey").remove(); return; }
  $("journey-count").textContent = `${items.length} milestones`;
  list.append(...items.map((j) =>
    el("li", { class: `t-${j.type || "edu"}` },
      el("time", {}, j.date),
      el("strong", {}, j.title),
      j.detail ? el("p", {}, j.detail) : null
    )
  ));
})();

// Contact form (FormSubmit AJAX)
(function contactForm() {
  const form = $("contact-form");
  const cfg = SITE.contact || {};
  if (!cfg.formEmail) { form.remove(); return; }
  const status = $("form-status");
  const say = (msg, kind) => { status.textContent = msg; status.className = `form-status ${kind || ""}`; };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return;  // honeypot

    let bad = null;
    for (const name of ["name", "email", "message"]) {
      const field = form.elements[name];
      const empty = !String(data[name] || "").trim();
      const badEmail = name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "");
      field.classList.toggle("bad", empty || badEmail);
      if ((empty || badEmail) && !bad) bad = field;
    }
    if (bad) { say("Please fill in your name, a valid email and a message.", "err"); bad.focus(); return; }

    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    say("Sending…");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(cfg.formEmail)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || "—",
          message: data.message,
          _subject: cfg.subject || "New message from your portfolio",
          _replyto: data.email,
          _template: "table",
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || out.success === false || out.success === "false") throw new Error(out.message || res.status);
      form.reset();
      say("✓ Message sent. I'll get back to you soon.", "ok");
    } catch {
      say(`Couldn't send right now. Please email ${cfg.formEmail} instead.`, "err");
    } finally {
      button.disabled = false;
    }
  });
})();

// ---- Background log stream ----

const pad = (n) => String(n).padStart(2, "0");
const utc = (d = new Date()) => `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;

const routine = [
  ["cloudtrail", "GetObject s3://vault-prod/reports/q3.pdf"],
  ["cloudtrail", "AssumeRole role/vault-lambda-exec"],
  ["vpc-flow", "ACCEPT 10.0.2.14 → 10.0.1.8:443 tcp"],
  ["cognito", "Auth success user=j.ortiz mfa=TOTP"],
  ["cloudtrail", "PutObject s3://vault-prod/uploads sse=kms"],
  ["config", "s3-bucket-ssl-requests-only COMPLIANT"],
  ["lambda", "vault-upload 200 · 84ms"],
  ["kms", "Decrypt key/vault-cmk by vault-lambda-exec"],
  ["config", "iam-user-mfa-enabled COMPLIANT"],
  ["vpc-flow", "ACCEPT 10.0.3.22 → 10.0.1.8:443 tcp"],
  ["cloudwatch", "Metric 4XXError=0 vault-api"],
];
const incidents = [
  [
    ["guardduty", "Recon:EC2/PortProbeUnprotectedPort i-0a91f3", "alert"],
    ["cloudwatch", "Alarm port-probe-detect → ALARM", "alert"],
    ["sns", "Page sent → soc-oncall", "info"],
    ["ec2", "sg-07be2 ingress 0.0.0.0/0:22 revoked", "ok"],
  ],
  [
    ["guardduty", "UnauthorizedAccess:EC2/SSHBruteForce 185.220.101.4", "high"],
    ["sns", "Page sent → soc-oncall", "info"],
    ["vpc", "NACL deny 185.220.101.4/32 inserted", "ok"],
  ],
  [
    ["cognito", "6 failed sign-ins user=admin in 60s", "alert"],
    ["cognito", "Account locked · MFA re-enrolment required", "ok"],
  ],
  [
    ["cloudtrail", "StopLogging attempted by role/ci-deploy", "high"],
    ["config", "Auto-remediation: trail logging restored", "ok"],
  ],
];
const levelText = { info: "INFO", alert: "ALERT", high: "HIGH", ok: "CONTAINED" };
const LINE_HEIGHT = 22;
let logTimers = [];
let nextIncident = 0;

// Right-rail monitor stats
const monitor = (() => {
  const t = { events: 18420, alerts: 0, contained: 0, bucket: 0, recentAlerts: [] };
  const spark = Array.from({ length: 30 }, () => 2 + Math.floor(Math.random() * 4));
  return {
    t,
    spark,
    record(lvl) {
      t.events += 3 + Math.floor(Math.random() * 30);
      if (!this.quiet) t.bucket += 1;
      if (lvl === "alert" || lvl === "high") { t.alerts++; if (!this.quiet) t.recentAlerts.push(Date.now()); }
      if (lvl === "ok") t.contained++;
    },
  };
})();

function makeStream(col) {
  const queue = [];
  const maxLines = Math.ceil(window.innerHeight / LINE_HEIGHT) + 2;
  return function push() {
    if (document.hidden) return;
    if (!queue.length) {
      const n = 4 + Math.floor(Math.random() * 5);
      for (let i = 0; i < n; i++) queue.push([...routine[Math.floor(Math.random() * routine.length)], "info"]);
      queue.push(...incidents[nextIncident++ % incidents.length]);
    }
    const [src, msg, lvl] = queue.shift();
    col.append(el("li", { class: lvl === "info" ? undefined : lvl },
      el("span", { class: "ts" }, utc()),
      el("span", { class: "src" }, src),
      el("span", { class: "msg" }, msg),
      el("span", { class: "lvl" }, levelText[lvl])
    ));
    while (col.children.length > maxLines) col.firstElementChild.remove();
    monitor.record(lvl);
  };
}

function buildLogs() {
  const box = $("logs");
  if (!box) return;
  logTimers.forEach(clearInterval);
  logTimers = [];
  const cols = lite ? 1 : Math.max(1, Math.min(3, Math.floor(window.innerWidth / 560)));
  box.style.setProperty("--cols", cols);
  box.replaceChildren();
  for (let c = 0; c < cols; c++) {
    const col = el("ol", { class: "log-col" });
    box.append(col);
    const push = makeStream(col);
    const fill = Math.ceil(window.innerHeight / LINE_HEIGHT);
    monitor.quiet = true;
    for (let i = 0; i < fill; i++) push();
    monitor.quiet = false;
    if (!reduceMotion) logTimers.push(setInterval(push, (lite ? 2200 : 1000) + c * 370 + Math.random() * 300));
  }
}

buildLogs();
// Ignore height-only resizes (mobile URL bar).
let resizeTimer;
let lastWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (window.innerWidth === lastWidth) return;
  lastWidth = window.innerWidth;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildLogs, 300);
});

// ---- Side rails ----
// Left-rail terminal
const term = $("term");
const termScripts = (() => {
  const skillsCount = (SITE.skills || []).reduce((n, g) => n + g.items.length, 0);
  const projects = SITE.projects || [];
  const building = projects.filter((p) => isOngoing(p)).length;
  const certs = SITE.certifications || [];
  const ok = certs.filter((c) => c.done).length;
  const posts = (SITE.blogs || []).length;
  const firstJob = (SITE.experience || []).find((x) => x.points && x.points.length);
  return {
    whoami:     [["whoami", P.handle || "user"], ["cat role", (P.role || "").toLowerCase()]],
    skills:     [["ls skills | wc -l", String(skillsCount)], ["ls skills", (SITE.skills || []).map((g) => g.group.split(/[\s·&]+/)[0].toLowerCase()).join(" ")]],
    projects:   [["git log | wc -l", `${projects.length} projects`], ["cat status", building ? `${building} building` : "all shipped"]],
    blog:       [["ls blog", posts ? `${posts} posts` : "drafts in progress…"]],
    experience: [["history | head -1", firstJob ? firstJob.title.toLowerCase() : "—"], ["uptime", "breaking & defending since 2020"]],
    certs:      [["verify --all", `${ok} ok · ${certs.length - ok} pending`]],
    research:   [["ls papers", `${(SITE.papers || []).length} published`]],
    contact:    [["nc -lv 443", "listening for recruiters…"]],
  };
})();
let termToken = 0;
let termSection = null;
let termTimer;
function runTerminal(name) {
  if (!term || name === termSection) return;
  termSection = name;
  clearTimeout(termTimer);
  const token = ++termToken;
  termTimer = setTimeout(() => typeTerminal(name, token), 350);
}
async function typeTerminal(name, token) {
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));
  for (const [cmd, out] of termScripts[name] || []) {
    const line = el("span", { class: "t-cmd" }, el("b", {}, "$ "));
    term.append(line);
    for (const ch of cmd) {
      if (token !== termToken) { line.remove(); return; }
      line.append(ch);
      await wait(38);
    }
    await wait(220);
    if (token !== termToken) { line.remove(); return; }
    term.append(el("span", { class: "t-out" }, out));
    while (term.children.length > 24) term.firstElementChild.remove();
    await wait(500);
  }
}

const railWins = [...document.querySelectorAll(".window")].map((win) => ({
  win,
  name: win.closest("section").id,
}));

function updateRails() {
  let best = null, bestF = -1;
  for (const r of railWins) {
    const f = parseFloat(r.win.style.getPropertyValue("--f") || "1");
    const box = r.win.getBoundingClientRect();
    if (box.bottom > 0 && box.top < innerHeight && f > bestF) { bestF = f; best = r; }
  }
  if (best) runTerminal(best.name);
  document.body.classList.toggle("rails-away", !!(best && best.win.classList.contains("is-max")));
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max > 0 ? Math.round((scrollY / max) * 100) : 0;
  $("rail-progress").style.width = `${pct}%`;
  $("rail-pct").textContent = `${String(pct).padStart(3, "0")}%`;
}
if (reduceMotion) scrollTasks.push(updateRails);
railWins.forEach(({ win }) => win.addEventListener("windowchange", updateRails));
updateRails();

const started = Date.now();
setInterval(() => {
  if (document.hidden) return;
  const now = new Date();
  $("mon-clock").textContent = utc(now);
  const up = Math.floor((Date.now() - started) / 1000);
  $("mon-uptime").textContent = `${pad(Math.floor(up / 3600))}:${pad(Math.floor(up / 60) % 60)}:${pad(up % 60)}`;

  const t = monitor.t;
  monitor.spark.push(t.bucket);
  t.bucket = 0;
  if (monitor.spark.length > 30) monitor.spark.shift();
  const peak = Math.max(6, ...monitor.spark);
  const svg = $("mon-spark");
  const bw = 100 / 30;
  svg.replaceChildren(...monitor.spark.map((v, i) => {
    const h = Math.max(1.5, (v / peak) * 30);
    const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    r.setAttribute("x", (i * bw + bw * 0.18).toFixed(2));
    r.setAttribute("width", (bw * 0.64).toFixed(2));
    r.setAttribute("y", (32 - h).toFixed(2));
    r.setAttribute("height", h.toFixed(2));
    if (i === monitor.spark.length - 1) r.setAttribute("class", "now");
    return r;
  }));
  $("mon-events").textContent = t.events.toLocaleString("en-US");
  $("mon-alerts").textContent = t.alerts;
  $("mon-contained").textContent = t.contained;

  t.recentAlerts = t.recentAlerts.filter((ts) => Date.now() - ts < 12000);
  const n = t.recentAlerts.length;
  const level = n >= 3 ? ["HIGH", "crit", 90] : n >= 1 ? ["ELEVATED", "warn", 55] : ["LOW", "ok", 18];
  const lv = $("mon-level");
  lv.textContent = level[0];
  lv.className = `mon-level lv-${level[1]}`;
  $("mon-meter").style.width = `${level[2]}%`;
  $("mon-meter").className = `lv-${level[1]}`;
}, 1000);

// ---- Effects ----

// Window controls: close / minimize fold the body, maximize widens.
const GLYPH = {
  close: '<path d="M2 2l4 4M6 2 2 6" stroke="#4d0000" stroke-width="1.3" stroke-linecap="round"/>',
  min:   '<path d="M1.5 4h5" stroke="#5a3a00" stroke-width="1.3" stroke-linecap="round"/>',
  max:   '<path d="M1.6 4h4.8M4 1.6v4.8" stroke="#004d00" stroke-width="1.3" stroke-linecap="round"/>',
};
document.querySelectorAll(".window").forEach((win) => {
  const bar = win.querySelector(".titlebar");
  const lights = el("span", { class: "lights" });
  const button = (kind, label, onClick) => {
    const b = el("button", { class: `light ${kind}`, type: "button", "aria-label": label });
    b.innerHTML = `<svg viewBox="0 0 8 8" aria-hidden="true">${GLYPH[kind]}</svg>`;
    b.addEventListener("click", onClick);
    lights.append(b);
  };
  const reopenIfFolded = () => {
    if (win.classList.contains("is-closed") || win.classList.contains("is-min")) {
      win.classList.remove("is-closed", "is-min");
      return true;
    }
    return false;
  };
  const changed = () => win.dispatchEvent(new Event("windowchange"));
  button("close", "Close section", () => { if (!reopenIfFolded()) win.classList.add("is-closed"); changed(); });
  button("min", "Minimize section", () => { if (!reopenIfFolded()) win.classList.add("is-min"); changed(); });
  button("max", "Expand section", () => { reopenIfFolded(); win.classList.toggle("is-max"); changed(); });
  bar.prepend(lights);
  bar.addEventListener("click", (e) => { if (!e.target.closest(".light") && reopenIfFolded()) changed(); });
});


// Reveal on scroll
const revealables = document.querySelectorAll(".skill-card, .card, .cert");
if ("IntersectionObserver" in window && !reduceMotion) {
  revealables.forEach((n) => n.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const i = [...e.target.parentElement.children].indexOf(e.target);
      e.target.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
      e.target.classList.add("seen");
      io.unobserve(e.target);
      e.target.addEventListener("transitionend", function done() {
        e.target.classList.remove("reveal", "seen");
        e.target.style.transitionDelay = "";
        e.target.removeEventListener("transitionend", done);
      });
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  revealables.forEach((n) => io.observe(n));
}

// Window focus: --f (0-1) per window, consumed by CSS.
const windows = [...document.querySelectorAll(".window")];
let focusQueued = false;
function updateFocus() {
  focusQueued = false;
  const vh = window.innerHeight;
  for (const w of windows) {
    const r = w.getBoundingClientRect();
    const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
    const ratio = Math.max(0, Math.min(1, visible / Math.min(r.height, vh * 0.55)));
    const f = ratio * ratio * (3 - 2 * ratio);
    w.style.setProperty("--f", f.toFixed(3));
  }
  updateRails();
}
if (!reduceMotion) {
  const queue = () => { if (!focusQueued) { focusQueued = true; requestAnimationFrame(updateFocus); } };
  scrollTasks.push(updateFocus);
  window.addEventListener("resize", queue);
  windows.forEach((w) => w.addEventListener("transitionend", queue));
  updateFocus();
}

// Pinned hero: the journey list scrolls before the page does.
const hero = document.querySelector(".hero");
const heroWin = hero.querySelector(".window");
const jView = $("journey-view");
const jList = $("journey");
const NAV_SPACE = 84;          // matches .hero.pin .window { top: 84px }
const PIN_PAD = 18;            // matches .hero.pin { padding-top: 18px }
const SCROLL_PER_PX = 1.4;
let jTravel = 0;

function layoutPin() {
  const canPin = jList && window.matchMedia("(min-width: 1041px) and (min-height: 560px)").matches
    && !heroWin.classList.contains("is-min") && !heroWin.classList.contains("is-closed");
  hero.classList.toggle("pin", !!canPin);
  if (!canPin) {
    hero.style.height = "";
    if (jList) {
      jList.style.transform = "";
      jList.querySelectorAll("li").forEach((li) => li.classList.add("on"));
      jView.style.setProperty("--jp", "100%");
    }
    return;
  }
  const about = hero.querySelector(".about");
  const dash = hero.querySelector(".dash");
  if (about.scrollHeight > dash.clientHeight + 2) {
    hero.classList.remove("pin");
    hero.style.height = "";
    jList.style.transform = "";
    jList.querySelectorAll("li").forEach((li) => li.classList.add("on"));
    jView.style.setProperty("--jp", "100%");
    return;
  }
  jTravel = Math.max(0, jList.scrollHeight - jView.clientHeight + 40);
  const winH = heroWin.offsetHeight;
  hero.style.height = `${PIN_PAD + winH + jTravel * SCROLL_PER_PX}px`;
  updatePin();
}

function updatePin() {
  if (!hero.classList.contains("pin")) return;
  const scrolled = -(hero.getBoundingClientRect().top + PIN_PAD - NAV_SPACE);
  const p = jTravel ? Math.max(0, Math.min(1, scrolled / (jTravel * SCROLL_PER_PX))) : 1;
  const y = p * jTravel;
  jList.style.transform = `translateY(${-y}px)`;
  jView.style.setProperty("--jp", `${Math.max(4, p * 100)}%`);
  const line = y + jView.clientHeight * 0.62;
  jList.querySelectorAll("li").forEach((li) => li.classList.toggle("on", p > 0.98 || li.offsetTop <= line));
  const hint = $("journey-hint");
  if (hint) hint.style.opacity = String(Math.max(0, 1 - p * 4));
}

if (jList) {
  layoutPin();
  scrollTasks.push(updatePin);
  window.addEventListener("resize", layoutPin);
  heroWin.addEventListener("windowchange", () => setTimeout(layoutPin, 480));
  document.fonts && document.fonts.ready.then(layoutPin);
}

// Nav: active link + ink indicator
const navLinks = [...document.querySelectorAll(".nav-links a")];
const navInk = $("nav-ink");
function moveInk(a) {
  if (!a) { navInk.style.opacity = "0"; return; }
  navInk.style.opacity = "1";
  navInk.style.width = `${a.offsetWidth - 20}px`;
  navInk.style.transform = `translateX(${a.offsetLeft + 10}px)`;
}
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    let active = null;
    navLinks.forEach((a) => {
      const on = a.getAttribute("href") === "#" + e.target.id;
      a.classList.toggle("on", on);
      if (on) active = a;
    });
    moveInk(active);
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main > section").forEach((sec) => {
  if (!navLinks.some((a) => a.getAttribute("href") === `#${sec.id}`)) spy.observe(sec);
});
window.addEventListener("resize", () => moveInk(document.querySelector(".nav-links a.on")));

if (P.available) $("nav-status").textContent = `Available ${(P.available.split("·").pop() || "").trim()}`.trim();
else $("nav-status").remove();
for (const key of ["GitHub", "LinkedIn", "Résumé"]) {
  const link = (SITE.links || []).find((l) => l.label === key && l.url);
  if (!link) continue;
  const ext = /^https?:/.test(link.url);
  $("nav-icons").append(el("a", {
    class: "nav-icon", href: link.url, "aria-label": key, title: key,
    target: ext ? "_blank" : undefined, rel: ext ? "noopener" : undefined,
    download: /\.pdf$/i.test(link.url) ? true : undefined,
  }, iconNode(link.icon, key, null, "mono")));
}

scrollTasks.push(() => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $("nav-progress").style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
});

// ---- Command palette (⌘K) ----
(function palette() {
  const wrap = $("palette"), input = $("palette-input"), list = $("palette-list");
  const go = (hash) => () => document.querySelector(hash)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  const open = (url) => () => window.open(url, "_blank", "noopener");
  const items = [
    ...[...document.querySelectorAll(".window")].map((w) => ({
      kind: "section", label: w.querySelector(".wtitle").textContent, run: go(`#${w.closest("section").id}`),
    })),
    ...(SITE.projects || []).filter((p) => p.repo).map((p) => ({ kind: "project", label: p.title, hint: "open repo ↗", run: open(p.repo) })),
    ...(SITE.links || []).filter((l) => l.url).map((l) => {
      if (/^mailto:/i.test(l.url)) {
        const addr = l.url.replace(/^mailto:/i, "");
        return { kind: "action", label: "Copy email address", hint: addr, run: async () => { await copyText(addr); toast(el("b", {}, "✓ Copied "), addr); } };
      }
      return { kind: "link", label: l.label, hint: /\.pdf$/i.test(l.url) ? "download" : "open ↗", run: /^https?:/.test(l.url) ? open(l.url) : () => { location.href = l.url; } };
    }),
    { kind: "action", label: "Send me a message", hint: "contact form", run: go("#contact") },
  ];
  let shown = [], sel = 0;

  function render() {
    const q = input.value.trim().toLowerCase();
    shown = items.filter((it) => !q || `${it.kind} ${it.label} ${it.hint || ""}`.toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    list.replaceChildren(...(shown.length ? shown.map((it, i) => {
      const li = el("li", { class: i === sel ? "on" : "", role: "option", "aria-selected": String(i === sel) },
        el("span", { class: `pk pk-${it.kind}` }, it.kind), el("span", { class: "pl" }, it.label), it.hint ? el("span", { class: "ph" }, it.hint) : null);
      li.addEventListener("pointermove", () => { if (sel !== i) { sel = i; render(); } });
      li.addEventListener("click", () => choose(i));
      return li;
    }) : [el("li", { class: "empty" }, `no match for "${input.value}"`)]));
  }
  function choose(i) { const it = shown[i]; if (!it) return; close(); it.run(); }
  const pal = wrap.querySelector(".palette");
  const dock = $("palette-dock");
  let minimized = false;

  function openPalette(keepQuery) {
    if (!keepQuery) { input.value = ""; sel = 0; pal.classList.remove("big"); }
    minimized = false;
    dock.classList.remove("show");
    setTimeout(() => { if (!minimized) dock.hidden = true; }, 250);
    pal.classList.remove("to-dock");
    wrap.hidden = false;
    render();
    requestAnimationFrame(() => { wrap.classList.add("show"); input.focus(); });
  }
  function close() {
    minimized = false;
    wrap.classList.remove("show");
    dock.classList.remove("show");
    setTimeout(() => { wrap.hidden = true; dock.hidden = true; pal.classList.remove("big", "to-dock"); }, 220);
  }
  function minimize() {
    minimized = true;
    pal.classList.add("to-dock");
    wrap.classList.remove("show");
    $("palette-dock-q").textContent = input.value ? `"${input.value}"` : "";
    setTimeout(() => {
      wrap.hidden = true;
      dock.hidden = false;
      requestAnimationFrame(() => dock.classList.add("show"));
    }, 320);
  }
  function toggleBig() { pal.classList.toggle("big"); input.focus(); }

  const lights = $("palette-lights");
  [["close", "Close search", close], ["min", "Minimize search", minimize], ["max", "Expand search", toggleBig]].forEach(([kind, label, fn]) => {
    const b = el("button", { class: `light ${kind}`, type: "button", "aria-label": label });
    b.innerHTML = `<svg viewBox="0 0 8 8" aria-hidden="true">${GLYPH[kind]}</svg>`;
    b.addEventListener("click", fn);
    lights.append(b);
  });
  dock.addEventListener("click", () => openPalette(true));

  $("open-palette").addEventListener("click", () => openPalette(minimized));
  wrap.addEventListener("click", (e) => { if (e.target === wrap) close(); });
  input.addEventListener("input", () => { sel = 0; render(); });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); wrap.hidden ? openPalette(minimized) : close(); return; }
    if (wrap.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % Math.max(1, shown.length); render(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + shown.length) % Math.max(1, shown.length); render(); }
    else if (e.key === "Enter") { e.preventDefault(); choose(sel); }
  });
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) document.querySelector(".nav-search kbd").textContent = "Ctrl K";
})();
navLinks.forEach((a) => {
  const t = document.querySelector(a.getAttribute("href"));
  if (t) spy.observe(t);
});

// ---- Terminal-caret cursor (mouse/trackpad only) ----
(function caretCursor() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const box = $("cursor");
  if (!box) return;
  document.documentElement.classList.add("has-cursor");
  const caret = box.querySelector(".caret");

  const W = 10, H = 20;
  let mx = -100, my = -100;
  let x = mx, y = my, w = W, h = H;
  let target = null;
  let idleTimer;
  const ease = reduceMotion ? 1 : 0.35;

  const LINKY = "a, button, [role=button], summary, label";
  const TEXT = "input, textarea, select, [contenteditable]";

  let running = false;
  const wake = () => { if (!running) { running = true; requestAnimationFrame(frame); } };
  scrollTasks.push(wake);

  document.addEventListener("pointermove", (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    mx = e.clientX; my = e.clientY;
    wake();
    box.classList.add("live");
    box.classList.remove("idle");
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => box.classList.add("idle"), 650);
    const inText = !!e.target.closest(TEXT);
    box.classList.toggle("text-mode", inText);
    target = inText ? null : e.target.closest(LINKY);
  }, { passive: true });
  document.addEventListener("pointerdown", () => box.classList.add("press"));
  document.addEventListener("pointerup", () => box.classList.remove("press"));
  document.documentElement.addEventListener("pointerleave", () => box.classList.remove("live"));
  window.addEventListener("blur", () => box.classList.remove("live"));

  function frame() {
    let tx = mx, ty = my, tw = W, th = H;
    if (target && target.isConnected) {
      const r = target.getBoundingClientRect();
      tx = r.left; ty = r.bottom + 5; tw = r.width; th = 2;
    } else {
      target = null;
    }
    x += (tx - x) * ease; y += (ty - y) * ease;
    w += (tw - w) * ease; h += (th - h) * ease;
    caret.style.transform = `translate(${x}px, ${y}px)`;
    caret.style.width = `${w}px`;
    caret.style.height = `${h}px`;
    box.classList.toggle("on-link", !!target);
    const settled = Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(tw - w) + Math.abs(th - h) < 0.3;
    if (settled) { running = false; return; }
    requestAnimationFrame(frame);
  }
})();
