import { Weapon as BaseWeapon } from "./Weapon";

export class Necklace extends BaseWeapon {
  id = "";
  name = "";
  price = 1000;
  attack = 20;
  readonly ATTACK_MARKUP = 0.65;
  readonly PRICE_MARKUP = 0.51;

  constructor(data: { name: string, id: string }) {
    super();

    this.id = data.id;
    this.name = data.name;
  }

  static get all(): NecklaceItem[] {
    return data.map((x, i) => { 
      const item = new NecklaceItem(x);
      item.increaseAttack(i);
      item.increasePrice(i);
      return item;
    });
  }
}

class NecklaceItem extends Necklace {};

const data = [
  { id: "raanft_bag", name: "RAANFT bag" },
  { id: "raanft_pendant", name: "RAANFT pendant" },
  { id: "dollar_pendant", name: "Dollar pendant" },
  { id: "r_pendant", name: "R pendant" },
  { id: "three_rings", name: "Three rings" },
  { id: "shuriken_pendant", name: "Shuriken pendant" },
  { id: "gem_stone_pendant_blue", name: "Gem stone pendant BLU" },
];
