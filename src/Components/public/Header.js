import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faSignOutAlt,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function isTokenPresent() {
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("auth_token="));
}

const handleLogoutClick = (e) => {
  if (!window.confirm("로그아웃 하시겠습니까?")) {
    e.preventDefault();
  }
};

const Header = () => {
  const [userData, setUserData] = useState(null);
  const hasToken = isTokenPresent();

  useEffect(() => {
    if (hasToken) {
      fetchUserData();
    }
  }, [hasToken]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://awsforestcamp.kro.kr:3000/mypage",
        {
          withCredentials: true,
        }
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Fetching user data failed:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContainer}>
        <div className={`${styles.logo} ${styles.left}`}>
          <Link to="/">
            <div className={styles.logoImg} />
          </Link>{" "}
        </div>

        <div className={`${styles.right} ${styles.icon}`}>
          <Link to="http://awsforestcamp.kro.kr/search">
            <FontAwesomeIcon
              className={`${styles.icon_spacing} ${styles.icons}`}
              icon={faMagnifyingGlass}
            />
          </Link>
          <Link to={hasToken ? "http://awsforestcamp.kro.kr/mypage" : "/login"}>
            <FontAwesomeIcon
              className={`${styles.icon_spacing} ${styles.icons}`}
              icon={faUser}
            />
          </Link>
          <a
            href={
              hasToken ? "http://awsforestcamp.kro.kr:3000/logout" : "/login"
            }
            onClick={hasToken ? handleLogoutClick : null}
          >
            <FontAwesomeIcon
              className={`${styles.icon_spacing} ${styles.icons}`}
              icon={hasToken ? faSignOutAlt : faSignInAlt}
            />
          </a>
          {hasToken && (
            <span className={styles.userName}>
              안녕하세요, {userData?.displayName}님!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
