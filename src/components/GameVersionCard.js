import { gameData } from "../gameData";

const GameVersionCard = ({ gameVersion }) => {
  const versionData = gameData[gameVersion];
  return (
    <button>
      <img />
      <ul>
        {versionData.map((data) => {
          return (
            <li key={`${gameVersion} ${data}`}>
              <img />
              <p>{data}</p>
            </li>
          );
        })}
      </ul>
    </button>
  );
};

export default GameVersionCard;
