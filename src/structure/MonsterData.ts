
function combinator(a: string[], b: string[]) {
  const result: string[] = [];

  for (const j of b) {
    for (const i of a) {
      result.push(`${i} ${j}`);
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
  "Evil Slime",
];

export const monsterNames = combinator(levels, names);