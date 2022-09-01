import React from "react";
import BrokenRobotImage from "../../assets/broken-robot.png";
import { useRecentlyVisitedContacts } from "../../context/recent-contacts-context";

const Contact = ({ contact }) => {
  const recentContactsContext = useRecentlyVisitedContacts();

  const contactClickedHandler = () => {
    let newContacts;
    recentContactsContext.setRecentlyVisitedContacts((prevContacts) => {
      if (prevContacts.find((c) => c.id === contact.id)) return prevContacts;
      if (prevContacts.length === 4) {
        newContacts = prevContacts;
        newContacts.shift();
        newContacts.push(contact);
        return [...newContacts];
      } else {
        return [...prevContacts, contact];
      }
    });
  };

  return (
    <div onClick={contactClickedHandler}>
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
