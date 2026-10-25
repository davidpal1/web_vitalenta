# Vita Lenta – web lekcí italštiny

Static website (plain HTML + CSS + a little JS). No build step, no backend.

## How to preview locally

In PyCharm: open `index.html` and click a browser icon in the top-right corner of the
editor (or right-click → *Open In* → *Browser*). PyCharm serves the site on a local
server, so it behaves like the real website. Double-clicking the file works too.

## How to edit texts and prices

- Every page is one `.html` file. Text is plain text between tags – just change it.
- Places meant to be edited are marked with `<!-- EDIT: ... -->` comments.
- Prices live only in `cenik.html`.
- The header and footer are repeated on every page. When you change a menu item or
  a contact detail, change it in **all** `.html` files (PyCharm: *Edit → Find →
  Replace in Files*, `Ctrl+Shift+R`).

### Czech typography tips

- Put a non-breaking space after one-letter words so they don't end a line:
  `v&nbsp;Praze`, `s&nbsp;radostí`, `k&nbsp;lekci`, `a&nbsp;proto`.
- Use Czech quotes „takto“ and a dash with spaces – like this (not a hyphen).
- Non-breaking space also between a number and its unit: `60&nbsp;min`, `650&nbsp;Kč`.

## SEO and sharing

- Each page has its own `<title>` and `<meta name="description">` – that's what Google
  shows in search results. Keep the title under ~60 and the description under ~155 characters.
- The `og:` tags control the preview when a link is shared (WhatsApp, Facebook…).
  The preview image is `img/og-image.jpg` (1200 × 630 px).
- The domain `https://vitalenta.cz` is written in the `<head>` of every page, in
  `sitemap.xml` and `robots.txt`. If the domain changes, use *Replace in Files*.
- New page? Copy an existing one, change title/description/canonical/og tags,
  and add it to `sitemap.xml`.

## Structure

```
index.html            Home
lekce.html            Lessons
cenik.html            Pricing (the only place with prices)
o-mne.html            About me
kontakt.html          Contact + Formspark form
ochrana-osobnich-udaju.html   Privacy policy
404.html              "Page not found"
sitemap.xml, robots.txt       For search engines
favicon.ico, apple-touch-icon.png   Browser / phone icons
css/style.css         All styles (colours and fonts at the top, in :root)
js/main.js            Mobile menu
fonts/                Self-hosted fonts (no requests to Google)
img/                  Optimised images
```

## Design tokens

| Name        | Hex       | Use                                   |
|-------------|-----------|---------------------------------------|
| Espresso    | `#36231A` | Body text, dark sections               |
| Sea blue    | `#0E4466` | Links, primary buttons                 |
| Chianti     | `#5A1428` | Accents, hover, highlights             |
| Olive       | `#7F8A2A` | Decoration only (fails contrast as text) |
| Travertine  | `#E8D9BE` | Soft backgrounds, text on dark          |
| Cream       | `#FAF6EF` | Page background                        |

### Design (active look + spare looks)

The look sits on top of `style.css` and is chosen in **one place**: `css/theme-aktivni.css`
(a single `@import` line). Every page loads that file.

- `css/theme-como.css` – **Lago di Como** (active): quiet luxury – cashmere and linen, navy and tobacco, hairline rules, light headings, offset portrait frame, softly rounded (3 px)
- `css/theme-vila.css` – **Toskánská vila** (spare): plaster texture, terracotta, cypress green, arched cards, Roman numerals
- `css/theme-sale.css` – **Sapore di sale** (spare)

To swap the look, change the `@import url("...")` line in `css/theme-aktivni.css` to another file.

Fonts: **Cormorant Garamond** (headings) and **Montserrat** (body), both under the
SIL Open Font License, self-hosted in `fonts/`.

## Publishing on GitHub Pages

1. Create a **new, empty** repository on GitHub and push the *contents* of this folder to it
   (the folder itself should be the repository root, so `index.html` sits at the top).
2. *Settings → Pages → Build and deployment → Deploy from a branch* → branch `main`, folder `/ (root)`.
3. The site is then at `https://<user>.github.io/<repo>/`. Until the custom domain is connected:
   open `404.html` and set `<base href="/<repo>/">` (it is `"/"` for the custom domain).
4. Custom domain `vitalenta.cz`: *Settings → Pages → Custom domain*, add a `CNAME` file containing
   `vitalenta.cz` to the repository root, set the DNS records at the registrar and tick *Enforce HTTPS*.
5. After the domain works: submit `https://vitalenta.cz/sitemap.xml` in Google Search Console.

## Before going live – checklist

- Contact form: send a test message and check that it arrives (Formspark endpoint is in `kontakt.html`).
- `ochrana-osobnich-udaju.html`: read it once more; update it if hosting, form service or analytics change.
- Prices and terms live in `cenik.html`; legal details (name, IČO, address) are in the footer of every page.
- Check the site at 360 / 768 / 1024 / 1440 px.

## Rights

The texts, photographs and illustrations are © Tereza Kasalová, all rights reserved – please do not reuse them.
Fonts (Cormorant Garamond, Montserrat) are under the SIL Open Font License (see `fonts/`).
<!-- EDIT: choose a license for the code (e.g. MIT) or leave it as "all rights reserved". -->
