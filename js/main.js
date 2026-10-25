// Mobile menu: open/close with the button, close with Escape or after choosing a link.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".nav-toggle__label").textContent = open ? "Zavřít" : "Menu";
    nav.classList.toggle("is-open", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  // Reset when the window grows to desktop width
  window.matchMedia("(min-width: 64em)").addEventListener("change", function (mq) {
    if (mq.matches) setOpen(false);
  });
})();

// Contact form: send to Formspark in the background and show the result on the page.
// Without JavaScript the form still works – it simply opens Formspark's own thank-you page.
(function () {
  var form = document.querySelector("[data-ajax-form]");
  if (!form || !window.fetch) return;

  var status = form.querySelector(".form__status");
  var button = form.querySelector("[type=submit]");

  function showStatus(type, message) {
    status.hidden = false;
    status.className = "form__status form__status--" + type;
    status.textContent = message;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    button.disabled = true;
    showStatus("sending", "Odesílám…");

    fetch(form.action, {
      method: "POST",
      body: new URLSearchParams(new FormData(form)),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (!response.ok) throw new Error(response.status);
        form.reset();
        showStatus("success", "Děkuji, zpráva byla odeslána. Ozvu se vám co nejdříve. Grazie!");
      })
      .catch(function () {
        // EDIT: contact email
        showStatus("error", "Zprávu se nepodařilo odeslat. Zkuste to prosím znovu, nebo mi napište e-mail na ciao@vitalenta.cz.");
      })
      .then(function () {
        button.disabled = false;
      });
  });
})();

// Slow reveal: sections below the first screen appear gently, one after another.
// Skipped when the visitor prefers reduced motion; without JavaScript everything is simply visible.
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var items = document.querySelectorAll("main > .section:not(.hero) > .container > *");
  if (!items.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px 12% 0px", threshold: 0 });

  // Blocks already on the first screen stay visible: hiding them after the page has painted
  // is what made the page flicker when moving between pages.
  items.forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add("reveal");
    observer.observe(el);
  });
})();
