import React from "react";
import ContactListItem from "../ContactListItem/ContactListItem";
import styles from "./ContactList.module.css";
import PropTypes from "prop-types";

const ContactList = ({ contacts, onRemoveContact }) => (
  <ul className={styles.ContactList}>
    {contacts.map(({ id, name, number }) => (
      <ContactListItem
        key={id}
        name={name}
        number={number}
        onRemove={() => onRemoveContact(id)}
      />
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }).isRequired
  ),
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactList;
