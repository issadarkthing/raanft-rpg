import { Monster } from "./Monster";

export class Boss extends Monster {
  static get all(): Boss[] {
    return names.map((x, i) => new Monster(x, "", (i + 1) * 20));
  }
}

const names = [
  "Grinch",
  "Kraken",
  "Basilisk",
  "King Kong",
  "Mike Wazowski",
  "Loch Ness Monster",
  "Alien Steve",
  "Terminator Robot",
  "Centaur Legion",
  "Phoenix Emperor",
  "Nazgul",
  "Angel Queen",
  "Demon King",
];
