import React, { Component } from "react";
import styles from "./ContactForm.module.css";

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAddContact(this.state);

    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.ContactForm} onSubmit={this.handleSubmit}>
        <h2>Phonebook</h2>
        <label className={styles.ContactFormLabel}>
          Name
          <input
            className={styles.ContactFormInput}
            type="text"
            value={name}
            onChange={this.handleChange}
            name="name"
          />
        </label>
        <label className={styles.ContactFormLabel}>
          Phone
          <input
            className={styles.ContactFormInput}
            type="text"
            value={number}
            onChange={this.handleChange}
            name="number"
          />
        </label>

        <button type="submit" className={styles.ContactFormButton}>
          Добавить контакт
        </button>
      </form>
    );
  }
}
