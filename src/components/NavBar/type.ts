import VersionData from "../../types/versionData.type";

type NavBarProps = {
  gameData: VersionData;
  gameProgress: { [pokemonName: string]: boolean };
  elapsedTime: string;
};

export default NavBarProps;
