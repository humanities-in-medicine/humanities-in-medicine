function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function cardHtml({ image, imageAlt, date, title, description, location, link, linkText }) {
  const hasImage = Boolean(image);
  const inner = `
    ${hasImage ? `
      <div class="card-img-wrap">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(imageAlt || title)}" class="card-img">
      </div>` : ""}
    <div class="card-body">
      ${date ? `<p class="date">${escapeHtml(date)}</p>` : ""}
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
      ${location ? `<p><strong>Location:</strong> ${escapeHtml(location)}</p>` : ""}
      ${link ? `<p><a href="${escapeHtml(link)}">${escapeHtml(linkText || "Learn more →")}</a></p>` : ""}
    </div>`;

  return `<article class="card${hasImage ? " card--with-image" : " card--text-only"}">${inner}</article>`;
}

function applySiteMeta(site) {
  document.querySelectorAll("[data-site-name]").forEach((el) => {
    el.textContent = site.name;
  });

  document.querySelectorAll("[data-site-email]").forEach((el) => {
    el.href = `mailto:${site.email}`;
    el.textContent = site.email;
  });

  document.querySelectorAll("[data-site-instagram]").forEach((el) => {
    el.href = site.instagram;
    el.textContent = el.dataset.siteInstagram === "handle"
      ? site.instagramHandle
      : "Instagram";
  });

  document.querySelectorAll("[data-site-year]").forEach((el) => {
    el.textContent = site.year;
  });
}

function renderHome(content) {
  const { site, home } = content;

  document.title = site.name;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = site.description;

  const hero = document.getElementById("hero-content");
  if (hero) {
    hero.innerHTML = `
      <div>
        <h1>${escapeHtml(site.name)}</h1>
        <p class="hero-tagline">${escapeHtml(site.tagline)}</p>
        <p class="lead">${escapeHtml(home.lead)}</p>
        <div class="quick-links">
          <a href="events.html" class="btn">Upcoming Events</a>
          <a href="journal.html" class="btn btn-outline">Read the Journal</a>
        </div>
      </div>
      <figure class="hero-image">
        <img src="${escapeHtml(home.heroImage)}" alt="${escapeHtml(home.heroImageAlt)}">
      </figure>`;
  }

  const pillars = document.getElementById("pillars-grid");
  if (pillars) {
    pillars.innerHTML = home.pillars.map((p) => cardHtml({
      image: p.image,
      imageAlt: p.imageAlt,
      title: p.title,
      description: p.description,
    })).join("");
  }

  const highlights = document.getElementById("highlights-grid");
  if (highlights) {
    highlights.innerHTML = home.highlights.map((h) => cardHtml({
      image: h.image,
      imageAlt: h.imageAlt,
      date: h.date,
      title: h.title,
      description: h.description,
      link: h.link,
      linkText: h.linkText,
    })).join("");
  }
}

function renderEvents(content) {
  const { site, events } = content;
  document.title = `Events — ${site.name}`;

  const banner = document.getElementById("page-banner");
  if (banner) {
    banner.innerHTML = `<img src="${escapeHtml(events.bannerImage)}" alt="${escapeHtml(events.bannerAlt)}">`;
  }

  const lead = document.getElementById("page-lead");
  if (lead) lead.textContent = events.lead;

  const grid = document.getElementById("events-grid");
  if (grid) {
    grid.innerHTML = events.items.map((e) => cardHtml({
      image: e.image,
      imageAlt: e.imageAlt,
      date: e.date,
      title: e.title,
      description: e.description,
      location: e.location,
    })).join("");
  }

  const ig = document.getElementById("events-instagram");
  if (ig) {
    ig.href = site.instagram;
    ig.textContent = `${site.instagramHandle} on Instagram →`;
  }
}

function renderJournal(content) {
  const { site, journal } = content;
  document.title = `Journal — ${site.name}`;

  const banner = document.getElementById("page-banner");
  if (banner) {
    banner.innerHTML = `<img src="${escapeHtml(journal.bannerImage)}" alt="${escapeHtml(journal.bannerAlt)}">`;
  }

  const lead = document.getElementById("page-lead");
  if (lead) lead.textContent = journal.lead;

  const list = document.getElementById("issue-list");
  if (list) {
    list.innerHTML = journal.issues.map((issue) => `
      <li class="issue-item">
        <div class="issue-row">
          <img src="${escapeHtml(issue.coverImage)}" alt="${escapeHtml(issue.coverAlt)}" class="issue-thumb">
          <div>
            <a href="${escapeHtml(issue.pdfUrl)}" class="issue-link">${escapeHtml(issue.title)}</a>
            <p class="issue-desc">${escapeHtml(issue.theme)}</p>
          </div>
        </div>
        <span class="issue-meta">PDF</span>
      </li>`).join("");
  }

  const note = document.getElementById("submission-note");
  if (note) note.textContent = journal.submissionNote;

  const email = document.getElementById("submission-email");
  if (email) {
    email.href = `mailto:${site.email}`;
    email.textContent = site.email;
  }
}

function renderOfficers(content) {
  const { site, officers } = content;
  document.title = `Officers & Contact — ${site.name}`;

  const lead = document.getElementById("page-lead");
  if (lead) lead.textContent = officers.lead;

  const grid = document.getElementById("officer-grid");
  if (grid) {
    grid.innerHTML = officers.members.map((o) => `
      <article class="officer">
        <img src="${escapeHtml(o.photo)}" alt="${escapeHtml(o.name)}" class="officer-photo">
        <p class="role">${escapeHtml(o.role)}</p>
        <p class="name">${escapeHtml(o.name)}</p>
        <p class="bio">${escapeHtml(o.bio)}</p>
      </article>`).join("");
  }

  const intro = document.getElementById("contact-intro");
  if (intro) intro.textContent = officers.contactIntro;

  const igContact = document.getElementById("contact-instagram");
  if (igContact) {
    igContact.href = site.instagram;
    igContact.textContent = `Instagram — ${site.instagramHandle}`;
  }
}

async function loadContent() {
  const response = await fetch("content.json");
  if (!response.ok) throw new Error("Could not load content.json");
  return response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  const page = document.body.dataset.page;
  if (!page) return;

  try {
    const content = await loadContent();
    applySiteMeta(content.site);

    const renderers = {
      home: renderHome,
      events: renderEvents,
      journal: renderJournal,
      officers: renderOfficers,
    };

    if (renderers[page]) renderers[page](content);
  } catch (err) {
    console.error(err);
    const main = document.querySelector("main");
    if (main) {
      main.insertAdjacentHTML("afterbegin",
        `<p style="color:#8b3a3a;padding:1rem;background:#fde8e8;border-radius:6px;">Could not load site content. Make sure content.json is present.</p>`);
    }
  }
});
