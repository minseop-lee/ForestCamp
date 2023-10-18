import React from "react";
import styles from "./SearchForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import CampStoreSearchSample from "./CampStoreSearchSample";
import CampSearchSample from "./CampSearchSample";

const SearchForm = () => {
  const [search, setSearch] = useState("");
  const [fastsearch, setFastsearch] = useState(null);
  const [fastsearch2, setFastsearch2] = useState(null);
  // console.log(search);
  console.log(fastsearch);
  console.log(fastsearch2);

  const onSearch = async (e) => {
    e.preventDefault();

    if (search !== null || search !== "") {
      // console.log(search);
      const response = await axios.get(
        `http://3.37.199.29:3000/Campingstore/search?id=${search}`
      );
      const response2 = await axios.get(
        `http://13.209.180.103:3000/camp/name/${search}`
      );
      const rows = response.data;
      const rows2 = response2.data;
      // console.log(rows);
      setFastsearch(rows.data.slice(0, 5));
      setFastsearch2(rows2.data.slice(0, 5));
    } else {
      console.log("?");
    }
  };

  const handleOnKeyPress = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    // if(e.key === 'Enter'){
    //     console.log('press Enter')
    // }
    //     const response = await axios.get(
    //     `http://3.37.199.29:3000/campstore/equipmentfavord`,
    //   );
    //     const { rows } = response.data;
    //     console.log(rows)
  };

  return (
    <div>
      <form className={styles.search} onSubmit={(e) => onSearch(e)}>
        <input
          type="text"
          placeholder="검색할 키워드를 입력해주세요"
          value={search}
          className={styles.search_bar}
          onChange={handleOnKeyPress}
        />
        <button className={styles.enterbtn} type="submit">
          <FontAwesomeIcon
            className={styles.icon_spacing}
            icon={faMagnifyingGlass}
          />
        </button>
      </form>
      <div>
        <h2 className={styles.h2}>캠핑장</h2>
        <hr />
        <CampSearchSample data={fastsearch2} />
      </div>
      <div>
        <h2 className={styles.h2}>캠핑용품</h2>
        <hr />
        <CampStoreSearchSample data={fastsearch} />
      </div>
    </div>
  );
};

export default SearchForm;
