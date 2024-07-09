"use client";

import { useEffect, useState } from "react";
import { LeaderboardTotal } from "../types/leaderboardData.type";
import {
  difficultyToVersion,
  formatLeaderboardDates,
  formatTime,
} from "../utils";

interface LeaderboardContentsProps {
  data: LeaderboardTotal;
  difficulty: string;
}

export default function LeaderboardContents({
  data,
  difficulty,
}: LeaderboardContentsProps) {
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardTotal>(data);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    try {
      if (!websocket) {
        const leaderboardWebsocket = new WebSocket(
          process.env.NEXT_PUBLIC_API_GATEWAY_WSS_ENDPOINT!
        );
        setWebsocket(leaderboardWebsocket);
        leaderboardWebsocket.addEventListener(
          "message",
          async (newLeaderboardData) => {
            const parsedLeaderboardData: LeaderboardTotal = await JSON.parse(
              newLeaderboardData.data
            );
            const formattedLeaderboardData = formatLeaderboardDates(
              parsedLeaderboardData
            );
            setLeaderboardData(formattedLeaderboardData);
          }
        );
      }
    } catch (err) {
      console.error(
        "There was an error loading the game. Try refreshing the page!"
      );
    }
  }, []);

  return (
    <tbody data-testid="table-body">
      {leaderboardData &&
        leaderboardData[difficultyToVersion(difficulty)].map((entry, index) => {
          return (
            <tr key={index}>
              <td>#{index + 1}</td>
              <td>{entry.name}</td>
              <td>{formatTime(entry.score)}</td>
              <td>{entry.favoritePokemon}</td>
              <td>{entry.timeStamp}</td>
            </tr>
          );
        })}
    </tbody>
  );
}
