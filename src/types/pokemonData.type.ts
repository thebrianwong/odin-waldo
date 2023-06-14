type VersionData = {
  pokemonNames: Array<string>;
  imageDimensions: { width: number; height: number };
};

type GameData = {
  version1: VersionData;
  version2: VersionData;
  version3: VersionData;
};

export { VersionData, GameData };
