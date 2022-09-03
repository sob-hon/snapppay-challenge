import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ContactPage.module.css';
import BrokenRobotImage from 'assets/broken-robot.png';
import {
  FaTelegramPlane,
  FaPhone,
  FaTransgenderAlt,
  FaBuilding,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export const ContactPage = () => {
  const urlParams = useParams();
  const [contact, setContact] = useState({});

  const getContactById = async id => {
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
      {/* <BackBtn /> */}
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <div className={styles.banner}></div>
          <img
            className={styles.avatar}
            src={contact?.avatar ? contact?.avatar : BrokenRobotImage}
            alt="Avatar"
          />
          <div className={styles.container}>
            <h4
              className={styles.fullName}
            >{`${contact?.first_name} ${contact?.last_name}`}</h4>

            <p className={styles.about}>{contact?.note}</p>

            <div className={styles.content}>
              <MdEmail />
              <p>{contact?.email}</p>
            </div>

            <div className={styles.content}>
              <FaPhone />
              <p>{contact?.phone}</p>
            </div>

            {contact?.address && (
              <div className={styles.content}>
                <FaMapMarkerAlt />
                <p>{contact?.address}</p>
              </div>
            )}

            <div className={styles.content}>
              <FaBuilding />
              <p>{contact?.company}</p>
            </div>

            <div className={styles.content}>
              <FaTelegramPlane />
              <p>{contact?.telegram}</p>
            </div>

            <div className={styles.content}>
              <FaTransgenderAlt />
              <p>{contact?.gender}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
