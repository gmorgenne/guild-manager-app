import {
  dwarfFemaleNames, dwarfMaleNames, elfFemaleNames, elfMaleNames,
  humanFemaleNames, humanMaleNames, minotaurFemaleNames, minotaurMaleNames,
  orcFemaleNames, orcMaleNames, warforgedNames, bugbearFemaleNames, bugbearMaleNames,
  centaurFemaleNames, centaurMaleNames, dragonbornFemaleNames, dragonbornMaleNames,
  gnomeFemaleNames, gnomeMaleNames, goblinFemaleNames, goblinMaleNames, halfelfFemaleNames,
  halfelfMaleNames, halfingFemaleNames, halfingMaleNames, halforcFemaleNames, halforcMaleNames,
  leoninFemaleNames, leoninMaleNames, lizardfolkFemaleNames, lizardfolkMaleNames, owlinFemaleNames,
  owlinMaleNames, tabaxiFemaleNames, tabaxiMaleNames, tieflingFemaleNames, tieflingMaleNames,
  tortleFemaleNames, tortleMaleNames, satyrFemaleNames, satyrMaleNames, goliathFemaleNames,
  goliathMaleNames, harengonFemaleNames, harengonMaleNames
} from '../../types/hero-names';

export const getRandomBool = () => {
  return Math.random() < 0.5;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomFromArray = (array: Array<string>, defaultValue: string) => {
  const i = getRandomInt(0, array.length);
  return array[i] ?? defaultValue;
};

export const randomName = (race: string, sex: boolean) => {
  switch (race) {
    case "Dwarf":
      return sex ? randomFromArray(dwarfMaleNames, "Thaliggs") : randomFromArray(dwarfFemaleNames, "Dimnora");
    case "Elf":
      return sex ? randomFromArray(elfMaleNames, "Wrancan") : randomFromArray(elfFemaleNames, "Daleth");
    case "Human":
      return sex ? randomFromArray(humanMaleNames, "Siggi") : randomFromArray(humanFemaleNames, "Gitta");
    case "Minotaur":
      return sex ? randomFromArray(minotaurMaleNames, "Neamin Stonefury") : randomFromArray(minotaurFemaleNames, "Laanmi Toughheart");
    case "Orc":
      return sex ? randomFromArray(orcMaleNames, "zhukk The Violent") : randomFromArray(orcFemaleNames, "rhing Pride Saber");
    case "Warforged":
      return randomFromArray(warforgedNames, "Judge");
    case "Centaur":
      return sex ? randomFromArray(centaurMaleNames, "Stud") : randomFromArray(centaurFemaleNames, "Studette");
    case "Dragonborn":
      return sex ? randomFromArray(dragonbornMaleNames, "Stud") : randomFromArray(dragonbornFemaleNames, "Studette");
    case "Gnome":
      return sex ? randomFromArray(gnomeMaleNames, "Stud") : randomFromArray(gnomeFemaleNames, "Studette");
    case "Goblin":
      return sex ? randomFromArray(goblinMaleNames, "Stud") : randomFromArray(goblinFemaleNames, "Studette");
    case "Half-Elf":
      return sex ? randomFromArray(halfelfMaleNames, "Stud") : randomFromArray(halfelfFemaleNames, "Studette");
    case "Half-Orc":
      return sex ? randomFromArray(halforcMaleNames, "Stud") : randomFromArray(halforcFemaleNames, "Studette");
    case "Halfing":
      return sex ? randomFromArray(halfingMaleNames, "Stud") : randomFromArray(halfingFemaleNames, "Studette");
    case "Leonin":
      return sex ? randomFromArray(leoninMaleNames, "Stud") : randomFromArray(leoninFemaleNames, "Studette");
    case "Bugbear":
      return sex ? randomFromArray(bugbearMaleNames, "Aghwech") : randomFromArray(bugbearFemaleNames, "Abgha");
    case "Lizardfolk":
      return sex ? randomFromArray(lizardfolkMaleNames, "Stud") : randomFromArray(lizardfolkFemaleNames, "Studette");
    case "Owlin":
      return sex ? randomFromArray(owlinMaleNames, "Stud") : randomFromArray(owlinFemaleNames, "Studette");
    case "Tabaxi":
      return sex ? randomFromArray(tabaxiMaleNames, "Stud") : randomFromArray(tabaxiFemaleNames, "Studette");
    case "Tiefling":
      return sex ? randomFromArray(tieflingMaleNames, "Stud") : randomFromArray(tieflingFemaleNames, "Studette");
    case "Tortle":
      return sex ? randomFromArray(tortleMaleNames, "Stud") : randomFromArray(tortleFemaleNames, "Studette");
    case "Satyr":
      return sex ? randomFromArray(satyrMaleNames, "Stud") : randomFromArray(satyrFemaleNames, "Studette");
    case "Goliath":
      return sex ? randomFromArray(goliathMaleNames, "Stud") : randomFromArray(goliathFemaleNames, "Studette");
    case "Harengon":
      return sex ? randomFromArray(harengonMaleNames, "Stud") : randomFromArray(harengonFemaleNames, "Studette");
    default:
      return "Terry";
  }
};