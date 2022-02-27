import { Fighter } from "@jiman24/discordjs-rpg";
import { code, currency } from "../utils";
import { Skill } from "./Skill";
import { Pet } from "./Pet";
import { MersenneTwister19937, Random } from "random-js";
import { Player } from "./Player";


export class Monster extends Fighter {
  drop: number;
  xpDrop: number;
  difficulty: number;
  private enableImage = true;
  private random: Random;
  
  constructor(name: string, imageUrl: string, index: number) {
    super(name);
    const SEED = index;
    this.random = new Random(MersenneTwister19937.seed(SEED));
    this.difficulty = index + 1;

    if (this.enableImage) {
      this.imageUrl = imageUrl;
    }

    this.hp += index * 8 + this.randomAttrib();
    this.attack += index * 2 + this.randomAttrib();
    this.critDamage += index * 0.01;
    this.armor += (this.randomAttrib() / 1000);
    this.critChance += (this.randomAttrib() / 1000);
    this.drop = (this.difficulty * 10)
    this.xpDrop = (this.difficulty * 3)

    if (this.difficulty > 50) {
      const pet = this.random.pick(Pet.all);
      pet.setOwner(this);
    }

    if (this.difficulty > 100) {
      const skill = this.random.pick(Skill.all);
      skill.setOwner(this);
    }

  }

  private randomAttrib() {
    return this.random.integer(-5, this.difficulty);
  }

  static get all() {
    return monsterNames.map((x, i) => new Monster(x.name, x.url, i));
  }

  show(player?: Player) {
    const profile = super.show(player);

    if (player) {
      profile.setAuthor({ name: player.name, iconURL: player.imageUrl });
    }

    profile.addField(`${currency} Drop`, code(this.drop), true);
    profile.addField("xp Drop", code(this.xpDrop), true);

    return profile;
  }
}


function combinator(a: string[], b: { name: string, url: string }[]) {
  const result: { name: string, url: string }[] = [];

  for (const j of b) {
    for (const i of a) {
      result.push({ name: `${i} ${j.name}`, url: j.url });
    }
  }

  return result;
}

const levels = [
  "Weak",
  "Strong",
  "Armoured",
];

const names = [
{ name: "Fish", url: "https://www.runehq.com/image/monsterdb/a/abomination.png" },
{ name: "Crab", url: "https://www.runehq.com/image/monsterdb/r/rumpumpedcrab.png" },
{
  name: "Scorpion",
  url: "https://www.runehq.com/image/monsterdb/a/abyssalleech.png"
},
{ name: "Bird", url: "https://www.runehq.com/image/monsterdb/a/acheronmammoth.png" },
{
  name: "Boar",
  url: "https://www.runehq.com/image/monsterdb/a/adolescentwhitewolf.png"
},
{ name: "Wolves", url: "https://www.runehq.com/image/monsterdb/a/airelemental.png" },
{ name: "Bear", url: "https://www.runehq.com/image/monsterdb/a/airut.png" },
{ name: "Orc", url: "https://www.runehq.com/image/monsterdb/a/alkharidwarrior.png" },
{ name: "Soldier", url: "https://www.runehq.com/image/monsterdb/a/albinobat.png" },
{ name: "Henchmen", url: "https://www.runehq.com/image/monsterdb/a/alomone.png" },
{
  name: "Monster",
  url: "https://www.runehq.com/image/monsterdb/a/ambassadorjabari.png"
},
{ name: "Zombie", url: "https://www.runehq.com/image/monsterdb/a/anagami.png" },
{
  name: "Goblins",
  url: "https://www.runehq.com/image/monsterdb/a/ancestralorokami.png"
},
{
  name: "Mercenary",
  url: "https://www.runehq.com/image/monsterdb/a/animatedspade.png"
},
{ name: "Undead", url: "https://www.runehq.com/image/monsterdb/a/anja.png" },
{ name: "Orcs", url: "https://www.runehq.com/image/monsterdb/a/aquaticjadinko.png" },
{ name: "Creeper", url: "https://www.runehq.com/image/monsterdb/a/araxxor.png" },
{ name: "Reaper", url: "https://www.runehq.com/image/monsterdb/a/archer.png" },
{ name: "Mole", url: "https://www.runehq.com/image/monsterdb/a/armouredzombie.png" },
{ name: "Crab", url: "https://www.runehq.com/image/monsterdb/a/arrg.png" },
{ name: "Chicken", url: "https://www.runehq.com/image/monsterdb/a/automaton.png" },
{
  name: "Cockroach",
  url: "https://www.runehq.com/image/monsterdb/a/automatongenerator.png"
},
{ name: "Duck", url: "https://www.runehq.com/image/monsterdb/b/babyroc.png" },
{
  name: "Bee Swarm",
  url: "https://www.runehq.com/image/monsterdb/b/babybluedragon.png"
},
{
  name: "Angry Sheep",
  url: "https://www.runehq.com/image/monsterdb/b/banditlooter.png"
},
{
  name: "Cow",
  url: "https://www.runehq.com/image/monsterdb/a/avatarofcreation.png"
},
{
  name: "Cobra Queen",
  url: "https://www.runehq.com/image/monsterdb/a/automatontracer.png"
},
{ name: "Zombie Cow", url: "https://www.runehq.com/image/monsterdb/b/banshee.png" },
{ name: "Rat", url: "https://www.runehq.com/image/monsterdb/b/bagradarex.png" },
{ name: "Seagull", url: "https://www.runehq.com/image/monsterdb/b/billygoat.png" },
{ name: "Rabbit", url: "https://www.runehq.com/image/monsterdb/b/bigwolf.png" },
{
  name: "Evil Peasant",
  url: "https://www.runehq.com/image/monsterdb/b/beastmasterdurzag.png"
},
{
  name: "Baby Orc",
  url: "https://www.runehq.com/image/monsterdb/b/blackunicorn.png"
},
{
  name: "Giant Spider",
  url: "https://www.runehq.com/image/monsterdb/b/bloodreaver.png"
},
{ name: "Hyena", url: "https://www.runehq.com/image/monsterdb/b/boris.png" },
{
  name: "Giant Rat",
  url: "https://www.runehq.com/image/monsterdb/b/bluedragon.png"
},
{
  name: "Evil Flight Attendant",
  url: "https://www.runehq.com/image/monsterdb/b/bloodblamishsnail.png"
},
{ name: "Dwarf", url: "https://www.runehq.com/image/monsterdb/b/breoca.png" },
{ name: "Goblin", url: "https://www.runehq.com/image/monsterdb/b/broddi.png" },
{
  name: "Giant Chicken",
  url: "https://www.runehq.com/image/monsterdb/b/bruiseblamishsnail.png"
},
{
  name: "Undead cow",
  url: "https://www.runehq.com/image/monsterdb/b/bundlingorokami.png"
},
{
  name: "Skeleton",
  url: "https://www.runehq.com/image/monsterdb/b/bulwarkbeast.png"
},
{
  name: "Snake Nest",
  url: "https://www.runehq.com/image/monsterdb/b/brutishdinosaur.png"
},
{
  name: "Soldier of the West",
  url: "https://www.runehq.com/image/monsterdb/b/bronzedragon.png"
},
{
  name: "Undead Goblin",
  url: "https://www.runehq.com/image/monsterdb/b/borrokar.png"
},
{ name: "Warlock", url: "https://www.runehq.com/image/monsterdb/c/campdweller.png" },
{
  name: "Pack of Hyenas",
  url: "https://www.runehq.com/image/monsterdb/c/capturedmeiyerditchcitizen.png"
},
{
  name: "Giant Skeleton",
  url: "https://www.runehq.com/image/monsterdb/c/camelwarrior.png"
},
{
  name: "Evil Skeleton",
  url: "https://www.runehq.com/image/monsterdb/c/chaosgiant.png"
},
{
  name: "Grave Scorpion",
  url: "https://www.runehq.com/image/monsterdb/c/chinchompa.png"
},
{
  name: "Jungle Snake",
  url: "https://www.runehq.com/image/monsterdb/c/chaosdwogre.png"
},
{ name: "Summoner", url: "https://www.runehq.com/image/monsterdb/c/chronozon.png" },
{ name: "Thug", url: "https://www.runehq.com/image/monsterdb/c/cockroachdrone.png" },
{ name: "Troll Runt", url: "https://www.runehq.com/image/monsterdb/c/clawdia.png" },
{ name: "Priest", url: "https://www.runehq.com/image/monsterdb/c/clivet.png" },
{
  name: "Summoned Zombie",
  url: "https://www.runehq.com/image/monsterdb/c/cockroachworker.png"
},
{
  name: "Mega Thug",
  url: "https://www.runehq.com/image/monsterdb/d/dagannothrex.png"
},
{
  name: "Tree Spirit",
  url: "https://www.runehq.com/image/monsterdb/d/dashingkebbit.png"
},
{
  name: "Minotaur",
  url: "https://www.runehq.com/image/monsterdb/d/darkenergycore.png"
},
{
  name: "Imp Champion",
  url: "https://www.runehq.com/image/monsterdb/d/deathspawn.png"
},
{
  name: "Dark Warrior",
  url: "https://www.runehq.com/image/monsterdb/d/deadlyredspider.png"
},
{ name: "Wizard", url: "https://www.runehq.com/image/monsterdb/d/darklord.png" },
{
  name: "Thug Crew",
  url: "https://www.runehq.com/image/monsterdb/d/desertsnake.png"
},
{
  name: "Rogue Spirit",
  url: "https://www.runehq.com/image/monsterdb/d/dagannothsupreme.png"
},
{
  name: "Band of Skeletons",
  url: "https://www.runehq.com/image/monsterdb/d/drake.png"
},
{ name: "Hound", url: "https://www.runehq.com/image/monsterdb/d/devilssnare.png" },
{
  name: "Dark Wizard",
  url: "https://www.runehq.com/image/monsterdb/d/drunkenman.png"
},
{
  name: "Hand of Darkness",
  url: "https://www.runehq.com/image/monsterdb/d/dragithnurn.png"
},
{ name: "Water Wizard", url: "https://www.runehq.com/image/monsterdb/e/eduard.png" },
{
  name: "Leprechaun Warrior",
  url: "https://www.runehq.com/image/monsterdb/d/doubleagent.png"
},
{
  name: "Blessed Giant Chicken",
  url: "https://www.runehq.com/image/monsterdb/d/dungkalphite.png"
},
{
  name: "Fire Hound",
  url: "https://www.runehq.com/image/monsterdb/d/diseasedjadinko.png"
},
{ name: "Slime", url: "https://www.runehq.com/image/monsterdb/d/duckling.png" },
{
  name: "Possessed Snakes",
  url: "https://www.runehq.com/image/monsterdb/d/donnythelad.png"
},
{
  name: "Cave Barbarian",
  url: "https://www.runehq.com/image/monsterdb/e/elvarg.png"
},
{
  name: "Angry Barbarian",
  url: "https://www.runehq.com/image/monsterdb/e/exiledkalphiteguardian.png"
},
{
  name: "Chaotic Wizard",
  url: "https://www.runehq.com/image/monsterdb/e/exiledkalphitesoldier.png"
},
{
  name: "Titan",
  url: "https://www.runehq.com/image/monsterdb/e/elitedarkwarrior.png"
},
{ name: "Evil Mage", url: "https://www.runehq.com/image/monsterdb/e/einar.png" },
{
  name: "Undead Hero",
  url: "https://www.runehq.com/image/monsterdb/e/exiledkalphiteparagon.png"
},
{ name: "Titan", url: "https://www.runehq.com/image/monsterdb/f/feraldinosaur.png" },
{
  name: "Swarm of Zombies",
  url: "https://www.runehq.com/image/monsterdb/f/firegiant.png"
},
{
  name: "Dark Titan",
  url: "https://www.runehq.com/image/monsterdb/e/elitedarkmage.png"
},
{
  name: "High Priest",
  url: "https://www.runehq.com/image/monsterdb/f/felineakh.png"
},
{
  name: "Baby Dragon",
  url: "https://www.runehq.com/image/monsterdb/f/feverspider.png"
},
{
  name: "Troll General",
  url: "https://www.runehq.com/image/monsterdb/f/firewizard.png"
},
{
  name: "Mountain Troll",
  url: "https://www.runehq.com/image/monsterdb/f/foragingbakami.png"
},
{
  name: "Blessed Hero",
  url: "https://www.runehq.com/image/monsterdb/f/flockleadergeerin.png"
},
{
  name: "Titanic Monster",
  url: "https://www.runehq.com/image/monsterdb/f/forcemuspah.png"
},
{
  name: "Paladin",
  url: "https://www.runehq.com/image/monsterdb/f/fungalrodent.png"
},
{
  name: "Death Unicorn",
  url: "https://www.runehq.com/image/monsterdb/g/georgy.png"
},
{
  name: "Possessed Dragon",
  url: "https://www.runehq.com/image/monsterdb/f/fortunateorokami.png"
},
{ name: "Dragon Queen", url: "https://www.runehq.com/image/monsterdb/f/fumus.png" },
{
  name: "Undead Paladin",
  url: "https://www.runehq.com/image/monsterdb/f/fortressguard.png"
},
{
  name: "Gargoyle Prince",
  url: "https://www.runehq.com/image/monsterdb/g/ghoul.png"
},
{ name: "Evil Slime", url: "https://www.runehq.com/image/monsterdb/g/ghost.png" },
];

const monsterNames = combinator(levels, names);
