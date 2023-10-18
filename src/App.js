import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./Components/public/Header";
import Footer from "./Components/public/Footer";
import Searchpage from "./Components/search/Searchpage";
import Content from "./Components/main/Content";
import CampingSupplies from "./Components/equipment/CampingSupplies";
import NaverReviewPage from "./Components/camp/NaverReviewPage";
import CampDetailPage from "./Components/camp/CampDetailPage";
// import NotFound from "./Components/camp/NotFound";
import Login from "./Components/login/Login";
import Mypage from "./Components/login/Mypage";
// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";


// // Firebase 설정 파일
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

// // VAPID 키
// const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY; // Firebase Console에서 생성한 키로 교체

// // Firebase 초기화
// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);

function App() {
//   useEffect(() => {
//     const askForNotificationPermission = async () => {
//       try {
//         // 요청 알림 권한
//         await requestPermission(messaging);

//         // VAPID 키 설정
//         const currentToken = await getToken(messaging, {
//           vapidKey: vapidKey,
//         });

//         console.log("Notification permission granted!");
//         console.log("FCM token:", currentToken);
//       } catch (error) {
//         console.error("Error requesting notification permission:", error);
//       }
//     };

//     askForNotificationPermission();

//     // FCM 알림 수신 처리
//     onMessage((payload) => {
//       console.log("Received FCM message:", payload);
//       // 알림을 사용자에게 표시하거나 처리할 작업을 수행합니다.
//     });
//   }, []);
  
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content_wrapper}>
          <Routes>
            <Route element={<CampingSupplies />} path="/equipment/:id" />
            {<Route path="/" element={<Content />} />}
            {<Route path="/search" element={<Searchpage />} />}
            <Route path="/camping">
              <Route path="reviews/:campName" element={<NaverReviewPage />} />
              <Route path=":campId" element={<CampDetailPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            {/* <Route path="/*" element={<NotFound />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
