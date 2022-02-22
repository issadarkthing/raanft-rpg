import { CommandManager } from "@jiman24/commandment";
import { Client as DiscordClient } from "discord.js";
import Enmap from "enmap";
import { ILeaderboard } from "./Leaderboard";

export class Client extends DiscordClient {
  players = new Enmap("Player");
  commandManager = new CommandManager(process.env.PREFIX || "!");
  daily = new Enmap<string, ILeaderboard[]>("Daily");
  monthly = new Enmap<string, ILeaderboard[]>("Monthly");
  allTime = new Enmap<string, ILeaderboard[]>("AllTime");
}
