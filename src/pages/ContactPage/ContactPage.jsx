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
import { useRecentlyVisitedContacts } from 'context/recentContactsContext';
import { setItem } from 'utils/localStorage';
import NotFound from 'components/NotFound/NotFound';
import { client } from 'utils/client';
import Error from 'components/Error/Error';

const MAXIMUM_RECENTLY_VISITED_CONTACTS_AMOUNT = 4;

export const ContactPage = () => {
  const urlParams = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { recentlyVisitedContacts, setRecentlyVisitedContacts } =
    useRecentlyVisitedContacts();

  const isAlreadyInVisitedContacts = currentItemID => {
    return recentlyVisitedContacts.find(
      contact => contact.id === currentItemID,
    );
  };

  const hasReachedMaximumRecentlyVisitedContactsAmount = () => {
    return (
      recentlyVisitedContacts.length ===
      MAXIMUM_RECENTLY_VISITED_CONTACTS_AMOUNT
    );
  };

  const calculateNewContact = data => {
    if (isAlreadyInVisitedContacts(data.id)) {
      return recentlyVisitedContacts;
    }
    const newContacts = recentlyVisitedContacts;
    if (hasReachedMaximumRecentlyVisitedContactsAmount()) {
      newContacts.shift();
      newContacts.push(data);
      return [...newContacts];
    }
    return [...recentlyVisitedContacts, data];
  };

  const getContactById = async id => {
    try {
      setLoading(true);
      const query = `passenger/${id}`;
      const data = await client(query);
      const newContacts = calculateNewContact(data);
      setRecentlyVisitedContacts(newContacts);
      setContact(data);
      if (newContacts !== undefined) {
        setItem('recentlyVisitedContacts', JSON.stringify(newContacts));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContactById(urlParams.passenger_id);
  }, []);

  return (
    <>
      <RenderIf renderCondition={loading}>
        <Loading />
      </RenderIf>
      <RenderIf renderCondition={contact}>
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
      <RenderIf renderCondition={error}>
        <Error />
      </RenderIf>
    </>
  );
};
