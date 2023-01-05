import React, { useEffect, useState } from "react";
import SkipButton from "../SkipButton/SkipButton";
import styles from "./Description.module.css";
import loadingStyles from "./Loading.module.css";

type Props = {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  anime: {
    synopsis: string;
    title: string;
    title_english: string;
    popularity: number;
  };
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

const Description = (props: Props) => {
  const [titleStyle, setTitleStyle] = useState(styles.title);
  const [scoreValue, setScoreValue] = useState(0);
  const [answer, setAnswer] = useState("");
  const [title, setTitle] = useState("???");
  const [descriptionFontSize, setDescriptionFontSize] = useState(
    styles.description_text_default
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnswer(e.target.value);
  };

  useEffect(() => {
    if (props.anime !== undefined) {
      if (props.anime.popularity <= 100) setScoreValue(5);
      else if (props.anime.popularity <= 200) setScoreValue(10);
      else if (props.anime.popularity <= 300) setScoreValue(20);
      else if (props.anime.popularity <= 400) setScoreValue(40);
      else if (props.anime.popularity <= 500) setScoreValue(50);
      else setScoreValue(75);

      if (props.anime.synopsis !== null) {
        if (props.anime.synopsis.length < 1100)
          setDescriptionFontSize(styles.description_text_default);
        else if (props.anime.synopsis.length < 1200)
          setDescriptionFontSize(styles.description_text_smaller);
        else if (props.anime.synopsis.length < 1350)
          setDescriptionFontSize(styles.description_text_small);
        else setDescriptionFontSize(styles.description_text_smallest);
      }
    }
  }, [props.anime]);
  const answerCheck = (
    answer: string,
    title: string,
    titleEn: string
  ): boolean => {
    if (answer.length !== 0) {
      const answerArray: string[] = answer.toLowerCase().split(" ");
      let counter: number = 0;
      if (titleEn !== null) {
        if (
          (title.toLowerCase().includes(answer.toLowerCase()) ||
            titleEn.toLowerCase().includes(answer.toLowerCase())) &&
          (answer.length / title.length >= 1 / 3 ||
            answer.length / titleEn.length >= 1 / 3)
        )
          return true;
        else {
          for (let i = 0; i < answerArray.length; i++) {
            if (
              title.toLowerCase().includes(answerArray[i].toLowerCase()) ||
              titleEn.toLowerCase().includes(answerArray[i].toLowerCase())
            ) {
              counter++;
            } else {
              counter--;
            }
          }
          if (counter >= 2) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        if (
          title.toLowerCase().includes(answer.toLowerCase()) &&
          answer.length / title.length >= 1 / 3
        )
          return true;
        else {
          for (let i = 0; i < answerArray.length; i++) {
            if (title.toLowerCase().includes(answerArray[i].toLowerCase())) {
              counter++;
            } else {
              counter--;
            }
          }
          if (counter >= 2) {
            return true;
          } else {
            return false;
          }
        }
      }
    } else {
      return false;
    }
  };
  const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      if (answerCheck(answer, props.anime.title, props.anime.title_english)) {
        setTitle(props.anime.title);
        setTitleStyle(styles.title_correct);
        setTimeout(() => {
          props.setScore((score) => score + scoreValue);
          props.anime.synopsis = "Loading...";
          props.setRefresh((refresh) => !refresh);
          setAnswer("");
        }, 2000);
      } else {
        setTitle("WRONG!!!");
        setTitleStyle(styles.title_wrong);
        setAnswer("");
        setTimeout(() => {
          setTitleStyle(styles.title);
          setTitle("???");
        }, 1000);
      }
    }
  };
  return (
    <div className={styles.description}>
      {props.anime === undefined && (
        <h1 className={styles.error_text}>
          Could not get a response from the server.{" "}
          <a className={styles.refresh_page} href="/">
            Please refresh the page.
          </a>
        </h1>
      )}
      {props.anime !== undefined &&
        props.anime.synopsis !== "Loading..." &&
        props.anime.synopsis !== null && (
          <>
            <div className={styles.question}>
              <h1 className={titleStyle}>{title}</h1>
              <p className={descriptionFontSize}>{props.anime.synopsis}</p>
            </div>
            <div className={styles.playerActivities}>
              <input
                className={styles.answer}
                name="answer"
                placeholder="Your answer:"
                value={answer}
                onChange={handleChange}
                onKeyDown={handleEnterClick}
              ></input>
              <SkipButton
                styleTitle={styles.title}
                styleTitleWrong={styles.title_wrong}
                styleTitleCorrect={styles.title_correct}
                setTitleStyle={setTitleStyle}
                setRefresh={props.setRefresh}
                setAnswer={setAnswer}
                setTitle={setTitle}
                anime={props.anime}
              />
            </div>
          </>
        )}
      {props.anime !== undefined &&
        (props.anime.synopsis === "Loading..." ||
          props.anime.synopsis === null) && (
          <div className={loadingStyles.ellipse}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
    </div>
  );
};

export default Description;
