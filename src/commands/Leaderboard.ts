import { Command } from "@jiman24/commandment";
import { toNList } from "@jiman24/discordjs-utils";
import { stripIndents } from "common-tags";
import { Message } from "discord.js";
import { MessageEmbed } from "../structure/MessageEmbed";
import Enmap from "enmap";
import { client } from "../index";
import { Leaderboard, ILeaderboard } from "../structure/Leaderboard";
import { bold, code, currency } from "../utils";

export default class extends Command {
  name = "leaderboard";
  aliases = ["l"];
  description = "show leaderboard of rich players";

  private createLeaderboard(
    msg: Message,
    type: string, 
    leaderboardID: string, 
    leaderboard: Enmap<string, ILeaderboard[]>,
  ) {
    let data: ILeaderboard[] = leaderboard.get(leaderboardID) || [];
    data.sort((a, b) => b.coins - a.coins);

    data = data.slice(0, 10);

    const list = data.map(x => `${x.name} ${code(x.coins)}`);
    const embed = new MessageEmbed(msg.author)
      .setColor("RANDOM")
      .setTitle(`${type} Leaderboard`)
      .setDescription(
        stripIndents`${bold(`Name | ${currency}`)}
        ${toNList(list)}
        `
      )
     
    return embed;
  }

  exec(msg: Message) {

    const leaderboard = new Leaderboard();
    const dailyID = leaderboard.dailyLeaderboardID;
    const monthID = leaderboard.monthlyLeaderboardID;
    const allTimeID = leaderboard.allTimeLeaderboardID;

    const dailyLeaderboard = this.createLeaderboard("Daily", dailyID, client.daily);
    const monthlyLeaderboard = this.createLeaderboard("Monthly", monthID, client.monthly);
    const allTimeLeaderboard = this.createLeaderboard("All Time", allTimeID, client.allTime)

    msg.channel.send({ 
      embeds: [
        dailyLeaderboard,
        monthlyLeaderboard,
        allTimeLeaderboard,
      ] 
    });
  }
}

