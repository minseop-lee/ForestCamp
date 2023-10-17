import React, { useState , useEffect} from "react"
import axios from 'axios'
import { Cookies } from 'react-cookie';
import styles from "./style/NotificationButton.module.css"
// import styles from './like.module.css';

// const NotiCountHandler = (toggle, count, onClick) => {

//     if (toggle) {
//         onClick(count + 1)
//     } else {
//         onClick(count - 1)
//     }
// }


function NotificationButton({ campId ,baseUrl }) {
    const cookies = new Cookies();
    const [noti, setNoti] = useState(false)
    cookies.get("auth_token")
    
    console.log(campId)
    useEffect(() => {
        if (cookies.get("auth_token") === undefined) {
            return
        }
        fetchMyPage();
    }, []);

    const fetchMyPage = async () => {
        try {
            console.log(campId)
            const response = await axios.get(`${baseUrl}/camp/sns_sub?camp_num=${campId}&email=${cookies.get("email")}`);
            const data = response.data;
            console.log(data)
            if (data.is_sub) {
                setNoti(true)
            }
        } catch (error) {
            console.error("An error occurred:", error);
            // 에러 핸들링
        }
    };

    async function toggleNoti() {
        if (cookies.get("auth_token") === undefined) {
            alert("로그인 하시면 좋아요/알림 이 가능합니다.")
            return
        }
        setNoti(!noti)
        console.log(noti)


        if (noti === true) {
            const response = await axios.delete(
                `${baseUrl}/camp/sns_sub`,
                {
                    data: {
                        email: cookies.get("email"),
                        camp_num: String(campId)
                    }
                });

            // 상태 업데이트
        } else {
            const response = await axios.post(
                `${baseUrl}/camp/sns_sub`,
                {
                    email: cookies.get("email"),
                    camp_num: String(campId)
                }
            );

        }
        return
    }

    return (

        <div className={`${styles.position}`}>
            {noti ? (
                <svg className={styles.svg} onClick={toggleNoti} xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 32 32"><path fill="#000000" d="M28.707 19.293L26 16.586V13a10.014 10.014 0 0 0-9-9.95V1h-2v2.05A10.014 10.014 0 0 0 6 13v3.586l-2.707 2.707A1 1 0 0 0 3 20v3a1 1 0 0 0 1 1h7v1a5 5 0 0 0 10 0v-1h7a1 1 0 0 0 1-1v-3a1 1 0 0 0-.293-.707ZM19 25a3 3 0 0 1-6 0v-1h6Z"></path>
    
      </svg>

            ) : (
                <svg className={styles.svg} onClick={toggleNoti} xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 32 32"><path fill="#000000" d="M28.707 19.293L26 16.586V13a10.014 10.014 0 0 0-9-9.95V1h-2v2.05A10.014 10.014 0 0 0 6 13v3.586l-2.707 2.707A1 1 0 0 0 3 20v3a1 1 0 0 0 1 1h7v.777a5.152 5.152 0 0 0 4.5 5.199A5.006 5.006 0 0 0 21 25v-1h7a1 1 0 0 0 1-1v-3a1 1 0 0 0-.293-.707ZM19 25a3 3 0 0 1-6 0v-1h6Zm8-3H5v-1.586l2.707-2.707A1 1 0 0 0 8 17v-4a8 8 0 0 1 16 0v4a1 1 0 0 0 .293.707L27 20.414Z"></path>
                </svg>
            )}
            <p className={styles.icon_span}>알림</p>
        </div>
    )
}

export default NotificationButton