import { MessageEmbed } from "discord.js";
import { applyMixins } from "../utils";
import { Item } from "./Item";
import { Player } from "./Player";

export interface Ring extends Item {};

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

applyMixins(Ring, [Item]);

class StrengthRing extends Ring {
  id = "strength_ring";
  name = "Strength Ring";
  description = "Increases attack by 20%";
  price = 60_000;

  apply(player: Player) {
    player.attack += Math.round(player.attack * 0.2);
  }
}

class DefenseRing extends Ring {
  id = "defense_ring";
  name = "Defence Ring";
  description = "Increases defence by 20%";
  price = 55_000;

  apply(player: Player) {
    player.armor += player.armor * 0.2;
  }
}

class BerserkerRing extends Ring {
  id = "berserker_ring";
  name = "Berserker Ring";
  description = "Increases crit damage by 20%";
  price = 80_000;

  apply(player: Player) {
    player.critDamage += player.critDamage * 0.2;
  }
}
