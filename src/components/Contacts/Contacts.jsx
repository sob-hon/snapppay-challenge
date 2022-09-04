import Contact from 'components/Contact/Contact';
import RenderIf from 'components/RenderIf/RenderIf';
import React from 'react';
import styles from './Contacts.module.css';

// should refactor

const Contacts = ({ contacts }) => {
  return (
    <>
      <RenderIf renderCondition={contacts?.length > 0}>
        <h2 className={styles.ContactsHeader}>Contacts</h2>
      </RenderIf>
      <div className={styles.ContactsWrapper}>
        {contacts?.map(contact => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>
    </>
  );
};

export default Contacts;
