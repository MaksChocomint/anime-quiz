import React, { useEffect, useState } from "react";
import styles from "./Preview.module.css";
import loadingStyles from "./Loading.module.css";
import SkipButton from "../SkipButton/SkipButton";
import PreviewPOP from "../PreviewPOP/PreviewPOP";

type Props = {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  anime: {
    images: {
      webp: {
        large_image_url: string;
      };
    };
    synopsis: string;
    title: string;
    title_english: string;
    popularity: number;
  };
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

const Preview = (props: Props) => {
  const [titleStyle, setTitleStyle] = useState(styles.title);
  const [previewPOPMode, setPreviewPOPMode] = useState(false);
  const [previewShow, setPreviewShow] = useState(false);
  const [scoreValue, setScoreValue] = useState(0);
  const [title, setTitle] = useState("???");
  const [answer, setAnswer] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnswer(e.target.value);
  };
  useEffect(() => {
    if (props.anime !== undefined) {
      if (previewPOPMode) {
        if (props.anime.popularity <= 100) {
          setScoreValue(15);
        } else if (props.anime.popularity <= 200) {
          setScoreValue(30);
        } else if (props.anime.popularity <= 300) {
          setScoreValue(60);
        } else if (props.anime.popularity <= 400) {
          setScoreValue(120);
        } else if (props.anime.popularity <= 500) {
          setScoreValue(150);
        } else {
          setScoreValue(225);
        }
      } else {
        if (props.anime.popularity <= 100) {
          setScoreValue(5);
        } else if (props.anime.popularity <= 200) {
          setScoreValue(10);
        } else if (props.anime.popularity <= 300) {
          setScoreValue(20);
        } else if (props.anime.popularity <= 400) {
          setScoreValue(40);
        } else if (props.anime.popularity <= 500) {
          setScoreValue(50);
        } else {
          setScoreValue(75);
        }
      }
    }
  }, [props.anime, previewPOPMode]);
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
        setPreviewShow(true);
        setTimeout(() => {
          props.setScore((score) => score + scoreValue);
          props.anime.synopsis = "Loading...";
          setPreviewShow(false);
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
    <div className={styles.preview}>
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
              {previewPOPMode && !previewShow && (
                <div className={styles.preview_img_main_object}>
                  <div className={styles.preview_img_object}>
                    <img
                      className={styles.preview_img_popmode}
                      src={`${props.anime.images.webp.large_image_url}`}
                      alt="anime"
                    />
                  </div>
                </div>
              )}
              {(!previewPOPMode || previewShow) && (
                <img
                  className={styles.preview_img}
                  src={`${props.anime.images.webp.large_image_url}`}
                  alt="anime"
                />
              )}
            </div>
            <div className={styles.playerActivities}>
              <PreviewPOP
                setRefresh={props.setRefresh}
                anime={props.anime}
                setPreviewPOPMode={setPreviewPOPMode}
                previewPOPMode={previewPOPMode}
              />
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
                setPreviewShow={setPreviewShow}
                setTitle={setTitle}
                anime={props.anime}
                setAnswer={setAnswer}
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

export default Preview;
