import { Weapon as BaseWeapon } from "./Weapon";

export class Weapon extends BaseWeapon {
  id = "";
  name = "";
  price = 1000;
  attack = 20;
  readonly ATTACK_MARKUP = 0.71;
  readonly PRICE_MARKUP = 0.64;

  constructor(data: { name: string, id: string }) {
    super();

    this.id = data.id;
    this.name = data.name;
  }

  static get all(): WeaponItem[] {
    return data.map((x, i) => { 
      const item = new Weapon(x);
      item.increaseAttack(i);
      item.increasePrice(i);
      return item;
    });
  }
}

class WeaponItem extends Weapon {};

const data = [
  { id: "spears", name: "Spears" },
  { id: "wooden_moon_staff", name: "Wooden moon staff" },
  { id: "moon_staff", name: "Moon staff" },
  { id: "gold_sword_single", name: "Gold sword single" },
  { id: "frost_swords", name: "Frost swords" },
  { id: "bone_swords", name: "Bone swords" },
  { id: "gold_sword_double", name: "Gold sword double" },
];
