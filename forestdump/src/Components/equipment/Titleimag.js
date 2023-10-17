import React from 'react';
import styles from './Titleimag.module.css';

const Titleimag = (props) => {
    const imgSrc = props.imgdata


    return (
        <div className={styles.wrapper} >
            <div className={styles.imageContainer}>
                <span>
                    <img src={imgSrc} alt="캠핑장비" className={styles.img}></img>
                </span>
            </div>
        </div>

    );
};

export default Titleimag;

