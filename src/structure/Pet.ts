import { Message } from "discord.js";
import { Pet as BasePet } from "@jiman24/discordjs-rpg";
import { Player } from "./Player";

export abstract class Pet extends BasePet {
  abstract price: number;

  static get all(): Pet[] {
    return [
      new Slime(),
      new Snake(),
      new Dragon(),
      new Titan(),
      new Phoenix(),
    ];
  }

  async buy(msg: Message) {

    const player = Player.fromUser(msg.author);

    if (player.coins < this.price) {
      msg.channel.send("Insufficient amount");
      return;
    }

    if (player.inventory.some(x => x.id === this.id)) {
      msg.channel.send("You already own this item");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    msg.channel.send(`Successfully bought **${this.name}**!`);
  }
}

export class Slime extends Pet {
  name = "Slime";
  id = "slime";
  attack = 15;
  interceptRate = 0.2;
  price = 15000;
}

export class Snake extends Pet {
  name = "Snake";
  id = "snake";
  attack = 20;
  interceptRate = 0.35;
  price = 60000;
}

export class Dragon extends Pet {
  name = "Dragon";
  id = "dragon";
  attack = 35;
  interceptRate = 0.1;
  price = 70000;
}

export class Titan extends Pet {
  name = "titan";
  id = "titan";
  attack = 55;
  interceptRate = 0.4;
  price = 88000;
}


export class Phoenix extends Pet {
  name = "Phoenix";
  id = "phoenix";
  attack = 80;
  interceptRate = 0.2;
  price = 110000;
}
