import Position from "../../types/position.type";
import { VersionData } from "../../types/pokemonData.type";

type AnswerReactionProps = {
  isCorrect: boolean;
  imagePosition: Position;
  clickPosition: Position;
  gameData: VersionData;
};

export default AnswerReactionProps;
