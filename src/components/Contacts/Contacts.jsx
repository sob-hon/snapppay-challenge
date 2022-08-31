import React from "react";
import Contact from "../Contact/Contact";
import styles from "./Contacts.module.css";

const Contacts = ({ contacts }) => {
  return (
    <div className={styles.ContactsWrapper}>
      {contacts.map((contact) => (
        <Contact contact={contact} />
      ))}
    </div>
  );
};

export default Contacts;
