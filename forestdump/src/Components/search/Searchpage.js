import React from "react";
import styles from "./Searchpage.module.css";
import SearchForm from "./SearchForm";

const Searchpage = (props) => {
  return (
    <div className={styles.wrap}>
      <SearchForm />
    </div>
  );
};

export default Searchpage;
