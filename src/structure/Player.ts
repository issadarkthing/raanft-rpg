import { User } from "discord.js";
import { client } from "../index";
import { Player as PlayerRPG } from "@jiman24/discordjs-rpg";
import { code, timeLeft } from "../utils";
import { Item } from "./Item";
import { Potion } from "./Potion";
import { DateTime } from "luxon";
import { Leaderboard } from "../structure/Client";

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

    player.inventory = player.inventory
      .map(inv => Item.get(inv.id)!);

    player.equippedItems = player.equippedItems
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

  private update(userID: string, name: string, amount: number, leaderboard: Leaderboard[]) {
    const user = leaderboard.find(x => x.id === userID);

    if (user) {
      user.coins += amount;
    } else {
      leaderboard.push({ id: userID, coins: amount, name: name });
    }
  }

  get coins() {
    return this._coins;
  }

  set coins(amount: number) {
    if (amount > 0) {
      const amountGot = amount - this._coins;
      const date = DateTime.now();

      const dailyID = `${date.daysInYear}-${date.year}`;
      const dailyPoints = client.daily.get(dailyID) || [];
      this.update(this.id, this.name, amountGot, dailyPoints);
      client.daily.set(dailyID, dailyPoints);

      const monthID = `${date.month}-${date.year}`;
      const monthlyPoints = client.daily.get(monthID) || [];
      this.update(this.id, this.name, amountGot, monthlyPoints);
      client.monthly.set(monthID, monthlyPoints);
    }

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
      delete data.pet.owner;
    }

    client.players.set(this.id, data);
  }
}

export class PlayerNotFoundErr extends Error {}
