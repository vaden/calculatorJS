const buttons = document.querySelectorAll(".touche");
const affichage = document.querySelector("#affichage-calcul");
const affichageMemoire = document.querySelector("#memoire-calcul");
const memoire = [];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;
    handleInput(buttonValue);
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (
    [
      "+",
      "-",
      "*",
      "/",
      "=",
      "Enter",
      "Escape",
      "Backspace",
      "Delete",
    ].includes(key) ||
    /^[0-9.]$/.test(key)
  ) {
    event.preventDefault();
  }

  if (/^[0-9+\-*/.()]$/.test(key)) {
    handleInput(key);
  } else if (key === "Enter" || key === "=") {
    handleInput("=");
  } else if (key === "Escape" || key === "c" || key === "C") {
    handleInput("C");
  } else if (key === "Backspace" || key === "Delete") {
    handleBackspace();
  }
});

let calculVientDEtreFait = false;

function handleInput(value) {
  if (value === "C") {
    affichage.textContent = "";
    calculVientDEtreFait = false;
  } else if (value === "=") {
    try {
      const resultat = eval(affichage.textContent);
      const resultatStr = resultat.toString();

      if (resultatStr.length > 14) {
        affichage.textContent = "Trop long";
      } else {
        affichage.textContent = resultatStr;
        memoire.push(affichage.textContent);
        affichageMemoire.textContent = memoire[memoire.length - 1];
      }
      calculVientDEtreFait = true;
    } catch {
      affichage.textContent = "Erreur";
      calculVientDEtreFait = false;
    }
  } else {
    if (calculVientDEtreFait && /^[0-9]$/.test(value)) {
      affichage.textContent = "";
      calculVientDEtreFait = false;
    }

    if (affichage.textContent.length + value.length > 14) {
      affichage.textContent = "Trop long";
      calculVientDEtreFait = true;
      return;
    }

    affichage.textContent += value;

    if (calculVientDEtreFait && /^[+\-*/.()]$/.test(value)) {
      calculVientDEtreFait = false;
    }
  }
}

function handleBackspace() {
  const currentText = affichage.textContent;
  if (currentText.length > 0) {
    affichage.textContent = currentText.slice(0, -1);
    calculVientDEtreFait = false;
  }
}
