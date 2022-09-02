import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ContactPage.module.css";
import BrokenRobotImage from "../../assets/broken-robot.png";
import { BackBtn } from "../../components/BackBtn/BackBtn";

export const ContactPage = () => {
  const urlParams = useParams();
  const [contact, setContact] = useState({});

  const getContactById = async (id) => {
    const query = `http://localhost:1337/passenger/${id}`;
    const response = await fetch(query);
    const data = await response.json();
    setContact(data);
  };

  useEffect(() => {
    getContactById(urlParams.passenger_id);
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <BackBtn />
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <img
            src={contact?.avatar ? contact?.avatar : BrokenRobotImage}
            alt="Avatar"
          />
          <div className={styles.container}>
            <h4>
              <b>
                {`${contact?.first_name} ${contact?.last_name} -`}{" "}
                <span>{contact?.company}</span>
              </b>
            </h4>
            <div className={styles.content}>
              <p>About: </p>
              <p style={{ textAlign: "center" }}>{contact?.note}</p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <p>Telegram: </p>
              <p>{contact?.telegram}</p>
            </div>
            <div className={styles.content}>
              <p>Phone: </p>
              <p>{contact?.phone}</p>
            </div>
            <div className={styles.content}>
              <p>Gender: </p>
              <p>{contact?.gender}</p>
            </div>
            {contact?.address && (
              <div className={styles.content}>
                <p>Address: </p>
                <p>{contact?.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
