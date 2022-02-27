import { Monster } from "./Monster";

export class Boss extends Monster {
  static get all(): Boss[] {
    return names.map((x, i) => new Monster(x.name, x.url, (i + 1) * 20));
  }
}

const names = [
{ name: "Grinch", url: "https://www.runehq.com/image/monsterdb/z/zaklngritch.png" },
{ name: "Kraken", url: "https://www.runehq.com/image/monsterdb/z/zenevivia.png" },
{ name: "Basilisk", url: "https://www.runehq.com/image/monsterdb/y/ytmejkot.png" },
{
  name: "King Kong",
  url: "https://www.runehq.com/image/monsterdb/z/zamorakjadinko.png"
},
{
  name: "Mike Wazowski",
  url: "https://www.runehq.com/image/monsterdb/z/zombieswab.png"
},
{
  name: "Loch Ness Monster",
  url: "https://www.runehq.com/image/monsterdb/z/zogre.png"
},
{
  name: "Alien Steve",
  url: "https://www.runehq.com/image/monsterdb/z/zamorakwizard.png"
},
{
  name: "Terminator Robot",
  url: "https://www.runehq.com/image/monsterdb/y/yellowsalamander.png"
},
{
  name: "Centaur Legion",
  url: "https://www.runehq.com/image/monsterdb/y/younggrotworm.png"
},
{ name: "Phoenix Emperor", url: "https://www.runehq.com/image/monsterdb/y/yak.png" },
{ name: "Nazgul", url: "https://www.runehq.com/image/monsterdb/y/yadviga.png" },
{
  name: "Angel Queen",
  url: "https://www.runehq.com/image/monsterdb/w/waterelemental.png"
},
{
  name: "Demon King",
  url: "https://www.runehq.com/image/monsterdb/w/winterelemental.png"
},
];
