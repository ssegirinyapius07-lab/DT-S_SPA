"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }
  document.querySelectorAll("[data-current-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });
  const dateInput = document.querySelector("#guest-date");
  if (dateInput) {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localDate;
  }
  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      const select = document.querySelector("#guest-service");
      if (select) select.value = link.getAttribute("data-service") || "";
    });
  });
  const form = document.querySelector("#booking-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const lines = [
        "Hello DT-S Spa & Wellness, I would like to enquire about an appointment.",
        "",
        "Name: " + String(data.get("name") || "").trim(),
        "My phone: " + String(data.get("phone") || "").trim(),
        "Service: " + String(data.get("service") || "").trim(),
        "Preferred date: " + (String(data.get("date") || "").trim() || "Flexible"),
        "Preferred time: " + (String(data.get("time") || "").trim() || "Flexible")
      ];
      const note = String(data.get("note") || "").trim();
      if (note) lines.push("Additional details: " + note);
      lines.push("", "Please confirm availability and price. Thank you.");
      const status = document.querySelector("#form-status");
      if (status) status.textContent = "WhatsApp will open with your request. Review it and press Send to contact the team.";
      window.open("https://wa.me/256780505743?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener,noreferrer");
    });
  }
});