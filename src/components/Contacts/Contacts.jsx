import React from 'react';
import Contact from '../Contact/Contact';
import styles from './Contacts.module.css';

const Contacts = ({ contacts }) => {
  return (
    <>
      <h2 className={styles.ContactsHeader}>Contacts</h2>
      <div className={styles.ContactsWrapper}>
        {contacts?.map(contact => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>
    </>
  );
};

export default Contacts;
