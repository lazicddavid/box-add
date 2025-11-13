const DOMElements = {
  boxesContainer: document.querySelector(".boxes"),
  addNewBoxButton: document.querySelector(".new-box-btn"),
  boxesCountSpan: document.querySelector(".paragraph1 span"),
  marblesCountSpan: document.querySelector(".paragraph2 span"),
};

function createBoxList() {
  return {
    boxes: [],
    add() {
      const newBox = createBox();
      this.boxes.push(newBox);
    },
    getBoxes() {
      return this.boxes;
    },

    increase(id) {
      const box = this.boxes.find((box) => box.id === id);
      if (box) box.marbles++;
    },

    decrease(id) {
      const box = this.boxes.find((box) => box.id === id);
      if (box && box.marbles > 0) box.marbles--;
    },
    remove(id) {
      this.boxes = this.boxes.filter((box) => box.id !== id);
    },
  };
}
const boxList = createBoxList();
function createBox() {
  return { id: crypto.randomUUID(), marbles: 0 };
}

function updateBoxes() {
  DOMElements.boxesContainer.innerHTML = "";
  let totalMarbles = 0;
  boxList.getBoxes().forEach((box) => {
    totalMarbles += box.marbles;
    const boxElement = document.createElement("div");
    boxElement.className = "box";
    boxElement.innerHTML = ` 
      <button data-action="decrease" data-id="${box.id}">-</button>
      <span>${box.marbles}</span>
      <button data-action="increase" data-id="${box.id}">+</button>
      <button class="delete-btn" data-action="delete" data-id="${box.id}">🗑️</button>
    `;
    DOMElements.boxesContainer.appendChild(boxElement);
  });
  DOMElements.boxesCountSpan.textContent = boxList.boxes.length;

  DOMElements.marblesCountSpan.textContent = totalMarbles;
}

DOMElements.addNewBoxButton.addEventListener("click", () => {
  boxList.add();
  updateBoxes();
});

DOMElements.boxesContainer.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;
  if (!id || !action) return;
  if (action === "increase") boxList.increase(id);
  else if (action === "decrease") boxList.decrease(id);
  else if (action === "delete") boxList.remove(id);
  updateBoxes();
});
