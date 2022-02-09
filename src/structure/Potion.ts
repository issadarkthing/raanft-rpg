import { Item } from "./Item";
import { Player } from "./Player";
import { remove, time } from "@jiman24/discordjs-utils";
import { Message, MessageEmbed } from "discord.js";
import { ButtonHandler } from "@jiman24/discordjs-button";
import { DateTime } from "luxon";
import { removeBy } from "../utils";

export abstract class Potion extends Item {
  abstract duration: number;
  abstract description: string;

  static get all(): Potion[] {
    return [
      new HealPotion(),
      new DefensePotion(),
    ];
  }

  removePotion(player: Player) {
    player.activePotions = 
      removeBy(x => x.potion.id === this.id, player.activePotions);

    player.inventory = 
      removeBy(x => x.id === this.id, player.inventory);

    player.equippedItems = 
      removeBy(x => x.id === this.id, player.equippedItems);
  }

  actions(msg: Message, menu: ButtonHandler, player: Player) {

    if (player.equippedItems.some(x => x.id === this.id)) {

      menu.addButton("deactivate", () => {

        this.removePotion(player);
        player.save();

        msg.channel.send(`Successfully deactivated **${this.name}**`);
      })

    } else {

      menu.addButton("activate", () => {

        const activePotion = player.activePotions
          .find(x => x.potion.id === this.id);

        if (activePotion) {
          msg.channel.send(`${activePotion.potion.name} is still active`);
          return;
        }

        const expires = DateTime.now()
          .plus({ milliseconds: this.duration })
          .toJSDate();

        player.activePotions.push({ potion: this, expires });
        player.equippedItems.push(this);
        player.save();

        msg.channel.send(`Successfully activated **${this.name}**`);

      })
    }
  }

  show() {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Potion")
      .setDescription(this.description)
      .addField("Name", this.name, true)
      .addField("Price", this.price.toString(), true);

    return embed;
  }
}

class HealPotion extends Potion {
  id = "heal_potion";
  name = "Heal Potion";
  description = "Increase your health by 20% for 1 hour";
  price = 85_000;
  duration = time.MINUTE;
  apply(player: Player): void {
    player.hp += Math.round(player.hp * 0.2);
  }
}

class DefensePotion extends Potion {
  id = "defense_potion";
  name = "Defence Potion";
  description = "Increase your defense by 20% for 1 hour";
  duration: number = time.HOUR;
  price = 95_000;
  apply(player: Player): void {
    player.armor += player.armor * 0.2;
  }
}
