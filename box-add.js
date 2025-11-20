const DOMElements = {
  boxesContainer: document.querySelector(".boxes"),
  addNewBoxButton: document.querySelector(".new-box-btn"),
  boxesCountSpan: document.querySelector(".paragraph1 span"),
  marblesCountSpan: document.querySelector(".paragraph2 span"),
};

function createBoxList() {
  return {
    boxes: [],
    //dodaj total marbles
    //na pocetak je 0
    //napravi funkciju gettotaMarbles ili CalculateTotalMarbles
    //tu funkciju pozoves kad god ti treba total marbles

    add() {
      this.boxes.push(createBox());
    },

    remove(id) {
      this.boxes = this.boxes.filter((box) => box.getId() !== id);
    },

    getBoxes() {
      return this.boxes;
    },

    getCount() {
      return this.boxes.length;
    },
  };
}
const boxList = createBoxList();
function createBox() {
  return {
    id: crypto.randomUUID(),
    marbles: 0,

    increase() {
      this.marbles++;
    },
    decrease() {
      if (this.marbles > 0) {
        this.marbles--;
      }
    },

    getMarbles() {
      return this.marbles;
    },

    getId() {
      return this.id;
    },
  };
}

function getTotalMarbles() {
  let total = 0;

  boxList.getBoxes().forEach((box) => {
    total += box.getMarbles();
  });

  return total;
}
//prebaciti increase i decrease unutar createBox
function updateBoxes() {
  DOMElements.boxesContainer.innerHTML = "";

  boxList.getBoxes().forEach((box) => {
    const boxElement = document.createElement("div");
    boxElement.className = "box";
    boxElement.innerHTML = ` 
      <button data-action="decrease" data-id="${box.getId()}">-</button>
      <span>${box.getMarbles()}</span>
      <button data-action="increase" data-id="${box.getId()}">+</button>
<button class="delete-btn" data-action="delete" data-id="${box.getId()}">🗑️</button>

    `;
    DOMElements.boxesContainer.appendChild(boxElement);
  }); //za svaku varijablu, bilo da je u box list, ili createBox, uvek napravi
  //funkcije koje se koriste za pristup varijablama
  DOMElements.boxesCountSpan.textContent = boxList.getCount();

  const totalMarbles = getTotalMarbles();
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
  const box = boxList.getBoxes().find((box) => box.getId() === id);

  if (!box) return;

  if (action === "increase") box.increase();
  else if (action === "decrease") box.decrease();
  else if (action === "delete") boxList.remove(id);
  updateBoxes();
});
