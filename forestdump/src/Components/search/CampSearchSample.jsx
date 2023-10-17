import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CampSearchSample.module.css";
import { Link } from "react-router-dom";

function stateComponent(state) {
  if (state === "접수중") {
    return (
      <span className={`${styles.accepting} ${styles.state}`}>{state}</span>
    );
  } else if (state === "안내중") {
    return <span className={`${styles.guiding} ${styles.state}`}>{state}</span>;
  } else {
    return (
      <span className={`${styles.deadline} ${styles.state}`}>{state}</span>
    );
  }
}

export default function CampStoreSearchSample(props) {
  const [searchData, setSearchData] = useState(false);
  console.log(props.data);

  const fetchMyPage = async () => {
    try {
      if (props.data !== null) {
        setSearchData(props.data);
        return;
      }
      const response = await axios.get(
        `http://awsforestcamp.kro.kr:3000/camp/search_favor`
      );
      const { rows } = response.data;
      console.log(rows);
      const requests = rows
        .slice(0, 5)
        .map((row) =>
          axios.get(`http://13.209.180.103:3000/camp/search/${row.campnum}`)
        );
      const responses = await Promise.all(requests);
      // const responses = [await axios.get(`http://13.209.180.103:3000/camp/search/1002`)]
      // console.log(responses)
      const responseData = responses.map((response) => response.data.data);
      setSearchData(responseData);
    } catch (error) {
      console.error("An error occurred:", error);
      // 에러 핸들링
    }
    // 상태 업데이트
  };
  useEffect(() => {
    fetchMyPage();
  }, [props.data]);

  console.log(searchData && searchData[0]);
  return (
    <div className={styles.camp}>
      {searchData && searchData.length > 0 ? (
        searchData.map((item) => (
          <Link
            className={`${styles.a} ${styles.container}`}
            to={`/camping/${item.id}`}
            key={`campAnchor${item.id}`}
          >
            <img
              src={item.img_url}
              alt="img"
              className={`${styles.img} ${styles.item}`}
            />
            <div className={styles.item}>
              <h3>
                {item.name} {stateComponent(item.state)}
              </h3>
              <p>접수 기간 : {item.receipt_term.join(" ~ ")}</p>
              <p>사용 기간 : {item.use_term.join(" ~ ")}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className={styles.noResult}>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
