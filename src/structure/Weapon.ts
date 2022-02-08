import { Weapon as BaseWeapon } from "@jiman24/discordjs-rpg";
import { Player } from "../structure/Player";
import { Item } from "./Item";
import { applyMixins } from "../utils";

export interface Weapon extends Item {};

export abstract class Weapon extends BaseWeapon {
  abstract price: number;
  abstract readonly ATTACK_MARKUP: number;
  abstract readonly PRICE_MARKUP: number;

  static get all(): Weapon[] {
    const { Weapon: weaponsItems } = require("./WeaponItems");
    return [
      ...weaponsItems.all,
    ];
  }

  protected increaseAttack(multiplier: number) {
    for (let i = 0; i < multiplier; i++) {
      this.attack += Math.round(this.attack * this.ATTACK_MARKUP);
    }
  }

  protected increasePrice(multiplier: number) {
    for (let i = 0; i < multiplier; i++) {
      this.price += Math.round(this.price * this.PRICE_MARKUP);
    }
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
}

