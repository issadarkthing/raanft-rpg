import { Armor as BaseArmor } from "@jiman24/discordjs-rpg";
import assert from "assert/strict";
import { applyMixins } from "../utils";
import { Item } from "./Item";
import { Player } from "./Player";

export interface Armor extends Item {}

export abstract class Armor extends BaseArmor {
  abstract price: number;
  abstract readonly ARMOR_MARKUP: number;
  abstract readonly PRICE_MARKUP: number;

  static get all(): Armor[] {
    const { Helmet } = require("./Helmet");
    const { Chest } = require("./Chest");
    return [
      ...Helmet.all as Armor[],
      ...Chest.all as Armor[],
    ].sort((a, b) => a.price - b.price);
  }

  protected increaseArmor(multiplier: number) {
    for (let i = 0; i < multiplier; i++) {
      this.armor += this.armor * this.ARMOR_MARKUP;
    }
  }

  protected increasePrice(multiplier: number) {
    for (let i = 0; i < multiplier; i++) {
      this.price += Math.round(this.price * this.PRICE_MARKUP);
    }
  }

  apply(player: Player) {
    player.armor += this.armor;
  }
}

