import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setItem } from 'utils/localStorage';
import BrokenRobotImage from '../../assets/broken-robot.png';
import { useRecentlyVisitedContacts } from '../../context/recentContactsContext';
import styles from './Contact.module.css';

const Contact = ({ contact }) => {
  const recentContactsContext = useRecentlyVisitedContacts();
  const navigate = useNavigate();

  const contactClickedHandler = () => {
    let newContacts;
    recentContactsContext.setRecentlyVisitedContacts(prevContacts => {
      if (prevContacts.find(c => c.id === contact.id)) return prevContacts;
      if (prevContacts.length === 4) {
        newContacts = prevContacts;
        newContacts.shift();
        newContacts.push(contact);
        newContacts = [...newContacts];
        return newContacts;
      } else {
        newContacts = [...prevContacts, contact];
        return newContacts;
      }
    });
    if (newContacts !== undefined) {
      setItem('recentlyVisitedContacts', JSON.stringify(newContacts));
    }
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
      />
      <p>{contact.first_name}</p>
      <p>{contact.last_name}</p>
    </div>
  );
};

export default Contact;
