import { prisma } from './../../db/client';
import type { Context } from './../context';
import { protectedProcedure } from './../trpc';
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import type { Prisma } from '@prisma/client';

export const heroRouter = router({
  addHero: protectedProcedure
    .input(z.object({
      guildId: z.string(),
      heroId: z.string()
    }))
    .mutation(({ input, ctx }) => addHeroToGuildHandler({ input, ctx })),
  createHero: protectedProcedure
    .input(z.object({
      name: z.string(),
      sex: z.boolean(),
      race: z.string(),
      class: z.string(),
      alignment: z.string(),
      healthPoints: z.number(),
      strength: z.number(),
      dexterity: z.number(),
      magic: z.number(),
      constitution: z.number(),
      resistance: z.number(),
      defense: z.number(),
      movement: z.number(),
      speed: z.number(),
      purse: z.number(),
      guild: z.string()
    }))
    .mutation(({ input, ctx }) => createHeroHandler({ input, ctx })),
  generateHero: protectedProcedure
    .query(() => { generateHeroHandler() }),
  getAll: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.hero.findMany();
    }),
  getHero: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.hero.findFirst({
        where: {
          id: {
            equals: input.id
          }
        }
      })
    }),
  getHeroesByGuild: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.hero.findMany({
        where: {
          guildId: {
            equals: input.id
          }
        }
      })
    }),
  removeHeroFromGuild: protectedProcedure
    .input(z.string())
    .mutation(({ input, ctx }) => removeHeroFromGuildHandler({ input, ctx })),
});

// controller stuff
const addHeroToGuildHandler = async ({ input }: { input: AddHeroToGuildInput, ctx: Context} ) => {
  try {
    const hero = AddHeroToGuild(input);
    generateHeroHandler();
    return {
      status: 'success',
      data: {
        hero
      }
    }
  }
  catch (err: any) {
    throw(err);
  }
}
const createHeroHandler = async ({ input }: { input: CreateHeroInput; ctx: Context }) => {
  try {
    const hero = await CreateHero({
      name: input.name,
      sex: input.sex,
      level: 0,
      experience: 0,
      race: input.race,
      class: input.class,
      alignment: input.alignment,
      healthPoints: input.healthPoints,
      strength: input.strength,
      dexterity: input.dexterity,
      magic: input.magic,
      constitution: input.constitution,
      resistance: input.resistance,
      defense: input.defense,
      movement: input.movement,
      speed: input.speed,
      purse: input.purse,
      guild: {
        connect: {
          id: "0"
        }
      }
    });

    return {
      status: 'success',
      data: {
        hero
      }
    }
  }
  catch (err: any) {
    throw err;
  }
};
const generateHeroHandler = async () => {
  try {
    const heroInput = await GenerateHero();
    const hero = await CreateHero(heroInput);

    return {
      status: 'success',
      data: {
        hero
      }
    } 
  }
  catch (err: any) {
    throw err;
  }
}
const removeHeroFromGuildHandler = async ({ input }: { input: string; ctx: Context }) => {
  try {
    const hero = RemoveHeroFromGuild(input);

    return {
      status: 'success',
      data: {
        hero
      }
    }
  } catch (err: any) {
    throw err;
  }
}

// service stuff
const AddHeroToGuild = async (input: AddHeroToGuildInput) => {
  const hero = await prisma?.hero.update({
    where: {
      id: input.heroId
    },
    data: {
      guild: {
        connect: {
          id: input.guildId
        }
      }
    }
  })
}
const CreateHero = async (input: Prisma.HeroCreateInput) => {
  if (!input.guild) {
    input.guild = {
      connect: {
        id: "0"
      }
    }
  }
  return (await prisma?.hero.create({
    data: input
  }));
}
const GenerateHero = async () => {
  const sex = getRandomBool();
  const race = randomFromArray(Races, "Human");
  const stats = generateStats();
  const heroClass = randomFromArray(Classes, "Fighter");
  let str, dex, mag, con, res, def, mov, spd = 8;

  switch (heroClass) {
    case "Cleric":
      res = stats[0];
      def = stats[1];
      mag = stats[2];
      con = stats[3];
      str = stats[4];
      dex = stats[5];
      break;
    case "Fighter":
      str = stats[0];
      def = stats[1];
      con = stats[2];
      dex = stats[3];
      res = stats[4];
      mag = stats[5];
      break;
    case "Ranger":
      dex = stats[0];
      str = stats[1];
      def = stats[2];
      con = stats[3];
      res = stats[4];
      mag = stats[5];
      break;
    case "Wizard":
      mag = stats[0];
      res = stats[1];
      con = stats[2];
      dex = stats[3];
      str = stats[4];
      def = stats[5];
      break;
  }

  switch (race) {
    case "Dwarf":
      spd = 10;
      mov = 30;
      break;
    case "Elf":
      spd = 8;
      mov = 25;
      break;
    case "Human":
      spd = 8;
      mov = 25;
      break;
    case "Minotaur":
      spd = 6;
      mov = 20;
      break;
    case "Orc":
      spd = 6;
      mov = 20;
      break;
    case "Warforged":
      spd = 8;
      mov = 25;
      break;
  }

  return {
    name: randomName(race, sex),
    sex: sex,
    race: race,
    class: heroClass,
    alignment: randomFromArray(Alignments, "NeutralGood"),
    level: 1,
    experience: 0,
    healthPoints: 10 + (con ?? 8),
    strength: str ?? 8,
    dexterity: dex ?? 8,
    magic: mag ?? 8,
    constitution: con ?? 8,
    resistance: res ?? 8,
    defense: def ?? 8,
    movement: mov ?? 30,
    speed: spd ?? 10,
    purse: getRandomInt(0, 100)
  };
}
const RemoveHeroFromGuild = async (input: string) => {
  const hero = await prisma?.hero.update({
    where: {
      id: input
    },
    data: {
      guildId: "0"
    }
  });
  return hero;
}
// service privates ;) //
const getRandomBool = () => {
  return Math.random() < 0.5;
}
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
const generateStats = () => {
  const arr: number[] = [];
  while(arr.length < 6) {
    arr.push(getRandomInt(8, 21));
  }
  arr.sort((a, b) => { return b - a });
  return arr;
}
const randomFromArray = (array: Array<string>, defaultValue: string) => {
  const i = getRandomInt(0, array.length - 1);
  return array[i] ?? defaultValue;
}
const randomName = (race: string, sex: boolean) => { 
  if (sex) {
    switch (race) {
      case "Dwarf":
        return randomFromArray(dwarfMaleNames, "Thaliggs");
      case "Elf":
        return randomFromArray(elfMaleNames, "Wrancan");
      case "Human":
        return randomFromArray(humanMaleNames, "Siggi");
      case "Minotaur":
        return randomFromArray(minotaurMaleNames, "Neamin Stonefury");
      case "Orc":
        return randomFromArray(orcMaleNames, "zhukk The Violent");
      case "Warforged":
        return randomFromArray(warforgedNames, "Judge");
      default: 
        return "Male";
    }
  } else {
    switch (race) {
      case "Dwarf":
        return randomFromArray(dwarfFemaleNames, "Dimnora");
      case "Elf":
        return randomFromArray(elfFemaleNames, "Daleth");
      case "Human":
        return randomFromArray(humanFemaleNames, "Gitta");
      case "Minotaur":
        return randomFromArray(minotaurFemaleNames, "Laanmi Toughheart");
      case "Orc":
        return randomFromArray(orcFemaleNames, "rhing Pride Saber");
      case "Warforged":
        return randomFromArray(warforgedNames, "Judge");
      default: 
        return "Female";
    }
  }
  return "Terry";
}



// types
export type AddHeroToGuildInput = {
  guildId: string;
  heroId: string;
}
export type CreateHeroInput = {
  name: string;
  sex: boolean;
  race: string;
  class: string;
  alignment: string;
  healthPoints: number;
  strength: number;
  dexterity: number;
  magic: number;
  constitution: number;
  resistance: number;
  defense: number;
  movement: number;
  speed: number;
  purse: number;
}
const Alignments = [
  "LawfulGood",
  "LawfulMoral",
  "LawfulNeutral",
  "LawfulImpure",
  "LawfulEvil",
  "SocialGood",
  "SocialMoral",
  "SocialNeutral",
  "SocialImpure",
  "SocialEvil",
  "NeutralGood",
  "NeutralMoral",
  "TrueNeutral",
  "NeutralImpure",
  "NeutralEvil",
  "RebelGood",
  "RebelMoral",
  "RebelNeutral",
  "RebelImpure",
  "RebelEvil",
  "ChaoticGood",
  "ChoaticMoral",
  "ChoaticNeutral",
  "ChoaticImpure",
  "ChoaticEvil"
];
const Classes = [
  "Cleric",
  "Fighter",
  "Ranger",
  "Wizard"
];
const Races = [
  "Dwarf",
  "Elf",
  "Human",
  "Minotaur",
  "Orc",
  "Warforged",
];
// move these to individual files:
const dwarfMaleNames = ["Thaliggs", "Tormek", "Baerrik", "Murgran", "Gerrim", "Bennyl", "Brumnur", "Hormek", "Kromkyl", "Tharmus", "Tynyl", "Armdrum", "Thergrom", "Hornus", "Mornam", "Brumdrak", "Tydur", "Balnyl", "Emrom", "Bergus", "Gargrum", "Huldrak", "Umdrus", "Bheldir", "Rotduhr", "Gremdan", "Rotgrom", "Thorgurn", "Tornar", "Hultharn", "Thulrik", "Maggarn", "Magkyl", "Vonnir", "Hjulnum", "Grambrek", "Magman", "Hulkom", "Rotthrum", "Gulthran", "Grenduhr", "Thurmin", "Thydram", "Daergrun", "Germus", "Banmin", "Vondar", "Bermur", "Thorron", "Bennir", "Brumbek", "Murdir", "Kharnik", "Umkyl", "Tyrus", "Tharadin", "Theldur", "Dalmiir", "Bhardram", "Ambrek", "Amkyl", "Krumdrak", "Grilmek", "Brumgus", "Balrim", "Armmun", "Bramgram", "Amrim", "Tornam", "Brankuhm" ];
const dwarfFemaleNames = [ "Dimnora", "Bronglia", "Rundyl", "Mysri", "Jynres", "Dimvan", "Naerwynn", "Kathrielle", "Lassnia", "Sollen", "Anryn", "Bondora", "Brulnis", "Sarwaen", "Baerlyn", "Lasres", "Bylvian", "Katnan", "Nassnyss", "Nisma", "Anwaen", "Sargwyn", "Deartyn", "Belbera", "Bonnros", "Gwinleen", "Maevselle", "Jinras", "Jinsyl", "Bonbera", "Redsyl", "Kaitres", "Byllebera", "Ketdryn", "Kaitwyn", "Ketthel", "Redleen", "Jendryn", "Jenniss", "Jynnip", "Mistres", "Maerris", "Ranvian", "Gymdille", "Dearnip", "Marmera", "Ranlyn", "Lyesla", "Bralnera", "Mystres", "Redmyl", "Naslynn", "Nesres", "Nisleen", "Nasleil", "Rynnar", "Brollin", "Tiznas", "Katria", "Myrnia", "Kardish", "Naldille", "Gemryn", "Jyndelle", "Ardora", "Maevma", "Elmura", "Edgwyn", "Jennma", "Ketlynn" ];
const elfMaleNames = [ "Wrancan", "Zinnelis", "Persalor", "Beineiros", "Carris", "Fenlar", "Sarjeon", "Vafir", "Ralotoris", "Morbalar", "Yelxidor", "Waesydark", "Waesven", "Elaquinal", "Norhorn", "Zumnelis", "Heiris", "Virlen", "Genris", "Sylceran", "Aedithas", "Sylmaris", "Thetoris", "Iliwraek", "Sarnan", "Herwraek", "Olotoris", "Qisandoral", "Herberos", "Keanelis", "Zincan", "Ralokian", "Zumzeiros", "Ralomaris", "Umeran", "Iantoris", "Mirayarus", "Sarzumin", "Zinhice", "Beizeiros", "Sarberos", "Iliran", "Uripeiros", "Dorkas", "Norhice", "Norzumin", "Mormenor", "Yinjor", "Elmaris", "Herfaren", "Oloydark", "Vahorn", "Erro", "Yelhorn", "Lufir", "Daejeon", "Miratoris", "Perpeiros", "Adxidor", "Yingolor", "Yinsalor", "Ilifaren", "Wrannorin", "Elnorin", "Varan", "Daenan", "Ertoris", "Genfir", "Vamaer", "Elasalor" ];
const elfFemaleNames = [ "Daleth", "Reyrieth", "Gilsatra", "Aratris", "Krisbanise", "Jojyre", "Farona", "Josys", "Bifina", "Liavaris", "Ulamys", "Uririeth", "Grekalyn", "Daeqirelle", "Jolana", "Urisys", "Brykrana", "Olaleth", "Faexina", "Bizorwyn", "Loramoira", "Sylkrana", "Brywynn", "Trislee", "Xyrrel", "Qikrana", "Caileth", "Maghana", "Ulaxina", "Gredi", "Zinzorwyn", "Torvaris", "Ravalynn", "Jowenys", "Liakrana", "Orikrana", "Sylmoira", "Faefiel", "Farieth", "Grezorwyn", "Qileth", "Oricyne", "Xilnala", "Grewynn", "Bryrora", "Dajyre", "Bina", "Wysagella", "Wysarieth", "Shatris", "Yesfiel", "Shaleth", "Loralee", "Xyrmys", "Urisatra", "Caicaryn", "Yeslana", "Ulazana", "Adynore", "Biphine", "Magtris", "Shahana", "Qifina", "Inatris", "Urirora", "Sharalei", "Eilbella", "Ulagella" ];
const humanMaleNames = [ "Siggi", "Marley", "Englebert", "Geof", "Friedel", "Dominic", "Eleazar", "Braxton", "Harbert", "Brinley", "Linden", "Wolter", "Sinclaire", "Landon", "Tibault", "Sherlock", "Noa", "Korey", "Adger", "Courtney", "Matze", "Draven", "Rodolph", "Hurlbert", "Witton", "Aribert", "Rai", "Desmund", "Norice", "Slade", "Kenton", "Rodel", "Innocentius", "Woodruff", "Noel", "Raven", "Garlan", "Rodmond", "Misael", "Mayne", "Aurel", "Stephan", "Nicolas", "Zakary", "Beni", "Paavo", "Read", "Walter", "Manilo", "Maik", "Durwald", "Brod", "Javen", "Jean-Baptiste", "Gaven", "Mekhi", "Pacey", "D'arcy", "Asher", "Kunz", "Verrell", "Kadin", "Speck", "Neo", "Tanner", "Morell", "Bernie", "Eldon", "Nuran", "Caio", "Otto", "Ripley", "Santino", "Sigwald", "Micah", "Wyn", "Arnaldo", "Yehudi", "Brigham", "Russ" ];
const humanFemaleNames = [ "Gitta", "Brea", "Fleurette", "Ryan", "Catharina", "Desarae", "Meyla", "Lauryn", "Eri", "Ash", "Ferdinanda", "Roterica", "Jackeline", "Reese", "Amrei", "Binga", "Moniqua", "Chiara", "Corette", "Helga", "Gerdi", "Ashby", "Gabriela", "Daggy", "Esmeralda", "Darby", "Lena", "Thabita", "Evette", "Mindy", "Blanchefleur", "Elberta", "Ulva", "Beverely", "Addie", "Darlene", "Vivian", "Ruby", "Eden", "Carmela", "Hertha", "Charlotta", "Suse", "Roswitha", "Gracy", "Rahel", "Domenica", "Carissa", "Garland", "Monserrat", "Felicitas", "Melusina", "Sissi", "Jacqui", "Pansy", "Valborga", "Esther", "Aaliyah", "Clarita", "Kunigunde", "Belinda", "Helene", "Gertrud", "Dulce", "Ria", "Charmine", "Ninon", "Magdalen", "Lucette", "Yolonda", "Doris", "Joleigh", "Mandy", "Allison", "Lucia", "Carolina", "Chantal", "Roux" ];
const orcMaleNames = [ "zhukk The Violent", "dak Chin Sunderer", "ghog The Barren", "rukk The Dark", "bhatrar The Radical", "zuddug Giant Axe", "robug Ghost Skinner", "amzog The Vengeful", "dranug Horror Mutilator", "dohrag Ash Strangler", "dak Spine Cracker", "dok The Crooked", "gakk The Reckless", "man Chin Conquerer", "dujokk The Aberrant", "lahzab The Anguished", "gradrak Dark Scalper", "bharzall Rib Destroyer", "bobrak The Barren", "rhomvoll The Proud", "lud Blood Cruncher", "rhag The Warped", "brab The Broad", "log Venom Render", "orokk The Crazy", "shudzan Chin Trampler", "drunog Chest Gouger", "barzakk The Mad", "avrall The Simple", "rokzokk Flame Squasher", "brug The Enraged", "dhun The Berserk", "nud The Fearless", "zhob Hell Slicer", "lunzakk Beast Sword", "zagzud Elf Piercer", "drahzan Chin Killer", "lurlod Heart Killer", "ronzok Poison Splitter", "raggug Feet Blade", "nokk Chin Breaker", "bak Throat Chopper", "ghok Ankle Masher", "jakk Smoke Killer", "brumzuk The Wretched", "ongub The Feisty", "zugron Brass Scalper", "dhuzzul The Coarse", "shugzak Horror Wrecker", "shangun The Mighty", "jod Hell Ender", "gok Iron Dissector", "dall The Venomous", "drokk The Outlandish", "naddun Fiend Spear", "brahzob The Disfigured", "dagokk Talon Cleaver", "dhodzuk The Loyal", "dudgol Fang Strangler", "nadak The Brute", "mab The Swift", "dhak The Silent", "grakk The Proud", "gub The Frantic", "nunzog Eye Squelcher", "grogzull Fang Quelcher", "odon The Violent", "gurzur Breath Wrecker", "brungab The Sick", "gongon Throat Killer" ];
const orcFemaleNames = [ "rhing Pride Saber", "hiv The Defiant", "gham Dream Axe", "ren Eye Dagger", "balih The Cold", "olvol Throat Vanquisher", "aognee The Enraged", "gawnev The Barren", "dhale The Delirious", "aamvim Cold Sabre", "rem Gore Sword", "bhen The Fierce", "zong The Enormous", "bheng Knee Burster", "hudgu The Colossal", "igvek Ghost Defacer", "vigge Poison Masher", "shivraf The Wicked", "ewnam The Warped", "bhavnu Elf Gasher", "dhiel The Mad", "suh Gnome Pummel", "ghev The Cruel", "bhil Brain Despoiler", "bagzou The Grim", "shodgov Toe Cleaver", "rhumal The Ancient", "vodkol The Vicious", "shaudvaa Talon Trampler", "veta The Vengeful", "voung Brass Burster", "kun Eye Dagger", "ghaak Vein Cruncher", "maf Tooth Flayer", "olzez The Shady", "addua The Filthy", "dolzam The Disfigured", "dhevrik Head Razer", "imof The Gross", "duvnah Beast Lance", "deng Power Ender", "dhaah Gore Saber", "dhim The Fearless", "shung The Ancient", "ghalzao Fiend Quelcher", "ullun The Maniac", "dheggem Bone Render", "eemvon The Brute", "zaullyen Gnoll Cruncher", "bhaunsauz The Wrathful", "shil The Barbarian", "sav Giant Cutter", "sheng The Infernal", "nom Smoke Conquerer", "nodil The Smug", "mumvok Flesh Razer", "vilvom Anger Killer", "eddi Venom Ender", "kewnof The Lethal", "vaulvel Nose Glaive", "shum Steel Blade", "muf The Lethal", "shef Death Dissector", "shol The Violent", "rhownkaam The Infernal", "udguf The Warped", "zodgil The Crooked", "ghansie The Giant", "eevoung The Vengeful", "meewnkeem Rib Cruncher" ];
const minotaurMaleNames = [ "Neamin Stonefury", "Tiasia Strongheart", "Laanvera Truthhoof", "Dendra Singleskull", "Vipe Fisteye", "Noobaran Greathoof", "Kurkar Truthfist", "Jarras Fisthunter", "Japaran Vigilstriker", "Grakun Fearlesseye", "Duuru Bearleader", "Winatred Singleskin", "Estetra Ruggedhorns", "Veonim Boldslayer", "Fenvena Agileleader", "Garfran Keenvigor", "Krumkan Wolfhide", "Granir Agilefighter", "Djungiran Agilestriker", "Krannark Valiantroar", "Aneter Honorhunter", "Seomi Silenthorns", "Aredane Keenspeaker", "Oesdera Vigilwarrior", "Mouvera Ironwalker", "Mirranak Truthheart", "Hunfran Ruggedeye", "Koorrut Stormslash", "Zundrin Orcbody", "Barrut Heavyskin", "Duutra Jaggedhorn", "Irenan Goblinbody", "Teesia Swiftwalker", "Raaster Fearlesshunter", "Neope Heavyhide", "Zunraduk Singlevigor", "Hirkurat Jaggedstriker", "Zarkurat Goblinhorn", "Narnus Bearfighter", "Djuntaruk Strongstep", "Hesdera Singleeye", "Winafin Stonehand", "Miratri Swiftstriker", "Laanna Honorpelt", "Entiken Ruggedhoof", "Kurmanuk Valiantfist", "Farrakar Rockstriker", "Kurvrak Bearfighter", "Zamdaran Valiantfist", "Munrilak Silentskin", "Laanven Ruggedstriker", "Denla Ironhide", "Tesnu Greathorns", "Nanfen Brightpelt", "Dentin Singlehunter", "Kurmaruk Singlehorn", "Manrak Sharpstriker", "Jagarak Gloryroar", "Jarfran Greatstep", "Hunnark Orchunter", "Weozara Stoutslash", "Mirape Toughskull", "Irekane Nimblestep", "Emkane Valiantbody", "Henevera Thickhunter", "Minbaran Steelpelt", "Astekun Strongleader", "Kinbur Strongstep", "Doenkan Goblinhorns", "Mangarak Keenslash" ];
const minotaurFemaleNames = [ "Laanmi Toughheart", "Vialin Thickslash", "Iasvena Greatslayer", "Teezara Truthskull", "Raszin Gloryfist", "Duofa Agileskin", "Iremas Keenhide", "Oenna Silentvigor", "Oestris Boldheart", "Neolian Fisthorns", "Fasnu Brighteye", "Oenfin Singleskin", "Rinatrin Vigilwalker", "Miraru Steadyfury", "Arefin Heavybane", "Seespe Fearlessmind", "Hinenu Fearlessfighter", "Fasta Bravebane", "Tinavera Sharpbane", "Entivin Singleslayer", "Sinaren Valiantheart", "Heslian Swiftleader", "Duukia Vigilstep", "Nuonas Fistskull", "Emvera Boldmind", "Iaskea Stonebody", "Laanzin Heavywarrior", "Hilanan Fearlessbane", "Raslen Greatslayer", "Winaru Stormbody", "Vikia Ironhorn", "Rinanore Strongstriker", "Laanzara Strongrunner", "Kuozin Honorleader", "Emnan Steadyvigor", "Dennore Keenpelt", "Estelo Steelbane", "Uovadin Agilefury", "Duulas Vigilslayer", "Neomira Agileskull", "Vialian Agileslayer", "Denlen Fistwarrior", "Reofin Bearhide", "Linelin Greatmind", "Seovin Braveskull", "Eratrin Stormslash", "Faslin Stonemind", "Denlen Thickrunner", "Arenan Fearlessfighter", "Oentin Honorstriker", "Kitin Truthpelt", "Lineza Jaggedfist", "Teevin Singleskin", "Linelin Nimbleroar", "Virin Heavystep", "Nanken Swiftfury", "Rinanore Gloryeye", "Denme Toughslash", "Rinadra Stormbody", "Seolin Greateye", "Fasnu Valiantslayer", "Irevin Stormhorns", "Lineme Orcspeaker", "Oenfa Bravehand", "Linefin Rockvigor", "Teslen Swiftrunner", "Aamta Orcslash", "Duutrin Ironhand", "Hinekia Steadyslash", "Sinaris Truthspeaker" ];
const warforgedNames = [ "Judge", "Leaper", "Voice", "Porter", "Fumbler", "Lurker", "Bender", "Estoc", "Senior", "Brawler", "Jury", "Spirit", "Boot", "Senser", "Guest", "Mentor", "Bastion", "Cutter", "Hummer", "Shepherd", "Host", "Mime", "Molder", "Handler", "Shield", "Unit", "Tutor", "Beauty", "Salvager", "Rescuer", "Steel", "Zero", "Safeguard", "Abider", "Glancer", "Drone", "Katana", "Flame", "One", "Heart", "Bear", "Merger", "Chaser", "Status", "Glaive", "Fluke", "Breaker", "Subject", "Doctor", "Awakener", "Book", "Beetle", "Cart", "Gift", "Novice", "Hook", "Dagger", "Pilot", "Toad" ];