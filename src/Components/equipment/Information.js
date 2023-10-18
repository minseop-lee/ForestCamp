import React from 'react';
import styles from './Information.module.css';

const Information = (props) => {
    const iconName = props.iconnamedata
    const iconImg = props.iconImgdata
    const price = props.pricedata
    const deliveryPcr = props.deliveryPcrdata
    const sellpagedata = props.sellpagedata


    let cnt_list = []
    for (let v = 0; v < iconName.length; v++) {
        cnt_list.push(v)
    }

    return (
        < div className={styles.wrapper} >
            <table className={styles.informationContainer}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <td>쇼핑몰</td>
                        <td>가격(배송비 포함)</td>
                        <td>배송요금</td>
                    </tr>
                    {cnt_list.map((index) => (
                        <tr>
                            <td className="iconall">
                                <a href={`https://www.enuri.com/${sellpagedata[index]}`} target="_blank" className={styles.linkStyle}>
                                    {iconImg[index] === "None" ? (<span className={styles.shoppingMallName}>
                                        {iconName[index]}
                                    </span>) : <img src={iconImg[index]} alt={iconName[index]} />}
                                </a>
                            </td>
                            <td className="prclist" >
                                <a href={`https://www.enuri.com/${sellpagedata[index]}`} target="_blank" className={styles.linkStyle}>
                                    <span>
                                        {price[index]}
                                    </span>
                                </a>
                            </td>
                            <td className="basong">
                                <div className={styles.linkStyle}>
                                    <a href={`https://www.enuri.com/${sellpagedata[index]}`} target="_blank" className={styles.linkStyle}>
                                        <span>
                                            {deliveryPcr[index]}
                                        </span>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default Information;
