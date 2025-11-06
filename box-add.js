// 1) DOM elementi
const DOMElements = {
  boxesContainer: document.querySelector(".boxes"),
  addNewBoxButton: document.querySelector(".new-box-btn"),
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

// 4) updateBoxes
function updateBoxes() {
  DOMElements.boxesContainer.innerHTML = "";

  boxList.boxes.forEach((boxObject) => {
    const boxElement = document.createElement("div");
    boxElement.className = "box";
    boxElement.innerHTML = `
      <button>-</button>
      <span>0</span>
      <button>+</button>
      <button class="delete-btn">🗑️</button>
    `;
    DOMElements.boxesContainer.appendChild(boxElement);
  });
}

// 5) Klik na dugme
DOMElements.addNewBoxButton.addEventListener("click", () => {
  boxList.add();
  updateBoxes();
});
