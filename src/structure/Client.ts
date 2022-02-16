import { CommandManager } from "@jiman24/commandment";
import { Client as DiscordClient } from "discord.js";
import Enmap from "enmap";

export interface Leaderboard {
  id: string;
  name: string;
  coins: number;
}

export class Client extends DiscordClient {
  players = new Enmap("Player");
  commandManager = new CommandManager(process.env.PREFIX || "!");
  daily = new Enmap<string, Leaderboard[]>("Daily");
  monthly = new Enmap<string, Leaderboard[]>("Monthly");
}
