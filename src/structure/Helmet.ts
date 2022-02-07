import { Armor } from "./Armor";


export class Helmet extends Armor {
  id = "";
  name = "";
  price = 8500;
  armor = 0.005;
  readonly ARMOR_MARKUP = 0.08;
  readonly PRICE_MARKUP = 0.45;

  constructor(data: { name: string, id: string }) {
    super();

    this.id = data.id;
    this.name = data.name;
  }

  static get all(): Helmet[] {
    return data.map((x, i) => { 
      const helmet = new Helmet(x);
      helmet.increaseArmor(i);
      helmet.increasePrice(i);
      return helmet;
    });
  }
}

const data = [
  { name: "Bucket hat", id: "bucket_hat" },
  { name: "Conical hat", id: "conical_hat" },
  { name: "Wizard hat", id: "wizard_hat" },
  { name: "Straw Hat", id: "straw_hat" },
  { name: "Flame Hat", id: "flame_hat" },
  { name: "Gold Helmet", id: "gold_helmet" },
  { name: "Diamond Helmet", id: "diamond_helmet" },
];
