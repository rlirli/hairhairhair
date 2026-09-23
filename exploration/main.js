import { publishedHairstyles, styleExamples } from "../src/data/hairstyles.ts";

const imageFiles = import.meta.glob("../src/assets/hairstyles/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});
const images = Object.fromEntries(
  Object.entries(imageFiles).map(([path, url]) => [path.split("/").at(-1).replace(".png", ""), url]),
);
const ns = "http://www.w3.org/2000/svg";
const svg = document.querySelector("#map");
const world = document.querySelector("#world");
const edgeLayer = document.querySelector("#edges");
const nodeLayer = document.querySelector("#nodes");
const wrap = document.querySelector("#canvas-wrap");
const details = document.querySelector("#details");
const radius = 34;

const nodes = publishedHairstyles.map((style, index) => {
  const example = styleExamples.find((item) => item.hairstyleIds.includes(style.id));
  return { ...style, image: images[example?.imageId], x: 0, y: 0, vx: 0, vy: 0, index, el: null, label: null };
});
const byId = new Map(nodes.map((node) => [node.id, node]));
const links = [];
const seen = new Set();
for (const node of nodes) {
  for (const id of node.relatedStyleIds) {
    const target = byId.get(id);
    if (!target) continue;
    const key = [node.id, id].sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    links.push({ source: node, target });
  }
}

function element(name, attrs = {}) {
  const el = document.createElementNS(ns, name);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  return el;
}

function draw() {
  const bounds = wrap.getBoundingClientRect();
  const width = Math.max(600, bounds.width);
  const height = Math.max(570, bounds.height);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  if (!nodes.some((node) => node.x)) {
    const cols = Math.ceil(Math.sqrt((nodes.length * width) / height));
    const rows = Math.ceil(nodes.length / cols);
    const gapX = width / (cols + 1);
    const gapY = height / (rows + 1);
    nodes.forEach((node) => {
      const col = node.index % cols;
      const row = Math.floor(node.index / cols);
      node.x = gapX * (col + 1) + (Math.random() - 0.5) * 35;
      node.y = gapY * (row + 1) + (Math.random() - 0.5) * 35;
    });
  }
  edgeLayer.replaceChildren();
  for (const link of links) {
    link.el = element("line", { class: "edge" });
    edgeLayer.append(link.el);
  }
  nodeLayer.replaceChildren();
  for (const node of nodes) {
    const group = element("g", { class: "node", tabindex: "0", role: "button", "aria-label": node.name });
    const clipId = `clip-${node.id}`;
    const clip = element("clipPath", { id: clipId });
    clip.append(element("circle", { cx: 0, cy: 0, r: radius }));
    group.append(clip, element("circle", { cx: 0, cy: 0, r: radius + 2 }));
    if (node.image)
      group.append(
        element("image", {
          href: node.image,
          x: -radius,
          y: -radius,
          width: radius * 2,
          height: radius * 2,
          preserveAspectRatio: "xMidYMid slice",
          "clip-path": `url(#${clipId})`,
        }),
      );
    else group.append(element("circle", { cx: 0, cy: 0, r: radius, fill: "#e5ddd0" }));
    const label = element("text", { y: radius + 17 });
    label.textContent = node.name;
    group.append(label);
    group.addEventListener("pointerdown", (event) => startDrag(event, node));
    group.addEventListener("click", () => select(node));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") select(node);
    });
    nodeLayer.append(group);
    node.el = group;
    node.label = label;
  }
  runSimulation();
  updateCounter();
}

function runSimulation() {
  const bounds = wrap.getBoundingClientRect();
  const width = Math.max(600, bounds.width);
  const height = Math.max(570, bounds.height);
  for (let tick = 0; tick < 240; tick++) {
    const alpha = 1 - tick / 260;
    for (const node of nodes) {
      node.vx += (width / 2 - node.x) * 0.0009 * alpha;
      node.vy += (height / 2 - node.y) * 0.0009 * alpha;
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j];
        let dx = b.x - a.x,
          dy = b.y - a.y;
        const d2 = dx * dx + dy * dy || 1;
        const distance = Math.sqrt(d2);
        const force = Math.min(1.4, 1800 / d2) * alpha;
        const fx = (dx / distance) * force,
          fy = (dy / distance) * force;
        a.vx -= fx;
        a.vy -= fy;
        b.vx += fx;
        b.vy += fy;
        if (distance < 108) {
          const push = (108 - distance) * 0.012 * alpha;
          a.vx -= (dx / distance) * push;
          a.vy -= (dy / distance) * push;
          b.vx += (dx / distance) * push;
          b.vy += (dy / distance) * push;
        }
      }
    }
    for (const { source, target } of links) {
      const dx = target.x - source.x,
        dy = target.y - source.y;
      const distance = Math.hypot(dx, dy) || 1;
      const force = (distance - 155) * 0.0023 * alpha;
      source.vx += (dx / distance) * force;
      source.vy += (dy / distance) * force;
      target.vx -= (dx / distance) * force;
      target.vy -= (dy / distance) * force;
    }
    for (const node of nodes) {
      node.vx *= 0.87;
      node.vy *= 0.87;
      node.x = Math.max(55, Math.min(width - 55, node.x + node.vx));
      node.y = Math.max(60, Math.min(height - 35, node.y + node.vy));
    }
  }
  paint();
}

function paint() {
  for (const { source, target, el } of links) {
    el?.setAttribute("x1", source.x);
    el?.setAttribute("y1", source.y);
    el?.setAttribute("x2", target.x);
    el?.setAttribute("y2", target.y);
  }
  for (const node of nodes) node.el?.setAttribute("transform", `translate(${node.x} ${node.y})`);
}

let selected;
function select(node) {
  selected = node;
  for (const item of nodes) item.el.classList.toggle("selected", item === node);
  const relations = node.relatedStyleIds.map((id) => byId.get(id)).filter(Boolean);
  details.innerHTML = `<img class="profile-img" src="${node.image ?? ""}" alt=""/><span class="kind-label">${node.kind.replaceAll("-", " ")}</span><h2>${node.name}</h2><p>${node.summary}</p><div class="relations-title">Connected styles · ${relations.length}</div>${relations.length ? relations.map((related) => `<a class="relation" data-id="${related.id}"><img src="${related.image ?? ""}" alt=""/><span>${related.name}</span></a>`).join("") : "<p>No connected styles yet.</p>"}`;
  details.querySelectorAll(".relation").forEach((link) =>
    link.addEventListener("click", () => {
      const related = byId.get(link.dataset.id);
      related.el.scrollIntoView({ block: "nearest", inline: "nearest" });
      select(related);
    }),
  );
  const relatedIds = new Set([node.id, ...node.relatedStyleIds]);
  for (const item of nodes) item.el.classList.toggle("dim", !relatedIds.has(item.id));
}

function startDrag(event, node) {
  if (event.button !== 0) return;
  event.preventDefault();
  select(node);
  const point = (e) => {
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    return {
      x: ((e.clientX - rect.left) * vb.width) / rect.width,
      y: ((e.clientY - rect.top) * vb.height) / rect.height,
    };
  };
  const move = (e) => {
    const p = point(e);
    node.x = p.x;
    node.y = p.y;
    node.vx = 0;
    node.vy = 0;
    paint();
  };
  const up = () => {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    runSimulation();
  };
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up, { once: true });
}

document.querySelector("#search").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  for (const node of nodes) node.el.classList.toggle("dim", !!query && !node.name.toLowerCase().includes(query));
});
document.querySelector("#connected").addEventListener("click", (event) => {
  const active = event.currentTarget.getAttribute("aria-pressed") !== "true";
  event.currentTarget.setAttribute("aria-pressed", String(active));
  for (const node of nodes)
    node.el.style.display = active && !node.relatedStyleIds.some((id) => byId.has(id)) ? "none" : "";
  updateCounter();
});
document.querySelector("#reset").addEventListener("click", () => {
  for (const node of nodes) {
    node.x = 0;
    node.y = 0;
    node.vx = 0;
    node.vy = 0;
  }
  selected?.el.classList.remove("selected", "dim");
  selected = undefined;
  details.innerHTML =
    '<div class="empty"><span class="spark">✳</span><p>Pick a hairstyle to see its connections.</p></div>';
  draw();
});
function updateCounter() {
  const shown = nodes.filter((node) => node.el?.style.display !== "none").length;
  document.querySelector("#counter").textContent = `${shown} styles · ${links.length} relations`;
}
let pan;
svg.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".node")) return;
  pan = { x: event.clientX, y: event.clientY, tx: 0, ty: 0 };
  const move = (e) => {
    pan.tx += e.clientX - pan.x;
    pan.ty += e.clientY - pan.y;
    pan.x = e.clientX;
    pan.y = e.clientY;
    world.setAttribute("transform", `translate(${pan.tx} ${pan.ty})`);
  };
  const up = () => {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
  };
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up, { once: true });
});
let scale = 1;
svg.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    scale = Math.max(0.6, Math.min(2, scale * (event.deltaY < 0 ? 1.08 : 0.92)));
    world.setAttribute("transform", `scale(${scale})`);
  },
  { passive: false },
);
new ResizeObserver(draw).observe(wrap);
draw();
