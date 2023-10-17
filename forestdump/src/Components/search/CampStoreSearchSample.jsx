import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CampStoreSearchSample.module.css";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { Propane } from "@mui/icons-material";
export default function CampStoreSearchSample(props) {
  console.log(props.data);
  const [searchData, setSearchData] = useState(false);
  const fetchMyPage = async () => {
    try {
      if (props.data !== null) {
        setSearchData(props.data);
        return;
      }
      const response = await axios.get(
        `http://awsforestcamp.kro.kr:3000/campstore/search_favor`
      );
      const { rows } = response.data;
      console.log(rows);
      const requests = rows
        .slice(0, 5)
        .map((row) =>
          axios.get(
            `http://3.37.199.29:3000/Campingstore/card?id=${row.equipmentnum}`
          )
        );
      const responses = await Promise.all(requests);
      const responseData = responses.map(
        (response) => response.data.Information
      );
      setSearchData(responseData);
    } catch (error) {
      console.error("An error occurred:", error);
      // 에러 핸들링
    }
    // 상태 업데이트
  };

  const handleOnSlideChange = (event) => {
    // setCurrentSlide(event.item);
  };
  const settings = {
    dots: true,
    buttonsDisabled: false, // 수정됨
    infinite: true,
    autoPlay: false, // 수정됨
    autoPlayInterval: 1500,
    mouseTrackingEnabled: true,
    responsive: {
      // 반응형 옵션 설정
      0: { items: 3 },
    },
    onInitialized: handleOnSlideChange,
    onSlideChanged: handleOnSlideChange,
  };
  useEffect(() => {
    fetchMyPage();
  }, [props.data]);

  console.log();
  return (
    <div className={styles.equipment}>
      {searchData && searchData.length > 0 ? (
        <AliceCarousel {...settings}>
          {searchData.map((item, index) => (
            <Link
              className={styles.a}
              to={`/equipment/${item.id}`}
              key={`productAnchor${item.id}`}
            >
              <div key={index} className={styles.slide}>
                <img src={item.titleImg} alt="img" className={styles.img} />
                <p className={styles.eqname}>{item.title}</p>
                <p className={styles.price}>{item.price}부터</p>
              </div>
            </Link>
          ))}
        </AliceCarousel>
      ) : (
        <div className={styles.noResult}>검색 결과가 없습니다.</div>
      )}
    </div>
  );
}
