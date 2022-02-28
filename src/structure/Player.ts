import { Message, User } from "discord.js";
import { client } from "../index";
import { Player as PlayerRPG } from "@jiman24/discordjs-rpg";
import { bold, code, sendInfo, timeLeft } from "../utils";
import { Item } from "./Item";
import { Potion } from "./Potion";
import { DateTime } from "luxon";
import { Leaderboard } from "../structure/Leaderboard";
import { ButtonHandler } from "@jiman24/discordjs-button";
import { MessageEmbed } from "./MessageEmbed";
import { stripIndents } from "common-tags";


interface Attributes {
  attack: number;
  hp: number;
  armor: number;
  critChance: number;
  critDamage: number;
}

type AttributeNames = keyof Attributes;

export class Player extends PlayerRPG {
  name: string;
  _coins = 0;
  level = 1;
  xp = 0;
  win = 0;
  hunt = 0;
  currentMonster = 0;
  inventory: Item[] = [];
  equippedItems: Item[] = [];
  activePotions: { potion: Potion, expires: Date }[] = [];
  bonusAttribs: Attributes = {
    attack: 0,
    hp: 0,
    armor: 0,
    critChance: 0,
    critDamage: 0,
  };

  constructor(user: User, imageUrl: string) {
    super(user);
    this.name = user.username;
    this.imageUrl = imageUrl;
  }

  static fromUser(user: User) {

    const data = client.players.get(user.id);

    if (!data) {
      throw new PlayerNotFoundErr("character has not been created");
    }

    const player = new Player(user, data.imageUrl);
    Object.assign(player, data);

    const offset = player.level - 1;
    player.hp += offset * 10
    player.attack += offset * 2
    player.critDamage += offset * 0.01;

    // apply bonus stat
    player.attack += player.bonusAttribs.attack;
    player.hp += player.bonusAttribs.hp;
    player.armor += player.bonusAttribs.armor;
    player.critChance += player.bonusAttribs.critChance;
    player.critDamage += player.bonusAttribs.critDamage;


    player.inventory = player.inventory
      .filter(x => !!x)
      .map(inv => Item.get(inv.id)!);

    player.equippedItems = player.equippedItems
      .filter(x => !!x)
      .map(item => Item.get(item.id)!);

    for (const { potion, expires } of [...player.activePotions]) {
      const isExpired = DateTime
        .fromJSDate(expires)
        .diffNow(["seconds"])
        .seconds < 0;

      if (isExpired) {
        const p = Potion.all.find(x => x.id === potion.id);
        p?.removePotion(player);
      }
    }

    for (const item of player.equippedItems) {
      item.apply(player);
    }

    player.save();

    return player;
  }


  get coins() {
    return this._coins;
  }

  set coins(amount: number) {
    const amountGot = amount - this._coins;
    const leaderboard = new Leaderboard();

    leaderboard.update(this.id, this.name, amountGot);

    this._coins = amount;
  }

  /** required xp to upgrade to the next level */
  private requiredXP() {
    let x = 10;
    let lvl = this.level
    while (lvl > 1) {
      x += Math.round(x * 0.4);
      lvl--;
    }
    return x;
  }

  /** adds xp and upgrades level accordingly */
  addXP(amount: number) {
    this.xp += amount;
    const requiredXP = this.requiredXP();

    if (this.xp >= requiredXP) {
      this.level++;
      this.addXP(0);
    }
  }

  show() {
    const profile = super.show();
    const armorIndex = 8;

    profile.spliceFields(armorIndex, 2);

    const petIndex = 7;

    profile.fields[petIndex].inline = true;

    profile.addField("Coins", code(this.coins), true);
    profile.addField("Win", code(this.win), true);
    profile.addField("Hunt", code(this.hunt), true);

    const winHuntPercent = (this.win / this.hunt) || 0;
    const winHuntStr = (winHuntPercent * 100).toFixed(2) + "%";
    profile.addField("Win/Hunt %", code(winHuntStr), true);

    profile.addField("Level", code(this.level), true);
    profile.addField("xp", `\`${this.xp}/${this.requiredXP()}\``, true);

    const potionsTimeleft = this.activePotions
      .map(x => `${x.potion.name} ${timeLeft(x.expires)}`);

    if (potionsTimeleft.length > 0) {
      profile.addField("Active Potions", potionsTimeleft.join("\n"));
    }

    return profile;
  }

  async levelUpBonus(msg: Message) {
    const embed = new MessageEmbed(this.user);

    embed.setDescription(
      stripIndents`Please select which attribute you want to upgrade:
        +1 attack
        +5 hp
        +0.1% armor (max 60%)
        +x0.1 crit damage
        +1% crit chance (max 60%)
      `
    );

    const menu = new ButtonHandler(msg, embed);

    let attribute!: AttributeNames;

    menu.addButton("attack", () => { attribute = "attack" });
    menu.addButton("hp", () => { attribute = "hp" });
    menu.addButton("armor", () => { attribute = "armor" });
    menu.addButton("crit chance", () => { attribute = "critChance" });
    menu.addButton("crit damage", () => { attribute = "critDamage" });

    await menu.run();

    if (attribute === "armor" && this.armor >= 0.6) {
      sendInfo(msg, "Please select different attribute as armor has reached its max");
      this.levelUpBonus(msg);

    } else if (attribute === "critChance" && this.critChance >= 0.6) {
      sendInfo(msg, "Please select different attribute as crit chance has reached its max");
      this.levelUpBonus(msg);

    }

    let text = "";

    switch (attribute) {
      case "attack": 
        this.bonusAttribs.attack += 1; 
        text = "+1 attack";
        break;
      case "hp": 
        this.bonusAttribs.hp += 5; 
        text = "+5 hp";
        break;
      case "armor": 
        this.bonusAttribs.armor += 0.001; 
        text = "+0.1% armor";
        break;
      case "critDamage": 
        this.bonusAttribs.critDamage += 0.1; 
        text = "+x0.1 crit damage";
        break;
      case "critChance": 
        this.bonusAttribs.critChance += 0.01; 
        text = "+1% crit chance";
        break;
    }

    sendInfo(msg, `Successfully increased player bonus stat ${bold(text)}`);

    this.save();
  }

  save() {
    const { 
      user, 
      attack,
      hp,
      armor,
      critChance,
      critDamage,
      ...data
    } = this;

    if (data.pet) {
      data.pet = { ...data.pet };
      delete data.pet?.owner;
    }

    client.players.set(this.id, data);
  }
}

export class PlayerNotFoundErr extends Error {}
