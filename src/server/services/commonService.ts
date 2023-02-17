import {
  dwarfFemaleNames, dwarfMaleNames, elfFemaleNames, elfMaleNames,
  humanFemaleNames, humanMaleNames, minotaurFemaleNames, minotaurMaleNames,
  orcFemaleNames, orcMaleNames, warforgedNames
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
    default:
      return "Terry";
  }
};