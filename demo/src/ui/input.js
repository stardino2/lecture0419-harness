import { generateLotto } from "../engine/lotto.js";
import { generateFromBirthday } from "../engine/birthday.js";
import { renderGames } from "./renderer.js";

export function bindControls({ drawBtn, countSel, birthdayInput, output }) {
  drawBtn.addEventListener("click", () => {
    const count = parseInt(countSel.value, 10);
    const bday = birthdayInput ? birthdayInput.value : "";

    const games = [];
    for (let i = 0; i < count; i++) {
      if (bday) {
        const [yyyy, mm, dd] = bday.split("-").map(Number);
        // Each game uses a slightly offset seed so games differ
        games.push(generateFromBirthday(yyyy, mm + i, dd));
      } else {
        games.push(generateLotto());
      }
    }
    renderGames(games, output);
  });
}
