const DOMElements = {
  boxesContainer: document.querySelector(".boxes"),
  addNewBoxButton: document.querySelector(".new-box-btn"),
  boxesCountSpan: document.querySelector(".paragraph1 span"),
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
      if (box && box.marbles > 0) box.marbles++;
    },

    decrease(id) {
      const box = this.boxes.find((box) => box.id === id);
      if (box && box.marbles > 0) box.marbles--;
    },
  };
}

const boxList = createBoxList();
function createBox() {
  return { id: crypto.randomUUID(), marbles: 0 };
}

function updateBoxes() {
  DOMElements.boxesContainer.innerHTML = "";

  boxList.getBoxes().forEach((box) => {
    const boxElement = document.createElement("div");
    boxElement.className = "box";
    boxElement.innerHTML = ` 
      <button>-</button>
      <button>0</button>
      <button>+</button>
      <button class="delete-btn">🗑️</button>
    `;
    DOMElements.boxesContainer.appendChild(boxElement);
  });
  DOMElements.boxesCountSpan.textContent = boxList.boxes.length;
}

DOMElements.addNewBoxButton.addEventListener("click", () => {
  boxList.add();
  updateBoxes();
});
