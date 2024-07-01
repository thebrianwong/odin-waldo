type VersionValidationData = {
  [pokemonName: string]: {
    minimumX: number;
    maximumX: number;
    minimumY: number;
    maximumY: number;
  };
};

type TotalValidationData = {
  version1: VersionValidationData;
  version2: VersionValidationData;
  version3: VersionValidationData;
};

export type { VersionValidationData, TotalValidationData };
