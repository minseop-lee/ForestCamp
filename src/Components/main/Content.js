import React from 'react';
import styles from './Content.module.css';
import Place from './Place';
import Equipment from './Equipment';
import Banners from '../public/Banners';

const Content = (props) => {

    return (
        <div className={styles.contentwrap}>
            <Banners />
            <Place />
            <Equipment />
            <div className={styles.blank}></div>
        </div>
    );
};

export default Content;
