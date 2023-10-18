import React from 'react';
import styles from './Titlename.module.css';
import Like from './Like';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Titlename = (props) => {
    const name = props.namedata
    const account = props.accountdata
    const imgid = props.imgid
    const [userData, setUserData] = useState("");
    useEffect(() => {
        fetchMyPage();
    }, [props]);

    const fetchMyPage = async () => {
        try {
            const response = await axios.get(`http://awsforestcamp.kro.kr:3000/campstore/favor/${props.imgid}`, {
                withCredentials: true
            });
            const { rows } = response.data;
            console.log(rows["0"]["id"])
            // 상태 업데이트
            setUserData(rows["0"]["id"]);
        } catch (error) {
            console.error("An error occurred:", error);
            // 에러 핸들링
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.Container}>
                <div className={styles.name}>
                    <span>
                        {name}
                    </span>
                </div>
                <div className={styles.account}>
                    <span >
                        {account}
                    </span>
                </div>
                <div className={styles.likeContainer}>
                    <Like likes={userData} imgid={imgid} />
                </div>
            </div>
        </div >
    );
};

export default Titlename;




// const [titlec, setTitle] = useState([])
// useEffect(() => {
//     fetch("Campingstore/explanation?id=1010001", {
//         headers: {
//             Accept: "application/json"
//         },
//         method: "GET"
//     }).then(res => res.json())
//         .then(res => {
//             console.log(1, res.ok);
//             setTitle(res.Information);
//         })
// }, []);
// console.log(titlec)