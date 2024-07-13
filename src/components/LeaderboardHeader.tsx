"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { validateDifficulty } from "../utils";

export default function LeaderboardHeader() {
  const router = useRouter();
  const params = useSearchParams();
  const gameVersion = params?.get("gameVersion");

  const difficultyLabel = validateDifficulty(gameVersion);

  const changeSearchParams = (newValue: string) => {
    const params = new URLSearchParams();
    params.set("gameVersion", newValue);
    router.push(`/leaderboard?${params.toString()}`);
  };

  return (
    <div className="leaderboard-difficulty-container">
      <h1>{difficultyLabel}</h1>
      <label
        className="leaderboard-difficulty-select-label"
        htmlFor="difficulty"
      >
        Change difficulty: {""}
        <select
          className="leaderboard-difficulty-select"
          data-testid="select-menu"
          onChange={(e: ChangeEvent) => {
            changeSearchParams((e.target as HTMLOptionElement).value);
          }}
          name="difficulty"
          id="difficulty"
          value={gameVersion || "normal"}
        >
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
          <option value="weird">Weird</option>
        </select>
      </label>
    </div>
  );
}
