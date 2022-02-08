import { Pet as BasePet } from "@jiman24/discordjs-rpg";
import { applyMixins } from "../utils";
import { Item } from "./Item";
import { Player } from "./Player";
import { Item } from "./Item";
import { applyMixins } from "../utils";

export interface Pet extends Item {};

export interface Pet extends Item {};

export abstract class Pet extends BasePet {
  abstract price: number;

  static get all(): Pet[] {
    return [
      new Slime(),
      new Snake(),
      new Dragon(),
      new Titan(),
      new Phoenix(),
    ];
  }

  apply(player: Player) {
    this.setOwner(player);
  }
}

applyMixins(Pet, [Item]);

export class Slime extends Pet {
  name = "Slime";
  id = "slime";
  attack = 15;
  interceptRate = 0.2;
  price = 15000;
}

export class Snake extends Pet {
  name = "Snake";
  id = "snake";
  attack = 20;
  interceptRate = 0.35;
  price = 60000;
}

export class Dragon extends Pet {
  name = "Dragon";
  id = "dragon";
  attack = 35;
  interceptRate = 0.1;
  price = 70000;
}

export class Titan extends Pet {
  name = "titan";
  id = "titan";
  attack = 55;
  interceptRate = 0.4;
  price = 88000;
}


export class Phoenix extends Pet {
  name = "Phoenix";
  id = "phoenix";
  attack = 80;
  interceptRate = 0.2;
  price = 110000;
}
