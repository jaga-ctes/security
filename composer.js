// composer.js — arma el mensaje de contacto en el navegador. Sin red, sin dependencias, sin innerHTML.
// Uso: ver snippets/bloques.html (bloque 4). Todo valor sale de campos del formulario y se pasa por
// encodeURIComponent; los destinos (WhatsApp y mail) salen de atributos propios y se validan antes de usarse.
(function () {
  "use strict";

  var root = document.querySelector("[data-jaga-composer]");
  if (!root) return;

  var wa = root.getAttribute("data-wa") || "";
  var mail = root.getAttribute("data-mail") || "";
  var brand = (root.getAttribute("data-brand") || "Jagā").slice(0, 40);
  if (!/^\d{8,15}$/.test(wa) || !/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(mail)) return;

  var waBtn = root.querySelector("[data-send-wa]");
  var mailBtn = root.querySelector("[data-send-mail]");
  var fName = root.querySelector("[data-f-name]");
  var fType = root.querySelector("[data-f-type]");
  var fMsg = root.querySelector("[data-f-msg]");
  if (!waBtn || !mailBtn) return;

  // Quita caracteres de control (salvo salto de línea en el mensaje) y recorta.
  function oneLine(s, max) {
    return String(s || "").replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
  }
  function multiLine(s, max) {
    return String(s || "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max);
  }

  function build() {
    var name = oneLine(fName && fName.value, 80);
    var type = oneLine(fType && fType.value, 80);
    var msg = multiLine(fMsg && fMsg.value, 600);
    var lines = ["Hola, soy " + (name || "[tu nombre]") + ". Te escribo desde Jagā " + brand + "."];
    if (type) lines.push("Quiero consultar por: " + type + ".");
    if (msg) { lines.push(""); lines.push(msg); }
    return lines.join("\n");
  }

  function update() {
    var body = build();
    waBtn.href = "https://wa.me/" + wa + "?text=" + encodeURIComponent(body);
    mailBtn.href = "mailto:" + mail + "?subject=" + encodeURIComponent("Consulta " + brand) +
      "&body=" + encodeURIComponent(body);
  }

  root.addEventListener("input", update);
  root.addEventListener("change", update);
  update();
})();
