"use client";

import { MouseEvent } from "react";
import PokemonNameListProps from "./type";
import { pokemonListSprites } from "../../app/assets";

const PokemonNameList = ({
  gameData,
  handlePickedOption,
}: PokemonNameListProps) => {
  return (
    <ul className="name-list">
      {gameData.pokemonNames.map((pokemon) => {
        return (
          <li
            className="name-list-entry"
            onClick={(e: MouseEvent) => {
              if (handlePickedOption) {
                handlePickedOption(e, pokemon);
              }
            }}
            key={`List-${pokemon}`}
          >
            <img
              className="name-list-sprite"
              src={pokemonListSprites[pokemon]}
              alt={`The menu sprite of ${pokemon} from the Generation 3 and 4 Pokemon games.`}
            />
            <p className="name-list-name">{pokemon}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonNameList;
