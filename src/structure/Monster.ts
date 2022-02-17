import { Fighter } from "@jiman24/discordjs-rpg";
import { code, currency } from "../utils";
import { Skill } from "./Skill";
import { Pet } from "./Pet";
import { MersenneTwister19937, Random } from "random-js";
import { monsterNames } from "./MonsterData";
import { Player } from "./Player";


export class Monster extends Fighter {
  drop: number;
  xpDrop: number;
  difficulty: number;
  private enableImage = false;
  private random: Random;
  
  constructor(player: Player) {
    super("");
    const nameIndex = random.integer(0, names.length - 1);
    const levelIndex = random.integer(0, levels.length - 1);
    const name = names[nameIndex];
    const level = levels[levelIndex];

    this.name = `${level} ${name}`;
    this.difficulty = player.level;
    this.drop = random.integer(150, 500) * this.difficulty;
    this.xpDrop = random.integer(10, 35) * this.difficulty;
    this.attack = player.attack + this.randomAttrib();
    this.hp = player.hp + this.randomAttrib();
    this.armor = player.armor + (this.randomAttrib() / 100);
    this.critChance = player.critChance + (this.randomAttrib() / 100);
    this.critDamage = player.critDamage + random.integer(0.01, 0.5);

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

    profile.addField(`${currency} Drop`, code(this.drop), true);
    profile.addField("xp Drop", code(this.xpDrop), true);

    return profile;
  }
}

const levels = [
  "Weak",
  "Strong",
  "Armoured",
];

const names = [
  "Fish", 
  "Crab", 
  "Scorpion", 
  "Bird", 
  "Boar", 
  "Wolves", 
  "Bear", 
  "Orc", 
  "Soldier", 
  "Henchmen", 
  "Monster", 
  "Zombie", 
  "Goblins", 
  "Mercenary", 
  "Undead", 
  "Orcs", 
  "Creeper", 
  "Reaper",
  "Mole",
  "Crab",
  "Chicken",
  "Cockroach",
  "Duck",
  "Bee Swarm",
  "Angry Sheep",
  "Cow",
  "Cobra Queen",
  "Zombie Cow",
  "Rat",
  "Seagull",
  "Rabbit",
  "Evil Peasant",
  "Baby Orc",
  "Giant Spider",
  "Hyena",
  "Giant Rat",
  "Evil Flight Attendant",
  "Dwarf",
  "Goblin",
  "Giant Chicken",
  "Undead cow",
  "Skeleton",
  "Snake Nest",
  "Soldier of the West",
  "Undead Goblin",
  "Warlock",
  "Pack of Hyenas",
  "Giant Skeleton",
  "Evil Skeleton",
  "Grave Scorpion",
  "Jungle Snake",
  "Summoner",
  "Thug",
  "Troll Runt",
  "Priest",
  "Summoned Zombie",
  "Mega Thug",
  "Tree Spirit",
  "Minotaur",
  "Imp Champion",
  "Dark Warrior",
  "Wizard",
  "Thug Crew",
  "Rogue Spirit",
  "Band of Skeletons",
  "Hound",
  "Dark Wizard",
  "Hand of Darkness",
  "Water Wizard",
  "Leprechaun Warrior",
  "Blessed Giant Chicken",
  "Fire Hound",
  "Slime",
  "Possessed Snakes",
  "Cave Barbarian",
  "Angry Barbarian",
  "Chaotic Wizard",
  "Titan",
  "Evil Mage",
  "Undead Hero",
  "Titan",
  "Swarm of Zombies",
  "Dark Titan",
  "High Priest",
  "Baby Dragon",
  "Troll General",
  "Mountain Troll",
  "Blessed Hero",
  "Titanic Monster",
  "Paladin",
  "Death Unicorn",
  "Possessed Dragon",
  "Dragon Queen",
  "Undead Paladin",
  "Gargoyle Prince",
  "Evil Slime" ,
];
