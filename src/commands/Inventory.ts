import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { ButtonHandler } from "@jiman24/discordjs-button";
import { Player, PlayerNotFoundErr } from "../structure/Player";
import { currency, DIAMOND, remove, sendInfo, toNList, validateNumber } from "../utils";
import { oneLine } from "common-tags";
import { Prompt } from "@jiman24/discordjs-prompt";


export default class extends Command {
  name = "inventory";
  description = oneLine`show player's inventory. When buying from shop, you need
  to equip the item in here`;
  aliases = ["i", "inv"];
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


      if (player.equippedItems.some(x => x.id === item.id)) {

        menu.addButton("unequip", () => {
          item.unequip(msg, player);
        })

      } else {

        menu.addButton("equip", () => {

          const equippedKind = player.equippedItems
            .find(x => x.constructor.name === this.constructor.name);

          if (equippedKind) {
            player.equippedItems = remove(equippedKind, player.equippedItems);
            sendInfo(msg, `Successfully unequipped **${equippedKind.name}**`);
          }

          player.equippedItems.push(item);
          player.save();

          sendInfo(msg, `Successfully equipped **${this.name}**`);

        })
      }


      let give = false;
      menu.addButton("give", () => { give = true });

      let sell = false;
      menu.addButton("sell", () => { sell = true });

      menu.addCloseButton();

      await menu.run();

      const prompt = new Prompt(msg);

      if (give) {

        if (player.equippedItems.some(x => x.id === item.id)) {
          item.unequip(msg, player);
        }


        const embed = item.show(player)
          .setDescription("Please mention a player you want to give this item to");

        const collected = await prompt.collect(embed);
        const member = collected.mentions.members?.first();

        if (!member) {
          throw new Error("no member mentioned");
        }

        try {

          const mentionedPlayer = Player.fromUser(member.user);

          player.inventory = remove(item, player.inventory);
          player.save();

          mentionedPlayer.inventory.push(item);
          mentionedPlayer.save();

          sendInfo(msg, `Successfully gave ${item.name} to ${member}`);

        } catch (err) {
          if (err instanceof PlayerNotFoundErr) {
            sendInfo(msg, `${member}'s character has not been created`);
          }
        }

      } else if (sell) {

        if (player.equippedItems.some(x => x.id === item.id)) {
          item.unequip(msg, player);
        }


        const sellPrice = Math.round(item.price / 2);
        const embed = item.show(player)
          .setDescription(`This item will be sold for only ${sellPrice} ${currency}`);

        const sellMenu = new ButtonHandler(msg, embed);

        sellMenu.addButton("confirm", () => {

          player.coins += sellPrice;
          player.inventory = remove(item, player.inventory);

          player.save();
          sendInfo(msg, `Successfully sold ${item.name} for ${sellPrice} ${currency}`);

        })

        sellMenu.addCloseButton();

        await sellMenu.run();

      }


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
