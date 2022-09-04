import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setItem } from 'utils/localStorage';
import { truncate } from 'utils/truncate';
import BrokenRobotImage from '../../assets/broken-robot.png';
import { useRecentlyVisitedContacts } from '../../context/recentContactsContext';
import styles from './Contact.module.css';

const Contact = ({ contact }) => {
  const recentContactsContext = useRecentlyVisitedContacts();
  const navigate = useNavigate();

  const contactClickedHandler = () => {
    navigate(`/passenger/${contact.id}`);
  };

  return (
    <div className={styles.contactWrapper} onClick={contactClickedHandler}>
      <img
        key={contact.id}
        src={contact.avatar ? contact.avatar : BrokenRobotImage}
        width={50}
        height={50}
        alt="contact"
        className={styles.contactImg}
      />
      <div className={styles.contactFullNameWrapper}>
        <h3 className={styles.contactFullName}>
          {contact.first_name} {contact.last_name}
        </h3>
        <p className={styles.contactShortNote}>{truncate(contact.note, 22)}</p>
      </div>
    </div>
  );
};

export default Contact;
