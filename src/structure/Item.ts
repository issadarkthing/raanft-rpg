import { Message, MessageEmbed } from "discord.js";
import { Armor } from "./Armor";
import { Weapon } from "./Weapon";
import { Pet } from "./Pet";
import { Skill } from "./Skill";
import { Player } from "./Player";

export abstract class Item {
  abstract name: string;
  abstract id: string;
  abstract price: number;
  abstract apply(player: Player): void;
  abstract show(): MessageEmbed;
  abstract buy(msg: Message): void;
  static get all() {
    const { Ring } = require("./Ring");
    return [
      ...Armor.all,
      ...Weapon.all,
      ...Pet.all,
      ...Skill.all,
      ...Ring.all,
    ];
  }
}
