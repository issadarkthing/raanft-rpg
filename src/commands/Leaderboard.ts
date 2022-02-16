import { Command } from "@jiman24/commandment";
import { toNList } from "@jiman24/discordjs-utils";
import { stripIndents } from "common-tags";
import { Message, MessageEmbed } from "discord.js";
import Enmap from "enmap";
import { DateTime } from "luxon";
import { client } from "../index";
import { Leaderboard } from "../structure/Client";
import { bold, code, currency } from "../utils";

export default class extends Command {
  name = "leaderboard";
  aliases = ["l"];
  description = "show leaderboard of rich players";

  private createLeaderboard(
    type: string, 
    leaderboardID: string, 
    leaderboard: Enmap<string, Leaderboard[]>,
  ) {
    let data: Leaderboard[] = leaderboard.get(leaderboardID) || [];
    data.sort((a, b) => b.coins - a.coins);

    data = data.slice(0, 10);

    const list = data.map(x => `${x.name} ${code(x.coins)}`);
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${type} Leaderboard`)
      .setDescription(
        stripIndents`${bold("Name | Coin")}
        ${toNList(list)}
        `
      )
     
    return embed;
  }

  exec(msg: Message) {

    const date = DateTime.now();
    const dailyID = `${date.daysInYear}-${date.year}`;
    const monthID = `${date.month}-${date.year}`;

    const dailyLeaderboard = this.createLeaderboard("Daily", dailyID, client.daily);
    const monthlyLeaderboard = this.createLeaderboard("Monthly", monthID, client.monthly);

    const player = client.players.array()
      .sort((a, b) => b._coins - a._coins)
      .map((x, i) => `${i + 1}. ${x.name} \`${x._coins}\``)
      .slice(0, 10)
      .join("\n");

    const embed = new MessageEmbed(msg.author)
      .setColor("RANDOM")
      .setTitle("All Time Leaderboard")
      .setDescription(bold(`Name | ${currency}\n`) + player);

    msg.channel.send({ 
      embeds: [
        dailyLeaderboard,
        monthlyLeaderboard,
        embed,
      ] 
    });
  }
}

