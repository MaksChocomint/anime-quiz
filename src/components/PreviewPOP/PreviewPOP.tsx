import React from "react";
import styles from "./PreviewPOP.module.css";

type Props = {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  anime: {
    synopsis: string;
  };
  setPreviewPOPMode: React.Dispatch<React.SetStateAction<boolean>>;
  previewPOPMode: boolean;
};

const PreviewPOP = (props: Props) => {
  const POPModeSet = () => {
    props.setPreviewPOPMode((previewPOPMode) => !previewPOPMode);
    props.anime.synopsis = "Loading...";
    props.setRefresh((refresh) => !refresh);
  };

  return (
    <div>
      {props.previewPOPMode && (
        <button className={styles.preview_popmode_on} onClick={POPModeSet}>
          Chunk
        </button>
      )}

      {!props.previewPOPMode && (
        <button className={styles.preview_popmode_off} onClick={POPModeSet}>
          Chunk
        </button>
      )}
    </div>
  );
};

export default PreviewPOP;
