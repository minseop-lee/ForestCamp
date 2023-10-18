import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  //     const [showFooter, setShowFooter] = useState(false);

  //     useEffect(() => {
  //         const handleScroll = () => {
  //             const isBottom =
  //                 window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
  //             setShowFooter(isBottom);
  //         };

  //         window.addEventListener('scroll', handleScroll);
  //         return () => {
  //             window.removeEventListener('scroll', handleScroll);
  //         };
  //     }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.footerContainer}>
        <div className={styles.flexContainer}>
          <div className={`${styles.flexItemLogo}`}>
            <div className={styles.imgwrap} />
          </div>
          <div className={`${styles.flexItem} ${styles.rightLine}`}>
            <h3>ForestCamp X CloudMate</h3>
            <span>해당 사이트는 Kibwa 기업멤버십SW 캠프</span>
            <br />
            <span>파이널 프로젝트로 제작되었습니다</span>
            <br />
            <h5>팀원 소개</h5>
            <span>김인철:Laby8239@gmail.com</span>
            <br />
            <span>이명덕:audejr21345@gmail.com</span>
            <br />
            <span>이민섭:lyll4192@gmail.com </span>
            <br />
            <span>윤성현:ysh970718@gmail.com</span>
            <br />
          </div>
          <div className={styles.flexItem}>
            <h1>김치 볶음밥 </h1>
            <span>
              후라이팬에 식용유를 두르고 대파를 살짝 볶아서 파기름을 내주세요
              기름에 파향이 잘 묻어났다고 생각이 들면 잘 썰어둔 김치를 김치국물
              빼고 넣어서 잘 볶아주세요 김치가 잘 익었으면 밥을 넣고 볶아주세요
              햄이나 고기류를 넣고싶으시면 김치를 넣기전에 먼저 볶고 어느정도
              익고 나면 김치를 넣고 설탕넣고 볶아주시면 됩니다
            </span>
          </div>
        </div>
        <div className={`${styles.flexItem} ${styles.foot}`}>
          ⓒ 2023 - 2023 Privacy - Team
        </div>
      </div>
    </div>
  );
};

export default Footer;
