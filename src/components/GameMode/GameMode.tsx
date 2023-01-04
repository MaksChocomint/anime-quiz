import React, { useEffect, useState } from "react";
import styles from "./GameMode.module.css";
import { previewImages } from "../../data/previewImages";
import { descriptionImages } from "../../data/descriptionImages";

type Props = {
  setGameMode: React.Dispatch<React.SetStateAction<string>>;
};
const GameMode: React.FC<Props> = (props: Props) => {
  const [previewImg, setPreviewImg] = useState("");
  const [descriptionImg, setDescriptionImg] = useState("");
  useEffect(() => {
    const currentPreviewImg: string =
      previewImages[Math.round(Math.random() * (previewImages.length - 1))].src;
    const previewUrl: string = `url("${currentPreviewImg}")`;
    setPreviewImg(previewUrl);

    const currentDescriptionImg: string =
      descriptionImages[
        Math.round(Math.random() * (descriptionImages.length - 1))
      ].src;
    const descriptionUrl: string = `url("${currentDescriptionImg}")`;
    setDescriptionImg(descriptionUrl);
  }, []);

  const previewStyle: {
    backgroundImage: string;
    backgroundRepeat: string;
    backgroundPosition: string;
    backgroundSize: string;
    zIndex: string;
  } = {
    backgroundImage: `${previewImg}`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    zIndex: "1",
  };

  const descriptionStyle: {
    backgroundImage: string;
    backgroundRepeat: string;
    backgroundPosition: string;
    backgroundSize: string;
    zIndex: string;
  } = {
    backgroundImage: `${descriptionImg}`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    zIndex: "1",
  };

  return (
    <div>
      <div className={styles.game_mod}>
        <div
          className={styles.game_preview}
          style={previewStyle}
          onClick={() => props.setGameMode("preview")}
        >
          <div className={styles.black_filter}></div>
          <h2 className={styles.game_title}>Preview</h2>
        </div>
        <div
          className={styles.game_description}
          style={descriptionStyle}
          onClick={() => props.setGameMode("description")}
        >
          <div className={styles.black_filter}></div>
          <h2 className={styles.game_title}>Description</h2>
        </div>
      </div>
    </div>
  );
};

export default GameMode;
