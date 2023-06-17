import { MouseEvent } from "react";
import { VersionData } from "../../types/pokemonData.type";

type PokemonNameListProps = {
  gameData: VersionData;
  handlePickedOption?: (e: MouseEvent, pickedPokemon: string) => void;
};

export default PokemonNameListProps;
