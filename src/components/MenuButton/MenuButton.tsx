import React from "react";
import styles from "./MenuButton.module.css";
import { BiHome } from "react-icons/bi";

type Props = {
  setGameMode: React.Dispatch<React.SetStateAction<string>>;
};

const MenuButton = (props: Props) => {
  return (
    <BiHome className={styles.home} onClick={() => props.setGameMode("")} />
  );
};

export default MenuButton;
