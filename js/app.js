const buttons = document.querySelectorAll(".touche");
const affichage = document.querySelector("#affichage-calcul");
const affichageMemoire = document.querySelector("#memoire-calcul");
const memoire = [];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;
    if (buttonValue === "C") {
      affichage.textContent = "";
    } else if (buttonValue === "=") {
      try {
        affichage.textContent = eval(affichage.textContent);
        memoire.push(affichage.textContent);
        affichageMemoire.textContent = memoire[memoire.length - 1];
      } catch {
        affichage.textContent = "Erreur";
      }
    } else {
      affichage.textContent += buttonValue;
    }
  });
});
