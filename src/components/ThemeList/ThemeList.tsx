import React, { useEffect, useState } from "react";
import styles from "./ThemeList.module.css";

type Props = {
  setAppTheme: React.Dispatch<React.SetStateAction<string>>;
  setNavTheme: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeList = (props: Props) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("appTheme") || "gray"
  );

  useEffect(() => {
    if (theme === "gray") {
      setTheme(styles.theme_list_gray);
    }
    if (theme === "titan") {
      setTheme(styles.theme_list_titan);
    }
    if (theme === "slate") {
      setTheme(styles.theme_list_slate);
    }
    if (theme === "dark") {
      setTheme(styles.theme_list_dark);
    }
  }, [theme]);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.setAppTheme(e.target.value);
    props.setNavTheme(e.target.value);
    setTheme(e.target.value);
    localStorage.setItem("appTheme", e.target.value);
    localStorage.setItem("navTheme", e.target.value);
  };

  return (
    <select className={theme} onChange={handleChange}>
      {localStorage.getItem("appTheme") === "gray" && (
        <option value="gray" selected>
          Gray
        </option>
      )}

      {localStorage.getItem("appTheme") !== "gray" && (
        <option value="gray">Gray</option>
      )}

      {localStorage.getItem("appTheme") === "titan" && (
        <option value="titan" selected>
          Titan
        </option>
      )}

      {localStorage.getItem("appTheme") !== "titan" && (
        <option value="titan">Titan</option>
      )}

      {localStorage.getItem("appTheme") === "slate" && (
        <option value="slate" selected>
          Slate
        </option>
      )}

      {localStorage.getItem("appTheme") !== "slate" && (
        <option value="slate">Slate</option>
      )}

      {localStorage.getItem("appTheme") === "dark" && (
        <option value="dark" selected>
          Dark
        </option>
      )}

      {localStorage.getItem("appTheme") !== "dark" && (
        <option value="dark">Dark</option>
      )}
    </select>
  );
};

export default ThemeList;
