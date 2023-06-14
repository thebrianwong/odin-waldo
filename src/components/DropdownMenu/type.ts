import Position from "../../types/position.type";
import ImageBorder from "../../types/imageBorder.type";
import { VersionData } from "../../types/pokemonData.type";
import { MouseEvent } from "react";

type DropdownMenuProps = {
  imagePosition: Position;
  clickPosition: Position;
  clientPosition: Position;
  imageBorder: ImageBorder;
  gameData: VersionData;
  handlePickedOption: (e: MouseEvent, pickedPokemon: string) => void;
};

export default DropdownMenuProps;
