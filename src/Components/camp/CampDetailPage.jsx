import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import Img from './Image'
import Information from './information'
import Calendar from './Calendar';
import styles from './style/CampDetailPage.module.css';
import FacilityIcons from "./FacilityIcons";
import NaverReviewSample from "./NaverReviewSample";
import LikeButton from './LikeButton'
import Button from '@mui/material/Button';
import NotificationButton from "./NotificationButton";

export default function DetailPage() {
    let { campId } = useParams("");
    const [camping, setCamping] = useState(false)


    console.log(campId)
    const baseUrl = 'http://13.209.180.103:3000'
    const url = baseUrl + `/camp/naver_reviews?query=${camping.name}&display=3`
    // console 
    // const handleFavorOrNoti = async (category, type, action, num) => {
    //     // API 호출을 위한 기본 URL
    //     const baseURL = "http://13.125.151.237:3000"; // 서버의 실제 주소로 변경해야 할 수 있습니다.


    //     try {
    //         // userData에서 userId를 가져옵니다.
    //         const userId = userData?.userId;

    //         // 예: http://13.124.209.114:3000/add/campfavor
    //         const userUrl = `${baseURL}/${category}/${type}`;

    //         const payload = { userid: userId, [`${category}num`]: num };

    //         // axios 요청시 쿠키를 포함
    //         if (action === "add") {
    //             await axios.post(userUrl, payload, { withCredentials: true });
    //         } else if (action === "delete") {
    //             await axios.delete(userUrl, { data: payload, withCredentials: true });
    //         } else if (action === "get") {
    //             const result = await axios.get(userUrl + `?${category}num=${num}`, { withCredentials: true });
    //             alert(result)
    //         }

    //         alert(`Successfully ${action}ed to ${type}`);
    //     } catch (error) {
    //         console.error(`An error occurred while ${action}ing to ${type}:`, error);
    //     }
    // };


    // loginCheck();


    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         // Perform actions before the component unloads
    //         event.preventDefault();
    //         event.returnValue = false;
    //     };
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     window.addEventListener('popstate', handlePopstate);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //         window.removeEventListener('popstate', handlePopstate);
    //     };
    // }, []);

    useEffect(() => {
        fetch(`${baseUrl}/camp/row/${campId}`, {
            headers: {
                Accept: "application/json",
                mode: 'no-cors',
            },
            method: "GET"
        }).then(res => res.json())
            .then(res => {
                console.log(1, res.ok);
                console.log(2, res);
                setCamping(res.data);
            })
    }, [campId]);

    return (
        <div className={`${styles.main}`}>

            <div className={styles.container}>
                <div className={styles.item}>
                    <h2 className={styles.name}>{camping.name}</h2>
                </div>
                <div className={styles.item}>
                    <Img imgSrc={camping.img_url} />
                </div>
                <div className={styles.item}>
                    <Calendar date={
                        camping.use_term ?
                            camping.use_term[0].split('.') : ""}
                        able={camping.able_date} state={camping.reservation_state} />
                </div>
                <div className={styles.item}>
                    <FacilityIcons isTent={camping.is_tent} className={styles.inline} />
                    <div className={styles.inline}>
                        <NotificationButton baseUrl={baseUrl} campId={campId} />
                        <LikeButton campId={campId} />
                    </div>
                </div>
                <div className={styles.item}>
                    <Button style={{ maxWidth: '471px', maxHeight: '50px', minWidth: '471px', minHeight: '30px' }} variant="contained" onClick={() => { window.open(camping.camp_url, '_blank') }} color="success">
                        예약 페이지
                    </Button>
                </div>

                {camping.name !== undefined ? (
                    <div className={styles.item}>
                        <NaverReviewSample url={url} name={camping.name} />
                    </div>) :
                    (<div></div>)
                }
            </div>
            {/* <div className={styles.fixed_btn}>

            </div> */}
            <div className={styles.info}>
                <Information info={camping.information_use} src={camping.part_plan} />
            </div>
        </div>
    )
}

// onClick = { setLike }