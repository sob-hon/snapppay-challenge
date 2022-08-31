import React from "react";
import BrokenRobotImage from "../../assets/broken-robot.png";

const Contact = ({ contact }) => {
  return (
    <div>
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
