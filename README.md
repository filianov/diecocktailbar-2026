# diecocktailbar.at — Redesign 2026

Komplette Neugestaltung der bestehenden Website **showbar.at / diecocktailbar.at**
(mobiles Cocktail-Catering, Showbarkeeping & Austrian Bar Academy, Wien) —
von einem Wix-Stand aus ~2013/2014 auf einen modernen, mobile-first Static-Site-Stand 2026.

## Designprinzip
Premium · minimalistisch · Wiener Eleganz. Markenfarbe **Bordeaux** (aus dem Original-Logo)
+ warmes Anthrazit + Elfenbein + dezentes Messing. Display-Schrift Cormorant Garamond,
Lauftext Inter. Reine HTML/CSS/JS-Seite, kein Build-Tooling, keine Abhängigkeiten.

## Struktur (identisch zum alten Seitenbaum)
| Seite | Datei |
|---|---|
| Home | `index.html` |
| Angebot | `angebot.html` |
| Austrian Bar Academy | `austrian-bar-academy.html` |
| Referenzen | `referenzen.html` |
| Gallery | `gallery.html` |
| Presse | `presse.html` |
| Kontakt | `kontakt.html` |
| Impressum (neu) | `impressum.html` |
| Datenschutz (neu) | `datenschutz.html` |

Alte URLs werden weitergeleitet: `refernezen.html` → `referenzen.html`,
`groes-raster.html` → `presse.html` (SEO-Kontinuität).

## Lokal ansehen
```bash
cd showbar-2026
python3 -m http.server 4178
# http://localhost:4178
```

## Was vor dem Livegang zu ergänzen ist (Platzhalter)
Alle zentral in **`assets/js/site.js` → `CFG`**:
- `phone` / `phoneHref` — echte Telefonnummer
- `whatsapp` — WhatsApp-Nummer
- `emailEvent` — Event-/Catering-E-Mail (aktuell `office@showbar.at` als Annahme)
- `instagram` / `facebook` — Social-Links
- **Formular-Backend**: Die Formulare zeigen aktuell nur eine Erfolgsmeldung (Demo).
  Für echten Versand an z. B. Formspree/eigenes Skript das `<form>`-`action` setzen
  bzw. den Handler in `site.js` (`initForms`) anpassen.
- Impressum/Datenschutz juristisch prüfen lassen (Vorlagen auf Basis der Altdaten).

## Verbesserungen ggü. der alten Seite
1. Mobile-first, responsives Layout statt starrer Wix-Seite.
2. Intelligentes Anfrageformular (Anliegen, Anlass, Datum, Gästezahl, Ort).
3. Eigene Kurs-Anmeldung der Bar Academy mit Kursauswahl + Gutschein-CTA.
4. Sticky Schnellkontakt-Leiste (Anrufen / WhatsApp / Anfragen) auf Mobil.
5. Referenzen & Auszeichnungen prominent aufbereitet.
6. Gallery- & Presse-Lightbox.
7. Rechtssicherheit: Impressum + DSGVO-Datenschutz.
8. SEO/OpenGraph, eigene gehostete Assets statt Wix-CDN, schnelle Ladezeit.

## Helle / dunkle Variante (Theme)
Die Seite hat einen Umschalter (Sonne/Mond) in Kopfzeile und Mobilmenü.
Die Auswahl wird im Browser gespeichert (`localStorage`).
**Standard-Theme ändern:** in [`assets/js/theme-init.js`](assets/js/theme-init.js) `DEFAULT = 'dark'`
auf `'light'` setzen — dann startet die Seite hell.

## Deployment auf GitHub Pages

**Live:** https://filianov.github.io/diecocktailbar-2026/
Repository: https://github.com/filianov/diecocktailbar-2026 (public)

Veröffentlicht über **GitHub Pages – Deploy from branch** (`main`, Ordner `/`).
`.nojekyll` sorgt dafür, dass der `assets/`-Ordner unverändert ausgeliefert wird.

### Aktualisieren (neue Änderungen live bringen)
Einfach committen und pushen — Pages baut automatisch neu (~1 Min.):
```bash
cd "showbar-2026"
git add -A
git commit -m "Update"
git push
```

### Eigene Domain (www.showbar.at)
1. Datei `CNAME` mit Inhalt `www.showbar.at` ins Repo-Root legen und pushen.
2. Beim Domain-Anbieter einen CNAME-Eintrag `www` → `filianov.github.io` setzen.
3. Auf GitHub: **Settings → Pages → Custom domain** eintragen, „Enforce HTTPS" aktivieren.

> Hinweis: Der GitHub-Token aus dem Browser-Login hat keinen `workflow`-Scope,
> daher wird Pages aktuell branch-basiert (statt via Actions-Workflow) gebaut —
> für diese reine Static-Site ist das die einfachste und stabilste Variante.

## Assets
Alle Originalbilder/Logos wurden aus dem Wix-CDN gesichert und unter
`assets/img/` mit sprechenden Namen abgelegt. Das Hero-Hintergrundvideo war
auf Wix geschützt (HTTP 403) — kann vom Kunden separat ergänzt werden.
