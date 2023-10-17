// import './App.css';
import React, { useEffect, useState } from 'react';
import Titleimag from './Titleimag'
import Titlename from './Titlename'
import Information from './Information';
import Trend from './Trend';
import Verticalline from './Verticalline';
import styles from './App.module.css';
import Balance from './Balance';
import { useParams } from 'react-router-dom';

function CampingSupplies() {
    const [imgSrc, setImgSrc] = useState([])
    const [imgid, setImgid] = useState([])
    const [titlec, setTitle] = useState([])
    const [account, setAccount] = useState([])
    const [iconName, setIconName] = useState([])
    const [iconImg, setIconImg] = useState([])
    const [price, setPrice] = useState([])
    const [deliveryPcr, setDeliveryPcr] = useState([])
    const [sellpage, setSellpage] = useState([])
    const [recentPrc, setRecentPrc] = useState([])
    const [fluctuation, setFluctuation] = useState([])
    const [trend, setTrend] = useState([])
    var { id } = useParams();

    // if (parseInt(id) < 10) {
    //     id = `000${id}`
    // }
    // else if (parseInt(id) < 100) {
    //     id = `00${id}`
    // } else {
    //     id = `0${id}`
    // }
    // console.log(id)

    useEffect(() => {
        fetch(`http://3.37.199.29:3000/Campingstore/imgPrint?id=${id}`, {
            headers: {
                Accept: "application/json"
            },
            method: "GET"
        }).then(res => res.json())
            .then(res => {
                console.log(1, res.ok);
                setImgSrc(res.titleImg);
                setImgid(res.id);
            })
    }, []);

    useEffect(() => {
        fetch(`http://3.37.199.29:3000/Campingstore/explanation?id=${id}`, {
            headers: {
                Accept: "application/json"
            },
            method: "GET"
        }).then(res => res.json())
            .then(res => {
                // console.log(1, res.ok);
                setTitle(res.Information.title);
                setAccount(res.Information.account)

            })
    }, []);

    useEffect(() => {
        fetch(`http://3.37.199.29:3000/Campingstore/fluctuation?id=${id}`, {
            headers: {
                Accept: "application/json"
            },
            method: "GET"
        }).then(res => res.json())
            .then(res => {
                // console.log(1, res.ok);
                setRecentPrc(res.Information.recentPrc);
                setFluctuation(res.Information.fluctuation)

            })
    }, []);

    useEffect(() => {
        fetch(`http://3.37.199.29:3000/Campingstore/information?id=${id}`, {
            headers: {
                Accept: "application/json",
            },
            method: "GET"
        }).then(res => res.json())
            .then(res => {
                // console.log(1, res.ok);
                setIconName(res.Information.iconName[0])
                setIconImg(res.Information.iconImg[0])
                setPrice(res.Information.price[0])
                setDeliveryPcr(res.Information.deliveryPcr[0])
                setSellpage(res.Information.sellpage[0])
            })
    }, []);

    useEffect(() => {
        fetch(`http://3.37.199.29:3000/Campingstore/trend2?id=${id}`, {
            headers: {
                Accept: "application/json",
            },
            method: "GET"
        }).then(res => res.json())
            .then(res => {
                console.log(1, res.ok);
                setTrend(res.Information);
            })
    }, []);

    return (

        <div className={styles.wrapper}>
            <div className={styles.content_wrapper}>
                <div className={styles.item}>
                </div>
                <div className={styles.item}>
                    <div>
                        <Titleimag imgdata={imgSrc} />
                    </div>
                    <div>
                        <Titlename namedata={titlec} accountdata={account} imgid={imgid} />
                    </div>
                </div>
                <div className={styles.item}>
                    <Verticalline />
                </div>
                <div className={styles.item}>
                    <Information iconnamedata={iconName} iconImgdata={iconImg} pricedata={price} deliveryPcrdata={deliveryPcr} sellpagedata={sellpage} />
                </div>
                <div className={styles.item}>
                    <Balance recentdata={recentPrc} fluctuationdata={fluctuation} />
                </div>
                <div className={styles.item}>
                    <Trend trenddata={trend} />
                </div>
                <div className={styles.item}>
                </div>
            </div>
        </div >
    );
}

export default CampingSupplies;
