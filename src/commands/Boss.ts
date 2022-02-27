import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Boss } from "../structure/Boss";
import { Player } from "../structure/Player";
import { 
  bold, 
  currency, 
  random, 
  sendInfo, 
  toNList, 
  validateIndex, 
  validateNumber,
} from "../utils";
import { ButtonHandler } from "@jiman24/discordjs-button";
import { Battle } from "@jiman24/discordjs-rpg";
import { MessageEmbed } from "../structure/MessageEmbed";
import { oneLine } from "common-tags";

export default class extends Command {
  name = "boss";
  maxPlayer = 3;
  waitTime = 1000 * 60 * 2; // 2 minutes
  description = "fight boss";
  disable: boolean = false;

  async exec(msg: Message, args: string[]) {

    const player = Player.fromUser(msg.author);
    const boss = Boss.all;
    
    const [arg1] = args;
    
    if (arg1) {

      const index = parseInt(arg1) - 1;
      validateNumber(index)
      validateIndex(index, boss);

      const selectedBoss = boss[index];
      const menu = new ButtonHandler(msg, selectedBoss.show());
      menu.setTimeout(1000 * 60 * 30); // 30 minutes

      let isBattle = false;

      menu.addButton("battle", () => { isBattle = true });

      menu.addCloseButton();

      await menu.run();

      if (!isBattle) return;

      const bossEmbed = selectedBoss.show();
      bossEmbed.setDescription(
        oneLine`${player.name} wants to battle ${selectedBoss.name}. Click
          join to participate max ${this.maxPlayer} players`
      );

      const joinMenu = new ButtonHandler(msg, bossEmbed)
        .setTimeout(this.waitTime)
        .setMultiUser(this.maxPlayer);


      const players: Player[] = [];

      joinMenu.addButton("join", (user) => {

        try {

          const player = Player.fromUser(user);
          players.push(player);
          sendInfo(msg, `${player.name} joined the battle (${players.length}/${this.maxPlayer} players)`, user);

        } catch {

          sendInfo(msg, "You haven't created a character", user);

        }
      })

      await joinMenu.run();

      if (players.length === 0) {
        throw new Error("Cannot start boss battle with 0 player");
      }

      const battle = new Battle(msg, random.shuffle([...players, selectedBoss]));

      battle.setBoss(selectedBoss);

      const winner = await battle.run();

      if (winner.id === player.id) {

        const { drop, xpDrop } = selectedBoss;

        const currLevel = player.level;
        player.addXP(xpDrop);
        player.coins += drop;
        player.win++;

        player.save();

        msg.channel.send(`${player.name} has earned ${bold(drop)} ${currency}!`);
        msg.channel.send(`${player.name} has earned ${bold(xpDrop)} xp!`);

        if (currLevel !== player.level) {
          msg.channel.send(`${player.name} is now on level ${bold(player.level)}!`);
        }
      }

      return;
    }

    const bossList = toNList(boss.map(x => x.name));

    const embed = new MessageEmbed(msg.author)
      .setColor("RED")
      .setTitle("Boss")
      .setDescription(bossList)

    msg.channel.send({ embeds: [embed] });
  }
}
