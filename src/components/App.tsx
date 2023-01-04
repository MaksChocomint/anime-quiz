import React, { useEffect, useState } from "react";
import GameMode from "./GameMode/GameMode";
import Preview from "./Preview/Preview";
import Description from "./Description/Description";
import MenuButton from "./MenuButton/MenuButton";
import { animeInitial } from "../data/animeInitial";
import styles from "./App.module.css";
import axios from "axios";
import { scoreStyleAnimated } from "../data/scoreStyle";
import { scoreStyleInitial } from "../data/scoreStyle";
import { easyModeStyleInactive } from "../data/easyModeStyle";
import { easyModeStyleActive } from "../data/easyModeStyle";

function App() {
  const [gameMode, setGameMode] = useState(
    localStorage.getItem("gameMode") || ""
  );
  const [anime, setAnime] = useState(animeInitial);
  const [refresh, setRefresh] = useState(false);
  const [easyMode, setEasyMode] = useState(
    Boolean(JSON.parse(localStorage.getItem("easyMode") || "true"))
  );
  const [easyModeStyle, setEasyModeStyle] = useState(() => {
    if (easyMode) return easyModeStyleActive;
    else return easyModeStyleInactive;
  });
  const [score, setScore] = useState(
    Number(JSON.parse(localStorage.getItem("score") || "0"))
  );
  const [scoreStyle, setScoreStyle] = useState(scoreStyleInitial);

  useEffect(() => {
    localStorage.setItem("gameMode", gameMode);
  }, [gameMode]);

  useEffect(() => {
    if (score !== Number(JSON.parse(localStorage.getItem("score") || "0"))) {
      setScoreStyle(scoreStyleAnimated);
      setTimeout(() => {
        setScoreStyle(scoreStyleInitial);
      }, 500);
    }
    localStorage.setItem("score", score.toString());
  }, [score]);

  useEffect(() => {
    localStorage.setItem("easyMode", easyMode.toString());
    if (easyMode) {
      if (anime !== undefined) anime.synopsis = "Loading...";
      setEasyModeStyle(easyModeStyleActive);
      let id = Math.floor(Math.random() * 25);
      let page = Math.floor(1 + Math.random() * 19);
      const getAnime = () => {
        axios
          .get(
            `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${page}`
          )
          .then(function (response) {
            setAnime(response.data.data[id]);
          })
          .catch((error) => {
            console.error(error);

            setTimeout(() => setRefresh((refresh) => !refresh), 500);
          });
      };
      getAnime();
    } else {
      if (anime !== undefined) anime.synopsis = "Loading...";
      setEasyModeStyle(easyModeStyleInactive);
      let id = Math.floor(Math.random() * 48417);
      const getAnime = () => {
        axios
          .get(`https://api.jikan.moe/v4/anime/${id}`)
          .then(function (response) {
            setAnime(response.data.data);
          })
          .catch((error) => {
            console.error(error);

            setTimeout(() => setRefresh((refresh) => !refresh), 500);
          });
      };
      getAnime();
    }
  }, [refresh, easyMode]);

  useEffect(() => {
    if (anime === undefined || anime.synopsis === null) {
      setRefresh((refresh) => !refresh);
    }
  }, [anime]);
  console.log(anime);
  return (
    <div className={styles.app}>
      <div className={styles.nav}></div>
      {gameMode !== "" && <MenuButton setGameMode={setGameMode} />}
      <button
        style={easyModeStyle}
        className={styles.easyModeBtn}
        onClick={() => {
          setEasyMode((easyMode) => !easyMode);
        }}
      >
        {easyMode ? "EasyMode" : "HardMode"}
      </button>
      <div className={styles.score}>
        Score: {<div style={scoreStyle}>{score}</div>}
      </div>
      {gameMode === "" && <GameMode setGameMode={setGameMode} />}
      {gameMode === "preview" && (
        <Preview
          refresh={refresh}
          anime={anime}
          setRefresh={setRefresh}
          score={score}
          setScore={setScore}
        />
      )}
      {gameMode === "description" && (
        <Description
          refresh={refresh}
          anime={anime}
          setRefresh={setRefresh}
          score={score}
          setScore={setScore}
        />
      )}
    </div>
  );
}

export default App;
