import React from 'react';
import { useNavigate } from 'react-router-dom';
import { truncate } from 'utils/truncate';
import BrokenRobotImage from 'assets/broken-robot.png';
import styles from './Contact.module.css';

const MAXIMUM_NOTE_IN_BIO = 22;

const Contact = ({ contact }) => {
  const navigate = useNavigate();

  const contactClickedHandler = () => {
    navigate(`/passenger/${contact.id}`);
  };

  return (
    <div className={styles.contactWrapper} onClick={contactClickedHandler}>
      <img
        key={contact.id}
        src={contact.avatar ? contact.avatar : BrokenRobotImage}
        alt="contact"
        className={styles.contactImg}
      />
      <div className={styles.contactFullNameWrapper}>
        <h3 className={styles.contactFullName}>
          {contact.first_name} {contact.last_name}
        </h3>
        <p className={styles.contactShortNote}>
          {truncate(contact.note, MAXIMUM_NOTE_IN_BIO)}
        </p>
      </div>
    </div>
  );
};

export default Contact;
