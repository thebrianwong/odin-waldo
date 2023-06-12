import Position from "../../types/position.type";
import VersionData from "../../types/versionData.type";

type AnswerReactionProps = {
  isCorrect: boolean;
  imagePosition: Position;
  clickPosition: Position;
  gameData: VersionData;
};

export default AnswerReactionProps;
