const grid = document.getElementById("promptGrid");
const search = document.getElementById("search");
const filters = document.getElementById("filters");
const resultCount = document.getElementById("resultCount");

let activeCategory = "All";

// Build a DOM element; text is always set with textContent, never innerHTML.
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Split the prompt on [PLACEHOLDERS] so they can be highlighted safely.
function renderPromptText(text) {
  const pre = el("pre", "prompt");
  for (const part of text.split(/(\[[^\]]+\])/)) {
    if (!part) continue;
    pre.append(part.startsWith("[") ? el("mark", "placeholder", part) : document.createTextNode(part));
  }
  return pre;
}

async function copyPrompt(button, text) {
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied ✓";
  } catch {
    button.textContent = "Press Ctrl+C";
  }
  setTimeout(() => (button.textContent = "Copy"), 1500);
}

function renderCard(item) {
  const card = el("article", "card");

  const head = el("div", "card-head");
  head.append(el("span", `badge badge-${item.category.toLowerCase()}`, item.category));
  const copy = el("button", "copy-btn", "Copy");
  copy.type = "button";
  copy.setAttribute("aria-label", `Copy the "${item.title}" prompt`);
  copy.addEventListener("click", () => copyPrompt(copy, item.prompt));
  head.append(copy);

  const techniques = el("ul", "techniques");
  for (const t of item.techniques) techniques.append(el("li", "", t));

  const why = el("details", "why");
  why.append(el("summary", "", "Why it works"), el("p", "", item.why));

  card.append(head, el("h3", "", item.title), el("p", "summary", item.summary),
              renderPromptText(item.prompt), techniques, why);
  return card;
}

function matches(item, query) {
  if (activeCategory !== "All" && item.category !== activeCategory) return false;
  if (!query) return true;
  return [item.title, item.summary, item.prompt, item.category, ...item.techniques]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function render() {
  const query = search.value.trim().toLowerCase();
  const visible = PROMPTS.filter((item) => matches(item, query));
  grid.replaceChildren(...visible.map(renderCard));
  resultCount.textContent = `${visible.length} of ${PROMPTS.length} prompts`;
  if (!visible.length) grid.append(el("p", "empty", "No prompts match — try another search."));
}

function renderFilters() {
  const categories = ["All", ...new Set(PROMPTS.map((p) => p.category))];
  for (const category of categories) {
    const button = el("button", "filter-btn", category);
    button.type = "button";
    button.setAttribute("aria-pressed", String(category === activeCategory));
    button.addEventListener("click", () => {
      activeCategory = category;
      for (const b of filters.children) b.setAttribute("aria-pressed", String(b === button));
      render();
    });
    filters.append(button);
  }
}

search.addEventListener("input", render);
renderFilters();
render();
