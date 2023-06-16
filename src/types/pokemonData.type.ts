type VersionData = {
  pokemonNames: Array<string>;
  imageDimensions: { width: number; height: number };
};

type GameData = {
  [version: string]: VersionData;
};

export { VersionData, GameData };
