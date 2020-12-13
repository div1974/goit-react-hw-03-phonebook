import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import Filter from "./Filter";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");

    if (savedContacts) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (el) => {
    const contact = {
      id: uuidv4(),
      name: el.name,
      number: el.number,
    };

    this.state.contacts.filter((e) => e.name === contact.name).length > 0
      ? alert(`${contact.name} is already in contacts`)
      : this.setState((prevState) => {
          return {
            contacts: [...prevState.contacts, contact],
          };
        });
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <ContactForm onAddContact={this.addContact} />
        {contacts.length > 1 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}
        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </>
    );
  }
}
