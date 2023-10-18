import React from "react";
import styles from "./Login.module.css";
import Naver from "./images/naver.png";
import Google from "./images/google.png";
import Kakao from "./images/kakao.png";

const iconStyle = {
  width: "30px",
  height: "30px",
};

const Login = () => {
  const onLogin = (provider) => {
    const baseUrl = "http://awsforestcamp.kro.kr:3000";
    const authURLs = {
      naver: baseUrl + "/auth/naver",
      google: baseUrl + "/auth/google",
      kakao: baseUrl + "/auth/kakao",
    };

    window.location.href = authURLs[provider];
  };

  return (
    <div className={styles.login_div}>
      <h2 className={styles.txt_b}>로그인</h2>
      <p className={styles.txt_s}>아래의 서비스로 로그인하세요.</p>
      <button className={styles.naver_button} onClick={() => onLogin("naver")}>
        <img src={Naver} alt="Naver" style={iconStyle} /> 네이버로 시작하기
      </button>
      <button
        className={styles.google_button}
        onClick={() => onLogin("google")}
      >
        <img src={Google} alt="Google" style={iconStyle} /> 구글로 시작하기
      </button>
      <button className={styles.kakao_button} onClick={() => onLogin("kakao")}>
        <img src={Kakao} alt="Kakao" style={iconStyle} /> 카카오로 시작하기
      </button>
    </div>
  );
};

export default Login;
