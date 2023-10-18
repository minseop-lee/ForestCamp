import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import styles from "./Place.module.css";
import axios from "axios";
import Slider from "react-slick";

const Place = (props) => {
  // const placedt = props.placedt
  const [place, setPlace] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const ids = Array.from({ length: 15 }, (_, index) => 1001 + index);
      const requests = ids.map((id) =>
        axios.get(`http://13.209.180.103:3000/camp/card/${id}`)
      );

      try {
        const responses = await Promise.all(requests);
        const responseData = responses.map((responses) => responses.data);
        setPlace(responseData);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //     const timer = setInterval(() => {
  //         setCurrentSlide((prevSlide) => (prevSlide + 1) % place.length);
  //     }, 5000);

  //     return () => {
  //         clearInterval(timer);
  //     };
  // }, [place.length]);

  const handleOnSlideChange = (event) => {
    setCurrentSlide(event.item);
  };

  const settings = {
    // dots: true,
    // buttonsDisabled: false, // 수정됨
    infinite: true,
    // autoPlay: false, // 수정됨
    // autoPlayInterval: 1500,
    // mouseTrackingEnabled: true,
    responsive: {
      // 반응형 옵션 설정
      0: { items: 3 },
    },
    // animationType : "fadeout",
    onInitialized: handleOnSlideChange,
    onSlideChanged: handleOnSlideChange,
  };


  return (
    <div className={styles.place}>
      <h2 className={styles.txt_b}>
        🔥이번 시즌 가장 핫한 캠핑장!{" "}
        <span className={styles.txt_s}>
          캠퍼님들이 가장 많이 찾은 캠핑장이에요!
        </span>{" "}
      </h2>

      <span></span>
      <AliceCarousel {...settings}>
        {place &&
          place.map((item, index) => {
            return (
              <Link
                className={styles.a}
                to={`/camping/${index + 1001}`}
                key={`campAnchor${index}`}
              >
                <div key={index} className={styles.slide}>
                  <img
                    src={item.data.img_url}
                    alt="img"
                    className={styles.img}
                  />
                  <p className={styles.eqname}>{item.data.name}</p>
                  <p className={styles.txt_s}>더보기</p>
                </div>
              </Link>
            );
          })}
      </AliceCarousel>
    </div>
  );
};

export default Place;
