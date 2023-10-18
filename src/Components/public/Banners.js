import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import Skeleton from 'react-loading-skeleton';
import banner1 from '../../images/banner1.png';
import banner2 from '../../images/banner2.png';
import banner3 from '../../images/banner3.png';
import styles from './Banners.module.css';

const Banners = () => {
    const items = [
        { id: 1, url: banner1 },
        { id: 2, url: banner2 },
        { id: 3, url: banner3 },
    ];

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Carousel
                    autoPlay={true}
                    animation="slide"
                    indicators={true}
                    timeout={5000}
                    className={styles.carousel}
                >
                    {items.map((item) => (
                        <div key={item.id} className={styles.imgContainer}>
                            {loading ? (
                                <Skeleton height={'100%'} width={'100%'} />
                            ) : (
                                <img
                                    src={item.url}
                                    alt={`Banner ${item.id}`}
                                    className={styles.img}
                                />
                            )}
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Banners;
