import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import styles from './Equipment.module.css';
import axios from "axios";

const Equipment = (props) => {
    // const equipment = props.equation;
    const [equipment, setEquipment] = useState();
    const [currentSlide, setCurrentSlide] = useState(0);
    // const itemCount = equipment.length;
    useEffect(() => {
        const fetchData = async () => {
            const ids = Array.from({ length: 30 }, (_, index) => 1010001 + index);
            const requests = ids.map((id) =>
                axios.get(`http://3.37.199.29:3000/Campingstore/card?id=${id}`)
            );

            try {
                const responses = await Promise.all(requests);
                const responseData = responses.map((response) => response.data);
                setEquipment(responseData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
            return
        };

        fetchData();
    }, []);

    // console.log()
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCurrentSlide((prevSlide) => (prevSlide + 1) % equipment.length);
    //     }, 5000);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, [equipment.length]);


    const handleOnSlideChange = (event) => {
        setCurrentSlide(event.item);
    };

    const settings = {
        dots: true,
        buttonsDisabled: false,// 수정됨
        infinite: true,
        autoPlay: false,// 수정됨
        autoPlayInterval: 1500,
        mouseTrackingEnabled: true,
        responsive: {
            // 반응형 옵션 설정
            0: { items: 3 },

        },
        onInitialized: handleOnSlideChange,
        onSlideChanged: handleOnSlideChange,

    };


    return (
        <div className={styles.equipment}>
            <h3 className={styles.txt_b}>
                🌟요즘 캠핑장비 <span className={styles.txt_s}>캠퍼님들의 캠핑 생활을 더욱  풍족하게 해줄 장비는 뭐가 있을까요?</span>
            </h3>
            <AliceCarousel {...settings}>
                {equipment && equipment.map((item, index) => (
                    <Link className={styles.a} to={`/equipment/${item.Information.id}`} key={`productAnchor${item.Information.id}`}>
                        <div key={index} className={styles.slide}>
                            <img src={item.Information.titleImg} alt="img" className={styles.img} />
                            <p className={styles.eqname}>{item.Information.title}</p>
                            <p className={styles.price}>{item.Information.price}부터</p>
                        </div>
                    </Link>
                ))}
            </AliceCarousel>
        </div>
    );
};

export default Equipment;
