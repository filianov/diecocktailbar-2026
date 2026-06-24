/* =====================================================================
   diecocktailbar.at — shared site logic
   Header/footer injection, navigation, lightbox, forms, reveal
   ===================================================================== */
(function () {
  "use strict";

  /* ---- central config — client edits these in ONE place ---- */
  const CFG = {
    phone: "+43 1 000 00 00",          // TODO: echte Telefonnummer eintragen
    phoneHref: "+43100000",            // TODO
    whatsapp: "4310000000",            // TODO: WhatsApp-Nummer (ohne +)
    emailEvent: "office@showbar.at",   // TODO bestätigen
    emailAcademy: "office@baracademy.at",
    address: "Engerthstraße 60, 1200 Wien",
    instagram: "https://instagram.com/", // TODO
    facebook: "https://facebook.com/",   // TODO
  };

  const NAV = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "angebot.html", label: "Angebot", key: "angebot" },
    { href: "austrian-bar-academy.html", label: "Bar Academy", key: "academy" },
    { href: "referenzen.html", label: "Referenzen", key: "referenzen" },
    { href: "gallery.html", label: "Gallery", key: "gallery" },
    { href: "presse.html", label: "Presse", key: "presse" },
    { href: "kontakt.html", label: "Kontakt", key: "kontakt" },
  ];

  const ICON = {
    shaker:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8l-1.2 3H9.2L8 2Z"/><path d="M9.2 5h5.6l-.9 3.2a3 3 0 0 1-.9 1.4l-.5.4a2 2 0 0 0-.7 1.5V21a1 1 0 0 1-1 1h-.6a1 1 0 0 1-1-1v-9.1a2 2 0 0 0-.7-1.5l-.5-.4a3 3 0 0 1-.9-1.4L9.2 5Z"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    pin:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    wa:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.06 24l1.68-6.13A11.8 11.8 0 0 1 .16 11.9C.16 5.34 5.5 0 12.06 0a11.8 11.8 0 0 1 8.4 3.49 11.8 11.8 0 0 1 3.48 8.4c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 0 1-5.7-1.45L.06 24Zm6.6-3.8c1.68.99 3.28 1.58 5.4 1.58 5.45 0 9.9-4.43 9.9-9.88a9.84 9.84 0 0 0-2.9-7 9.78 9.78 0 0 0-7-2.9c-5.46 0-9.9 4.44-9.9 9.9 0 2.2.65 3.85 1.74 5.58l-.99 3.62 3.75-.98ZM17.4 14.6c-.07-.12-.27-.2-.56-.34-.3-.15-1.75-.87-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.95-.93 1.15-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.86 1.21 3.06.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.24-.7.24-1.29.17-1.41Z"/></svg>',
    ig:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    fb:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1Z"/></svg>',
    sun:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>',
    moon:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  };

  const themeToggleHtml = (extraClass) =>
    `<button class="theme-toggle ${extraClass || ''}" type="button" aria-label="Helles / dunkles Design wechseln" title="Design wechseln">
       <span class="ic-sun">${ICON.sun}</span><span class="ic-moon">${ICON.moon}</span>
     </button>`;

  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("dcb-theme", t); } catch (e) {}
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    setTheme(cur === "light" ? "dark" : "light");
  }

  const brand = (color) => `
    <a class="brand" href="index.html" aria-label="diecocktailbar.at — Startseite">
      <span class="brand__mark">${ICON.shaker}</span>
      <span class="brand__text">
        <span class="brand__name">die<b>cocktailbar</b>.at</span>
        <span class="brand__tag">Mobiles Barcatering · Wien</span>
      </span>
    </a>`;

  /* ---------- Header ---------- */
  function buildHeader(active) {
    const links = NAV.map(
      (n) => `<a href="${n.href}" ${n.key === active ? 'class="active"' : ""}>${n.label}</a>`
    ).join("");
    const mlinks = NAV.map(
      (n, i) =>
        `<a href="${n.href}" ${n.key === active ? 'class="active"' : ""}><span>${n.label}</span><span class="idx">0${i + 1}</span></a>`
    ).join("");

    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="container">
        ${brand()}
        <nav class="nav" aria-label="Hauptnavigation">${links}</nav>
        <div class="header-cta">
          ${themeToggleHtml()}
          <a class="btn btn--primary" href="kontakt.html">Angebot anfragen</a>
          <button class="burger" aria-label="Menü öffnen" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>`;
    document.body.prepend(header);

    const menu = document.createElement("div");
    menu.className = "mobile-menu";
    menu.innerHTML = `
      <nav aria-label="Mobile Navigation">${mlinks}</nav>
      <div class="mm-foot">
        <a href="tel:${CFG.phoneHref}">${CFG.phone}</a> ·
        <a href="mailto:${CFG.emailEvent}">${CFG.emailEvent}</a>
        <div class="mm-theme">${themeToggleHtml()}<span>Helles / dunkles Design</span></div>
      </div>`;
    document.body.appendChild(menu);

    document.querySelectorAll(".theme-toggle").forEach((btn) =>
      btn.addEventListener("click", toggleTheme)
    );

    const burger = header.querySelector(".burger");
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      })
    );

    const onScroll = () =>
      header.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Footer + action bar ---------- */
  function buildFooter() {
    const col = (title, items) =>
      `<div class="footer-col"><h4>${title}</h4>${items
        .map((i) => `<a href="${i[1]}">${i[0]}</a>`)
        .join("")}</div>`;

    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-about">
            ${brand()}
            <p>Professionelles Cocktail- &amp; Barcatering, Showbarkeeping und die Austrian Bar Academy — seit über 20 Jahren Ihr Partner für unvergessliche Events in ganz Österreich.</p>
            <div class="social">
              <a href="${CFG.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${ICON.ig}</a>
              <a href="${CFG.facebook}" aria-label="Facebook" target="_blank" rel="noopener">${ICON.fb}</a>
              <a href="https://wa.me/${CFG.whatsapp}" aria-label="WhatsApp" target="_blank" rel="noopener">${ICON.wa}</a>
            </div>
          </div>
          ${col("Navigation", [
            ["Angebot", "angebot.html"],
            ["Bar Academy", "austrian-bar-academy.html"],
            ["Referenzen", "referenzen.html"],
            ["Gallery", "gallery.html"],
            ["Presse", "presse.html"],
          ])}
          ${col("Leistungen", [
            ["Cocktail Catering", "angebot.html"],
            ["Mobile Bars", "angebot.html"],
            ["Show Barkeeping", "angebot.html"],
            ["Barkeeper Lehrgang", "austrian-bar-academy.html"],
            ["Geschenk-Gutschein", "austrian-bar-academy.html#gutschein"],
          ])}
          <div class="footer-col">
            <h4>Kontakt</h4>
            <a href="tel:${CFG.phoneHref}">${CFG.phone}</a>
            <a href="mailto:${CFG.emailEvent}">${CFG.emailEvent}</a>
            <a href="https://wa.me/${CFG.whatsapp}" target="_blank" rel="noopener">WhatsApp Chat</a>
            <a href="https://maps.google.com/?q=Engerthstraße+60+1200+Wien" target="_blank" rel="noopener">${CFG.address}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${"2026"} diecocktailbar.at — Thomas Sipos. Alle Rechte vorbehalten.</span>
          <span>
            <a href="impressum.html">Impressum</a> &nbsp;·&nbsp;
            <a href="datenschutz.html">Datenschutz</a>
          </span>
        </div>
      </div>`;
    document.body.appendChild(footer);

    const bar = document.createElement("div");
    bar.className = "action-bar";
    bar.innerHTML = `
      <a href="tel:${CFG.phoneHref}">${ICON.phone}<span>Anrufen</span></a>
      <a href="https://wa.me/${CFG.whatsapp}" target="_blank" rel="noopener">${ICON.wa}<span>WhatsApp</span></a>
      <a class="primary" href="kontakt.html">${ICON.shaker}<span>Anfragen</span></a>`;
    document.body.appendChild(bar);
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    const figs = Array.from(document.querySelectorAll("[data-lightbox] figure img, img[data-lightbox-item]"));
    if (!figs.length) return;
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = `
      <button class="lightbox__close" aria-label="Schließen">✕</button>
      <button class="lightbox__nav prev" aria-label="Zurück">‹</button>
      <button class="lightbox__nav next" aria-label="Weiter">›</button>
      <img alt="">
      <div class="lightbox__cap"></div>`;
    document.body.appendChild(box);
    const imgEl = box.querySelector("img");
    const capEl = box.querySelector(".lightbox__cap");
    let idx = 0;
    const srcs = figs.map((f) => ({
      src: f.getAttribute("data-full") || f.src,
      cap: f.getAttribute("alt") || "",
    }));
    const show = (i) => {
      idx = (i + srcs.length) % srcs.length;
      imgEl.src = srcs[idx].src;
      imgEl.alt = srcs[idx].cap;
      capEl.textContent = srcs[idx].cap;
    };
    const open = (i) => {
      show(i);
      box.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      box.classList.remove("open");
      document.body.style.overflow = "";
    };
    figs.forEach((f, i) => {
      f.style.cursor = "zoom-in";
      f.addEventListener("click", () => open(i));
    });
    box.querySelector(".lightbox__close").addEventListener("click", close);
    box.querySelector(".prev").addEventListener("click", () => show(idx - 1));
    box.querySelector(".next").addEventListener("click", () => show(idx + 1));
    box.addEventListener("click", (e) => {
      if (e.target === box) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- Forms (demo handling) ---------- */
  function initForms() {
    document.querySelectorAll("form[data-demo-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        const wrap = form.closest(".form-wrap") || form.parentElement;
        const success = wrap.querySelector(".form-success");
        form.style.display = "none";
        if (success) {
          success.classList.add("show");
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });
  }

  /* ---------- Year + config links fill ---------- */
  function fillConfig() {
    document.querySelectorAll("[data-cfg]").forEach((el) => {
      const k = el.getAttribute("data-cfg");
      if (CFG[k] == null) return;
      if (el.tagName === "A") {
        if (k === "phone") el.href = "tel:" + CFG.phoneHref;
        else if (k === "whatsapp") el.href = "https://wa.me/" + CFG.whatsapp;
        else if (k.startsWith("email")) el.href = "mailto:" + CFG[k];
        el.textContent = el.textContent.trim() || CFG[k];
        if (!el.textContent) el.textContent = CFG[k];
      } else {
        el.textContent = CFG[k];
      }
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const active = document.body.getAttribute("data-page") || "";
    buildHeader(active);
    buildFooter();
    fillConfig();
    initReveal();
    initLightbox();
    initForms();
  });
})();
