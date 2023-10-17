import React from 'react';
import styles from './NotOpenCalendar.module.css';

const RenderHeader = ({ month, year }) => {

    return (
        <div className={styles.head}>
            <h1 className={styles.head_title}>
                {month}월
            </h1>
            <p className={styles.head_subtitle}>
                {year}
            </p>
        </div>
    )
}

export default function NotOpenCalendar({ date }) {

    const reserveDate = new Date(date)

    return (
        <div>
            <RenderHeader month={reserveDate.getMonth() + 2} year={reserveDate.getFullYear()} />
            <div className={styles.h1_div}>
                <h1 >NOT OPEN</h1>
            </div>
        </div>
    )
}

