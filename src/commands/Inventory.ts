import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { ButtonHandler } from "@jiman24/discordjs-button";
import { Player } from "../structure/Player";
import { DIAMOND, toNList, validateNumber } from "../utils";
import { oneLine } from "common-tags";


export default class extends Command {
  name = "inventory";
  description = oneLine`show player's inventory. When buying from shop, you need
  to equip the item in here`;
  aliases = ["i", "inv"];
  maxArmor = 4; // max equipped armor
  maxWeapon = 2; // max equipped weapon

  async exec(msg: Message, args: string[]) {

    const player = Player.fromUser(msg.author);
    const [arg1] = args;

    if (arg1) {

      const index = parseInt(arg1) - 1;

      validateNumber(index);

      const item = player.inventory[index];

      if (!item) {
        throw new Error("cannot find item");
      }

      const menu = new ButtonHandler(msg, item.show());

      item.actions(msg, menu, player);
      menu.addCloseButton();

      await menu.run();

      return;
    }

    const inventoryList = toNList(
      player.inventory.map(item => {
        // show equipped item in the list with symbol so it is easier to
        // overview what item is in equipped
        const equippedName = `${DIAMOND} ${item.name}`;

        if (player.equippedItems.some(x => x.id === item.id)) {
          return equippedName;
        }

        return item.name;
      })
    );

    let footer = "\n---\nto equip an item in inventory 1, use `!inventory 1`";

    footer += `${DIAMOND}: equipped/active`;

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Inventory")
      .setDescription(inventoryList + footer)

    msg.channel.send({ embeds: [embed] });

  }
}
