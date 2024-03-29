import React, { useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import styles from "./SkipButton.module.css";

type Props = {
  styleTitle: any;
  styleTitleWrong: any;
  styleTitleCorrect: any;
  setPreviewShow?: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleStyle: React.Dispatch<React.SetStateAction<any>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  anime: { title: string; synopsis: string };
};

const SkipButton = (props: Props) => {
  useEffect(() => {
    props.setTitle("???");
    props.setTitleStyle(props.styleTitle);
  }, [props.anime]);
  return (
    <div
      className={styles.skip_button}
      onClick={() => {
        props.setAnswer("");
        props.setTitle(props.anime.title);
        if (props.setPreviewShow !== undefined) {
          props.setPreviewShow(true);
        }
        props.setTitleStyle(props.styleTitleWrong);
        setTimeout(() => {
          if (props.setPreviewShow !== undefined) {
            props.setPreviewShow(false);
          }
          props.anime.synopsis = "Loading...";
          props.setRefresh((refresh) => !refresh);
        }, 2000);
      }}
    >
      <span>Skip</span>
      <FaLongArrowAltRight className={styles.skip_arrow} />
    </div>
  );
};

export default SkipButton;
