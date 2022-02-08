import { Message, MessageEmbed } from "discord.js";
import { 
  currency, 
  code, 
  toNList, 
  validateIndex, 
  validateNumber,
  cap, 
} from "../utils";
import { Command } from "@jiman24/commandment";
import { ButtonHandler } from "@jiman24/discordjs-button";
import { stripIndents } from "common-tags";
import { Item } from "../structure/Item";
import { Weapon } from "../structure/Weapon";
import { Pet } from "../structure/Pet";
import { Skill } from "../structure/Skill";
import { Helmet } from "../structure/Helmet";
import { Chest } from "../structure/Chest";
import { Leg } from "../structure/Leg";
import { Boots } from "../structure/Boots";

interface ItemLike {
  name: string;
  price: number;
}

export default class extends Command {
  name = "shop";
  description = "buy in-game items";

  private toList(items: ItemLike[], start = 1) {
    const list = toNList(
      items.map(x => `${x.name} ${code(x.price)} ${currency}`),
      start,
    );

    const lastIndex = (items.length - 1) + start;
    return [list, lastIndex] as const;
  }

  async exec(msg: Message, args: string[]) {

    const [arg1, arg2] = args;
    const prefix = this.commandManager.prefix;

    if (arg1) {
    
      let items = [] as Item[] | null;

      switch (arg1) {
        case "chest": items = Chest.all; break;
        case "helmet": items = Helmet.all; break;
        case "leg": items = Leg.all; break;
        case "boots": items = Boots.all; break;
        case "weapon": items = Weapon.all; break;
        case "pet": items = Pet.all; break;
        case "skill": items = Skill.all; break;
        default: items = null;
      }

      if (!items) {
        throw new Error("invalid category");
      }

      if (arg2) {

        const index = parseInt(arg2) - 1;

        validateNumber(index);
        validateIndex(index, items);

        const selected = items[index];

        const info = selected.show();
        const menu = new ButtonHandler(msg, info);

        menu.addButton("buy", () => {
          return selected.buy(msg);
        })

        menu.addCloseButton();

        await menu.run();

        return;
      } else {

        let [itemList] = this.toList(items);
        const category = Object.getPrototypeOf(items[0].constructor).name.toLowerCase();

        itemList += "\n----\n";
        itemList += `To select an item on index 1, use \`${prefix}${this.name} ${category} 1\``;

        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${cap(category)} Shop`)
          .setDescription(itemList)

        msg.channel.send({ embeds: [embed] });

        return;
      }
    }

    const rpgList = stripIndents`
      **Categories**
      chest
      helmet
      weapon
      leg
      pet
      skill
      ------
      To open armor shop use command \`${prefix}${this.name} armor\`
      `;

      const shop = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Shop")
      .setDescription(rpgList);

    msg.channel.send({ embeds: [shop] });

  }
}
