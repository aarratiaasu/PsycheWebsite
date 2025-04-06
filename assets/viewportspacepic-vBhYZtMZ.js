import { g as c, m as y } from "./index-JOHF8NKl.js";
let e = null, n = null, o = null;
function m() {
  if (e) {
    e.style.display = "flex";
    return;
  }
  console.log("Creating space pic viewport"), e = document.createElement("div"), e.id = "space-pic-viewport-container", e.style.position = "fixed", e.style.top = "50%", e.style.left = "50%", e.style.transform = "translate(-50%, -50%)", e.style.width = "80%", e.style.maxWidth = "1200px", e.style.height = "80vh", e.style.backgroundColor = "rgba(0, 0, 0, 0.9)", e.style.border = "2px solid #007bff", e.style.borderRadius = "10px", e.style.boxShadow = "0 0 20px rgba(0, 123, 255, 0.5)", e.style.zIndex = "900", e.style.display = "flex", e.style.flexDirection = "column", e.style.overflow = "hidden";
  const t = document.createElement("div");
  t.style.display = "flex", t.style.justifyContent = "space-between", t.style.alignItems = "center", t.style.padding = "10px 15px", t.style.backgroundColor = "#007bff", t.style.color = "white", t.style.borderTopLeftRadius = "8px", t.style.borderTopRightRadius = "8px";
  const i = document.createElement("h2");
  i.textContent = "Psyche Space Pic", i.style.margin = "0", i.style.fontSize = "1.2rem";
  const s = document.createElement("div");
  s.style.display = "flex", s.style.alignItems = "center", s.style.gap = "10px";
  const l = document.createElement("button");
  l.textContent = "\u21A9", l.style.background = "none", l.style.border = "none", l.style.color = "white", l.style.fontSize = "1.2rem", l.style.cursor = "pointer", l.style.padding = "0 5px", l.style.lineHeight = "1", l.style.marginRight = "5px", o = document.createElement("button"), o.textContent = "\u2715", o.style.background = "none", o.style.border = "none", o.style.color = "white", o.style.fontSize = "1.5rem", o.style.cursor = "pointer", o.style.padding = "0 5px", o.style.lineHeight = "1", s.appendChild(l), s.appendChild(o), t.appendChild(i), t.appendChild(s), e.appendChild(t), n = document.createElement("iframe"), n.src = "./spacepic/photo.html", n.style.width = "100%", n.style.height = "100%", n.style.border = "none", n.style.backgroundColor = "#222", n.onerror = () => {
    console.error("Failed to load iframe content");
  }, n.onload = () => {
    console.log("Iframe loaded successfully");
  }, e.appendChild(n), document.body.appendChild(e);
  const r = c.timeline();
  r.from(e, { opacity: 0, scale: 0.8, duration: 0.4, ease: "power2.out" }), r.from(t, { y: -50, duration: 0.3, ease: "back.out(1.7)" }, "-=0.2"), r.from(n, { opacity: 0, y: 20, duration: 0.3, ease: "power2.out" }, "-=0.1"), o.addEventListener("click", a), l.addEventListener("click", function(d) {
    d.preventDefault(), d.stopPropagation(), i.textContent = "Psyche Mission Games", n.src = "./games/games.html", console.log("Loading games HTML in space pic viewport");
  }), document.addEventListener("keydown", p), setTimeout(y, 100);
}
function a() {
  e && c.to(e, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in", onComplete: () => {
    e.style.display = "none", e.style.opacity = 1, e.style.transform = "translate(-50%, -50%) scale(1)", document.body.classList.add("overlay-open");
  } });
}
function p(t) {
  t.key === "Escape" && a();
}
function f() {
  e && (o.removeEventListener("click", a), document.removeEventListener("keydown", p), document.body.removeChild(e), e = null, n = null, o = null);
}
export {
  f as destroySpacePicViewport,
  a as hideSpacePicViewport,
  m as showSpacePicViewport
};
