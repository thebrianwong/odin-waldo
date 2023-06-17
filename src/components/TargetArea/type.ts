import ImageBorder from "../../types/imageBorder.type";
import Position from "../../types/position.type";
import { VersionData } from "../../types/pokemonData.type";

type TargetAreaProps = {
  imagePosition: Position;
  clickPosition: Position;
  imageBorder: ImageBorder;
  gameData: VersionData;
};

export default TargetAreaProps;
