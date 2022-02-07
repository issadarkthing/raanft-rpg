import { Armor } from "./Armor";

export class Boots extends Armor {
  id = "";
  name = "";
  price = 7800;
  armor = 0.0042;
  readonly ARMOR_MARKUP = 0.08;
  readonly PRICE_MARKUP = 0.46;

  constructor(data: { name: string, id: string }) {
    super();

    this.id = data.id;
    this.name = data.name;
  }

  static get all(): BootsItem[] {
    return data.map((x, i) => { 
      const item = new BootsItem(x);
      item.increaseArmor(i);
      item.increasePrice(i);
      return item;
    });
  }
}

class BootsItem extends Boots {};

const data = [
  { id: "wooden_boots", name: "Wooden Boots" },
  { id: "bronze_boots", name: "Bronze Boots" },
  { id: "iron_boots", name: "Iron Boots" },
  { id: "steel_boots", name: "Steel Boots" },
  { id: "gold_boots", name: "Gold Boots" },
  { id: "diamonds_boots", name: "Diamond Boots" },
  { id: "dragon_boots", name: "Dragon Boots" },
  { id: "mythical_boots", name: "Mythical Boots" },
];
