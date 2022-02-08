import { Message, MessageEmbed } from "discord.js";
import { Player } from "./Player";

export abstract class Item {
  abstract name: string;
  abstract id: string;
  abstract price: number;
  abstract apply(player: Player): void;
  abstract show(): MessageEmbed;

  buy(msg: Message) {
    const player = Player.fromUser(msg.author);

    if (player.coins < this.price) {
      msg.channel.send("Insufficient amount");
      return;
    }

    if (player.inventory.some(x => x.id === this.id)) {
      msg.channel.send("You already own this item");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    msg.channel.send(`Successfully bought **${this.name}**!`);
  }

  static get all() {
    const { Ring } = require("./Ring");
    const { Armor } = require("./Armor");
    const { Weapon } = require("./Weapon");
    const { Pet } = require("./Pet");
    const { Skill } = require("./Skill");
    return [
      ...Armor.all,
      ...Weapon.all,
      ...Pet.all,
      ...Skill.all,
      ...Ring.all,
    ];
  }
}
