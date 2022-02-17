import { Armor } from "./Armor";

export class Leg extends Armor {
  id = "";
  name = "";
  price = 2900;
  armor = 0.004;
  readonly ARMOR_MARKUP = 0.08;
  readonly PRICE_MARKUP = 0.48;

  constructor(data: { name: string, id: string }) {
    super();

    this.id = data.id;
    this.name = data.name;
  }

  static get all(): LegItem[] {
    return data.map((x, i) => { 
      const item = new LegItem(x);
      item.increaseArmor(i);
      item.increasePrice(i);
      return item;
    });
  }
}

class LegItem extends Leg {};

const data = [
  { id: "wooden_leg_armour", name: "Wooden Leg Armour" },
  { id: "bronze_leg_armour", name: "Bronze Leg Armour" },
  { id: "iron_leg_armour", name: "Iron Leg Armour" },
  { id: "steel_leg_armour", name: "Steel Leg Armour" },
  { id: "gold_leg_armour", name: "Gold Leg Armour" },
  { id: "diamond_leg_armour", name: "Diamond Leg Armour" },
  { id: "dragon_leg_armour", name: "Dragon Leg Armour" },
  { id: "mythical_leg_armour", name: "Mythical Leg Armour" },
];
