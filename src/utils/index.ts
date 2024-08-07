import { LeaderboardTotal } from "src/types/leaderboardData.type";

export const validateDifficulty = (difficulty: string | undefined | null) => {
  if (difficulty === "hard") {
    return "Hard";
  } else if (difficulty === "weird") {
    return "Weird";
  } else {
    return "Normal";
  }
};

export const difficultyToVersion = (difficulty: string | undefined | null) => {
  if (difficulty === "hard") {
    return "version2";
  } else if (difficulty === "weird") {
    return "version3";
  } else {
    return "version1";
  }
};

export const formatTime = (timeInMilliseconds: number) => {
  const timeInSeconds = Math.round(timeInMilliseconds / 1000);
  if (timeInSeconds < 60) {
    if (timeInSeconds < 10) {
      return `00:0${timeInSeconds}`;
    }
    return `00:${timeInSeconds}`;
  } else {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    if (minutes < 10) {
      if (seconds < 10) {
        return `0${minutes}:0${seconds}`;
      }
      return `0${minutes}:${seconds}`;
    } else {
      if (seconds < 10) {
        return `${minutes}:0${seconds}`;
      }
      return `${minutes}:${seconds}`;
    }
  }
};

export const formatLeaderboardDates = (data: LeaderboardTotal) => {
  const formattedData = { ...data };
  const versions = Object.keys(formattedData);
  versions.forEach((version) => {
    const versionEntries = formattedData[version];
    versionEntries.forEach((entry) => {
      const utcTime = new Date(entry.timeStamp).toUTCString();
      const timeWithoutTimezone = utcTime.substring(0, 16);
      entry.timeStamp = timeWithoutTimezone;
    });
  });
  return formattedData;
};
