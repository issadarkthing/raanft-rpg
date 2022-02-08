import { Message, MessageEmbed } from "discord.js";
import { Item } from "./Item";
import { Player } from "./Player";

export abstract class Ring extends Item {
  abstract price: number;
  abstract description: string;

  static get all(): Ring[] {
    return [
      new StrengthRing(),
      new DefenseRing(),
      new BerserkerRing(),
    ];
  }

  async buy(msg: Message) {

    const player = Player.fromUser(msg.author);

    if (player.coins < this.price) {
      msg.channel.send("Insufficient amount");
      return;
    }

    if (
      player.inventory.some(x => x.id === this.id) ||
      player.equippedWeapons.some(x => x.id === this.id)
    ) {
      msg.channel.send("You already own this item");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    msg.channel.send(`Successfully bought **${this.name}**`);
  }

  show() {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Ring")
      .setDescription(this.description)
      .addField("Name", this.name, true)
      .addField("Price", this.price.toString(), true);

    return embed;
  }
}

class StrengthRing extends Ring {
  id = "strength_ring";
  name = "Strength Ring";
  description = "Increases attack by 20%";
  price = 60_000;
}

class DefenseRing extends Ring {
  id = "defense_ring";
  name = "Defence Ring";
  description = "Increases defence by 20%";
  price = 55_000;
}

class BerserkerRing extends Ring {
  id = "berserker_ring";
  name = "Berserker Ring";
  description = "Increases crit damage by 20%";
  price = 80_000;
}
