import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Mypage.module.css";
import { Link } from "react-router-dom";

const BASE_URL = "http://awsforestcamp.kro.kr:3000";
const BASE_URL_CAMP = "http://13.209.180.103:3000";
const BASE_URL_EQUIPMENT = "http://3.37.199.29:3000";

function MyPage() {
  const [userData, setUserData] = useState(null);
  const [campIds, setCampIds] = useState([]);
  const [equipmentIds, setEquipmentIds] = useState([]);
  const [campFavorites, setCampFavorites] = useState([]);
  const [equipmentFavorites, setEquipmentFavorites] = useState([]);
  const [campIndex, setCampIndex] = useState(0);
  const [equipmentIndex, setEquipmentIndex] = useState(0);

  const fetchMyPage = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/mypage`, {
        withCredentials: true,
      });
      setUserData(response.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchFavoritesIds = async (url, setter) => {
    try {
      const response = await axios.get(url, { withCredentials: true });
      setter(response.data.rows.map((row) => row.campnum || row.equipmentnum));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchFavoritesDetails = async (ids, url, setter) => {
    try {
      const requests = ids.map((id) => axios.get(url + id));
      const responses = await Promise.all(requests);
      setter(responses.map((response) => response.data));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const prevCampSlide = () => {
    setCampIndex((prevIndex) => Math.max(prevIndex - 6, 0));
  };

  const prevEquipmentSlide = () => {
    setEquipmentIndex((prevIndex) => Math.max(prevIndex - 6, 0));
  };

  const nextCampSlide = () => {
    setCampIndex((prevIndex) =>
      Math.min(prevIndex + 6, campFavorites.length - 6)
    );
  };

  const nextEquipmentSlide = () => {
    setEquipmentIndex((prevIndex) =>
      Math.min(prevIndex + 6, equipmentFavorites.length - 6)
    );
  };

  const removeFavorite = async (type, id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      if (type === "camp") {
        await axios.delete(`${BASE_URL}/camp/favor`, {
          data: { campnum: id },
          ...config,
        });
        setCampFavorites((prev) => prev.filter((fav) => fav.data.id !== id));
      } else if (type === "equipment") {
        await axios.delete(`${BASE_URL}/campstore/equipmentfavord`, {
          data: { equipmentnum: id },
          ...config,
        });
        setEquipmentFavorites((prev) =>
          prev.filter((fav) => fav.Information.id !== id)
        );
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  useEffect(() => {
    fetchMyPage();
    fetchFavoritesIds(`${BASE_URL}/camp/favoruser/`, setCampIds);
    fetchFavoritesIds(`${BASE_URL}/campstore/favoruser/`, setEquipmentIds);
  }, []);

  useEffect(() => {
    if (campIds.length > 0) {
      fetchFavoritesDetails(
        campIds,
        `${BASE_URL_CAMP}/camp/card/`,
        setCampFavorites
      );
    }
  }, [campIds]);

  useEffect(() => {
    if (equipmentIds.length > 0) {
      fetchFavoritesDetails(
        equipmentIds,
        `${BASE_URL_EQUIPMENT}/Campingstore/card?id=`,
        setEquipmentFavorites
      );
    }
  }, [equipmentIds]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>마이페이지</h1>
      <p className={styles.infoText}>닉네임: {userData?.displayName}</p>
      <p className={styles.infoText}>이메일: {userData?.email}</p>

      <div>
        <h2 className={styles.title}>Camp Favorites</h2>
        <div className={styles.favorites_section}>
          {campFavorites.slice(campIndex, campIndex + 6).map((fav, idx) => (
            <div key={idx} className={styles.card}>
              <button
                onClick={() => removeFavorite("camp", fav.data.id)}
                className={styles.removeButton}
              >
                찜 해제
              </button>{" "}
              <Link to={`/camping/${fav.data.id}`} className={styles.campLink}>
                <img
                  src={fav.data.img_url}
                  alt={fav.data.name}
                  className={styles.campImage}
                />
                {fav.data.name}
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          {campIndex > 0 && (
            <button onClick={prevCampSlide} className={styles.prevButton}>
              ⬅️ Previous
            </button>
          )}
          {campFavorites.length > campIndex + 6 && (
            <button onClick={nextCampSlide} className={styles.nextButton}>
              Next ➡️
            </button>
          )}
        </div>
      </div>

      <div>
        <h2 className={styles.title}>Equipment Favorites</h2>
        <div className={styles.favorites_section}>
          {equipmentFavorites
            .slice(equipmentIndex, equipmentIndex + 6)
            .map((fav, idx) => (
              <div key={idx} className={styles.card}>
                <button
                  onClick={() =>
                    removeFavorite("equipment", fav.Information.id)
                  }
                  className={styles.removeButton}
                >
                  찜 해제
                </button>{" "}
                <Link
                  to={`/equipment/${fav.Information.id}`}
                  className={styles.equipmentLink}
                >
                  <img
                    src={fav.Information.titleImg}
                    alt={fav.Information.title}
                    className={styles.campImage}
                  />
                  {fav.Information.title}
                </Link>
              </div>
            ))}
        </div>
        <div className={styles.buttons}>
          {equipmentIndex > 0 && (
            <button onClick={prevEquipmentSlide} className={styles.prevButton}>
              ⬅️ Previous
            </button>
          )}
          {equipmentFavorites.length > equipmentIndex + 6 && (
            <button onClick={nextEquipmentSlide} className={styles.nextButton}>
              Next ➡️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
