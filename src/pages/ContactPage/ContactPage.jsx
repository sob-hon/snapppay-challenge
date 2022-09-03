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
import Detail from 'components/Detail/Detail';
import Loading from 'components/Loading/Loading';
import RenderIf from 'components/RenderIf/RenderIf';

export const ContactPage = () => {
  const urlParams = useParams();
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(false);

  const getContactById = async id => {
    setLoading(true);
    const query = `http://localhost:1337/passenger/${id}`;
    const response = await fetch(query);
    const data = await response.json();
    setLoading(false);
    setContact(data);
  };

  useEffect(() => {
    getContactById(urlParams.passenger_id);

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <RenderIf isTrue={loading}>
        <Loading />
      </RenderIf>
      <RenderIf isTrue={!loading}>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.banner}></div>
            <img
              className={styles.avatar}
              src={contact?.avatar ? contact?.avatar : BrokenRobotImage}
              alt="Avatar"
            />
            <div className={styles.container}>
              <h2
                className={styles.fullName}
              >{`${contact?.first_name} ${contact?.last_name}`}</h2>

              <p className={styles.about}>{contact?.note}</p>

              <Detail detail={contact} subField={'email'} Icon={<MdEmail />} />
              <Detail detail={contact} subField={'phone'} Icon={<FaPhone />} />
              <Detail
                detail={contact}
                subField={'address'}
                Icon={<FaMapMarkerAlt />}
              />
              <Detail
                detail={contact}
                subField={'company'}
                Icon={<FaBuilding />}
              />
              <Detail
                detail={contact}
                subField={'telegram'}
                Icon={<FaTelegramPlane />}
              />
              <Detail
                detail={contact}
                subField={'gender'}
                Icon={<FaTransgenderAlt />}
              />
            </div>
          </div>
        </div>
      </RenderIf>
    </>
  );
};
