/* ============================
   Personalized interactive JS
   - Generates cards from an array (loop)
   - Functions with parameters & return values
   - Scope demo: global vs local
   - CSS animation triggers via class toggles
   - Modal and theme toggles
   ============================ */

/* ---------- Global state (example of global scope) ---------- */
let currentIndex = 0; // global: which milestone to reveal next

/* ---------- Data: milestones of your journey ---------- */
const milestones = [
  {
    role: "Java House - Barista",
    img: "https://picsum.photos/seed/coffee/600/400",
    summary: "Serving coffee taught me consistency, attention to detail, and the importance of customer experience.",
    lesson: "Customer-first thinking is the foundation of product design."
  },
  {
    role: "Fremara Solutions - Sales",
    img: "https://picsum.photos/seed/sales/600/400",
    summary: "Door-to-door and pitch-heavy sales strengthened my persuasion and resilience.",
    lesson: "Persistence + clear messaging moves people to action."
  },
  {
    role: "Nyumbani Concepts - Real Estate",
    img: "https://picsum.photos/seed/realestate/600/400",
    summary: "Selling property taught me negotiation and the value of clear visuals and trust.",
    lesson: "Good presentation accelerates decisions."
  },
  {
    role: "CarPlanet → PlanetAuto - Social Media",
    img: "https://picsum.photos/seed/cars/600/400",
    summary: "Running social channels showed me the power of storytelling and community.",
    lesson: "Content that resonates builds loyalty."
  },
  {
    role: "Uber - Operations",
    img: "https://picsum.photos/seed/uber/600/400",
    summary: "At Uber I learned to think in systems and the importance of reliable processes.",
    lesson: "Scale needs process and data."
  },
  {
    role: "JuaKazi - Founder (building)",
    img: "https://picsum.photos/seed/jua/600/400",
    summary: "Now building tech to connect people with work: combining everything I've learned so far.",
    lesson: "Solve clear problems for real people."
  }
];

/* ---------- Utility function: returns lesson for a given role (parameter & return value) ---------- */
function lessonForRole(roleName) {
  // local variable inside function (local scope)
  const found = milestones.find(m => m.role === roleName);
  return found ? found.lesson : "Every role is a lesson - keep learning.";
}

/* ---------- Function: build a card DOM node (reusable) ---------- */
function createCard(m, index) {
  // create structure
  const li = document.createElement("div");
  li.className = "card";
  li.role = "listitem";

  const inner = document.createElement("div");
  inner.className = "card-inner";
  inner.setAttribute("data-index", index);

  // front
  const front = document.createElement("div");
  front.className = "card-front";
  const img = document.createElement("img");
  img.src = m.img;
  img.alt = `${m.role} image`;
  const h3 = document.createElement("h3");
  h3.textContent = m.role;
  const p = document.createElement("p");
  p.textContent = m.summary;
  const pill = document.createElement("span");
  pill.className = "pill";
  pill.textContent = "Click to flip";

  front.appendChild(img);
  front.appendChild(h3);
  front.appendChild(p);
  front.appendChild(pill);

  // back
  const back = document.createElement("div");
  back.className = "card-back";
  const backP = document.createElement("p");
  backP.textContent = m.lesson;
  back.appendChild(backP);

  inner.appendChild(front);
  inner.appendChild(back);
  li.appendChild(inner);

  // Click toggles flip (DOM interaction + animation trigger)
  inner.addEventListener("click", () => {
    inner.classList.toggle("is-flipped");
  });

  return li;
}

/* ---------- Loop: render all cards (demonstrates iteration) ---------- */
function renderCards() {
  const container = document.getElementById("cards");
  container.innerHTML = ""; // clear
  for (let i = 0; i < milestones.length; i++) {
    const cardNode = createCard(milestones[i], i);
    container.appendChild(cardNode);
  }
}

/* ---------- Reveal next milestone: demonstrates using and updating global state ---------- */
function revealNext() {
  // use currentIndex (global) to pick a milestone
  const idx = currentIndex % milestones.length;
  const role = milestones[idx].role;
  const lesson = lessonForRole(role); // function call with parameter + return

  // find first card and animate it as 'revealed' (small highlight)
  const cardGrid = document.getElementById("cards");
  const target = cardGrid.querySelector(`[data-index="${idx}"]`);
  if (target) {
    // briefly add a class to animate / lift
    target.classList.add("is-flipped");
    setTimeout(() => target.classList.remove("is-flipped"), 2200);
  }

  // update hero text to show short message
  const hero = document.querySelector(".hero p");
  hero.textContent = `Next: ${role} — ${lesson}`;

  currentIndex++; // advance global pointer
}

/* ---------- Modal (quote) control ---------- */
function openModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

/* ---------- Theme toggle: toggles a class on body (using classList API) ---------- */
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  // also accessible toggle on header button
  const btn = document.getElementById("themeToggle");
  const pressed = btn.getAttribute("aria-pressed") === "true";
  btn.setAttribute("aria-pressed", String(!pressed));
}

/* ---------- Initialization: wire events and render (IIFE to avoid polluting globals) ---------- */
(function init() {
  // render cards (loop invoked)
  renderCards();

  // button bindings
  document.getElementById("revealNextBtn").addEventListener("click", revealNext);
  document.getElementById("quoteBtn").addEventListener("click", openModal);
  document.getElementById("closeModal").addEventListener("click", closeModal);

  document.getElementById("themeToggle").addEventListener("click", toggleTheme);

  // keyboard: close modal on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // small demo: show lesson in console using function + loop
  // demonstrates function returns and a loop reading data
  console.log("Quick lessons summary:");
  for (let i = 0; i < milestones.length; i++) {
    console.log(`${milestones[i].role} -> ${lessonForRole(milestones[i].role)}`);
  }
})();
