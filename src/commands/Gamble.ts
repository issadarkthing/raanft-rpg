import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Player } from "../structure/Player";
import { random, sendInfo, validateAmount, validateNumber } from "../utils";

export default class extends Command {
  name = "gamble";
  description = "slot machine game";
  symbols = ["🔵", "🔴", "⚪"];
  throttle = 8 * 60 * 60 * 1000; // 8 hours

  private allEqual(arr: string[]) {
    return arr.every(x => x === arr[0]);
  }

  private getColumn(index: number, arr: string[][]) {
    return arr.map(x => x[index]);
  }

  private getCrosses(arr: string[][]) {
    return [
      [arr[0][0], arr[1][1], arr[2][2]],
      [arr[0][2], arr[1][1], arr[2][0]],
    ];
  }

  async exec(msg: Message, args: string[]) {

    const arg1 = args[0];
    const amount = parseInt(arg1);
    const player = Player.fromUser(msg.author);

    if (!arg1) {
      throw new Error("please specify bet amount");
    } 

    validateNumber(amount);
    validateAmount(amount, player.coins);

    const rows = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null).map(() => random.pick(this.symbols)));

    let win = false;

    // row check
    for (const row of rows) {
      if (this.allEqual(row)) {
        win = true;
      }
    }

    // column check
    for (let i = 0; i < rows.length; i++) {
      const column = this.getColumn(i, rows);

      if (this.allEqual(column)) {
        win = true;
      }
    }

    // cross check
    for (const row of this.getCrosses(rows)) {
      if (this.allEqual(row)) {
        win = true;
      }
    }

    const result = rows
      .map(x => "**|** " + x.join("") + " **|**")
      .join("\n");

    sendInfo(msg, result);

    player.coins -= amount;

    if (win) {
      const multiplier = 2;
      const winAmount = multiplier * amount;
      player.coins += winAmount;
      sendInfo(msg, `You won **(x${multiplier}) ${winAmount}** coins!`);

    } else {
      sendInfo(msg, `You lost **${amount}** coins!`);
    }

    player.save();
  }
}
