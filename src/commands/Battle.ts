import { Command } from "@jiman24/commandment";
import { Player } from "../structure/Player";
import { Message } from "discord.js";
import { Monster } from "../structure/Monster";
import { Pagination } from "../structure/Pagination";
import { Battle } from "@jiman24/discordjs-rpg";
import { bold, currency, random, sendInfo } from "../utils";
import { stripIndents } from "common-tags";

export default class extends Command {
  name = "battle";
  block: boolean = true;
  description = "battle monsters";
  aliases: string[] = ["b"];

  async exec(msg: Message) {

    const player = Player.fromUser(msg.author)
    const monsters = Monster.all.map(x => x.show(player));
    const menu = new Pagination(msg, monsters, player.currentMonster);
    let monster = Monster.all[0];
    let position = 0;

    menu.setOnSelect((x) => {
      monster = Monster.all[x];
      position = x;
      player.currentMonster = x;
      player.save();
    });

    await menu.run();

    const battle = new Battle(msg, random.shuffle([player, monster]));
    battle.setInterval(500);

    const winner = await battle.run();

    if (winner.id === player.id) {

      const currLevel = player.level;
      player.addXP(monster.xpDrop);
      player.coins += monster.drop;

      sendInfo(
        msg, 
        stripIndents`${player.name} has earned ${bold(monster.drop)} ${currency}!
        ${player.name} has earned ${bold(monster.xpDrop)} xp!`,
      );

      if (currLevel !== player.level) {
        sendInfo(msg, `${player.name} is now on level ${bold(player.level)}!`);
        await player.levelUpBonus(msg);
      }

      player.currentMonster = position;
    }

    player.save();
  }
}
