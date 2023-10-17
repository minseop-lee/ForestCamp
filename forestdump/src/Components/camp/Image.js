import React from "react"
import styles from './style/Image.module.css'
const Img = (props) => {
    return (
        <div className={styles.img_wrapper}>
            <img className={styles.size} src={props.imgSrc} alt='img입니다' />
        </div>
    );
}

export default Img