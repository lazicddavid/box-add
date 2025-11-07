const DOMElements = {
  boxesContainer: document.querySelector(".boxes"),
  addNewBoxButton: document.querySelector(".new-box-btn"),
  boxesCountSpan: document.querySelector(".paragraph1 span"),
};
//napravi funkciju createBoxList
//metode za davanje kutija na koriscenje
const boxList = {
  boxes: [],

  add() {
    //pomeri ovu kreiranje kutija dole
    const newBox = createBox();
    this.boxes.push(newBox);
  },
};

function createBox() {
  return { id: crypto.randomUUID(), marbles: 0 };
}

function updateBoxes() {
  DOMElements.boxesContainer.innerHTML = "";

  boxList.boxes.forEach((box) => {
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
  DOMElements.boxesCountSpan.textContent = boxList.boxes.length;
}

DOMElements.addNewBoxButton.addEventListener("click", () => {
  boxList.add();
  updateBoxes();
});
