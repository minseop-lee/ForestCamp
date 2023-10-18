import React from 'react';
import styles from './Card.module.css';

const Card = (props) => {
    const eqdata = props.eqdata.slice(0, 9)
    console.log({ eqdata })
    return (
        <div className={styles.cardcontainer}>
            {eqdata.map((item, index) => (
                <div
                    key={index}
                    className={styles.card}
                >
                    <img
                        src={item.Information.titleImg}
                        alt='img'
                        className={`${styles.img} ${styles.center}`}
                    />
                    <p>{item.Information.title}</p>
                    <span >{item.Information.price}</span>
                </div>
            ))}
        </div>
    );
};

export default Card;