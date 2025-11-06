// 1) DOM elementi
const DOM = {
  container: document.querySelector(".container"),
  addBtn: document.querySelector(".new-box-btn"),
};

// 2) State
const boxList = {
  boxes: [],

  add() {
    const newBox = createBox();
    this.boxes.push(newBox);
  },
};

// 3) createBox
function createBox() {
  return { id: crypto.randomUUID() };
}

// 4) render
function updateBoxes() {
  document.querySelectorAll(".box").forEach((b) => b.remove());

  boxList.boxes.forEach(() => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `
      <button>-</button>
      <span>0</span>
      <button>+</button>
      <button class="delete-btn">🗑️</button>
    `;
    DOM.container.appendChild(box);
  });
}

// 5) Event – dodavanje novog boxa
DOM.addBtn.addEventListener("click", () => {
  boxList.add();
  render();
});
