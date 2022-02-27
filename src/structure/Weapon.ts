import { Weapon as BaseWeapon } from "@jiman24/discordjs-rpg";
import { Player } from "../structure/Player";
import { applyMixins, setAuthor } from "../utils";
import { Item } from "./Item";

export interface Weapon extends Item {};

export abstract class Weapon extends BaseWeapon {
  abstract price: number;
  abstract readonly ATTACK_MARKUP: number;
  abstract readonly PRICE_MARKUP: number;

  static get all(): Weapon[] {
    const { Weapon: weaponsItems } = require("./WeaponItems");
    const { Necklace } = require("./Necklaces");
    return [
      ...weaponsItems.all,
      ...Necklace.all,
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

  apply(player: Player) {
    player.attack += this.attack;
  }

  show(player?: Player) {
    const embed = super.show();

    if (player) setAuthor(embed, player);

    return embed;
  }
}

applyMixins(Weapon, [Item]);
