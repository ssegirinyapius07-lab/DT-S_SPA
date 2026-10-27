"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const config = window.DTS_SITE_CONFIG || {};
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-contact-address]").forEach(function (element) {
    element.textContent = config.address || "Kampala, Uganda";
  });
  document.querySelectorAll("[data-contact-phone]").forEach(function (element) {
    if (config.phoneDisplay && config.phoneHref) {
      element.textContent = config.phoneDisplay;
      if (element.tagName === "A") element.href = "tel:" + config.phoneHref;
    } else {
      element.textContent = "Official phone number to be added";
      if (element.tagName === "A") {
        element.removeAttribute("href");
        element.classList.add("contact-unconfigured");
      }
    }
  });
  document.querySelectorAll("[data-contact-email]").forEach(function (element) {
    if (config.email) {
      element.textContent = config.email;
      if (element.tagName === "A") element.href = "mailto:" + config.email;
    } else {
      element.textContent = "Official email to be added";
      if (element.tagName === "A") {
        element.removeAttribute("href");
        element.classList.add("contact-unconfigured");
      }
    }
  });

  const dateInput = document.querySelector("#guest-date");
  if (dateInput) {
    const now = new Date();
    dateInput.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      const field = document.querySelector("#guest-service");
      if (field) field.value = link.getAttribute("data-service") || "";
    });
  });

  const form = document.querySelector("#booking-form");
  const preview = document.querySelector("#booking-preview");
  const requestMessage = document.querySelector("#request-message");
  const sendWhatsApp = document.querySelector("#send-whatsapp");
  const status = document.querySelector("#form-status");

  if (form && preview && requestMessage) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const service = String(data.get("service") || "").trim();
      const date = String(data.get("date") || "").trim();
      const time = String(data.get("time") || "").trim();
      const note = String(data.get("note") || "").trim();
      const lines = [
        "Hello DT-S Spa, I would like to enquire about a visit.",
        "",
        "Name: " + name,
        "My phone: " + phone,
        "Service: " + service,
        "Preferred date: " + (date || "Flexible"),
        "Preferred time: " + (time || "Flexible")
      ];
      if (note) lines.push("Questions / details: " + note);
      lines.push("", "Please confirm availability and the current price. Thank you.");

      const message = lines.join("\n");
      requestMessage.value = message;
      preview.hidden = false;

      const destination = String(config.whatsappNumber || "").replace(/\D/g, "");
      if (destination) {
        sendWhatsApp.href = "https://wa.me/" + destination + "?text=" + encodeURIComponent(message);
        sendWhatsApp.hidden = false;
        if (status) status.textContent = "Your message is ready. Check the details below, then continue to WhatsApp and press Send.";
      } else {
        sendWhatsApp.hidden = true;
        if (status) status.textContent = "Your message is ready to copy. The official WhatsApp number has not been configured yet, so no message has been sent.";
      }
      preview.scrollIntoView({behavior:"smooth", block:"nearest"});
    });
  }

  const copyButton = document.querySelector("#copy-request");
  if (copyButton && requestMessage) {
    copyButton.addEventListener("click", async function () {
      const status = document.querySelector("#form-status");
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(requestMessage.value);
        } else {
          requestMessage.focus();
          requestMessage.select();
          const copied = document.execCommand("copy");
          if (!copied) throw new Error("Copy is not available in this browser");
        }
        if (status) status.textContent = "Enquiry copied. You can paste it into a message to the spa.";
      } catch (error) {
        requestMessage.focus();
        requestMessage.select();
        if (status) status.textContent = "Select the message above and copy it manually.";
      }
    });
  }
});