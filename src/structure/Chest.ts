import { Armor } from "./Armor";


export class Chest extends Armor {
  id = "";
  name = "";
  price = 9200;
  armor = 0.006;
  readonly ARMOR_MARKUP = 0.09;
  readonly PRICE_MARKUP = 0.47;

  constructor(data: { name: string, id: string }) {
    super();

    this.id = data.id;
    this.name = data.name;
  }

  static get all(): ChestItem[] {
    return data.map((x, i) => { 
      const item = new ChestItem(x);
      item.increaseArmor(i);
      item.increasePrice(i);
      return item;
    });
  }
}

class ChestItem extends Chest {};

const data = [
  { id: "wooden_chest_armour", name: "Wooden Chest Armour" },
  { id: "bronze_chest_armour", name: "Bronze Chest Armour" },
  { id: "iron_chest_armour", name: "Iron Chest Armour" },
  { id: "steel_chest_armour", name: "Steel Chest Armour" },
  { id: "gold_chest_armour", name: "Gold Chest Armour" },
  { id: "diamond_chest_armour", name: "Diamond Chest Armour" },
  { id: "dragon_chest_armour", name: "Dragon Chest Armour" },
  { id: "mythical_chest_armour", name: "Mythical Chest Armour" },
];
