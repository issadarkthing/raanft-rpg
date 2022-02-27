import { ButtonHandler } from "@jiman24/discordjs-button";
import { Message, MessageEmbed, User } from "discord.js";
import { remove, sendInfo } from "../utils";
import { Player } from "./Player";

export abstract class Item {
  abstract name: string;
  abstract id: string;
  abstract price: number;
  abstract apply(player: Player): void;
  abstract show(player?: Player | User): MessageEmbed;

  private unequip() {

  }

  // add buttons to the menu button with their respective actions
  actions(msg: Message, menu: ButtonHandler, player: Player) {

    if (player.equippedItems.some(x => x.id === this.id)) {

      menu.addButton("unequip", () => {
        const { Pet } = require("./Pet");
        const { Skill } = require("./Skill");

        if (this instanceof Pet) {
          delete player.pet;
        } else if (this instanceof Skill) {
          delete player.skill;
        }

        player.equippedItems = remove(this, player.equippedItems);
        player.save();

        sendInfo(msg, `Successfully unequipped **${this.name}**`);
      })

    } else {

      menu.addButton("equip", () => {

        const equippedKind = player.equippedItems
          .find(x => x.constructor.name === this.constructor.name);

        if (equippedKind) {
          player.equippedItems = remove(equippedKind, player.equippedItems);
          sendInfo(msg, `Successfully unequipped **${equippedKind.name}**`);
        }

        player.equippedItems.push(this);
        player.save();

        sendInfo(msg, `Successfully equipped **${this.name}**`);

      })
    }
  }

  buy(msg: Message) {
    const player = Player.fromUser(msg.author);

    if (player.coins < this.price) {
      sendInfo(msg, "Insufficient amount");
      return;
    }

    if (player.inventory.some(x => x.id === this.id)) {
      sendInfo(msg, "You already own this item");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    sendInfo(msg, `Successfully bought **${this.name}**!`);
  }

  static get(id: string) {
    return Item.all.find(x => x.id === id);
  }

  static get all() {
    const { Ring } = require("./Ring");
    const { Armor } = require("./Armor");
    const { Weapon } = require("./Weapon");
    const { Pet } = require("./Pet");
    const { Skill } = require("./Skill");
    const { Potion } = require("./Potion");
    return [
      ...Armor.all,
      ...Weapon.all,
      ...Pet.all,
      ...Skill.all,
      ...Ring.all,
      ...Potion.all,
    ];
  }
}
